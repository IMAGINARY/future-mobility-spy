var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}function n(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var i;function r(e){return document.querySelector(e)}i=function(e){if("undefined"==typeof document)throw new Error("document-ready only runs in the browser");var t=document.readyState;if("complete"===t||"interactive"===t)return setTimeout(e,0);document.addEventListener("DOMContentLoaded",(function(){e()}))};const o=r("#content"),s=r("#config"),a=r("#camera-video"),c=r("#camera-selector"),u=r("#scale"),l=r("#rotation"),d=r("#translation-x"),f=r("#translation-y"),h=r("#flip-h"),v=r("#flip-v"),m=[d,f,l,u,h,v],p=r("#storage-camera"),g=r("#storage-transforms"),y=r("#load-button"),I=r("#store-button"),b=r("#load-defaults-button"),T=r("#hide-config-ui-button"),w=r("#reload-page-button");const E={width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30}};class D{static async enumerate(){const e=(await navigator.mediaDevices.enumerateDevices()).filter((e=>"videoinput"===e.kind));return this.lastVideoDeviceInfos=e,e}getDeviceId(){return this.deviceId}getStreamDeviceId(){return null!==this.stream?this.stream.getVideoTracks()[0].getSettings().deviceId:""}disconnectStream(){null!==this.stream&&(this.stream.getVideoTracks()[0].onended=void 0,this.stream=null,a.src=null,a.srcObject=null)}disconnect(){null!==this.stream&&(console.info("Disconnecting camera:",this.getStreamDeviceId()),this.disconnectStream())}connectTo(e){this.deviceId=e,this.disconnect(),this.tryReconnect().then()}async tryReconnect(){window.clearTimeout(this.reconnectionTimeout),this.reconnectionTimeout=0;const e=this.deviceId;console.info("Connecting to camera:",e);try{const t=await navigator.mediaDevices.getUserMedia({video:{...E,deviceId:{exact:e}}});this.deviceId===e&&this.handleConnected(t)}catch(e){console.warn(`Unable to connect to camera (${this.deviceId})`,e),console.info("Attempting reconnecting in 10000ms"),this.reconnectionTimeout=window.setTimeout((()=>this.tryReconnect()),1e4)}}static async handleDeviceChange(){const e=this.lastVideoDeviceInfos,t=await this.enumerate();if(console.info("Device list changed:",t),"function"==typeof this.ondevicechange)if(e.length!==t.length)this.ondevicechange();else for(const n of t){if(-1===e.findIndex((e=>e.deviceId===n.deviceId)))return void this.ondevicechange()}}handleConnected(e){null!==this.stream&&(this.stream.getVideoTracks()[0].onended=void 0),this.stream=e,console.info("Camera connected:",this.deviceId);const{width:t,height:n}=e.getVideoTracks()[0].getSettings();a.srcObject=e,a.width=t,a.height=n,e.getVideoTracks()[0].onended=()=>this.handleDisconnected()}handleDisconnected(){console.warn("Camera disconnected:",this.deviceId),this.disconnectStream(),this.tryReconnect().then()}applyTransforms(e){a.style.transform=function(e){const{translationX:t,translationY:n,rotation:i,scale:r,flipH:o,flipV:s}=e;let a="";return a+=` translate(${t}px,${n}px)`,a+=` rotate(${i}deg)`,a+=` scale(${r})`,a+=` scale(${o?-1:1},${s?-1:1})`,a=a.trim(),a}(e)}constructor(){this.deviceId="",this.reconnectionTimeout=0,this.stream=null,navigator.mediaDevices.addEventListener("devicechange",(async()=>{0!==this.reconnectionTimeout&&await this.tryReconnect()}))}}D.ondevicechange=void 0,D.lastVideoDeviceInfos=[],D.staticInitializer=(navigator.mediaDevices.addEventListener("devicechange",(()=>D.handleDeviceChange())),!0);var C={};function L(){return(L=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function O(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,_(e,t)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n(C,"Idler",(function(){return ie}),(function(e){return ie=e})),n(C,"KeyboardInterrupter",(function(){return ue}),(function(e){return ue=e})),n(C,"PointerInterrupter",(function(){return fe}),(function(e){return fe=e}));var M,k,x,P=(x=(M={exports:{}}).exports,Object.defineProperty(x,"__esModule",{value:!0}),x.PerformanceObserver=x.performance=void 0,x.performance=window.performance,x.PerformanceObserver=window.PerformanceObserver,M.exports),H="object"==typeof Reflect?Reflect:null,N=H&&"function"==typeof H.apply?H.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};k=H&&"function"==typeof H.ownKeys?H.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var F=Number.isNaN||function(e){return e!=e};function j(){j.init.call(this)}var A=j;j.EventEmitter=j,j.prototype._events=void 0,j.prototype._eventsCount=0,j.prototype._maxListeners=void 0;var R=10;function V(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function q(e){return void 0===e._maxListeners?j.defaultMaxListeners:e._maxListeners}function z(e,t,n,i){var r,o,s;if(V(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=q(e))>0&&s.length>r&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=s.length,console&&console.warn&&console.warn(a)}return e}function $(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function Y(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=$.bind(i);return r.listener=n,i.wrapFn=r,r}function B(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):U(r,r.length)}function K(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function U(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function X(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(o){i.once&&e.removeEventListener(t,r),n(o)}))}}Object.defineProperty(j,"defaultMaxListeners",{enumerable:!0,get:function(){return R},set:function(e){if("number"!=typeof e||e<0||F(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");R=e}}),j.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},j.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||F(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},j.prototype.getMaxListeners=function(){return q(this)},j.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var a=r[e];if(void 0===a)return!1;if("function"==typeof a)N(a,this,t);else{var c=a.length,u=U(a,c);for(n=0;n<c;++n)N(u[n],this,t)}return!0},j.prototype.on=j.prototype.addListener=function(e,t){return z(this,e,t,!1)},j.prototype.prependListener=function(e,t){return z(this,e,t,!0)},j.prototype.once=function(e,t){return V(t),this.on(e,Y(this,e,t)),this},j.prototype.prependOnceListener=function(e,t){return V(t),this.prependListener(e,Y(this,e,t)),this},j.prototype.off=j.prototype.removeListener=function(e,t){var n,i,r,o,s;if(V(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},j.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},j.prototype.listeners=function(e){return B(this,e,!0)},j.prototype.rawListeners=function(e){return B(this,e,!1)},j.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):K.call(e,t)},j.prototype.listenerCount=K,j.prototype.eventNames=function(){return this._eventsCount>0?k(this._events):[]},A.once=function(e,t){return new Promise((function(n,i){function r(n){e.removeListener(t,o),i(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}X(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&X(e,"error",t,{once:!0})}(e,r)}))};var J=setTimeout((function(){}),0),W=function(){function e(e,t,n,i,r,o){this.interruptHandler=this.interrupt.bind(this),this.interruptHandlerInternal=function(){},this.initialized=!1,this.idle=!1,this.idler=e,this.beginCb=t,this.delay=n,this.duration=i,this.endCb=void 0===r?function(){}:r,this.timeoutId=J,this.durationTimeoutId=J,this.startIdle=o,this.init()}var t=e.prototype;return t.init=function(){var e=this;this.initialized||(this.initialized=!0,this.idle=!1,this.timeoutId=this.startIdle?setTimeout((function(){return e.beginIdleModeCycle()}),0):setTimeout((function(){return e.testTimeout()}),0))},t.isInitialized=function(){return this.initialized},t.clear=function(){this.initialized&&(this.interrupt(),clearTimeout(this.timeoutId),this.initialized=!1)},t.isIdle=function(){return this.idle},t.interrupt=function(){this.interruptHandlerInternal()},t.testTimeout=function(){var e=this;if(this.isInitialized()){var t=this.idler.getIdleTime();t>=this.delay?this.beginIdleModeCycle():this.timeoutId=setTimeout((function(){return e.testTimeout()}),this.delay-t)}},t.beginIdleModeCycle=function(){var e=!1;this.interruptHandlerInternal=function(){e=!0},this.idler.on("interrupted",this.interruptHandler),this.beforeIdle(),this.idle=!0,this.beginCb(),e?this.endIdleModeCycle():this.interruptHandlerInternal=this.endIdleModeCycle.bind(this)},t.endIdleModeCycle=function(){var e=this;this.interruptHandlerInternal=function(){},this.idler.off("interrupted",this.interruptHandler),this.endCb(),this.idle=!1,this.afterIdle(),this.timeoutId=setTimeout((function(){return e.testTimeout()}),this.delay)},t.beforeIdle=function(){var e=this;Number.isFinite(this.duration)&&this.duration>=0&&(this.durationTimeoutId=setTimeout((function(){return e.interrupt()}),this.duration))},t.afterIdle=function(){clearTimeout(this.durationTimeoutId)},e}(),G=setInterval((function(){}),0),Q=function(e){function t(t,n,i,r,o,s,a,c){var u;return(u=e.call(this,t,n,i,r,a,c)||this).intervalId=G,u.intervalCb=o,u.interval=s,u}O(t,e);var n=t.prototype;return n.clear=function(){clearInterval(this.intervalId),e.prototype.clear.call(this)},n.beforeIdle=function(){e.prototype.beforeIdle.call(this),this.intervalId=setInterval(this.intervalCb,this.interval)},n.afterIdle=function(){clearInterval(this.intervalId),e.prototype.afterIdle.call(this)},t}(W),Z=requestAnimationFrame((function(){})),ee=function(e){function t(t,n,i,r,o,s,a,c,u){var l;return(l=e.call(this,t,n,i,r,s,a,c,u)||this).animationFrameRequestId=Z,l.animateHandler=l.animate.bind(S(l)),l.animationCb=o,l}O(t,e);var n=t.prototype;return n.clear=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.clear.call(this)},n.beforeIdle=function(){e.prototype.beforeIdle.call(this),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},n.animate=function(e){this.animationCb(e),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},n.afterIdle=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.afterIdle.call(this)},t}(Q);function te(){return P.performance.now()}var ne={delay:6e4,duration:Number.POSITIVE_INFINITY,onBegin:function(){},onEnd:function(){},interval:Number.POSITIVE_INFINITY,onInterval:function(){},onAnimate:function(){},immediate:!1},ie=function(e){function t(){var t;return(t=e.call(this)||this).lastId=0,t.timers=new Map,t.lastEventTimestampMs=te(),t.interruptHandler=t.interrupt.bind(S(t)),[].slice.call(arguments).forEach((function(e){return t.registerInterrupter(e)})),t}O(t,e);var n=t.prototype;return n.addCallback=function(e){if(void 0!==e.onAnimate){var t=L({},ne,e),n=new ee(this,t.onBegin,t.delay,t.duration,t.onAnimate,t.onInterval,t.interval,t.onEnd,t.immediate);return this.addIdleTimeout(n)}if(void 0!==e.interval&&Number.isFinite(e.interval)){var i=L({},ne,e),r=new Q(this,i.onBegin,i.delay,i.duration,i.onInterval,i.interval,i.onEnd,i.immediate);return this.addIdleTimeout(r)}var o=L({},ne,e),s=new W(this,o.onBegin,o.delay,o.duration,o.onEnd,o.immediate);return this.addIdleTimeout(s)},n.addIdleTimeout=function(e){this.lastId+=1;var t=this.lastId;return this.timers.set(t,e),t},n.removeCallback=function(e){var t=this.timers.get(e);void 0!==t&&t.clear(),this.timers.delete(e)},n.clear=function(){this.timers.forEach((function(e){return e.clear()})),this.timers.clear()},n.interrupt=function(){this.lastEventTimestampMs=Math.max(te(),this.lastEventTimestampMs),this.emit("interrupted")},n.getIdleTime=function(){return te()-this.lastEventTimestampMs},n.registerInterrupter=function(e){return e.on("interrupted",this.interruptHandler),this},n.unregisterInterrupter=function(e){return e.off("interrupted",this.interruptHandler),this},t}(A.EventEmitter),re=function(e){function t(){var t;return(t=e.call(this)||this).emitInterruptedHandler=t.emitInterrupted.bind(S(t)),t}return O(t,e),t.prototype.emitInterrupted=function(){this.emit("interrupted")},t}(A.EventEmitter);!function(e){function t(t){var n;return t((n=e.call(this)||this).emitInterruptedHandler),n}O(t,e)}(re);function oe(e){return void 0!==e.on&&void 0!==e.off}function se(e){return null!=e&&"function"==typeof e[Symbol.iterator]}var ae=function(e){function t(t,n){var i,r,o;return(i=e.call(this)||this).eventEmitters=new Set,i.eventTypes=new Set,void 0!==t&&(se(t)?(r=i).addEventEmitter.apply(r,t):i.addEventEmitter(t)),void 0!==n&&(se(n)?(o=i).addEventType.apply(o,n):i.addEventType(n)),i}O(t,e);var n=t.prototype;return n.addEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach((function(t){if(!e.eventEmitters.has(t)){var n=e.wrapOn(t);e.eventTypes.forEach(n)}e.eventEmitters.add(t)})),this},n.removeEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach((function(t){if(e.eventEmitters.has(t)){var n=e.wrapOff(t);e.eventTypes.forEach(n)}e.eventEmitters.delete(t)})),this},n.hasEventEmitter=function(e){return this.eventEmitters.has(e)},n.addEventType=function(){var e=this;return[].slice.call(arguments).forEach((function(t){e.eventTypes.has(t)||e.eventEmitters.forEach((function(n){return e.wrapOn(n)(t)})),e.eventTypes.add(t)})),this},n.removeEventType=function(){var e=this;return[].slice.call(arguments).forEach((function(t){e.eventTypes.has(t)&&e.eventEmitters.forEach((function(n){return e.wrapOff(n)(t)})),e.eventTypes.delete(t)})),this},n.hasEventType=function(e){return this.eventTypes.has(e)},n.wrapOn=function(e){var t=this;return oe(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},n.wrapOff=function(e){var t=this;return oe(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},t}(re),ce=["keydown","keyup"],ue=function(e){function t(t){return void 0===t&&(t=[document]),e.call(this,t,ce)||this}return O(t,e),t}(ae),le=["pointerdown","pointermove","pointerup"],de=["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"],fe=function(e){function t(n){return void 0===n&&(n=[document]),e.call(this,n,t.getEventTypes())||this}return O(t,e),t.getEventTypes=function(){return"function"==typeof window.PointerEvent?le:de},t}(ae);class he{static getDefaultDeviceId(){return""}static loadDeviceId(){var e;return null!==(e=localStorage.getItem("deviceId"))&&void 0!==e?e:this.getDefaultDeviceId()}static storeDeviceId(e){const t="string"==typeof e?e:e.getVideoTracks()[0].getSettings().deviceId;return localStorage.setItem("deviceId",t),e}static resetDeviceId(){this.storeDeviceId(this.getDefaultDeviceId())}static getDefaultTransforms(){return{translationX:0,translationY:0,rotation:0,scale:1,flipH:!1,flipV:!1}}static loadTransforms(){try{const e=localStorage.getItem("transforms"),t=JSON.parse(e);return{...this.getDefaultTransforms(),...t}}catch(e){return console.log(e),this.getDefaultTransforms()}}static storeTransforms(e){return localStorage.setItem("transforms",JSON.stringify(e)),e}static resetTransforms(){this.storeTransforms(this.getDefaultTransforms())}static reset(e){(e={deviceId:!0,transforms:!0,...e}).deviceId&&he.resetDeviceId(),e.transforms&&he.resetTransforms()}}class ve{getDeviceId(){return this.deviceId}setDeviceId(e){const t="string"==typeof e?e:e.getVideoTracks()[0].getSettings().deviceId;return c.value=t,this.deviceId=t,this.camera.connectTo(t),e}loadDefaultDeviceId(){const e=he.getDefaultDeviceId();return this.setDeviceId(e),e}loadDeviceId(){const e=he.loadDeviceId();return this.setDeviceId(e),e}storeDeviceId(){he.storeDeviceId(this.getDeviceId())}getTransforms(){return{...this.transforms}}setTransforms(e){const{translationX:t,translationY:n,rotation:i,scale:r,flipH:o,flipV:s}=e;return d.valueAsNumber=t,f.valueAsNumber=n,l.valueAsNumber=i,u.valueAsNumber=r,h.checked=o,v.checked=s,this.transforms=e,this.camera.applyTransforms(e),e}loadDefaultTransforms(){const e=he.getDefaultTransforms();return this.setTransforms(e),e}loadTransforms(){const e=he.loadTransforms();return this.setTransforms(e),e}storeTransforms(){he.storeTransforms(this.getTransforms())}async updateCameraSelector(e){for(;c.children.length>0;)c.removeChild(c.children[c.children.length-1]);function t(e,t){const n=document.createElement("option");return n.value=e,n.innerText=`${t}`,""!==e&&(n.innerText+=`(${e})`),n}const n=this.getDeviceId();let i=!1;for(let r of e){i=i||r.deviceId===n;const e=t(r.deviceId,r.label);c.appendChild(e)}if(!i){const e=t(n,n===he.getDefaultDeviceId()?"--- please select ---":"--- selected, but unavailable ---");c.appendChild(e)}c.value=n}getStorageFlags(){return{camera:p.checked,transforms:g.checked}}loadDefaults(){const{camera:e,transforms:t}=this.getStorageFlags();e&&this.loadDefaultDeviceId(),t&&this.loadDefaultTransforms()}load(){const{camera:e,transforms:t}=this.getStorageFlags();e&&this.loadDeviceId(),t&&this.loadTransforms()}store(){const{camera:e,transforms:t}=this.getStorageFlags();e&&this.storeDeviceId(),t&&this.storeTransforms()}async onDeviceChange(){await this.updateCameraSelector(await D.enumerate())}async handleCameraSelected(){this.setDeviceId(c.value)}handleTransformsChanged(){const e={translationX:d.valueAsNumber,translationY:f.valueAsNumber,rotation:l.valueAsNumber,scale:u.valueAsNumber,flipH:h.checked,flipV:v.checked};this.setTransforms(e)}showConfigMenu(e){this.idler.interrupt(),s.style.display=e?"unset":"none"}toggleConfigMenu(){this.showConfigMenu("none"===s.style.display)}static async getInstance(){return this.instancePromise||(this.instancePromise=new Promise((async(e,t)=>{const n=new ve;await n.updateCameraSelector(await D.enumerate()),e(n)}))),await this.instancePromise}constructor(){D.ondevicechange=()=>this.onDeviceChange(),this.camera=new D,this.loadTransforms(),this.loadDeviceId();const e=()=>this.handleTransformsChanged();for(const t of m)t.onchange=e,t.oninput=e;o.onclick=()=>this.toggleConfigMenu(),T.onclick=()=>this.showConfigMenu(!1),w.onclick=()=>location.reload(),y.onclick=()=>this.load(),I.onclick=()=>this.store(),b.onclick=()=>this.loadDefaults(),c.onchange=()=>this.handleCameraSelected();this.idler=new C.Idler(new C.PointerInterrupter(s),new C.KeyboardInterrupter),this.idler.addCallback({delay:2e4,onBegin:()=>this.showConfigMenu(!1)})}}ve.instancePromise=null,t(i)((async function(){const t=await ve.getInstance();t.showConfigMenu(!1),e.configMenu=t}));
//# sourceMappingURL=index.d384dfc6.js.map
