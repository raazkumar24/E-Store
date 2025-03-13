// customAlert.js

// Function to show custom alert with image
export function showCustomAlert(imageUrl, productName) {
    const alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert");
    alertBox.innerHTML = `
      <div class="alert-content">
        <img src="${imageUrl}" alt="${productName}" class="alert-image">
        <p>${productName} has been added to your cart!</p>
        <button onclick="closeCustomAlert()">OK</button>
      </div>
    `;
    document.body.appendChild(alertBox);
  }
  
  // Function to close custom alert
  export function closeCustomAlert() {
    const alertBox = document.querySelector(".custom-alert");
    if (alertBox) {
      alertBox.remove();
    }
  }
  
  // Add some basic styles for the custom alert
  const style = document.createElement("style");
  style.textContent = `
    .custom-alert {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      text-align: center;
    }
    .alert-image {
      max-width: 100px;
      max-height: 100px;
      margin-bottom: 10px;
    }
    .alert-content button {
      margin-top: 10px;
      padding: 5px 10px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);