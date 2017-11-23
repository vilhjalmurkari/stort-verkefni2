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
  d2.setAttribute('class', 'video__play');
  setjaImgAElement('/img/play.svg', d2);
  div.appendChild(d2);

  var d3 = document.createElement('div');
  d3.setAttribute('class', 'video__mute');
  setjaImgAElement('/img/mute.svg', d3);
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
  var poster = document.createElement('img');
  poster.setAttribute('class', 'video__img');
  poster.setAttribute('src', data.poster);
  divForVideo.appendChild(poster);
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

function empty(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

function spila(data) {
  var videoDiv = document.querySelector('.video__video-container');
  empty(videoDiv);

  var video = document.createElement('video');
  video.setAttribute('class', 'video__video');
  video.setAttribute('src', data.video);
  videoDiv.appendChild(video);
  video.play();
}

function fullscreen() {
  var video = document.querySelector('.video__video');
  if (video.requestFullscreen) {
    video.requestFullscreen();
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

      for (var i = 0; i < data.videos.length; i++) {

        if (data.videos[i].id == parseInt(location.search.substring(4), 10)) {
          myndband = data.videos[i];
        }
      }

      geraVideo(myndband);

      var play = document.querySelector('.video__play');
      var back = document.querySelector('.video__back');
      var next = document.querySelector('.video__next');
      var full = document.querySelector('.video__fullscreen');
      var mute = document.querySelector('.video__mute');
      console.log(back);
      console.log(play);
      console.log(mute);
      console.log(full);
      console.log(next);

      play.addEventListener('click', function () {
        spila(myndband);
      });

      full.addEventListener('click', function () {
        fullscreen();
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