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

    // alert("Cart updated!");
  } catch (error) {
    console.error("Error updating cart:", error);
    // alert(error.message || "Could not update cart. Please try again.");
  }
}

// Function to remove item from cart
async function removeFromCart(productId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://e-store-vmbx.onrender.com/api/cart/remove", {
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

    // alert("Item removed from cart!");
  } catch (error) {
    console.error("Error removing item:", error);
    // alert(error.message || "Could not remove item. Please try again.");
  }
}