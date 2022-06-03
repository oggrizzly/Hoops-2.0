import ballUrl from './assets/ball.png'
let assetDiv2 : HTMLDivElement = document.querySelector('#assets');

assetDiv2.style.display = 'none';

export let ballImage = document.createElement ('img');
ballImage.src = ballUrl ;
assetDiv2.appendChild(ballImage);

import hoopUrl from './assets/hoop.png'
let assetDiv : HTMLDivElement = document.querySelector('#assets');

assetDiv.style.display = 'none';

export let hoopImage = document.createElement ('img');
hoopImage.src = hoopUrl ;
assetDiv.appendChild(hoopImage);

import piskleUrl from './assets/piskle.png'
let assetDiv3 : HTMLDivElement = document.querySelector('#assets');

assetDiv3.style.display = 'none';

export let piskleImage = document.createElement ('img');
piskleImage.src = piskleUrl ;
assetDiv3.appendChild(hoopImage);