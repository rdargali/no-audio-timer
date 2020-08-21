const timer = document.querySelector(".timer");
const endTime = document.querySelector(".end-time");
const restartButton = document.querySelector(".restart-button");
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
    //stopping timer at 0
    if (secondsLeft < 0) {
      clearInterval(countdown);

      document.querySelector("html").style.animation =
        "blinkingBackground 1s infinite";

      // endTime.style.display = "none";

      restartButton.style.display = "block";
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const remainderMinutes = minutes % 60;
  const hours = Math.floor(minutes / 60);
  let display = isNaN(seconds)
    ? "Please enter a valid number"
    : `${hours} : ${remainderMinutes < 10 ? "0" : ""}${remainderMinutes} : ${
        remainderSeconds < 10 ? "0" : ""
      }${remainderSeconds}`;

  // document.title = display;
  timer.innerHTML = display;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const muricanHour = hour > 12 ? hour - 12 : hour == 0 ? 12 : hour;
  const ampm = hour >= 12 ? "p.m." : "a.m.";
  const minutes = end.getMinutes();
  adjustedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  endTime.innerHTML = isNaN(timestamp)
    ? ""
    : `Done at ${muricanHour}:${adjustedMinutes} ${ampm}`;
};

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

restartButton.addEventListener("click", () => {
  document.querySelector("html").style.animation = null;
  restartButton.style.display = null;
  timer.innerHTML = "";
  endTime.innerHTML = "";
});
