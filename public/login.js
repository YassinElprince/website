document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let valid = true;
  if (!email.includes("@")) {
    document.getElementById("loginEmailErr").innerText = "Invalid email format";
    valid = false;
  } else document.getElementById("loginEmailErr").innerText = "";

  if (password.length < 6) {
    document.getElementById("loginPassErr").innerText = "Min 6 characters";
    valid = false;
  } else document.getElementById("loginPassErr").innerText = "";
  
  if (!valid) return;

  try {
    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    
    const data = await res.json();
    if (res.ok) {
      console.log("Role =", data.user.role);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);

      alert(data.message);

      if (data.user.role === "customer") {
        window.location.href = "home.html";
      } 
      else if (data.user.role === "owner") {
        window.location.href = "ownerMenu.html?id=1";
      } 
      else if (data.user.role === "driver") {
        window.location.href = "driver.html";
      }

    } else {
      alert(data.message || "Login failed");
    }

  } catch (err) {
    console.error(err);
    alert("Could not connect to server. Try again later.");
  }
});
