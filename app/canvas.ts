import { ballImage } from './image';
import { hoopImage } from './image';
let fallSpeed = 75;
let app = document.querySelector('#app');
let canvas = document.createElement('canvas');
app.appendChild(canvas);
let score = 0;
let width = 500;

canvas.width = 500;
canvas.height = 500;
canvas.style.width = '90vw';
canvas.style.height = '90vw';
canvas.style.border = '3px solid black'
canvas.style.backgroundColor = 'black'

export let ball = {
  x: 250,
  y: 80,
  angle: 0,
  image: ballImage,
}


function drawBall() {
  let ctx = canvas.getContext('2d');
  ctx.resetTransform();
  //ctx.clearRect(0,0,canvas.width,canvas.height);  
  ctx.translate(ball.x, ball.y)
  ctx.rotate(ball.angle);
  ctx.drawImage(
    ball.image,
    -25, -25,
    50,
    50
  )
}

let startTime = null;

function updateBall(elapsed: number) {
  const drift = 100;

  ball.x += (
    (Math.random() - 0.5) * drift * 2) * elapsed / 1000;
  ball.y += fallSpeed * elapsed / 1000;
  ball.angle += (
    (Math.random() - 0.5) *  // + or - 1/2
    4 * Math.PI
    * elapsed / 1000
  );
  if (ball.y > canvas.height + 50) {
    ball.y = 0;
  }
  if (ball.x < 0) {
    ball.x = canvas.width - 25;
  }
  if (ball.x > canvas.width) {
    ball.x = 25;
  }
}

function animateBall(timestamp: number = 0) {
  let elapsed;
  if (timestamp) {
    if (!startTime) {
      startTime = timestamp;
      elapsed = 0;
    } else {
      elapsed = timestamp - startTime
      startTime = timestamp;
    }
    updateBall(elapsed);
  }
  let ctx = canvas.getContext('2d');
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "white"
  ctx.font = 'bold 25px serif';
  ctx.fillText(`Score: ${score}`, 50, 50);
  drawBall();
  drawHoop();
  checkForHits()
  checkForEdge ()

  requestAnimationFrame(animateBall)
}

ballImage.addEventListener(
  "load",
  function() { animateBall() }
)


export let hoop = {
  x: 250,
  y: 450,
  image: hoopImage,
}


function drawHoop() {
  let ctx = canvas.getContext('2d');
  ctx.resetTransform();
  //ctx.clearRect(0,0,canvas.width,canvas.height);  
  ctx.translate(hoop.x, hoop.y)
  ctx.rotate(hoop.angle);
  ctx.drawImage(
    hoop.image,
    -25, -25,
    50, 50
  )
}


animateBall();

function checkForEdge () {
  if (hoop.x < 0) {
    (hoop.x = width)
  }
  if (hoop.x > width) {
    (hoop.x = 0)
  }
}
function checkForHits() {
  {
    
    if (Math.abs(ball.x - hoop.x) < 20) {
      if (Math.abs(ball.y - hoop.y) < 20) {
        score += 1;
        console.log("Hit");
        fallSpeed += 10
        ball.y = 0;

        ball.x = Math.random() * canvas.width
      }
    }
  }
}
//add speed cap
//add way to lose
//make look nice
