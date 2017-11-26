'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
  var d1 = document.createElement('button');
  d1.setAttribute('class', 'video__back');
  setjaImgAElement('/img/back.svg', d1);
  div.appendChild(d1);

  var d2 = document.createElement('button');
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

  var d3 = document.createElement('button');
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

  var d4 = document.createElement('button');
  d4.setAttribute('class', 'video__fullscreen');
  setjaImgAElement('/img/fullscreen.svg', d4);
  div.appendChild(d4);

  var d5 = document.createElement('button');
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

  return [nuverandi, thadSemBreytist, overlay];
}

function pasa(nuverandi, thadSemBreytist, overlay) {
  var video = document.querySelector('.video__video');
  video.pause();

  nuverandi.setAttribute('class', 'video__play');
  thadSemBreytist.setAttribute('class', 'video__pause-hidden');
  overlay.setAttribute('class', 'video__overlay');

  return [nuverandi, thadSemBreytist, overlay];
}

function soundOff(nuverandi, thadSemBreytist) {
  var video = document.querySelector('.video__video');
  video.muted = true;

  nuverandi.setAttribute('class', 'video__mute-hidden');
  thadSemBreytist.setAttribute('class', 'video__unmute');

  return [nuverandi, thadSemBreytist];
}

function soundOn(nuverandi, thadSemBreytist) {
  var video = document.querySelector('.video__video');
  video.muted = false;

  nuverandi.setAttribute('class', 'video__mute');
  thadSemBreytist.setAttribute('class', 'video__unmute-hidden');

  return [nuverandi, thadSemBreytist];
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

      var a = [];

      back.addEventListener('click', spolaTilbaka);
      next.addEventListener('click', spolaAfram);

      play.addEventListener('click', function () {
        a = spila(play, pause, overlay);
        var _a = a;

        var _a2 = _slicedToArray(_a, 3);

        play = _a2[0];
        pause = _a2[1];
        overlay = _a2[2];
      });

      pause.addEventListener('click', function () {
        a = pasa(play, pause, overlay);
        var _a3 = a;

        var _a4 = _slicedToArray(_a3, 3);

        play = _a4[0];
        pause = _a4[1];
        overlay = _a4[2];
      });

      mute.addEventListener('click', function () {
        a = soundOff(mute, unmute);
        var _a5 = a;

        var _a6 = _slicedToArray(_a5, 2);

        mute = _a6[0];
        unmute = _a6[1];
      });

      unmute.addEventListener('click', function () {
        a = soundOn(mute, unmute);
        var _a7 = a;

        var _a8 = _slicedToArray(_a7, 2);

        mute = _a8[0];
        unmute = _a8[1];
      });

      full.addEventListener('click', function () {
        fullscreen();
      });

      overlay.addEventListener('click', function () {
        a = spila(play, pause, overlay);
        var _a9 = a;

        var _a10 = _slicedToArray(_a9, 3);

        play = _a10[0];
        pause = _a10[1];
        overlay = _a10[2];
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