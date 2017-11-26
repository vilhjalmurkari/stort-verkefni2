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

function breytaDuration(timi) {
  var min = Math.floor(timi / 60);
  var sek = timi - min * 60;

  if (sek === 0) {
    sek = '00';
  } else if (sek < 10) {
    sek = '0' + sek;
  }

  return min + ':' + sek;
}

function timiSidan(timi) {
  var s = 'Fyrir ';

  var aldurIsek = (new Date() - timi) / 1000;
  var years = Math.floor(aldurIsek / (60 * 60 * 24 * 365));

  aldurIsek -= years * 60 * 60 * 24 * 365;
  var months = Math.floor(aldurIsek / (60 * 60 * 24 * 30));

  aldurIsek -= months * 60 * 60 * 24 * 30;
  var weeks = Math.floor(aldurIsek / (60 * 60 * 24 * 7));

  aldurIsek -= weeks * 60 * 60 * 24 * 7;
  var days = Math.floor(aldurIsek / (60 * 60 * 24));

  aldurIsek -= days * 60 * 60 * 24;
  var hours = Math.floor(aldurIsek / (60 * 60));

  if (years > 0) {
    if (years === 1) {
      s = s + ', ' + years + ', \xE1ri s\xED\xF0an';
    } else {
      s = s + ', ' + years + ', \xE1rum s\xED\xF0an';
    }
  } else if (months > 0) {
    if (months === 1) {
      s = s + ' ' + months + ' m\xE1nu\xF0i s\xED\xF0an';
    } else {
      s = s + ' ' + months + ' m\xE1nu\xF0um s\xED\xF0an';
    }
  } else if (weeks > 0) {
    if (weeks === 1) {
      s = s + ' ' + weeks + ' viku s\xED\xF0an';
    } else {
      s = s + ' ' + weeks + ' vikum s\xED\xF0an';
    }
  } else if (days > 0) {
    if (days === 1) {
      s = s + ' ' + days + ' degi s\xED\xF0an';
    } else {
      s = s + ' ' + days + ' d\xF6gum s\xED\xF0an';
    }
  } else if (hours > 0) {
    if (hours === 1) {
      s = s + ' ' + hours + ' klukkut\xEDma s\xED\xF0an';
    } else {
      s = s + ' ' + hours + ' klukkut\xEDmum s\xED\xF0an';
    }
  } else {
    s = 'Myndband ekki birt strax';
  }
  return s;
}

function makeVideoColumn(data, element) {
  // Dálkurinn sem inniheldur allt um myndbandið
  var column = document.createElement('a');
  var url = 'video.html?id=' + data.id;
  column.setAttribute('href', url);
  column.setAttribute('class', 'videolist__col');

  // Myndin
  var poster = document.createElement('div');
  poster.setAttribute('class', 'videolist__poster');
  var mynd = document.createElement('img');
  mynd.setAttribute('class', 'image');
  mynd.setAttribute('src', data.poster);
  poster.appendChild(mynd);

  // Overlay-ið á myndinni
  var overlay = document.createElement('div');
  overlay.setAttribute('class', 'videolist__overlay');
  var over = document.createElement('span');
  over.setAttribute('class', 'videolist__over');
  over.appendChild(document.createTextNode(breytaDuration(data.duration)));
  overlay.appendChild(over);
  poster.appendChild(overlay);

  // Div fyrir textann sem er fyrir neðan myndina
  var texti = document.createElement('div');
  texti.setAttribute('class', 'videolist__content');
  column.appendChild(poster);
  column.appendChild(texti);

  // Textarnir fyrir neðan myndina
  var titill = document.createElement('p');
  titill.setAttribute('class', 'videolist__title');
  var date = document.createElement('p');
  date.setAttribute('class', 'videolist__date-created');
  texti.appendChild(titill);
  texti.appendChild(date);

  titill.appendChild(document.createTextNode(data.title));
  date.appendChild(document.createTextNode(timiSidan(data.created)));

  element.appendChild(column);
}

function makeVideoList(data) {
  for (var i = 0; i < data.categories.length; i += 1) {
    var section = document.createElement('section');
    section.setAttribute('class', 'safn');

    var list = document.createElement('div');
    list.setAttribute('class', 'videolist__row');

    var heading = document.createElement('h1');
    heading.appendChild(document.createTextNode(data.categories[i].title));
    section.appendChild(heading);
    section.appendChild(list);

    for (var j = 0; j < data.categories[i].videos.length; j += 1) {
      // Fá hvaða tölur eru í fylkinu af myndunum
      var mynd = data.categories[i].videos[j];
      makeVideoColumn(data.videos[mynd - 1], list);
    }
    var pagebreak = document.createElement('div');
    pagebreak.setAttribute('class', 'videolist__break');
    section.appendChild(pagebreak);

    main.appendChild(section);
  }
}

function loadMovies() {
  var request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = function () {
    var data = void 0;

    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.response);

      makeVideoList(data);
    }
  };

  request.onerror = function () {
    birtaError();
  };
  request.send();
}

document.addEventListener('DOMContentLoaded', function () {
  loadMovies();
});

//# sourceMappingURL=script-compiled.js.map