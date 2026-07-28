const resetBtn =
document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {

    const confirmReset = confirm(
        "Are you sure?\n\nThis will permanently delete all your NEET OS data."
    );

    if (!confirmReset) return;

    localStorage.clear();

    alert("All Data Reset Successfully!");

    location.reload();

});

const exportBtn =
document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {

    const backupData = {};

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        backupData[key] = localStorage.getItem(key);

    }

    const blob = new Blob(
        [JSON.stringify(backupData, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "NEET_OS_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

});

const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

importBtn.addEventListener("click", () => {

    const file = importFile.files[0];

    if (!file) {
        alert("Please select a backup file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            const backupData = JSON.parse(event.target.result);

            localStorage.clear();

            for (const key in backupData) {
                localStorage.setItem(key, backupData[key]);
            }

            alert("Backup Imported Successfully!");

            window.dispatchEvent(new Event("storage"));

            location.reload();

        } catch (error) {

            alert("Invalid Backup File!");

        }

    };

    reader.readAsText(file);

});