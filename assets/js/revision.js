function getRevisionData() {

    return JSON.parse(
        localStorage.getItem("revisionData")
    ) || [];

}

function saveRevisionData(data) {

    localStorage.setItem(
        "revisionData",
        JSON.stringify(data)
    );

}

function scheduleFirstRevision(chapterName) {

    const revisionData = getRevisionData();

    const alreadyExists = revisionData.find(
        item => item.chapter === chapterName
    );

    if (alreadyExists) return;

    const completedDate = new Date();

    const nextRevision = new Date();

    nextRevision.setDate(
        nextRevision.getDate() + 7
    );

    revisionData.push({

        chapter: chapterName,

        completedDate:
        completedDate.toISOString(),

        revisionCount: 0,

        nextRevision:
        nextRevision.toISOString(),

        status: "Pending"

    });

    saveRevisionData(revisionData);

}

function loadRevisionList() {

    const revisionList =
    document.getElementById("revisionList");

    if (!revisionList) return;

    revisionList.innerHTML = "";

    const revisionData =
    getRevisionData();

    const today = new Date();

    revisionData.forEach(item => {

        const nextRevision =
        new Date(item.nextRevision);

        if (nextRevision <= today) {

            revisionList.innerHTML += `

            <div class="revisionCard">

                <h3>${item.chapter}</h3>

                <p class="dueText">
                    🔴 Due
                </p>

                <button
                    class="completeRevisionBtn"
                    data-chapter="${item.chapter}"
                >
                    Complete
                </button>

            </div>

            `;

        }

    });

}

loadRevisionList();

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("completeRevisionBtn")) return;

    const chapter = e.target.dataset.chapter;

    const revisionData = getRevisionData();

    const item = revisionData.find(
        data => data.chapter === chapter
    );

    if (!item) return;

    item.revisionCount++;

item.status = "Completed";

    const nextDate = new Date();

    if (item.revisionCount === 1) {

        nextDate.setDate(nextDate.getDate() + 14);

    } else if (item.revisionCount === 2) {

        nextDate.setDate(nextDate.getDate() + 30);

    } else {

        nextDate.setDate(nextDate.getDate() + 60);

    }

    item.completedDate = new Date().toISOString();

item.nextRevision = nextDate.toISOString();

item.status = "Pending";

saveRevisionData(revisionData);

loadRevisionList();

window.addEventListener("focus", () => {

    loadRevisionList();

});

setInterval(() => {

    loadRevisionList();

}, 60000);

if (window.loadTodayMission) {
    loadTodayMission();
}

if (window.loadTodayTasks) {
    loadTodayTasks();
}

if (window.loadTodayPlan) {
    loadTodayPlan();
}
});