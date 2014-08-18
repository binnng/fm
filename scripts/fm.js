// Generated by CoffeeScript 1.7.1
var $, DOC, IMAGE_PATH, STATIC_PATH, WIN, audio, body, currentMusicOrder, getScript, icon, musicList, originMusicList, pageHtml, playOrPause, player, progress, _ref;

WIN = window;

DOC = document;

STATIC_PATH = "statics/";

IMAGE_PATH = "images/";

$ = function(id) {
  return document.getElementById(id);
};

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
    'cover': "" + IMAGE_PATH + "cover.jpg",
    'url': "" + STATIC_PATH + "xlaq.mp3"
  }
];

originMusicList = [];

body = DOC.getElementsByTagName('body')[0];

body.innerHTML = pageHtml;

progress = $('progress');

player = $('player');

icon = $('icon');

audio = (function() {
  var bugoo, onEnd, onLoading, onPause, onStart, onTimeupdate, setCover, timer, _audio;
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

getScript("" + STATIC_PATH + "playlist.js", function() {
  var playList, url, _i, _len;
  playList = WIN['playList'];
  for (_i = 0, _len = playList.length; _i < _len; _i++) {
    url = playList[_i];
    musicList.push({
      cover: "",
      url: STATIC_PATH + url
    });
  }
  originMusicList = musicList.concat();
  return originMusicList.shift();
});

player.onclick = playOrPause;

DOC.onkeyup = function(e) {
  var copy, keyCode;
  e = e || WIN.event;
  keyCode = e.keyCode;
  if (keyCode === 32) {
    playOrPause();
  }
  if (keyCode === 37) {
    audio.prev();
  }
  if (keyCode === 39) {
    audio.next();
  }
  copy = originMusicList.concat();
  if (keyCode === 65) {
    musicList = copy;
  }
  if (keyCode === 68) {
    musicList = copy.reverse();
  }
  if (keyCode === 83) {
    return musicList = copy.sort(function(a, b) {
      return Math.random() - 0.5;
    });
  }
};

if ((_ref = WIN["console"]) != null) {
  if (typeof _ref.log === "function") {
    _ref.log("随机s, 顺序a, 倒序d");
  }
}
