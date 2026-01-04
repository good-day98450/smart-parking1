// Redirect to selected page
function goToPage(page) {
  window.location.href = page;
}

// Logout confirmation
function logout() {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    // Clear any session data
    sessionStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("currentUser");
    // Redirect to login page (going up one directory to root)
    window.location.href = "../index.html";
  }
}
