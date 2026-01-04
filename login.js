// Predefined Admin account
const adminAccount = {
  email: "admin@smartparking.com",
  password: "admin123"
};

function login() {
  const role = document.getElementById("userRole").value;
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!role || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  if (role === "admin") {
    if (email === adminAccount.email && password === adminAccount.password) {
      alert("Welcome Admin!");
      localStorage.setItem("loggedInRole", "admin");
      window.location.href = "./admin/dashboard.html";
    } else {
      alert("Invalid admin credentials!");
    }
    return;
  }

  // User login logic
  if (role === "user") {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert("Login successful! Welcome " + user.username);
      localStorage.setItem("loggedInRole", "user");
      localStorage.setItem("loggedInUser", user.username);
      window.location.href = "./user/dashboard.html";
    } else {
      alert("Invalid email or password. Please register first.");
    }
  }
}
