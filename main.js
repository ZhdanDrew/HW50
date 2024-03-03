// BOM

setInterval;
setTimeout;

// const timeout = setTimeout(() => {
//   alert("Subscribe to the mailing");
// }, 5000);

// console.log(timeout);

// clearTimeout(timeout);

// [1, 2, 3, 4, 5].forEach((el) => {
//   setTimeout(() => {
//     console.log("Timeout", el);
//     document.title = el;
//     window.open(`https://google.com`);
//   }, el * 1000);
// });

// setTimeout(() => {
//   window.close();
// }, 5000);

// setInterval(() => {
//   console.log("Interval :)");
// }, 3000);
const normalizeTimeValue = (timeValue) => {
  return timeValue.toString().length > 1 ? `${timeValue}` : `0${timeValue}`;
};

const getTime = (seconds) => {
  const date = new Date();

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  date.setMilliseconds(seconds);

  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateSeconds = date.getSeconds();
  const dateMilliseconds = String(date.getMilliseconds()).slice(0, 2);

  return `${normalizeTimeValue(dateHours)}:${normalizeTimeValue(
    dateMinutes
  )}:${normalizeTimeValue(dateSeconds)}:${normalizeTimeValue(
    dateMilliseconds
  )}`;
};

let timer = undefined;
let secondsValue = 0;

const seconds = document.querySelector("#seconds");

const buttons = {
  start: document.querySelector("#start-btn"),
  stop: document.querySelector("#stop-btn"),
  reset: document.querySelector("#reset-btn"),
  decrease: document.querySelector("#decrease-10"),
  increase: document.querySelector("#increase-10"),
};

buttons.start.onclick = () => {
  if (!timer) {
    timer = setInterval(() => {
      secondsValue = secondsValue + 100;
      seconds.textContent = getTime(secondsValue);
    }, 100);
  }
};

buttons.stop.onclick = () => {
  clearInterval(timer);
  timer = undefined;
};

buttons.reset.onclick = () => {
  secondsValue = 0;
  seconds.textContent = "00:00:00:00";
};

buttons.decrease.onclick = () => {
  secondsValue = secondsValue - 10000 >= 0 ? secondsValue - 10000 : 0;
  seconds.textContent = getTime(secondsValue);
};

buttons.increase.onclick = () => {
  secondsValue += 10000;
  seconds.textContent = getTime(secondsValue);
};

const reloadButton = document.querySelector("#reload");

reloadButton.onclick = () => {
  window.location.reload();
};

console.log(window.location);
console.log(window.navigator);

const copyButton = document.querySelector("#copy");
const pasteInput = document.querySelector("#paste");

copyButton.onclick = async () => {
  await window.navigator.clipboard.writeText("Copy");
  const text = await window.navigator.clipboard.readText();
  pasteInput.value = text;
};

pasteInput.oninput = (event) => {
  window.navigator.clipboard.writeText(event.target.value);
};

window.navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position, "positon");
  },
  (error) => {
    console.log(error);
  }
);

window.navigator.geolocation.watchPosition(
  (postion) => {
    console.log(postion, "position");
  },
  (error) => {
    console.log(error);
  }
);

// not works on desktop
// console.log(
//   window.navigator.bluetooth.getAvailability().then((r) => {
//     console.log(r, "!!!");
//     window.navigator.bluetooth.requestDevice();
//   }),
//   "bluetooth"
// );

console.log(window.navigator.language, "language");
console.log(window.navigator.languages, "langs");

window.navigator.languages
  .filter((langName) => langName.length === 2)
  .forEach((langName) => {
    const button = document.createElement("button");
    button.textContent = langName.toUpperCase();

    button.onclick = () => console.log(langName);
    document.body.appendChild(button);
  });


  document.addEventListener("DOMContentLoaded", () => {
    const locationButton = document.querySelector("#show-location");
    const locationInfo = document.querySelector("#location-info");

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                locationInfo.textContent = `Ваша геолокація: Широта - ${latitude}, Довгота - ${longitude}`;
            }, (error) => {
                console.error("Помилка отримання геолокації:", error.message);
                locationInfo.textContent = "Не вдалося отримати геолокацію.";
            });
        } else {
            locationInfo.textContent = "Геолокація не підтримується цим браузером.";
        }
    });
});
