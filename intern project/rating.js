console.log("CineRate JS Loaded");

const ratings = {
  action: 0, comedy: 0, romance: 0, sad: 0,
  thriller: 0, bgm: 0, visual: 0, story: 0
};

let selectedVibe = "";

// ── STAR RATING SETUP ──
document.querySelectorAll(".stars").forEach(group => {
  const key = group.dataset.key;
  const stars = group.querySelectorAll(".star");

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const val = parseInt(star.dataset.val);
      ratings[key] = val;
      stars.forEach(s => {
        s.classList.toggle("lit", parseInt(s.dataset.val) <= val);
      });
    });

    star.addEventListener("mouseover", () => {
      const val = parseInt(star.dataset.val);
      stars.forEach(s => {
        s.classList.toggle("lit", parseInt(s.dataset.val) <= val);
      });
    });

    star.addEventListener("mouseout", () => {
      const saved = ratings[key];
      stars.forEach(s => {
        s.classList.toggle("lit", parseInt(s.dataset.val) <= saved);
      });
    });
  });
});

// ── VIBE SELECT ──
function selectVibe(btn) {
  document.querySelectorAll(".vibe-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedVibe = btn.textContent.trim();
}

// ── TICKET NAME UPDATE ──
function updateTicketName() {
  const sel = document.getElementById("movieSelect").value;
  document.getElementById("ticketMovieName").textContent = sel || "Pick a movie →";
}

// ── SUBMIT & GENERATE REPORT ──
function submitRating() {
  const movie = document.getElementById("movieSelect").value;
  if (!movie) { alert("Please select a movie first!"); return; }

  const rated = Object.values(ratings).some(v => v > 0);
  if (!rated) { alert("Rate at least one emotion!"); return; }

  if (!selectedVibe) { alert("Pick an overall vibe!"); return; }

  const review = document.getElementById("reviewInput").value.trim();

  // Overall score (average of rated emotions only)
  const vals = Object.values(ratings).filter(v => v > 0);
  const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);

  // Emotion metadata
  const emotionMeta = {
    action:   { icon: "💥", label: "Action",   color: "#e05c2a" },
    comedy:   { icon: "😂", label: "Comedy",   color: "#f0c040" },
    romance:  { icon: "💕", label: "Romance",  color: "#f472b6" },
    sad:      { icon: "😢", label: "Emotion",  color: "#60a5fa" },
    thriller: { icon: "😱", label: "Thriller", color: "#a78bfa" },
    bgm:      { icon: "🎵", label: "BGM",      color: "#34d399" },
    visual:   { icon: "🎥", label: "Visuals",  color: "#fb923c" },
    story:    { icon: "📖", label: "Story",    color: "#e879f9" },
  };

  // Build bar rows & find strongest emotion
  let barsHTML = "";
  let strongKey = "story", strongVal = 0;

  for (const [key, val] of Object.entries(ratings)) {
    if (val === 0) continue;
    if (val > strongVal) { strongVal = val; strongKey = key; }
    const m = emotionMeta[key];
    const pct = (val / 5) * 100;
    barsHTML += `
      <div class="bar-row">
        <span class="bar-icon">${m.icon}</span>
        <span class="bar-label">${m.label}</span>
        <div class="bar-track">
          <div class="bar-fill" style="background:${m.color};width:0%" data-pct="${pct}"></div>
        </div>
        <span class="bar-val">${val}/5</span>
      </div>`;
  }

  // Fill report card
  document.getElementById("reportMovieName").textContent = movie;
  document.getElementById("overallScore").textContent = avg;
  document.getElementById("barsContainer").innerHTML = barsHTML;

  // Verdict based on avg score
  const verdicts = {
    5.0: "Cinema-la irukkum pothu neram nindhathu theriyala! 🏆",
    4.0: "Solid film. Worth every minute. 🌟",
    3.0: "Paakkalaam, aanaa once-ah podhum. 👍",
    2.0: "Kadhai konjam weak, aanaa kashtapatturukaanga. 😐",
    1.0: "Ticket price waste. 😬"
  };
  let verdict = verdicts[1.0];
  for (const [score, text] of Object.entries(verdicts).reverse()) {
    if (parseFloat(avg) >= parseFloat(score)) { verdict = text; break; }
  }
  document.getElementById("verdictText").textContent = verdict;

  // Vibe tags
  document.getElementById("vibeTags").innerHTML =
    `<span class="vibe-tag">${selectedVibe}</span>` +
    `<span class="vibe-tag">${emotionMeta[strongKey].icon} ${emotionMeta[strongKey].label} highlight</span>`;

  // Review quote
  document.getElementById("reviewQuote").textContent =
    review ? `"${review}"` : `"${movie} — worth the watch!"`;

  // Date stamp
  const now = new Date();
  document.getElementById("stampDate").textContent =
    now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  document.getElementById("strongEmotion").textContent =
    `Strongest: ${emotionMeta[strongKey].icon} ${emotionMeta[strongKey].label}`;

  // Show report with animation
  const report = document.getElementById("reportCard");
  report.classList.remove("show");
  void report.offsetWidth;
  report.classList.add("show");
  setTimeout(() => report.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

  // Animate bars
  setTimeout(() => {
    document.querySelectorAll(".bar-fill").forEach(bar => {
      bar.style.width = bar.dataset.pct + "%";
    });
  }, 200);
}