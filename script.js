const main = document.querySelector('main');


function birtaError() {
  const errordiv = document.createElement('div');
  const p = document.createElement('p');
  errordiv.appendChild(p);
  errordiv.setAttribute('class', 'error');
  p.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));

  main.appendChild(errordiv);
}

function breytaDuration(timi) {

  const min = Math.floor(timi / 60);
  let sek = timi - (min * 60);

  if (sek == 0) {
    sek = '00';
  } else if (sek < 10) {
    sek = `0${sek}`;
  }

  return `${min}:${sek}`;
}

function timiSidan(timi) {
  let s = 'Fyrir ';

  let aldurIsek = ((new Date()) - timi) / 1000;
  const years = Math.floor(aldurIsek / (60 * 60 * 24 * 365));

  aldurIsek -= (years * 60 * 60 * 24 * 365);
  const months = Math.floor(aldurIsek / (60 * 60 * 24 * 30));

  aldurIsek -= (months * 60 * 60 * 24 * 30);
  const weeks = Math.floor(aldurIsek / (60 * 60 * 24 * 7));

  aldurIsek -= (weeks * 60 * 60 * 24 * 7);
  const days = Math.floor(aldurIsek / (60 * 60 * 24));

  aldurIsek -= (days * 60 * 60 * 24);
  const hours = Math.floor(aldurIsek / (60 * 60));

  if (years > 0) {
    if (years === 1) {
      s = `${s}, ${years}, ári síðan`;
    } else {
      s = `${s}, ${years}, árum síðan`;
    }
  } else if (months > 0) {
    if (months === 1) {
      s = `${s} ${months} mánuði síðan`;
    } else {
      s = `${s} ${months} mánuðum síðan`;
    }
  } else if (weeks > 0) {
    if (weeks === 1) {
      s = `${s} ${weeks} viku síðan`;
    } else {
      s = `${s} ${weeks} vikum síðan`;
    }
  } else if (days > 0) {
    if (days === 1) {
      s = `${s} ${days} degi síðan`;
    } else {
      s = `${s} ${days} dögum síðan`;
    }
  } else if (hours > 0) {
    if (hours === 1) {
      s = `${s} ${hours} klukkutíma síðan`;
    } else {
      s = `${s} ${hours} klukkutímum síðan`;
    }
  } else {
    s = 'Myndband ekki birt strax';
  }
  return s;
}

function makeVideoColumn(data, element) {
  // Dálkurinn sem inniheldur allt um myndbandið
  const column = document.createElement('div');
  column.setAttribute('class', 'videolist__col');

  // Myndin
  const poster = document.createElement('div');
  poster.setAttribute('class', 'videolist__poster');
  const mynd = document.createElement('img');
  mynd.setAttribute('src', data.poster);
  poster.appendChild(mynd);

  // Overlay-ið á myndinni
  const overlay = document.createElement('div');
  overlay.setAttribute('class', 'videolist__overlay');
  const over = document.createElement('span');
  over.setAttribute('class', 'videolist__over');
  over.appendChild(document.createTextNode(breytaDuration(data.duration)));
  overlay.appendChild(over);
  poster.appendChild(overlay);

  // Div fyrir textann sem er fyrir neðan myndina
  const texti = document.createElement('div');
  texti.setAttribute('class', 'videolist__content');
  column.appendChild(poster);
  column.appendChild(texti);

  // Textarnir fyrir neðan myndina
  const titill = document.createElement('p');
  titill.setAttribute('class', 'videolist__title');
  const date = document.createElement('p');
  date.setAttribute('class', 'videolist__date-created');
  texti.appendChild(titill);
  texti.appendChild(date);

  titill.appendChild(document.createTextNode(data.title));
  date.appendChild(document.createTextNode(timiSidan(data.created)));

  element.appendChild(column);
}

function makeVideoList(data) {
  for (let i = 0; i < data.categories.length; i += 1) {
    const section = document.createElement('section');
    section.setAttribute('class', 'safn');

    const list = document.createElement('div');
    list.setAttribute('class', 'videolist__row');

    const heading = document.createElement('h1');
    heading.appendChild(document.createTextNode(data.categories[i].title));
    section.appendChild(heading);
    section.appendChild(list);

    for (let j = 0; j < data.categories[i].videos.length; j += 1) {
      // Fá hvaða tölur eru í fylkinu af myndunum
      const mynd = data.categories[i].videos[j];
      makeVideoColumn(data.videos[mynd - 1], list);
    }
    const pagebreak = document.createElement('div');
    pagebreak.setAttribute('class', 'videolist__break');
    section.appendChild(pagebreak);

    main.appendChild(section);
  }
}

function loadMovies() {
  const request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = () => {
    let data;

    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.response);

      //makeVideoColumn(data.videos[1], main);
      makeVideoList(data);
    }
  };

  request.onerror = () => {
    birtaError();
  };
  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  loadMovies();
});
