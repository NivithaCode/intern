 console.log("JS LOADED");
 let mood = "";

function selectMood(m){
    mood = m;
    document.getElementById("selectedMood").innerText =
    "Selected Mood: " + m;
}

function submitReview(){

    let movie = document.getElementById("movie").value;
    let review = document.getElementById("review").value;

    if(!mood){
        alert("Please select a mood emoji!");
        return;
    }

    document.getElementById("result").innerHTML =
    "🎬 " + movie +
    "<br> Mood: " + mood +
    "<br> Review: " + review;
}