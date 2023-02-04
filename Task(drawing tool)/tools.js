const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const circleBtn = document.getElementById("circle");
const diamondBtn = document.getElementById("diamond");
const rectangleBtn = document.getElementById("rectangle");
const squareBtn = document.getElementById("square");
const arrowBtn = document.getElementById("arrow");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const textBtn = document.getElementById("text");
const textInput = document.getElementById("text-input");


let isDrawing = false;
let shape = null;
let startX = 0;
let startY = 0;
let shapes = [];
let undoneShapes = [];

circleBtn.addEventListener("click", () => {
  shape = "circle";
});

diamondBtn.addEventListener("click", () => {
  shape = "diamond";
});

rectangleBtn.addEventListener("click", () => {
  shape = "rectangle";
});

squareBtn.addEventListener("click", () => {
  shape = "square";
});

arrowBtn.addEventListener("click", () => {
  shape = "arrow";
});

undoBtn.addEventListener("click", () => {
  if (shapes.length > 0) {
    undoneShapes.push(shapes.pop());
    redraw();
  }
});

redoBtn.addEventListener("click", () => {
  if (undoneShapes.length > 0) {
    shapes.push(undoneShapes.pop());
    redraw();
  }
});

textBtn.addEventListener("click", () => {
  shape = "text";
});


canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  startX = e.clientX;
  startY = e.clientY;
});



canvas.addEventListener("mouseup", e => {
  isDrawing = false;
  const width = e.clientX - startX;
  const height = e.clientY - startY;
  ctx.beginPath();

  if (shape === "circle") {
    const radius = Math.max(width, height);
    ctx.arc(startX + width / 2, startY + height / 2, radius / 2, 0, 2 * Math.PI);
    shapes.push({
      type: "circle",
      x: startX + width / 2,
      y: startY + height / 2,
      radius: radius / 2
    });
  } else if (shape === "diamond") {
    ctx.moveTo(startX + width / 2, startY);
    ctx.lineTo(startX + width, startY + height / 2);
    ctx.lineTo(startX + width / 2, startY + height);
    ctx.lineTo(startX, startY + height / 2);
    ctx.lineTo(startX + width / 2, startY);
    shapes.push({
      type: "diamond",
      x: startX + width / 2,
      y: startY + height / 2,
      width: width,
      height: height
    });
  }
  else if (shape === "rectangle") {
    ctx.rect(startX, startY, width, height);
    shapes.push({
      type: "rectangle",
      x: startX,
      y: startY,
      width: width,
      height: height
    });
  } 
  else if (shape === "square") {
    const side = Math.max(width, height);
    ctx.rect(startX, startY, side, side);
    shapes.push({
      type: "square",
      x: startX,
      y: startY,
      side: side
    });
  }
  else if (shape === "arrow") {
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + width, startY + height);
    ctx.moveTo(startX + width, startY);
    ctx.lineTo(startX, startY + height);
    shapes.push({
      type: "arrow",
      x1: startX,
      y1: startY,
      x2: startX + width,
      y2: startY + height
    });
  }
  else if (shape === "text") {
    ctx.fillStyle = "black";
    ctx.font = "13px Arial";
    ctx.fillText(textInput.value, startX, startY);
    shapes.push({
      type: "text",
      x: startX,
      y: startY,
      text: textInput.value
    });
  }
  

  ctx.stroke();
  shape = null;
  redraw();
});

canvas.addEventListener("mousemove", e => {
  if (!isDrawing) {
    return;
  }
  redraw();
  const width = e.clientX - startX;
  const height = e.clientY - startY;
  ctx.beginPath();
  if (shape === "circle") {
    const radius = Math.max(width, height);
    ctx.arc(startX + width / 2, startY + height / 2, radius / 2, 0, 2 * Math.PI);
  } else if (shape === "diamond") {
    ctx.moveTo(startX + width / 2, startY);
    ctx.lineTo(startX + width, startY + height / 2);
    ctx.lineTo(startX + width / 2, startY + height);
    ctx.lineTo(startX, startY + height / 2);
ctx.lineTo(startX + width / 2, startY);
}
else if (shape === "rectangle") {
ctx.rect(startX, startY, width, height);
} else if (shape === "square") {
const side = Math.max(width, height);
ctx.rect(startX, startY, side, side);
}
else if (shape === "arrow") {
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + width, startY + height);
//    ctx.moveTo(startX + width, startY);
//     ctx.lineTo(startX, startY + height);
  }
  
ctx.stroke();
});



function redraw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
shapes.forEach(s => {
ctx.beginPath();
if (s.type === "circle") {
ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
} else if (s.type === "diamond") {
ctx.moveTo(s.x, s.y - s.height / 2);
ctx.lineTo(s.x + s.width / 2, s.y);
ctx.lineTo(s.x, s.y + s.height / 2);
ctx.lineTo(s.x - s.width / 2, s.y);
ctx.lineTo(s.x, s.y - s.height / 2);
}
else if (s.type === "rectangle") {
ctx.rect(s.x, s.y, s.width, s.height);
} else if (s.type === "square") {
ctx.rect(s.x, s.y, s.side, s.side);
}
else if (s.type === "arrow") {
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
    // ctx.moveTo(s.x2, s.y1);
    // ctx.lineTo(s.x1, s.y2);
  }
  else if (s.type === "text") {
    ctx.fillText(s.text, s.x, s.y);
  }
  
ctx.stroke();
});
}
