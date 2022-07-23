const lineRow = document.querySelectorAll(".row .line");
const lineColumn = document.querySelectorAll(".column .line-column");

let user = "B";
const selectedLine = [];
const markedBox = [];

const addOnClick = (line) => {
  line.forEach((l) => {
    l.addEventListener("click", (e) => {
      if (!selectedLine.includes(e.target.id)) {
        selectedLine.push(e.target.id);
        checkBoxLine(e.target.id);
        user = user === "B" ? "R" : "B";
        e.target.style.backgroundColor = user === "B" ? "blue" : "red";

        if (markedBox.length == 9) {
          const body = document.querySelector("body");

          let B = 0;
          let R = 0;
          markedBox.forEach((mark) => {
            const [type, _r, _c] = mark.split("-");
            type === "B" ? B++ : R++;
          });
          if (B > R) {
            body.style.backgroundColor = "red";
          } else {
            body.style.backgroundColor = "blue";
          }
        }
      }
    });
  });
};
addOnClick(lineRow);
addOnClick(lineColumn);

const checkMarks = (i, j) => {
  const topLine = `r-${i}-${j}`;
  const rightLine = `c-${i}-${j + 1}`;
  const bottomLine = `r-${i + 1}-${j}`;
  const leftLine = `c-${i}-${j}`;
  return [topLine, rightLine, bottomLine, leftLine].every((line) =>
    selectedLine.includes(line)
  );
};

const boxComplete = (r, c) => {
  console.log(`box-${r}-${c}`);
  const markedBoxSelect = document.getElementById(`box-${r}-${c}`);
  markedBoxSelect.style.backgroundColor = user === "B" ? "red" : "blue  ";
  markedBox.push(`${user}-${r}-${c}`);
};

const checkBoxLine = (lineId) => {
  const [type, _r, _c] = lineId.split("-");
  const r = parseInt(_r);
  const c = parseInt(_c);

  let squareFilled = false;
  if (type === "c") {
    // check left box
    if (checkMarks(r, c - 1)) {
      boxComplete(r, c - 1);
      squareFilled = true;
    }
    // check right box
    if (checkMarks(r, c)) {
      boxComplete(r, c);
      squareFilled = true;
    }
  } else {
    // check top box
    if (checkMarks(r - 1, c)) {
      boxComplete(r - 1, c);
      squareFilled = true;
    }
    // check bottom box
    if (checkMarks(r, c)) {
      boxComplete(r, c);
      squareFilled = true;
    }
  }
  return squareFilled;
};

console.log(checkMarks(2, 0));
