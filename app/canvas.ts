import { ballImage, piskleImage } from './image';
import { hoopImage } from './image';
let fallSpeed = 75;
let app = document.querySelector('#app');
let canvas = document.createElement('canvas');
app.appendChild(canvas);
let score = 0;
let width = 500;

canvas.width = 500;
canvas.height = 500;
canvas.style.width = '90vh';
canvas.style.height = '90vh';
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
    if (scored == false) {score = 0}
    if (score == 0) {fallSpeed = 75}
    ball.x = Math.random() * canvas.width;
    scored = false
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
  checkForEdge()



  requestAnimationFrame(animateBall)
}

ballImage.addEventListener(
  "load",
  function() { animateBall() }
)


export let hoop = {
  frame: 0,
  x: 250,
  y: 450,
  image: piskleImage,
}


function drawHoop() {
  let ctx = canvas.getContext('2d');
  ctx.resetTransform();
  //ctx.clearRect(0,0,canvas.width,canvas.height);  
  ctx.translate(hoop.x, hoop.y)
  ctx.rotate(hoop.angle);
  ctx.drawImage(
    hoop.image,
    hoop.frame * 32, 0, //source offset
    32, 32, //source size
    -25, -25, //destination offset
    75, 75 //desitnation size
  )
}


animateBall();

function checkForEdge() {
  if (hoop.x < 0) {
    (hoop.x = width)
  }
  if (hoop.x > width) {
    (hoop.x = 0)
  }
}


function checkForHits() {
  {

    if (Math.abs(ball.x - hoop.x) < 30) {
      if (Math.abs(ball.y - hoop.y) < 20) {
        if (endStep ==0)
        swishSequence()

        
      }
    }
  }
}
//add speed cap
//add way to lose
//make look nice

function swishSequence() {
  // update hoop image
  scored = true
  hoop.frame += 1
  endStep += 1;
  if (endStep < 7) {
    // run ourselves again in a moment
    console.log("Step", endStep);
    setTimeout(swishSequence, 7500/fallSpeed);
  } else {
  hoop.frame = 0
    endStep = 0
      score += 1;
        console.log("Hit");
        fallSpeed += 10
    if (fallSpeed > 300) {fallSpeed = 300}
       

    // finish up
  }
}

let endStep = 0;

let scored = false

