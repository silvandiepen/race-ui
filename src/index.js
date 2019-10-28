const paddle = document.querySelector(".pedal");

function handleOrientation(event) {
  //   const orientation = {
  //     absolute: event.absolute,
  //     alpha: event.alpha,
  //     beta: event.beta,
  //     gamma: event.gamma
  //   };

  // Check if rotation is between 90 and 0 and Round it off to a number between 0 and 255.
  rotation = Math.round(
    (255 / 90) * (event.beta > 90 ? 90 : event.beta < 0 ? 0 : event.beta)
  );

  paddle.setAttribute("data-rotation", rotation);
  paddle.innerHTML = `<h2>${rotation}</h2>`;

  // Do stuff with the new orientation data
}
document.addEventListener("DOMContentLoaded", function() {
  console.log("Yeah.. lets go!  fdasfas");
  window.addEventListener("deviceorientation", handleOrientation, true);
});
