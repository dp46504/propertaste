// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("./menu.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var _default = function _default(herbata) {
  var menuObject = document.querySelector('#menu');
  var articleObject = document.querySelector('article');
  var children = menuObject.children;
  var herbaty = ['zielona', 'czarna', 'czerwona', 'biala'];
  var position = herbaty.indexOf(herbata); //Usuwanie pozostałych kulek

  for (var i = children.length - 1; i >= 0; i--) {
    if (i == position) {} else {
      menuObject.removeChild(children[i]);
    }
  } //Lista dzieci z jednym pożądanym elementem


  children = menuObject.children;

  var wyswietlanieWartosci = function wyswietlanieWartosci(czasWMs, temperaturaInfo) {
    //Stworzenie elementow
    var temperatura = document.createElement('div');
    var ciekawostki = document.createElement('div');
    var powrot = document.createElement('div');
    var strzalka = document.createElement('img'); //Konwersja timera z ms do s

    var czasWs = czasWMs / 1000;
    var sekundy;
    var minuty; //Dodanie pliku dzwiekowego na koniec odliczania

    var ready_sound = new Audio('../../design/ready_sound.wav'); //Funkcja zapetlajaca dzwiek

    var sound_repeat = function sound_repeat() {
      ready_sound.currentTime = 0;
      ready_sound.play();
    }; //Zapetlanie dzwieku


    ready_sound.addEventListener('ended', sound_repeat); //Odliczanie timera w kółku

    var odliczanie = function odliczanie() {
      var interwal = setInterval(function () {
        //konwersja timera z ms do s
        sekundy = czasWs % 60;
        minuty = Math.floor(czasWs / 60); //edytowanie timera

        if (sekundy == 0) {
          children[0].innerHTML = minuty + ':00';
        } else if (sekundy < 10) {
          children[0].innerHTML = minuty + ':0' + sekundy;
        } else {
          children[0].innerHTML = minuty + ':' + sekundy;
        }

        czasWs -= 1;

        if (czasWs == -1) {
          //Koniec odliczania
          clearInterval(interwal);
          children[0].innerHTML = "ready";
          children[0].classList.add('animacjaKulkaFinished');
          ready_sound.play();
        }
      }, 1000);
    }; //Edytowanie temperatura


    temperatura.innerHTML = temperaturaInfo; //Edytowanie ciekawostek

    var xhr = new XMLHttpRequest();
    var url = "https://cors-anywhere.herokuapp.com/https://propertasteapi.herokuapp.com/tips/".concat(herbata);
    xhr.open('get', url);
    var interval;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var resObj = JSON.parse(xhr.responseText);
        console.log(resObj); //Logika wyswietlania roznych ciekawostek

        document.querySelector('#ciekawostkiBox').classList += ' animacjaPojawianie';
        document.querySelector('#ciekawostkiBox').innerHTML = resObj['ciekawostka1'];
        setTimeout(function () {
          document.querySelector('#ciekawostkiBox').classList -= ' animacjaPojawianie';
        }, 600);
        var _i = 2;
        interval = setInterval(function () {
          document.querySelector('#ciekawostkiBox').classList += ' animacjaPojawianie';
          setTimeout(function () {
            document.querySelector('#ciekawostkiBox').classList -= ' animacjaPojawianie';
          }, 600);
          document.querySelector('#ciekawostkiBox').innerHTML = resObj["ciekawostka".concat(_i)];
          _i == 3 ? _i = 1 : _i++;
        }, 5000);
      }
    };

    xhr.send(); //Edytowanie powrotu

    strzalka.src = '../../design/arrow_left.svg'; //Obsluzenie dzialania strzalki (Powrot do Menu)

    powrot.addEventListener('click', function backToMenu() {
      clearInterval(interval); //Dodanie elementu kulki o kolorze tla oraz dodanie jej animacji

      var kulkaPowrot = document.createElement('div');
      kulkaPowrot.classList.add('kulka');
      kulkaPowrot.classList.add('kulkaPowrot');
      kulkaPowrot.classList.add('animacjaKulkaPowrot'); //Załączanie kulki do article

      articleObject.appendChild(kulkaPowrot); //Usuwanie wszystkiego z Art

      setTimeout(function () {
        articleObject.removeChild(powrot);
        articleObject.removeChild(menuObject);
        articleObject.removeChild(temperatura);
        (0, _menu.default)();
        setTimeout(function () {
          articleObject.removeChild(kulkaPowrot);
        }, 400);
      }, 400); //Usuwanie listenera pliku dzwiekowego 

      ready_sound.removeEventListener('ended', sound_repeat);
      powrot.removeEventListener('click', backToMenu);
    }); //Dodanie id

    strzalka.id = 'strzalka';
    temperatura.id = 'temperaturaBox';
    ciekawostki.id = 'ciekawostkiBox';
    powrot.id = 'powrotStrzalka'; //Obsłużenie startu timera

    children[0].addEventListener('click', function handler() {
      odliczanie(); //Dodanie efektu klikniecia przycisku na kulke przy starcie timera oraz usuniecie tej animacji po jej wykonaniu

      children[0].classList.add('animacjaKulkaStart');
      setTimeout(function () {
        children[0].classList.remove('animacjaKulkaStart');
      }, 600);
      children[0].removeEventListener('click', handler);
    }); //Dodanie napisu start

    setTimeout(function () {
      //Nadanie stanu z ostatniej klatki animacji kulkafullscreen przed jej usunieciem
      children[0].style.transform = 'scale(1.75)'; //Usuniecie animacji kulkaFullScreen

      children[0].classList.remove('animacjaKulkaFullScreen'); //Dodanie animacji pojawiania sie tekstu start

      children[0].classList.add('animacjaPojawienieTekstu'); //Usuniecie animacji pojawiania sie tekstu

      setTimeout(function () {
        children[0].classList.remove('animacjaPojawienieTekstu');
      }, 800);
      children[0].innerHTML = 'start';
    }, 400); //dodanie elementow do article

    powrot.insertAdjacentElement('afterbegin', strzalka);
    articleObject.insertAdjacentElement('afterbegin', powrot);
    menuObject.insertAdjacentElement('beforeend', ciekawostki);
    articleObject.insertAdjacentElement('beforeend', temperatura);
  };

  switch (herbata) {
    case 'zielona':
      wyswietlanieWartosci(180000, '80°C-85°C');
      break;

    case 'czarna':
      wyswietlanieWartosci(90000, '90°C-100°C');
      break;

    case 'czerwona':
      wyswietlanieWartosci(90000, '90°C-100°C');
      break;

    case 'biala':
      wyswietlanieWartosci(330000, '80°C-85°C');
      break;
  }
};

exports.default = _default;
},{"./menu.js":"src/js/menu.js"}],"src/js/menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _timer = _interopRequireDefault(require("./timer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
//Funkcja tworząca menu herbat
var _default = function _default() {
  //inicjacja elementow
  var menu = document.createElement("div");
  var zielona = document.createElement("div");
  var czarna = document.createElement("div");
  var czerwona = document.createElement("div");
  var biala = document.createElement("div");
  var herbaty = new Map([[zielona, 'zielona'], [czarna, 'czarna'], [czerwona, 'czerwona'], [biala, 'biala']]); //nadawanie ksztaltu kulki

  herbaty.forEach(function (value, key) {
    key.classList.add('kulka');
  }); //dodawanie poszczegolnych klas kulek

  herbaty.forEach(function (value, key) {
    key.classList.add(value);
  }); //dodanie animacji FullScreen do kazdej kulki na kliknieciu

  herbaty.forEach(function (value, key) {
    key.addEventListener('click', function nasluchiwacz() {
      key.classList.add('animacjaKulkaFullScreen'); //Wyswietlanie ekranu timera
      //Tieout, zeby inne elementy zniknely dopiero kiedy kulka je zakryje

      setTimeout(function () {
        (0, _timer.default)(value);
      }, 400); //Usuwanie eventlistenera

      key.removeEventListener('click', nasluchiwacz);
    });
  });
  menu.classList.add('animacjaPojawianie');
  menu.id = "menu"; //Dodawanie menu do article

  document.querySelector('article').insertAdjacentElement('beforeend', menu); //Dodawanie kulek do menu

  herbaty.forEach(function (value, key) {
    document.querySelector('#menu').insertAdjacentElement('beforeend', key);
  });
};

exports.default = _default;
},{"./timer.js":"src/js/timer.js"}],"src/js/index.js":[function(require,module,exports) {
"use strict";

var _menu = _interopRequireDefault(require("./menu.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
//Zeby na telefonie pasek adresu nie zmuszal aplikacji do bycia scrollable
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); //Jesli ktos wejdzie na komputerze to strona powie mu
//zeby wszedl na telefonie   \/

if (screen.width < 800) {
  //Znikanie ekranu witającego
  window.addEventListener('load', function () {
    var logo = document.getElementById('logoSvg');
    var name = document.getElementById('name');
    logo.classList.add('animacjaZnikanie');
    name.classList.add('animacjaZnikanie');
    setTimeout(function () {
      //Usuwanie logo i nazwy
      document.querySelector('article').removeChild(name);
      document.querySelector('article').removeChild(logo); //Dodawanie menu herbat

      (0, _menu.default)();
    }, 1500);
  });
} else {
  var articleElement = document.querySelector('article');
  var sorryBox = document.createElement('div');
  sorryBox.innerHTML = "<p>Who is walking with his computer around kitchen nowadays? Switch to mobile!</p>";
  sorryBox.classList.add('sorryBox');
  articleElement.insertAdjacentElement('beforeend', sorryBox);
}
},{"./menu.js":"src/js/menu.js"}],"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40179" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map