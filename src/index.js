const pedal = document.querySelector(".pedal");
const button = document.querySelector("#go");

function handleOrientation(e) {
  //   const orientation = {
  //     absolute: event.absolute,
  //     alpha: event.alpha,
  //     beta: event.beta,
  //     gamma: event.gamma
  //   };

  // Check if rotation is between 90 and 0 and Round it off to a number between 0 and 255.
  const rotation = Math.round(
    ((100 / 90) * (e.beta > 90 ? 90 : e.beta < 0 ? 0 : e.beta) - 100) * -1
  );

  pedal.setAttribute("data-rotation", rotation);
  pedal.innerHTML = `<h2>${rotation}</h2>`;
  pedal.style.setProperty("--rotation", rotation);

  // Do stuff with the new orientation data
}
document.addEventListener("DOMContentLoaded", function() {
  console.log("Yeah.. lets go!");
});

function startPedal() {
  //   setTimeout(() => {
  document.body.setAttribute("data-stage", 1);
  //   }, 0);
  setTimeout(() => {
    document.body.setAttribute("data-stage", 2);
  }, 1000);
  setTimeout(() => {
    document.body.setAttribute("data-stage", 3);
  }, 2000);
  setTimeout(() => {
    document.body.setAttribute("data-stage", 4);
    document.body.classList.add("initialized");
    handleOrientation(e);
  }, 3000);
}

button.addEventListener("click", () => {
  button.classList.add("button--clicked");
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", e => {
            startPedal();
          });
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", e => {
      startPedal();
    });
  }
});
