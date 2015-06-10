// Generated by CoffeeScript 1.9.2
var $, DOC, IMAGE_PATH, STATIC_PATH, WIN, audio, body, currentMusicOrder, getScript, icon, musicList, originMusicList, pageHtml, playOrPause, player, progress;

WIN = window;

DOC = document;

STATIC_PATH = "statics/";

IMAGE_PATH = "images/";

$ = document.getElementById.bind(document);

getScript = function(url, callback) {
  var done, head, script;
  head = DOC.getElementsByTagName('head')[0] || DOC.body;
  script = DOC.createElement('script');
  done = false;
  script.src = url;
  script.onload = script.onreadystatechange = function() {
    if (!done && (!this.readyState || this.readyState !== 'loading')) {
      done = true;
      if (callback) {
        callback.apply(null);
      }
      script.onload = script.onreadystatechange = null;
      return head.removeChild(script);
    }
  };
  return head.appendChild(script);
};

pageHtml = ['<div id="view">', '<div id="canvas">', '<i id="progress"></i>', '<div id="player"></div>', '<img src="' + IMAGE_PATH + 'zSGhlXp4.gif" id="icon" />', '</div>', '</div>'].join('');

currentMusicOrder = 0;

musicList = [
  {
    'cover': IMAGE_PATH + "cover.jpg",
    'url': STATIC_PATH + "xlaq.mp3"
  }
];

originMusicList = [];

body = DOC.getElementsByTagName('body')[0];

body.innerHTML = pageHtml;

progress = $('progress');

player = $('player');

icon = $('icon');

audio = (function() {
  var _audio, bugoo, onEnd, onLoading, onPause, onStart, onTimeupdate, setCover, timer;
  _audio = function() {};
  timer = 0;
  bugoo = null;
  onStart = function() {
    player.className = 'rotate';
    return icon.className = 'show';
  };
  onLoading = function() {};
  onTimeupdate = function() {
    return progress.style.width = this.currentTime / this.duration * 100 + '%';
  };
  onEnd = function() {
    progress.style.width = 0 + 'px';
    player.className = '';
    icon.className = '';
    if (timer === 0) {
      return timer = setTimeout(function() {
        if ('ended' === _audio.status()) {
          _audio.next();
        }
        return timer = 0;
      }, 500);
    }
  };
  onPause = function() {
    progress.style.width = 0 + 'px';
    player.className = '';
    return icon.className = '';
  };
  setCover = function() {
    var cover;
    cover = musicList[currentMusicOrder]['cover'];
    if (cover) {
      return player.setAttribute('style', 'background-image: url(' + cover + ');');
    }
  };
  _audio.play = function(isPaused) {
    if (isPaused) {
      return bugoo.play();
    }
    bugoo = new Bugoo({
      media: musicList[currentMusicOrder]['url'],
      start: onStart,
      loading: onLoading,
      timeupdate: onTimeupdate,
      stop: onEnd,
      pause: onPause
    });
    setCover();
    return bugoo.play();
  };
  _audio.next = function() {
    currentMusicOrder++;
    if (currentMusicOrder >= musicList.length) {
      currentMusicOrder = 0;
    }
    return _audio.play();
  };
  _audio.prev = function() {
    currentMusicOrder--;
    if (currentMusicOrder < 0) {
      currentMusicOrder = musicList.length - 1;
    }
    return _audio.play();
  };
  _audio.pause = function() {
    return bugoo.pause();
  };
  _audio.status = function() {
    return bugoo.status;
  };
  return _audio;
})();

audio.play();

playOrPause = function() {
  var status;
  status = audio.status();
  if (status === 'playing' || status === 'loading') {
    return audio.pause();
  } else {
    return audio.play(true);
  }
};

player.onclick = playOrPause;

DOC.onkeyup = function(e) {
  var keyCode;
  e = e || WIN.event;
  keyCode = e.keyCode;
  if (keyCode === 32) {
    playOrPause();
  }
  if (keyCode === 37) {
    audio.prev();
  }
  if (keyCode === 39) {
    return audio.next();
  }
};
