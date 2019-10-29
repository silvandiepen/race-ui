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
  console.log(msg, window.location.hash);
  websocket.send(msg);
}

function startGame() {
  button.addEventListener("click", () => {
    button.classList.add("button--clicked");
    if (
      DeviceOrientationEvent &&
      DeviceOrientationEvent.requestPermission &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission().then(permissionState => {
        if (permissionState === "granted") {
          startPedal();
        }
      });
    } else {
      startPedal();
    }
  });
}

function handleOrientation(e) {
  console.log(e);
  // Check if rotation is between 90 and 0 and Round it off to a number between 0 and 255.
  const rotation = Math.round(
    ((100 / 90) * (e.beta > 90 ? 90 : e.beta < 0 ? 0 : e.beta) - 100) * -1
  );

  pedal.setAttribute("data-rotation", rotation);
  pedal.innerHTML = `<h2>${rotation}</h2>`;
  document.body.style.setProperty("--rotation", rotation);
  sendData(rotation);
}

function handleMouseMove(e) {
  // if out of the container, don't do anything.
  let PS = pedal.getBoundingClientRect();
  if (
    e.clientY < PS.top ||
    e.clientX < PS.left ||
    e.clientX > PS.left + PS.width ||
    e.clientY > PS.top + PS.height
  ) {
    return;
  } else {
    let value = Math.round(
      ((100 / PS.height) * (e.clientY - PS.top) - 100) * -1
    );
    pedal.setAttribute("data-rotation", value);
    pedal.innerHTML = `<h2>${value}</h2>`;
    document.body.style.setProperty("--rotation", value);
    sendData(value);
  }
}

function startPedal() {
  document.body.setAttribute("data-stage", 1);

  setTimeout(() => {
    document.body.setAttribute("data-stage", 2);
  }, 1000);
  setTimeout(() => {
    document.body.setAttribute("data-stage", 3);
  }, 2000);
  setTimeout(() => {
    document.body.setAttribute("data-stage", 4);
    document.body.classList.add("initialized");

    if (window.DeviceOrientationEvent) {
      console.log("initializedd deviceorientation");
      window.addEventListener("deviceorientation", e => {
        handleOrientation(e);
      });
      // MouseMove functionality
      document.addEventListener("mousemove", e => {
        handleMouseMove(e);
      });
    } else {
      // MouseMove functionality
      document.addEventListener("mousemove", e => {
        handleMouseMove(e);
      });
      console.log(" go do something with the pointer");
    }
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
  initSocket();
});
