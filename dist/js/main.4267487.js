/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/amfe-flexible/index.js":
/*!*********************************************!*\
  !*** ./node_modules/amfe-flexible/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function flexible (window, document) {\n  var docEl = document.documentElement\n  var dpr = window.devicePixelRatio || 1\n\n  // adjust body font size\n  function setBodyFontSize () {\n    if (document.body) {\n      document.body.style.fontSize = (12 * dpr) + 'px'\n    }\n    else {\n      document.addEventListener('DOMContentLoaded', setBodyFontSize)\n    }\n  }\n  setBodyFontSize();\n\n  // set 1rem = viewWidth / 10\n  function setRemUnit () {\n    var rem = docEl.clientWidth / 10\n    docEl.style.fontSize = rem + 'px'\n  }\n\n  setRemUnit()\n\n  // reset rem unit on page resize\n  window.addEventListener('resize', setRemUnit)\n  window.addEventListener('pageshow', function (e) {\n    if (e.persisted) {\n      setRemUnit()\n    }\n  })\n\n  // detect 0.5px supports\n  if (dpr >= 2) {\n    var fakeBody = document.createElement('body')\n    var testElement = document.createElement('div')\n    testElement.style.border = '.5px solid transparent'\n    fakeBody.appendChild(testElement)\n    docEl.appendChild(fakeBody)\n    if (testElement.offsetHeight === 1) {\n      docEl.classList.add('hairlines')\n    }\n    docEl.removeChild(fakeBody)\n  }\n}(window, document))\n\n\n//# sourceURL=webpack:///./node_modules/amfe-flexible/index.js?");

/***/ }),

/***/ "./src/css/base.scss":
/*!***************************!*\
  !*** ./src/css/base.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/base.scss?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ../css/base.scss */ \"./src/css/base.scss\");\n\n__webpack_require__(/*! amfe-flexible/index.js */ \"./node_modules/amfe-flexible/index.js\");\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });