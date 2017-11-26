const main = document.querySelector('main');

function birtaError() {
  const errordiv = document.createElement('div');
  const p = document.createElement('p');
  errordiv.appendChild(p);
  errordiv.setAttribute('class', 'error');
  p.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));

  main.appendChild(errordiv);
}

function setjaImgAElement(img, element) {
  const image = document.createElement('img');
  image.setAttribute('src', img);
  element.appendChild(image);
}

function geraDivFyrirTakka(div) {
  const d1 = document.createElement('button');
  d1.setAttribute('class', 'video__back');
  setjaImgAElement('/img/back.svg', d1);
  div.appendChild(d1);

  const d2 = document.createElement('button');
  d2.setAttribute('class', 'video__play-and-pause');

  const d21 = document.createElement('div');
  d21.setAttribute('class', 'video__play');
  setjaImgAElement('/img/play.svg', d21);

  const d22 = document.createElement('div');
  d22.setAttribute('class', 'video__pause-hidden');
  setjaImgAElement('/img/pause.svg', d22);

  d2.appendChild(d21);
  d2.appendChild(d22);
  div.appendChild(d2);

  const d3 = document.createElement('button');
  d3.setAttribute('class', 'video__mute-and-unmute');

  const d31 = document.createElement('div');
  d31.setAttribute('class', 'video__mute');
  setjaImgAElement('/img/mute.svg', d31);

  const d32 = document.createElement('div');
  d32.setAttribute('class', 'video__unmute-hidden');
  setjaImgAElement('/img/unmute.svg', d32);

  d3.appendChild(d31);
  d3.appendChild(d32);
  div.appendChild(d3);

  const d4 = document.createElement('button');
  d4.setAttribute('class', 'video__fullscreen');
  setjaImgAElement('/img/fullscreen.svg', d4);
  div.appendChild(d4);

  const d5 = document.createElement('button');
  d5.setAttribute('class', 'video__next');
  setjaImgAElement('/img/next.svg', d5);
  div.appendChild(d5);
}

function geraVideo(data) {
  const div = document.createElement('div');
  div.setAttribute('class', 'video');

  const titill = document.createElement('h1');
  titill.setAttribute('class', 'video__title');
  titill.appendChild(document.createTextNode(data.title));
  div.appendChild(titill);

  const divForVideo = document.createElement('div');
  divForVideo.setAttribute('class', 'video__video-container');
  const poster = document.createElement('video');
  poster.setAttribute('class', 'video__video');
  poster.setAttribute('poster', data.poster);
  poster.setAttribute('src', data.video);

  const overlay = document.createElement('div');
  overlay.setAttribute('class', 'video__overlay');
  const over = document.createElement('img');
  over.setAttribute('class', 'video__over');
  over.setAttribute('src', '/img/play.svg');
  overlay.appendChild(over);

  divForVideo.appendChild(poster);
  divForVideo.appendChild(overlay);
  div.appendChild(divForVideo);

  const buttons = document.createElement('div');
  buttons.setAttribute('class', 'video__button-list');

  div.appendChild(buttons);
  geraDivFyrirTakka(buttons);

  const tilbaka = document.createElement('a');
  tilbaka.setAttribute('href', 'index.html');
  tilbaka.setAttribute('class', 'video__to-original-page');
  tilbaka.appendChild(document.createTextNode('Til baka'));
  div.appendChild(tilbaka);

  main.appendChild(div);
}

function spolaTilbaka() {
  const video = document.querySelector('.video__video');
  video.currentTime -= 3;
}

function spolaAfram() {
  const video = document.querySelector('.video__video');
  video.currentTime += 3;
}

function spila(nuverandi, thadSemBreytist, overlay) {
  const video = document.querySelector('.video__video');
  video.play();

  nuverandi.setAttribute('class', 'video__play-hidden');
  thadSemBreytist.setAttribute('class', 'video__pause');
  overlay.setAttribute('class', 'video__overlay-hidden');

  return [nuverandi, thadSemBreytist, overlay];
}

function pasa(nuverandi, thadSemBreytist, overlay) {
  const video = document.querySelector('.video__video');
  video.pause();

  nuverandi.setAttribute('class', 'video__play');
  thadSemBreytist.setAttribute('class', 'video__pause-hidden');
  overlay.setAttribute('class', 'video__overlay');

  return [nuverandi, thadSemBreytist, overlay];
}

function soundOff(nuverandi, thadSemBreytist) {
  const video = document.querySelector('.video__video');
  video.muted = true;

  nuverandi.setAttribute('class', 'video__mute-hidden');
  thadSemBreytist.setAttribute('class', 'video__unmute');

  return [nuverandi, thadSemBreytist];
}

function soundOn(nuverandi, thadSemBreytist) {
  const video = document.querySelector('.video__video');
  video.muted = false;

  nuverandi.setAttribute('class', 'video__mute');
  thadSemBreytist.setAttribute('class', 'video__unmute-hidden');

  return [nuverandi, thadSemBreytist];
}

function fullscreen() {
  const video = document.querySelector('.video__video');
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

function loadMovie() {
  const request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = () => {
    let data;
    let myndband;

    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.response);

      for (let i = 0; i < data.videos.length; i += 1) {
        if (data.videos[i].id === parseInt(location.search.substring(4), 10)) {
          myndband = data.videos[i];
        }
      }

      geraVideo(myndband);

      let play = document.querySelector('.video__play');
      let pause = document.querySelector('.video__pause-hidden');
      const back = document.querySelector('.video__back');
      const next = document.querySelector('.video__next');
      const full = document.querySelector('.video__fullscreen');
      let mute = document.querySelector('.video__mute');
      let unmute = document.querySelector('.video__unmute-hidden');
      let overlay = document.querySelector('.video__overlay');
      console.log(overlay);

      let a = [];

      back.addEventListener('click', spolaTilbaka);
      next.addEventListener('click', spolaAfram);


      play.addEventListener('click', () => {
        a = spila(play, pause, overlay);
        [play, pause, overlay] = a;
      });

      pause.addEventListener('click', () => {
        a = pasa(play, pause, overlay);
        [play, pause, overlay] = a;
      });

      mute.addEventListener('click', () => {
        a = soundOff(mute, unmute);
        [mute, unmute] = a;
      });

      unmute.addEventListener('click', () => {
        a = soundOn(mute, unmute);
        [mute, unmute] = a;
      });

      full.addEventListener('click', () => {
        fullscreen();
      });

      overlay.addEventListener('click', () => {
        a = spila(play, pause, overlay);
        [play, pause, overlay] = a;
      });
    }
  };

  request.onerror = () => {
    birtaError();
  };
  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  loadMovie();
});
