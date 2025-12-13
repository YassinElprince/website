const getRestaurantId = () => {
  const query = window.location.search;   // "?id=1"
  const parts = query.split("=");         // ["?id", "1"]
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
  list.innerHTML = "";

  data.data.forEach(m => {
    if (m.RESTAURANT_ID == restaurantId) {
      const div = document.createElement("div");
      div.innerText = m.NAME + " - " + m.PRICE + " LE";
      list.appendChild(div);
    }
  });
};

document.getElementById("saveItem").onclick = async () => {
  const name = document.getElementById("itemName").value;
  const price = document.getElementById("itemPrice").value;
  const restaurantId = getRestaurantId();

  if (!name || !price) {
    alert("All fields required");
    return;
  }

  await fetch("http://localhost:3000/api/v1/menus", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      price: price,
      restaurant_id: restaurantId
    })
  });

  alert("Item added");
  location.reload();
};

loadMenu();
