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

    const d1 = document.createElement('div');
    d1.setAttribute('class', 'video__back');
    setjaImgAElement('/img/back.svg', d1);
    div.appendChild(d1);

    const d2 = document.createElement('div');
    d2.setAttribute('class', 'video__play');
    setjaImgAElement('/img/play.svg', d2);
    div.appendChild(d2);

    const d3 = document.createElement('div');
    d3.setAttribute('class', 'video__mute');
    setjaImgAElement('/img/mute.svg', d3);
    div.appendChild(d3);

    const d4 = document.createElement('div');
    d4.setAttribute('class', 'video__fullscreen');
    setjaImgAElement('/img/fullscreen.svg', d4);
    div.appendChild(d4);

    const d5 = document.createElement('div');
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
  const poster = document.createElement('img');
  poster.setAttribute('class', 'video__img');
  poster.setAttribute('src', data.poster);
  divForVideo.appendChild(poster);
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

function empty(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild)
  }
}


function spila(data) {
  const videoDiv = document.querySelector('.video__video-container');
  empty(videoDiv);

  const video = document.createElement('video');
  video.setAttribute('class', 'video__video');
  video.setAttribute('src', data.video);
  videoDiv.appendChild(video);
  video.play();


}

function fullscreen() {
  const video = document.querySelector('.video__video');
  if (video.requestFullscreen) {
    video.requestFullscreen();
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

      for (let i = 0; i < data.videos.length; i++) {

        if (data.videos[i].id == parseInt(location.search.substring(4), 10)) {
          myndband = data.videos[i];
        }
      }



      geraVideo(myndband);

      const play = document.querySelector('.video__play');
      const back = document.querySelector('.video__back');
      const next = document.querySelector('.video__next');
      const full = document.querySelector('.video__fullscreen');
      const mute = document.querySelector('.video__mute');
      console.log(back);
      console.log(play);
      console.log(mute);
      console.log(full);
      console.log(next);

      play.addEventListener('click', () => {
        spila(myndband);
      });

      full.addEventListener('click', () => {
        fullscreen();
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
