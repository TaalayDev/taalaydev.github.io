
// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

_1: (x0,x1,x2) => x0.set(x1,x2),
_2: (x0,x1,x2) => x0.set(x1,x2),
_3: (x0,x1) => x0.transferFromImageBitmap(x1),
_4: x0 => x0.arrayBuffer(),
_5: (x0,x1) => x0.transferFromImageBitmap(x1),
_6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
_7: x0 => new window.FinalizationRegistry(x0),
_8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_9: (x0,x1) => x0.unregister(x1),
_10: (x0,x1,x2) => x0.slice(x1,x2),
_11: (x0,x1) => x0.decode(x1),
_12: (x0,x1) => x0.segment(x1),
_13: () => new TextDecoder(),
_14: x0 => x0.buffer,
_15: x0 => x0.wasmMemory,
_16: () => globalThis.window._flutter_skwasmInstance,
_17: x0 => x0.rasterStartMilliseconds,
_18: x0 => x0.rasterEndMilliseconds,
_19: x0 => x0.imageBitmaps,
_167: x0 => x0.select(),
_168: (x0,x1) => x0.append(x1),
_169: x0 => x0.remove(),
_172: x0 => x0.unlock(),
_177: x0 => x0.getReader(),
_189: x0 => new MutationObserver(x0),
_206: (x0,x1) => new OffscreenCanvas(x0,x1),
_208: (x0,x1,x2) => x0.addEventListener(x1,x2),
_209: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_212: x0 => new ResizeObserver(x0),
_215: (x0,x1) => new Intl.Segmenter(x0,x1),
_216: x0 => x0.next(),
_217: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_294: x0 => x0.close(),
_295: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
_296: x0 => new window.ImageDecoder(x0),
_297: x0 => x0.close(),
_298: x0 => ({frameIndex: x0}),
_299: (x0,x1) => x0.decode(x1),
_302: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._302(f,arguments.length,x0) }),
_303: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._303(f,arguments.length,x0) }),
_304: (x0,x1) => ({addView: x0,removeView: x1}),
_305: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._305(f,arguments.length,x0) }),
_306: f => finalizeWrapper(f, function() { return dartInstance.exports._306(f,arguments.length) }),
_307: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_308: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._308(f,arguments.length,x0) }),
_309: x0 => ({runApp: x0}),
_310: x0 => new Uint8Array(x0),
_312: x0 => x0.preventDefault(),
_313: x0 => x0.stopPropagation(),
_314: (x0,x1) => x0.addListener(x1),
_315: (x0,x1) => x0.removeListener(x1),
_316: (x0,x1) => x0.prepend(x1),
_317: x0 => x0.remove(),
_318: x0 => x0.disconnect(),
_319: (x0,x1) => x0.addListener(x1),
_320: (x0,x1) => x0.removeListener(x1),
_322: (x0,x1) => x0.append(x1),
_323: x0 => x0.remove(),
_324: x0 => x0.stopPropagation(),
_328: x0 => x0.preventDefault(),
_329: (x0,x1) => x0.append(x1),
_330: x0 => x0.remove(),
_331: x0 => x0.preventDefault(),
_336: (x0,x1) => x0.appendChild(x1),
_337: (x0,x1,x2) => x0.insertBefore(x1,x2),
_338: (x0,x1) => x0.removeChild(x1),
_339: (x0,x1) => x0.appendChild(x1),
_340: (x0,x1) => x0.transferFromImageBitmap(x1),
_341: (x0,x1) => x0.append(x1),
_342: (x0,x1) => x0.append(x1),
_343: (x0,x1) => x0.append(x1),
_344: x0 => x0.remove(),
_345: x0 => x0.remove(),
_346: x0 => x0.remove(),
_347: (x0,x1) => x0.appendChild(x1),
_348: (x0,x1) => x0.appendChild(x1),
_349: x0 => x0.remove(),
_350: (x0,x1) => x0.append(x1),
_351: (x0,x1) => x0.append(x1),
_352: x0 => x0.remove(),
_353: (x0,x1) => x0.append(x1),
_354: (x0,x1) => x0.append(x1),
_355: (x0,x1,x2) => x0.insertBefore(x1,x2),
_356: (x0,x1) => x0.append(x1),
_357: (x0,x1,x2) => x0.insertBefore(x1,x2),
_358: x0 => x0.remove(),
_359: x0 => x0.remove(),
_360: (x0,x1) => x0.append(x1),
_361: x0 => x0.remove(),
_362: (x0,x1) => x0.append(x1),
_363: x0 => x0.remove(),
_364: x0 => x0.remove(),
_365: x0 => x0.getBoundingClientRect(),
_366: x0 => x0.remove(),
_367: x0 => x0.blur(),
_368: x0 => x0.remove(),
_369: x0 => x0.blur(),
_370: x0 => x0.remove(),
_383: (x0,x1) => x0.append(x1),
_384: x0 => x0.remove(),
_385: (x0,x1) => x0.append(x1),
_386: (x0,x1,x2) => x0.insertBefore(x1,x2),
_387: x0 => x0.preventDefault(),
_388: x0 => x0.preventDefault(),
_389: x0 => x0.preventDefault(),
_390: x0 => x0.preventDefault(),
_391: x0 => x0.remove(),
_392: (x0,x1) => x0.observe(x1),
_393: x0 => x0.disconnect(),
_394: (x0,x1) => x0.appendChild(x1),
_395: (x0,x1) => x0.appendChild(x1),
_396: (x0,x1) => x0.appendChild(x1),
_397: (x0,x1) => x0.append(x1),
_398: x0 => x0.remove(),
_399: (x0,x1) => x0.append(x1),
_401: (x0,x1) => x0.appendChild(x1),
_402: (x0,x1) => x0.append(x1),
_403: x0 => x0.remove(),
_404: (x0,x1) => x0.append(x1),
_408: (x0,x1) => x0.appendChild(x1),
_409: x0 => x0.remove(),
_969: () => globalThis.window.flutterConfiguration,
_970: x0 => x0.assetBase,
_975: x0 => x0.debugShowSemanticsNodes,
_976: x0 => x0.hostElement,
_977: x0 => x0.multiViewEnabled,
_978: x0 => x0.nonce,
_980: x0 => x0.fontFallbackBaseUrl,
_981: x0 => x0.useColorEmoji,
_985: x0 => x0.console,
_986: x0 => x0.devicePixelRatio,
_987: x0 => x0.document,
_988: x0 => x0.history,
_989: x0 => x0.innerHeight,
_990: x0 => x0.innerWidth,
_991: x0 => x0.location,
_992: x0 => x0.navigator,
_993: x0 => x0.visualViewport,
_994: x0 => x0.performance,
_995: (x0,x1) => x0.fetch(x1),
_1000: (x0,x1) => x0.dispatchEvent(x1),
_1001: (x0,x1) => x0.matchMedia(x1),
_1002: (x0,x1) => x0.getComputedStyle(x1),
_1004: x0 => x0.screen,
_1005: (x0,x1) => x0.requestAnimationFrame(x1),
_1006: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1006(f,arguments.length,x0) }),
_1010: (x0,x1) => x0.warn(x1),
_1013: () => globalThis.window,
_1014: () => globalThis.Intl,
_1015: () => globalThis.Symbol,
_1018: x0 => x0.clipboard,
_1019: x0 => x0.maxTouchPoints,
_1020: x0 => x0.vendor,
_1021: x0 => x0.language,
_1022: x0 => x0.platform,
_1023: x0 => x0.userAgent,
_1024: x0 => x0.languages,
_1025: x0 => x0.documentElement,
_1026: (x0,x1) => x0.querySelector(x1),
_1029: (x0,x1) => x0.createElement(x1),
_1031: (x0,x1) => x0.execCommand(x1),
_1035: (x0,x1) => x0.createTextNode(x1),
_1036: (x0,x1) => x0.createEvent(x1),
_1040: x0 => x0.head,
_1041: x0 => x0.body,
_1042: (x0,x1) => x0.title = x1,
_1045: x0 => x0.activeElement,
_1047: x0 => x0.visibilityState,
_1048: () => globalThis.document,
_1049: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1050: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1051: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1052: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1055: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1055(f,arguments.length,x0) }),
_1056: x0 => x0.target,
_1058: x0 => x0.timeStamp,
_1059: x0 => x0.type,
_1061: x0 => x0.preventDefault(),
_1065: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1070: x0 => x0.firstChild,
_1076: x0 => x0.parentElement,
_1078: x0 => x0.parentNode,
_1081: (x0,x1) => x0.removeChild(x1),
_1082: (x0,x1) => x0.removeChild(x1),
_1083: x0 => x0.isConnected,
_1084: (x0,x1) => x0.textContent = x1,
_1087: (x0,x1) => x0.contains(x1),
_1092: x0 => x0.firstElementChild,
_1094: x0 => x0.nextElementSibling,
_1095: x0 => x0.clientHeight,
_1096: x0 => x0.clientWidth,
_1097: x0 => x0.offsetHeight,
_1098: x0 => x0.offsetWidth,
_1099: x0 => x0.id,
_1100: (x0,x1) => x0.id = x1,
_1103: (x0,x1) => x0.spellcheck = x1,
_1104: x0 => x0.tagName,
_1105: x0 => x0.style,
_1107: (x0,x1) => x0.append(x1),
_1108: (x0,x1) => x0.getAttribute(x1),
_1109: x0 => x0.getBoundingClientRect(),
_1112: (x0,x1) => x0.closest(x1),
_1114: (x0,x1) => x0.querySelectorAll(x1),
_1115: x0 => x0.remove(),
_1116: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1118: (x0,x1) => x0.removeAttribute(x1),
_1119: (x0,x1) => x0.tabIndex = x1,
_1121: (x0,x1) => x0.focus(x1),
_1122: x0 => x0.scrollTop,
_1123: (x0,x1) => x0.scrollTop = x1,
_1124: x0 => x0.scrollLeft,
_1125: (x0,x1) => x0.scrollLeft = x1,
_1126: x0 => x0.classList,
_1127: (x0,x1) => x0.className = x1,
_1131: (x0,x1) => x0.getElementsByClassName(x1),
_1132: x0 => x0.click(),
_1133: (x0,x1) => x0.hasAttribute(x1),
_1136: (x0,x1) => x0.attachShadow(x1),
_1140: (x0,x1) => x0.getPropertyValue(x1),
_1142: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
_1144: (x0,x1) => x0.removeProperty(x1),
_1146: x0 => x0.offsetLeft,
_1147: x0 => x0.offsetTop,
_1148: x0 => x0.offsetParent,
_1150: (x0,x1) => x0.name = x1,
_1151: x0 => x0.content,
_1152: (x0,x1) => x0.content = x1,
_1165: (x0,x1) => x0.nonce = x1,
_1170: x0 => x0.now(),
_1172: (x0,x1) => x0.width = x1,
_1174: (x0,x1) => x0.height = x1,
_1178: (x0,x1) => x0.getContext(x1),
_1251: x0 => x0.width,
_1252: x0 => x0.height,
_1256: x0 => x0.status,
_1258: x0 => x0.body,
_1259: x0 => x0.arrayBuffer(),
_1264: x0 => x0.read(),
_1265: x0 => x0.value,
_1266: x0 => x0.done,
_1268: x0 => x0.name,
_1269: x0 => x0.x,
_1270: x0 => x0.y,
_1273: x0 => x0.top,
_1274: x0 => x0.right,
_1275: x0 => x0.bottom,
_1276: x0 => x0.left,
_1285: x0 => x0.height,
_1286: x0 => x0.width,
_1287: (x0,x1) => x0.value = x1,
_1289: (x0,x1) => x0.placeholder = x1,
_1290: (x0,x1) => x0.name = x1,
_1291: x0 => x0.selectionDirection,
_1292: x0 => x0.selectionStart,
_1293: x0 => x0.selectionEnd,
_1296: x0 => x0.value,
_1298: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1303: x0 => x0.readText(),
_1304: (x0,x1) => x0.writeText(x1),
_1305: x0 => x0.altKey,
_1306: x0 => x0.code,
_1307: x0 => x0.ctrlKey,
_1308: x0 => x0.key,
_1309: x0 => x0.keyCode,
_1310: x0 => x0.location,
_1311: x0 => x0.metaKey,
_1312: x0 => x0.repeat,
_1313: x0 => x0.shiftKey,
_1314: x0 => x0.isComposing,
_1315: (x0,x1) => x0.getModifierState(x1),
_1316: x0 => x0.state,
_1319: (x0,x1) => x0.go(x1),
_1320: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1321: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1322: x0 => x0.pathname,
_1323: x0 => x0.search,
_1324: x0 => x0.hash,
_1327: x0 => x0.state,
_1333: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1333(f,arguments.length,x0,x1) }),
_1335: (x0,x1,x2) => x0.observe(x1,x2),
_1338: x0 => x0.attributeName,
_1339: x0 => x0.type,
_1340: x0 => x0.matches,
_1344: x0 => x0.matches,
_1345: x0 => x0.relatedTarget,
_1346: x0 => x0.clientX,
_1347: x0 => x0.clientY,
_1348: x0 => x0.offsetX,
_1349: x0 => x0.offsetY,
_1352: x0 => x0.button,
_1353: x0 => x0.buttons,
_1354: x0 => x0.ctrlKey,
_1355: (x0,x1) => x0.getModifierState(x1),
_1356: x0 => x0.pointerId,
_1357: x0 => x0.pointerType,
_1358: x0 => x0.pressure,
_1359: x0 => x0.tiltX,
_1360: x0 => x0.tiltY,
_1361: x0 => x0.getCoalescedEvents(),
_1362: x0 => x0.deltaX,
_1363: x0 => x0.deltaY,
_1364: x0 => x0.wheelDeltaX,
_1365: x0 => x0.wheelDeltaY,
_1366: x0 => x0.deltaMode,
_1371: x0 => x0.changedTouches,
_1373: x0 => x0.clientX,
_1374: x0 => x0.clientY,
_1375: x0 => x0.data,
_1376: (x0,x1) => x0.type = x1,
_1377: (x0,x1) => x0.max = x1,
_1378: (x0,x1) => x0.min = x1,
_1379: (x0,x1) => x0.value = x1,
_1380: x0 => x0.value,
_1381: x0 => x0.disabled,
_1382: (x0,x1) => x0.disabled = x1,
_1383: (x0,x1) => x0.placeholder = x1,
_1384: (x0,x1) => x0.name = x1,
_1385: (x0,x1) => x0.autocomplete = x1,
_1386: x0 => x0.selectionDirection,
_1387: x0 => x0.selectionStart,
_1388: x0 => x0.selectionEnd,
_1392: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1399: (x0,x1) => x0.add(x1),
_1402: (x0,x1) => x0.noValidate = x1,
_1403: (x0,x1) => x0.method = x1,
_1404: (x0,x1) => x0.action = x1,
_1409: (x0,x1) => x0.getContext(x1),
_1412: x0 => x0.convertToBlob(),
_1431: x0 => x0.orientation,
_1432: x0 => x0.width,
_1433: x0 => x0.height,
_1434: (x0,x1) => x0.lock(x1),
_1451: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1451(f,arguments.length,x0,x1) }),
_1461: x0 => x0.length,
_1462: (x0,x1) => x0.item(x1),
_1463: x0 => x0.length,
_1464: (x0,x1) => x0.item(x1),
_1465: x0 => x0.iterator,
_1466: x0 => x0.Segmenter,
_1467: x0 => x0.v8BreakIterator,
_1470: x0 => x0.done,
_1471: x0 => x0.value,
_1472: x0 => x0.index,
_1476: (x0,x1) => x0.adoptText(x1),
_1478: x0 => x0.first(),
_1479: x0 => x0.next(),
_1480: x0 => x0.current(),
_1493: x0 => x0.hostElement,
_1494: x0 => x0.viewConstraints,
_1496: x0 => x0.maxHeight,
_1497: x0 => x0.maxWidth,
_1498: x0 => x0.minHeight,
_1499: x0 => x0.minWidth,
_1500: x0 => x0.loader,
_1501: () => globalThis._flutter,
_1502: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1503: (x0,x1,x2) => x0.call(x1,x2),
_1504: () => globalThis.Promise,
_1505: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1505(f,arguments.length,x0,x1) }),
_1508: x0 => x0.length,
_1511: x0 => x0.tracks,
_1515: x0 => x0.image,
_1520: x0 => x0.codedWidth,
_1521: x0 => x0.codedHeight,
_1524: x0 => x0.duration,
_1528: x0 => x0.ready,
_1529: x0 => x0.selectedTrack,
_1530: x0 => x0.repetitionCount,
_1531: x0 => x0.frameCount,
_1584: (x0,x1,x2,x3,x4,x5,x6,x7) => ({apiKey: x0,authDomain: x1,databaseURL: x2,projectId: x3,storageBucket: x4,messagingSenderId: x5,measurementId: x6,appId: x7}),
_1585: (x0,x1) => globalThis.firebase_core.initializeApp(x0,x1),
_1586: x0 => globalThis.firebase_core.getApp(x0),
_1587: () => globalThis.firebase_core.getApp(),
_1590: () => globalThis.firebase_core.SDK_VERSION,
_1597: x0 => x0.apiKey,
_1599: x0 => x0.authDomain,
_1601: x0 => x0.databaseURL,
_1603: x0 => x0.projectId,
_1605: x0 => x0.storageBucket,
_1607: x0 => x0.messagingSenderId,
_1609: x0 => x0.measurementId,
_1611: x0 => x0.appId,
_1613: x0 => x0.name,
_1614: x0 => x0.options,
_1616: (x0,x1) => globalThis.firebase_analytics.initializeAnalytics(x0,x1),
_1618: (x0,x1,x2,x3) => globalThis.firebase_analytics.logEvent(x0,x1,x2,x3),
_1625: (x0,x1) => x0.createElement(x1),
_1626: (x0,x1) => x0.debug(x1),
_1627: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1627(f,arguments.length,x0) }),
_1628: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1628(f,arguments.length,x0,x1) }),
_1629: (x0,x1) => ({createScript: x0,createScriptURL: x1}),
_1630: (x0,x1,x2) => x0.createPolicy(x1,x2),
_1631: (x0,x1) => x0.createScriptURL(x1),
_1632: (x0,x1,x2) => x0.createScript(x1,x2),
_1633: (x0,x1) => x0.appendChild(x1),
_1634: (x0,x1) => x0.appendChild(x1),
_1635: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1635(f,arguments.length,x0) }),
_1657: (x0,x1) => x0.querySelector(x1),
_1658: (x0,x1) => x0.append(x1),
_1674: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1683: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
_1686: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1688: (x0,x1) => x0.canShare(x1),
_1689: (x0,x1) => x0.share(x1),
_1695: x0 => ({files: x0}),
_1696: () => ({}),
_1697: (x0,x1,x2) => new File(x0,x1,x2),
_1709: (x0,x1) => x0.getItem(x1),
_1711: (x0,x1,x2) => x0.setItem(x1,x2),
_1715: (x0,x1) => x0.querySelector(x1),
_1716: (x0,x1) => x0.querySelector(x1),
_1732: (x0,x1,x2) => x0.call(x1,x2),
_1745: () => new Array(),
_1746: x0 => new Array(x0),
_1748: (o, t) => typeof o === t,
_1749: (o, c) => o instanceof c,
_1750: (x0,x1,x2,x3,x4,x5) => x0.call(x1,x2,x3,x4,x5),
_1753: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1753(f,arguments.length,x0) }),
_1754: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1754(f,arguments.length,x0) }),
_1758: (o, a) => o + a,
_1768: (o, a) => o == a,
_1779: (decoder, codeUnits) => decoder.decode(codeUnits),
_1780: () => new TextDecoder("utf-8", {fatal: true}),
_1781: () => new TextDecoder("utf-8", {fatal: false}),
_1782: v => v.toString(),
_1783: (d, digits) => d.toFixed(digits),
_1787: x0 => new WeakRef(x0),
_1788: x0 => x0.deref(),
_1789: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1789(f,arguments.length,x0) }),
_1790: x0 => new FinalizationRegistry(x0),
_1791: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_1793: (x0,x1) => x0.unregister(x1),
_1794: Date.now,
_1796: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_1797: s => {
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
        return NaN;
      }
      return parseFloat(s);
    },
_1798: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_1799: () => typeof dartUseDateNowForTicks !== "undefined",
_1800: () => 1000 * performance.now(),
_1801: () => Date.now(),
_1802: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return globalThis.location.href;
      }
      return null;
    },
_1803: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
_1804: () => new WeakMap(),
_1805: (map, o) => map.get(o),
_1806: (map, o, v) => map.set(o, v),
_1807: () => globalThis.WeakRef,
_1812: () => globalThis.FinalizationRegistry,
_1818: s => JSON.stringify(s),
_1819: s => printToConsole(s),
_1820: a => a.join(''),
_1821: (o, a, b) => o.replace(a, b),
_1823: (s, t) => s.split(t),
_1824: s => s.toLowerCase(),
_1825: s => s.toUpperCase(),
_1826: s => s.trim(),
_1827: s => s.trimLeft(),
_1828: s => s.trimRight(),
_1830: (s, p, i) => s.indexOf(p, i),
_1831: (s, p, i) => s.lastIndexOf(p, i),
_1832: (s) => s.replace(/\$/g, "$$$$"),
_1833: Object.is,
_1834: s => s.toUpperCase(),
_1835: s => s.toLowerCase(),
_1836: (a, i) => a.push(i),
_1840: a => a.pop(),
_1841: (a, i) => a.splice(i, 1),
_1843: (a, s) => a.join(s),
_1844: (a, s, e) => a.slice(s, e),
_1847: a => a.length,
_1849: (a, i) => a[i],
_1850: (a, i, v) => a[i] = v,
_1852: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_1853: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_1854: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_1855: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_1856: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_1857: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_1858: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_1859: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_1861: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_1862: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_1863: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_1864: (t, s) => t.set(s),
_1866: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_1867: o => o.byteLength,
_1868: o => o.buffer,
_1869: o => o.byteOffset,
_1870: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_1871: (b, o) => new DataView(b, o),
_1872: (b, o, l) => new DataView(b, o, l),
_1873: Function.prototype.call.bind(DataView.prototype.getUint8),
_1874: Function.prototype.call.bind(DataView.prototype.setUint8),
_1875: Function.prototype.call.bind(DataView.prototype.getInt8),
_1876: Function.prototype.call.bind(DataView.prototype.setInt8),
_1877: Function.prototype.call.bind(DataView.prototype.getUint16),
_1878: Function.prototype.call.bind(DataView.prototype.setUint16),
_1879: Function.prototype.call.bind(DataView.prototype.getInt16),
_1880: Function.prototype.call.bind(DataView.prototype.setInt16),
_1881: Function.prototype.call.bind(DataView.prototype.getUint32),
_1882: Function.prototype.call.bind(DataView.prototype.setUint32),
_1883: Function.prototype.call.bind(DataView.prototype.getInt32),
_1884: Function.prototype.call.bind(DataView.prototype.setInt32),
_1887: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_1888: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_1889: Function.prototype.call.bind(DataView.prototype.getFloat32),
_1890: Function.prototype.call.bind(DataView.prototype.setFloat32),
_1891: Function.prototype.call.bind(DataView.prototype.getFloat64),
_1892: Function.prototype.call.bind(DataView.prototype.setFloat64),
_1893: (x0,x1) => x0.getRandomValues(x1),
_1894: x0 => new Uint8Array(x0),
_1895: () => globalThis.crypto,
_1906: (x0,x1) => x0.postMessage(x1),
_1908: x0 => new Worker(x0),
_1911: x0 => ({create: x0}),
_1912: (x0,x1,x2) => x0.getFileHandle(x1,x2),
_1920: (x0,x1,x2) => x0.open(x1,x2),
_1934: (x0,x1) => new SharedWorker(x0,x1),
_1935: x0 => x0.start(),
_1936: (x0,x1,x2) => x0.postMessage(x1,x2),
_1937: (x0,x1,x2) => x0.postMessage(x1,x2),
_1938: x0 => x0.close(),
_1939: x0 => x0.terminate(),
_1940: () => new MessageChannel(),
_1946: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1946(f,arguments.length,x0) }),
_1947: x0 => x0.close(),
_1948: x0 => new BroadcastChannel(x0),
_1949: x0 => globalThis.Array.isArray(x0),
_1950: (x0,x1) => x0.postMessage(x1),
_1953: (x0,x1) => ({kind: x0,table: x1}),
_1954: x0 => x0.kind,
_1955: x0 => x0.table,
_1956: (x0,x1) => ({i: x0,p: x1}),
_1957: (x0,x1) => ({c: x0,r: x1}),
_1958: x0 => x0.i,
_1959: x0 => x0.p,
_1960: x0 => x0.c,
_1961: x0 => x0.r,
_1971: (x0,x1) => x0.send(x1),
_1972: x0 => x0.send(),
_1975: (o, t) => o instanceof t,
_1977: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1977(f,arguments.length,x0) }),
_1978: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1978(f,arguments.length,x0) }),
_1979: o => Object.keys(o),
_1980: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_1981: (handle) => clearTimeout(handle),
_1982: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_1983: (handle) => clearInterval(handle),
_1984: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_1985: () => Date.now(),
_1989: x0 => new URL(x0),
_1990: (x0,x1) => new URL(x0,x1),
_1991: (x0,x1) => globalThis.fetch(x0,x1),
_1992: (x0,x1,x2,x3) => x0.call(x1,x2,x3),
_1993: x0 => ({initial: x0}),
_1994: x0 => new WebAssembly.Memory(x0),
_1995: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1995(f,arguments.length,x0) }),
_1996: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._1996(f,arguments.length,x0,x1,x2,x3,x4) }),
_1997: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1997(f,arguments.length,x0,x1,x2) }),
_1998: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1998(f,arguments.length,x0,x1,x2,x3) }),
_1999: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1999(f,arguments.length,x0,x1,x2,x3) }),
_2000: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._2000(f,arguments.length,x0,x1,x2) }),
_2001: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2001(f,arguments.length,x0,x1) }),
_2002: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2002(f,arguments.length,x0,x1) }),
_2003: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2003(f,arguments.length,x0) }),
_2004: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2004(f,arguments.length,x0) }),
_2005: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._2005(f,arguments.length,x0,x1,x2,x3) }),
_2006: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._2006(f,arguments.length,x0,x1,x2,x3) }),
_2007: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2007(f,arguments.length,x0,x1) }),
_2008: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2008(f,arguments.length,x0,x1) }),
_2009: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2009(f,arguments.length,x0,x1) }),
_2010: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2010(f,arguments.length,x0,x1) }),
_2011: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2011(f,arguments.length,x0,x1) }),
_2012: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2012(f,arguments.length,x0,x1) }),
_2013: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._2013(f,arguments.length,x0,x1,x2) }),
_2014: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._2014(f,arguments.length,x0,x1,x2) }),
_2015: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._2015(f,arguments.length,x0,x1,x2) }),
_2016: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2016(f,arguments.length,x0) }),
_2017: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2017(f,arguments.length,x0) }),
_2018: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2018(f,arguments.length,x0) }),
_2019: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._2019(f,arguments.length,x0,x1,x2,x3,x4) }),
_2020: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._2020(f,arguments.length,x0,x1,x2,x3,x4) }),
_2021: (x0,x1,x2,x3,x4,x5,x6) => x0.call(x1,x2,x3,x4,x5,x6),
_2022: (x0,x1,x2,x3,x4,x5,x6,x7) => x0.call(x1,x2,x3,x4,x5,x6,x7),
_2023: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4),
_2024: x0 => x0.continue(),
_2025: () => globalThis.indexedDB,
_2027: x0 => x0.arrayBuffer(),
_2028: x0 => new SharedArrayBuffer(x0),
_2029: x0 => new SharedArrayBuffer(x0),
_2030: x0 => ({at: x0}),
_2038: x0 => x0.synchronizationBuffer,
_2039: x0 => x0.communicationBuffer,
_2040: (x0,x1,x2,x3) => ({clientVersion: x0,root: x1,synchronizationBuffer: x2,communicationBuffer: x3}),
_2041: x0 => new SharedArrayBuffer(x0),
_2042: (x0,x1) => globalThis.IDBKeyRange.bound(x0,x1),
_2043: x0 => ({autoIncrement: x0}),
_2044: (x0,x1,x2) => x0.createObjectStore(x1,x2),
_2045: x0 => ({unique: x0}),
_2046: (x0,x1,x2,x3) => x0.createIndex(x1,x2,x3),
_2047: (x0,x1) => x0.createObjectStore(x1),
_2048: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2048(f,arguments.length,x0) }),
_2049: x0 => x0.close(),
_2050: (x0,x1,x2) => x0.transaction(x1,x2),
_2053: (x0,x1) => x0.objectStore(x1),
_2054: (x0,x1) => x0.index(x1),
_2055: x0 => x0.openKeyCursor(),
_2056: (x0,x1) => x0.objectStore(x1),
_2057: (x0,x1) => x0.index(x1),
_2058: (x0,x1) => x0.getKey(x1),
_2059: (x0,x1) => x0.objectStore(x1),
_2060: (x0,x1) => ({name: x0,length: x1}),
_2061: (x0,x1) => x0.put(x1),
_2062: (x0,x1) => x0.objectStore(x1),
_2063: (x0,x1) => x0.get(x1),
_2064: (x0,x1) => x0.objectStore(x1),
_2065: (x0,x1) => x0.openCursor(x1),
_2067: (x0,x1) => x0.objectStore(x1),
_2068: x0 => globalThis.IDBKeyRange.only(x0),
_2069: x0 => new Blob(x0),
_2070: (x0,x1,x2) => x0.put(x1,x2),
_2071: (x0,x1) => x0.update(x1),
_2072: (x0,x1) => x0.objectStore(x1),
_2073: (x0,x1) => x0.update(x1),
_2074: (x0,x1) => x0.objectStore(x1),
_2075: (x0,x1) => x0.objectStore(x1),
_2076: (x0,x1) => x0.delete(x1),
_2077: (x0,x1) => x0.update(x1),
_2078: (x0,x1) => x0.objectStore(x1),
_2079: (x0,x1) => x0.delete(x1),
_2080: (x0,x1) => x0.objectStore(x1),
_2081: (x0,x1) => x0.delete(x1),
_2084: x0 => x0.name,
_2085: x0 => x0.length,
_2086: x0 => x0.createSyncAccessHandle(),
_2087: (x0,x1) => x0.truncate(x1),
_2088: (x0,x1) => x0.truncate(x1),
_2089: x0 => x0.close(),
_2090: x0 => x0.close(),
_2091: x0 => x0.flush(),
_2092: x0 => x0.getSize(),
_2093: x0 => x0.flush(),
_2094: (x0,x1) => x0.truncate(x1),
_2096: x0 => globalThis.BigInt(x0),
_2097: x0 => globalThis.Number(x0),
_2100: x0 => globalThis.Object.keys(x0),
_2105: (x0,x1) => globalThis.WebAssembly.instantiateStreaming(x0,x1),
_2106: x0 => x0.call(),
_2107: x0 => x0.exports,
_2108: x0 => x0.instance,
_2112: x0 => x0.buffer,
_2113: () => globalThis.WebAssembly.Global,
_2116: () => globalThis.navigator,
_2117: x0 => x0.getDirectory(),
_2118: (x0,x1) => x0.read(x1),
_2119: (x0,x1,x2) => x0.read(x1,x2),
_2120: (x0,x1) => x0.write(x1),
_2121: (x0,x1,x2) => x0.write(x1,x2),
_2122: x0 => ({create: x0}),
_2123: (x0,x1,x2) => x0.getDirectoryHandle(x1,x2),
_2124: () => new XMLHttpRequest(),
_2125: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_2126: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_2128: x0 => x0.getAllResponseHeaders(),
_2129: x0 => globalThis.URL.createObjectURL(x0),
_2130: x0 => ({type: x0}),
_2131: (x0,x1) => new Blob(x0,x1),
_2132: () => new XMLHttpRequest(),
_2134: () => new FileReader(),
_2135: (x0,x1) => x0.readAsArrayBuffer(x1),
_2143: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2143(f,arguments.length,x0) }),
_2144: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2144(f,arguments.length,x0) }),
_2166: (x0,x1) => x0.key(x1),
_2391: x0 => x0.trustedTypes,
_2393: (x0,x1) => x0.text = x1,
_2395: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_2396: (x0,x1) => x0.exec(x1),
_2397: (x0,x1) => x0.test(x1),
_2398: (x0,x1) => x0.exec(x1),
_2399: (x0,x1) => x0.exec(x1),
_2400: x0 => x0.pop(),
_2404: (x0,x1,x2) => x0[x1] = x2,
_2406: o => o === undefined,
_2407: o => typeof o === 'boolean',
_2408: o => typeof o === 'number',
_2410: o => typeof o === 'string',
_2413: o => o instanceof Int8Array,
_2414: o => o instanceof Uint8Array,
_2415: o => o instanceof Uint8ClampedArray,
_2416: o => o instanceof Int16Array,
_2417: o => o instanceof Uint16Array,
_2418: o => o instanceof Int32Array,
_2419: o => o instanceof Uint32Array,
_2420: o => o instanceof Float32Array,
_2421: o => o instanceof Float64Array,
_2422: o => o instanceof ArrayBuffer,
_2423: o => o instanceof DataView,
_2424: o => o instanceof Array,
_2425: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_2427: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_2428: o => o instanceof RegExp,
_2429: (l, r) => l === r,
_2430: o => o,
_2431: o => o,
_2432: o => o,
_2433: b => !!b,
_2434: o => o.length,
_2437: (o, i) => o[i],
_2438: f => f.dartFunction,
_2439: l => arrayFromDartList(Int8Array, l),
_2440: (data, length) => {
          const jsBytes = new Uint8Array(length);
          const getByte = dartInstance.exports.$uint8ListGet;
          for (let i = 0; i < length; i++) {
            jsBytes[i] = getByte(data, i);
          }
          return jsBytes;
        },
_2441: l => arrayFromDartList(Uint8ClampedArray, l),
_2442: l => arrayFromDartList(Int16Array, l),
_2443: l => arrayFromDartList(Uint16Array, l),
_2444: l => arrayFromDartList(Int32Array, l),
_2445: l => arrayFromDartList(Uint32Array, l),
_2446: l => arrayFromDartList(Float32Array, l),
_2447: l => arrayFromDartList(Float64Array, l),
_2448: (data, length) => {
          const read = dartInstance.exports.$byteDataGetUint8;
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, read(data, i));
          }
          return view;
        },
_2449: l => arrayFromDartList(Array, l),
_2450:       (s, length) => {
        if (length == 0) return '';

        const read = dartInstance.exports.$stringRead1;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      }
      ,
_2451:     (s, length) => {
      if (length == 0) return '';

      const read = dartInstance.exports.$stringRead2;
      let result = '';
      let index = 0;
      const chunkLength = Math.min(length - index, 500);
      let array = new Array(chunkLength);
      while (index < length) {
        const newChunkLength = Math.min(length - index, 500);
        for (let i = 0; i < newChunkLength; i++) {
          array[i] = read(s, index++);
        }
        if (newChunkLength < chunkLength) {
          array = array.slice(0, newChunkLength);
        }
        result += String.fromCharCode(...array);
      }
      return result;
    }
    ,
_2452:     (s) => {
      let length = s.length;
      let range = 0;
      for (let i = 0; i < length; i++) {
        range |= s.codePointAt(i);
      }
      const exports = dartInstance.exports;
      if (range < 256) {
        if (length <= 10) {
          if (length == 1) {
            return exports.$stringAllocate1_1(s.codePointAt(0));
          }
          if (length == 2) {
            return exports.$stringAllocate1_2(s.codePointAt(0), s.codePointAt(1));
          }
          if (length == 3) {
            return exports.$stringAllocate1_3(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));
          }
          if (length == 4) {
            return exports.$stringAllocate1_4(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3));
          }
          if (length == 5) {
            return exports.$stringAllocate1_5(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4));
          }
          if (length == 6) {
            return exports.$stringAllocate1_6(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5));
          }
          if (length == 7) {
            return exports.$stringAllocate1_7(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6));
          }
          if (length == 8) {
            return exports.$stringAllocate1_8(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7));
          }
          if (length == 9) {
            return exports.$stringAllocate1_9(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8));
          }
          if (length == 10) {
            return exports.$stringAllocate1_10(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8), s.codePointAt(9));
          }
        }
        const dartString = exports.$stringAllocate1(length);
        const write = exports.$stringWrite1;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.codePointAt(i));
        }
        return dartString;
      } else {
        const dartString = exports.$stringAllocate2(length);
        const write = exports.$stringWrite2;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.charCodeAt(i));
        }
        return dartString;
      }
    }
    ,
_2453: () => ({}),
_2454: () => [],
_2455: l => new Array(l),
_2456: () => globalThis,
_2457: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_2458: (o, p) => p in o,
_2459: (o, p) => o[p],
_2460: (o, p, v) => o[p] = v,
_2461: (o, m, a) => o[m].apply(o, a),
_2463: o => String(o),
_2464: (p, s, f) => p.then(s, f),
_2465: s => {
      if (/[[\]{}()*+?.\\^$|]/.test(s)) {
          s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return s;
    },
_2468: x0 => x0.index,
_2470: x0 => x0.length,
_2472: (x0,x1) => x0[x1],
_2473: (x0,x1) => x0.exec(x1),
_2475: x0 => x0.flags,
_2476: x0 => x0.multiline,
_2477: x0 => x0.ignoreCase,
_2478: x0 => x0.unicode,
_2479: x0 => x0.dotAll,
_2480: (x0,x1) => x0.lastIndex = x1,
_2481: (o, p) => p in o,
_2482: (o, p) => o[p],
_2483: (o, p, v) => o[p] = v,
_2484: (o, p) => delete o[p],
_2485: (x0,x1,x2) => globalThis.Atomics.wait(x0,x1,x2),
_2487: (x0,x1,x2) => globalThis.Atomics.notify(x0,x1,x2),
_2488: (x0,x1,x2) => globalThis.Atomics.store(x0,x1,x2),
_2489: (x0,x1) => globalThis.Atomics.load(x0,x1),
_2490: () => globalThis.Int32Array,
_2492: () => globalThis.Uint8Array,
_2494: () => globalThis.DataView,
_2497: x0 => x0.byteLength,
_2597: (x0,x1) => x0.withCredentials = x1,
_2599: x0 => x0.responseURL,
_2600: x0 => x0.status,
_2601: x0 => x0.statusText,
_2603: (x0,x1) => x0.responseType = x1,
_2604: x0 => x0.response,
_3940: (x0,x1) => x0.type = x1,
_3948: (x0,x1) => x0.crossOrigin = x1,
_3950: (x0,x1) => x0.text = x1,
_4419: () => globalThis.window,
_4498: x0 => x0.navigator,
_4743: x0 => x0.trustedTypes,
_4745: x0 => x0.localStorage,
_4869: x0 => x0.userAgent,
_4870: x0 => x0.vendor,
_4882: x0 => x0.storage,
_4920: x0 => x0.data,
_4955: x0 => x0.port1,
_4956: x0 => x0.port2,
_4961: (x0,x1) => x0.onmessage = x1,
_5045: x0 => x0.port,
_5084: x0 => x0.length,
_8070: x0 => x0.type,
_8209: () => globalThis.document,
_8300: x0 => x0.body,
_8302: x0 => x0.head,
_8661: (x0,x1) => x0.id = x1,
_8677: x0 => x0.children,
_10349: (x0,x1) => x0.type = x1,
_10374: x0 => x0.result,
_12360: x0 => x0.result,
_12361: x0 => x0.error,
_12372: (x0,x1) => x0.onupgradeneeded = x1,
_12374: x0 => x0.oldVersion,
_12465: x0 => x0.key,
_12466: x0 => x0.primaryKey,
_12468: x0 => x0.value,
_14596: x0 => x0.name,
_14597: x0 => x0.message,
_15342: () => globalThis.console,
_15373: x0 => x0.name,
_15374: x0 => x0.message,
_15375: x0 => x0.code
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

