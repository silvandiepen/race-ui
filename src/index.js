const paddle = document.querySelector(".paddle");

console.log(paddle);

function handleOrientation(event) {
  console.log("does it");
  alert("yeah");
  const orientation = {
    absolute: event.absolute,
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  console.log(orientation);

  paddle.innerHTML = `<p>${orientation.beta}</p>`;

  rotation = 0;
  if (event.beta > 90) rotation = 90;
  else if (event.beta < 0) rotation = 0;

  rotation = Math.round((255 / 90) * rotation);

  paddle.setAttribute("data-rotation", rotation);
  paddle.innerHTML = `<h2>${rotation}</h2>`;

  // Do stuff with the new orientation data
}
if (window.DeviceOrientationEvent) {
  // setup real compass thing, with event.alpha
  document.body.innerHTML = "haz!";
} else {
  // setup some mouse following hack
  document.body.innerHTML = "nope";
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("Yeah.. lets go!  fdasfas");
  window.addEventListener("deviceorientation", handleOrientation, true);
});
