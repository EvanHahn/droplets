/*! kimbo v1.0.4 | http://kimbojs.com | https://github.com/dciccale/kimbo.js/blob/master/LICENSE.txt */
(function(e,t){"use strict";var n={},i={push:Array.prototype.push,slice:Array.prototype.slice,document:t,rootContext:t,kimbo:function(e){return new o(e)}},o=function(e,n){var r;return this instanceof o?e?"string"==typeof e?(r=/^#([\w\-]+)$/.exec(e),r&&r[1]?(r=t.getElementById(r[1]),r&&(this[0]=r,this.length=1),this):(n=n?i.kimbo(n):i.rootContext,n.find(e))):e.nodeType?(this[0]=e,this.length=1,this):o.isFunction(e)?i.rootContext.ready(e):o.makeArray(e,this):this:new o(e,n)};o.require=function(e){return n[e]},o.define=function(e,t){n[e]=t(i)},o.prototype=o.fn={length:0,ready:function(e){var n;return/t/.test(t.readyState)?e.call(t):(n=function(){t.removeEventListener("DOMContentLoaded",n,!1),e.call(t)},t.addEventListener("DOMContentLoaded",n,!1)),i.rootContext},get:function(e){return this.length?arguments.length?0>e?this[this.length+e]:this[e]:i.slice.call(this):void 0},splice:Array.prototype.splice},o.forEach=function(e,t){var n,i=e.length,o=void 0===i||"function"==typeof e;if(o){for(n in e)if(e.hasOwnProperty(n)&&t.call(e[n],n,e[n],e)===!1)break}else for(n=0;i>n&&t.call(e[n],e[n],n,e)!==!1;n++);return e},o.extend=o.fn.extend=function(){var e=arguments,t=e[0]||{},n=t===!0,r=1;return n?(t=e[1]||{},r=2):1===e.length&&(t=this,r=0),e=i.slice.call(e,r),o.forEach(e,function(e){o.forEach(e,function(e,i){var r;n&&(o.isObject(i)||o.isArray(i))?(r=t[e],t[e]=o.extend(n,r,i)):void 0!==i&&(t[e]=i)})}),t},o.ref="kimbo"+("1"+Math.random()).replace(/\D/g,""),"function"==typeof e.define&&e.define.amd&&e.define("kimbo",[],function(){return o}),e.Kimbo=e.$=o})(window,window.document),Kimbo.define("query",function(e){"use strict";var t=/^#([\w\-]+)$/,n=/^\.([\w\-]+)$/,i=/^[\w\-]+$/,o=/^\[name=["']?([\w\-]+)["']?\]$/,r=function(r,a){var s,c=[];return c=r===e.document&&(s=t.exec(a))?r.getElementById(s[1]):(s=n.exec(a))?r.getElementsByClassName(s[1]):i.test(a)?r.getElementsByTagName(a):(s=o.exec(a))?r.getElementsByName(s[1]):r.querySelectorAll(a),e.slice.call(c)},a=function(e,t){return e===window&&t&&(t===window||t.nodeType)||e&&e.nodeType&&t&&t.nodeType?e.contains?e.contains(t):!0:!1};return{find:r,contains:a}}),Kimbo.define("data",function(){"use strict";var e={},t=1,n={get:function(t,n){var i,o=e[t._dataId];return o?i=o[n]:(i=t.dataset[n],i&&this.set(t,n,i)),i},set:function(n,i,o){var r=n._dataId||(n._dataId=t++),a=e[r];a||(a=e[r]={}),a[i]=o},remove:function(t,n){void 0===n?e[t._dataId]={}:delete e[t._dataId][n]}};return Kimbo.fn.extend({data:function(e,t){return this.length&&Kimbo.isString(e)?(e=Kimbo.camelCase(e),void 0===t?n.get(this[0],e):this.each(function(i){n.set(i,e,t)})):this},removeData:function(e){return this.length&&Kimbo.isString(e)?(e=Kimbo.camelCase(e),this.each(function(t){n.remove(t,e)})):this}}),n}),Kimbo.define("css",function(e){"use strict";var t={fontWeight:!0,lineHeight:!0,opacity:!0,zIndex:!0},n=function(e,t){return t=t.replace(/([A-Z])/g,"-$1").toLowerCase(),window.getComputedStyle(e,null).getPropertyValue(t)},i=null,o=function(){return i=e.document.createElement("iframe"),e.document.documentElement.appendChild(i),i},r=function(t,i){i=i||e.document;var o,r;return o=i.createElement(t),i.body.appendChild(o),r=n(o,"display"),o.parentNode.removeChild(o),r},a={};Kimbo.fn.extend({show:function(){return this.each(function(e){var t,n=e.nodeName,s=a[n];s||(s=r(n),"none"!==s&&s||(i=i||o(),t=(i.contentWindow||i.contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),s=r(n,t),i.parentNode.removeChild(i)),a[n]=s),e.style.display=s||"block"})},hide:function(){return this.each(function(e){var t=e.nodeName,i=a[t];i?i=e.style.display:(i=n(e,"display"),a[t]=i),"none"!==i&&(e.style.display="none")})},css:function(e,i){var o,r=this;if(!this.length||!Kimbo.isString(e)&&!Kimbo.isObject(e))return this;if(o=function(e,n){Kimbo.isNumeric(n)&&!t[Kimbo.camelCase(e)]&&(n+="px"),r.each(function(t){t.style[e]=n})},Kimbo.isString(e)){if(void 0===i)return n(this[0],e);o(e,i)}else Kimbo.isObject(e)&&Kimbo.forEach(e,o);return this}})}),Kimbo.define("manipulation",function(e){"use strict";var t=/\s+/,n=function(e,t){return 1===e.nodeType&&e.classList.contains(t)};Kimbo.forEach({text:"textContent",html:"innerHTML",val:"value"},function(e,t){Kimbo.fn[e]=function(e){return this.length?void 0===e?this[0][t]:this.each(function(n){n[t]=e}):void 0}}),Kimbo.forEach(["add","remove"],function(e,n){var i=n>0;Kimbo.fn[e+"Class"]=function(n){var o;return n&&Kimbo.isString(n)?(o=n.split(t),this.each(function(t){1===t.nodeType&&Kimbo.forEach(o,function(n){t.classList[e](n)})})):!n&&i&&this.removeAttr("class"),this}}),Kimbo.forEach(["append","prepend"],function(t,n){var i=n>0;Kimbo.fn[t]=function(t){var n;return this.length&&t?(Kimbo.isString(t)&&(n=document.createElement("div"),n.innerHTML=t,t=n.firstChild),t.nodeType||t instanceof Kimbo?this.each(function(n){(1===n.nodeType||11===n.nodeType)&&e.kimbo(t).each(function(e){n.insertBefore(e,i?n.firstChild:null)})}):void 0):this}}),Kimbo.fn.extend({empty:function(){return this.each(function(e){for(;e.hasChildNodes();)e.removeChild(e.childNodes[0])})},remove:function(){return this.each(function(e){e.parentNode&&e.parentNode.removeChild(e)})},attr:function(e,t){return this.length?Kimbo.isString(e)&&void 0===t?this[0].getAttribute(e):this.each(function(n){n.setAttribute(e,t)}):this},removeAttr:function(e){return this.each(function(t){t.removeAttribute(e)})},toggleClass:function(i,o){var r;return this.length&&i&&Kimbo.isString(i)&&(r=i.split(t),this.each(function(t){Kimbo.forEach(r,function(i){o=Kimbo.isBoolean(o)?o:!n(t,i),e.kimbo(t)[o?"addClass":"removeClass"](i)})})),this},hasClass:function(e){var i,o=!1;return this.length&&e&&Kimbo.isString(e)&&(i=e.trim().split(t),this.each(function(e){Kimbo.forEach(i,function(t){return o=n(e,t),o?void 0:!1})})),o},clone:function(){return this.each(function(e){return e.cloneNode(!0)})}}),Kimbo.forEach(["width","height"],function(e){Kimbo.fn[e]=function(t){return t?this.css(e,t):parseInt(this.css(e),10)}})}),Kimbo.define("traversing",function(e){"use strict";var t=Kimbo.require("query"),n=Array.prototype.filter,i={children:!0,contents:!0,next:!0,prev:!0},o=e.document.documentElement.webkitMatchesSelector||e.document.documentElement.mozMatchesSelector||e.document.documentElement.oMatchesSelector||e.document.documentElement.matchesSelector,r=function(e,t){return e&&1===e.nodeType?o.call(e,t):!1},a=function(e){return e.filter(function(t,n){return e.indexOf(t)===n})},s=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},c=function(e,t){do e=e[t];while(e&&1!==e.nodeType);return e};Kimbo.fn.extend({filter:function(t){var i;return i=n.call(this,function(e,n){var i;return Kimbo.isFunction(t)?i=!!t.call(e,n,e):Kimbo.isString(t)?i=r(e,t):t.nodeType?i=e===t:t instanceof Kimbo&&(i=e===t[0]),i}),e.kimbo(i)},eq:function(e){return this.length&&-1===e?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.length&&e.kimbo(e.slice.apply(this,arguments))},each:function(e){return Kimbo.forEach(this,e)},map:function(t){return e.kimbo(Kimbo.map(this,function(e,n){return t.call(e,e,n)}))},find:function(n){var i,o,r,a,s,c,u;for(c=e.kimbo(),i=0,o=this.length;o>i;i++)if(r=c.length,u=t.find(this[i],n),e.push.apply(c,u),i)for(a=r;c.length>a;a++)for(s=0;r>s;s++)if(c[s]===c[a]){c.splice(a--,1);break}return c},closest:function(t,n){var i=this.length,o=[],s=function(i){for(;i&&!r(i,t);)i=i!==n&&i!==e.document&&i.parentNode;return i};return i?(1===i?o=s(this[0]):(Kimbo.forEach(this,function(e){e=s(e),e&&o.push(e)}),o=o.length>1?a(o):o),e.kimbo(o)):this},contains:function(e){return e=e instanceof Kimbo?e[0]:Kimbo.isString(e)?this.find(e)[0]:e,t.contains(this[0],e)},add:function(t,n){var i=Kimbo.isString(t)?e.kimbo(t,n):Kimbo.makeArray(t&&t.nodeType?[t]:t),o=Kimbo.merge(this,i);return e.kimbo(o)},is:function(e){return!(!this.length||!this.filter(e).length)}}),Kimbo.forEach({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},next:function(e){return c(e,"nextSibling")},prev:function(e){return c(e,"previousSibling")},siblings:function(e){return s((e.parentNode||{}).firstChild,e)},children:function(e){return s(e.firstChild)},contents:function(t){return"iframe"===t.nodeName.toLowerCase()?t.contentDocument||t.contentWindow[e.document]:Kimbo.makeArray(t.childNodes)}},function(t,n){Kimbo.fn[t]=function(o){var r;return this.length?(r=Kimbo.map(this,n),r=this.length>1&&!i[t]?a(r):r,Kimbo.isString(o)&&(r=e.kimbo(r).filter(o)),e.kimbo(r)):this}})}),Kimbo.define("utilities",function(e){"use strict";var t="(Android)\\s+([\\d.]+)",n="(BlackBerry|BB10|Playbook).*Version/([\\d.]+)",i="(Mozilla).*Mobile[^/]*/([\\d.]*)",o="(iPad).*OS\\s([\\d_]+)",r="(iPhone\\sOS)\\s([\\d_]+)",a="(web|hpw)OS[\\s/]([\\d.]+)",s=RegExp(t+"|"+n+"|"+i+"|"+r+"|"+o+"|"+a),c=null,u={};Kimbo.forEach(["Array","Boolean","Date","Error","Function","Number","Object","RegExp","String"],function(e){u["[object "+e+"]"]=e.toLowerCase()}),Kimbo.extend({typeOf:function(e){var t;return t=null===e||void 0===e?e+"":u[Object.prototype.toString.call(e)]||"object"},isArray:Array.isArray,isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},isWindow:function(e){return e&&e===e.window},isEmptyObject:function(e){var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0},isMobile:function(){return null===c&&(c=s.test(navigator.userAgent)),c},parseJSON:function(e){return e&&Kimbo.isString(e)?window.JSON.parse(e):void 0},parseXML:function(e){var t,n;if(e&&Kimbo.isString(e)){if(t=new window.DOMParser,n=t.parseFromString(e,"text/xml"),n.getElementsByTagName("parsererror").length)throw Error("Invalid XML: "+e);return n}},map:function(e,t){var n=[];return e&&Kimbo.forEach(e,function(e,i){var o=t(e,i);null!==o&&void 0!==o&&n.push(o)}),n.concat.apply([],n)},makeArray:function(t,n){return n=n||[],t&&(Kimbo.isArray(t)||t instanceof Kimbo||t instanceof window.NodeList?n=Kimbo.merge(n,t):e.push.call(n,t)),n},merge:function(t,n){return Kimbo.isArray(t)?t=t.concat(n):e.push.apply(t,e.slice.call(n)),t},camelCase:function(e){return e.replace(/-+(.)?/g,function(e,t){return t.toUpperCase()})},isFunction:function(e){return"function"===Kimbo.typeOf(e)},isObject:function(e){return"object"===Kimbo.typeOf(e)},isString:function(e){return"string"===Kimbo.typeOf(e)},isBoolean:function(e){return"boolean"===Kimbo.typeOf(e)}}),e.rootContext=e.kimbo(e.rootContext)}),Kimbo.define("events",function(e){"use strict";var t=Kimbo.require("query"),n=1,i=/^(?:mouse|menu)|click/,o=/^key/,r=["altKey","bubbles","cancelable","ctrlKey","currentTarget","defaultPrevented","eventPhase","metaKey","relatedTarget","shiftKey","target","timeStamp","type","view","which"],a=["button","buttons","clientX","clientY","fromElement","offsetX","offsetY","screenX","screenY","toElement"],s=["char","charCode","key","keyCode"],c=Kimbo.isMobile()?{}:{touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",doubletap:"dblclick",orientationchange:"resize"},u={},l={},f={},m=function(e){var t,n,i;return e[Kimbo.ref]?e:(t=e,n=l[e.type]||[],i=r.concat(n),e=new Kimbo.Event(t),Kimbo.forEach(i,function(n){e[n]=t[n]}),e)},d=function(e){return e._guid||(e._guid=n++)},h=function(e,t){var n=(u[e]||{}).events||{};return(t?n[t]:n)||[]},p=function(t,n,i){return t.nodeName.toLowerCase()===n&&e.kimbo(t).closest(n,i)[0]},b=function(){return!1},g=function(){return!0},y=function(e,t,n,i,o){var r,a,s,c,l=d(e),m=u[l],h=t;t=f[t]?f[t].origType:t,m||(u[l]=m={}),r=m.events,r||(m.events=r={}),c=m.handler,c||(m.handler=c=function(){return w.apply(e,arguments)}),s={type:t,origType:h,data:i,callback:n,selector:o},a=r[t],a||(a=r[t]=[],a.delegateCount=0,e.addEventListener&&e.addEventListener(t,c,!1)),o?a.splice(a.delegateCount++,0,s):a.push(s)},v=function(e,t,n,i){var o,r,a,s,c=d(e);if(c&&(r=h(c,t),!t||r.length)){if(!t)for(a in r)r.hasOwnProperty(a)&&v(e,a,n,i);for(s=0;r.length>s;s++)o=r[s],n&&n!==o.callback||i&&i!==o.selector||(r.splice(s--,1),o.selector&&r.delegateCount--);r.length||(e.removeEventListener(t,u[c].handler,!1),delete u[c].events[t])}},K=function(e,t,n){var i,o,r,a,s;if(e&&(3===e.nodeType||8===e.nodeType)||!t||!Kimbo.isString(t))return this;if("focus"===t||"blur"===t)try{return e[t]()}catch(c){}if(s=new Kimbo.Event(t),s.isTrigger=!0,s.target||(s.target=e),n=n?Kimbo.makeArray(n):[],n.unshift(s),r=[[e,t]],!Kimbo.isWindow(e)){for(i=e.parentNode;i;i=i.parentNode)r.push([i,t]),o=i;o&&o===e.ownerDocument&&r.push([window,t])}Kimbo.forEach(r,function(e){i=e[0],s.type=e[1],a=i._guid,a&&h(a,t)&&u[a].handler.apply(i,n)})},w=function(t){t=m(t);var n,i,o,r,a,s,c,u=d(this),l=h(u,t.type),b=l.delegateCount,g=e.slice.call(arguments),y=[];if(g[0]=t,t.delegateTarget=this,b)for(n=t.target;n!==this;n=n.parentNode||this)if(n.disabled!==!0||"click"!==t.type){for(o={},r=[],c=0;b>c;c++)a=l[c],s=a.selector,o[s]||(o[s]=p(n,s,this)),o[s]&&r.push(a);r.length&&y.push({elem:n,matches:r})}l.length>b&&y.push({elem:this,matches:l.slice(b)}),Kimbo.forEach(y,function(e){t.isPropagationStopped()||(t.currentTarget=e.elem,Kimbo.forEach(e.matches,function(n){t.isImmediatePropagationStopped()||(t.data=n.data,t.handleObj=n,i=((f[n.origType]||{}).handle||n.callback).apply(e.elem,g),i===!1&&(t.preventDefault(),t.stopPropagation()))}))})};Kimbo.Event=function(e){e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented?g:b):this.type=e,this.timeStamp=e&&e.timeStamp||Date.now(),this[Kimbo.ref]=!0},Kimbo.Event.prototype={isDefaultPrevented:b,isPropagationStopped:b,isImmediatePropagationStopped:b,preventDefault:function(){this.isDefaultPrevented=g,this.isTrigger||this.originalEvent.preventDefault()},stopPropagation:function(){this.isPropagationStopped=g,this.isTrigger||this.originalEvent.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=g,this.isTrigger||this.originalEvent.stopImmediatePropagation()}},Kimbo.fn.extend({on:function(e,t,n,i){return n||i?i||(Kimbo.isString(t)?(i=n,n=void 0):(i=n,n=t,t=void 0)):(i=t,n=t=void 0),i?(e=c[e]||e,this.each(function(o){y(o,e,i,n,t)})):this},off:function(e,t,n){return Kimbo.isFunction(t)&&(n=t,t=void 0),this.each(function(i){v(i,e,n,t)})},trigger:function(e,t){return this.each(function(n){K(n,e,t)})},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),Kimbo.forEach(["blur","change","click","contextmenu","dblclick","error","focus","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseup","mouseover","resize","scroll","select","submit","unload"],function(e){Kimbo.fn[e]=function(t,n){return arguments.length>0?this.on(e,null,t,n):this.trigger(e)},l[e]=o.test(e)?s:i.test(e)?a:null}),Kimbo.forEach({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,n){f[e]={origType:n,handle:function(e){var i,o=this,r=e.relatedTarget,a=e.handleObj;return(!r||r!==o&&!t.contains(o,r))&&(e.type=a.origType,i=a.callback.apply(this,arguments),e.type=n),i}}})}),Kimbo.define("ajax",function(e){"use strict";var t=/(\=)\?(&|$)|\?\?/i,n={html:"text/html",json:"application/json",script:"text/javascript, application/javascript",text:"text/plain",xml:"application/xml, text/xml"},i={json:Kimbo.parseJSON,xml:Kimbo.parseXML},o={};Kimbo.forEach(["success","error"],function(e){o[e]=function(t,n,i,o){o=o||i,Kimbo.isFunction(o[e])&&o[e].apply(o.context,arguments)}});var r=function(e,t){return i[t]?i[t](e):e},a=function(e,t){var i,a;t.dataType||(a=e.getResponseHeader("Content-Type"),Kimbo.forEach(n,function(e,n){return n.match(a)?(t.dataType=e,!1):void 0}),s(t));try{i=r(e.responseText,t.dataType)}catch(c){i=!1,o.error("parseerror",c,e,t)}return i},s=function(e){e.crossDomain||e.headers["X-Requested-With"]||(e.headers["X-Requested-With"]="XMLHttpRequest"),e.contentType&&(e.headers["Content-Type"]=e.contentType),e.headers.Accept=n[e.dataType]||"*/*"},c=function(e,t){e.onreadystatechange=null,e.abort(),o.error("error","timeout",e,t)},u=function(e,t){return window.setTimeout(function(){c(e,t)},t.timeout)};Kimbo.ajaxSettings={type:"GET",async:!0,success:{},error:{},context:null,headers:{},data:null,crossDomain:!1,timeout:0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",xhr:function(){return new window.XMLHttpRequest}},Kimbo.ajax=function(e){var n,i,r,c=Kimbo.extend({},Kimbo.ajaxSettings,e);return c.data&&(c.url+=(/\?/.test(c.url)?"&":"?")+Kimbo.param(c.data),delete c.data),c.context||(c.context=c),t.test(c.url)?l(c):(n=c.xhr(),c.timeout>0&&(i=u(n,c)),r=function(){var e,t;4===n.readyState&&(t=n.status,window.clearTimeout(i),t>=200&&300>t||304===t?c.async&&(e=a(n,c),e!==!1&&o.success(e,n,c)):o.error("error",n.statusText,n,c))},n.onreadystatechange=r,n.open(c.type,c.url,c.async),s(c),Kimbo.forEach(c.headers,function(e,t){n.setRequestHeader(e,t)}),n.send(c.data),c.async?n:r())},Kimbo.forEach(["get","post"],function(e){Kimbo[e]=function(t,n,i,o){return Kimbo.isFunction(n)&&(o=o||i,i=n,n=null),Kimbo.ajax({type:e.toUpperCase(),url:t,data:n,success:i,dataType:o})}}),Kimbo.extend({getScript:function(e,t){return Kimbo.get(e,t,"script")},getJSON:function(e,t,n){return Kimbo.get(e,t,n,"json")}});var l=function(n){var i,r=Kimbo.ref+"_"+Date.now(),a=e.document.createElement("script"),c=e.document.head,l={abort:function(){window.clearTimeout(i),c.removeChild(a),delete window[r]}};return n.timeout>0&&(i=u(l,n)),a.src=n.url.replace(t,"$1"+r+"$2"),window[r]=function(e){l.abort(),Kimbo.extend(l,{statusText:"OK",status:200,response:e,headers:n.headers}),o.success(e,l,n)},s(n),c.appendChild(a),l};Kimbo.param=function(e){var t="";return Kimbo.isObject(e)?Kimbo.forEach(e,function(e,n){t+=e+"="+n+"&"}):t=e,window.encodeURIComponent(t).replace(/%20/g,"+").replace(/%\d[D6F]/g,window.unescape).replace(/^\?|&$/g,"")}});
//@ sourceMappingURL=dist/kimbo.sourcemap.js