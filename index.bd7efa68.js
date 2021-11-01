var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}function n(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var i;function r(e){return document.querySelector(e)}i=function(e){if("undefined"==typeof document)throw new Error("document-ready only runs in the browser");var t=document.readyState;if("complete"===t||"interactive"===t)return setTimeout(e,0);document.addEventListener("DOMContentLoaded",(function(){e()}))};const o=r("#content"),s=r("#config"),a=r("#camera-video"),c=r("#camera-selector"),u=r("#request-camera-permission-button"),l=r("#scale"),d=r("#rotation"),h=r("#translation-x"),f=r("#translation-y"),v=r("#flip-h"),m=r("#flip-v"),p=[h,f,d,l,v,m],g=r("#storage-camera"),y=r("#storage-transforms"),I=r("#load-button"),b=r("#store-button"),T=r("#load-defaults-button"),w=r("#hide-config-ui-button"),E=r("#reload-page-button");const D={width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30}};class C{static async enumerate(){const e=(await navigator.mediaDevices.enumerateDevices()).filter((e=>"videoinput"===e.kind));return this.lastVideoDeviceInfos=e,e}static async requestPermission(){try{return await navigator.mediaDevices.getUserMedia({video:!0}),!0}catch(e){return console.error("Could not acquire permission to access camera",e),!1}}getDeviceId(){return this.deviceId}getStreamDeviceId(){return null!==this.stream?this.stream.getVideoTracks()[0].getSettings().deviceId:""}disconnectStream(){null!==this.stream&&(this.stream.getVideoTracks()[0].onended=void 0,this.stream=null,a.src=null,a.srcObject=null)}disconnect(){null!==this.stream&&(console.info("Disconnecting camera:",this.getStreamDeviceId()),this.disconnectStream())}connectTo(e){this.deviceId=e,this.disconnect(),this.tryReconnect().then()}async tryReconnect(){window.clearTimeout(this.reconnectionTimeout),this.reconnectionTimeout=0;const e=this.deviceId;console.info("Connecting to camera:",e);try{const t=await navigator.mediaDevices.getUserMedia({video:{...D,deviceId:{exact:e}}});this.deviceId===e&&this.handleConnected(t)}catch(e){console.warn(`Unable to connect to camera (${this.deviceId})`,e),console.info("Attempting reconnecting in 10000ms"),this.reconnectionTimeout=window.setTimeout((()=>this.tryReconnect()),1e4)}}static async handleDeviceChange(){const e=this.lastVideoDeviceInfos,t=await this.enumerate();if(console.info("Device list changed:",t),"function"==typeof this.ondevicechange)if(e.length!==t.length)this.ondevicechange();else for(const n of t){if(-1===e.findIndex((e=>e.deviceId===n.deviceId)))return void this.ondevicechange()}}handleConnected(e){null!==this.stream&&(this.stream.getVideoTracks()[0].onended=void 0),this.stream=e,console.info("Camera connected:",this.deviceId);const{width:t,height:n}=e.getVideoTracks()[0].getSettings();a.srcObject=e,a.width=t,a.height=n,e.getVideoTracks()[0].onended=()=>this.handleDisconnected()}handleDisconnected(){console.warn("Camera disconnected:",this.deviceId),this.disconnectStream(),this.tryReconnect().then()}applyTransforms(e){a.style.transform=function(e){const{translationX:t,translationY:n,rotation:i,scale:r,flipH:o,flipV:s}=e;let a="";return a+=` translate(${t}px,${n}px)`,a+=` rotate(${i}deg)`,a+=` scale(${r})`,a+=` scale(${o?-1:1},${s?-1:1})`,a=a.trim(),a}(e)}constructor(){this.deviceId="",this.reconnectionTimeout=0,this.stream=null,navigator.mediaDevices.addEventListener("devicechange",(async()=>{0!==this.reconnectionTimeout&&await this.tryReconnect()}))}}C.ondevicechange=void 0,C.lastVideoDeviceInfos=[],C.staticInitializer=(navigator.mediaDevices.addEventListener("devicechange",(()=>C.handleDeviceChange())),!0);var L={};function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function _(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,S(e,t)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n(L,"Idler",(function(){return re}),(function(e){return re=e})),n(L,"KeyboardInterrupter",(function(){return le}),(function(e){return le=e})),n(L,"PointerInterrupter",(function(){return fe}),(function(e){return fe=e}));var P,x,M,H=(M=(P={exports:{}}).exports,Object.defineProperty(M,"__esModule",{value:!0}),M.PerformanceObserver=M.performance=void 0,M.performance=window.performance,M.PerformanceObserver=window.PerformanceObserver,P.exports),N="object"==typeof Reflect?Reflect:null,F=N&&"function"==typeof N.apply?N.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};x=N&&"function"==typeof N.ownKeys?N.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var j=Number.isNaN||function(e){return e!=e};function A(){A.init.call(this)}var R=A;A.EventEmitter=A,A.prototype._events=void 0,A.prototype._eventsCount=0,A.prototype._maxListeners=void 0;var V=10;function q(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function z(e){return void 0===e._maxListeners?A.defaultMaxListeners:e._maxListeners}function $(e,t,n,i){var r,o,s;if(q(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=z(e))>0&&s.length>r&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=s.length,console&&console.warn&&console.warn(a)}return e}function Y(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function B(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=Y.bind(i);return r.listener=n,i.wrapFn=r,r}function U(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):X(r,r.length)}function K(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function X(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function J(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(o){i.once&&e.removeEventListener(t,r),n(o)}))}}Object.defineProperty(A,"defaultMaxListeners",{enumerable:!0,get:function(){return V},set:function(e){if("number"!=typeof e||e<0||j(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");V=e}}),A.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},A.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||j(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},A.prototype.getMaxListeners=function(){return z(this)},A.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var a=r[e];if(void 0===a)return!1;if("function"==typeof a)F(a,this,t);else{var c=a.length,u=X(a,c);for(n=0;n<c;++n)F(u[n],this,t)}return!0},A.prototype.on=A.prototype.addListener=function(e,t){return $(this,e,t,!1)},A.prototype.prependListener=function(e,t){return $(this,e,t,!0)},A.prototype.once=function(e,t){return q(t),this.on(e,B(this,e,t)),this},A.prototype.prependOnceListener=function(e,t){return q(t),this.prependListener(e,B(this,e,t)),this},A.prototype.off=A.prototype.removeListener=function(e,t){var n,i,r,o,s;if(q(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},A.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},A.prototype.listeners=function(e){return U(this,e,!0)},A.prototype.rawListeners=function(e){return U(this,e,!1)},A.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):K.call(e,t)},A.prototype.listenerCount=K,A.prototype.eventNames=function(){return this._eventsCount>0?x(this._events):[]},R.once=function(e,t){return new Promise((function(n,i){function r(n){e.removeListener(t,o),i(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}J(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&J(e,"error",t,{once:!0})}(e,r)}))};var W=setTimeout((function(){}),0),G=function(){function e(e,t,n,i,r,o){this.interruptHandler=this.interrupt.bind(this),this.interruptHandlerInternal=function(){},this.initialized=!1,this.idle=!1,this.idler=e,this.beginCb=t,this.delay=n,this.duration=i,this.endCb=void 0===r?function(){}:r,this.timeoutId=W,this.durationTimeoutId=W,this.startIdle=o,this.init()}var t=e.prototype;return t.init=function(){var e=this;this.initialized||(this.initialized=!0,this.idle=!1,this.timeoutId=this.startIdle?setTimeout((function(){return e.beginIdleModeCycle()}),0):setTimeout((function(){return e.testTimeout()}),0))},t.isInitialized=function(){return this.initialized},t.clear=function(){this.initialized&&(this.interrupt(),clearTimeout(this.timeoutId),this.initialized=!1)},t.isIdle=function(){return this.idle},t.interrupt=function(){this.interruptHandlerInternal()},t.testTimeout=function(){var e=this;if(this.isInitialized()){var t=this.idler.getIdleTime();t>=this.delay?this.beginIdleModeCycle():this.timeoutId=setTimeout((function(){return e.testTimeout()}),this.delay-t)}},t.beginIdleModeCycle=function(){var e=!1;this.interruptHandlerInternal=function(){e=!0},this.idler.on("interrupted",this.interruptHandler),this.beforeIdle(),this.idle=!0,this.beginCb(),e?this.endIdleModeCycle():this.interruptHandlerInternal=this.endIdleModeCycle.bind(this)},t.endIdleModeCycle=function(){var e=this;this.interruptHandlerInternal=function(){},this.idler.off("interrupted",this.interruptHandler),this.endCb(),this.idle=!1,this.afterIdle(),this.timeoutId=setTimeout((function(){return e.testTimeout()}),this.delay)},t.beforeIdle=function(){var e=this;Number.isFinite(this.duration)&&this.duration>=0&&(this.durationTimeoutId=setTimeout((function(){return e.interrupt()}),this.duration))},t.afterIdle=function(){clearTimeout(this.durationTimeoutId)},e}(),Q=setInterval((function(){}),0),Z=function(e){function t(t,n,i,r,o,s,a,c){var u;return(u=e.call(this,t,n,i,r,a,c)||this).intervalId=Q,u.intervalCb=o,u.interval=s,u}_(t,e);var n=t.prototype;return n.clear=function(){clearInterval(this.intervalId),e.prototype.clear.call(this)},n.beforeIdle=function(){e.prototype.beforeIdle.call(this),this.intervalId=setInterval(this.intervalCb,this.interval)},n.afterIdle=function(){clearInterval(this.intervalId),e.prototype.afterIdle.call(this)},t}(G),ee=requestAnimationFrame((function(){})),te=function(e){function t(t,n,i,r,o,s,a,c,u){var l;return(l=e.call(this,t,n,i,r,s,a,c,u)||this).animationFrameRequestId=ee,l.animateHandler=l.animate.bind(k(l)),l.animationCb=o,l}_(t,e);var n=t.prototype;return n.clear=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.clear.call(this)},n.beforeIdle=function(){e.prototype.beforeIdle.call(this),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},n.animate=function(e){this.animationCb(e),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},n.afterIdle=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.afterIdle.call(this)},t}(Z);function ne(){return H.performance.now()}var ie={delay:6e4,duration:Number.POSITIVE_INFINITY,onBegin:function(){},onEnd:function(){},interval:Number.POSITIVE_INFINITY,onInterval:function(){},onAnimate:function(){},immediate:!1},re=function(e){function t(){var t;return(t=e.call(this)||this).lastId=0,t.timers=new Map,t.lastEventTimestampMs=ne(),t.interruptHandler=t.interrupt.bind(k(t)),[].slice.call(arguments).forEach((function(e){return t.registerInterrupter(e)})),t}_(t,e);var n=t.prototype;return n.addCallback=function(e){if(void 0!==e.onAnimate){var t=O({},ie,e),n=new te(this,t.onBegin,t.delay,t.duration,t.onAnimate,t.onInterval,t.interval,t.onEnd,t.immediate);return this.addIdleTimeout(n)}if(void 0!==e.interval&&Number.isFinite(e.interval)){var i=O({},ie,e),r=new Z(this,i.onBegin,i.delay,i.duration,i.onInterval,i.interval,i.onEnd,i.immediate);return this.addIdleTimeout(r)}var o=O({},ie,e),s=new G(this,o.onBegin,o.delay,o.duration,o.onEnd,o.immediate);return this.addIdleTimeout(s)},n.addIdleTimeout=function(e){this.lastId+=1;var t=this.lastId;return this.timers.set(t,e),t},n.removeCallback=function(e){var t=this.timers.get(e);void 0!==t&&t.clear(),this.timers.delete(e)},n.clear=function(){this.timers.forEach((function(e){return e.clear()})),this.timers.clear()},n.interrupt=function(){this.lastEventTimestampMs=Math.max(ne(),this.lastEventTimestampMs),this.emit("interrupted")},n.getIdleTime=function(){return ne()-this.lastEventTimestampMs},n.registerInterrupter=function(e){return e.on("interrupted",this.interruptHandler),this},n.unregisterInterrupter=function(e){return e.off("interrupted",this.interruptHandler),this},t}(R.EventEmitter),oe=function(e){function t(){var t;return(t=e.call(this)||this).emitInterruptedHandler=t.emitInterrupted.bind(k(t)),t}return _(t,e),t.prototype.emitInterrupted=function(){this.emit("interrupted")},t}(R.EventEmitter);!function(e){function t(t){var n;return t((n=e.call(this)||this).emitInterruptedHandler),n}_(t,e)}(oe);function se(e){return void 0!==e.on&&void 0!==e.off}function ae(e){return null!=e&&"function"==typeof e[Symbol.iterator]}var ce=function(e){function t(t,n){var i,r,o;return(i=e.call(this)||this).eventEmitters=new Set,i.eventTypes=new Set,void 0!==t&&(ae(t)?(r=i).addEventEmitter.apply(r,t):i.addEventEmitter(t)),void 0!==n&&(ae(n)?(o=i).addEventType.apply(o,n):i.addEventType(n)),i}_(t,e);var n=t.prototype;return n.addEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach((function(t){if(!e.eventEmitters.has(t)){var n=e.wrapOn(t);e.eventTypes.forEach(n)}e.eventEmitters.add(t)})),this},n.removeEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach((function(t){if(e.eventEmitters.has(t)){var n=e.wrapOff(t);e.eventTypes.forEach(n)}e.eventEmitters.delete(t)})),this},n.hasEventEmitter=function(e){return this.eventEmitters.has(e)},n.addEventType=function(){var e=this;return[].slice.call(arguments).forEach((function(t){e.eventTypes.has(t)||e.eventEmitters.forEach((function(n){return e.wrapOn(n)(t)})),e.eventTypes.add(t)})),this},n.removeEventType=function(){var e=this;return[].slice.call(arguments).forEach((function(t){e.eventTypes.has(t)&&e.eventEmitters.forEach((function(n){return e.wrapOff(n)(t)})),e.eventTypes.delete(t)})),this},n.hasEventType=function(e){return this.eventTypes.has(e)},n.wrapOn=function(e){var t=this;return se(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},n.wrapOff=function(e){var t=this;return se(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},t}(oe),ue=["keydown","keyup"],le=function(e){function t(t){return void 0===t&&(t=[document]),e.call(this,t,ue)||this}return _(t,e),t}(ce),de=["pointerdown","pointermove","pointerup"],he=["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"],fe=function(e){function t(n){return void 0===n&&(n=[document]),e.call(this,n,t.getEventTypes())||this}return _(t,e),t.getEventTypes=function(){return"function"==typeof window.PointerEvent?de:he},t}(ce);class ve{static getDefaultDeviceId(){return""}static loadDeviceId(){var e;return null!==(e=localStorage.getItem("deviceId"))&&void 0!==e?e:this.getDefaultDeviceId()}static storeDeviceId(e){const t="string"==typeof e?e:e.getVideoTracks()[0].getSettings().deviceId;return localStorage.setItem("deviceId",t),e}static resetDeviceId(){this.storeDeviceId(this.getDefaultDeviceId())}static getDefaultTransforms(){return{translationX:0,translationY:0,rotation:0,scale:1,flipH:!1,flipV:!1}}static loadTransforms(){try{const e=localStorage.getItem("transforms"),t=JSON.parse(e);return{...this.getDefaultTransforms(),...t}}catch(e){return console.log(e),this.getDefaultTransforms()}}static storeTransforms(e){return localStorage.setItem("transforms",JSON.stringify(e)),e}static resetTransforms(){this.storeTransforms(this.getDefaultTransforms())}static reset(e){(e={deviceId:!0,transforms:!0,...e}).deviceId&&ve.resetDeviceId(),e.transforms&&ve.resetTransforms()}}class me{getDeviceId(){return this.deviceId}setDeviceId(e){const t="string"==typeof e?e:e.getVideoTracks()[0].getSettings().deviceId;return c.value=t,this.deviceId=t,this.camera.connectTo(t),e}loadDefaultDeviceId(){const e=ve.getDefaultDeviceId();return this.setDeviceId(e),e}loadDeviceId(){const e=ve.loadDeviceId();return this.setDeviceId(e),e}storeDeviceId(){ve.storeDeviceId(this.getDeviceId())}getTransforms(){return{...this.transforms}}setTransforms(e){const{translationX:t,translationY:n,rotation:i,scale:r,flipH:o,flipV:s}=e;return h.valueAsNumber=t,f.valueAsNumber=n,d.valueAsNumber=i,l.valueAsNumber=r,v.checked=o,m.checked=s,this.transforms=e,this.camera.applyTransforms(e),e}loadDefaultTransforms(){const e=ve.getDefaultTransforms();return this.setTransforms(e),e}loadTransforms(){const e=ve.loadTransforms();return this.setTransforms(e),e}storeTransforms(){ve.storeTransforms(this.getTransforms())}async updateCameraSelector(e){for(;c.children.length>0;)c.removeChild(c.children[c.children.length-1]);function t(e,t){const n=document.createElement("option");return n.value=e,n.innerText=`${t}`,""!==e&&(n.innerText+=`(${e})`),n}const n=this.getDeviceId();let i=!1;for(let r of e){i=i||r.deviceId===n;const e=t(r.deviceId,r.label);c.appendChild(e)}if(!i){const e=t(n,n===ve.getDefaultDeviceId()?"--- please select ---":"--- selected, but unavailable ---");c.appendChild(e)}c.value=n}getStorageFlags(){return{camera:g.checked,transforms:y.checked}}loadDefaults(){const{camera:e,transforms:t}=this.getStorageFlags();e&&this.loadDefaultDeviceId(),t&&this.loadDefaultTransforms()}load(){const{camera:e,transforms:t}=this.getStorageFlags();e&&this.loadDeviceId(),t&&this.loadTransforms()}store(){const{camera:e,transforms:t}=this.getStorageFlags();e&&this.storeDeviceId(),t&&this.storeTransforms()}async onDeviceChange(){await this.updateCameraSelector(await C.enumerate())}async handleCameraSelected(){this.setDeviceId(c.value)}handleTransformsChanged(){const e={translationX:h.valueAsNumber,translationY:f.valueAsNumber,rotation:d.valueAsNumber,scale:l.valueAsNumber,flipH:v.checked,flipV:m.checked};this.setTransforms(e)}async handleRequestCameraPermission(){u.disabled=!0,u.classList.remove("failed","succeeded");const e=await C.requestPermission(),t=e?"succeeded":"failed";u.classList.add(t),e&&await this.updateCameraSelector(await C.enumerate()),u.disabled=!1}isVisible(){return"block"===s.style.display}show(e){this.idler.interrupt(),s.style.display=e?"block":"none"}toggle(){this.show(!this.isVisible())}static async getInstance(){return this.instancePromise||(this.instancePromise=new Promise((async(e,t)=>{const n=new me;await n.updateCameraSelector(await C.enumerate()),e(n)}))),await this.instancePromise}constructor(){C.ondevicechange=()=>this.onDeviceChange(),this.camera=new C,this.loadTransforms(),this.loadDeviceId();const e=()=>this.handleTransformsChanged();for(const t of p)t.onchange=e,t.oninput=e;o.onclick=()=>this.toggle(),w.onclick=()=>this.show(!1),E.onclick=()=>location.reload(),I.onclick=()=>this.load(),b.onclick=()=>this.store(),T.onclick=()=>this.loadDefaults(),c.onchange=()=>this.handleCameraSelected(),u.onclick=async()=>this.handleRequestCameraPermission();this.idler=new L.Idler(new L.PointerInterrupter(s),new L.KeyboardInterrupter),this.idler.addCallback({delay:2e4,onBegin:()=>this.show(!1)})}}me.instancePromise=null,t(i)((async function(){const t=await me.getInstance();e.configMenu=t}));
//# sourceMappingURL=index.bd7efa68.js.map
