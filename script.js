// --- 1. Your Puzzle List ---
// IMPORTANT: Replace these with your own chess.com puzzle IDs!
// The first one, 14096307, is the one already in your HTML.
const puzzleIds = [
  "14096307",
  "14096323",
  "14096327",
  "14096335",
  "14096341",
  "14096347",
  "14096357",
  "14096369",
  "14096385",
  "14096397",
  "14096401",
  "14096417",
  "14096421",
  "14096427",
  "14096435",
  "14096439",
  "14096457",
  "14096471",
  "14096477",
  "14096479",
  // Add as many puzzle IDs as you want here
];

// This is the base URL for all chess.com puzzles
const baseUrl = "https://www.chess.com/emboard?id=";


// --- 2. The Tracker ---
// We need a variable to keep track of which puzzle we are on.
// 'let' means this variable can change.
// We start at 0, which is the first item in our list (arrays start at 0).
let currentIndex = 0;


// --- 3. Connecting to Your HTML ---
// We grab the elements from your HTML so we can control them with JS.
// We use 'getElementById' to find them by the 'id' you gave them.
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const puzzleFrame = document.getElementById("puzzleFrame");


// --- 4. The "Update" Function ---
// This is a re-usable function to change the puzzle.
function showPuzzle() {
  // Get the puzzle ID from our array using the current index
  const currentPuzzleId = puzzleIds[currentIndex];
  
  // Set the 'src' attribute of the iframe to the new puzzle URL
  puzzleFrame.src = baseUrl + currentPuzzleId;
}


// --- 5. The Event Listeners (Making Buttons Work) ---

// Tell the "Next" button to listen for a 'click'
nextButton.addEventListener("click", () => {
  // When clicked, add 1 to the current index
  currentIndex++;
  
  // --- This is the "looping" logic ---
  // If the index is now *past* the end of the list...
  if (currentIndex >= puzzleIds.length) {
    // ...reset it to 0 (the first puzzle) to loop back.
    currentIndex = 0;
  }
  
  // Call our function to update the iframe with the new puzzle
  showPuzzle();
});

// Tell the "Previous" button to listen for a 'click'
prevButton.addEventListener("click", () => {
  // When clicked, subtract 1 from the current index
  currentIndex--;
  
  // --- This is the "looping" logic ---
  // If the index is now *less than* 0 (before the first puzzle)...
  if (currentIndex < 0) {
    // ...set it to the very last index in the list.
    currentIndex = puzzleIds.length - 1;
  }
  
  // Call our function to update the iframe
  showPuzzle();
});