const timer = document.querySelector("#timer");
const endTime = document.querySelector("#end-time");
const btns = document.querySelectorAll("[data-time]");
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
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const display = `${hours} : ${minutes < 10 ? "0" : ""}${minutes} : ${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  // document.title = display;
  timer.innerHTML = display;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  amuricanHour = hour > 12 ? hour - 12 : hour;

  const minutes = end.getMinutes();
  adjustedMinutes = minutes < 10 ? "0" : "";
  endTime.innerHTML = `Done at ${amuricanHour} : ${adjustedMinutes}${minutes}`;
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timerGo(seconds);
}

btns.forEach((btn) => {
  btn.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timerGo(minutes * 60);
});
