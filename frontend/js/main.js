// User Authentication State
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const loggedInSection = document.getElementById("logged-in-section");
const notLoggedInSection = document.getElementById("not-logged-in-section");
const userIcon = document.getElementById("user-icon");
const userDropdown = document.getElementById("user-dropdown");
const userInfo = document.getElementById("user-info");

// Check if user is logged in
if (user && token) {
    // Show logged-in section
    loggedInSection.classList.remove("hidden");
    notLoggedInSection.classList.add("hidden");

    // Display user info in dropdown
    userInfo.innerHTML = `Logged in as: <b>${user.name}</b>`;
} else {
    // Show not-logged-in section
    loggedInSection.classList.add("hidden");
    notLoggedInSection.classList.remove("hidden");
}

// Toggle user dropdown
userIcon?.addEventListener("click", () => {
    userDropdown.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!userDropdown.contains(e.target) && !userIcon.contains(e.target)) {
        userDropdown.classList.add("hidden");
    }
});

// Logout functionality
document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "pages/login.html";
});

/* --------------------------------- Mobile Menu Toggle --------------------------------- */
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

// Toggle mobile menu
mobileMenuButton?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
mobileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});

/* --------------------------------- Banner Slider --------------------------------- */
const slides = document.querySelectorAll('[data-slide]');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Auto-play the slider
setInterval(nextSlide, 5000);

// Show the first slide initially
showSlide(currentSlide);


document.addEventListener("DOMContentLoaded", async () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
        // Fetch the cart and update the cart count
        try {
            const response = await fetch("https://e-commerce-website-1-7hit.onrender.com/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch cart");

            const cart = await response.json();

            // Update the cart count in the header
            const cartCountElement = document.getElementById("cart-count");
            if (cartCountElement) {
                const totalItems = cart.products.reduce((total, item) => total + item.quantity, 0);
                cartCountElement.textContent = totalItems;
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("input[type='text']");
    const productContainer = document.getElementById("product-list"); // Ensure you have this container in HTML

    const products = [
        { name: "Laptop", category: "Electronics" },
        { name: "Smartphone", category: "Electronics" },
        { name: "Shoes", category: "Fashion" },
        { name: "T-Shirt", category: "Clothing" },
        { name: "Headphones", category: "Accessories" }
    ];

    function renderProducts(filteredProducts) {
        productContainer.innerHTML = ""; // Clear previous results
        filteredProducts.forEach(product => {
            const productItem = document.createElement("div");
            productItem.textContent = product.name;
            productItem.classList.add("p-2", "border", "border-gray-300", "rounded-md", "my-1");
            productContainer.appendChild(productItem);
        });
    }

    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    });

    // Initial rendering of all products
    renderProducts(products);
});
