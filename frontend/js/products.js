// document.addEventListener("DOMContentLoaded", async () => {
//   const productContainer = document.getElementById("product-container");

//   try {
//     // Fetch products from the backend
//     const res = await fetch("https://e-store-vmbx.onrender.com/api/products");
//     const products = await res.json();

//     // If no products are available, display a message
//     if (products.length === 0) {
//       productContainer.innerHTML = "<p class='text-center text-gray-500'>No products available.</p>";
//       return;
//     }

//     // Loop through the products and create product cards
//     products.forEach((product) => {
//       const productCard = document.createElement("div");
//       productCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md", "hover:shadow-lg", "transition");

//       // Product card HTML
//       productCard.innerHTML = `
//         <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-contain rounded-lg">
//         <h3 class="text-lg font-semibold mt-2">${product.name}</h3>
//         <p class="text-gray-600">${product.description}</p>
//         <p class="text-blue-600 font-bold mt-1">$${product.price}</p>
//         <div class="flex items-center mt-2">
//           <button onclick="decreaseQuantity('${product._id}')" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-l">-</button>
//           <span id="quantity-${product._id}" class="bg-gray-100 px-4 py-1">1</span>
//           <button onclick="increaseQuantity('${product._id}')" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-r">+</button>
//         </div>
//         <button onclick="addToCart('${product._id}')" class="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
//           Add to Cart
//         </button>
//       `;

//       // Append the product card to the container
//       productContainer.appendChild(productCard);
//     });
//   } catch (error) {
//     // Display an error message if products fail to load
//     productContainer.innerHTML = "<p class='text-center text-red-500'>Error loading products.</p>";
//   }
// });

// // Function to increase quantity
// function increaseQuantity(productId) {
//   const quantityElement = document.getElementById(`quantity-${productId}`);
//   let quantity = parseInt(quantityElement.textContent);
//   quantity += 1;
//   quantityElement.textContent = quantity;
// }

// // Function to decrease quantity
// function decreaseQuantity(productId) {
//   const quantityElement = document.getElementById(`quantity-${productId}`);
//   let quantity = parseInt(quantityElement.textContent);
//   if (quantity > 1) {
//     quantity -= 1;
//     quantityElement.textContent = quantity;
//   }
// }

// // Function to fetch and update the cart count
// async function getCart() {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("User not logged in");
//       return;
//     }

//     // Fetch the cart from the backend
//     const response = await fetch("https://e-store-vmbx.onrender.com/api/cart", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     console.log("Cart data on page load:", data); // Debugging

//     // Ensure cart data exists
//     if (!data || !data.items) {
//       console.log("No cart items found");
//       return;
//     }

//     // Update the cart count in the header
//     const cartCountElement = document.getElementById("cart-count");
// if (cartCountElement) {
//   // Count the number of unique products in the cart
//   const uniqueProductCount = data.items.length; // Each item represents a unique product
//   cartCountElement.textContent = uniqueProductCount;
// }
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//   }
// }

// // Call getCart on page load to update the cart count
// document.addEventListener("DOMContentLoaded", getCart);

// // Function to add to cart
// async function addToCart(productId) {
//   const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
//   console.log("Adding to cart:", productId, "Quantity:", quantity); // Debugging

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please log in to add products to your cart.");
//       window.location.href = "pages/login.html";
//       return;
//     }

//     // Send a request to add the product to the cart
//     const response = await fetch("https://e-store-vmbx.onrender.com/api/cart/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId, quantity }), // Make sure quantity is being sent
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Failed to add product to cart");

//     alert("Product added to cart!");
//     getCart(); // Refresh cart count
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     alert(error.message || "Could not add product to cart. Please try again.");
//   }
// }

document.addEventListener("DOMContentLoaded", async () => {
  const productContainer = document.getElementById("product-container");
  const productTemplate = document.getElementById("product-template").content;
  const searchInput = document.getElementById("search-input");
  const API_URL = "https://e-store-vmbx.onrender.com"

  let products = []; // Store the fetched products globally

  try {
    // Fetch products from the backend
    // const res = await fetch("https://e-store-vmbx.onrender.com/api/products");
    const res = await fetch(`${API_URL}/api/products`);

    if (!res.ok) throw new Error("Failed to fetch products");

    products = await res.json();

    // Initial display of products
    displayProducts(products);

    // Add event listener for search input
    searchInput.addEventListener("input", (e) => {
      const searchQuery = e.target.value.toLowerCase();
      const filteredProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery)
        );
      });
      displayProducts(filteredProducts);
    });
  } catch (error) {
    // Display an error message if products fail to load
    productContainer.innerHTML =
      "<p class='text-center text-red-500'>Error loading products.</p>";
    console.error("Error:", error);
  }

  // Function to display products
  function displayProducts(productsToDisplay) {
    productContainer.innerHTML = ""; // Clear existing products

    if (productsToDisplay.length === 0) {
      productContainer.innerHTML =
        "<p class='text-center text-gray-500'>No products found.</p>";
      return;
    }

    // Loop through the products and create product cards
    productsToDisplay.forEach((product) => {
      const productCard = document.importNode(productTemplate, true);

      // Populate the template with product data
      productCard.querySelector(".product-category").textContent = product.category;
      productCard.querySelector(".product-image").src = product.image;
      productCard.querySelector(".product-image").alt = product.name;
      productCard.querySelector(".product-name").textContent = product.name;
      productCard.querySelector(".product-description").textContent =
        product.description;
      productCard.querySelector(
        ".product-price"
      ).textContent = `$${product.price}`;
      productCard.querySelector(".product-ratings").textContent =
        product.rating;

      const ratingElement = productCard.querySelector(".product-ratings");
      if (ratingElement) {
        ratingElement.innerHTML = generateStarRating(product.rating);
      }

      function generateStarRating(rating) {
        let starsHTML = "";
        const fullStars = Math.floor(rating); // Full stars count
        const halfStar = rating % 1 !== 0; // Check for half star

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
          starsHTML += '<i class="fas fa-star text-yellow-500"></i> '; // Solid star
        }

        // Add half star if needed
        if (halfStar) {
          starsHTML += '<i class="fas fa-star-half-alt text-yellow-500"></i> ';
        }

        // Add empty stars to maintain a 5-star layout
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
          starsHTML += '<i class="far fa-star text-gray-400"></i> '; // Outline star
        }

        // Append the numeric rating
        starsHTML += `<span class="text-gray-700">(${rating.toFixed(
          1
        )})</span>`;

        return starsHTML;
      }

      // Add event listeners for quantity buttons
      const quantityElement = productCard.querySelector(".quantity");
      productCard
        .querySelector(".increase-qty")
        .addEventListener("click", () => {
          let quantity = parseInt(quantityElement.textContent);
          quantity += 1;
          quantityElement.textContent = quantity;
        });
      productCard
        .querySelector(".decrease-qty")
        .addEventListener("click", () => {
          let quantity = parseInt(quantityElement.textContent);
          if (quantity > 1) {
            quantity -= 1;
            quantityElement.textContent = quantity;
          }
        });

      // Add event listener for "Add to Cart" button
      productCard
        .querySelector(".add-to-cart")
        .addEventListener("click", () => {
          addToCart(product._id, parseInt(quantityElement.textContent));
        });

      // Append the product card to the container
      productContainer.appendChild(productCard);
    });
  }
});

// Function to add to cart
async function addToCart(productId, quantity) {
  console.log("Adding to cart:", productId, "Quantity:", quantity); // Debugging

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add products to your cart.");
      window.location.href = "pages/login.html";
      return;
    }

    // Fetch product details to get the image
    // const productResponse = await fetch(
    //   `https://e-store-vmbx.onrender.com/api/products/${productId}`
    // );
    const productResponse = await fetch(
      `${API_URL}/api/products/${productId}`
   );
    if (!productResponse.ok) throw new Error("Failed to fetch product details");

    const product = await productResponse.json();

    // Send a request to add the product to the cart
    // const response = await fetch("https://e-store-vmbx.onrender.com/api/cart/add", 
    const response = await fetch(`${API_URL}/api/cart/add`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to add product to cart");
    }

    // Show custom alert with image
    showCustomAlert(product.image, product.name);

    // Refresh cart count
    await getCart(); // Call getCart to update the cart count
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert(error.message || "Could not add product to cart. Please try again.");
  }
}

// Function to show custom alert
function showCustomAlert(imageUrl, productName) {
  // Remove existing alert if any
  const existingAlert = document.querySelector(".custom-alert");
  if (existingAlert) existingAlert.remove();

  const alertBox = document.createElement("div");
  alertBox.classList.add("custom-alert");
  alertBox.innerHTML = `
    <div class="card">
      <div class="card-wrapper">
        <div class="card-icon">
          <div class="icon-cart-box">
            <svg viewBox="0 0 576 512" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" fill="#009688"></path>
            </svg>
          </div>
        </div>
        <div class="card-content">
          <div class="card-title-wrapper">
            <span class="card-title">Added to cart!</span>
            <span class="card-action" onclick="closeCustomAlert(event)">
              <svg viewBox="0 0 384 512" width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
              </svg>
            </span>
          </div>
          <div class="product-name">${productName}</div>
          <div class="product-price">Added to your cart</div>
          <button class="btn-view-cart" onclick="window.location.href='pages/cart.html'">View Cart</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(alertBox);

  // Auto remove alert after 3 seconds
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// Function to close custom alert
function closeCustomAlert(event) {
  const alertBox = event.target.closest(".custom-alert");
  if (alertBox) {
    alertBox.remove();
  }
}

// Function to fetch and update the cart count
async function getCart() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User not logged in");
      return;
    }

    // Fetch the cart from the backend
    // const response = await fetch("https://e-store-vmbx.onrender.com/api/cart",
    const response = await fetch(`${API_URL}/api/cart`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch cart");

    const data = await response.json();
    console.log("Cart data on page load:", data); // Debugging

    // Update the cart count in the header
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const totalItems = data.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      cartCountElement.textContent = totalItems;
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}

// Call getCart on page load to update the cart count
document.addEventListener("DOMContentLoaded", getCart);