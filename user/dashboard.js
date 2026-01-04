const totalSlots = 20;

window.onload = function () {
  initializeSlots();
  displaySlots();
  updateStats();
};

// Initialize if empty
function initializeSlots() {
  let slots = JSON.parse(localStorage.getItem("parkingSlots")) || [];
  if (slots.length === 0) {
    for (let i = 1; i <= totalSlots; i++) {
      slots.push({ id: i, status: "available" });
    }
    localStorage.setItem("parkingSlots", JSON.stringify(slots));
  }
}

// Display slots (live preview)
function displaySlots() {
  const container = document.getElementById("slotsContainer");
  container.innerHTML = "";
  const slots = JSON.parse(localStorage.getItem("parkingSlots"));
  slots.forEach(slot => {
    const div = document.createElement("div");
    div.classList.add("slot", slot.status);
    div.textContent = `Slot ${slot.id}`;
    container.appendChild(div);
  });
}

// Update counts
function updateStats() {
  const slots = JSON.parse(localStorage.getItem("parkingSlots"));
  const available = slots.filter(s => s.status === "available").length;
  const occupied = slots.filter(s => s.status === "occupied").length;
  const reserved = slots.filter(s => s.status === "reserved").length;

  document.getElementById("availableCount").innerText = available;
  document.getElementById("occupiedCount").innerText = occupied;
  document.getElementById("reservedCount").innerText = reserved;
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    // Clear all session data
    localStorage.removeItem("loggedInRole");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("currentUser");
    // Redirect to home page (up one directory)
    window.location.href = "../index.html";
  }
}
