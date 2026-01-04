// === Initialize QR Scanner ===
window.onload = function() {
  startScanner();
};

function startScanner() {
  const html5QrCode = new Html5Qrcode("qr-reader");
  const resultText = document.getElementById("resultText");
  const bookingInfo = document.getElementById("bookingInfo");
  const openGateBtn = document.getElementById("openGateBtn");
  const denyBtn = document.getElementById("denyBtn");

  Html5Qrcode.getCameras().then(cameras => {
    if (cameras && cameras.length) {
      html5QrCode.start(
        cameras[0].id,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          try {
            const booking = JSON.parse(decodedText);
            resultText.innerText = "✅ QR Verified Successfully!";
            displayBooking(booking);
            openGateBtn.disabled = false;
            denyBtn.disabled = false;
          } catch (error) {
            resultText.innerText = "❌ Invalid QR Code!";
          }
        },
        (error) => {}
      );
    }
  }).catch(err => {
    resultText.innerText = "Camera access denied or unavailable.";
  });

  function displayBooking(booking) {
    bookingInfo.innerHTML = `
      <p><strong>Slot:</strong> ${booking.slotId}</p>
      <p><strong>Vehicle Type:</strong> ${booking.vehicleType}</p>
      <p><strong>Payment:</strong> ${booking.paymentStatus}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
    `;
  }
}

// === Gate Control Simulation ===
function openGate() {
  alert("🟢 Gate Opening... Access Granted!");
  document.getElementById("openGateBtn").disabled = true;
  document.getElementById("denyBtn").disabled = true;
}

function denyAccess() {
  alert("🔴 Access Denied. Invalid or Expired Ticket!");
  document.getElementById("openGateBtn").disabled = true;
  document.getElementById("denyBtn").disabled = true;
}

// === Logout ===
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
