const paddle = document.querySelector(".paddle");

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;

  paddle.innerHTML = `<p>${absolute}</p><p>${alpha}</p><p>${beta}</p><p>${gamma}</p>`;

  // Do stuff with the new orientation data
}

window.addEventListener("deviceorientation", handleOrientation, true);
