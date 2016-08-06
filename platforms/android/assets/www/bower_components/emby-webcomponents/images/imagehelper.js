define(["visibleinviewport","imageFetcher","layoutManager","events","browser"],function(e,t,n,r,a){function i(){y={innerHeight:window.innerHeight,innerWidth:window.innerWidth}}function o(){var e=screen.availWidth,t=screen.availHeight;n.mobile&&(e*=2,t*=2),w=e,b=t,i()}function u(t){return e(t,!0,w,b,y)}function s(e,r,a){r||(r=e.getAttribute("data-src")),r&&(M&&!n.tv&&a!==!1?t.loadImage(e,r).then(c):t.loadImage(e,r),e.removeAttribute("data-src"))}function c(e){var t=n.tv?160:300,r=[{opacity:"0",offset:0},{opacity:"1",offset:1}],a={duration:t,iterations:1};e.animate(r,a)}function v(e){for(var t=0,n=e.length;n>t;t++)e[t]=!0}function f(e,t,n,r){var a=r;L||(a=r.capture),e.addEventListener(t,n,a)}function l(e,t,n,r){var a=r;L||(a=r.capture),e.removeEventListener(t,n,a)}function d(e){for(var t=0,n={},r=new IntersectionObserver(function(e){for(var n=0,a=e.length;a>n;n++){var i=e[n],o=i.target;r.unobserve(o),s(o),t++}},n),a=0,i=e.length;i>a;a++)r.observe(e[a])}function h(e,t){function n(t){for(var n=!1,o=!1,c=0,v=e.length;v>c;c++){if(i[t])return;if(!a[c]){var f=e[c];!o&&u(f)?(n=!0,a[c]=!0,s(f)):n&&(o=!0)}}e.length||(l(document,"focus",r,{capture:!0,passive:!0}),l(document,"scroll",r,{capture:!0,passive:!0}),l(document,E,r,{capture:!0,passive:!0}),l(window,"resize",r,{capture:!0,passive:!0}))}function r(){v(i);var e=i.length;i.length++,setTimeout(function(){n(e)},1)}if(e.length){if(I)return void d(e,t);var a=[],i=[];f(document,"focus",r,{capture:!0,passive:!0}),f(document,"scroll",r,{capture:!0,passive:!0}),f(document,E,r,{capture:!0,passive:!0}),f(window,"resize",r,{capture:!0,passive:!0}),r()}}function g(e){h(e.getElementsByClassName("lazy"),e)}function m(e){for(var t=[],n=0,r=e.length;r>n;n++){var a=e[n].PrimaryImageAspectRatio||0;a&&(t[t.length]=a)}if(!t.length)return null;t.sort(function(e,t){return e-t});var i,o=Math.floor(t.length/2);i=t.length%2?t[o]:(t[o-1]+t[o])/2;var u=2/3;if(Math.abs(u-i)<=.15)return u;var s=16/9;if(Math.abs(s-i)<=.2)return s;if(Math.abs(1-i)<=.15)return 1;var c=4/3;return Math.abs(c-i)<=.15?c:i}function p(e){for(var t=0,n=e.length;n>t;t++){var r=e[0];s(r)}}var w,b,y,I=function(){if(window.IntersectionObserver){if(a.chrome){var e=parseInt(a.version.split(".")[0]);return e>=51}return!0}return!1}();I||(window.addEventListener("orientationchange",o),window.addEventListener("resize",o),r.on(n,"modechange",o),o());var E=document.implementation.hasFeature("Event.wheel","3.0")?"wheel":"mousewheel",z={},M=a.animate&&!a.slow,L=!1;try{var A=Object.defineProperty({},"capture",{get:function(){L=!0}});window.addEventListener("test",null,A)}catch(H){}return z.fillImages=p,z.lazyImage=s,z.lazyChildren=g,z.getPrimaryImageAspectRatio=m,z});