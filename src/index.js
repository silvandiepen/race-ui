const pedal = document.querySelector(".pedal");
const button = document.querySelector("#go");
const socketUrl = "wss://echo.websocket.org";

let websocket = null;

function initSocket() {
  websocket = new WebSocket(socketUrl);
  websocket.onopen = function(evt) {
    startGame();
  };
  websocket.onclose = function(evt) {
    // onClose(evt);
  };
  websocket.onmessage = function(evt) {
    // onMessage(evt);
  };
  websocket.onerror = function(evt) {
    // onError(evt);
  };
}

function sendData(msg) {
  websocket.send(msg);
}

function startGame() {
  button.addEventListener("click", () => {
    button.classList.add("button--clicked");
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === "granted") {
            startPedal();
          }
        })
        .catch(console.error);
    } else {
      startPedal();
    }
  });
}

function handleOrientation(e) {
  // Check if rotation is between 90 and 0 and Round it off to a number between 0 and 255.
  const rotation = Math.round(
    ((100 / 90) * (e.beta > 90 ? 90 : e.beta < 0 ? 0 : e.beta) - 100) * -1
  );

  pedal.setAttribute("data-rotation", rotation);
  pedal.innerHTML = `<h2>${rotation}</h2>`;
  pedal.style.setProperty("--rotation", rotation);
  sendData(rotation);
}

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

    window.addEventListener("deviceorientation", e => {
      handleOrientation(e);
    });
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
  initSocket();
});
