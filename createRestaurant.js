document.getElementById("saveRest").onclick = function(){

  const name = document.getElementById("restName").value;
  const location = document.getElementById("restLocation").value;
  const food = document.getElementById("restFood").value;
  const rating = document.getElementById("restRating").value;
  const userId = localStorage.getItem("userId");

  if (!name || !location || !food || !rating) {
    alert("All fields required");
    return;
  }

  fetch("http://localhost:3000/api/v1/restaurants", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      location: location,
      food: food,
      rating: rating,
      user_id: userId
    })
  })
  .then(function(res){ return res.json(); })
  .then(function(data){
    alert("Restaurant created");
    window.location.href = "ownerMenu.html?id=" + data.data;
  })
  .catch(function(){
    alert("Error creating restaurant");
  });
}
