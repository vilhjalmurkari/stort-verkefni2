const main = document.querySelector('main');

function birtaError() {
  const errordiv = document.createElement('div');
  const p = document.createElement('p');
  errordiv.appendChild(p);
  errordiv.setAttribute('class', 'error');
  p.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));

  main.appendChild(errordiv);
}

function geraDivFyrirTakka(div) {

    const d1 = document.createElement('div');
    d1.setAttribute('class', 'video__back');
    d1.appendChild(document.createTextNode('back'));
    div.appendChild(d1);

    const d2 = document.createElement('div');
    d2.setAttribute('class', 'video__play');
    d2.appendChild(document.createTextNode('play'));
    div.appendChild(d2);

    const d3 = document.createElement('div');
    d3.setAttribute('class', 'video__unmute');
    d3.appendChild(document.createTextNode('mute'));
    div.appendChild(d3);

    const d4 = document.createElement('div');
    d4.setAttribute('class', 'video__fullscreen');
    d4.appendChild(document.createTextNode('full'));
    div.appendChild(d4);

    const d5 = document.createElement('div');
    d5.setAttribute('class', 'video__next');
    d5.appendChild(document.createTextNode('next'));
    div.appendChild(d5);
}

function geraVideo(data) {

  const div = document.createElement('div');
  div.setAttribute('class', 'video');

  const titill = document.createElement('h1');
  titill.setAttribute('class', 'video__title');
  titill.appendChild(document.createTextNode(data.title));
  div.appendChild(titill);

  const myndband = document.createElement('video');
  myndband.setAttribute('class', 'video__video');
  myndband.setAttribute('src', data.video);
  div.appendChild(myndband);

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



function loadMovie() {
  const request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = () => {
    let data;
    let myndband;

    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.response);

      for (let i = 0; i < data.videos.length; i++) {

        if (data.videos[i].id == parseInt(location.search.substring(4), 10)) {
          myndband = data.videos[i];
        }
      }

      geraVideo(myndband);

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
