const main = document.querySelector('main');

function birtaError() {
  const errordiv = document.createElement('div');
  const p = document.createElement('p');
  errordiv.appendChild(p);
  errordiv.setAttribute('class', 'error');
  p.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));

  main.appendChild(errordiv);
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


  main.appendChild(div);
}



function loadMovie() {
  const request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = () => {
    let data;

    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.response);



      console.log(data);

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
