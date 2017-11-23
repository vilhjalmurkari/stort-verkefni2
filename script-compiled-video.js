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

function geraVideo(data) {

  var div = document.createElement('div');
  div.setAttribute('class', 'video');

  var titill = document.createElement('h1');
  titill.setAttribute('class', 'video__title');
  titill.appendChild(document.createTextNode(data.title));
  div.appendChild(titill);

  var myndband = document.createElement('video');
  myndband.setAttribute('class', 'video__video');
  myndband.setAttribute('src', data.video);
  div.appendChild(myndband);

  main.appendChild(div);
}

function loadMovie() {
  var request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = function () {
    var data = void 0;

    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.response);

      console.log(data);
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