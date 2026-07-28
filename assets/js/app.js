// ==========================
// NEET OS v1.0
// Dashboard JS Part 1
// ==========================

// Welcome Message
const hour = new Date().getHours();
const title = document.querySelector(".topbar h1");

if (title) {
    if (hour < 12) {
        title.textContent = "☀ Good Morning";
    } else if (hour < 17) {
        title.textContent = "🌤 Good Afternoon";
    } else {
        title.textContent = "🌙 Good Evening";
    }
}

// ==========================
// Daily Progress (Dynamic)
// ==========================

function updateDailyProgress() {

    const goalHours = 10;

    const studied =
        Number(localStorage.getItem("todayStudyTime")) || 0;

    const percent = Math.min(
        Math.round((studied / (goalHours * 3600)) * 100),
        100
    );

    const ring =
        document.getElementById("dailyProgressRing");

    const inner =
        document.getElementById("dailyProgressText");

    if (ring && inner) {

        ring.style.background =
            `conic-gradient(#38bdf8 ${percent}%, #334155 0%)`;

        inner.innerText = percent + "%";

    }

}

updateDailyProgress();

setInterval(updateDailyProgress,1000);
console.log("✅ NEET OS Loaded Successfully");

// ==========================
// NEET Countdown
// ==========================

// ⚠️ NEET পরীক্ষার সঠিক তারিখ প্রকাশ হলে এই তারিখটি আপডেট করবে।
const neetExamDate = new Date("2027-05-02T00:00:00");

function updateCountdown() {
    const today = new Date();

    const diff = neetExamDate - today;

    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

    const countdownCard = document.querySelector(".card:nth-child(5) h1");

    if (countdownCard) {
        countdownCard.textContent = days + " Days";
    }
}

updateCountdown();

// ==========================
// Study Progress
// ==========================

const statuses = Object.values(localStorage);

let studying = 0;
let completed = 0;
let mastered = 0;

statuses.forEach(status => {

    if(status === "📖 Studying") studying++;

    if(status === "✅ Completed") completed++;

    if(status === "⭐ Mastered") mastered++;

});

const total = 77;

document.getElementById("totalChapters").innerText = total;
document.getElementById("studyingCount").innerText = studying;
document.getElementById("completedCount").innerText = completed;
document.getElementById("masteredCount").innerText = mastered;

const progress =
Math.round(((completed + mastered) / total) * 100);

document.getElementById("progressBar").value = progress;
document.getElementById("progressText").innerText = progress + "%";


// ==========================
// Professional Study Streak
// ==========================

const streakText = document.getElementById("streakText");
const bestStreakText = document.getElementById("bestStreakText");
const todayStatus = document.getElementById("todayStatus");
const nextGoal = document.getElementById("nextGoal");

let streak = Number(localStorage.getItem("studyStreak")) || 0;
let best = Number(localStorage.getItem("bestStreak")) || 0;

const todayStudied = localStorage.getItem("todayStudied") === "true";
const lastDate = localStorage.getItem("lastStudyDate");
const today = new Date().toDateString();

const lastUpdated = localStorage.getItem("streakLastUpdated");

if (todayStudied && lastDate === today && lastUpdated !== today) {

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
        localStorage.getItem("streakLastUpdated") ===
        yesterday.toDateString()
    ) {
        streak++;
    } else {
        streak = 1;
    }

    if (streak > best) {
        best = streak;
    }

    localStorage.setItem("studyStreak", streak);
    localStorage.setItem("bestStreak", best);
    localStorage.setItem("streakLastUpdated", today);
}

if(streakText){

    streakText.innerText = streak + " Day";

}

if(bestStreakText){

    bestStreakText.innerText = best + " Day";

}

if(todayStatus){

    todayStatus.innerText =
    localStorage.getItem("todayStudied") === "true"
    ? "✅ Studied Today"
    : "❌ Not Studied Yet";

}

if(nextGoal){

    nextGoal.innerText = "30 Days";

}


// ===============================
// Continue Studying Card
// ===============================

const chapter = localStorage.getItem("currentChapter");
const status = localStorage.getItem("currentStatus");

if (chapter) {

    document.getElementById("continueChapter").innerText = chapter;

    document.getElementById("continueStatus").innerText =
        status || "📖 Studying";

    const totalSeconds =
        Number(localStorage.getItem(chapter + "_time")) || 0;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    let timeText = "";

    if (hours > 0) {

        timeText = hours + "h " + minutes + "m";

    } else {

        timeText = minutes + "m";

    }

    document.getElementById("continueTime").innerText = timeText;

}

document.getElementById("continueBtn").onclick = function () {

    if (chapter) {

        window.location.href = "pages/timer.html";

    } else {

        alert("Please select a chapter first.");

    }

};

const recentChapter = localStorage.getItem("lastStudiedChapter");
const recentDate = localStorage.getItem("lastStudyDateTime");
if(document.getElementById("recentChapter")){

    document.getElementById("recentChapter").textContent =
        recentChapter || "No Study Yet";

    document.getElementById("recentDate").textContent =
        recentDate || "-";

}


const history = JSON.parse(localStorage.getItem("studyHistory")) || [];

const historyBox = document.getElementById("historyList");

if(historyBox){

    if(history.length===0){

        historyBox.innerHTML="No Study Sessions Yet";

    }else{

        historyBox.innerHTML="";

        history.slice(0,5).forEach(item=>{

            historyBox.innerHTML+=`

            <div class="history-item">

                <b>${item.chapter}</b><br>

                ⏱ ${Math.floor(item.duration/60)} min

                <br>

                📅 ${item.date}

            </div>

            `;

        });

    }

}

// ==========================
// Today's Study Time
// ==========================

function loadTodayStudyTime(){

    const today = new Date().toLocaleDateString();

if(localStorage.getItem("todayStudyDate") !== today){
    localStorage.setItem("todayStudyDate", today);
    localStorage.setItem("todayStudyTime", 0);
    localStorage.setItem("todayStudied", "false");
}
    const total =
    Number(localStorage.getItem("todayStudyTime")) || 0;

    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);

    const box =
    document.getElementById("todayStudyTime");

    if(box){

        box.innerText =
        hrs + "h " + mins + "m";

    }

}

function loadTotalStudyTime(){

    const total =
    Number(localStorage.getItem("totalStudyTime")) || 0;

    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);

    const box =
    document.getElementById("totalStudyTime");

    if(box){
        box.innerText = hrs + "h " + mins + "m";
    }

}

loadTodayStudyTime();

// Auto Refresh Today's Study Time
setInterval(() => {
    loadTodayStudyTime();
}, 1000);

function loadWeeklyStudy() {

    const maxHeight = 200;

    for (let i = 0; i < 7; i++) {

        const date = new Date();
        date.setDate(date.getDate() - (6 - i));

        const key = "study_" + date.toLocaleDateString();

        const seconds = Number(localStorage.getItem(key)) || 0;

        const percent = Math.min((seconds / 36000) * 100, 100);

        const bar = document.getElementById("day" + i);

        if (bar) {
            bar.style.height = (percent / 100) * maxHeight + "px";
        }
    }
}
loadWeeklyStudy();

setInterval(loadWeeklyStudy,1000);


function loadTodayMission(){

    const missionList =
    document.getElementById("missionList");

    if(!missionList) return;

    const tasks =
    JSON.parse(localStorage.getItem("plannerTasks")) || [];

    missionList.innerHTML = "";

    if(tasks.length===0){

        missionList.innerHTML =
        "<li>No Mission Today</li>";

        return;

    }

    tasks.forEach(task=>{

        if(task.completed) return;

        missionList.innerHTML += `
            <li>
                📚 ${task.subject} - ${task.chapter}
                (${task.hours}h | ${task.mcq} MCQs)
            </li>
        `;

    });

    const revisionData =
JSON.parse(localStorage.getItem("revisionData")) || [];

const today = new Date();

revisionData.forEach(item => {

    if (
        item.status === "Pending" &&
        new Date(item.nextRevision) <= today
    ) {

        missionList.innerHTML += `
            <li>
                🔄 Revision - ${item.chapter}
            </li>
        `;

    }

});

    if(missionList.innerHTML===""){

        missionList.innerHTML =
        "<li>🎉 All Today's Missions Completed</li>";

    }

}

window.loadTodayMission = loadTodayMission;

loadTodayMission();

function loadTodayTasks(){

    const taskList =
    document.getElementById("todayTaskList");

    if(!taskList) return;

    const tasks =
    JSON.parse(localStorage.getItem("plannerTasks")) || [];

    taskList.innerHTML = "";

    if(tasks.length===0){

        taskList.innerHTML = "No Tasks Today";

        return;

    }

    tasks.forEach(task=>{

        taskList.innerHTML += `

        <div class="task">

            <span>

                📚 ${task.subject} - ${task.chapter}

            </span>

            <strong>

                ${task.completed ? "✅ Done" : "⏳ Pending"}

            </strong>

        </div>

        `;

    });

const revisionData =
JSON.parse(localStorage.getItem("revisionData")) || [];

const today = new Date();

revisionData.forEach(item => {

    if (
        item.status === "Pending" &&
        new Date(item.nextRevision) <= today
    ) {

        taskList.innerHTML += `

        <div class="task">

            <span>

                🔄 ${item.chapter}

            </span>

            <strong>

                🔴 Due

            </strong>

        </div>

        `;

    }

});

}

window.loadTodayTasks = loadTodayTasks;

loadTodayTasks();

function loadTodayPlan(){

    const plan =
    document.getElementById("todayPlanPercent");

    if(!plan) return;

    const tasks =
    JSON.parse(localStorage.getItem("plannerTasks")) || [];

    if(tasks.length===0){

        plan.innerText = "0%";

        return;

    }

    const completed =
    tasks.filter(task => task.completed).length;

    const percent =
    Math.round((completed / tasks.length) * 100);

    plan.innerText = percent + "%";

}

window.loadTodayPlan = loadTodayPlan;

loadTodayPlan();

const averageScore =
localStorage.getItem("averageScore") || "0";

const averageAccuracy =
localStorage.getItem("averageAccuracy") || "0";

const highestScore =
localStorage.getItem("highestScore") || "0";

const lowestScore =
localStorage.getItem("lowestScore") || "0";

const totalTests =
localStorage.getItem("totalTests") || "0";

const lastTest =
localStorage.getItem("lastTest") || "No Test";

const revisionData =
JSON.parse(localStorage.getItem("revisionData")) || [];

const revisionToday = new Date();

let dueRevisionCount = 0;

revisionData.forEach(item => {

    if (
        item.status === "Pending" &&
        new Date(item.nextRevision) <= revisionToday
    ) {

        dueRevisionCount++;

    }

});

const revisionDueBox =
document.getElementById("revisionDueCount");

if (revisionDueBox) {

    revisionDueBox.innerText = dueRevisionCount;

}

const averageScoreBox =
document.getElementById("averageScore");

if (averageScoreBox) {
    averageScoreBox.innerText = averageScore;
}

const averageAccuracyBox =
document.getElementById("averageAccuracy");

if (averageAccuracyBox) {
    averageAccuracyBox.innerText = averageAccuracy + "%";
}


window.addEventListener("storage", () => {

    if (typeof loadTodayMission === "function") {
        loadTodayMission();
    }

    if (typeof loadTodayTasks === "function") {
        loadTodayTasks();
    }

    if (typeof loadTodayPlan === "function") {
        loadTodayPlan();
    }

});

// ==========================
// Sidebar Toggle
// ==========================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {

        if (
            window.innerWidth <= 900 &&
            !sidebar.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            sidebar.classList.remove("show");
        }

    });

}

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
    menuBtn.onclick = function () {
        sidebar.classList.toggle("show");
    };
}

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}