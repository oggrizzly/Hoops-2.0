import {hoop} from './canvas';

window.addEventListener(
  'keydown',
  function (event) {
    console.log(event.key,'pressed');
    if (event.key == 'ArrowRight' || event.key=='d') {
      hoop.x += 15;
    }
    if (event.key == 'ArrowLeft' || event.key=='a') {
      hoop.x -= 15;
    }
  }
)
