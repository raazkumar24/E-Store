const backendURL = "https://e-store-vmbx.onrender.com/api";

/* ---------------------------- User Authentication State ---------------------------- */
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const loggedInSection = document.getElementById("logged-in-section");
const notLoggedInSection = document.getElementById("not-logged-in-section");
const userIcon = document.getElementById("user-icon");
const userDropdown = document.getElementById("user-dropdown");
const userInfo = document.getElementById("user-info");

// Check if user is logged in
if (user && token) {
    loggedInSection?.classList.remove("hidden");
    notLoggedInSection?.classList.add("hidden");
    userInfo.innerHTML = `Logged in as: <b>${user.name}</b>`;
} else {
    loggedInSection?.classList.add("hidden");
    notLoggedInSection?.classList.remove("hidden");
}

// Toggle user dropdown
userIcon?.addEventListener("click", () => {
    userDropdown.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!userDropdown?.contains(e.target) && !userIcon?.contains(e.target)) {
        userDropdown?.classList.add("hidden");
    }
});

// Logout functionality
document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "pages/login.html";
});

/* ---------------------------- Mobile Menu Toggle ---------------------------- */
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});

/* ---------------------------- Banner Slider ---------------------------- */
const slides = document.querySelectorAll("[data-slide]");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
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

prevButton?.addEventListener("click", prevSlide);
nextButton?.addEventListener("click", nextSlide);

// Auto-play slider every 5 seconds
setInterval(nextSlide, 5000);

// Show first slide initially
showSlide(currentSlide);

/* ---------------------------- Cart Count Update ---------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
    if (user && token) {
        try {
            const response = await fetch(`${backendURL}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch cart");

            const cart = await response.json();
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

/* ---------------------------- Product Search ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("input[type='text']");
    const productContainer = document.getElementById("product-list");

    const products = [
        { name: "Laptop", category: "Electronics" },
        { name: "Smartphone", category: "Electronics" },
        { name: "Shoes", category: "Fashion" },
        { name: "T-Shirt", category: "Clothing" },
        { name: "Headphones", category: "Accessories" },
    ];

    function renderProducts(filteredProducts) {
        productContainer.innerHTML = "";
        filteredProducts.forEach(product => {
            const productItem = document.createElement("div");
            productItem.textContent = product.name;
            productItem.classList.add("p-2", "border", "border-gray-300", "rounded-md", "my-1");
            productContainer.appendChild(productItem);
        });
    }

    searchInput?.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    });

    renderProducts(products);
});
