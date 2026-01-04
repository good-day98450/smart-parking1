let selectedSlot = null;

window.onload = function () {
  loadAvailableSlots();
};

function loadAvailableSlots() {
  const container = document.getElementById("availableSlots");
  const slots = JSON.parse(localStorage.getItem("parkingSlots")) || [];
  container.innerHTML = "";

  slots.forEach(slot => {
    const div = document.createElement("div");
    div.classList.add("slot", slot.status);
    div.textContent = `Slot ${slot.id}`;

    if (slot.status === "available") {
      div.onclick = () => selectSlot(slot.id);
    }

    container.appendChild(div);
  });
}


function selectSlot(slotId) {
  const slots = document.querySelectorAll(".slot.available");
  slots.forEach(s => s.classList.remove("selected"));

  const selectedDiv = Array.from(slots).find(s => s.textContent === `Slot ${slotId}`);
  if (selectedDiv) selectedDiv.classList.add("selected");

  selectedSlot = slotId;
  document.getElementById("confirmBookingBtn").disabled = false;
}

function confirmBooking() {
  const vehicleType = document.getElementById("vehicleType").value;
  if (!vehicleType) {
    alert("Please select a vehicle type!");
    return;
  }
  if (!selectedSlot) {
    alert("Please select a slot to book!");
    return;
  }


  let slots = JSON.parse(localStorage.getItem("parkingSlots"));
  const index = slots.findIndex(s => s.id === selectedSlot);
  slots[index].status = "reserved";
  localStorage.setItem("parkingSlots", JSON.stringify(slots));

  
  const bookingDetails = {
    slotId: selectedSlot,
    vehicleType: vehicleType,
    time: new Date().toLocaleString(),
    paymentStatus: "pending"
  };
  localStorage.setItem("currentBooking", JSON.stringify(bookingDetails));

  alert(`Slot ${selectedSlot} reserved for your ${vehicleType}. Proceed to payment.`);
  window.location.href = "payment.html";
}

function goBack() {
  window.location.href = "dashboard.html";
}




