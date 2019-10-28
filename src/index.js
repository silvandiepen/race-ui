const paddle = document.querySelector(".pedal");

console.log(paddle);

function handleOrientation(event) {
  const orientation = {
    absolute: event.absolute,
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  paddle.innerHTML = `<p>${orientation.beta}</p>`;

  rotation = 0;
  if (event.beta > 90) rotation = 90;
  else if (event.beta < 0) rotation = 0;

  rotation = Math.round((255 / 90) * rotation);

  paddle.setAttribute("data-rotation", rotation);
  paddle.innerHTML = `<h2>${rotation}</h2>`;

  // Do stuff with the new orientation data
}
document.addEventListener("DOMContentLoaded", function() {
  console.log("Yeah.. lets go!  fdasfas");
  window.addEventListener("deviceorientation", handleOrientation, true);
});
