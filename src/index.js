const paddle = document.querySelector(".paddle");

function handleOrientation(event) {
  const orientation = {
    absolute: event.absolute,
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  console.log(orientation);

  paddle.innerHTML = `<p>${orientation.absolute}</p><p>${orientation.alpha}</p><p>${orientation.beta}</p><p>${orientation.gamma}</p>`;

  // Do stuff with the new orientation data
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("Yeah.. lets go!");
  window.addEventListener("deviceorientation", handleOrientation, true);
});
