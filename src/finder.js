import fetch from 'node-fetch';


function parseData(body) {
  // convert body to html dom, then select all tr elements in page, and cut off the header row(s)
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/html');
  const tbody = doc.getElementsByTagName('tbody')[1];
  const rows = Array.from(tbody.getElementsByTagName('tr')).slice(3);
  const parsedData = [];

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
        if (a !== undefined && a != null && a !== 'Prerequisites:') { // if the cell has content
          return true;
        }
      }
      return false;
    });

    if (cells.length > 0) { // make sure what's left isn't an empty row
      parsedData.push(cells);
    }
  });

  console.table(parsedData);
  return body;
}

// function for fetching unparsed data from classfinder
// params are the subject to search for, and the term number.
// fall quarter = 1, winter = 2 etc.

export default async function finder(subject, termNumber) {
  const year = new Date().getFullYear();
  const term = `${year}${termNumber}0`;
  const data = `sel_subj=dummy&sel_subj=dummy&sel_gur=dummy&sel_gur=dummy&sel_attr=dummy&sel_site=dummy&sel_day=dummy&sel_open=dummy&sel_crn=&term=${term}&sel_gur=All&sel_attr=All&sel_site=All&sel_subj=${subject}&sel_inst=ANY&sel_crse=&begin_hh=0&begin_mi=A&end_hh=0&end_mi=A&sel_cdts=%25`;

  const request = new Request('https://cors-anywhere.herokuapp.com/https://admin.wwu.edu/pls/wwis/wwsktime.ListClass', {
    method: 'POST',
    body: data,
  });
  // eslint-disable-next-line no-return-await
  return await parseData(await fetch(request).then(response => response.text()));
}
