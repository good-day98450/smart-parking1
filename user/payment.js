window.onload = function () {
  displayBookingDetails();
};

// Load booking details
function displayBookingDetails() {
  const booking = JSON.parse(localStorage.getItem("currentBooking"));
  const container = document.getElementById("bookingDetails");

  if (!booking) {
    container.innerHTML = "<p>No booking found!</p>";
    return;
  }

  const price = calculatePrice(booking.vehicleType);

  container.innerHTML = `
    <p><strong>Slot ID:</strong> ${booking.slotId}</p>
    <p><strong>Vehicle Type:</strong> ${booking.vehicleType}</p>
    <p><strong>Booking Time:</strong> ${booking.time}</p>
    <p><strong>Payment Status:</strong> ${booking.paymentStatus}</p>
    <p><strong>Total Amount:</strong> ₹${price}</p>
  `;

  // Save total amount for later use
  booking.amount = price;
  localStorage.setItem("currentBooking", JSON.stringify(booking));
}

// Pricing logic
function calculatePrice(type) {
  switch (type) {
    case "2-wheeler": return 20;
    case "4-wheeler": return 50;
    case "vip": return 100;
    case "electric": return 40;
    default: return 0;
  }
}

// Handle payment
function processPayment() {
  const method = document.getElementById("paymentMethod").value;
  if (!method) {
    alert("Please select a payment method!");
    return;
  }

  const booking = JSON.parse(localStorage.getItem("currentBooking"));
  booking.paymentStatus = "Paid (" + method.toUpperCase() + ")";
  localStorage.setItem("currentBooking", JSON.stringify(booking));

  alert("Payment successful via " + method.toUpperCase());

  // Redirect to QR code generation
  window.location.href = "qr.html";
}

function goBack() {
  window.location.href = "booking.html";
}
