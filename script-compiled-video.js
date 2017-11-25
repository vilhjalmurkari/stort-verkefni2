'use strict';

var main = document.querySelector('main');

function birtaError() {
  var errordiv = document.createElement('div');
  var p = document.createElement('p');
  errordiv.appendChild(p);
  errordiv.setAttribute('class', 'error');
  p.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));

  main.appendChild(errordiv);
}

function setjaImgAElement(img, element) {
  var image = document.createElement('img');
  image.setAttribute('src', img);
  element.appendChild(image);
}

function geraDivFyrirTakka(div) {
  var d1 = document.createElement('div');
  d1.setAttribute('class', 'video__back');
  setjaImgAElement('/img/back.svg', d1);
  div.appendChild(d1);

  var d2 = document.createElement('div');
  d2.setAttribute('class', 'video__play-and-pause');

  var d21 = document.createElement('div');
  d21.setAttribute('class', 'video__play');
  setjaImgAElement('/img/play.svg', d21);

  var d22 = document.createElement('div');
  d22.setAttribute('class', 'video__pause-hidden');
  setjaImgAElement('/img/pause.svg', d22);

  d2.appendChild(d21);
  d2.appendChild(d22);
  div.appendChild(d2);

  var d3 = document.createElement('div');
  d3.setAttribute('class', 'video__mute-and-unmute');

  var d31 = document.createElement('div');
  d31.setAttribute('class', 'video__mute');
  setjaImgAElement('/img/mute.svg', d31);

  var d32 = document.createElement('div');
  d32.setAttribute('class', 'video__unmute-hidden');
  setjaImgAElement('/img/unmute.svg', d32);

  d3.appendChild(d31);
  d3.appendChild(d32);
  div.appendChild(d3);

  var d4 = document.createElement('div');
  d4.setAttribute('class', 'video__fullscreen');
  setjaImgAElement('/img/fullscreen.svg', d4);
  div.appendChild(d4);

  var d5 = document.createElement('div');
  d5.setAttribute('class', 'video__next');
  setjaImgAElement('/img/next.svg', d5);
  div.appendChild(d5);
}

function geraVideo(data) {
  var div = document.createElement('div');
  div.setAttribute('class', 'video');

  var titill = document.createElement('h1');
  titill.setAttribute('class', 'video__title');
  titill.appendChild(document.createTextNode(data.title));
  div.appendChild(titill);

  var divForVideo = document.createElement('div');
  divForVideo.setAttribute('class', 'video__video-container');
  var poster = document.createElement('video');
  poster.setAttribute('class', 'video__video');
  poster.setAttribute('poster', data.poster);
  poster.setAttribute('src', data.video);

  var overlay = document.createElement('div');
  overlay.setAttribute('class', 'video__overlay');
  var over = document.createElement('img');
  over.setAttribute('class', 'video__over');
  over.setAttribute('src', '/img/play.svg');
  overlay.appendChild(over);

  divForVideo.appendChild(poster);
  divForVideo.appendChild(overlay);
  div.appendChild(divForVideo);

  var buttons = document.createElement('div');
  buttons.setAttribute('class', 'video__button-list');

  div.appendChild(buttons);
  geraDivFyrirTakka(buttons);

  var tilbaka = document.createElement('a');
  tilbaka.setAttribute('href', 'index.html');
  tilbaka.setAttribute('class', 'video__to-original-page');
  tilbaka.appendChild(document.createTextNode('Til baka'));
  div.appendChild(tilbaka);

  main.appendChild(div);
}

function spolaTilbaka() {
  var video = document.querySelector('.video__video');
  video.currentTime -= 3;
}

function spolaAfram() {
  var video = document.querySelector('.video__video');
  video.currentTime += 3;
}

function spila(nuverandi, thadSemBreytist, overlay) {
  var video = document.querySelector('.video__video');
  video.play();

  nuverandi.setAttribute('class', 'video__play-hidden');
  thadSemBreytist.setAttribute('class', 'video__pause');
  overlay.setAttribute('class', 'video__overlay-hidden');

  var a = new Array();
  a.push(nuverandi);
  a.push(thadSemBreytist);
  a.push(overlay);

  return a;
}

function pasa(nuverandi, thadSemBreytist, overlay) {
  var video = document.querySelector('.video__video');
  video.pause();

  nuverandi.setAttribute('class', 'video__play');
  thadSemBreytist.setAttribute('class', 'video__pause-hidden');
  overlay.setAttribute('class', 'video__overlay');

  var a = new Array();
  a.push(nuverandi);
  a.push(thadSemBreytist);
  a.push(overlay);

  return a;
}

function soundOff(nuverandi, thadSemBreytist) {
  var video = document.querySelector('.video__video');
  video.muted = true;

  nuverandi.setAttribute('class', 'video__mute-hidden');
  thadSemBreytist.setAttribute('class', 'video__unmute');

  var a = new Array();
  a.push(nuverandi);
  a.push(thadSemBreytist);

  return a;
}

function soundOn(nuverandi, thadSemBreytist) {
  var video = document.querySelector('.video__video');
  video.muted = false;

  nuverandi.setAttribute('class', 'video__mute');
  thadSemBreytist.setAttribute('class', 'video__unmute-hidden');

  var a = new Array();
  a.push(nuverandi);
  a.push(thadSemBreytist);

  return a;
}

function fullscreen() {
  var video = document.querySelector('.video__video');
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

function loadMovie() {
  var request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = function () {
    var data = void 0;
    var myndband = void 0;

    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.response);

      for (var i = 0; i < data.videos.length; i += 1) {
        if (data.videos[i].id === parseInt(location.search.substring(4), 10)) {
          myndband = data.videos[i];
        }
      }

      geraVideo(myndband);

      var play = document.querySelector('.video__play');
      var pause = document.querySelector('.video__pause-hidden');
      var back = document.querySelector('.video__back');
      var next = document.querySelector('.video__next');
      var full = document.querySelector('.video__fullscreen');
      var mute = document.querySelector('.video__mute');
      var unmute = document.querySelector('.video__unmute-hidden');
      var overlay = document.querySelector('.video__overlay');
      console.log(overlay);

      var a = new Array();

      back.addEventListener('click', spolaTilbaka);
      next.addEventListener('click', spolaAfram);

      play.addEventListener('click', function () {
        a = spila(play, pause, overlay);

        play = a[0];
        pause = a[1];
        overlay = a[2];
      });

      pause.addEventListener('click', function () {
        a = pasa(play, pause, overlay);

        play = a[0];
        pause = a[1];
        overlay = a[2];
      });

      mute.addEventListener('click', function () {
        a = soundOff(mute, unmute);

        mute = a[0];
        unmute = a[1];
      });

      unmute.addEventListener('click', function () {
        a = soundOn(mute, unmute);

        mute = a[0];
        unmute = a[1];
      });

      full.addEventListener('click', function () {
        fullscreen();
      });

      overlay.addEventListener('click', function () {
        a = spila(play, pause, overlay);

        play = a[0];
        pause = a[1];
        overlay = a[2];
      });
    }
  };

  request.onerror = function () {
    birtaError();
  };
  request.send();
}

document.addEventListener('DOMContentLoaded', function () {
  loadMovie();
});

//# sourceMappingURL=script-compiled-video.js.map