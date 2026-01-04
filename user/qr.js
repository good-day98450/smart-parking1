window.onload = function () {
  generateQRCode();
  displayBookingDetails();
  initQRScanner();
};

// === Generate QR from booking data ===
function generateQRCode() {
  const booking = JSON.parse(localStorage.getItem("currentBooking"));
  if (!booking) {
    alert("No booking found!");
    return;
  }

  const qr = new QRious({
    element: document.getElementById("qrCode"),
    value: JSON.stringify(booking),
    size: 200,
    background: "white",
    foreground: "#2b5876"
  });
}

// === Show Booking Info ===
function displayBookingDetails() {
  const booking = JSON.parse(localStorage.getItem("currentBooking"));
  const div = document.getElementById("bookingDetails");

  if (!booking) {
    div.innerHTML = "<p>No booking found!</p>";
    return;
  }

  div.innerHTML = `
    <p><strong>Slot:</strong> ${booking.slotId}</p>
    <p><strong>Vehicle Type:</strong> ${booking.vehicleType}</p>
    <p><strong>Payment:</strong> ${booking.paymentStatus}</p>
    <p><strong>Time:</strong> ${booking.time}</p>
  `;
}

// === Download QR as Image ===
function downloadQR() {
  const canvas = document.getElementById("qrCode");
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "ParkingQR.png";
  link.click();
}

// === QR Scanner Setup (Gate Entry Simulation) ===
function initQRScanner() {
  const videoElem = document.getElementById("preview");
  const resultElem = document.getElementById("scanResult");

  const scanner = new Html5Qrcode("preview");

  Html5Qrcode.getCameras().then(cameras => {
    if (cameras && cameras.length) {
      const camId = cameras[0].id;
      scanner.start(
        camId,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          resultElem.innerText = "✅ QR Verified: Access Granted!";
          scanner.stop().then(() => console.log("Scanner stopped."));
        },
        (errorMsg) => {
          console.log(errorMsg);
        }
      );
    }
  }).catch(err => console.error("Camera error:", err));
}

function goToDashboard() {
  window.location.href = "dashboard.html";
}
