(function(){'use strict';var g=function(a,c){function d(a){this.media=a.media;this.currentTime=0;this.status="ready";this.f=a.start||e;this.c=a.b||e;this.h=a.g||e;this.a=a.end||a.stop||e;this.d=a.pause||e;l?l.end():l=this;return this}function e(){}var b=c.createElement("audio"),l=null;if(!b.canPlayType||!b.canPlayType("audio/mpeg"))return console.log("oh, I cant play in so low browser!");d.prototype.play=function(){var a=this;"paused"!=a.status&&(b.src=a.media);b.addEventListener("play",function(){a.f()});b.addEventListener("playing",
function(){a.status="playing"});b.addEventListener("waiting",function(){a.status="loading";a.c()});b.addEventListener("ended",function(){a.end();a.status="ended"});b.addEventListener("timeupdate",function(){a.currentTime=b.currentTime;a.duration=b.duration;a.h()});b.play();return a};d.prototype.end=function(){b.src=b.currentSrc;this.status="ended";this.a();return this};d.prototype.pause=function(){b.pause();this.status="paused";this.d();return this};return d}(window,document),h,k,m,n,p,q,r,s,t,v,
w,y;m=window;k=document;h=function(a){return document.getElementById(a)};p=0;r=[{cover:"images/cover.jpg",url:"statics/xlaq.mp3"}];s=[];k.getElementsByTagName("body")[0].innerHTML='<div id="view"><div id="canvas"><i id="progress"></i><div id="player"></div><img src="images/zSGhlXp4.gif" id="icon" /></div></div>';w=h("progress");v=h("player");q=h("icon");
n=function(){var a,c,d,e,b,l,x,u,f;f=function(){};u=0;a=null;b=function(){v.className="rotate";return q.className="show"};d=function(){};l=function(){return w.style.width=100*(this.currentTime/this.duration)+"%"};c=function(){w.style.width="0px";v.className="";q.className="";if(0===u)return u=setTimeout(function(){"ended"===f.status()&&f.next();return u=0},500)};e=function(){w.style.width="0px";v.className="";return q.className=""};x=function(){var a;(a=r[p].cover)&&v.setAttribute("style","background-image: url("+
a+");")};f.play=function(f){if(f)return a.play();a=new g({media:r[p].url,start:b,b:d,g:l,stop:c,pause:e});x();return a.play()};f.next=function(){p++;p>=r.length&&(p=0);return f.play()};f.e=function(){p--;0>p&&(p=r.length-1);f.play()};f.pause=function(){return a.pause()};f.status=function(){return a.status};return f}();n.play();t=function(){var a;a=n.status();return"playing"===a||"loading"===a?n.pause():n.play(!0)};
(function(a,c){var d,e,b;e=k.getElementsByTagName("head")[0]||k.body;b=k.createElement("script");d=!1;b.src=a;b.onload=b.onreadystatechange=function(){if(!d&&(!this.readyState||"loading"!==this.readyState))return d=!0,c&&c.apply(null),b.onload=b.onreadystatechange=null,e.removeChild(b)};return e.appendChild(b)})("statics/playlist.js",function(){var a,c,d,e;a=m.playList;d=0;for(e=a.length;d<e;d++)c=a[d],r.push({i:"",url:"statics/"+c});s=r.concat();return s.shift()});v.onclick=t;
k.onkeyup=function(a){var c;a=a||m.event;c=a.keyCode;32===c&&t();37===c&&n.e();39===c&&n.next();a=s.concat();65===c&&(r=a);68===c&&(r=a.reverse());if(83===c)return r=a.sort(function(){return Math.random()-0.5})};null!=(y=m.console)&&"function"===typeof y.log&&y.log("\u968f\u673as, \u987a\u5e8fa, \u5012\u5e8fd");})()
