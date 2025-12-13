fetch("http://localhost:3000/api/v1/restaurants", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  let list = document.getElementById("restList");

  for (let i = 0; i < data.data.length; i++) {
    let r = data.data[i];

    let li = document.createElement("li");
    li.innerHTML =
      r.NAME +
      " <button onclick='openMenu(" + r.ID + ")'>View Menu</button>";

    list.appendChild(li);
  }
});

function openMenu(id) {
  window.location.href = "menu.html?id=" + id;
}
