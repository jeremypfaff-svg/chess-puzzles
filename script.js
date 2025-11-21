// --- 1. The Puzzle Library ---
const puzzleLibrary = {
  mateInOne: [
    "14096307", "14096323", "14096327", "14096335", "14096341",
    "14096347", "14096357", "14096369", "14096385", "14149409",
    "14096401", "14096417", "14096421", "14096427", "14096435",
    "14096439", "14096457", "14096471", "14096477", "14096479"
  ],
  mateInTwo: [
    "14151073", "14151107", "14151123", "14151131", "14151145",
    "14151171", "14151287", "14151291", "14151335", "14151353",
    "14096401", "14151379", "14151385", "14151395", "14151401",
    "14151411", "14151415", "14151429", "14151433", "14151453"
  ]
};

const baseUrl = "https://www.chess.com/emboard?id=";

// --- 2. The Tracker ---
let currentCategory = 'mateInOne';
let currentIndex = 0;

// --- 3. Connecting to HTML ---
const puzzleTitle = document.getElementById("puzzle-title");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const puzzleFrame = document.getElementById("puzzleFrame");

// --- 4. Switching Categories ---
function switchCategory(newCategory) {
  currentCategory = newCategory;
  currentIndex = 0; // Reset to first puzzle
  showPuzzle();
  updateActiveButton();
}

// --- 5. Update the Puzzle Display ---
function showPuzzle() {
  const currentList = puzzleLibrary[currentCategory];
  
  // Handle empty lists
  if (!currentList || currentList.length === 0) {
    puzzleFrame.src = ""; 
    puzzleTitle.textContent = "Coming Soon! No puzzles in this category yet.";
    return; 
  }

  const currentPuzzleId = currentList[currentIndex];
  puzzleFrame.src = baseUrl + currentPuzzleId;

  // Format Title (e.g. "MATE IN ONE - Puzzle 1 of 20")
  const niceName = currentCategory.replace(/([A-Z])/g, ' $1').trim(); 
  const puzzleNumber = currentIndex + 1; 
  const totalPuzzles = currentList.length;
  
  puzzleTitle.textContent = `${niceName.toUpperCase()} - Puzzle ${puzzleNumber} of ${totalPuzzles}`;
}

// --- 6. Navigation Logic ---
nextButton.addEventListener("click", () => {
  const currentList = puzzleLibrary[currentCategory];
  if (currentList && currentList.length > 0) {
    currentIndex++;
    if (currentIndex >= currentList.length) {
      currentIndex = 0;
    }
    showPuzzle();
  }
});

prevButton.addEventListener("click", () => {
  const currentList = puzzleLibrary[currentCategory];
  if (currentList && currentList.length > 0) {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = currentList.length - 1;
    }
    showPuzzle();
  }
});

// --- 7. Visual Polish (Highlight active button) ---
function updateActiveButton() {
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(currentCategory)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Initialize
showPuzzle();
updateActiveButton();
