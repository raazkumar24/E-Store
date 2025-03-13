// // frontend/js/cart.js

// document.addEventListener("DOMContentLoaded", async () => {
//   const cartItemsContainer = document.getElementById("cart-items");

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please log in to view your cart.");
//       window.location.href = "login.html";
//       return;
//     }

//     const response = await fetch("http://localhost:5000/api/cart", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server");
//     }

//     const cart = await response.json();

//     if (!cart || !cart.items.length) {
//       cartItemsContainer.innerHTML = "<p class='text-gray-500'>Your cart is empty.</p>";
//       return;
//     }

//     let totalPrice = 0;
//     cartItemsContainer.innerHTML = cart.items
//       .map(
//         (item) => {
//           const itemTotal = item.product.price * item.quantity;
//           totalPrice += itemTotal;
//           return `
//             <div class="bg-white p-4 rounded-lg shadow-md">
//               <h3 class="text-lg font-semibold">${item.product.name}</h3>
//               <p class="text-gray-600">Price: $${item.product.price}</p>
//               <div class="flex items-center mt-2">
//                 <button onclick="updateCartItem('${item.product._id}', ${item.quantity - 1})" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-l">-</button>
//                 <span class="bg-gray-100 px-4 py-1">${item.quantity}</span>
//                 <button onclick="updateCartItem('${item.product._id}', ${item.quantity + 1})" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-r">+</button>
//               </div>
//               <p class="text-blue-600 font-bold mt-1">Total: $${itemTotal.toFixed(2)}</p>
//               <button onclick="removeFromCart('${item.product._id}')" class="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
//                 Remove
//               </button>
//             </div>
//           `;
//         }
//       )
//       .join("");

//     // Display total cart price
//     cartItemsContainer.innerHTML += `
//       <div class="bg-white p-4 rounded-lg shadow-md mt-4">
//         <h3 class="text-lg font-semibold">Total Cart Price</h3>
//         <p class="text-blue-600 font-bold">$${totalPrice.toFixed(2)}</p>
//       </div>
//     `;
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     cartItemsContainer.innerHTML = "<p class='text-red-500'>Error loading cart.</p>";
//   }
// });

// // Function to update cart item quantity
// async function updateCartItem(productId, quantity) {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await fetch("http://localhost:5000/api/cart/update", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId, quantity }),
//     });

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server");
//     }

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Failed to update cart");

//     alert("Cart updated!");
//     window.location.reload(); // Refresh the page to reflect changes
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     alert(error.message || "Could not update cart. Please try again.");
//   }
// }

// // Function to remove item from cart
// async function removeFromCart(productId) {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await fetch("http://localhost:5000/api/cart/remove", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId }),
//     });

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server");
//     }

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Failed to remove item");

//     alert("Item removed from cart!");
//     window.location.reload(); // Refresh the page to reflect changes
//   } catch (error) {
//     console.error("Error removing item:", error);
//     alert(error.message || "Could not remove item. Please try again.");
//   }
// }


// frontend/js/cart.js

// document.addEventListener("DOMContentLoaded", async () => {
//   const cartItemsContainer = document.getElementById("cart-items");
//   const cartItemTemplate = document.getElementById("cart-item-template");

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please log in to view your cart.");
//       window.location.href = "login.html";
//       return;
//     }

//     const response = await fetch("http://localhost:5000/api/cart", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server");
//     }

//     const cart = await response.json();
//     if (!cart || !cart.items.length) {
//       cartItemsContainer.innerHTML =
//         "<p class='text-gray-500'>Your cart is empty.</p>";
//       return;
//     }

//     let totalPrice = 0;
//     cartItemsContainer.innerHTML = ""; // Clear existing items

//     cart.items.forEach((item) => {
//       const itemTotal = item.product.price * item.quantity;
//       totalPrice += itemTotal;

//       // Clone the template
//       const cartItem = cartItemTemplate.content.cloneNode(true);

//       // Populate template with data
//       cartItem.querySelector(".product-name").textContent = item.product.name;
//       cartItem.querySelector(".product-image").src = item.product.image;
//       cartItem.querySelector(".product-price").textContent = `Price: $${item.product.price}`;
//       cartItem.querySelector(".product-quantity").textContent = item.quantity;
//       cartItem.querySelector(
//         ".item-total"
//       ).textContent = `Total: $${itemTotal.toFixed(2)}`;

//       // Add event listeners
//       cartItem
//         .querySelector(".decrease-qty")
//         .addEventListener("click", () =>
//           updateCartItem(item.product._id, item.quantity - 1)
//         );
//       cartItem
//         .querySelector(".increase-qty")
//         .addEventListener("click", () =>
//           updateCartItem(item.product._id, item.quantity + 1)
//         );
//       cartItem
//         .querySelector(".remove-item")
//         .addEventListener("click", () => removeFromCart(item.product._id));

//       // Append to cart container
//       cartItemsContainer.appendChild(cartItem);
//     });

//     // Update total price
//     document.getElementById("total-price").textContent = `$${totalPrice.toFixed(
//       2
//     )}`;
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     cartItemsContainer.innerHTML =
//       "<p class='text-red-500'>Error loading cart.</p>";
//   }
// });

// // Function to update cart item quantity
// async function updateCartItem(productId, quantity) {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await fetch("http://localhost:5000/api/cart/update", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId, quantity }),
//     });

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server");
//     }

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Failed to update cart");

//     alert("Cart updated!");
//     window.location.reload(); // Refresh the page to reflect changes
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     alert(error.message || "Could not update cart. Please try again.");
//   }
// }

// // Function to remove item from cart
// async function removeFromCart(productId) {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await fetch("http://localhost:5000/api/cart/remove", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId }),
//     });

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Invalid response from server");
//     }

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Failed to remove item");

//     alert("Item removed from cart!");
//     window.location.reload(); // Refresh the page to reflect changes
//   } catch (error) {
//     console.error("Error removing item:", error);
//     alert(error.message || "Could not remove item. Please try again.");
//   }
// }


// frontend/js/cart.js

document.addEventListener("DOMContentLoaded", async () => {
  const cartItemsContainer = document.getElementById("cart-items");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view your cart.");
      window.location.href = "login.html";
      return;
    }

    const response = await fetch("https://e-store-vmbx.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }

    const cart = await response.json();
    updateCartUI(cart); // Render the cart UI
  } catch (error) {
    console.error("Error fetching cart:", error);
    cartItemsContainer.innerHTML =
      "<p class='text-red-500'>Error loading cart.</p>";
  }
});

// Function to update the cart UI dynamically
function updateCartUI(cart) {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartItemTemplate = document.getElementById("cart-item-template");

  if (!cart || !cart.items.length) {
    cartItemsContainer.innerHTML =
      "<p class='text-gray-500'>Your cart is empty.</p>";
    return;
  }

  let totalPrice = 0;
  cartItemsContainer.innerHTML = ""; // Clear existing items

  cart.items.forEach((item) => {
    const itemTotal = item.product.price * item.quantity;
    totalPrice += itemTotal;

    // Clone the template
    const cartItem = cartItemTemplate.content.cloneNode(true);

    // Populate template with data
    cartItem.querySelector(".product-name").textContent = item.product.name;
    cartItem.querySelector(".product-image").src = item.product.image;
    cartItem.querySelector(".product-price").textContent = `Price: $${item.product.price}`;
    cartItem.querySelector(".product-quantity").textContent = item.quantity;
    cartItem.querySelector(
      ".item-total"
    ).textContent = `Total: $${itemTotal.toFixed(2)}`;

    // Add event listeners for buttons
    cartItem
      .querySelector(".decrease-qty")
      .addEventListener("click", () =>
        updateCartItem(item.product._id, item.quantity - 1)
      );
    cartItem
      .querySelector(".increase-qty")
      .addEventListener("click", () =>
        updateCartItem(item.product._id, item.quantity + 1)
      );
    cartItem
      .querySelector(".remove-item")
      .addEventListener("click", () => removeFromCart(item.product._id));

    // Append to cart container
    cartItemsContainer.appendChild(cartItem);
  });

  // Update total price
  document.getElementById("total-price").textContent = `$${totalPrice.toFixed(
    2
  )}`;
}

// Function to update cart item quantity
async function updateCartItem(productId, quantity) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://e-store-vmbx.onrender.com/api/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update cart");

    // Fetch the updated cart data
    const updatedCartResponse = await fetch("https://e-store-vmbx.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedCart = await updatedCartResponse.json();
    updateCartUI(updatedCart); // Update the DOM with the new cart data

    // Refresh cart count
    await getCart(); // Call getCart to update the cart count
  } catch (error) {
    console.error("Error updating cart:", error);
  }
}
// Function to remove item from cart
async function removeFromCart(productId) {
  try {
    const token = localStorage.getItem("token");
    // const response = await fetch("http://localhost:5000/api/cart/remove",
    const response = await fetch("https://e-store-vmbx.onrender.com/api/cart/remove", 

       {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to remove item");

    // Fetch the updated cart data
    const updatedCartResponse = await fetch("https://e-store-vmbx.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedCart = await updatedCartResponse.json();
    updateCartUI(updatedCart); // Update the DOM with the new cart data

    // Refresh cart count
    await getCart(); // Call getCart to update the cart count
  } catch (error) {
    console.error("Error removing item:", error);
  }
}