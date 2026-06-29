console.log("JS LOADED");

let mood = "";

function selectMood(m, el) {
    mood = m;

    document.querySelectorAll(".mood-btn").forEach(btn => btn.classList.remove("selected"));
    el.classList.add("selected");

    const status = document.getElementById("moodStatus");
    status.textContent = "Mood selected: " + m;
    status.classList.add("active");
}

function submitReview() {
    const movie  = document.getElementById("movie").value;
    const review = document.getElementById("review").value.trim();

    if (!mood) {
        alert("Please pick a mood emoji first!");
        return;
    }

    if (!review) {
        alert("Please write your review!");
        return;
    }

    const moodLabels = {
        "😊": "Happy",
        "😍": "Loved it",
        "😢": "Emotional",
        "🔥": "On fire",
        "😂": "Hilarious",
        "😱": "Shocked"
    };

    document.getElementById("resultMovie").textContent = "🎬 " + movie;
    document.getElementById("resultMood").textContent  = mood;
    document.getElementById("resultMoodText").textContent = moodLabels[mood] || mood;
    document.getElementById("resultReview").textContent   = review;

    const box = document.getElementById("resultBox");
    box.classList.remove("show");
    void box.offsetWidth;
    box.classList.add("show");
}