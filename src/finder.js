import fetch from 'node-fetch';

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
  return await fetch(request).then(response => response.text());
}
