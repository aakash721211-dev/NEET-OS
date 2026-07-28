
const currentChapter =
localStorage.getItem("currentChapter");

if(currentChapter){

    document.title =
    currentChapter + " | Timer";

    const goal =
    document.getElementById("goal");

    if(goal){

        goal.innerText =
        "Current Chapter : " + currentChapter;

    }

}


// ==========================
// NEET OS - Study Timer
// Part 1
// ==========================

let seconds = 0;

if(currentChapter){

    seconds = Number(
        localStorage.getItem(currentChapter + "_time")
    ) || 0;

}

let timer = null;

const display = document.getElementById("timerDisplay");
if ("Notification" in window &&
    Notification.permission !== "granted") {

    Notification.requestPermission();

}

const alarm = new Audio("../assets/sounds/alarm.mp3");

function updateDisplay() {

    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    display.textContent =
        String(hrs).padStart(2, "0") + ":" +
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");
}

function updateStudyTime(){

    const today = new Date().toLocaleDateString();

    if(localStorage.getItem("todayStudyDate") !== today){

        localStorage.setItem("todayStudyDate", today);
        localStorage.setItem("todayStudyTime", 0);

    }

const lastKey = currentChapter + "_lastSecondSaved";

const oldSeconds =
Number(localStorage.getItem(lastKey)) || 0;

localStorage.setItem(
    "todayStudyTime",
    (Number(localStorage.getItem("todayStudyTime")) || 0) + (seconds - oldSeconds)
);

localStorage.setItem(lastKey, seconds);
localStorage.setItem(
    "study_" + today,
    Number(localStorage.getItem("todayStudyTime")) || 0
);

    localStorage.setItem(
        "totalStudyTime",
        (Number(localStorage.getItem("totalStudyTime")) || 0) + 1
    );
    const weekDay = new Date().getDay();

const weekKey = "week_" + weekDay;

localStorage.setItem(
    weekKey,
    (Number(localStorage.getItem(weekKey)) || 0) + 1
);

}

document.getElementById("startBtn").addEventListener("click", () => {

    if (timer !== null) return;

    localStorage.setItem("timerRunning", "true");
localStorage.setItem("timerStartTime", Date.now());
localStorage.setItem("timerElapsed", seconds);

    timer = setInterval(() => {
   seconds++;
 updateStudyTime();

// Unlock today's streak after 5 hours

const todayTime =
Number(localStorage.getItem("todayStudyTime")) || 0;

if (todayTime >= 18000) {

    localStorage.setItem("todayStudied", "true");

    localStorage.setItem(
        "lastStudyDate",
        new Date().toDateString()
    );

}

if(currentChapter){

    localStorage.setItem(
        currentChapter + "_time",
        seconds
    );

}

updateDisplay();
if (seconds >= 3000) {

    clearInterval(timer);
    timer = null;

    if ("Notification" in window &&
        Notification.permission === "granted") {

        new Notification("📚 Pomodoro Finished", {
            body: "Time for a short break!"
        });

    }

    if (navigator.vibrate) {

        navigator.vibrate([300, 200, 300]);

    }

   alarm.play();

   setTimeout(() => {
    alert("🎉 50 Minutes Completed!\nTake a 10-minute break.");
 }, 500);

}
    }, 1000);

});

document.getElementById("pauseBtn").addEventListener("click", () => {

    clearInterval(timer);
    timer = null;

    localStorage.setItem("timerRunning", "false");
localStorage.setItem("timerElapsed", seconds);

});

document.getElementById("resetBtn").addEventListener("click", () => {

    clearInterval(timer);
    timer = null;

    seconds = 0;

    localStorage.removeItem("timerRunning");
localStorage.removeItem("timerStartTime");
localStorage.removeItem("timerElapsed");
   if(currentChapter){

    localStorage.removeItem(
        currentChapter + "_time"
    );

}
    updateDisplay();

});

updateDisplay();

// ==========================
// Daily Study Time
// ==========================

function saveTodayStudyTime(duration){

    const today = new Date().toLocaleDateString();

    const savedDate =
    localStorage.getItem("todayStudyDate");

    if(savedDate !== today){

        localStorage.setItem("todayStudyDate", today);
        localStorage.setItem("todayStudyTime", 0);

    }

    const total =
    Number(localStorage.getItem("todayStudyTime")) || 0;

    localStorage.setItem(
        "todayStudyTime",
        total + duration
    );

}

// ==========================
// Pomodoro Presets
// ==========================

document.getElementById("pomodoro25").onclick = () => {
    alert("🍅 Pomodoro Mode: 25 min Study + 5 min Break");
};

document.getElementById("pomodoro50").onclick = () => {
    alert("🍅 Pomodoro Mode: 50 min Study + 10 min Break");
};

document.getElementById("pomodoro90").onclick = () => {
    alert("🍅 Pomodoro Mode: 90 min Study + 15 min Break");
};
// Daily Goal Progress

function updateGoalProgress(){

    const goalHours = 10;

   const studiedHours =
(Number(localStorage.getItem("todayStudyTime")) || 0) / 3600;

    const percent = Math.min((studiedHours / goalHours) * 100, 100);

    const bar = document.getElementById("goalProgress");
    const text = document.getElementById("goalText");

    if(bar && text){
        bar.style.width = percent + "%";
        text.textContent =
            studiedHours.toFixed(2) + "h / " + goalHours + "h Completed";
    }

}

function updateDailyProgress(){

    const goalHours = 10;

    const studiedSeconds =
    Number(localStorage.getItem("todayStudyTime")) || 0;

    const percent =
    Math.min((studiedSeconds / (goalHours * 3600)) * 100,100);

    const progressBar =
    document.getElementById("dailyProgressBar");

    const progressText =
    document.getElementById("dailyProgressText");

    if(progressBar){

        progressBar.style.width =
        percent + "%";

    }

    if(progressText){

        progressText.innerText =
        Math.round(percent) + "%";

    }

}

setInterval(updateGoalProgress,1000);
setInterval(updateDailyProgress,1000);

updateGoalProgress();
updateDailyProgress();
const finishBtn = document.getElementById("finishBtn");
if(finishBtn){

    finishBtn.onclick = function(){

        clearInterval(timer);

        localStorage.setItem("lastStudiedChapter", currentChapter);

        localStorage.setItem(
    "lastStudyDate",
    new Date().toDateString()
);

localStorage.setItem(
    "lastStudyDateTime",
    new Date().toLocaleString()
);

        let history = JSON.parse(localStorage.getItem("studyHistory")) || [];

        history.unshift({

    chapter: currentChapter,

    duration: seconds,

    date: new Date().toLocaleString()

});

if (history.length > 5) {
    history = history.slice(0, 5);
}
localStorage.setItem(
    "studyHistory",
    JSON.stringify(history)
);

        document.getElementById("summaryChapter").innerText =
currentChapter;

const hrs=Math.floor(seconds/3600);

const mins=Math.floor((seconds%3600)/60);

document.getElementById("summaryTime").innerText =
hrs+"h "+mins+"m";

document.getElementById("summaryModal").style.display="flex";
    };

}

// ===============================
// Background Timer Auto Resume
// ===============================

window.addEventListener("load", () => {

    const running = localStorage.getItem("timerRunning");

    if (running === "true") {

        const startTime = Number(localStorage.getItem("timerStartTime"));
        const savedTime = Number(localStorage.getItem("timerElapsed")) || 0;

        seconds = savedTime + Math.floor((Date.now() - startTime) / 1000);

        updateDisplay();

        timer = setInterval(() => {

            seconds++;

            updateStudyTime();


            if(currentChapter){

                localStorage.setItem(
                    currentChapter + "_time",
                    seconds
                );

            }
const todayTime =
Number(localStorage.getItem("todayStudyTime")) || 0;

if (todayTime >= 18000) {

    localStorage.setItem("todayStudied", "true");

    localStorage.setItem(
        "lastStudyDate",
        new Date().toDateString()
    );

}
            updateDisplay();

        },1000);

    }

});

const summaryClose = document.getElementById("summaryClose");

if(summaryClose){

    summaryClose.onclick = function(){

        localStorage.removeItem("timerRunning");
        localStorage.removeItem("timerStartTime");
        localStorage.removeItem("timerElapsed");
        if(currentChapter){
    localStorage.removeItem(
        currentChapter + "_lastSecondSaved"
    );
}

        window.location.href = "../index.html";

    };

}
