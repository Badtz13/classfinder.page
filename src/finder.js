import fetch from 'node-fetch';

const fields = ['Course', 'Name', 'CRN', 'Cap', 'Enrolled', 'Available', 'Instructor', 'Dates', 'GUR', 'Time', 'Room', 'Credits', 'Price', 'LabTime', 'LabRoom', 'Requirements'];

function parseData(body) {
  // convert body to html dom, then select all tr elements in page, and cut off the header row(s)
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/html');
  const tbody = doc.getElementsByTagName('tbody')[1];
  if (tbody === undefined) {
    return { body, undefined };
  }
  const rows = Array.from(tbody.getElementsByTagName('tr')).slice(3);
  let parsedData = [];

  // loop through each row, convert each cell to something usable
  rows.forEach((row) => {
    const cells = Array.from(row.cells).map((a) => {
      // if there is text directly in the cell, use that as value
      if (a.textContent) {
        return a.textContent;
      }
      // if there is no text content and there is a child element
      if (a.firstChild) {
        // all tds at the point in the dom are empty, so if it's not a td return the value
        if (a.firstChild.nodeName !== 'TD') {
          return a.firstChild.value;
        }
      }
      return undefined;
    }).filter((a) => { // filter remaining cells
      if (/\S/.test(a)) { // if the cell isn't only spaces
        if (a !== undefined && a !== null && a !== 'Prerequisites:' && a !== 'CLOSED:   Waitlist Available ' && a !== 'CLOSED                               ') { // if the cell has content
          return true;
        }
      }
      return false;
    });

    if (cells.length > 0) { // make sure what's left isn't an empty row
      parsedData.push(cells);
    }
  });

  // flatten multidimensional array into single array of all elements
  parsedData = parsedData.flat();

  // remove first blank element
  parsedData.unshift('');

  const labeledChunks = [];
  const chunks = [];
  let currentRow = [];
  const classList = [];
  let currentId = 0;


  for (let i = 1; i < parsedData.length; i += 1) {
    // this attempts to detect the start of a new class block
    if (/([A-Z]{3,4} \d{3})/.test(parsedData[i]) && parsedData[i].length < 9 && !/([A-Z]{3,4} \d{3})/.test(parsedData[i + 1]) && !parsedData[i - 1].endsWith('Fee')) {
      chunks.push(currentRow);
      currentRow = [];
    }
    currentRow.push(parsedData[i]);
  }
  chunks.push(currentRow);
  chunks.slice(1).forEach((element) => {
    let fieldIndex = 0;
    const fieldedRow = {};
    // loop through each row and assign a field to each cell
    element.forEach((cell) => {
      // if one of the optional fields' values is too long, skip it
      if ((fields[fieldIndex] === 'GUR' && cell.length > 10) || (cell === 'TBA' && fields[fieldIndex] !== 'Time')) {
        fieldIndex += 1;
      } else if (fields[fieldIndex] === 'LabTime' && !/([A-Z]{1,2} {2}\d{1,2}:\d{1,2})/.test(cell)) {
        fieldIndex += 2;
      }

      // if we've reached the end of the fields, add everything else to other
      if (fieldIndex >= fields.length) {
        if (fieldedRow.Other) {
          fieldedRow.Other += `,${cell}`;
        } else {
          fieldedRow.Other = cell;
        }
      } else { // if we didn't reach the end yet, assign the value to the field and increment
        fieldedRow[fields[fieldIndex]] = cell;
        fieldIndex += 1;
      }
    });
    if (!classList.includes(fieldedRow.Name)) {
      currentId += 1;
      classList.push(fieldedRow.Name);
    }
    fieldedRow.ClassId = currentId;
    labeledChunks.push(fieldedRow);
  });
  // sort classes by course id
  // TODO add ability for different sorts
  labeledChunks.sort((a, b) => (parseInt(a.Course.split(' ')[1], 10) - parseInt(b.Course.split(' ')[1], 10)));

  return { body, labeledChunks };
}

// function for fetching unparsed data from classfinder
// params are the subject to search for, and the term number.
// fall quarter = 1, winter = 2 etc.

export default async function finder(subject, termNumber) {
  const year = new Date().getFullYear();
  const term = `${year + 1}${termNumber}0`;
  const baseData = 'sel_subj=dummy&sel_subj=dummy&sel_gur=dummy&sel_gur=dummy&sel_attr=dummy&sel_site=dummy&sel_day=dummy&sel_open=dummy&sel_crn=&term=';
  let data = `${baseData + term}&sel_gur=All&sel_attr=All&sel_site=All`;
  const subjectList = subject.split(',');
  subjectList.forEach((item) => {
    if (item === 'ALL') {
      data += '&sel_subj=All';
    } else {
      data += `&sel_subj=${item}`;
    }
  });

  data += '&sel_inst=ANY&sel_crse=&begin_hh=0&begin_mi=A&end_hh=0&end_mi=A&sel_cdts=%25';

  const request = new Request('https://cors-anywhere.herokuapp.com/https://admin.wwu.edu/pls/wwis/wwsktime.ListClass', {
    method: 'POST',
    body: data,
  });
  // eslint-disable-next-line no-return-await
  return parseData(await fetch(request).then(response => response.text()));
}
