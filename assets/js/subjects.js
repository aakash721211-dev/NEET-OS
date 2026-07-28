// ==============================
// NEET OS - Subjects.js
// ==============================

// Create Status Automatically
document.querySelectorAll(".chapter").forEach(chapter => {

    const status = document.createElement("span");
    status.className = "status";
    status.innerHTML = "⬜ Not Started";

    const button = chapter.querySelector(".study-btn");
    chapter.insertBefore(status, button);

});

// Load Saved Status
document.querySelectorAll(".chapter").forEach(chapter => {

    const name = chapter.querySelector("span").innerText;
    const status = chapter.querySelector(".status");

    const saved = localStorage.getItem(name);

    if (saved) {
        status.innerHTML = saved;
    }

});

// Load Study Time
document.querySelectorAll(".chapter").forEach(chapter => {

    const name = chapter.querySelector("span").innerText;

    const savedTime = Number(
        localStorage.getItem(name + "_time")
    ) || 0;

    const hrs = Math.floor(savedTime / 3600);
    const mins = Math.floor((savedTime % 3600) / 60);

    const time = document.createElement("div");
    time.className = "study-time";
    time.innerHTML = "⏱ " + hrs + "h " + mins + "m";

    chapter.appendChild(time);

});

// All Study Buttons

const studyButtons = document.querySelectorAll(".study-btn");

const statusList = [
    "⬜ Not Started",
    "📖 Studying",
    "✅ Completed",
    "🔄 Revised",
    "⭐ Mastered"
];

studyButtons.forEach(button=>{

    button.addEventListener("click",function(){

        const chapter=this.parentElement.querySelector("span").innerText;

        const status=this.parentElement.querySelector(".status");

        let current=localStorage.getItem(chapter);

        let index=statusList.indexOf(current);

        if(index==-1){

            index=0;

        }

        index++;

if (index >= statusList.length) {

    index = statusList.length - 1;

}

        status.innerHTML = statusList[index];

        localStorage.setItem(chapter, statusList[index]);

if (statusList[index] === "✅ Completed") {

    scheduleFirstRevision(chapter);

}

updateProgress();
        
        // বর্তমান Chapter Save
       localStorage.setItem("currentChapter", chapter);

       // বর্তমান Status Save (নতুন)
       localStorage.setItem("currentStatus", statusList[index]);

        window.location.href = "timer.html";

    });

});

// Refresh Study Time

window.addEventListener("focus", () => {

    document.querySelectorAll(".chapter").forEach(chapter => {

        const name = chapter.querySelector("span").innerText;

        const savedTime = Number(
            localStorage.getItem(name + "_time")
        ) || 0;

        const hrs = Math.floor(savedTime / 3600);
        const mins = Math.floor((savedTime % 3600) / 60);

        const time = chapter.querySelector(".study-time");

        if(time){
            time.innerHTML = "⏱ " + hrs + "h " + mins + "m";
        }

    });

});

// Chapter Search

const searchInput = document.getElementById("chapterSearch");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    document.querySelectorAll(".chapter").forEach(chapter => {

        const text = chapter
            .querySelector("span")
            .innerText
            .toLowerCase();

        if (text.includes(value)) {

            chapter.style.display = "flex";

        } else {

            chapter.style.display = "none";

        }

    });

});

// Status Filter

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn=>{

    btn.addEventListener("click",function(){

        filterButtons.forEach(b=>b.classList.remove("active"));

        this.classList.add("active");

        const filter=this.dataset.filter;

        document.querySelectorAll(".chapter").forEach(chapter=>{

            const status=chapter.querySelector(".status").innerText;

            if(filter==="all" || status===filter){

                chapter.style.display="flex";

            }else{

                chapter.style.display="none";

            }

        });

    });

});

// ======================
// Subject Progress
// ======================

updateProgress();

function updateProgress(){

    updateSubjectProgress(
        ".physics .chapter",
        "physicsBar",
        "physicsPercent"
    );

    updateSubjectProgress(
        ".chemistry .chapter",
        "chemistryBar",
        "chemistryPercent"
    );

    updateSubjectProgress(
        ".biology .chapter",
        "biologyBar",
        "biologyPercent"
    );

}

function updateSubjectProgress(chapters,barId,textId){

    const list=document.querySelectorAll(chapters);

    let done=0;

    list.forEach(chapter=>{

        const status=chapter.querySelector(".status").innerText;

        if(
            status==="⭐ Mastered" ||
            status==="🔄 Revised" ||
            status==="✅ Completed"
        ){

            done++;

        }

    });

    const percent=Math.round((done/list.length)*100)||0;

    document.getElementById(barId).style.width=percent+"%";

    document.getElementById(textId).innerText=percent+"%";

}