const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const initialColor = "#2c2c2c";
const canvasSize = 700;
canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = initialColor;
ctx.fillStyle = initialColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const modeList = ["Fill", "Paint", "Eraser"];

const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (!filling) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};
const handleColorClick = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleModeClick = (event) => {
  filling = !filling;
  if (filling === false) {
    mode.innerText = modeList[0];
  } else {
    mode.innerText = modeList[1];
    ctx.fillStyle = ctx.strokeStyle;
  }
};

const startPainting = () => {
  painting = true;
};

const stopPainting = () => {
  painting = false;
};

const handleRangeChange = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const handleCanvasClick = (event) => {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const handleSaveClick = (event) => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
};

const handleCm = (event) => {
  event.preventDefault();
};

const handleClearClick = (event) => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = initialColor;
  ctx.fillStyle = initialColor;
  ctx.lineWidth = 2.5;

  painting = false;
  filling = false;
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCm);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});
