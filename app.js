// Replace with your actual Google Sheets ID
const sheetId = '1jkF8k3wPobDzpsEOxCscpLUTZZfoGCIxEp8HwbOiu64';
// Replace with your actual API Key
const apiKey = 'AIzaSyCSVsxcXej7rA030gO9SXaTdJipnptoJcI';

// Range of data you want to fetch (the sheet name and the range)
const donationSheetRange = 'Donations!B2:G'; // A2:C is a range, adjust it accordingly if needed

// Function to fetch data from Google Sheets
async function fetchData(sheetRange) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data.values;
}

// Update donation table on your webpage
async function updateDonationTable() {
  const donations = await fetchData(donationSheetRange);
  const donationTable = document.getElementById('donationTable'); // The element where data will be inserted

  let totalDonations = 0; // To track the total donations
  donations.forEach(donation => {
    const row = `<tr><td>${donation[0]}</td><td>${donation[1]}</td><td>${donation[2]}</td></tr>`;
    donationTable.innerHTML += row;
    totalDonations += parseFloat(donation[1]); // Sum up the donation amounts
  });

  // Update the total donations on the page
  document.getElementById('totalDonations').innerText = `$${totalDonations}`;
}

// Call the function to fetch and display the donations data
updateDonationTable();
