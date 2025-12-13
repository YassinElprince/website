const getRestaurantId = () => {
  const query = window.location.search;
  const parts = query.split("=");
  return parts[1];
};

const loadMenu = async () => {
  const restaurantId = getRestaurantId();

  const res = await fetch("http://localhost:3000/api/v1/menus", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await res.json();
  const list = document.getElementById("menuList");

  data.data.forEach(m => {
    if (m.RESTAURANT_ID == restaurantId) {
      const div = document.createElement("div");
      div.innerHTML =
        m.NAME + " - " + m.PRICE + " LE " +
        "<button onclick='orderItem(\"" + m.NAME + "\"," + restaurantId + ")'>Order</button>";
      list.appendChild(div);
    }
  });
};

const orderItem = async (itemName, restaurantId) => {
  const email = prompt("Enter your email again:");
  if (!email) return;

  await fetch("http://localhost:3000/api/v1/orders", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      customer_email: email,
      restaurant_id: restaurantId,
      items: itemName
    })
  });

  alert("Order placed successfully");
};

loadMenu();
