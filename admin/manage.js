// Load and display users from localStorage
window.onload = function () {
  // Seed with two sample users if none exist so the Manage page shows entries
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length === 0) {
    users = [
      { username: "John Dooo", email: "john@example.com", password: "password123", status: "active" },
      { username: "Jane Smith", email: "jane@example.com", password: "password123", status: "active" },
      { username: "Alice Patel", email: "alice@example.com", password: "password123", status: "active" },
      { username: "Bob Kumar", email: "bob@example.com", password: "password123", status: "active" },
      { username: "Carlos Lopez", email: "carlos@example.com", password: "password123", status: "active" }
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  displayUsers();
};

// Display users in the table
function displayUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    const status = user.status === "blocked" ? "Blocked" : "Active";

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${status}</td>
      <td>
        ${
          user.status === "blocked"
            ? `<button class="action-btn unblock" onclick="toggleStatus('${user.email}', 'unblock')">Unblock</button>`
            : `<button class="action-btn block" onclick="toggleStatus('${user.email}', 'block')">Block</button>`
        }
        <button class="action-btn delete" onclick="deleteUser('${user.email}')">Delete</button>
      </td>
    `;

    userList.appendChild(row);
  });
}

// Block or Unblock a user
function toggleStatus(email, action) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map(user => {
    if (user.email === email) {
      user.status = action === "block" ? "blocked" : "active";
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}

// Delete a user
function deleteUser(email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter(user => user.email !== email);
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}

// Go back to admin dashboard
function goBack() {
  window.location.href = "dashboard.html";
}
