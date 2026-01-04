// Sample transaction data
const transactions = [
  { id: "TXN001", user: "Amit Kumar", amount: 1200, status: "Completed", date: "2025-10-30" },
  { id: "TXN002", user: "Riya Sharma", amount: 800, status: "Pending", date: "2025-10-29" },
  { id: "TXN003", user: "Rahul Singh", amount: 1500, status: "Completed", date: "2025-10-28" },
  { id: "TXN004", user: "Neha Verma", amount: 600, status: "Failed", date: "2025-10-28" },
  { id: "TXN005", user: "Vikram Patel", amount: 950, status: "Pending", date: "2025-10-27" }
];

// Insert data into table
const tableBody = document.getElementById("transactionTable");
const userFilter = document.getElementById("userFilter");

// Render transactions into the table. If filterUser is 'all', show all.
function renderTransactions(filterUser = 'all') {
  // clear previous rows
  tableBody.innerHTML = '';

  const filtered = filterUser === 'all'
    ? transactions
    : transactions.filter(txn => txn.user === filterUser);

  filtered.forEach(txn => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${txn.id}</td>
      <td>${txn.user}</td>
      <td>₹${txn.amount}</td>
      <td class="status-${txn.status.toLowerCase()}">${txn.status}</td>
      <td>${txn.date}</td>
    `;
    tableBody.appendChild(row);
  });

  // Update summary values based on filtered transactions
  const total = filtered.reduce((sum, txn) => sum + txn.amount, 0);
  const completed = filtered.filter(txn => txn.status === "Completed")
    .reduce((sum, txn) => sum + txn.amount, 0);
  const pending = filtered.filter(txn => txn.status === "Pending")
    .reduce((sum, txn) => sum + txn.amount, 0);

  document.getElementById("totalPayments").innerText = `₹${total}`;
  document.getElementById("completedPayments").innerText = `₹${completed}`;
  document.getElementById("pendingPayments").innerText = `₹${pending}`;
}

// Populate the user filter select with unique usernames
function populateUserFilter() {
  const users = Array.from(new Set(transactions.map(t => t.user)));
  // Keep existing 'all' option, add others
  users.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u;
    opt.textContent = u;
    userFilter.appendChild(opt);
  });

  userFilter.addEventListener('change', (e) => {
    renderTransactions(e.target.value);
  });
}

// Initialize UI
populateUserFilter();
renderTransactions('all');

// Back button handler: called from Payment.html's back button
function goBack() {
  // If dashboard is in the same folder (Admin), this will navigate to it
  window.location.href = "dashboard.html";
}
