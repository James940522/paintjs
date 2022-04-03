const canvas = document.getElementById("jsCanvas");

let painting = false;

const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
};
const onMouseDown = (event) => {
  painting = true;
};

const onMouseUP = (event) => {
  stopPainting();
};

const stopPainting = () => {
  painting = false;
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUP);
  canvas.addEventListener("mouseleave", stopPainting);
}
