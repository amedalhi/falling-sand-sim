let cells = [];
let ruleValue = 110;
let ruleSet;
let w = 5; //width of each cell
let y = 0;

function setup() {
  createCanvas(1000, 1000);

  //convert ruleValue to binary and adds "0" to the left to make it 8 digits long if shorter
  ruleSet = ruleValue.toString(2).padStart(8, "0");
  let total = width / w; //total number of cells
  //initialize cells array
  for (let i = 0; i < total; i++) {
    cells[i] = 0; //set all cells to 0
  }

  cells[floor(total / 2)] = 1; //set the middle cell to 1
  background(255);
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    let x = i * w; //sets x coord every w length
    noStroke();
    fill(255 - cells[i] * 255); //sets cells = 1 to black, 0 to white
    square(x, y, w);
  }

  y += w; //sets next y coord to width

  let nextCells = [];

  let len = cells.length;
  for (let i = 0; i < len; i++) {
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i + 1) % len];
    let state = cells[i];
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }

  cells = nextCells;
}

function calculateState(a, b, c) {
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}
