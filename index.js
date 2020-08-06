const timer = document.querySelector(".timer");
const endTime = document.querySelector(".end-time");
const buttons = document.querySelectorAll("[data-time]");
let countdown;

const timerGo = (seconds) => {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //make sure timer doesn't go below zero
    if (secondsLeft < 0) {
      clearInterval(countdown);

      document.querySelector("html").style.animation =
        "blinkingBackground 1s infinite";
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  let display = isNaN(seconds)
    ? "Please enter a valid number"
    : `${hours} : ${minutes < 10 ? "0" : ""}${minutes} : ${
        remainderSeconds < 10 ? "0" : ""
      }${remainderSeconds}`;

  // document.title = display;
  timer.innerHTML = display;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  muricanHour = hour > 12 ? hour - 12 : hour;

  const minutes = end.getMinutes();
  adjustedMinutes = minutes < 10 ? "0" : "";
  endTime.innerHTML = isNaN(timestamp)
    ? ""
    : `Done at ${muricanHour}:${adjustedMinutes}${minutes}`;
};

// const sirenTimerAlert = (index) => {
//   let colors = [
//     "linear-gradient(90deg,rgb(37, 52, 182) 0%,rgba(31, 31, 215, 1) 35%,rgb(0, 89, 255) 100%)",
//     "linear-gradient(90deg,rgb(224, 31, 31) 0%,rgb(165, 34, 17) 35%,rgb(245, 2, 2) 100%)",
//   ];

//   let body = document.querySelector("body");

//   body.style.background = colors[index];
//   index++;
//   if ((index = colors.length)) {
//     index = 0;
//   }
// };

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timerGo(seconds);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const minutes = this.minutes.value;
  timerGo(minutes * 60);
});
