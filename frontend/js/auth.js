const backendURL = "https://e-store-vmbx.onrender.com/api";

// Register User
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch(`${backendURL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
          credentials: "include", // ✅ Important for cookies/sessions
        });

        const data = await res.json();
        if (res.ok) {
          alert("Registration successful! Please log in.");
          window.location.href = "login.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    });
  }
});

// Login User
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch(`${backendURL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Login successful!");
          window.location.href = "../index.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    });
  }
});
