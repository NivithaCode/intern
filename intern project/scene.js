console.log("SceneTag Loaded ✅");

// All tagged scenes stored here
let taggedScenes = [];

// ── SCENE CARD TOGGLE ──
document.querySelectorAll(".scene-card").forEach(card => {
  card.addEventListener("click", () => {
    const scene = card.dataset.scene;
    const icon  = card.dataset.icon;

    if (card.classList.contains("tagged")) {
      // Untag
      card.classList.remove("tagged");
      taggedScenes = taggedScenes.filter(s => s.name !== scene);
    } else {
      // Tag
      card.classList.add("tagged");
      taggedScenes.push({ name: scene, icon: icon, custom: false });
    }

    updateBestSceneDropdown();
  });
});

// ── ADD CUSTOM SCENE ──
function addCustomScene() {
  const input = document.getElementById("customScene");
  const val   = input.value.trim();
  if (!val) return;

  // Check duplicate
  if (taggedScenes.find(s => s.name.toLowerCase() === val.toLowerCase())) {
    alert("This scene is already added!");
    return;
  }

  taggedScenes.push({ name: val, icon: "🎞️", custom: true });

  // Add a card to the grid
  const grid = document.getElementById("sceneGrid");
  const card = document.createElement("div");
  card.className = "scene-card tagged";
  card.dataset.scene = val;
  card.dataset.icon  = "🎞️";
  card.innerHTML = `
    <span class="scene-icon">🎞️</span>
    <div class="scene-name">${val}</div>
    <div class="scene-desc">Your custom scene</div>
    <div class="scene-check">✓</div>
  `;
  card.addEventListener("click", () => {
    if (card.classList.contains("tagged")) {
      card.classList.remove("tagged");
      taggedScenes = taggedScenes.filter(s => s.name !== val);
    } else {
      card.classList.add("tagged");
      taggedScenes.push({ name: val, icon: "🎞️", custom: true });
    }
    updateBestSceneDropdown();
  });
  grid.appendChild(card);

  input.value = "";
  updateBestSceneDropdown();
}

// Allow Enter key for custom scene
document.getElementById("customScene").addEventListener("keydown", e => {
  if (e.key === "Enter") addCustomScene();
});

// ── UPDATE BEST SCENE DROPDOWN ──
function updateBestSceneDropdown() {
  const sel = document.getElementById("bestScene");
  const current = sel.value;
  sel.innerHTML = '<option value="">— Pick your absolute favourite —</option>';
  taggedScenes.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.name;
    opt.textContent = s.icon + " " + s.name;
    sel.appendChild(opt);
  });
  // Restore previous selection if still valid
  if (taggedScenes.find(s => s.name === current)) {
    sel.value = current;
  }
}

// ── MOVIE CHANGE ──
function onMovieChange() {
  // Nothing extra needed — movie is read on submit
}

// ── GENERATE LEADERBOARD ──
function generateLeaderboard() {
  const movie    = document.getElementById("movieSelect").value;
  const bestPick = document.getElementById("bestScene").value;
  const review   = document.getElementById("reviewInput").value.trim();

  if (!movie) { alert("Pick a movie first!"); return; }
  if (taggedScenes.length === 0) { alert("Tag at least one scene!"); return; }
  if (!bestPick) { alert("Pick your #1 best scene!"); return; }

  // Fill header
  document.getElementById("lbMovie").textContent  = "🎬 " + movie;
  document.getElementById("lbCount").textContent  =
    taggedScenes.length + (taggedScenes.length === 1 ? " scene" : " scenes") + " tagged";

  // Build scene rows
  const rankClasses = ["gold", "silver", "bronze"];
  const rankSymbols = ["🥇", "🥈", "🥉"];

  let html = "";
  taggedScenes.forEach((scene, i) => {
    const rankClass  = rankClasses[i] || "";
    const rankSymbol = rankSymbols[i] || (i + 1);
    const isBest     = scene.name === bestPick;
    html += `
      <div class="lb-scene-row" style="animation-delay:${i * 0.07}s">
        <span class="lb-rank ${rankClass}">${rankSymbol}</span>
        <span class="lb-scene-icon">${scene.icon}</span>
        <span class="lb-scene-name">${scene.name}</span>
        ${isBest ? '<span class="lb-tag">👑 Your Best</span>' : ""}
        ${scene.custom ? '<span class="lb-tag">Custom</span>' : ""}
      </div>`;
  });
  document.getElementById("lbScenes").innerHTML = html;

  // Best scene box
  const bestObj = taggedScenes.find(s => s.name === bestPick);
  document.getElementById("bsName").textContent =
    (bestObj ? bestObj.icon + " " : "") + bestPick;

  // Review strip
  const strip = document.getElementById("reviewStrip");
  if (review) {
    strip.textContent = '"${review}"';
    strip.classList.add("show");
  } else {
    strip.classList.remove("show");
  }

  // Show leaderboard
  const lb = document.getElementById("leaderboard");
  lb.classList.remove("show");
  void lb.offsetWidth;
  lb.classList.add("show");
  setTimeout(() => lb.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
}