var __wpo = {"assets":{"main":["/static/css/app.9aadaa0f.css","/static/js/app.eee4c5be.js","/static/css/chunk-0d688173.e41ce5f7.css","/static/js/chunk-0d688173.360de261.js","/static/css/chunk-3e9fd838.672a767c.css","/static/js/chunk-3e9fd838.6a930b4d.js","/static/css/chunk-42494b2c.30c408b7.css","/static/js/chunk-42494b2c.054fa3c6.js","/static/css/chunk-e4dda812.a4904426.css","/static/js/chunk-e4dda812.57c1930f.js","/static/css/chunk-fc586510.da41c896.css","/static/js/chunk-fc586510.3e052457.js","/static/js/chunk-vendors.2bf9c052.js","/index.html","/favicon.ico","/manifest.json","/lib/slider/slider.js","/lib/weui/weui.min.js","/lib/weui/weui.min.css"],"additional":[],"optional":[]},"externals":[],"hashesMap":{"83baf564cd2bd0ec8766033403e1aa9d9dc26f81":"/static/css/app.9aadaa0f.css","fe78e7efc8cbe05ea42d8a2e34bc60e355d5f99a":"/static/js/app.eee4c5be.js","fb5e42a16ddf765219cc069320b59daf23c36cc1":"/static/css/chunk-0d688173.e41ce5f7.css","1498e9e97182932e3e142c4f4b57f877d1ff5bd5":"/static/js/chunk-0d688173.360de261.js","251099fd9e78eac9596cd9d55e59ddab1e0bee90":"/static/css/chunk-3e9fd838.672a767c.css","b69d4418b35fee8d4ff6c26e8da2f2ba51373d6b":"/static/js/chunk-3e9fd838.6a930b4d.js","7b49ee69856d4d3064679ed8cf0b71554df05c86":"/static/css/chunk-42494b2c.30c408b7.css","3877773c16a70cfe30059b9297aef4452e111a52":"/static/js/chunk-42494b2c.054fa3c6.js","b4dd04317099423c51e30bf560ccba9c5273bdb0":"/static/css/chunk-e4dda812.a4904426.css","c5f51833c2bef4d2594f254ef9dcd5f8312922fc":"/static/js/chunk-e4dda812.57c1930f.js","793af4cfb2b728b1091a54b8aade4c15866b6305":"/static/css/chunk-fc586510.da41c896.css","844f420b450a127a48295583f5b8bc9437b626c7":"/static/js/chunk-fc586510.3e052457.js","e9ee1aa125b52fa85f02efe952a9b2dfc21ea414":"/static/js/chunk-vendors.2bf9c052.js","c34387014a9d16ea2b3db897c57b0fbf5374a251":"/index.html","10a2b5c30a83107060f7cea583f199aeaa328edc":"/favicon.ico","dd7c5ed0854b86e95633fbd740a8f969f9607fd1":"/manifest.json","2147e7b6606cc655c026fdeaaed66bfd7a287146":"/lib/slider/slider.js","9d5157bf10eb7e2a24593ec7168ae95289299899":"/lib/weui/weui.min.js","e648a6301ba5f5fbafcfb580923e90adb04e89f9":"/lib/weui/weui.min.css"},"strategy":"all","responseStrategy":"cache-first","version":"2019-11-13 10:20:51","name":"webpack-offline","pluginVersion":"5.0.7","relativePaths":false};

(function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s="3068")})({3068:function(e,n,t){"use strict";if(function(){var e=ExtendableEvent.prototype.waitUntil,n=FetchEvent.prototype.respondWith,t=new WeakMap;ExtendableEvent.prototype.waitUntil=function(n){var r=this,o=t.get(r);if(!o)return o=[Promise.resolve(n)],t.set(r,o),e.call(r,Promise.resolve().then((function e(){var n=o.length;return Promise.all(o.map((function(e){return e["catch"]((function(){}))}))).then((function(){return o.length!=n?e():(t["delete"](r),Promise.all(o))}))})));o.push(Promise.resolve(n))},FetchEvent.prototype.respondWith=function(e){return this.waitUntil(e),n.call(this,e)}}(),"undefined"===typeof r)var r=!1;function o(e,n){var t=n.cacheMaps,o=n.navigationPreload,s=e.strategy,l=e.responseStrategy,h=e.assets,d=e.hashesMap,p=e.externals,v=e.prefetchRequest||{credentials:"same-origin",mode:"cors"},m=e.name,g=e.version,w=m+":"+g,y=m+"$preload",b="__offline_webpack__data";C();var P=[].concat(h.main,h.additional,h.optional);function U(){if(!h.additional.length)return Promise.resolve();r&&console.log("[SW]:","Caching additional");var e=void 0;return e="changed"===s?S("additional"):R("additional"),e["catch"]((function(e){console.error("[SW]:","Cache section `additional` failed to load")}))}function R(n){var t=h[n];return caches.open(w).then((function(r){return A(r,t,{bust:e.version,request:v,failAll:"main"===n})})).then((function(){f("Cached assets: "+n,t)}))["catch"]((function(e){throw console.error(e),e}))}function S(n){return O().then((function(t){if(!t)return R(n);var r=t[0],o=t[1],i=t[2],a=i.hashmap,c=i.version;if(!i.hashmap||c===e.version)return R(n);var s=Object.keys(a).map((function(e){return a[e]})),u=o.map((function(e){var n=new URL(e.url);return n.search="",n.hash="",n.toString()})),l=h[n],p=[],m=l.filter((function(e){return-1===u.indexOf(e)||-1===s.indexOf(e)}));Object.keys(d).forEach((function(e){var n=d[e];if(-1!==l.indexOf(n)&&-1===m.indexOf(n)&&-1===p.indexOf(n)){var t=a[e];t&&-1!==u.indexOf(t)?p.push([t,n]):m.push(n)}})),f("Changed assets: "+n,m),f("Moved assets: "+n,p);var g=Promise.all(p.map((function(e){return r.match(e[0]).then((function(n){return[e[1],n]}))})));return caches.open(w).then((function(t){var r=g.then((function(e){return Promise.all(e.map((function(e){return t.put(e[0],e[1])})))}));return Promise.all([r,A(t,m,{bust:e.version,request:v,failAll:"main"===n,deleteFirst:"main"!==n})])}))}))}function x(){return caches.keys().then((function(e){var n=e.map((function(e){if(0===e.indexOf(m)&&0!==e.indexOf(w))return console.log("[SW]:","Delete cache:",e),caches["delete"](e)}));return Promise.all(n)}))}function O(){return caches.keys().then((function(e){var n=e.length,t=void 0;while(n--)if(t=e[n],0===t.indexOf(m))break;if(t){var r=void 0;return caches.open(t).then((function(e){return r=e,e.match(new URL(b,location).toString())})).then((function(e){if(e)return Promise.all([r,r.keys(),e.json()])}))}}))}function q(){return caches.open(w).then((function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:d}));return n.put(new URL(b,location).toString(),t)}))}function W(e,n,t){return L(e),i(t,w).then((function(o){if(o)return r&&console.log("[SW]:","URL ["+t+"]("+n+") from cache"),o;var i=fetch(e.request).then((function(o){return o.ok?(r&&console.log("[SW]:","URL ["+n+"] from network"),t===n&&function(){var t=o.clone(),r=caches.open(w).then((function(e){return e.put(n,t)})).then((function(){console.log("[SW]:","Cache asset: "+n)}));e.waitUntil(r)}(),o):(r&&console.log("[SW]:","URL ["+n+"] wrong response: ["+o.status+"] "+o.type),o)}));return i}))}function k(e,n,t){return F(e).then((function(e){if(e.ok)return r&&console.log("[SW]:","URL ["+n+"] from network"),e;throw e}))["catch"]((function(e){return r&&console.log("[SW]:","URL ["+n+"] from cache if possible"),i(t,w).then((function(n){if(n)return n;if(e instanceof Response)return e;throw e}))}))}function L(e){if(o&&"function"===typeof o.map&&e.preloadResponse&&"navigate"===e.request.mode){var n=o.map(new URL(e.request.url),e.request);n&&j(n,e)}}self.addEventListener("install",(function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===s?S("main"):R("main"),e.waitUntil(n)})),self.addEventListener("activate",(function(e){console.log("[SW]:","Activate event");var n=U();n=n.then(q),n=n.then(x),n=n.then((function(){if(self.clients&&self.clients.claim)return self.clients.claim()})),o&&self.registration.navigationPreload&&(n=Promise.all([n,self.registration.navigationPreload.enable()])),e.waitUntil(n)})),self.addEventListener("fetch",(function(e){if("GET"===e.request.method&&("only-if-cached"!==e.request.cache||"same-origin"===e.request.mode)){var n=new URL(e.request.url);n.hash="";var t=n.toString();-1===p.indexOf(t)&&(n.search="",t=n.toString());var r=-1!==P.indexOf(t),i=t;if(!r){var a=T(e.request);a&&(i=a,r=!0)}if(r){var c=void 0;c="network-first"===l?k(e,t,i):W(e,t,i),e.respondWith(c)}else{if("navigate"===e.request.mode&&!0===o)return void e.respondWith(F(e));if(o){var s=M(e);if(s)return void e.respondWith(s)}}}})),self.addEventListener("message",(function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting();break}}));var E=new Map;function j(e,n){var t=new URL(e,location),r=n.preloadResponse;E.set(r,{url:t,response:r});var o=function(){return E.has(r)},i=r.then((function(e){if(e&&o()){var n=e.clone();return caches.open(y).then((function(e){if(o())return e.put(t,n).then((function(){if(!o())return caches.open(y).then((function(e){return e["delete"](t)}))}))}))}}));n.waitUntil(i)}function _(e){if(E){var n=void 0,t=void 0;return E.forEach((function(r,o){r.url.href===e.href&&(n=r.response,t=o)})),n?(E["delete"](t),n):void 0}}function M(e){var n=new URL(e.request.url);if(self.registration.navigationPreload&&o&&o.test&&o.test(n,e.request)){var t=_(n),r=e.request;return t?(e.waitUntil(caches.open(y).then((function(e){return e["delete"](r)}))),t):i(r,y).then((function(n){return n&&e.waitUntil(caches.open(y).then((function(e){return e["delete"](r)}))),n||fetch(e.request)}))}}function C(){Object.keys(h).forEach((function(e){h[e]=h[e].map((function(e){var n=new URL(e,location);return n.hash="",-1===p.indexOf(e)&&(n.search=""),n.toString()}))})),d=Object.keys(d).reduce((function(e,n){var t=new URL(d[n],location);return t.search="",t.hash="",e[n]=t.toString(),e}),{}),p=p.map((function(e){var n=new URL(e,location);return n.hash="",n.toString()}))}function A(e,n,t){n=n.slice();var r=t.bust,o=!1!==t.failAll,i=!0===t.deleteFirst,c=t.request||{credentials:"omit",mode:"cors"},s=Promise.resolve();return i&&(s=Promise.all(n.map((function(n){return e["delete"](n)["catch"]((function(){}))})))),Promise.all(n.map((function(e){return r&&(e=a(e,r)),fetch(e,c).then(u).then((function(e){return e.ok?{response:e}:{error:!0}}),(function(){return{error:!0}}))}))).then((function(t){return o&&t.some((function(e){return e.error}))?Promise.reject(new Error("Wrong response status")):(o||(t=t.filter((function(e,t){return!e.error||(n.splice(t,1),!1)}))),s.then((function(){var r=t.map((function(t,r){var o=t.response;return e.put(n[r],o)}));return Promise.all(r)})))}))}function T(e){var n=e.url,r=new URL(n),o=void 0;o=c(e)?"navigate":r.origin===location.origin?"same-origin":"cross-origin";for(var i=0;i<t.length;i++){var a=t[i];if(a&&(!a.requestTypes||-1!==a.requestTypes.indexOf(o))){var s=void 0;if(s="function"===typeof a.match?a.match(r,e):n.replace(a.match,a.to),s&&s!==n)return s}}}function F(e){return e.preloadResponse&&!0===o?e.preloadResponse.then((function(n){return n||fetch(e.request)})):fetch(e.request)}}function i(e,n){return caches.match(e,{cacheName:n}).then((function(t){return s(t)?t:u(t).then((function(t){return caches.open(n).then((function(n){return n.put(e,t)})).then((function(){return t}))}))}))["catch"]((function(){}))}function a(e,n){var t=-1!==e.indexOf("?");return e+(t?"&":"?")+"__uncache="+encodeURIComponent(n)}function c(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||-1!==(e.headers.get("Accept")||"").indexOf("text/html")}function s(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function u(e){if(s(e))return Promise.resolve(e);var n="body"in e?Promise.resolve(e.body):e.blob();return n.then((function(n){return new Response(n,{headers:e.headers,status:e.status})}))}function f(e,n){console.groupCollapsed("[SW]:",e),n.forEach((function(e){console.log("Asset:",e)})),console.groupEnd()}o(__wpo,{loaders:{},cacheMaps:[],navigationPreload:!1}),e.exports=t("7a8c")},"7a8c":function(e,n){self.addEventListener("push",(function(e){var n=e.data;e.data?(n=n.json(),e.waitUntil(self.ServiceWorkerRegistration.showNotification(n.title,{body:n.body||"",icon:n.img||"https://app.nihaoshijie.com.cn/img/icons/apple-touch-icon-180x180-1-touming.png",actions:[{action:"go-in",title:"进入程序"}]}))):console.log("push没有任何数据")})),self.addEventListener("notificationclick",(function(e){var n=e.action;e.waitUntil(self.ClientRectList.matchAll().then((function(e){return e.length>0?e[0].focus():"go-in"===n?self.clients.openWindow("https://app.nihaoshijie.com.cn/index.html#/mypage"):void 0}))),e.notification.close()}))}});