const wordBank = [
  "SUCCINCT",
  "PROVER",
  "PROVE",
  "ZKPROOF",
  "TESTNET",
  "STAGE",
  "STAKING",
  "AUCTION",
  "TOKEN",
  "ERC20TOKEN",
  "ETHEREUM",
  "ZKAPP",
  "PRACTICE",
  "TRUSTLESS",
  "GOVERNANCE",
  "SECURE",
  "SCALABLE",
  "MODULAR",
  "DECENTRALIZED",
  "EFFICIENT",
  "NETWORK",
  "ARCHITECTURE",
  "AUCTIONEER",
  "MATCHMAKER",
  "BIDDING",
  "PRICING",
  "GASLIMIT",
  "CONTENDERS",
  "REQUESTER",
  "REQUEST",
  "FULFILL",
  "FULFILLMENT",
  "DEADLINE",
  "PAYMENT",
  "PROVEREWARD",
  "REWARDPOOL",
  "EMISSIONS",
  "SLASHING",
  "COLLATERAL",
  "DELEGATE",
  "STAKERS",
  "SECURITYBOND",
  "INFRASTRUCTURE",
  "COMPETITION",
  "MARKETPLACE",
  "CLUSTER",
  "GPUWORKER",
  "FPGAUNIT",
  "ASICNODE",
  "HARDWARE",
  "BATCHES",
  "SP1ENGINE",
  "ZKVM",
  "SP1PROGRAM",
  "VIRTUALMACHINE",
  "TRANSACTION",
  "COMMITMENT",
  "MERKLETREE",
  "HASHVALUE",
  "DATASTORE",
  "DATAVALIDITY",
  "CONSENSUS",
  "SETTLEMENT",
  "OFFCHAINWORK",
  "ONCHAINPROOF",
  "REALTIME",
  "PERFORMANCE",
  "WEB2BRIDGE",
  "WEB3TOOL",
  "FRONTEND",
  "BACKEND",
  "THROUGHPUT",
  "VERIFICATION",
  "STATEROOT",
  "STATETREE",
  "SMARTCONTRACT",
  "ERCSTANDARD",
  "PROTOCOL",
  "MONITORING",
  "EXPLORER",
  "INTERFACE",
  "ENDPOINT",
  "DASHBOARD",
  "PARTICIPATE",
  "MAINNET",
  "ONBOARDING",
  "AIRDROP",
  "TESTSEPOLIA",
  "CODEAUDIT",
  "FORMALCHECK",
  "PROOFLOGIC",
  "INDEPENDENT",
  "TRANSPARENCY",
  "VOTING",
  "PARAMETERS",
  "NETWORKUPGRADE",
  "ROADMAP",
  "CLOBENGINE",
  "BRIDGING",
  "PUZZLEGAME" /* your words */,
];
let gridSize = 8;
let grid = [];
let allowedDirections = ["H", "V"]; // Default for easy

function createEmptyGrid() {
  grid = [];
  for (let i = 0; i < gridSize; i++) {
    const row = new Array(gridSize).fill("");
    grid.push(row);
  }
}

function pickRandomWords(count) {
  const filtered = wordBank.filter((word) => word.length <= gridSize);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  console.log("Words picked:", selected);
  return selected;
}

function canPlaceWord(word, row, col, dir) {
  if (dir === "H") {
    if (col + word.length > gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== "" && grid[row][col + i] !== word[i]) {
        return false;
      }
    }
  } else if (dir === "V") {
    if (row + word.length > gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== "" && grid[row + i][col] !== word[i]) {
        return false;
      }
    }
  } else if (dir === "D1") {
    // ↘️
    if (row + word.length > gridSize || col + word.length > gridSize)
      return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col + i] !== "" && grid[row + i][col + i] !== word[i]) {
        return false;
      }
    }
  } else if (dir === "D2") {
    // ↙️
    if (row + word.length > gridSize || col - word.length < -1) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col - i] !== "" && grid[row + i][col - i] !== word[i]) {
        return false;
      }
    }
  } else if (dir === "D3") {
    // ↗️
    if (row - word.length < -1 || col + word.length > gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row - i][col + i] !== "" && grid[row - i][col + i] !== word[i]) {
        return false;
      }
    }
  } else if (dir === "D4") {
    // ↖️
    if (row - word.length < -1 || col - word.length < -1) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row - i][col - i] !== "" && grid[row - i][col - i] !== word[i]) {
        return false;
      }
    }
  }

  return true;
}


function getValidStart(wordLength, dir) {
  let row, col;

  switch (dir) {
    case "H": // Horizontal →
      row = Math.floor(Math.random() * gridSize);
      col = Math.floor(Math.random() * (gridSize - wordLength + 1));
      break;

    case "V": // Vertical ↓
      row = Math.floor(Math.random() * (gridSize - wordLength + 1));
      col = Math.floor(Math.random() * gridSize);
      break;

    case "D1": // Diagonal ↘️ down-right
      row = Math.floor(Math.random() * (gridSize - wordLength + 1));
      col = Math.floor(Math.random() * (gridSize - wordLength + 1));
      break;

    case "D2": // Diagonal ↙️ down-left
      row = Math.floor(Math.random() * (gridSize - wordLength + 1));
      col =
        Math.floor(Math.random() * (gridSize - wordLength + 1)) +
        (wordLength - 1);
      break;

    case "D3": // Diagonal ↗️ up-right
      row =
        Math.floor(Math.random() * (gridSize - wordLength + 1)) +
        (wordLength - 1);
      col = Math.floor(Math.random() * (gridSize - wordLength + 1));
      break;

    case "D4": // Diagonal ↖️ up-left
      row =
        Math.floor(Math.random() * (gridSize - wordLength + 1)) +
        (wordLength - 1);
      col =
        Math.floor(Math.random() * (gridSize - wordLength + 1)) +
        (wordLength - 1);
      break;
  }

  return { row, col };
}



function placeWord(word) {
  let placed = false;
  let tries = 0;

  while (!placed && tries < 100) {
    const dir =
      allowedDirections[Math.floor(Math.random() * allowedDirections.length)];
    const { row, col } = getValidStart(word.length, dir);

    if (canPlaceWord(word, row, col, dir)) {
      if (dir === "H") {
        for (let i = 0; i < word.length; i++) {
          grid[row][col + i] = word[i];
        }
      } else if (dir === "V") {
        for (let i = 0; i < word.length; i++) {
          grid[row + i][col] = word[i];
        }
      } else if (dir === "D1") {
        // ↘️
        for (let i = 0; i < word.length; i++) {
          grid[row + i][col + i] = word[i];
        }
      } else if (dir === "D2") {
        // ↙️
        for (let i = 0; i < word.length; i++) {
          grid[row + i][col - i] = word[i];
        }
      } else if (dir === "D3") {
        // ↗️
        for (let i = 0; i < word.length; i++) {
          grid[row - i][col + i] = word[i];
        }
      } else if (dir === "D4") {
        // ↖️
        for (let i = 0; i < word.length; i++) {
          grid[row - i][col - i] = word[i];
        }
      }

      placed = true;
    }

    tries++;
  }

  return placed;
}



function placeWords(words) {
  const successfullyPlaced = [];
  words.forEach((word) => {
    const placed = placeWord(word);
    if (placed) {
      successfullyPlaced.push(word);
    } else {
      console.warn(`Could not place word: ${word}`);
    }
  });
  return successfullyPlaced;
}

function fillEmptyCells() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === "") {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        grid[row][col] = randomLetter;
      }
    }
  }
}

function renderGrid() {
  const gridContainer = document.getElementById("grid");
  gridContainer.innerHTML = "";
  grid.forEach((row, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    row.forEach((cell, colIndex) => {
      const cellSpan = document.createElement("span");
      cellSpan.textContent = cell;
      cellSpan.classList.add("cell");
      cellSpan.dataset.row = rowIndex;
      cellSpan.dataset.col = colIndex;
      rowDiv.appendChild(cellSpan);
    });
    gridContainer.appendChild(rowDiv);
  });
}

function renderWordList(words) {
  const wordList = document.getElementById("word-list");
  wordList.innerHTML = "";
  words.forEach((word) => {
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
  });
}

function updateAllowedDirections(difficulty) {
  if (difficulty === "easy") {
    allowedDirections = ["H", "V"];
  } else {
    allowedDirections = ["H", "V", "D1", "D2", "D3", "D4"];
  }
}



document.getElementById("new-game").addEventListener("click", () => {
  const difficulty = document.getElementById("difficulty").value;

  if (difficulty === "easy") {
    wordCount = 5 + Math.floor(Math.random() * 4);
    gridSize = 8;
  } else if (difficulty === "medium") {
    wordCount = 10 + Math.floor(Math.random() * 6);
    gridSize = 10;
  } else if (difficulty === "hard") {
    wordCount = 15 + Math.floor(Math.random() * 11);
    gridSize = 12;
  }

  updateAllowedDirections(difficulty); // ✅ make sure this runs AFTER gridSize + wordCount

  createEmptyGrid();
  const words = pickRandomWords(wordCount).sort((a, b) => b.length - a.length);
  const placedWords = placeWords(words);
  fillEmptyCells();
  renderGrid();
  renderWordList(placedWords);
});


// --- Selection state ---
let selectedCells = [];
let startCell = null;
let endCell = null;

document.getElementById("grid").addEventListener("click", (e) => {
  if (e.target.classList.contains("cell")) {
    if (!startCell) {
      clearSelection();
      startCell = e.target;
      startCell.classList.add("selected");
      selectedCells.push(startCell);
    } else {
      endCell = e.target;
      const pathCells = getCellsInLine(startCell, endCell);

      if (pathCells) {
        selectedCells = pathCells;
        selectedCells.forEach((cell) => cell.classList.add("selected"));
        checkSelection();
      } else {
        clearSelection();
      }

      startCell = null;
      endCell = null;
    }
  }
});

function getCellsInLine(start, end) {
  const row1 = parseInt(start.dataset.row);
  const col1 = parseInt(start.dataset.col);
  const row2 = parseInt(end.dataset.row);
  const col2 = parseInt(end.dataset.col);

  let cells = [];

  let dRow = row2 - row1;
  let dCol = col2 - col1;

  let stepRow = dRow === 0 ? 0 : dRow / Math.abs(dRow);
  let stepCol = dCol === 0 ? 0 : dCol / Math.abs(dCol);

  if (
    (stepRow === 0 && stepCol !== 0) ||
    (stepCol === 0 && stepRow !== 0) ||
    Math.abs(dRow) === Math.abs(dCol)
  ) {
    let currentRow = row1;
    let currentCol = col1;

    while (true) {
      const cell = document.querySelector(
        `.cell[data-row='${currentRow}'][data-col='${currentCol}']`
      );
      if (!cell) return null;
      cells.push(cell);

      if (currentRow === row2 && currentCol === col2) break;

      currentRow += stepRow;
      currentCol += stepCol;
    }
    return cells;
  } else {
    return null;
  }
}

function clearSelection() {
  selectedCells.forEach((cell) => cell.classList.remove("selected"));
  selectedCells = [];
}

function getSelectedWord() {
  return selectedCells.map((cell) => cell.textContent).join("");
}

function checkSelection() {
  const word = getSelectedWord();
  console.log("Selected word:", word);

  const wordListItems = document.querySelectorAll("#word-list li");
  let found = false;

  wordListItems.forEach((li) => {
    if (li.textContent === word && !li.classList.contains("found")) {
      li.classList.add("found");
      selectedCells.forEach((cell) => {
        cell.classList.add("found");
        cell.classList.remove("selected");
      });
      found = true;
    }
  });

  if (!found) {
    clearSelection();
  } else {
    selectedCells = [];
  }

  checkWin();
}

function checkWin() {
  const allFound = Array.from(document.querySelectorAll("#word-list li"))
    .every(li => li.classList.contains("found"));
  if (allFound) {
    document.getElementById("win-modal").style.display = "block";
  }
}

document.getElementById("play-again").addEventListener("click", () => {
  document.getElementById("win-modal").style.display = "none";
  document.getElementById("word-list").innerHTML = "";
  document.getElementById("grid").innerHTML = "";
  // document.getElementById("win-message").textContent = "";
  // document.getElementById("new-game").click();
});
