const addTestBtn = document.getElementById("addTestBtn");
const testModal = document.getElementById("testModal");
const closeModalBtn = document.getElementById("closeModalBtn");

addTestBtn.addEventListener("click", () => {
    testModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    testModal.style.display = "none";
});

const saveTestBtn = document.getElementById("saveTestBtn");

saveTestBtn.addEventListener("click", () => {

    const testName = document.getElementById("testName").value.trim();

    const totalQuestions = Number(document.getElementById("totalQuestions").value);

    const correctQuestions = Number(document.getElementById("correctQuestions").value);

    const wrongQuestions = Number(document.getElementById("wrongQuestions").value);

   const score = (correctQuestions * 4) - wrongQuestions;

const unattempted =
totalQuestions - correctQuestions - wrongQuestions;

const accuracy =
((correctQuestions / totalQuestions) * 100).toFixed(2);

const test = {

    id: Date.now(),

    testName,

    totalQuestions,

    correctQuestions,

    wrongQuestions,

    unattempted,

    score,

    accuracy,

    date: new Date().toLocaleString()

};

const tests =
JSON.parse(localStorage.getItem("mockTests")) || [];

tests.unshift(test);

localStorage.setItem(
    "mockTests",
    JSON.stringify(tests)
);

alert("Test Saved Successfully!");

loadTests();

calculateAnalytics();

testModal.style.display = "none";
});
function loadTests() {

    const testList = document.getElementById("testList");

    testList.innerHTML = "";

    const tests =
    JSON.parse(localStorage.getItem("mockTests")) || [];

    const keyword =
document.getElementById("searchInput")
.value
.toLowerCase();

    tests
.filter(test =>
    test.testName
    .toLowerCase()
    .includes(keyword)
)
.forEach(test => {
        testList.innerHTML += `

        <div class="testCard">

    <h3 class="testTitle">

        ${test.testName}

    </h3>

    <div class="testDetails">

        <p>Total Questions : ${test.totalQuestions}</p>

        <p>Correct : ${test.correctQuestions}</p>

        <p>Wrong : ${test.wrongQuestions}</p>

        <p>Unattempted : ${test.unattempted}</p>

        <p>Score : ${test.score}/720</p>

        <p>Accuracy : ${test.accuracy}%</p>

        <p>Date : ${test.date}</p>

    </div>

</div>

        `;

    });

document.querySelectorAll(".testTitle").forEach(title => {

    title.addEventListener("click", () => {

        const details =
        title.nextElementSibling;

        if(details.style.display === "block"){

            details.style.display = "none";

        }else{

            details.style.display = "block";

        }

    });

});

}

loadTests();

calculateAnalytics();

function calculateAnalytics(){

    const tests =
    JSON.parse(localStorage.getItem("mockTests")) || [];

    if(tests.length===0) return;

    let totalScore=0;
    let totalAccuracy=0;

    let highestScore=tests[0].score;
    let lowestScore=tests[0].score;

    tests.forEach(test=>{

        totalScore+=test.score;

        totalAccuracy+=Number(test.accuracy);

        if(test.score>highestScore)
            highestScore=test.score;

        if(test.score<lowestScore)
            lowestScore=test.score;

    });

    localStorage.setItem(
        "averageScore",
        (totalScore/tests.length).toFixed(2)
    );

    localStorage.setItem(
        "averageAccuracy",
        (totalAccuracy/tests.length).toFixed(2)
    );

    localStorage.setItem(
        "highestScore",
        highestScore
    );

    localStorage.setItem(
        "lowestScore",
        lowestScore
    );

    localStorage.setItem(
        "totalTests",
        tests.length
    );

    localStorage.setItem(
        "lastTest",
        tests[0].testName
    );

}

document
.getElementById("searchInput")
.addEventListener("input", loadTests);