/*! For license information please see 714.f7b9529c.chunk.js.LICENSE.txt */
(self.webpackChunkabsensi_frontend=self.webpackChunkabsensi_frontend||[]).push([[714],{6101:function(e,t,i){!function(e){"use strict";e.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"siang"===t?e>=11?e:e+12:"sore"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,i){return e<11?"pagi":e<15?"siang":e<19?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",ss:"%d detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:0,doy:6}})}(i(9051))},8825:(e,t,i)=>{"use strict";i.d(t,{A:()=>a});class n{constructor(e,t,i,a,r){this._legacyCanvasSize=n.DEFAULT_CANVAS_SIZE,this._preferredCamera="environment",this._maxScansPerSecond=25,this._lastScanTimestamp=-1,this._destroyed=this._flashOn=this._paused=this._active=!1,this.$video=e,this.$canvas=document.createElement("canvas"),i&&"object"===typeof i?this._onDecode=t:(i||a||r?console.warn("You're using a deprecated version of the QrScanner constructor which will be removed in the future"):console.warn("Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),this._legacyOnDecode=t),t="object"===typeof i?i:{},this._onDecodeError=t.onDecodeError||("function"===typeof i?i:this._onDecodeError),this._calculateScanRegion=t.calculateScanRegion||("function"===typeof a?a:this._calculateScanRegion),this._preferredCamera=t.preferredCamera||r||this._preferredCamera,this._legacyCanvasSize="number"===typeof i?i:"number"===typeof a?a:this._legacyCanvasSize,this._maxScansPerSecond=t.maxScansPerSecond||this._maxScansPerSecond,this._onPlay=this._onPlay.bind(this),this._onLoadedMetaData=this._onLoadedMetaData.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),this._updateOverlay=this._updateOverlay.bind(this),e.disablePictureInPicture=!0,e.playsInline=!0,e.muted=!0;let s=!1;if(e.hidden&&(e.hidden=!1,s=!0),document.body.contains(e)||(document.body.appendChild(e),s=!0),i=e.parentElement,t.highlightScanRegion||t.highlightCodeOutline){if(a=!!t.overlay,this.$overlay=t.overlay||document.createElement("div"),(r=this.$overlay.style).position="absolute",r.display="none",r.pointerEvents="none",this.$overlay.classList.add("scan-region-highlight"),!a&&t.highlightScanRegion){this.$overlay.innerHTML='<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';try{this.$overlay.firstElementChild.animate({transform:["scale(.98)","scale(1.01)"]},{duration:400,iterations:1/0,direction:"alternate",easing:"ease-in-out"})}catch(o){}i.insertBefore(this.$overlay,this.$video.nextSibling)}t.highlightCodeOutline&&(this.$overlay.insertAdjacentHTML("beforeend",'<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'),this.$codeOutlineHighlight=this.$overlay.lastElementChild)}this._scanRegion=this._calculateScanRegion(e),requestAnimationFrame((()=>{let t=window.getComputedStyle(e);"none"===t.display&&(e.style.setProperty("display","block","important"),s=!0),"visible"!==t.visibility&&(e.style.setProperty("visibility","visible","important"),s=!0),s&&(console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."),e.style.opacity="0",e.style.width="0",e.style.height="0",this.$overlay&&this.$overlay.parentElement&&this.$overlay.parentElement.removeChild(this.$overlay),delete this.$overlay,delete this.$codeOutlineHighlight),this.$overlay&&this._updateOverlay()})),e.addEventListener("play",this._onPlay),e.addEventListener("loadedmetadata",this._onLoadedMetaData),document.addEventListener("visibilitychange",this._onVisibilityChange),window.addEventListener("resize",this._updateOverlay),this._qrEnginePromise=n.createQrEngine()}static set WORKER_PATH(e){console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.")}static async hasCamera(){try{return!!(await n.listCameras(!1)).length}catch(e){return!1}}static async listCameras(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!navigator.mediaDevices)return[];let t,i=async()=>(await navigator.mediaDevices.enumerateDevices()).filter((e=>"videoinput"===e.kind));try{e&&(await i()).every((e=>!e.label))&&(t=await navigator.mediaDevices.getUserMedia({audio:!1,video:!0}))}catch(a){}try{return(await i()).map(((e,t)=>({id:e.deviceId,label:e.label||(0===t?"Default Camera":"Camera ".concat(t+1))})))}finally{t&&(console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"),n._stopVideoStream(t))}}async hasFlash(){let e;try{if(this.$video.srcObject){if(!(this.$video.srcObject instanceof MediaStream))return!1;e=this.$video.srcObject}else e=(await this._getCameraStream()).stream;return"torch"in e.getVideoTracks()[0].getSettings()}catch(t){return!1}finally{e&&e!==this.$video.srcObject&&(console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"),n._stopVideoStream(e))}}isFlashOn(){return this._flashOn}async toggleFlash(){this._flashOn?await this.turnFlashOff():await this.turnFlashOn()}async turnFlashOn(){if(!this._flashOn&&!this._destroyed&&(this._flashOn=!0,this._active&&!this._paused))try{if(!await this.hasFlash())throw"No flash available";await this.$video.srcObject.getVideoTracks()[0].applyConstraints({advanced:[{torch:!0}]})}catch(e){throw this._flashOn=!1,e}}async turnFlashOff(){this._flashOn&&(this._flashOn=!1,await this._restartVideoStream())}destroy(){this.$video.removeEventListener("loadedmetadata",this._onLoadedMetaData),this.$video.removeEventListener("play",this._onPlay),document.removeEventListener("visibilitychange",this._onVisibilityChange),window.removeEventListener("resize",this._updateOverlay),this._destroyed=!0,this._flashOn=!1,this.stop(),n._postWorkerMessage(this._qrEnginePromise,"close")}async start(){if(this._destroyed)throw Error("The QR scanner can not be started as it had been destroyed.");if((!this._active||this._paused)&&("https:"!==window.location.protocol&&console.warn("The camera stream is only accessible if the page is transferred via https."),this._active=!0,!document.hidden))if(this._paused=!1,this.$video.srcObject)await this.$video.play();else try{let{stream:e,facingMode:t}=await this._getCameraStream();!this._active||this._paused?n._stopVideoStream(e):(this._setVideoMirror(t),this.$video.srcObject=e,await this.$video.play(),this._flashOn&&(this._flashOn=!1,this.turnFlashOn().catch((()=>{}))))}catch(e){if(!this._paused)throw this._active=!1,e}}stop(){this.pause(),this._active=!1}async pause(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this._paused=!0,!this._active)return!0;this.$video.pause(),this.$overlay&&(this.$overlay.style.display="none");let t=()=>{this.$video.srcObject instanceof MediaStream&&(n._stopVideoStream(this.$video.srcObject),this.$video.srcObject=null)};return e?(t(),!0):(await new Promise((e=>setTimeout(e,300))),!!this._paused&&(t(),!0))}async setCamera(e){e!==this._preferredCamera&&(this._preferredCamera=e,await this._restartVideoStream())}static async scanImage(e,t,i,a){let r,s=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]&&arguments[5],l=!1;t&&("scanRegion"in t||"qrEngine"in t||"canvas"in t||"disallowCanvasResizing"in t||"alsoTryWithoutScanRegion"in t||"returnDetailedScanResult"in t)?(r=t.scanRegion,i=t.qrEngine,a=t.canvas,s=t.disallowCanvasResizing||!1,o=t.alsoTryWithoutScanRegion||!1,l=!0):t||i||a||s||o?console.warn("You're using a deprecated api for scanImage which will be removed in the future."):console.warn("Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),t=!!i;try{let c,h,d;if([i,c]=await Promise.all([i||n.createQrEngine(),n._loadImage(e)]),[a,h]=n._drawToCanvas(c,r,a,s),i instanceof Worker){let e=i;t||n._postWorkerMessageSync(e,"inversionMode","both"),d=await new Promise(((t,i)=>{let s,o,l,c=-1;o=a=>{a.data.id===c&&(e.removeEventListener("message",o),e.removeEventListener("error",l),clearTimeout(s),null!==a.data.data?t({data:a.data.data,cornerPoints:n._convertPoints(a.data.cornerPoints,r)}):i(n.NO_QR_CODE_FOUND))},l=t=>{e.removeEventListener("message",o),e.removeEventListener("error",l),clearTimeout(s),i("Scanner error: "+(t?t.message||t:"Unknown Error"))},e.addEventListener("message",o),e.addEventListener("error",l),s=setTimeout((()=>l("timeout")),1e4);let d=h.getImageData(0,0,a.width,a.height);c=n._postWorkerMessageSync(e,"decode",d,[d.data.buffer])}))}else d=await Promise.race([new Promise(((e,t)=>window.setTimeout((()=>t("Scanner error: timeout")),1e4))),(async()=>{try{var[t]=await i.detect(a);if(!t)throw n.NO_QR_CODE_FOUND;return{data:t.rawValue,cornerPoints:n._convertPoints(t.cornerPoints,r)}}catch(l){if(t=l.message||l,/not implemented|service unavailable/.test(t))return n._disableBarcodeDetector=!0,n.scanImage(e,{scanRegion:r,canvas:a,disallowCanvasResizing:s,alsoTryWithoutScanRegion:o});throw"Scanner error: ".concat(t)}})()]);return l?d:d.data}catch(c){if(!r||!o)throw c;let t=await n.scanImage(e,{qrEngine:i,canvas:a,disallowCanvasResizing:s});return l?t:t.data}finally{t||n._postWorkerMessage(i,"close")}}setGrayscaleWeights(e,t,i){let a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];n._postWorkerMessage(this._qrEnginePromise,"grayscaleWeights",{red:e,green:t,blue:i,useIntegerApproximation:a})}setInversionMode(e){n._postWorkerMessage(this._qrEnginePromise,"inversionMode",e)}static async createQrEngine(e){if(e&&console.warn("Specifying a worker path is not required and not supported anymore."),e=()=>i.e(544).then(i.bind(i,1544)).then((e=>e.createWorker())),n._disableBarcodeDetector||!("BarcodeDetector"in window)||!BarcodeDetector.getSupportedFormats||!(await BarcodeDetector.getSupportedFormats()).includes("qr_code"))return e();let t=navigator.userAgentData;return t&&t.brands.some((e=>{let{brand:t}=e;return/Chromium/i.test(t)}))&&/mac ?OS/i.test(t.platform)&&await t.getHighEntropyValues(["architecture","platformVersion"]).then((e=>{let{architecture:t,platformVersion:i}=e;return/arm/i.test(t||"arm")&&13<=parseInt(i||"13")})).catch((()=>!0))?e():new BarcodeDetector({formats:["qr_code"]})}_onPlay(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay(),this.$overlay&&(this.$overlay.style.display=""),this._scanFrame()}_onLoadedMetaData(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay()}_onVisibilityChange(){document.hidden?this.pause():this._active&&this.start()}_calculateScanRegion(e){let t=Math.round(2/3*Math.min(e.videoWidth,e.videoHeight));return{x:Math.round((e.videoWidth-t)/2),y:Math.round((e.videoHeight-t)/2),width:t,height:t,downScaledWidth:this._legacyCanvasSize,downScaledHeight:this._legacyCanvasSize}}_updateOverlay(){requestAnimationFrame((()=>{if(this.$overlay){var e=this.$video,t=e.videoWidth,i=e.videoHeight,n=e.offsetWidth,a=e.offsetHeight,r=e.offsetLeft,s=e.offsetTop,o=window.getComputedStyle(e),l=o.objectFit,c=t/i,h=n/a;switch(l){case"none":var d=t,u=i;break;case"fill":d=n,u=a;break;default:("cover"===l?c>h:c<h)?d=(u=a)*c:u=(d=n)/c,"scale-down"===l&&(d=Math.min(d,t),u=Math.min(u,i))}var[g,m]=o.objectPosition.split(" ").map(((e,t)=>{const i=parseFloat(e);return e.endsWith("%")?(t?a-u:n-d)*i/100:i}));o=this._scanRegion.width||t,h=this._scanRegion.height||i,l=this._scanRegion.x||0;var f=this._scanRegion.y||0;(c=this.$overlay.style).width="".concat(o/t*d,"px"),c.height="".concat(h/i*u,"px"),c.top="".concat(s+m+f/i*u,"px"),i=/scaleX\(-1\)/.test(e.style.transform),c.left="".concat(r+(i?n-g-d:g)+(i?t-l-o:l)/t*d,"px"),c.transform=e.style.transform}}))}static _convertPoints(e,t){if(!t)return e;let i=t.x||0,n=t.y||0,a=t.width&&t.downScaledWidth?t.width/t.downScaledWidth:1;t=t.height&&t.downScaledHeight?t.height/t.downScaledHeight:1;for(let r of e)r.x=r.x*a+i,r.y=r.y*t+n;return e}_scanFrame(){!this._active||this.$video.paused||this.$video.ended||("requestVideoFrameCallback"in this.$video?this.$video.requestVideoFrameCallback.bind(this.$video):requestAnimationFrame)((async()=>{if(!(1>=this.$video.readyState)){var e=Date.now()-this._lastScanTimestamp,t=1e3/this._maxScansPerSecond;e<t&&await new Promise((i=>setTimeout(i,t-e))),this._lastScanTimestamp=Date.now();try{var i=await n.scanImage(this.$video,{scanRegion:this._scanRegion,qrEngine:this._qrEnginePromise,canvas:this.$canvas})}catch(a){if(!this._active)return;this._onDecodeError(a)}!n._disableBarcodeDetector||await this._qrEnginePromise instanceof Worker||(this._qrEnginePromise=n.createQrEngine()),i?(this._onDecode?this._onDecode(i):this._legacyOnDecode&&this._legacyOnDecode(i.data),this.$codeOutlineHighlight&&(clearTimeout(this._codeOutlineHighlightRemovalTimeout),this._codeOutlineHighlightRemovalTimeout=void 0,this.$codeOutlineHighlight.setAttribute("viewBox","".concat(this._scanRegion.x||0," ")+"".concat(this._scanRegion.y||0," ")+"".concat(this._scanRegion.width||this.$video.videoWidth," ")+"".concat(this._scanRegion.height||this.$video.videoHeight)),this.$codeOutlineHighlight.firstElementChild.setAttribute("points",i.cornerPoints.map((e=>{let{x:t,y:i}=e;return"".concat(t,",").concat(i)})).join(" ")),this.$codeOutlineHighlight.style.display="")):this.$codeOutlineHighlight&&!this._codeOutlineHighlightRemovalTimeout&&(this._codeOutlineHighlightRemovalTimeout=setTimeout((()=>this.$codeOutlineHighlight.style.display="none"),100))}this._scanFrame()}))}_onDecodeError(e){e!==n.NO_QR_CODE_FOUND&&console.log(e)}async _getCameraStream(){if(!navigator.mediaDevices)throw"Camera not found.";let e=/^(environment|user)$/.test(this._preferredCamera)?"facingMode":"deviceId",t=[{width:{min:1024}},{width:{min:768}},{}],i=t.map((t=>Object.assign({},t,{[e]:{exact:this._preferredCamera}})));for(let a of[...i,...t])try{let e=await navigator.mediaDevices.getUserMedia({video:a,audio:!1});return{stream:e,facingMode:this._getFacingMode(e)||(a.facingMode?this._preferredCamera:"environment"===this._preferredCamera?"user":"environment")}}catch(n){}throw"Camera not found."}async _restartVideoStream(){let e=this._paused;await this.pause(!0)&&!e&&this._active&&await this.start()}static _stopVideoStream(e){for(let t of e.getTracks())t.stop(),e.removeTrack(t)}_setVideoMirror(e){this.$video.style.transform="scaleX("+("user"===e?-1:1)+")"}_getFacingMode(e){return(e=e.getVideoTracks()[0])?/rear|back|environment/i.test(e.label)?"environment":/front|user|face/i.test(e.label)?"user":null:null}static _drawToCanvas(e,t,i){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];i=i||document.createElement("canvas");let a=t&&t.x?t.x:0,r=t&&t.y?t.y:0,s=t&&t.width?t.width:e.videoWidth||e.width,o=t&&t.height?t.height:e.videoHeight||e.height;return n||(n=t&&t.downScaledWidth?t.downScaledWidth:s,t=t&&t.downScaledHeight?t.downScaledHeight:o,i.width!==n&&(i.width=n),i.height!==t&&(i.height=t)),(t=i.getContext("2d",{alpha:!1})).imageSmoothingEnabled=!1,t.drawImage(e,a,r,s,o,0,0,i.width,i.height),[i,t]}static async _loadImage(e){if(e instanceof Image)return await n._awaitImageLoad(e),e;if(e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement||e instanceof SVGImageElement||"OffscreenCanvas"in window&&e instanceof OffscreenCanvas||"ImageBitmap"in window&&e instanceof ImageBitmap)return e;if(!(e instanceof File||e instanceof Blob||e instanceof URL||"string"===typeof e))throw"Unsupported image type.";{let t=new Image;t.src=e instanceof File||e instanceof Blob?URL.createObjectURL(e):e.toString();try{return await n._awaitImageLoad(t),t}finally{(e instanceof File||e instanceof Blob)&&URL.revokeObjectURL(t.src)}}}static async _awaitImageLoad(e){e.complete&&0!==e.naturalWidth||await new Promise(((t,i)=>{let n=a=>{e.removeEventListener("load",n),e.removeEventListener("error",n),a instanceof ErrorEvent?i("Image load error"):t()};e.addEventListener("load",n),e.addEventListener("error",n)}))}static async _postWorkerMessage(e,t,i,a){return n._postWorkerMessageSync(await e,t,i,a)}static _postWorkerMessageSync(e,t,i,a){if(!(e instanceof Worker))return-1;let r=n._workerMessageId++;return e.postMessage({id:r,type:t,data:i},a),r}}n.DEFAULT_CANVAS_SIZE=400,n.NO_QR_CODE_FOUND="No QR code found",n._disableBarcodeDetector=!1,n._workerMessageId=0;const a=n},6882:(e,t,i)=>{"use strict";i.d(t,{A:()=>y});var n=i(9950),a=i(1942),r=i.n(a),s=i(8738),o=i.n(s),l=i(1497),c=i(7314),h=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},d.apply(this,arguments)}function u(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function g(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?u(Object(i),!0).forEach((function(t){m(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function m(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function f(e,t){if(null==e)return{};var i,n,a=function(e,t){if(null==e)return{};var i,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var v={children:r().node,className:r().string,closeClassName:r().string,closeAriaLabel:r().string,color:r().string,cssModule:r().object,fade:r().bool,innerRef:r().oneOfType([r().object,r().string,r().func]),isOpen:r().bool,tag:l.Wx,toggle:r().func,transition:r().shape(c.A.propTypes)};function p(e){var t=e.className,i=e.closeClassName,a=e.closeAriaLabel,r=void 0===a?"Close":a,s=e.cssModule,u=e.tag,m=void 0===u?"div":u,v=e.color,p=void 0===v?"success":v,y=e.isOpen,_=void 0===y||y,w=e.toggle,b=e.children,E=e.transition,M=void 0===E?g(g({},c.A.defaultProps),{},{unmountOnExit:!0}):E,O=e.fade,C=void 0===O||O,S=e.innerRef,R=f(e,h),P=(0,l.qO)(o()(t,"alert","alert-".concat(p),{"alert-dismissible":w}),s),L=(0,l.qO)(o()("btn-close",i),s),A=g(g(g({},c.A.defaultProps),M),{},{baseClass:C?M.baseClass:"",timeout:C?M.timeout:0});return n.createElement(c.A,d({},R,A,{tag:m,className:P,in:_,role:"alert",innerRef:S}),w?n.createElement("button",{type:"button",className:L,"aria-label":r,onClick:w}):null,b)}p.propTypes=v;const y=p},4209:(e,t,i)=>{"use strict";i.d(t,{A:()=>m});var n=i(9950),a=i(1942),r=i.n(a),s=i(8738),o=i.n(s),l=i(1497),c=["className","cssModule","type","size","color","children","tag"];function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},h.apply(this,arguments)}function d(e,t){if(null==e)return{};var i,n,a=function(e,t){if(null==e)return{};var i,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var u={tag:l.Wx,type:r().oneOf(["border","grow"]),size:r().oneOf(["sm"]),color:r().oneOf(["primary","secondary","success","danger","warning","info","light","dark"]),className:r().string,cssModule:r().object,children:r().string};function g(e){var t=e.className,i=e.cssModule,a=e.type,r=void 0===a?"border":a,s=e.size,u=e.color,g=e.children,m=void 0===g?"Loading...":g,f=e.tag,v=void 0===f?"div":f,p=d(e,c),y=(0,l.qO)(o()(t,!!s&&"spinner-".concat(r,"-").concat(s),"spinner-".concat(r),!!u&&"text-".concat(u)),i);return n.createElement(v,h({role:"status"},p,{className:y}),m&&n.createElement("span",{className:(0,l.qO)("visually-hidden",i)},m))}g.propTypes=u;const m=g},9163:(e,t,i)=>{"use strict";i.d(t,{h:()=>O});var n,a=i(9950),r=Object.defineProperty,s=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,c=(e,t,i)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,h=(e,t)=>{for(var i in t||(t={}))o.call(t,i)&&c(e,i,t[i]);if(s)for(var i of s(t))l.call(t,i)&&c(e,i,t[i]);return e},d=(e,t)=>{var i={};for(var n in e)o.call(e,n)&&t.indexOf(n)<0&&(i[n]=e[n]);if(null!=e&&s)for(var n of s(e))t.indexOf(n)<0&&l.call(e,n)&&(i[n]=e[n]);return i};(e=>{const t=class t{constructor(e,i,n,r){if(this.version=e,this.errorCorrectionLevel=i,this.modules=[],this.isFunction=[],e<t.MIN_VERSION||e>t.MAX_VERSION)throw new RangeError("Version value out of range");if(r<-1||r>7)throw new RangeError("Mask value out of range");this.size=4*e+17;let s=[];for(let t=0;t<this.size;t++)s.push(!1);for(let t=0;t<this.size;t++)this.modules.push(s.slice()),this.isFunction.push(s.slice());this.drawFunctionPatterns();const o=this.addEccAndInterleave(n);if(this.drawCodewords(o),-1==r){let e=1e9;for(let t=0;t<8;t++){this.applyMask(t),this.drawFormatBits(t);const i=this.getPenaltyScore();i<e&&(r=t,e=i),this.applyMask(t)}}a(0<=r&&r<=7),this.mask=r,this.applyMask(r),this.drawFormatBits(r),this.isFunction=[]}static encodeText(i,n){const a=e.QrSegment.makeSegments(i);return t.encodeSegments(a,n)}static encodeBinary(i,n){const a=e.QrSegment.makeBytes(i);return t.encodeSegments([a],n)}static encodeSegments(e,n){let r,o,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:40,h=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1,d=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];if(!(t.MIN_VERSION<=l&&l<=c&&c<=t.MAX_VERSION)||h<-1||h>7)throw new RangeError("Invalid value");for(r=l;;r++){const i=8*t.getNumDataCodewords(r,n),a=s.getTotalBits(e,r);if(a<=i){o=a;break}if(r>=c)throw new RangeError("Data too long")}for(const i of[t.Ecc.MEDIUM,t.Ecc.QUARTILE,t.Ecc.HIGH])d&&o<=8*t.getNumDataCodewords(r,i)&&(n=i);let u=[];for(const t of e){i(t.mode.modeBits,4,u),i(t.numChars,t.mode.numCharCountBits(r),u);for(const e of t.getData())u.push(e)}a(u.length==o);const g=8*t.getNumDataCodewords(r,n);a(u.length<=g),i(0,Math.min(4,g-u.length),u),i(0,(8-u.length%8)%8,u),a(u.length%8==0);for(let t=236;u.length<g;t^=253)i(t,8,u);let m=[];for(;8*m.length<u.length;)m.push(0);return u.forEach(((e,t)=>m[t>>>3]|=e<<7-(7&t))),new t(r,n,m,h)}getModule(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let i=0;i<this.size;i++)this.setFunctionModule(6,i,i%2==0),this.setFunctionModule(i,6,i%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),t=e.length;for(let i=0;i<t;i++)for(let n=0;n<t;n++)0==i&&0==n||0==i&&n==t-1||i==t-1&&0==n||this.drawAlignmentPattern(e[i],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const t=this.errorCorrectionLevel.formatBits<<3|e;let i=t;for(let n=0;n<10;n++)i=i<<1^1335*(i>>>9);const r=21522^(t<<10|i);a(r>>>15==0);for(let a=0;a<=5;a++)this.setFunctionModule(8,a,n(r,a));this.setFunctionModule(8,7,n(r,6)),this.setFunctionModule(8,8,n(r,7)),this.setFunctionModule(7,8,n(r,8));for(let a=9;a<15;a++)this.setFunctionModule(14-a,8,n(r,a));for(let a=0;a<8;a++)this.setFunctionModule(this.size-1-a,8,n(r,a));for(let a=8;a<15;a++)this.setFunctionModule(8,this.size-15+a,n(r,a));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let i=0;i<12;i++)e=e<<1^7973*(e>>>11);const t=this.version<<12|e;a(t>>>18==0);for(let i=0;i<18;i++){const e=n(t,i),a=this.size-11+i%3,r=Math.floor(i/3);this.setFunctionModule(a,r,e),this.setFunctionModule(r,a,e)}}drawFinderPattern(e,t){for(let i=-4;i<=4;i++)for(let n=-4;n<=4;n++){const a=Math.max(Math.abs(n),Math.abs(i)),r=e+n,s=t+i;0<=r&&r<this.size&&0<=s&&s<this.size&&this.setFunctionModule(r,s,2!=a&&4!=a)}}drawAlignmentPattern(e,t){for(let i=-2;i<=2;i++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,t+i,1!=Math.max(Math.abs(n),Math.abs(i)))}setFunctionModule(e,t,i){this.modules[t][e]=i,this.isFunction[t][e]=!0}addEccAndInterleave(e){const i=this.version,n=this.errorCorrectionLevel;if(e.length!=t.getNumDataCodewords(i,n))throw new RangeError("Invalid argument");const r=t.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][i],s=t.ECC_CODEWORDS_PER_BLOCK[n.ordinal][i],o=Math.floor(t.getNumRawDataModules(i)/8),l=r-o%r,c=Math.floor(o/r);let h=[];const d=t.reedSolomonComputeDivisor(s);for(let a=0,g=0;a<r;a++){let i=e.slice(g,g+c-s+(a<l?0:1));g+=i.length;const n=t.reedSolomonComputeRemainder(i,d);a<l&&i.push(0),h.push(i.concat(n))}let u=[];for(let t=0;t<h[0].length;t++)h.forEach(((e,i)=>{(t!=c-s||i>=l)&&u.push(e[t])}));return a(u.length==o),u}drawCodewords(e){if(e.length!=Math.floor(t.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let i=0;for(let t=this.size-1;t>=1;t-=2){6==t&&(t=5);for(let a=0;a<this.size;a++)for(let r=0;r<2;r++){const s=t-r,o=0==(t+1&2)?this.size-1-a:a;!this.isFunction[o][s]&&i<8*e.length&&(this.modules[o][s]=n(e[i>>>3],7-(7&i)),i++)}}a(i==8*e.length)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let i=0;i<this.size;i++){let n;switch(e){case 0:n=(i+t)%2==0;break;case 1:n=t%2==0;break;case 2:n=i%3==0;break;case 3:n=(i+t)%3==0;break;case 4:n=(Math.floor(i/3)+Math.floor(t/2))%2==0;break;case 5:n=i*t%2+i*t%3==0;break;case 6:n=(i*t%2+i*t%3)%2==0;break;case 7:n=((i+t)%2+i*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][i]&&n&&(this.modules[t][i]=!this.modules[t][i])}}getPenaltyScore(){let e=0;for(let a=0;a<this.size;a++){let i=!1,n=0,r=[0,0,0,0,0,0,0];for(let s=0;s<this.size;s++)this.modules[a][s]==i?(n++,5==n?e+=t.PENALTY_N1:n>5&&e++):(this.finderPenaltyAddHistory(n,r),i||(e+=this.finderPenaltyCountPatterns(r)*t.PENALTY_N3),i=this.modules[a][s],n=1);e+=this.finderPenaltyTerminateAndCount(i,n,r)*t.PENALTY_N3}for(let a=0;a<this.size;a++){let i=!1,n=0,r=[0,0,0,0,0,0,0];for(let s=0;s<this.size;s++)this.modules[s][a]==i?(n++,5==n?e+=t.PENALTY_N1:n>5&&e++):(this.finderPenaltyAddHistory(n,r),i||(e+=this.finderPenaltyCountPatterns(r)*t.PENALTY_N3),i=this.modules[s][a],n=1);e+=this.finderPenaltyTerminateAndCount(i,n,r)*t.PENALTY_N3}for(let a=0;a<this.size-1;a++)for(let i=0;i<this.size-1;i++){const n=this.modules[a][i];n==this.modules[a][i+1]&&n==this.modules[a+1][i]&&n==this.modules[a+1][i+1]&&(e+=t.PENALTY_N2)}let i=0;for(const t of this.modules)i=t.reduce(((e,t)=>e+(t?1:0)),i);const n=this.size*this.size,r=Math.ceil(Math.abs(20*i-10*n)/n)-1;return a(0<=r&&r<=9),e+=r*t.PENALTY_N4,a(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(1==this.version)return[];{const e=Math.floor(this.version/7)+2,t=32==this.version?26:2*Math.ceil((4*this.version+4)/(2*e-2));let i=[6];for(let n=this.size-7;i.length<e;n-=t)i.splice(1,0,n);return i}}static getNumRawDataModules(e){if(e<t.MIN_VERSION||e>t.MAX_VERSION)throw new RangeError("Version number out of range");let i=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;i-=(25*t-10)*t-55,e>=7&&(i-=36)}return a(208<=i&&i<=29648),i}static getNumDataCodewords(e,i){return Math.floor(t.getNumRawDataModules(e)/8)-t.ECC_CODEWORDS_PER_BLOCK[i.ordinal][e]*t.NUM_ERROR_CORRECTION_BLOCKS[i.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let i=[];for(let t=0;t<e-1;t++)i.push(0);i.push(1);let n=1;for(let a=0;a<e;a++){for(let e=0;e<i.length;e++)i[e]=t.reedSolomonMultiply(i[e],n),e+1<i.length&&(i[e]^=i[e+1]);n=t.reedSolomonMultiply(n,2)}return i}static reedSolomonComputeRemainder(e,i){let n=i.map((e=>0));for(const a of e){const e=a^n.shift();n.push(0),i.forEach(((i,a)=>n[a]^=t.reedSolomonMultiply(i,e)))}return n}static reedSolomonMultiply(e,t){if(e>>>8!=0||t>>>8!=0)throw new RangeError("Byte out of range");let i=0;for(let n=7;n>=0;n--)i=i<<1^285*(i>>>7),i^=(t>>>n&1)*e;return a(i>>>8==0),i}finderPenaltyCountPatterns(e){const t=e[1];a(t<=3*this.size);const i=t>0&&e[2]==t&&e[3]==3*t&&e[4]==t&&e[5]==t;return(i&&e[0]>=4*t&&e[6]>=t?1:0)+(i&&e[6]>=4*t&&e[0]>=t?1:0)}finderPenaltyTerminateAndCount(e,t,i){return e&&(this.finderPenaltyAddHistory(t,i),t=0),t+=this.size,this.finderPenaltyAddHistory(t,i),this.finderPenaltyCountPatterns(i)}finderPenaltyAddHistory(e,t){0==t[0]&&(e+=this.size),t.pop(),t.unshift(e)}};t.MIN_VERSION=1,t.MAX_VERSION=40,t.PENALTY_N1=3,t.PENALTY_N2=3,t.PENALTY_N3=40,t.PENALTY_N4=10,t.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],t.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]];function i(e,t,i){if(t<0||t>31||e>>>t!=0)throw new RangeError("Value out of range");for(let n=t-1;n>=0;n--)i.push(e>>>n&1)}function n(e,t){return 0!=(e>>>t&1)}function a(e){if(!e)throw new Error("Assertion error")}e.QrCode=t;const r=class e{constructor(e,t,i){if(this.mode=e,this.numChars=t,this.bitData=i,t<0)throw new RangeError("Invalid argument");this.bitData=i.slice()}static makeBytes(t){let n=[];for(const e of t)i(e,8,n);return new e(e.Mode.BYTE,t.length,n)}static makeNumeric(t){if(!e.isNumeric(t))throw new RangeError("String contains non-numeric characters");let n=[];for(let e=0;e<t.length;){const a=Math.min(t.length-e,3);i(parseInt(t.substring(e,e+a),10),3*a+1,n),e+=a}return new e(e.Mode.NUMERIC,t.length,n)}static makeAlphanumeric(t){if(!e.isAlphanumeric(t))throw new RangeError("String contains unencodable characters in alphanumeric mode");let n,a=[];for(n=0;n+2<=t.length;n+=2){let r=45*e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n));r+=e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n+1)),i(r,11,a)}return n<t.length&&i(e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n)),6,a),new e(e.Mode.ALPHANUMERIC,t.length,a)}static makeSegments(t){return""==t?[]:e.isNumeric(t)?[e.makeNumeric(t)]:e.isAlphanumeric(t)?[e.makeAlphanumeric(t)]:[e.makeBytes(e.toUtf8ByteArray(t))]}static makeEci(t){let n=[];if(t<0)throw new RangeError("ECI assignment value out of range");if(t<128)i(t,8,n);else if(t<16384)i(2,2,n),i(t,14,n);else{if(!(t<1e6))throw new RangeError("ECI assignment value out of range");i(6,3,n),i(t,21,n)}return new e(e.Mode.ECI,0,n)}static isNumeric(t){return e.NUMERIC_REGEX.test(t)}static isAlphanumeric(t){return e.ALPHANUMERIC_REGEX.test(t)}getData(){return this.bitData.slice()}static getTotalBits(e,t){let i=0;for(const n of e){const e=n.mode.numCharCountBits(t);if(n.numChars>=1<<e)return 1/0;i+=4+e+n.bitData.length}return i}static toUtf8ByteArray(e){e=encodeURI(e);let t=[];for(let i=0;i<e.length;i++)"%"!=e.charAt(i)?t.push(e.charCodeAt(i)):(t.push(parseInt(e.substring(i+1,i+3),16)),i+=2);return t}};r.NUMERIC_REGEX=/^[0-9]*$/,r.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,r.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let s=r;e.QrSegment=r})(n||(n={})),(e=>{let t;(e=>{const t=class{constructor(e,t){this.ordinal=e,this.formatBits=t}};t.LOW=new t(0,1),t.MEDIUM=new t(1,0),t.QUARTILE=new t(2,3),t.HIGH=new t(3,2);e.Ecc=t})(t=e.QrCode||(e.QrCode={}))})(n||(n={})),(e=>{let t;(e=>{const t=class{constructor(e,t){this.modeBits=e,this.numBitsCharCount=t}numCharCountBits(e){return this.numBitsCharCount[Math.floor((e+7)/17)]}};t.NUMERIC=new t(1,[10,12,14]),t.ALPHANUMERIC=new t(2,[9,11,13]),t.BYTE=new t(4,[8,16,16]),t.KANJI=new t(8,[8,10,12]),t.ECI=new t(7,[0,0,0]);e.Mode=t})(t=e.QrSegment||(e.QrSegment={}))})(n||(n={}));var u=n,g={L:u.QrCode.Ecc.LOW,M:u.QrCode.Ecc.MEDIUM,Q:u.QrCode.Ecc.QUARTILE,H:u.QrCode.Ecc.HIGH},m=128,f="L",v="#FFFFFF",p="#000000",y=!1,_=1;function w(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;const i=[];return e.forEach((function(e,n){let a=null;e.forEach((function(r,s){if(!r&&null!==a)return i.push("M".concat(a+t," ").concat(n+t,"h").concat(s-a,"v1H").concat(a+t,"z")),void(a=null);if(s!==e.length-1)r&&null===a&&(a=s);else{if(!r)return;null===a?i.push("M".concat(s+t,",").concat(n+t," h1v1H").concat(s+t,"z")):i.push("M".concat(a+t,",").concat(n+t," h").concat(s+1-a,"v1H").concat(a+t,"z"))}}))})),i.join("")}function b(e,t){return e.slice().map(((e,i)=>i<t.y||i>=t.y+t.h?e:e.map(((e,i)=>(i<t.x||i>=t.x+t.w)&&e))))}function E(e){let{value:t,level:i,minVersion:n,includeMargin:r,marginSize:s,imageSettings:o,size:l,boostLevel:c}=e,h=a.useMemo((()=>{const e=(Array.isArray(t)?t:[t]).reduce(((e,t)=>(e.push(...u.QrSegment.makeSegments(t)),e)),[]);return u.QrCode.encodeSegments(e,g[i],n,void 0,void 0,c)}),[t,i,n,c]);const{cells:d,margin:m,numCells:f,calculatedImageSettings:v}=a.useMemo((()=>{let e=h.getModules();const t=function(e,t){return null!=t?Math.max(Math.floor(t),0):e?4:0}(r,s),i=e.length+2*t,n=function(e,t,i,n){if(null==n)return null;const a=e.length+2*i,r=Math.floor(.1*t),s=a/t,o=(n.width||r)*s,l=(n.height||r)*s,c=null==n.x?e.length/2-o/2:n.x*s,h=null==n.y?e.length/2-l/2:n.y*s,d=null==n.opacity?1:n.opacity;let u=null;if(n.excavate){let e=Math.floor(c),t=Math.floor(h);u={x:e,y:t,w:Math.ceil(o+c-e),h:Math.ceil(l+h-t)}}return{x:c,y:h,h:l,w:o,excavation:u,opacity:d,crossOrigin:n.crossOrigin}}(e,l,t,o);return{cells:e,margin:t,numCells:i,calculatedImageSettings:n}}),[h,l,o,r,s]);return{qrcode:h,margin:m,cells:d,numCells:f,calculatedImageSettings:v}}var M=function(){try{(new Path2D).addPath(new Path2D)}catch(e){return!1}return!0}();a.forwardRef((function(e,t){const i=e,{value:n,size:r=m,level:s=f,bgColor:o=v,fgColor:l=p,includeMargin:c=y,minVersion:u=_,boostLevel:g,marginSize:O,imageSettings:C}=i,S=d(i,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:R}=S,P=d(S,["style"]),L=null==C?void 0:C.src,A=a.useRef(null),N=a.useRef(null),k=a.useCallback((e=>{A.current=e,"function"===typeof t?t(e):t&&(t.current=e)}),[t]),[D,I]=a.useState(!1),{margin:T,cells:F,numCells:H,calculatedImageSettings:$}=E({value:n,level:s,minVersion:u,boostLevel:g,includeMargin:c,marginSize:O,imageSettings:C,size:r});a.useEffect((()=>{if(null!=A.current){const e=A.current,t=e.getContext("2d");if(!t)return;let i=F;const n=N.current,a=null!=$&&null!==n&&n.complete&&0!==n.naturalHeight&&0!==n.naturalWidth;a&&null!=$.excavation&&(i=b(F,$.excavation));const s=window.devicePixelRatio||1;e.height=e.width=r*s;const c=r/H*s;t.scale(c,c),t.fillStyle=o,t.fillRect(0,0,H,H),t.fillStyle=l,M?t.fill(new Path2D(w(i,T))):F.forEach((function(e,i){e.forEach((function(e,n){e&&t.fillRect(n+T,i+T,1,1)}))})),$&&(t.globalAlpha=$.opacity),a&&t.drawImage(n,$.x+T,$.y+T,$.w,$.h)}})),a.useEffect((()=>{I(!1)}),[L]);const z=h({height:r,width:r},R);let x=null;return null!=L&&(x=a.createElement("img",{src:L,key:L,style:{display:"none"},onLoad:()=>{I(!0)},ref:N,crossOrigin:null==$?void 0:$.crossOrigin})),a.createElement(a.Fragment,null,a.createElement("canvas",h({style:z,height:r,width:r,ref:k,role:"img"},P)),x)})).displayName="QRCodeCanvas";var O=a.forwardRef((function(e,t){const i=e,{value:n,size:r=m,level:s=f,bgColor:o=v,fgColor:l=p,includeMargin:c=y,minVersion:u=_,boostLevel:g,title:M,marginSize:O,imageSettings:C}=i,S=d(i,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:R,cells:P,numCells:L,calculatedImageSettings:A}=E({value:n,level:s,minVersion:u,boostLevel:g,includeMargin:c,marginSize:O,imageSettings:C,size:r});let N=P,k=null;null!=C&&null!=A&&(null!=A.excavation&&(N=b(P,A.excavation)),k=a.createElement("image",{href:C.src,height:A.h,width:A.w,x:A.x+R,y:A.y+R,preserveAspectRatio:"none",opacity:A.opacity,crossOrigin:A.crossOrigin}));const D=w(N,R);return a.createElement("svg",h({height:r,width:r,viewBox:"0 0 ".concat(L," ").concat(L),ref:t,role:"img"},S),!!M&&a.createElement("title",null,M),a.createElement("path",{fill:o,d:"M0,0 h".concat(L,"v").concat(L,"H0z"),shapeRendering:"crispEdges"}),a.createElement("path",{fill:l,d:D,shapeRendering:"crispEdges"}),k)}));O.displayName="QRCodeSVG"}}]);