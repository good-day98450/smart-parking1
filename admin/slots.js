const totalSlots = 20; // You can increase this number

window.onload = function () {
  initializeSlots();
  displaySlots();
  updateStats();
};

// Initialize slots in localStorage if not already present
function initializeSlots() {
  let slots = JSON.parse(localStorage.getItem("parkingSlots")) || [];
  if (slots.length === 0) {
    for (let i = 1; i <= totalSlots; i++) {
      slots.push({ id: i, status: "available" });
    }
    localStorage.setItem("parkingSlots", JSON.stringify(slots));
  }
}

// Display slots dynamically
function displaySlots() {
  const slotsContainer = document.getElementById("slotsContainer");
  slotsContainer.innerHTML = "";
  const slots = JSON.parse(localStorage.getItem("parkingSlots"));

  slots.forEach(slot => {
    const slotDiv = document.createElement("div");
    slotDiv.classList.add("slot", slot.status);
    slotDiv.innerText = `Slot ${slot.id}`;
    slotDiv.onclick = () => changeSlotStatus(slot.id);
    slotsContainer.appendChild(slotDiv);
  });
}

// Change slot status on click
function changeSlotStatus(id) {
  let slots = JSON.parse(localStorage.getItem("parkingSlots"));
  slots = slots.map(slot => {
    if (slot.id === id) {
      if (slot.status === "available") slot.status = "occupied";
      else if (slot.status === "occupied") slot.status = "reserved";
      else slot.status = "available"; // loop cycle
    }
    return slot;
  });
  localStorage.setItem("parkingSlots", JSON.stringify(slots));
  displaySlots();
  updateStats();
}

// Update count stats
function updateStats() {
  const slots = JSON.parse(localStorage.getItem("parkingSlots"));
  const available = slots.filter(s => s.status === "available").length;
  const occupied = slots.filter(s => s.status === "occupied").length;
  const reserved = slots.filter(s => s.status === "reserved").length;

  document.getElementById("availableCount").innerText = available;
  document.getElementById("occupiedCount").innerText = occupied;
  document.getElementById("reservedCount").innerText = reserved;
}

// Go back to dashboard
function goBack() {
  window.location.href = "dashboard.html";
}
