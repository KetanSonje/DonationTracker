// Replace with your actual Google Sheets ID 
const sheetId = '1jkF8k3wPobDzpsEOxCscpLUTZZfoGCIxEp8HwbOiu64';

// Replace with your actual API Key
const apiKey = 'AIzaSyCSVsxcXej7rA030gO9SXaTdJipnptoJcI';

// Range of data you want to fetch (the sheet name and the range)
const donationSheetRange = 'Donations!B2:G'; // Adjust as needed for donations
const fundUsageSheetRange = 'FundUsage!A2:C'; // Adjust as needed for fund usage

// Function to fetch data from Google Sheets
async function fetchData(sheetRange) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;
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
    const row = `<tr><td>${donation[0]}</td><td>₹${donation[1]}</td><td>${donation[2]}</td></tr>`;
    donationTable.innerHTML += row;
    totalDonations += parseFloat(donation[1]); // Sum up the donation amounts
  });

  // Update the total donations on the page
  document.getElementById('totalDonations').innerText = `₹${totalDonations}`;
}

// Update fund usage table on your webpage
async function updateFundUsageTable() {
  const fundUsage = await fetchData(fundUsageSheetRange);
  const fundUsageTable = document.getElementById('fundUsageTable'); // The element where data will be inserted

  let totalSpent = 0; // To track the total spent
  fundUsage.forEach(expense => {
    const row = `<tr><td>₹${expense[0]}</td><td>${expense[1]}</td><td>${expense[2]}</td></tr>`;
    fundUsageTable.innerHTML += row;
    totalSpent += parseFloat(expense[0]); // Sum up the spending amounts
  });

  // Update the total spent on the page
  document.getElementById('totalSpent').innerText = `₹${totalSpent}`;
}

// Call the functions to fetch and display the donations and fund usage data
updateDonationTable();
updateFundUsageTable();
