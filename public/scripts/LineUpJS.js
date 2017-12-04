/*! lineupjs - v2.0.0-20171127-225101 - 2017
* https://github.com/Caleydo/lineupjs
* Copyright (c) 2017 Caleydo Team; Licensed BSD-3-Clause*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["LineUpJS"] = factory(require("d3"));
	else
		root["LineUpJS"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 137);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["q"] = round;
/* harmony export (immutable) */ __webpack_exports__["k"] = findOption;
/* harmony export (immutable) */ __webpack_exports__["t"] = similar;
/* harmony export (immutable) */ __webpack_exports__["f"] = debounce;
/* harmony export (immutable) */ __webpack_exports__["u"] = suffix;
/* harmony export (immutable) */ __webpack_exports__["p"] = merge;
/* unused harmony export offset */
/* unused harmony export hasDnDType */
/* unused harmony export copyDnD */
/* unused harmony export updateDropEffect */
/* harmony export (immutable) */ __webpack_exports__["h"] = dragAble;
/* harmony export (immutable) */ __webpack_exports__["i"] = dropAble;
/* harmony export (immutable) */ __webpack_exports__["c"] = attr;
/* harmony export (immutable) */ __webpack_exports__["r"] = setText;
/* harmony export (immutable) */ __webpack_exports__["l"] = forEach;
/* harmony export (immutable) */ __webpack_exports__["m"] = forEachChild;
/* harmony export (immutable) */ __webpack_exports__["e"] = createTextHints;
/* harmony export (immutable) */ __webpack_exports__["d"] = clipText;
/* harmony export (immutable) */ __webpack_exports__["s"] = showOverlay;
/* harmony export (immutable) */ __webpack_exports__["n"] = hideOverlays;
/* harmony export (immutable) */ __webpack_exports__["o"] = matchColumns;
/* harmony export (immutable) */ __webpack_exports__["j"] = equalArrays;
/* harmony export (immutable) */ __webpack_exports__["g"] = deriveColors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */

function round(v, precision = 0) {
    if (precision === 0) {
        return Math.round(v);
    }
    const scale = Math.pow(10, precision);
    return Math.round(v * scale) / scale;
}
function findOption(options) {
    return (key, defaultValue) => {
        if (key in options) {
            return options[key];
        }
        if (key.indexOf('.') > 0) {
            const p = key.substring(0, key.indexOf('.'));
            key = key.substring(key.indexOf('.') + 1);
            if (p in options && key in options[p]) {
                return options[p][key];
            }
        }
        return defaultValue;
    };
}
function similar(a, b, delta = 0.5) {
    if (a === b) {
        return true;
    }
    return Math.abs(a - b) < delta;
}
/**
 * create a delayed call, can be called multiple times but only the last one at most delayed by timeToDelay will be executed
 * @param {(...args: any[]) => void} callback the callback to call
 * @param {number} timeToDelay delay the call in milliseconds
 * @return {(...args: any[]) => any} a function that can be called with the same interface as the callback but delayed
 */
function debounce(callback, timeToDelay = 100, choose) {
    let tm = -1;
    let ctx = null;
    return function (...args) {
        if (tm >= 0) {
            clearTimeout(tm);
            tm = -1;
        }
        const next = { self: this, args };
        ctx = ctx && choose ? choose(ctx, next) : next;
        tm = setTimeout(() => {
            console.assert(ctx != null);
            callback.call(ctx.self, ...ctx.args);
            ctx = null;
        }, timeToDelay);
    };
}
function suffix(suffix, ...prefix) {
    return prefix.map((p) => `${p}${suffix}`);
}
/**
 * base class for event dispatching using d3 event mechanism
 */
class AEventDispatcher {
    constructor() {
        this.listeners = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["dispatch"])(...this.createEventList());
        const that = this;
        this.forwarder = function (...args) {
            that.fireImpl(this.type, this.primaryType, this.origin, ...args);
        };
    }
    on(type, listener) {
        if (listener !== undefined) {
            if (Array.isArray(type)) {
                type.forEach((d) => this.listeners.on(d, listener));
            }
            else {
                this.listeners.on(type, listener);
            }
            return this;
        }
        return this.listeners.on(type);
    }
    /**
     * return the list of events to be able to dispatch
     * @return {Array} by default no events
     */
    createEventList() {
        return [];
    }
    fire(type, ...args) {
        const primaryType = Array.isArray(type) ? type[0] : type;
        this.fireImpl(type, primaryType, this, ...args);
    }
    fireImpl(type, primaryType, origin, ...args) {
        const fireImpl = (t) => {
            //local context per event, set a this argument
            const context = {
                source: this,
                origin,
                type: t,
                primaryType,
                args //the arguments to the listener
            };
            this.listeners[t].apply(context, args);
        };
        if (Array.isArray(type)) {
            type.forEach(fireImpl.bind(this));
        }
        else {
            fireImpl(type);
        }
    }
    /**
     * forwards one or more events from a given dispatcher to the current one
     * i.e. when one of the given events is fired in 'from' it will be forwarded to all my listeners
     * @param {AEventDispatcher} from the event dispatcher to forward from
     * @param {string[]} types the event types to forward
     */
    forward(from, ...types) {
        from.on(types, this.forwarder);
    }
    /**
     * removes the forwarding declarations
     * @param {AEventDispatcher} from the originated dispatcher
     * @param {string[]} types event types to forward
     */
    unforward(from, ...types) {
        from.on(types, null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AEventDispatcher;

const TYPE_OBJECT = '[object Object]';
//credits to https://github.com/vladmiller/dextend/blob/master/lib/dextend.js
function merge(...args) {
    let result = null;
    for (const toMerge of args) {
        const keys = Object.keys(toMerge);
        if (result === null) {
            result = toMerge;
            continue;
        }
        for (const keyName of keys) {
            const value = toMerge[keyName];
            //merge just POJOs
            if (Object.prototype.toString.call(value) === TYPE_OBJECT && (Object.getPrototypeOf(value) === Object.prototype)) {
                if (result[keyName] === undefined) {
                    result[keyName] = {};
                }
                result[keyName] = merge(result[keyName], value);
            }
            else if (Array.isArray(value)) {
                if (result[keyName] === undefined) {
                    result[keyName] = [];
                }
                result[keyName] = value.concat(result[keyName]);
            }
            else {
                result[keyName] = value;
            }
        }
    }
    return result;
}
/**
 * computes the absolute offset of the given element
 * @param {Element} element element to compute the offset of
 * @return {{left: number, top: number, width: number, height: number}} offset of the element
 */
function offset(element) {
    const obj = element.getBoundingClientRect();
    return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: obj.width,
        height: obj.height
    };
}
/**
 * content scroller utility
 *
 * a class for efficiently selecting a range of data items that are currently visible according to the scrolled position
 */
class ContentScroller extends AEventDispatcher {
    /**
     * utility for scrolling
     * @param {Element} container the container element wrapping the content with a fixed height for enforcing scrolling
     * @param {Element} content the content element to scroll
     * @param {IContentScrollerOptions} options options see attribute
     */
    constructor(container, content, options = {}) {
        super();
        this.container = container;
        this.options = {
            pageSize: 100,
            rowHeight: 20,
            backupRows: 5
        };
        this.prevScrollTop = 0;
        this.shift = 0;
        merge(this.options, options);
        Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(container).on('scroll.scroller', () => this.onScroll());
        //keep the previous state computing whether a redraw is needed
        this.prevScrollTop = container.scrollTop;
        //total shift to the top
        this.shift = offset(content).top - offset(container).top;
    }
    /**
     * two events are fired:
     *  * scroll when the user scrolls the container
     *  * redraw when a redraw of the content must be performed due to scrolling changes. Note due to backup rows
     *     a scrolling operation might not include a redraw
     *
     * @returns {string[]} list of events
     */
    createEventList() {
        return super.createEventList().concat([ContentScroller.EVENT_REDRAW, ContentScroller.EVENT_SCROLL]);
    }
    scrollIntoView(start, length, index, row2y) {
        const range = this.selectImpl(start, length, row2y, 0);
        if (range.from <= index && index <= range.to) {
            return; //already visible
        }
        const target = row2y(index) - 10; //magic constanst shift
        const min = 0;
        const max = this.container.scrollHeight - this.container.clientHeight;
        // clamp to valid area
        this.container.scrollTop = Math.max(min, Math.min(max, target));
    }
    /**
     * selects a range identified by start and length and the row2y position callback returning the slice to show according to the current user scrolling position
     * @param {number} start start of the range
     * @param {number} length length of the range
     * @param {(i: number) => number} row2y lookup for computing the y position of a given row
     * @return {{from: number; to: number}} the slide to show
     */
    select(start, length, row2y) {
        return this.selectImpl(start, length, row2y, this.options.backupRows);
    }
    selectImpl(start, length, row2y, backupRows) {
        const top = this.container.scrollTop - this.shift, bottom = top + this.container.clientHeight;
        let i = 0, j;
        /*console.log(window.matchMedia('print').matches, window.matchMedia('screen').matches, top, bottom);
         if (typeof window.matchMedia === 'function' && window.matchMedia('print').matches) {
         console.log('show all');
         return [0, data.length];
         }*/
        if (top > 0) {
            i = Math.round(top / this.options.rowHeight);
            //count up till really even partial rows are visible
            while (i >= start && row2y(i + 1) > top) {
                i--;
            }
            i -= backupRows; //one more row as backup for scrolling
        }
        {
            j = Math.round(bottom / this.options.rowHeight);
            //count down till really even partial rows are visible
            while (j <= length && row2y(j - 1) < bottom) {
                j++;
            }
            j += backupRows; //one more row as backup for scrolling
        }
        return {
            from: Math.max(i, start),
            to: Math.min(j, length)
        };
    }
    onScroll() {
        const top = this.container.scrollTop;
        const left = this.container.scrollLeft;
        //at least one row changed
        //console.log(top, left);
        this.fire(ContentScroller.EVENT_SCROLL, top, left);
        if (Math.abs(this.prevScrollTop - top) < this.options.pageSize) {
            return;
        }
        //we scrolled out of our backup rows, so we have to redraw the content
        const delta = this.prevScrollTop - top;
        this.prevScrollTop = top;
        this.fire(ContentScroller.EVENT_REDRAW, delta);
    }
    /**
     * removes the listeners
     */
    destroy() {
        Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.container).on('scroll.scroller', null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ContentScroller;

ContentScroller.EVENT_SCROLL = 'scroll';
ContentScroller.EVENT_REDRAW = 'redraw';
/**
 * checks whether the given DragEvent has one of the given types
 * @param {DragEvent} e event to check
 * @param {string[]} typesToCheck mime types to check
 * @return {boolean} has any mime to check mime types
 */
function hasDnDType(e, typesToCheck) {
    const types = e.dataTransfer.types;
    if (typeof types.indexOf === 'function') {
        return typesToCheck.some((type) => types.indexOf(type) >= 0);
    }
    if (typeof types.includes === 'function') {
        return typesToCheck.some((type) => types.includes(type));
    }
    if (typeof types.contains === 'function') {
        return typesToCheck.some((type) => types.contains(type));
    }
    return false;
}
/**
 * helper storage for dnd in edge since edge doesn't support custom mime-types
 * @type {Map<string, {[p: string]: string}>}
 */
const dndTransferStorage = new Map();
function isEdgeDnD(e) {
    return dndTransferStorage.size > 0 && hasDnDType(e, ['text/plain']);
}
/**
 * should it be a copy dnd operation?
 * @param {DragEvent} e event to check
 * @return {boolean} whether it is a copy drag event
 */
function copyDnD(e) {
    const dT = e.dataTransfer;
    return (e.ctrlKey && dT.effectAllowed.match(/copy/gi) != null) || (dT.effectAllowed.match(/move/gi) == null);
}
/**
 * updates the drop effect according to the currently selected meta keys
 * @param {DragEvent} e event to update
 */
function updateDropEffect(e) {
    const dT = e.dataTransfer;
    if (copyDnD(e)) {
        dT.dropEffect = 'copy';
    }
    else {
        dT.dropEffect = 'move';
    }
}
function dragAble(onDragStart) {
    return ($node) => {
        $node.on('dragstart', (d) => {
            const e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            const payload = onDragStart(d);
            e.dataTransfer.effectAllowed = payload.effectAllowed;
            const keys = Object.keys(payload.data);
            const allSucceded = keys.every((k) => {
                try {
                    e.dataTransfer.setData(k, payload.data[k]);
                    return true;
                }
                catch (e) {
                    return false;
                }
            });
            if (allSucceded) {
                return;
            }
            //compatibility mode for edge
            const text = payload.data['text/plain'] || '';
            e.dataTransfer.setData('text/plain', `${d.id}${text ? `: ${text}` : ''}`);
            dndTransferStorage.set(d.id, payload.data);
        }).on('dragend', (d) => {
            if (dndTransferStorage.size > 0) {
                //clear the id
                dndTransferStorage.delete(d.id);
            }
        });
    };
}
/**
 * returns a d3 callable function to make an element dropable, managed the class css 'drag_over' for hovering effects
 * @param mimeTypes the mime types to be dropable
 * @param onDrop: handler when an element is dropped
 */
function dropAble(mimeTypes, onDrop) {
    return ($node) => {
        $node.on('dragenter', function () {
            const e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            //var xy = mouse($node.node());
            if (hasDnDType(e, mimeTypes) || isEdgeDnD(e)) {
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', true);
                //sounds good
                return false;
            }
            //not a valid mime type
            Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', false);
            return;
        }).on('dragover', function () {
            const e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            if (hasDnDType(e, mimeTypes) || isEdgeDnD(e)) {
                e.preventDefault();
                updateDropEffect(e);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', true);
                return false;
            }
            return;
        }).on('dragleave', function () {
            //
            Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', false);
        }).on('drop', function (d) {
            const e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            e.preventDefault();
            Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', false);
            //var xy = mouse($node.node());
            if (isEdgeDnD(e)) {
                const base = e.dataTransfer.getData('text/plain');
                const id = base.indexOf(':') >= 0 ? base.substring(0, base.indexOf(':')) : base;
                if (dndTransferStorage.has(id)) {
                    const data = dndTransferStorage.get(id);
                    dndTransferStorage.delete(id);
                    return onDrop(data, d, copyDnD(e));
                }
            }
            if (hasDnDType(e, mimeTypes)) {
                const data = {};
                //selects the data contained in the data transfer
                mimeTypes.forEach((mime) => {
                    const value = e.dataTransfer.getData(mime);
                    if (value !== '') {
                        data[mime] = value;
                    }
                });
                return onDrop(data, d, copyDnD(e));
            }
            return;
        });
    };
}
/**
 * utility function to sets attributes and styles in a nodes
 * @param node
 * @param attrs
 * @param styles
 * @param text
 * @return {T}
 */
function attr(node, attrs = {}, styles = {}, text) {
    Object.keys(attrs).forEach((attr) => {
        const v = String(attrs[attr]);
        if (node.getAttribute(attr) !== v) {
            node.setAttribute(attr, v);
        }
    });
    Object.keys(styles).forEach((attr) => {
        const v = styles[attr];
        if (node.style.getPropertyValue(attr) !== v) {
            node.style.setProperty(attr, v);
        }
    });
    return setText(node, text);
}
function setText(node, text) {
    if (text === undefined) {
        return node;
    }
    //no performance boost if setting the text node directly
    //const textNode = <Text>node.firstChild;
    //if (textNode == null) {
    //  node.appendChild(node.ownerDocument.createTextNode(text));
    //} else {
    //  textNode.data = text;
    //}
    if (node.textContent !== text) {
        node.textContent = text;
    }
    return node;
}
/**
 * for each item matching the selector execute the callback
 * @param node
 * @param selector
 * @param callback
 */
function forEach(node, selector, callback) {
    Array.from(node.querySelectorAll(selector)).forEach(callback);
}
function forEachChild(node, callback) {
    Array.from(node.children).forEach(callback);
}
const ellipsis = '…';
function measureFontAweSomeSpinner(ctx) {
    ctx.font = '10pt FontAwesome';
    return ctx.measureText('\uf110').width;
}
function createTextHints(ctx, font) {
    const bak = ctx.font;
    const spinnerWidth = measureFontAweSomeSpinner(ctx);
    ctx.font = font;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const testText = `${alphabet}${alphabet.toUpperCase()}0123456789`;
    const r = {
        maxLetterWidth: ctx.measureText('M').width,
        avgLetterWidth: ctx.measureText(testText).width / testText.length,
        ellipsisWidth: ctx.measureText(ellipsis).width,
        spinnerWidth
    };
    ctx.font = bak;
    return r;
}
function clipText(ctx, text, x, y, maxWidth, hints) {
    //based on http://stackoverflow.com/questions/10508988/html-canvas-text-overflow-ellipsis#10511598
    const render = (t) => ctx.fillText(t, x, y, maxWidth);
    //check if using heuristics
    if (hints.maxLetterWidth * text.length <= maxWidth || maxWidth <= hints.ellipsisWidth || text.length === 0) {
        return render(text);
    }
    //check precisely
    if (ctx.measureText(text).width <= maxWidth) {
        return render(text);
    }
    const availWidth = maxWidth - hints.ellipsisWidth;
    // use binary search
    let min = 0;
    let max = text.length - 1;
    // guess first based on average letter width
    let guess = Math.min(max, Math.floor(maxWidth / hints.avgLetterWidth));
    while (min < max) {
        const overflow = availWidth - ctx.measureText(text.substring(0, guess + 1)).width;
        if (overflow < 0) {
            max = guess - 1;
        }
        else if (overflow > 0) {
            min = guess + 1;
        }
        else {
            break;
        }
        guess = Math.floor((max + min) / 2); //compute next guess
    }
    return render(text.substring(0, min + 1) + ellipsis);
}
function showOverlay(parentElement, id, dx, dy) {
    let overlay = parentElement.querySelector(`div.lu-overlay#O${id}`);
    if (!overlay) {
        overlay = parentElement.ownerDocument.createElement('div');
        overlay.classList.add('lu-overlay');
        overlay.id = `O${id}`;
        parentElement.appendChild(overlay);
    }
    overlay.style.display = 'block';
    overlay.style.left = `${dx}px`;
    overlay.style.top = `${dy}px`;
    return overlay;
}
function hideOverlays(parentElement) {
    forEach(parentElement, 'div.lu-overlay', (d) => d.style.display = null);
}
/**
 * matches the columns and the dom nodes representing them
 * @param {SVGGElement | HTMLElement} node row
 * @param {{column: Column; renderer: IDOMCellRenderer}[]} columns columns to check
 * @param {string} helperType create types of
 */
function matchColumns(node, columns, render, helperType = 'svg') {
    const renderer = render === 'detail' ? (col) => col.column.getRendererType() : (col) => col.column.getGroupRenderer();
    if (node.childElementCount === 0) {
        // initial call fast method
        node.innerHTML = columns.map((c) => (render === 'detail' ? c.renderer : c.groupRenderer).template).join('');
        columns.forEach((col, i) => {
            const cnode = node.childNodes[i];
            // set attribute for finding again
            cnode.setAttribute('data-column-id', col.column.id);
            // store current renderer
            cnode.setAttribute('data-renderer', renderer(col));
        });
        return;
    }
    function matches(c, i) {
        //do both match?
        const n = (node.childElementCount <= i ? null : node.childNodes[i]);
        return n != null && n.getAttribute('data-column-id') === c.column.id && n.getAttribute('data-renderer') === renderer(c);
    }
    if (columns.every(matches)) {
        return; //nothing to do
    }
    const idsAndRenderer = new Set(columns.map((c) => `${c.column.id}@${renderer(c)}`));
    //remove all that are not existing anymore
    Array.from(node.childNodes).forEach((n) => {
        const id = n.getAttribute('data-column-id');
        const renderer = n.getAttribute('data-renderer');
        const idAndRenderer = `${id}@${renderer}`;
        if (!idsAndRenderer.has(idAndRenderer)) {
            node.removeChild(n);
        }
    });
    const helper = helperType === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', 'g') : document.createElement('div');
    columns.forEach((col) => {
        let cnode = node.querySelector(`[data-column-id="${col.column.id}"]`);
        if (!cnode) {
            //create one
            helper.innerHTML = (render === 'detail' ? col.renderer : col.groupRenderer).template;
            cnode = helper.childNodes[0];
            cnode.setAttribute('data-column-id', col.column.id);
            cnode.setAttribute('data-renderer', renderer(col));
        }
        node.appendChild(cnode);
    });
}
function equalArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    return a.every((ai, i) => ai === b[i]);
}
/**
 * assigns colors to columns if they are numbers and not yet defined
 * @param columns
 * @returns {IColumnDesc[]}
 */
function deriveColors(columns) {
    const colors = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].category10().range().slice();
    columns.forEach((col) => {
        switch (col.type) {
            case 'number':
                col.color = colors.shift();
                break;
        }
    });
    return columns;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = fixCSS;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Group__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__missing__ = __webpack_require__(5);
/**
 * Created by Samuel Gratzl on 06.08.2015.
 */



/**
 * converts a given id to css compatible one
 * @param id
 * @return {string|void}
 */
function fixCSS(id) {
    return id.replace(/[\s!#$%&'()*+,.\/:;<=>?@\[\\\]\^`{|}~]/g, '_'); //replace non css stuff to _
}
/**
 * a column in LineUp
 */
class Column extends __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* AEventDispatcher */] {
    constructor(id, desc) {
        super();
        this.desc = desc;
        /**
         * width of the column
         * @type {number}
         * @private
         */
        this.width = 100;
        /**
         * parent column of this column, set when added to a ranking or combined column
         */
        this.parent = null;
        this.uid = fixCSS(id);
        this.rendererInfo = {
            renderer: this.desc.rendererType || this.desc.type,
            groupRenderer: this.desc.groupRenderer || this.desc.type
        };
        this.cssClass = desc.cssClass || '';
        this.metadata = {
            label: desc.label || this.id,
            description: desc.description || '',
            color: desc.color || (this.cssClass !== '' ? null : Column.DEFAULT_COLOR)
        };
    }
    get id() {
        return this.uid;
    }
    assignNewId(idGenerator) {
        this.uid = fixCSS(idGenerator());
    }
    get label() {
        return this.metadata.label;
    }
    get description() {
        return this.metadata.description;
    }
    get color() {
        return this.metadata.color;
    }
    /**
     * return the css class to use for the header
     * @return {string}
     */
    get headerCssClass() {
        return this.desc.type;
    }
    /**
     * returns the fully qualified id i.e. path the parent
     * @returns {string}
     */
    get fqid() {
        return this.parent ? `${this.parent.fqid}_${this.id}` : this.id;
    }
    get fqpath() {
        return this.parent ? `${this.parent.fqpath}@${this.parent.indexOf(this)}` : '';
    }
    /**
     * list of events
     * fires:
     *  * widthChanged
     *  * filterChanged
     *  * labelChanged
     *  * metaDataChanged
     *  * compressChanged
     *  * addColumn, removeColumn ... for composite pattern
     *  * dirty, dirtyHeader, dirtyValues
     * @returns {string[]} the list of events
     */
    createEventList() {
        return super.createEventList().concat([Column.EVENT_WIDTH_CHANGED, Column.EVENT_FILTER_CHANGED,
            Column.EVENT_LABEL_CHANGED, Column.EVENT_METADATA_CHANGED,
            Column.EVENT_ADD_COLUMN, Column.EVENT_REMOVE_COLUMN, Column.EVENT_RENDERER_TYPE_CHANGED, Column.EVENT_GROUP_RENDERER_TYPE_CHANGED, Column.EVENT_SORTMETHOD_CHANGED, Column.EVENT_MOVE_COLUMN,
            Column.EVENT_DIRTY, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES, Column.EVENT_GROUPING_CHANGED]);
    }
    getWidth() {
        return this.width;
    }
    /**
     * a column is hidden if it has no width
     * @return {boolean} whether the column is hidden
     */
    isHidden() {
        return this.width <= 0;
    }
    hide() {
        return this.setWidth(0);
    }
    /**
     * visitor pattern for flattening the columns
     * @param {IFlatColumn} r the result array
     * @param {number} offset left offset
     * @param {number} _levelsToGo how many levels down
     * @param {number} _padding padding between columns
     * @returns {number} the used width by this column
     */
    flatten(r, offset, _levelsToGo = 0, _padding = 0) {
        const w = this.getWidth();
        r.push({ col: this, offset, width: w });
        return w;
    }
    setWidth(value) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["t" /* similar */])(this.width, value, 0.5)) {
            return;
        }
        this.fire([Column.EVENT_WIDTH_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY], this.width, this.width = value);
    }
    setWidthImpl(value) {
        this.width = value;
    }
    setMetaData(value) {
        if (value.label === this.label && this.color === value.color && this.description === value.description) {
            return;
        }
        const events = this.color === value.color ?
            [Column.EVENT_LABEL_CHANGED, Column.EVENT_METADATA_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY] :
            [Column.EVENT_LABEL_CHANGED, Column.EVENT_METADATA_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY];
        const bak = this.getMetaData();
        //copy to avoid reference
        this.metadata = {
            label: value.label,
            color: value.color,
            description: value.description
        };
        this.fire(events, bak, this.getMetaData());
    }
    getMetaData() {
        return {
            label: this.label,
            color: this.color,
            description: this.description
        };
    }
    /**
     * triggers that the ranking is sorted by this column
     * @param ascending ascending order?
     * @returns {boolean} was successful
     */
    sortByMe(ascending = false) {
        const r = this.findMyRanker();
        if (r) {
            return r.sortBy(this, ascending);
        }
        return false;
    }
    groupByMe() {
        const r = this.findMyRanker();
        if (r) {
            return r.toggleGrouping(this);
        }
        return false;
    }
    /**
     *
     * @return {number}
     */
    isGroupedBy() {
        const r = this.findMyRanker();
        if (!r) {
            return -1;
        }
        return r.getGroupCriteria().indexOf(this);
    }
    /**
     * toggles the sorting order of this column in the ranking
     * @returns {boolean} was successful
     */
    toggleMySorting() {
        const r = this.findMyRanker();
        if (r) {
            return r.toggleSorting(this);
        }
        return false;
    }
    isSortedByMeImpl(selector) {
        const ranker = this.findMyRanker();
        if (!ranker) {
            return { asc: undefined, priority: undefined };
        }
        const criterias = selector(ranker);
        const index = criterias.findIndex((c) => c.col === this);
        if (index < 0) {
            return { asc: undefined, priority: undefined };
        }
        return {
            asc: criterias[index].asc ? 'asc' : 'desc',
            priority: index.toString()
        };
    }
    isSortedByMe() {
        return this.isSortedByMeImpl((r) => r.getSortCriterias());
    }
    groupSortByMe(ascending = false) {
        const r = this.findMyRanker();
        if (r) {
            return r.groupSortBy(this, ascending);
        }
        return false;
    }
    toggleMyGroupSorting() {
        const r = this.findMyRanker();
        if (r) {
            return r.toggleGroupSorting(this);
        }
        return false;
    }
    isGroupSortedByMe() {
        return this.isSortedByMeImpl((r) => r.getGroupSortCriteria());
    }
    /**
     * removes the column from the ranking
     * @returns {boolean} was successful
     */
    removeMe() {
        if (this.parent) {
            return this.parent.remove(this);
        }
        return false;
    }
    /**
     * inserts the given column after itself
     * @param col the column to insert
     * @returns {boolean} was successful
     */
    insertAfterMe(col) {
        if (this.parent) {
            return this.parent.insertAfter(col, this) != null;
        }
        return false;
    }
    /**
     * finds the underlying ranking column
     * @returns {Ranking|null} my current ranking
     */
    findMyRanker() {
        if (this.parent) {
            return this.parent.findMyRanker();
        }
        return null;
    }
    /**
     * dumps this column to JSON compatible format
     * @param toDescRef helper mapping function
     * @returns {any} dump of this column
     */
    dump(toDescRef) {
        const r = {
            id: this.id,
            desc: toDescRef(this.desc),
            width: this.width
        };
        if (this.label !== (this.desc.label || this.id)) {
            r.label = this.label;
        }
        if (this.color !== (this.desc.color || Column.DEFAULT_COLOR) && this.color) {
            r.color = this.color;
        }
        if (this.getRendererType() !== this.desc.type) {
            r.rendererType = this.getRendererType();
        }
        return r;
    }
    /**
     * restore the column content from a dump
     * @param dump column dump
     * @param _factory helper for creating columns
     */
    restore(dump, _factory) {
        this.width = dump.width || this.width;
        this.metadata = {
            label: dump.label || this.label,
            color: dump.color || this.color,
            description: this.description
        };
        if (dump.rendererType) {
            this.rendererInfo.renderer = dump.rendererType;
        }
        if (dump.groupRenderer) {
            this.rendererInfo.groupRenderer = dump.groupRenderer;
        }
    }
    /**
     * return the label of a given row for the current column
     * @param row the current row
     * @param index its row index
     * @return {string} the label of this column at the specified row
     */
    getLabel(row, index) {
        return String(this.getValue(row, index));
    }
    /**
     * return the value of a given row for the current column
     * @param _row the current row
     * @param _index its row index
     * @return the value of this column at the specified row
     */
    getValue(_row, _index) {
        return ''; //no value
    }
    isMissing(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__missing__["b" /* isMissingValue */])(this.getValue(row, index));
    }
    /**
     * compare function used to determine the order according to the values of the current column
     * @param _a first element
     * @param _b second element
     * @param _aIndex index of the first element
     * @param _bIndex index of the second element
     * @return {number}
     */
    compare(_a, _b, _aIndex, _bIndex) {
        return 0; //can't compare
    }
    /**
     * group the given row into a bin/group
     * @param _row
     * @param _index
     * @return {IGroup}
     */
    group(_row, _index) {
        return __WEBPACK_IMPORTED_MODULE_1__Group__["a" /* defaultGroup */];
    }
    /**
     * compares groups
     * @param {IGroupData} a
     * @param {IGroupData} b
     * @return {number}
     */
    groupCompare(a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }
    /**
     * flag whether any filter is applied
     * @return {boolean}
     */
    isFiltered() {
        return false;
    }
    /**
     * predicate whether the current row should be included
     * @param row
     * @param _index the row index
     * @return {boolean}
     */
    filter(row, _index) {
        return row !== null;
    }
    /**
     * determines the renderer type that should be used to render this column. By default the same type as the column itself
     * @return {string}
     */
    getRendererType() {
        return this.rendererInfo.renderer;
    }
    getGroupRenderer() {
        return this.rendererInfo.groupRenderer;
    }
    setRendererType(renderer) {
        if (renderer === this.rendererInfo.renderer) {
            // nothing changes
            return;
        }
        this.fire([Column.EVENT_RENDERER_TYPE_CHANGED, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY], this.rendererInfo.renderer, this.rendererInfo.renderer = renderer);
    }
    setDefaultRenderer(renderer) {
        if (this.rendererInfo.renderer !== this.desc.type) {
            return;
        }
        return this.setRendererType(renderer);
    }
    setGroupRenderer(renderer) {
        if (renderer === this.rendererInfo.groupRenderer) {
            // nothing changes
            return;
        }
        this.fire([Column.EVENT_GROUP_RENDERER_TYPE_CHANGED, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY], this.rendererInfo.groupRenderer, this.rendererInfo.groupRenderer = renderer);
    }
    setDefaultGroupRenderer(renderer) {
        if (this.rendererInfo.groupRenderer !== this.desc.type) {
            return;
        }
        return this.setGroupRenderer(renderer);
    }
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    toSortingDesc(toId) {
        return toId(this.desc);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Column;

/**
 * default color that should be used
 * @type {string}
 */
Column.DEFAULT_COLOR = '#C1C1C1';
/**
 * magic variable for showing all columns
 * @type {number}
 */
Column.FLAT_ALL_COLUMNS = -1;
Column.EVENT_WIDTH_CHANGED = 'widthChanged';
Column.EVENT_FILTER_CHANGED = 'filterChanged';
Column.EVENT_LABEL_CHANGED = 'labelChanged';
Column.EVENT_METADATA_CHANGED = 'metaDataChanged';
Column.EVENT_ADD_COLUMN = 'addColumn';
Column.EVENT_MOVE_COLUMN = 'moveColumn';
Column.EVENT_REMOVE_COLUMN = 'removeColumn';
Column.EVENT_DIRTY = 'dirty';
Column.EVENT_DIRTY_HEADER = 'dirtyHeader';
Column.EVENT_DIRTY_VALUES = 'dirtyValues';
Column.EVENT_RENDERER_TYPE_CHANGED = 'rendererTypeChanged';
Column.EVENT_GROUP_RENDERER_TYPE_CHANGED = 'groupRendererChanged';
Column.EVENT_SORTMETHOD_CHANGED = 'sortMethodChanged';
Column.EVENT_GROUPING_CHANGED = 'groupingChanged';


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = isNumberColumn;
/* harmony export (immutable) */ __webpack_exports__["e"] = compareBoxPlot;
/* harmony export (immutable) */ __webpack_exports__["f"] = getBoxPlotNumber;
/* harmony export (immutable) */ __webpack_exports__["i"] = isNumbersColumn;
/* harmony export (immutable) */ __webpack_exports__["m"] = numberCompare;
/* harmony export (immutable) */ __webpack_exports__["k"] = medianIndex;
/* harmony export (immutable) */ __webpack_exports__["g"] = groupCompare;
/* harmony export (immutable) */ __webpack_exports__["l"] = noNumberFilter;
/* harmony export (immutable) */ __webpack_exports__["j"] = isSameFilter;
/* harmony export (immutable) */ __webpack_exports__["n"] = restoreFilter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);




const DEFAULT_FORMATTER = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["format"])('.3n');
/* harmony export (immutable) */ __webpack_exports__["b"] = DEFAULT_FORMATTER;

function isNumberColumn(col) {
    return (col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */] && typeof col.getNumber === 'function' || (!(col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */]) && col.type.match(/(number|stack|ordinal)/) != null));
}
function compareBoxPlot(col, a, b, aIndex, bIndex) {
    const aVal = col.getBoxPlotData(a, aIndex);
    const bVal = col.getBoxPlotData(b, bIndex);
    if (aVal === null) {
        return bVal === null ? 0 : __WEBPACK_IMPORTED_MODULE_0__missing__["a" /* FIRST_IS_NAN */];
    }
    if (bVal === null) {
        return __WEBPACK_IMPORTED_MODULE_0__missing__["a" /* FIRST_IS_NAN */] * -1;
    }
    const method = col.getSortMethod();
    return numberCompare(aVal[method], bVal[method]);
}
function getBoxPlotNumber(col, row, index, mode) {
    const data = mode === 'normalized' ? col.getBoxPlotData(row, index) : col.getRawBoxPlotData(row, index);
    if (data === null) {
        return NaN;
    }
    return data[col.getSortMethod()];
}
const SORT_METHOD = {
    min: 'min',
    max: 'max',
    median: 'median',
    q1: 'q1',
    q3: 'q3'
};
/* harmony export (immutable) */ __webpack_exports__["d"] = SORT_METHOD;

const ADVANCED_SORT_METHOD = Object.assign({
    mean: 'mean'
}, SORT_METHOD);
/* harmony export (immutable) */ __webpack_exports__["a"] = ADVANCED_SORT_METHOD;

/**
 * helper class to lazily compute box plotdata out of a given number array
 */
class LazyBoxPlotData {
    constructor(values, scale) {
        this.scale = scale;
        this._sorted = null;
        this._outlier = null;
        // filter out NaN
        this.values = values.filter((d) => !Object(__WEBPACK_IMPORTED_MODULE_0__missing__["b" /* isMissingValue */])(d));
    }
    /**
     * lazy compute sorted array
     * @returns {number[]}
     */
    get sorted() {
        if (this._sorted === null) {
            this._sorted = this.values.slice().sort(__WEBPACK_IMPORTED_MODULE_2_d3__["ascending"]);
        }
        return this._sorted;
    }
    map(v) {
        return this.scale ? this.scale.apply(v) : v;
    }
    get min() {
        return this.map(Math.min(...this.values));
    }
    get max() {
        return this.map(Math.max(...this.values));
    }
    get median() {
        return this.map(Object(__WEBPACK_IMPORTED_MODULE_2_d3__["median"])(this.sorted));
    }
    get q1() {
        return this.map(Object(__WEBPACK_IMPORTED_MODULE_2_d3__["quantile"])(this.sorted, 0.25));
    }
    get q3() {
        return this.map(Object(__WEBPACK_IMPORTED_MODULE_2_d3__["quantile"])(this.sorted, 0.75));
    }
    get mean() {
        return this.map(Object(__WEBPACK_IMPORTED_MODULE_2_d3__["mean"])(this.values));
    }
    get outlier() {
        if (this._outlier) {
            return this._outlier;
        }
        const q1 = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["quantile"])(this.sorted, 0.25);
        const q3 = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["quantile"])(this.sorted, 0.75);
        const iqr = q3 - q1;
        const left = q1 - 1.5 * iqr;
        const right = q3 + 1.5 * iqr;
        this._outlier = this.sorted.filter((v) => (v < left || v > right) && !Object(__WEBPACK_IMPORTED_MODULE_0__missing__["b" /* isMissingValue */])(v));
        if (this.scale) {
            this._outlier = this._outlier.map((v) => this.scale.apply(v));
        }
        return this._outlier;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = LazyBoxPlotData;

function isNumbersColumn(col) {
    return col.getNumbers !== undefined && isNumberColumn(col);
}
/**
 * save number comparison
 * @param a
 * @param b
 * @param aMissing
 * @param bMissing
 * @return {number}
 */
function numberCompare(a, b, aMissing = false, bMissing = false) {
    aMissing = aMissing || a === null || isNaN(a);
    bMissing = bMissing || b === null || isNaN(b);
    if (aMissing) {
        return bMissing ? 0 : __WEBPACK_IMPORTED_MODULE_0__missing__["a" /* FIRST_IS_NAN */];
    }
    if (bMissing) {
        return __WEBPACK_IMPORTED_MODULE_0__missing__["a" /* FIRST_IS_NAN */] * -1;
    }
    return a - b;
}
function medianIndex(rows, col) {
    //return the median row
    const data = rows.map((r, i) => ({ i, v: col.getNumber(r.v, r.dataIndex), m: col.isMissing(r.v, r.dataIndex) }));
    const sorted = data.filter((r) => !r.m).sort((a, b) => numberCompare(a.v, b.v));
    const index = sorted[Math.floor(sorted.length / 2.0)];
    if (index === undefined) {
        return 0; //error case
    }
    return index.i;
}
function groupCompare(a, b, col, sortMethod) {
    const va = new LazyBoxPlotData(a.map((row) => col.getNumber(row.v, row.dataIndex)));
    const vb = new LazyBoxPlotData(b.map((row) => col.getNumber(row.v, row.dataIndex)));
    return numberCompare(va[sortMethod], vb[sortMethod]);
}
function noNumberFilter() {
    return ({ min: -Infinity, max: Infinity, filterMissing: false });
}
function isSameFilter(a, b) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__utils__["t" /* similar */])(a.min, b.min, 0.001) && Object(__WEBPACK_IMPORTED_MODULE_3__utils__["t" /* similar */])(a.max, b.max, 0.001) && a.filterMissing === b.filterMissing;
}
function restoreFilter(v) {
    return {
        min: v.min !== null && isFinite(v.min) ? v.min : -Infinity,
        max: v.max !== null && isFinite(v.max) ? v.max : +Infinity,
        filterMissing: v.filterMissing
    };
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = renderMissingValue;
/* harmony export (immutable) */ __webpack_exports__["b"] = renderMissingDOM;
/* harmony export (immutable) */ __webpack_exports__["a"] = renderMissingCanvas;
function renderMissingValue(ctx, width, height, x = 0, y = 0) {
    const dashColor = '#c1c1c1';
    const dashWidth = 10;
    const dashHeight = 3;
    const dashX = (width - x - dashWidth) / 2; // center horizontally
    const dashY = (height - y - dashHeight) / 2; // center vertically
    ctx.fillStyle = dashColor;
    ctx.fillRect(dashX, dashY, dashWidth, dashHeight);
}
function renderMissingDOM(node, col, d) {
    const missing = col.isMissing(d.v, d.dataIndex);
    node.classList.toggle('lu-missing', missing);
    return missing;
}
function renderMissingCanvas(ctx, col, d, height, x = 0, y = 0) {
    const missing = col.isMissing(d.v, d.dataIndex);
    if (missing) {
        renderMissingValue(ctx, col.getWidth(), height, x, y);
    }
    return missing;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isMissingValue;
/* harmony export (immutable) */ __webpack_exports__["c"] = isUnknown;
/**
 * Created by Samuel Gratzl on 11.10.2017.
 */
function isMissingValue(v) {
    return typeof (v) === 'undefined' || v == null || (typeof v === 'number' && isNaN(v)) || v === '' || v === 'NA' || (typeof (v) === 'string' && (v.toLowerCase() === 'na') || (v instanceof Array && v.every((v) => isMissingValue(v))));
}
function isUnknown(v) {
    return v === null || v === undefined || isNaN(v);
}
const FIRST_IS_NAN = -1;
/* harmony export (immutable) */ __webpack_exports__["a"] = FIRST_IS_NAN;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sortByProperty;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_popper_js__ = __webpack_require__(58);

class ADialog {
    constructor(attachment, title) {
        this.attachment = attachment;
        this.title = title;
    }
    static removePopup(popup) {
        const index = ADialog.visiblePopups.indexOf(popup);
        if (index > -1 && popup) {
            ADialog.visiblePopups.splice(index, 1);
            popup.remove();
        }
        if (ADialog.visiblePopups.length === 0) {
            popup.ownerDocument.removeEventListener('keyup', escKeyListener);
        }
    }
    static removeAllPopups() {
        if (ADialog.visiblePopups.length === 0) {
            return;
        }
        ADialog.visiblePopups.splice(0, ADialog.visiblePopups.length).forEach((d) => {
            d.ownerDocument.removeEventListener('keyup', escKeyListener);
            d.remove();
        });
    }
    static registerPopup(popup, popper, replace, enableCloseOnOutside = true) {
        if (replace) {
            ADialog.removeAllPopups();
        }
        if (ADialog.visiblePopups.length === 0) {
            popup.ownerDocument.addEventListener('keyup', escKeyListener);
        }
        const closePopupOnMouseLeave = () => {
            if (ADialog.visiblePopups[ADialog.visiblePopups.length - 1] !== popup) {
                return;
            }
            popup.removeEventListener('mouseleave', closePopupOnMouseLeave);
            popper.destroy();
            ADialog.removePopup(popup);
        };
        if (enableCloseOnOutside) {
            popup.addEventListener('mouseleave', closePopupOnMouseLeave);
        }
        ADialog.visiblePopups.push(popup);
    }
    /**
     * creates a simple popup dialog under the given attachment
     * @param body
     * @returns {Selection<any>}
     */
    makeMenuPopup(body) {
        const parent = this.attachment.ownerDocument.body;
        parent.insertAdjacentHTML('beforeend', `<div class="lu-popup2 lu-popup-menu">${body}</div>`);
        const popup = parent.lastElementChild;
        const popper = new __WEBPACK_IMPORTED_MODULE_0_popper_js__["a" /* default */](this.attachment, popup, {
            placement: 'bottom-start',
            removeOnDestroy: true
        });
        ADialog.registerPopup(popup, popper, true);
        this.hidePopupOnClickOutside(popup);
        return popup;
    }
    /**
     * creates a simple popup dialog under the given attachment
     * @param body
     * @param enableCloseOnOutside hide when the user it outside the visible one
     * @returns {Selection<any>}
     */
    makePopup(body, enableCloseOnOutside = true) {
        const parent = this.attachment.ownerDocument.body;
        parent.insertAdjacentHTML('beforeend', `<div class="lu-popup2">${this.dialogForm(body)}</div>`);
        const popup = parent.lastElementChild;
        const auto = popup.querySelector('input[autofocus]');
        if (auto) {
            auto.focus();
        }
        const popper = new __WEBPACK_IMPORTED_MODULE_0_popper_js__["a" /* default */](this.attachment, popup, {
            placement: 'bottom-start',
            removeOnDestroy: true
        });
        ADialog.registerPopup(popup, popper, false, enableCloseOnOutside);
        this.hidePopupOnClickOutside(popup);
        return popup;
    }
    makeChoosePopup(body) {
        const parent = this.attachment.ownerDocument.body;
        parent.insertAdjacentHTML('beforeend', `<div class="lu-popup2 chooser">${this.basicDialog(body)}</div>`);
        const popup = parent.lastElementChild;
        const popper = new __WEBPACK_IMPORTED_MODULE_0_popper_js__["a" /* default */](this.attachment, popup, {
            placement: 'bottom-start',
            removeOnDestroy: true
        });
        ADialog.registerPopup(popup, popper, false);
        this.hidePopupOnClickOutside(popup);
        return popup;
    }
    dialogForm(body, addCloseButtons = true) {
        return `<span style="font-weight: bold" class="lu-popup-title">${this.title}</span>
            <form onsubmit="return false">
                ${body}
                ${addCloseButtons ?
            '<button type = "submit" class="ok fa fa-check" title="ok"></button>' +
                '<button type = "reset" class="cancel fa fa-times" title="cancel">' +
                '</button><button type = "button" class="reset fa fa-undo" title="reset"></button></form>' : ''}
            </form>`;
    }
    onButton(popup, handler) {
        popup.querySelector('.cancel').addEventListener('click', (evt) => {
            handler.cancel();
            ADialog.removePopup(popup);
            evt.stopPropagation();
            evt.preventDefault();
        });
        popup.querySelector('.reset').addEventListener('click', (evt) => {
            handler.reset();
            evt.stopPropagation();
            evt.preventDefault();
        });
        popup.querySelector('.ok').addEventListener('click', (evt) => {
            if (handler.submit()) {
                ADialog.removeAllPopups();
            }
            evt.stopPropagation();
            evt.preventDefault();
        });
    }
    basicDialog(body) {
        return `<span style="font-weight: bold" class="lu-popup-title">${this.title}</span>
            <form onsubmit="return false">
                ${body}
            </form>`;
    }
    hidePopupOnClickOutside(popup) {
        const body = this.attachment.ownerDocument.body;
        popup.addEventListener('click', (evt) => {
            // don't bubble up click events within the popup
            evt.stopPropagation();
        });
        const l = () => {
            ADialog.removeAllPopups();
            body.removeEventListener('click', l);
        };
        body.addEventListener('click', l);
    }
}
ADialog.visiblePopups = [];
function sortByProperty(prop) {
    return (a, b) => {
        const av = a[prop], bv = b[prop];
        return av.toLowerCase().localeCompare(bv.toLowerCase());
    };
}
/* harmony default export */ __webpack_exports__["a"] = (ADialog);
function escKeyListener(evt) {
    if (evt.which === 27 && ADialog.visiblePopups.length > 0) {
        const popup = ADialog.visiblePopups[ADialog.visiblePopups.length - 1];
        ADialog.removePopup(popup);
    }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/**
 * Created by sam on 04.11.2016.
 */

/**
 * a column having an accessor to get the cell value
 */
class ValueColumn extends __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        //find accessor
        this.accessor = desc.accessor || (() => null);
        this.loaded = desc.lazyLoaded !== true;
    }
    getLabel(row, index) {
        if (!this.isLoaded()) {
            return '';
        }
        return String(this.getValue(row, index));
    }
    getRaw(row, index) {
        if (!this.isLoaded()) {
            return null;
        }
        return this.accessor(row, index, this.id, this.desc, this.findMyRanker());
    }
    getValue(row, index) {
        return this.getRaw(row, index);
    }
    isLoaded() {
        return this.loaded;
    }
    setLoaded(loaded) {
        if (this.loaded === loaded) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.loaded, this.loaded = loaded);
    }
    getRendererType() {
        if (!this.isLoaded()) {
            return ValueColumn.RENDERER_LOADING;
        }
        return super.getRendererType();
    }
    /**
     * patch the dump such that the loaded attribute is defined (for lazy loading columns)
     * @param toDescRef
     * @returns {any}
     */
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.loaded = this.loaded;
        if (!this.loaded && r.rendererType === ValueColumn.RENDERER_LOADING) {
            delete r.rendererType;
        }
        return r;
    }
    restore(dump, factory) {
        if (dump.loaded !== undefined) {
            this.loaded = dump.loaded;
        }
        super.restore(dump, factory);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ValueColumn;

ValueColumn.RENDERER_LOADING = 'loading';


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createMappingFunction;
/* harmony export (immutable) */ __webpack_exports__["e"] = isMapAbleColumn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__INumberColumn__ = __webpack_require__(2);
/* unused harmony reexport isNumberColumn */
/**
 * Created by sam on 04.11.2016.
 */







function toScale(type = 'linear') {
    switch (type) {
        case 'log':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].log().clamp(true);
        case 'sqrt':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].sqrt().clamp(true);
        case 'pow1.1':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].pow().exponent(1.1).clamp(true);
        case 'pow2':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].pow().exponent(2).clamp(true);
        case 'pow3':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].pow().exponent(3).clamp(true);
        default:
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().clamp(true);
    }
}
function isSame(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    return a.every((ai, i) => Object(__WEBPACK_IMPORTED_MODULE_3__utils__["t" /* similar */])(ai, b[i], 0.0001));
}
function fixDomain(domain, type) {
    if (type === 'log' && domain[0] === 0) {
        domain[0] = 0.0000001; //0 is bad
    }
    return domain;
}
/**
 * a mapping function based on a d3 scale (linear, sqrt, log)
 */
class ScaleMappingFunction {
    constructor(domain = [0, 1], type = 'linear', range = [0, 1]) {
        this.type = type;
        this.s = toScale(type).domain(fixDomain(domain, this.type)).range(range);
    }
    get domain() {
        return this.s.domain();
    }
    set domain(domain) {
        this.s.domain(fixDomain(domain, this.type));
    }
    get range() {
        return this.s.range();
    }
    set range(range) {
        this.s.range(range);
    }
    getRange(format) {
        return [format(this.invert(0)), format(this.invert(1))];
    }
    apply(v) {
        return this.s(v);
    }
    invert(r) {
        return this.s.invert(r);
    }
    get scaleType() {
        return this.type;
    }
    dump() {
        return {
            type: this.type,
            domain: this.domain,
            range: this.range
        };
    }
    eq(other) {
        if (!(other instanceof ScaleMappingFunction)) {
            return false;
        }
        const that = other;
        return that.type === this.type && isSame(this.domain, that.domain) && isSame(this.range, that.range);
    }
    restore(dump) {
        this.type = dump.type;
        this.s = toScale(dump.type).domain(dump.domain).range(dump.range);
    }
    clone() {
        return new ScaleMappingFunction(this.domain, this.type, this.range);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScaleMappingFunction;

/**
 * a mapping function based on a custom user function using 'value' as the current value
 */
class ScriptMappingFunction {
    constructor(domain = [0, 1], _code = 'return this.linear(value,this.value_min,this.value_max);') {
        this.domain = domain;
        this._code = _code;
        this.f = new Function('value', _code);
    }
    get code() {
        return this._code;
    }
    set code(code) {
        if (this._code === code) {
            return;
        }
        this._code = code;
        this.f = new Function('value', code);
    }
    getRange() {
        return ['?', '?'];
    }
    apply(v) {
        const min = this.domain[0], max = this.domain[this.domain.length - 1];
        const r = this.f.call({
            value_min: min,
            value_max: max,
            value_range: max - min,
            value_domain: this.domain.slice(),
            linear: (v, mi, ma) => (v - mi) / (ma - mi)
        }, v);
        if (typeof r === 'number') {
            return Math.max(Math.min(r, 1), 0);
        }
        return NaN;
    }
    dump() {
        return {
            type: 'script',
            code: this.code
        };
    }
    eq(other) {
        if (!(other instanceof ScriptMappingFunction)) {
            return false;
        }
        const that = other;
        return that.code === this.code;
    }
    restore(dump) {
        this.code = dump.code;
    }
    clone() {
        return new ScriptMappingFunction(this.domain, this.code);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ScriptMappingFunction;

function createMappingFunction(dump) {
    if (dump.type === 'script') {
        const s = new ScriptMappingFunction();
        s.restore(dump);
        return s;
    }
    const l = new ScaleMappingFunction();
    l.restore(dump);
    return l;
}
function isMapAbleColumn(col) {
    return typeof col.getMapping === 'function';
}
/**
 * a number column mapped from an original input scale to an output range
 */
class NumberColumn extends __WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.missingValue = NaN;
        /**
         * currently active filter
         * @type {{min: number, max: number}}
         * @private
         */
        this.currentFilter = Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["l" /* noNumberFilter */])();
        this.numberFormat = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])('.2f');
        this.currentStratifyThresholds = [];
        this.groupSortMethod = __WEBPACK_IMPORTED_MODULE_5__INumberColumn__["a" /* ADVANCED_SORT_METHOD */].median;
        if (desc.map) {
            this.mapping = createMappingFunction(desc.map);
        }
        else if (desc.domain) {
            this.mapping = new ScaleMappingFunction(desc.domain, 'linear', desc.range || [0, 1]);
        }
        this.original = this.mapping.clone();
        if (desc.numberFormat) {
            this.numberFormat = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(desc.numberFormat);
        }
        if (desc.missingValue !== undefined) {
            this.missingValue = desc.missingValue;
        }
        this.setGroupRenderer('boxplot');
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.map = this.mapping.dump();
        r.filter = Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["j" /* isSameFilter */])(this.currentFilter, Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["l" /* noNumberFilter */])()) ? null : this.currentFilter;
        r.missingValue = this.missingValue;
        r.groupSortMethod = this.groupSortMethod;
        if (this.currentStratifyThresholds) {
            r.stratifyThreshholds = this.currentStratifyThresholds;
        }
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if (dump.map) {
            this.mapping = createMappingFunction(dump.map);
        }
        else if (dump.domain) {
            this.mapping = new ScaleMappingFunction(dump.domain, 'linear', dump.range || [0, 1]);
        }
        if (dump.groupSortMethod) {
            this.groupSortMethod = dump.groupSortMethod;
        }
        if (dump.filter) {
            this.currentFilter = Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["n" /* restoreFilter */])(dump.filter);
        }
        if (dump.stratifyThreshholds) {
            this.currentStratifyThresholds = dump.stratifyThresholds;
        }
        if (dump.missingValue !== undefined) {
            this.missingValue = dump.missingValue;
        }
        if (dump.numberFormat) {
            this.numberFormat = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(dump.numberFormat);
        }
    }
    createEventList() {
        return super.createEventList().concat([NumberColumn.EVENT_MAPPING_CHANGED]);
    }
    getLabel(row, index) {
        if (this.desc.numberFormat) {
            const raw = this.getRawValue(row, index);
            //if a dedicated format and a number use the formatter in any case
            if (isNaN(raw)) {
                return 'NaN';
            }
            if (!isFinite(raw)) {
                return raw.toString();
            }
            return this.numberFormat(raw);
        }
        const v = super.getValue(row, index);
        //keep non number if it is not a number else convert using formatter
        if (typeof v === 'number') {
            return this.numberFormat(+v);
        }
        return String(v);
    }
    getRange() {
        return this.mapping.getRange(this.numberFormat);
    }
    getRawValue(row, index, missingValue = this.missingValue) {
        const v = super.getValue(row, index);
        if (Object(__WEBPACK_IMPORTED_MODULE_4__missing__["b" /* isMissingValue */])(v)) {
            return missingValue;
        }
        return +v;
    }
    isMissing(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__missing__["b" /* isMissingValue */])(super.getValue(row, index));
    }
    getValue(row, index) {
        const v = this.getRawValue(row, index);
        if (isNaN(v)) {
            return v;
        }
        return this.mapping.apply(v);
    }
    getNumber(row, index) {
        return this.getValue(row, index);
    }
    getRawNumber(row, index, missingValue = this.missingValue) {
        return this.getRawValue(row, index, missingValue);
    }
    compare(a, b, aIndex, bIndex) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["m" /* numberCompare */])(this.getNumber(a, aIndex), this.getNumber(b, bIndex), this.isMissing(a, aIndex), this.isMissing(b, bIndex));
    }
    groupCompare(a, b) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["g" /* groupCompare */])(a.rows, b.rows, this, this.groupSortMethod);
    }
    getOriginalMapping() {
        return this.original.clone();
    }
    getMapping() {
        return this.mapping.clone();
    }
    setMapping(mapping) {
        if (this.mapping.eq(mapping)) {
            return;
        }
        this.fire([NumberColumn.EVENT_MAPPING_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.mapping.clone(), this.mapping = mapping);
    }
    isFiltered() {
        return this.currentFilter.filterMissing || isFinite(this.currentFilter.min) || isFinite(this.currentFilter.max);
    }
    get filterMin() {
        return this.currentFilter.min;
    }
    get filterMax() {
        return this.currentFilter.max;
    }
    get filterMissing() {
        return this.currentFilter.filterMissing;
    }
    getFilter() {
        return {
            min: this.currentFilter.min,
            max: this.currentFilter.max,
            filterMissing: this.currentFilter.filterMissing
        };
    }
    set filterMin(min) {
        const bak = this.getFilter();
        this.currentFilter.min = Object(__WEBPACK_IMPORTED_MODULE_4__missing__["c" /* isUnknown */])(min) ? -Infinity : min;
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
    }
    set filterMax(max) {
        const bak = this.getFilter();
        this.currentFilter.max = Object(__WEBPACK_IMPORTED_MODULE_4__missing__["c" /* isUnknown */])(max) ? Infinity : max;
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
    }
    set filterMissing(filterMissing) {
        const bak = this.getFilter();
        this.currentFilter.filterMissing = filterMissing;
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
    }
    setFilter(value = { min: -Infinity, max: +Infinity, filterMissing: false }) {
        if (Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["j" /* isSameFilter */])(value, this.currentFilter)) {
            return;
        }
        const bak = this.getFilter();
        this.currentFilter.min = Object(__WEBPACK_IMPORTED_MODULE_4__missing__["c" /* isUnknown */])(value.min) ? -Infinity : value.min;
        this.currentFilter.max = Object(__WEBPACK_IMPORTED_MODULE_4__missing__["c" /* isUnknown */])(value.max) ? Infinity : value.max;
        this.currentFilter.filterMissing = value.filterMissing;
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
    }
    /**
     * filter the current row if any filter is set
     * @param row
     * @param index row index
     * @returns {boolean}
     */
    filter(row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        //force a known missing value
        const v = this.getRawNumber(row, index, NaN);
        if (isNaN(v)) {
            return !this.filterMissing;
        }
        const vn = +v;
        return !((isFinite(this.currentFilter.min) && vn < this.currentFilter.min) || (isFinite(this.currentFilter.max) && vn > this.currentFilter.max));
    }
    getStratifyThresholds() {
        return this.currentStratifyThresholds.slice();
    }
    setStratifyThresholds(value) {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__utils__["j" /* equalArrays */])(this.currentStratifyThresholds, value)) {
            return;
        }
        const bak = this.getStratifyThresholds();
        this.currentStratifyThresholds = value.slice();
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_GROUPING_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, value);
    }
    group(row, index) {
        if (this.currentStratifyThresholds.length === 0) {
            return super.group(row, index);
        }
        const value = this.getRawNumber(row, index);
        const treshholdIndex = this.currentStratifyThresholds.findIndex((t) => t <= value);
        // group by thresholds / bins
        switch (treshholdIndex) {
            case -1:
                //bigger than the last threshold
                return {
                    name: `${this.label} > ${this.currentStratifyThresholds[this.currentStratifyThresholds.length - 1]}`,
                    color: 'gray'
                };
            case 0:
                //smallest
                return { name: `${this.label} <= ${this.currentStratifyThresholds[0]}`, color: 'gray' };
            default:
                return {
                    name: `${this.currentStratifyThresholds[index - 1]} <= ${this.label} <= ${this.currentStratifyThresholds[index]}`,
                    color: 'gray'
                };
        }
    }
    getSortMethod() {
        return this.groupSortMethod;
    }
    setSortMethod(sortMethod) {
        if (this.groupSortMethod === sortMethod) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED], this.groupSortMethod, this.groupSortMethod = sortMethod);
        // sort by me if not already sorted by me
        if (!this.isGroupSortedByMe().asc) {
            this.toggleMyGroupSorting();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = NumberColumn;

NumberColumn.EVENT_MAPPING_CHANGED = 'mappingChanged';


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueColumn__ = __webpack_require__(7);
/**
 * Created by sam on 04.11.2016.
 */


/**
 * a string column with optional alignment
 */
class StringColumn extends __WEBPACK_IMPORTED_MODULE_1__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.currentFilter = null;
        this._alignment = 'left';
        this.setWidthImpl(200); //by default 200
        this._alignment = desc.alignment || 'left';
    }
    //readonly
    get alignment() {
        return this._alignment;
    }
    getValue(row, index) {
        const v = super.getValue(row, index);
        if (typeof (v) === 'undefined' || v == null) {
            return '';
        }
        return String(v);
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        if (this.currentFilter instanceof RegExp) {
            r.filter = `REGEX:${this.currentFilter.source}`;
        }
        else {
            r.filter = this.currentFilter;
        }
        r.alignment = this.alignment;
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if (dump.filter && dump.filter.slice(0, 6) === 'REGEX:') {
            this.currentFilter = new RegExp(dump.filter.slice(6));
        }
        else {
            this.currentFilter = dump.filter || null;
        }
        this._alignment = dump.alignment || this._alignment;
    }
    isFiltered() {
        return this.currentFilter != null;
    }
    filter(row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        const r = this.getLabel(row, index), filter = this.currentFilter;
        if (filter === StringColumn.FILTER_MISSING) {
            return r != null && r.trim() !== '';
        }
        if (typeof filter === 'string' && filter.length > 0) {
            return r !== '' && r.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        }
        if (filter instanceof RegExp) {
            return r !== '' && filter.test(r);
        }
        return true;
    }
    getFilter() {
        return this.currentFilter;
    }
    setFilter(filter) {
        if (filter === '') {
            filter = null;
        }
        if (this.currentFilter === filter) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.currentFilter, this.currentFilter = filter);
    }
    compare(a, b, aIndex, bIndex) {
        const aValue = this.getValue(a, aIndex);
        const bValue = this.getValue(b, bIndex);
        if (aValue === '') {
            return bValue === '' ? 0 : +1; //same = 0
        }
        if (bValue === '') {
            return -1;
        }
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StringColumn;

//magic key for filtering missing ones
StringColumn.FILTER_MISSING = '__FILTER_MISSING';


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isCategoricalColumn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__missing__ = __webpack_require__(5);
/**
 * Created by sam on 04.11.2016.
 */





function isCategoricalColumn(col) {
    return (col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */] && typeof col.getCategories === 'function' || (!(col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */]) && col.type.match(/(categorical|ordinal|hierarchy)/) != null));
}
function isEqualFilter(a, b) {
    if (a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }
    if (a.filterMissing !== b.filterMissing || (typeof a.filter !== typeof b.filter)) {
        return false;
    }
    if (Array.isArray(a.filter)) {
        return arrayEquals(a.filter, b.filter);
    }
    return String(a.filter) === String(b.filter);
}
function arrayEquals(a, b) {
    const al = a != null ? a.length : 0;
    const bl = b != null ? b.length : 0;
    if (al !== bl) {
        return false;
    }
    if (al === 0) {
        return true;
    }
    return a.every((ai, i) => ai === b[i]);
}
/**
 * column for categorical values
 */
class CategoricalColumn extends __WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        /**
         * colors for each category
         * @type {Ordinal<string, string>}
         */
        this.colors = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].category10();
        /**
         * category labels by default the category name itself
         * @type {Array}
         */
        this.catLabels = new Map();
        /**
         * set of categories to show
         * @type {null}
         * @private
         */
        this.currentFilter = null;
        /**
         * split multiple categories
         * @type {string}
         */
        this.separator = ';';
        this.separator = desc.separator || this.separator;
        this.initCategories(desc);
        //TODO infer categories from data
    }
    initCategories(desc) {
        if (!desc.categories) {
            return;
        }
        const cats = [], cols = this.colors.range().slice(), //work on a copy since it will be manipulated
        labels = new Map();
        desc.categories.forEach((cat, i) => {
            if (typeof cat === 'string') {
                //just the category value
                cats.push(cat);
                return;
            }
            //the name or value of the category
            cats.push(cat.name || cat.value);
            //optional label mapping
            if (cat.label) {
                labels.set(cat.name, cat.label);
            }
            //optional color
            if (cat.color) {
                cols[i] = cat.color;
            }
        });
        this.catLabels = labels;
        this.colors.domain(cats).range(cols);
    }
    get categories() {
        return this.colors.domain();
    }
    get categoryColors() {
        return this.colors.range();
    }
    get categoryLabels() {
        //no mapping
        if (this.catLabels === null || this.catLabels.size === 0) {
            return this.categories;
        }
        //label or identity mapping
        return this.categories.map((c) => this.catLabels.has(c) ? this.catLabels.get(c) : c);
    }
    getLabel(row, index) {
        //no mapping
        if (this.catLabels === null || this.catLabels.size === 0) {
            return __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */].prototype.getValue.call(this, row, index);
        }
        return this.getLabels(row, index).join(this.separator);
    }
    getFirstLabel(row, index) {
        const l = this.getLabels(row, index);
        return l.length > 0 ? l[0] : null;
    }
    getLabels(row, index) {
        const v = __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */].prototype.getValue.call(this, row, index);
        const r = v ? v.split(this.separator) : [];
        const mapToLabel = (values) => {
            if (this.catLabels === null || this.catLabels.size === 0) {
                return values;
            }
            return values.map((v) => this.catLabels.has(v) ? this.catLabels.get(v) : v);
        };
        return mapToLabel(r);
    }
    getValue(row, index) {
        const r = this.getValues(row, index);
        return r.length > 0 ? r[0] : null;
    }
    getValues(row, index) {
        const v = __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */].prototype.getValue.call(this, row, index);
        return v ? v.split(this.separator) : [];
    }
    isMissing(row, index) {
        const v = this.getValues(row, index);
        return !v || v.length === 0;
    }
    getCategories(row, index) {
        return this.getValues(row, index);
    }
    getColor(row, index) {
        const cat = this.getValue(row, index);
        if (cat === null || cat === '') {
            return null;
        }
        return this.colors(cat);
    }
    getColors(row, index) {
        return this.getCategories(row, index).map(this.colors);
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.filter = this.currentFilter;
        r.colors = {
            domain: this.colors.domain(),
            range: this.colors.range(),
            separator: this.separator
        };
        if (this.catLabels !== null && this.catLabels.size !== 0) {
            r.labels = Array.from(this.catLabels.entries());
        }
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if ('filter' in dump) {
            const bak = dump.filter;
            if (typeof bak === 'string' || Array.isArray(bak)) {
                this.currentFilter = { filter: bak, filterMissing: false };
            }
            else {
                this.currentFilter = bak;
            }
        }
        else {
            this.currentFilter = null;
        }
        if (dump.colors) {
            this.colors.domain(dump.colors.domain).range(dump.colors.range);
        }
        if (Array.isArray(dump.labels)) {
            this.catLabels = new Map();
            dump.labels.forEach((e) => this.catLabels.set(e.key, e.value));
        }
        this.separator = dump.separator || this.separator;
    }
    isFiltered() {
        return this.currentFilter != null;
    }
    static filter(filter, category) {
        if (!filter) {
            return true;
        }
        if (category == null && filter.filterMissing) {
            return false;
        }
        const filterObj = filter.filter;
        if (Array.isArray(filterObj)) {
            return filterObj.indexOf(category) >= 0;
        }
        if (typeof filterObj === 'string' && filterObj.length > 0) {
            return category != null && category.toLowerCase().indexOf(filterObj.toLowerCase()) >= 0;
        }
        if (filterObj instanceof RegExp) {
            return category != null && filterObj.test(category);
        }
        return true;
    }
    filter(row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        const vs = this.getCategories(row, index);
        if (this.currentFilter.filterMissing && vs.length === 0) {
            return false;
        }
        return vs.every((v) => CategoricalColumn.filter(this.currentFilter, v));
    }
    getFilter() {
        return this.currentFilter;
    }
    setFilter(filter) {
        if (isEqualFilter(this.currentFilter, filter)) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.currentFilter, this.currentFilter = filter);
    }
    compare(a, b, aIndex, bIndex) {
        const va = this.getValues(a, aIndex);
        const vb = this.getValues(b, bIndex);
        if (va.length === 0) {
            // missing
            return vb.length === 0 ? 0 : __WEBPACK_IMPORTED_MODULE_4__missing__["a" /* FIRST_IS_NAN */];
        }
        if (vb.length === 0) {
            return __WEBPACK_IMPORTED_MODULE_4__missing__["a" /* FIRST_IS_NAN */] * -1;
        }
        //check all categories
        for (let i = 0; i < Math.min(va.length, vb.length); ++i) {
            const ci = va[i].localeCompare(vb[i]);
            if (ci !== 0) {
                return ci;
            }
        }
        //smaller length wins
        return va.length - vb.length;
    }
    group(row, index) {
        const name = this.getValue(row, index);
        if (!name) {
            return super.group(row, index);
        }
        const color = this.getColor(row, index);
        return { name, color };
    }
    getGroupRenderer() {
        const current = super.getGroupRenderer();
        if (current === this.desc.type && this.isGroupedBy() >= 0) {
            // still the default and the stratification criteria
            return 'catcolorshifted';
        }
        return current;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoricalColumn;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isMultiLevelColumn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/**
 * Created by sam on 04.11.2016.
 */




function isMultiLevelColumn(col) {
    return typeof (col.getCollapsed) === 'function';
}
/**
 * implementation of a combine column, standard operations how to select
 */
class CompositeColumn extends __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this._children = [];
    }
    assignNewId(idGenerator) {
        super.assignNewId(idGenerator);
        this._children.forEach((c) => c.assignNewId(idGenerator));
    }
    get children() {
        return this._children.slice();
    }
    get length() {
        return this._children.length;
    }
    flatten(r, offset, levelsToGo = 0, padding = 0) {
        let w = 0;
        //no more levels or just this one
        if (levelsToGo === 0 || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
            w = this.getWidth();
            r.push({ col: this, offset, width: w });
            if (levelsToGo === 0) {
                return w;
            }
        }
        //push children
        this._children.forEach((c) => {
            if (!c.isHidden() || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
                c.flatten(r, offset, levelsToGo - 1, padding);
            }
        });
        return w;
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.children = this._children.map((d) => d.dump(toDescRef));
        return r;
    }
    restore(dump, factory) {
        dump.children.map((child) => {
            const c = factory(child);
            if (c) {
                this.push(c);
            }
        });
        super.restore(dump, factory);
    }
    /**
     * inserts a column at a the given position
     * @param col
     * @param index
     * @returns {any}
     */
    insert(col, index) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_1__INumberColumn__["h" /* isNumberColumn */])(col) && this.canJustAddNumbers) {
            return null;
        }
        this._children.splice(index, 0, col);
        //listen and propagate events
        return this.insertImpl(col, index);
    }
    move(col, index) {
        if (col.parent !== this) {
            return null;
        }
        const old = this._children.indexOf(col);
        if (index === old) {
            // no move needed
            return col;
        }
        //delete first
        this._children.splice(old, 1);
        // adapt target index based on previous index, i.e shift by one
        this._children.splice(old < index ? index - 1 : index, 0, col);
        //listen and propagate events
        return this.moveImpl(col, index, old);
    }
    insertImpl(col, index) {
        col.parent = this;
        this.forward(col, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED));
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], col, index);
        return col;
    }
    moveImpl(col, index, oldIndex) {
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_MOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], col, index, oldIndex);
        return col;
    }
    push(col) {
        return this.insert(col, this._children.length);
    }
    at(index) {
        return this._children[index];
    }
    indexOf(col) {
        return this._children.indexOf(col);
    }
    insertAfter(col, ref) {
        const i = this.indexOf(ref);
        if (i < 0) {
            return null;
        }
        return this.insert(col, i + 1);
    }
    moveAfter(col, ref) {
        const i = this.indexOf(ref);
        if (i < 0) {
            return null;
        }
        return this.move(col, i + 1);
    }
    remove(child) {
        const i = this._children.indexOf(child);
        if (i < 0) {
            return false;
        }
        this._children.splice(i, 1); //remove and deregister listeners
        return this.removeImpl(child);
    }
    removeImpl(child) {
        child.parent = null;
        this.unforward(child, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED));
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_REMOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], child);
        return true;
    }
    getColor(_row, _index) {
        return this.color;
    }
    isFiltered() {
        return this._children.some((d) => d.isFiltered());
    }
    filter(row, index) {
        return this._children.every((d) => d.filter(row, index));
    }
    isLoaded() {
        return this._children.every((c) => !(c instanceof __WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */] || c instanceof CompositeColumn) || c.isLoaded());
    }
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    toSortingDesc(toId) {
        return this._children.map((c) => c.toSortingDesc(toId));
    }
    get canJustAddNumbers() {
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CompositeColumn;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["defineColumn"] = defineColumn;
/* harmony export (immutable) */ __webpack_exports__["models"] = models;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StackColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AnnotateColumn__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__BooleanColumn__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MinColumn__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MaxColumn__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__MeanColumn__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__RankColumn__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__SelectionColumn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ScriptColumn__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__CategoricalNumberColumn__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__NestedColumn__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ActionColumn__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__LinkColumn__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__BooleansColumn__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__NumbersColumn__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__BoxPlotColumn__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__AggregateGroupColumn__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__HierarchyColumn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__DateColumn__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ImpositionCompositeColumn__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Column__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Column", function() { return __WEBPACK_IMPORTED_MODULE_24__Column__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__CompositeColumn__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CompositeColumn", function() { return __WEBPACK_IMPORTED_MODULE_25__CompositeColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMappingFunction", function() { return __WEBPACK_IMPORTED_MODULE_1__NumberColumn__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleMappingFunction", function() { return __WEBPACK_IMPORTED_MODULE_1__NumberColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptMappingFunction", function() { return __WEBPACK_IMPORTED_MODULE_1__NumberColumn__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__INumberColumn__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberColumn", function() { return __WEBPACK_IMPORTED_MODULE_26__INumberColumn__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isCategoricalColumn", function() { return __WEBPACK_IMPORTED_MODULE_6__CategoricalColumn__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__Ranking__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ranking", function() { return __WEBPACK_IMPORTED_MODULE_27__Ranking__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportType", function() { return __WEBPACK_IMPORTED_MODULE_27__Ranking__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMinDesc", function() { return __WEBPACK_IMPORTED_MODULE_7__MinColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMaxDesc", function() { return __WEBPACK_IMPORTED_MODULE_8__MaxColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMeanDesc", function() { return __WEBPACK_IMPORTED_MODULE_9__MeanColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createRankDesc", function() { return __WEBPACK_IMPORTED_MODULE_10__RankColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createSelectionDesc", function() { return __WEBPACK_IMPORTED_MODULE_11__SelectionColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createScriptDesc", function() { return __WEBPACK_IMPORTED_MODULE_12__ScriptColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createNestedDesc", function() { return __WEBPACK_IMPORTED_MODULE_14__NestedColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStackDesc", function() { return __WEBPACK_IMPORTED_MODULE_3__StackColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createActionDesc", function() { return __WEBPACK_IMPORTED_MODULE_15__ActionColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAggregateDesc", function() { return __WEBPACK_IMPORTED_MODULE_20__AggregateGroupColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createImpositionDesc", function() { return __WEBPACK_IMPORTED_MODULE_23__ImpositionCompositeColumn__["a"]; });
/**
 * Created by Samuel Gratzl on 06.08.2015.
 */









































/**
 * defines a new column type
 * @param name
 * @param functions
 * @returns {CustomColumn}
 */
function defineColumn(name, functions = {}) {
    class CustomColumn extends __WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */] {
        constructor(id, desc) {
            super(id, desc);
            if (typeof (this.init) === 'function') {
                this.init.apply(this, [].slice.apply(arguments));
            }
        }
        init() {
            // dummy
        }
    }
    CustomColumn.prototype.toString = () => name;
    CustomColumn.prototype = Object.assign(CustomColumn.prototype, functions);
    return CustomColumn;
}
/**
 * a map of all known column types
 */
function models() {
    return {
        number: __WEBPACK_IMPORTED_MODULE_1__NumberColumn__["d" /* default */],
        date: __WEBPACK_IMPORTED_MODULE_22__DateColumn__["a" /* default */],
        image: __WEBPACK_IMPORTED_MODULE_16__LinkColumn__["a" /* default */],
        numbers: __WEBPACK_IMPORTED_MODULE_18__NumbersColumn__["a" /* default */],
        string: __WEBPACK_IMPORTED_MODULE_2__StringColumn__["a" /* default */],
        link: __WEBPACK_IMPORTED_MODULE_16__LinkColumn__["a" /* default */],
        stack: __WEBPACK_IMPORTED_MODULE_3__StackColumn__["b" /* default */],
        rank: __WEBPACK_IMPORTED_MODULE_10__RankColumn__["b" /* default */],
        boolean: __WEBPACK_IMPORTED_MODULE_5__BooleanColumn__["a" /* default */],
        booleans: __WEBPACK_IMPORTED_MODULE_17__BooleansColumn__["a" /* default */],
        categorical: __WEBPACK_IMPORTED_MODULE_6__CategoricalColumn__["a" /* default */],
        ordinal: __WEBPACK_IMPORTED_MODULE_13__CategoricalNumberColumn__["a" /* default */],
        actions: __WEBPACK_IMPORTED_MODULE_15__ActionColumn__["b" /* default */],
        annotate: __WEBPACK_IMPORTED_MODULE_4__AnnotateColumn__["a" /* default */],
        selection: __WEBPACK_IMPORTED_MODULE_11__SelectionColumn__["b" /* default */],
        max: __WEBPACK_IMPORTED_MODULE_8__MaxColumn__["b" /* default */],
        min: __WEBPACK_IMPORTED_MODULE_7__MinColumn__["b" /* default */],
        mean: __WEBPACK_IMPORTED_MODULE_9__MeanColumn__["b" /* default */],
        script: __WEBPACK_IMPORTED_MODULE_12__ScriptColumn__["b" /* default */],
        nested: __WEBPACK_IMPORTED_MODULE_14__NestedColumn__["b" /* default */],
        boxplot: __WEBPACK_IMPORTED_MODULE_19__BoxPlotColumn__["a" /* default */],
        aggregate: __WEBPACK_IMPORTED_MODULE_20__AggregateGroupColumn__["b" /* default */],
        hierarchy: __WEBPACK_IMPORTED_MODULE_21__HierarchyColumn__["a" /* default */],
        imposition: __WEBPACK_IMPORTED_MODULE_23__ImpositionCompositeColumn__["b" /* default */]
    };
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isSupportType;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Group__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/**
 * Created by Samuel Gratzl on 06.08.2015.
 */




function isSupportType(col) {
    return ['rank', 'selection', 'actions', 'aggregate'].indexOf(col.type) >= 0;
}
/**
 * a ranking
 */
class Ranking extends __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* AEventDispatcher */] {
    constructor(id, maxSortCriteria = 1, maxGroupColumns = 1) {
        super();
        this.id = id;
        this.maxSortCriteria = maxSortCriteria;
        this.maxGroupColumns = maxGroupColumns;
        /**
         * the list of sort criteria
         * @type {Array}
         */
        this.sortCriteria = [];
        this.groupSortCriteria = [];
        this.groupColumns = [];
        /**
         * columns of this ranking
         * @type {Array}
         * @private
         */
        this.columns = [];
        this.comparator = (a, b, aIndex, bIndex) => {
            if (this.sortCriteria.length === 0) {
                return 0;
            }
            for (const sort of this.sortCriteria) {
                const r = sort.col.compare(a, b, aIndex, bIndex);
                if (r !== 0) {
                    return sort.asc ? r : -r;
                }
            }
            return aIndex - bIndex; //to have a deterministic order
        };
        this.groupComparator = (a, b) => {
            if (this.groupSortCriteria.length === 0) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            }
            for (const sort of this.groupSortCriteria) {
                const r = sort.col.groupCompare(a, b);
                if (r !== 0) {
                    return sort.asc ? r : -r;
                }
            }
            return a.name.localeCompare(b.name);
        };
        this.grouper = (row, index) => {
            const g = this.groupColumns;
            switch (g.length) {
                case 0: return __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* defaultGroup */];
                case 1: return g[0].group(row, index);
                default:
                    const groups = g.map((gi) => gi.group(row, index));
                    return Object(__WEBPACK_IMPORTED_MODULE_2__Group__["b" /* joinGroups */])(groups);
            }
        };
        this.dirtyOrder = () => {
            this.fire([Ranking.EVENT_DIRTY_ORDER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], this.getSortCriteria());
        };
        /**
         * the current ordering as an sorted array of indices
         * @type {Array}
         */
        this.groups = [Object.assign({ order: [] }, __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* defaultGroup */])];
        this.id = Object(__WEBPACK_IMPORTED_MODULE_0__Column__["b" /* fixCSS */])(id);
    }
    createEventList() {
        return super.createEventList().concat([
            Ranking.EVENT_WIDTH_CHANGED, Ranking.EVENT_FILTER_CHANGED,
            Ranking.EVENT_LABEL_CHANGED, Ranking.EVENT_GROUPS_CHANGED,
            Ranking.EVENT_ADD_COLUMN, Ranking.EVENT_REMOVE_COLUMN, Ranking.EVENT_GROUP_CRITERIA_CHANGED, Ranking.EVENT_MOVE_COLUMN,
            Ranking.EVENT_DIRTY, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES,
            Ranking.EVENT_GROUP_SORT_CRITERIA_CHANGED,
            Ranking.EVENT_SORT_CRITERIA_CHANGED, Ranking.EVENT_SORT_CRITERIAS_CHANGED, Ranking.EVENT_DIRTY_ORDER, Ranking.EVENT_ORDER_CHANGED
        ]);
    }
    assignNewId(idGenerator) {
        this.id = Object(__WEBPACK_IMPORTED_MODULE_0__Column__["b" /* fixCSS */])(idGenerator());
        this.columns.forEach((c) => c.assignNewId(idGenerator));
    }
    setOrder(order) {
        this.setGroups([Object.assign({ order }, __WEBPACK_IMPORTED_MODULE_2__Group__["a" /* defaultGroup */])]);
    }
    setGroups(groups) {
        const old = this.getOrder();
        const oldGroups = this.groups;
        this.groups = groups;
        this.fire([Ranking.EVENT_ORDER_CHANGED, Ranking.EVENT_GROUPS_CHANGED, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], old, this.getOrder(), oldGroups, groups);
    }
    getOrder() {
        switch (this.groups.length) {
            case 0:
                return [];
            case 1:
                return this.groups[0].order;
            default:
                return [].concat(...this.groups.map((g) => g.order));
        }
    }
    getGroups() {
        return this.groups.slice();
    }
    dump(toDescRef) {
        const r = {};
        r.columns = this.columns.map((d) => d.dump(toDescRef));
        r.sortCriterias = this.sortCriteria.map((s) => ({ asc: s.asc, sortBy: s.col.id }));
        r.groupColumns = this.groupColumns.map((d) => d.id);
        return r;
    }
    restore(dump, factory) {
        this.clear();
        dump.columns.map((child) => {
            const c = factory(child);
            if (c) {
                this.push(c);
            }
        });
        // compatibility case
        if (dump.sortColumn && dump.sortColumn.sortBy) {
            const help = this.columns.filter((d) => d.id === dump.sortColumn.sortBy);
            this.sortBy(help.length === 0 ? null : help[0], dump.sortColumn.asc);
        }
        if (dump.groupColumns) {
            const groupColumns = dump.groupColumns.map((id) => this.columns.find((d) => d.id === id));
            this.groupBy(groupColumns);
        }
        const restoreSortCriteria = (dumped) => {
            return dumped.map((s) => {
                return {
                    asc: s.asc,
                    col: this.columns.find((d) => d.id === s.sortBy) || null
                };
            }).filter((s) => s.col);
        };
        if (dump.sortCriterias) {
            this.setSortCriteria(restoreSortCriteria(dump.sortCriterias));
        }
        if (dump.groupSortCriterias) {
            this.setGroupSortCriteria(restoreSortCriteria(dump.groupSortCriterias));
        }
    }
    flatten(r, offset, levelsToGo = 0, padding = 0) {
        let acc = offset; // + this.getWidth() + padding;
        if (levelsToGo > 0 || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
            this.columns.forEach((c) => {
                if (!c.isHidden() || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
                    acc += c.flatten(r, acc, levelsToGo - 1, padding) + padding;
                }
            });
        }
        return acc - offset;
    }
    get primarySortCriteria() {
        if (this.sortCriteria.length === 0) {
            return null;
        }
        return this.sortCriteria[0];
    }
    getSortCriteria() {
        const p = this.primarySortCriteria;
        return p === null ? null : Object.assign({}, p);
    }
    getSortCriterias() {
        return this.sortCriteria.map((d) => Object.assign({}, d));
    }
    getGroupSortCriteria() {
        return this.groupSortCriteria.map((d) => Object.assign({}, d));
    }
    toggleSorting(col) {
        const primary = this.primarySortCriteria;
        if (primary && primary.col === col) {
            return this.sortBy(col, !primary.asc);
        }
        return this.sortBy(col);
    }
    toggleGrouping(col) {
        const old = this.groupColumns.indexOf(col);
        if (old >= 0) {
            const newGroupings = this.groupColumns.slice();
            newGroupings.splice(old, 1);
            return this.groupBy(newGroupings);
        }
        return this.groupBy([col].concat(this.groupColumns));
    }
    getGroupCriteria() {
        return this.groupColumns.slice();
    }
    setGroupCriteria(columns) {
        return this.groupBy(columns);
    }
    sortBy(col, ascending = false) {
        if (col !== null && col.findMyRanker() !== this) {
            return false; //not one of mine
        }
        const primary = this.primarySortCriteria;
        if ((col === null && primary === null) || (primary && primary.col === col && primary.asc === ascending)) {
            return true; //already in this order
        }
        const bak = this.getSortCriteria();
        if (col) {
            const existing = this.sortCriteria.findIndex((d) => d.col === col);
            if (existing >= 0) {
                this.sortCriteria.splice(existing, 1);
                // can skip deregister will be reregistered anyhow
            }
            else if (this.sortCriteria.length === this.maxSortCriteria) {
                // remove the last one
                const last = this.sortCriteria.pop();
                last.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES}.order`, null);
                last.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.order`, null);
            }
        }
        else {
            this.sortCriteria.forEach((s) => {
                s.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES}.order`, null);
                s.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.order`, null);
            });
            this.sortCriteria.splice(0, this.sortCriteria.length);
        }
        if (col) {
            // add as first
            this.sortCriteria.unshift({
                col,
                asc: ascending
            });
            col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES}.order`, this.dirtyOrder);
            // order is dirty if the sort method has changed
            col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.order`, this.dirtyOrder);
        }
        this.triggerResort(bak);
        return true;
    }
    groupBy(col) {
        let cols = Array.isArray(col) ? col : (col instanceof __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */] ? [col] : []);
        // trim
        if (cols.length > this.maxGroupColumns) {
            cols = cols.slice(0, this.maxGroupColumns);
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_3__utils__["j" /* equalArrays */])(this.groupColumns, cols)) {
            return true; //same
        }
        this.groupColumns.forEach((groupColumn) => {
            groupColumn.on(Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.group', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_GROUPING_CHANGED), null);
        });
        const bak = this.groupColumns.slice();
        this.groupColumns.splice(0, this.groupColumns.length, ...cols);
        this.groupColumns.forEach((groupColumn) => {
            groupColumn.on(Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.group', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_GROUPING_CHANGED), this.dirtyOrder);
        });
        this.fire([Ranking.EVENT_GROUP_CRITERIA_CHANGED, Ranking.EVENT_DIRTY_ORDER, Ranking.EVENT_DIRTY_HEADER,
            Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], bak, this.getGroupCriteria());
        return true;
    }
    setSortCriteria(value) {
        let values = Array.isArray(value) ? value : [value];
        // trim
        if (values.length > this.maxSortCriteria) {
            values = values.slice(0, this.maxSortCriteria);
        }
        if (values.length === 0) {
            return this.sortBy(null);
        }
        if (values.length === 1) {
            return this.sortBy(values[0].col, values[0].asc);
        }
        const bak = this.sortCriteria.slice();
        // update listener
        bak.forEach((d) => {
            d.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES}.order`, null);
            d.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.order`, null);
        });
        values.forEach((d) => {
            d.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES}.order`, this.dirtyOrder);
            d.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.order`, this.dirtyOrder);
        });
        this.sortCriteria.splice(0, this.sortCriteria.length, ...values.slice());
        this.triggerResort(bak);
        return true;
    }
    toggleGroupSorting(col) {
        const first = this.groupSortCriteria[0];
        const asc = first && first.col === col && !first.asc;
        return this.setGroupSortCriteria({ col, asc });
    }
    groupSortBy(col, asc) {
        return this.setGroupSortCriteria({ col, asc });
    }
    setMaxSortCriteria(maxSortCriteria) {
        const old = this.maxSortCriteria;
        if (old === maxSortCriteria) {
            return;
        }
        this.maxSortCriteria = maxSortCriteria;
        if (old < maxSortCriteria || this.sortCriteria.length < maxSortCriteria) {
            return;
        }
        // check if we have to slice
        this.setSortCriteria(this.sortCriteria.slice(0, maxSortCriteria));
    }
    getMaxSortCriteria() {
        return this.maxSortCriteria;
    }
    setMaxGroupColumns(maxGroupColumns) {
        const old = this.maxGroupColumns;
        if (old === maxGroupColumns) {
            return;
        }
        this.maxGroupColumns = maxGroupColumns;
        if (old < maxGroupColumns || this.groupColumns.length < maxGroupColumns) {
            return;
        }
        // check if we have to slice
        this.setGroupCriteria(this.groupColumns.slice(0, maxGroupColumns));
    }
    getMaxGroupColumns() {
        return this.maxGroupColumns;
    }
    setGroupSortCriteria(value) {
        let values = Array.isArray(value) ? value : [value];
        // trim
        if (values.length > this.maxSortCriteria) {
            values = values.slice(0, this.maxSortCriteria);
        }
        this.groupSortCriteria.forEach((d) => {
            d.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.groupOrder`, null);
        });
        values.forEach((d) => {
            d.col.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.groupOrder`, this.dirtyOrder);
        });
        this.groupSortCriteria.splice(0, this.groupSortCriteria.length, ...values.slice());
        this.triggerResort(this.sortCriteria.slice());
        return true;
    }
    triggerResort(bak) {
        const sortCriterias = this.getSortCriterias();
        const bakSingle = Array.isArray(bak) ? bak[0] : bak;
        const bakMulti = Array.isArray(bak) ? bak : sortCriterias;
        this.fire([Ranking.EVENT_SORT_CRITERIA_CHANGED, Ranking.EVENT_DIRTY_ORDER, Ranking.EVENT_DIRTY_HEADER,
            Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], bakSingle, sortCriterias[0]);
        this.fire(Ranking.EVENT_SORT_CRITERIAS_CHANGED, bakMulti, sortCriterias);
    }
    get children() {
        return this.columns.slice();
    }
    get length() {
        return this.columns.length;
    }
    insert(col, index = this.columns.length) {
        this.columns.splice(index, 0, col);
        col.parent = this;
        this.forward(col, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED));
        col.on(`${Ranking.EVENT_FILTER_CHANGED}.order`, this.dirtyOrder);
        this.fire([Ranking.EVENT_ADD_COLUMN, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], col, index);
        if (this.sortCriteria.length === 0 && !isSupportType(col.desc)) {
            this.sortBy(col, col instanceof __WEBPACK_IMPORTED_MODULE_1__StringColumn__["a" /* default */]);
        }
        return col;
    }
    move(col, index = this.columns.length) {
        if (col.parent !== this) {
            // not a move operation!
            console.error('invalid move operation: ', col);
            return null;
        }
        const old = this.columns.indexOf(col);
        if (index === old) {
            // no move needed
            return col;
        }
        //delete first
        this.columns.splice(old, 1);
        // adapt target index based on previous index, i.e shift by one
        this.columns.splice(old < index ? index - 1 : index, 0, col);
        this.fire([Ranking.EVENT_MOVE_COLUMN, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], col, index, old);
        return col;
    }
    moveAfter(col, reference) {
        const i = this.columns.indexOf(reference);
        if (i < 0) {
            return null;
        }
        return this.move(col, i + 1);
    }
    get fqpath() {
        return '';
    }
    findByPath(fqpath) {
        let p = this;
        const indices = fqpath.split('@').map(Number).slice(1); //ignore the first entry = ranking
        while (indices.length > 0) {
            const i = indices.shift();
            p = p.at(i);
        }
        return p;
    }
    indexOf(col) {
        return this.columns.indexOf(col);
    }
    at(index) {
        return this.columns[index];
    }
    insertAfter(col, ref) {
        const i = this.columns.indexOf(ref);
        if (i < 0) {
            return null;
        }
        return this.insert(col, i + 1);
    }
    push(col) {
        return this.insert(col);
    }
    remove(col) {
        const i = this.columns.indexOf(col);
        if (i < 0) {
            return false;
        }
        this.unforward(col, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED));
        const isSortCriteria = this.sortCriteria.findIndex((d) => d.col === col);
        if (isSortCriteria === 0) {
            this.sortCriteria.shift();
            // if multiple ones sort by previous one
            if (this.sortCriteria.length > 0) {
                this.sortBy(this.sortCriteria[0].col);
            }
            else {
                const next = this.columns.filter((d) => d !== col && !isSupportType(d.desc))[0];
                this.sortBy(next ? next : null);
            }
        }
        else if (isSortCriteria > 0) {
            // just remove and trigger restore
            this.sortCriteria.splice(isSortCriteria, 1);
            this.triggerResort(null);
        }
        const isGroupColumn = this.groupColumns.indexOf(col);
        if (isGroupColumn >= 0) {
            const newGrouping = this.groupColumns.slice();
            newGrouping.splice(isGroupColumn, 1);
            this.groupBy(newGrouping);
        }
        col.parent = null;
        this.columns.splice(i, 1);
        this.fire([Ranking.EVENT_REMOVE_COLUMN, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], col, i);
        return true;
    }
    clear() {
        if (this.columns.length === 0) {
            return;
        }
        this.sortCriteria.splice(0, this.sortCriteria.length);
        this.groupColumns.forEach((groupColumn) => {
            groupColumn.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES}.group`, null);
            groupColumn.on(`${__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED}.group`, null);
        });
        this.groupColumns.splice(0, this.groupColumns.length);
        this.columns.forEach((col) => {
            this.unforward(col, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED));
            col.parent = null;
        });
        this.columns.length = 0;
        this.fire([Ranking.EVENT_REMOVE_COLUMN, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], null);
    }
    get flatColumns() {
        const r = [];
        this.flatten(r, 0, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS);
        return r.map((d) => d.col);
    }
    find(idOrFilter) {
        const filter = typeof (idOrFilter) === 'string' ? (col) => col.id === idOrFilter : idOrFilter;
        const r = this.flatColumns;
        for (const v of r) {
            if (filter(v)) {
                return v;
            }
        }
        return null;
    }
    /**
     * converts the sorting criteria to a json compatible notation for transferring it to the server
     * @param toId
     */
    toSortingDesc(toId) {
        //TODO describe also all the filter settings
        const resolve = (s) => {
            if (s === null) {
                return null;
            }
            return s.toSortingDesc(toId);
        };
        const primary = this.primarySortCriteria;
        if (primary === null) {
            return null;
        }
        const id = resolve(primary.col);
        if (id === null) {
            return null;
        }
        return {
            id,
            asc: primary.asc
        };
    }
    isFiltered() {
        return this.columns.some((d) => d.isFiltered());
    }
    filter(row, index) {
        return this.columns.every((d) => d.filter(row, index));
    }
    findMyRanker() {
        return this;
    }
    get fqid() {
        return this.id;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ranking;

Ranking.EVENT_WIDTH_CHANGED = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_WIDTH_CHANGED;
Ranking.EVENT_FILTER_CHANGED = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED;
Ranking.EVENT_LABEL_CHANGED = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_LABEL_CHANGED;
Ranking.EVENT_ADD_COLUMN = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_ADD_COLUMN;
Ranking.EVENT_MOVE_COLUMN = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_MOVE_COLUMN;
Ranking.EVENT_REMOVE_COLUMN = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_REMOVE_COLUMN;
Ranking.EVENT_DIRTY = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY;
Ranking.EVENT_DIRTY_HEADER = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER;
Ranking.EVENT_DIRTY_VALUES = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES;
Ranking.EVENT_SORT_CRITERIA_CHANGED = 'sortCriteriaChanged';
Ranking.EVENT_GROUP_CRITERIA_CHANGED = 'groupCriteriaChanged';
Ranking.EVENT_GROUP_SORT_CRITERIA_CHANGED = 'groupSortCriteriaChanged';
Ranking.EVENT_SORT_CRITERIAS_CHANGED = 'sortCriteriasChanged';
Ranking.EVENT_DIRTY_ORDER = 'dirtyOrder';
Ranking.EVENT_ORDER_CHANGED = 'orderChanged';
Ranking.EVENT_GROUPS_CHANGED = 'groupsChanged';


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Ranking__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Group__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_AggregateGroupColumn__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__OrderedSet__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(54);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */








/**
 * a basic data provider holding the data and rankings
 */
class ADataProvider extends __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* AEventDispatcher */] {
    constructor(options = {}) {
        super();
        /**
         * all rankings
         * @type {Array}
         * @private
         */
        this.rankings = [];
        /**
         * the current selected indices
         * @type {OrderedSet}
         */
        this.selection = new __WEBPACK_IMPORTED_MODULE_6__OrderedSet__["a" /* default */]();
        //ranking.id@group.name
        this.aggregations = new Set();
        this.uid = 0;
        this.createHelper = (d) => {
            //factory method for restoring a column
            const desc = this.fromDescRef(d.desc);
            let c = null;
            if (desc && desc.type) {
                this.fixDesc(d.desc);
                const type = this.columnTypes[desc.type];
                c = new type(d.id, desc);
                c.restore(d, this.createHelper);
            }
            return c;
        };
        this.columnTypes = Object.assign(Object(__WEBPACK_IMPORTED_MODULE_0__model__["models"])(), options.columnTypes || {});
        this.multiSelections = options.multiSelection !== false;
        this.groupings = options.grouping === true;
    }
    /**
     * events:
     *  * column changes: addColumn, removeColumn
     *  * ranking changes: addRanking, removeRanking
     *  * dirty: dirty, dirtyHeder, dirtyValues
     *  * selectionChanged
     * @returns {string[]}
     */
    createEventList() {
        return super.createEventList().concat([
            ADataProvider.EVENT_ADD_COLUMN, ADataProvider.EVENT_REMOVE_COLUMN,
            ADataProvider.EVENT_ADD_RANKING, ADataProvider.EVENT_REMOVE_RANKING,
            ADataProvider.EVENT_DIRTY, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES,
            ADataProvider.EVENT_ORDER_CHANGED, ADataProvider.EVENT_SELECTION_CHANGED,
            ADataProvider.EVENT_ADD_DESC, ADataProvider.EVENT_CLEAR_DESC,
            ADataProvider.EVENT_JUMP_TO_NEAREST, ADataProvider.EVENT_GROUP_AGGREGATION_CHANGED
        ]);
    }
    /**
     * adds a new ranking
     * @param existing an optional existing ranking to clone
     * @return the new ranking
     */
    pushRanking(existing) {
        const r = this.cloneRanking(existing);
        if (!this.groupings) {
            r.setMaxGroupColumns(0);
        }
        this.insertRanking(r);
        return r;
    }
    takeSnapshot(col) {
        const r = this.cloneRanking();
        r.push(this.clone(col));
        this.insertRanking(r);
        return r;
    }
    insertRanking(r, index = this.rankings.length) {
        this.rankings.splice(index, 0, r);
        this.forward(r, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES));
        const that = this;
        //delayed reordering per ranking
        r.on(`${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_ORDER}.provider`, Object(__WEBPACK_IMPORTED_MODULE_3__utils__["f" /* debounce */])(function () {
            that.triggerReorder(this.source);
        }, 100));
        this.fire([ADataProvider.EVENT_ADD_RANKING, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], r, index);
        this.triggerReorder(r);
    }
    triggerReorder(ranking) {
        Promise.resolve(this.sort(ranking)).then((order) => {
            Object(__WEBPACK_IMPORTED_MODULE_4__model_Group__["d" /* unifyParents */])(order);
            ranking.setGroups(order);
        });
    }
    /**
     * removes a ranking from this data provider
     * @param ranking
     * @returns {boolean}
     */
    removeRanking(ranking) {
        const i = this.rankings.indexOf(ranking);
        if (i < 0) {
            return false;
        }
        this.unforward(ranking, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES));
        this.rankings.splice(i, 1);
        ranking.on(`${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_ORDER}.provider`, null);
        this.cleanUpRanking(ranking);
        this.fire([ADataProvider.EVENT_REMOVE_RANKING, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], ranking, i);
        return true;
    }
    /**
     * removes all rankings
     */
    clearRankings() {
        this.rankings.forEach((ranking) => {
            this.unforward(ranking, ...Object(__WEBPACK_IMPORTED_MODULE_3__utils__["u" /* suffix */])('.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES));
            ranking.on(`${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_ORDER}.provider`, null);
            this.cleanUpRanking(ranking);
        });
        this.rankings = [];
        this.fire([ADataProvider.EVENT_REMOVE_RANKING, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], null);
    }
    /**
     * returns a list of all current rankings
     * @returns {Ranking[]}
     */
    getRankings() {
        return this.rankings.slice();
    }
    /**
     * returns the last ranking for quicker access
     * @returns {Ranking}
     */
    getLastRanking() {
        return this.rankings[this.rankings.length - 1];
    }
    ensureOneRanking() {
        if (this.rankings.length === 0) {
            this.pushRanking();
        }
    }
    /**
     * hook method for cleaning up a ranking
     * @param _ranking
     */
    cleanUpRanking(_ranking) {
        //nothing to do
    }
    /**
     * adds a column to a ranking described by its column description
     * @param ranking the ranking to add the column to
     * @param desc the description of the column
     * @return {Column} the newly created column or null
     */
    push(ranking, desc) {
        const r = this.create(desc);
        if (r) {
            ranking.push(r);
            return r;
        }
        return null;
    }
    /**
     * adds a column to a ranking described by its column description
     * @param ranking the ranking to add the column to
     * @param index the position to insert the column
     * @param desc the description of the column
     * @return {Column} the newly created column or null
     */
    insert(ranking, index, desc) {
        const r = this.create(desc);
        if (r) {
            ranking.insert(r, index);
            return r;
        }
        return null;
    }
    /**
     * creates a new unique id for a column
     * @returns {string}
     */
    nextId() {
        return `col${this.uid++}`;
    }
    fixDesc(desc) {
        //hacks for provider dependent descriptors
        if (desc.type === 'rank') {
            desc.accessor = this.rankAccessor.bind(this);
        }
        else if (desc.type === 'selection') {
            desc.accessor = (_row, index) => this.isSelected(index);
            desc.setter = (_row, index, value) => value ? this.select(index) : this.deselect(index);
        }
        else if (desc.type === 'aggregate') {
            desc.isAggregated = (ranking, group) => this.isAggregated(ranking, group);
            desc.setAggregated = (ranking, group, value) => this.setAggregated(ranking, group, value);
        }
    }
    /**
     * creates an internal column model out of the given column description
     * @param desc
     * @returns {Column] the new column or null if it can't be created
     */
    create(desc) {
        this.fixDesc(desc);
        //find by type and instantiate
        const type = this.columnTypes[desc.type];
        if (type) {
            return new type(this.nextId(), desc);
        }
        return null;
    }
    /**
     * clones a column by dumping and restoring
     * @param col
     * @returns {Column}
     */
    clone(col) {
        const dump = this.dumpColumn(col);
        return this.restoreColumn(dump);
    }
    /**
     * restores a column from a dump
     * @param dump
     * @returns {Column}
     */
    restoreColumn(dump) {
        const create = (d) => {
            const desc = this.fromDescRef(d.desc);
            const type = this.columnTypes[desc.type];
            this.fixDesc(desc);
            const c = new type('', desc);
            c.restore(d, create);
            c.assignNewId(this.nextId.bind(this));
            return c;
        };
        return create(dump);
    }
    /**
     * finds a column in all rankings returning the first match
     * @param idOrFilter by id or by a filter function
     * @returns {Column}
     */
    find(idOrFilter) {
        //convert to function
        const filter = typeof (idOrFilter) === 'string' ? (col) => col.id === idOrFilter : idOrFilter;
        for (const ranking of this.rankings) {
            const r = ranking.find(filter);
            if (r) {
                return r;
            }
        }
        return null;
    }
    /**
     * dumps this whole provider including selection and the rankings
     * @returns {{uid: number, selection: number[], rankings: *[]}}
     */
    dump() {
        return {
            uid: this.uid,
            selection: this.getSelection(),
            aggregations: Array.from(this.aggregations),
            rankings: this.rankings.map((r) => r.dump(this.toDescRef))
        };
    }
    /**
     * dumps a specific column
     */
    dumpColumn(col) {
        return col.dump(this.toDescRef);
    }
    /**
     * for better dumping describe reference, by default just return the description
     */
    toDescRef(desc) {
        return desc;
    }
    /**
     * inverse operation of toDescRef
     */
    fromDescRef(descRef) {
        return descRef;
    }
    restoreRanking(dump) {
        const ranking = this.cloneRanking();
        ranking.restore(dump, this.createHelper);
        //if no rank column add one
        if (!ranking.children.some((d) => d instanceof __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__["b" /* default */])) {
            ranking.insert(this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()), 0);
        }
        const idGenerator = this.nextId.bind(this);
        ranking.children.forEach((c) => c.assignNewId(idGenerator));
        return ranking;
    }
    restore(dump) {
        //clean old
        this.clearRankings();
        //restore selection
        this.uid = dump.uid || 0;
        if (dump.selection) {
            dump.selection.forEach((s) => this.selection.add(s));
        }
        if (dump.aggregations) {
            this.aggregations.clear();
            dump.aggregations.forEach((a) => this.aggregations.add(a));
        }
        //restore rankings
        if (dump.rankings) {
            dump.rankings.forEach((r) => {
                const ranking = this.cloneRanking();
                ranking.restore(r, this.createHelper);
                //if no rank column add one
                if (!ranking.children.some((d) => d instanceof __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__["b" /* default */])) {
                    ranking.insert(this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()), 0);
                }
                this.insertRanking(ranking);
            });
        }
        if (dump.layout) {
            Object.keys(dump.layout).forEach((key) => {
                this.deriveRanking(dump.layout[key]);
            });
        }
        //assign new ids
        const idGenerator = this.nextId.bind(this);
        this.rankings.forEach((r) => {
            r.children.forEach((c) => c.assignNewId(idGenerator));
        });
    }
    /**
     * generates a default ranking by using all column descriptions ones
     */
    deriveDefault() {
        if (this.rankings.length > 0) {
            //no default if we have a ranking
            return;
        }
        const r = this.pushRanking();
        this.getColumns().forEach((col) => {
            if (!Object(__WEBPACK_IMPORTED_MODULE_0__model__["isSupportType"])(col)) {
                this.push(r, col);
            }
        });
    }
    /**
     * derives a ranking from an old layout bundle format
     * @param bundle
     */
    deriveRanking(bundle) {
        const ranking = this.cloneRanking();
        ranking.clear();
        const toCol = (column) => {
            switch (column.type) {
                case 'rank':
                    return this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])());
                case 'selection':
                    return this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createSelectionDesc"])());
                case 'aggregate':
                    return this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createAggregateDesc"])());
                case 'actions':
                    const actions = this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createActionDesc"])(column.label || 'actions'));
                    actions.restore(column, this.createHelper);
                    return actions;
                case 'stacked':
                    //create a stacked one
                    const stacked = this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createStackDesc"])(column.label || 'Combined'));
                    (column.children || []).forEach((col) => {
                        const c = toCol(col);
                        if (c) {
                            stacked.push(c);
                        }
                    });
                    return stacked;
                default: {
                    const desc = this.findDesc(column.column);
                    if (desc) {
                        const r = this.create(desc);
                        column.label = column.label || desc.label || desc.column;
                        if (r) {
                            r.restore(column, this.createHelper);
                        }
                        return r;
                    }
                    return null;
                }
            }
        };
        bundle.forEach((column) => {
            const col = toCol(column);
            if (col) {
                ranking.push(col);
            }
        });
        //if no rank column add one
        if (!ranking.children.some((d) => d instanceof __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__["b" /* default */])) {
            ranking.insert(this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()), 0);
        }
        this.insertRanking(ranking);
        return ranking;
    }
    isAggregated(ranking, group) {
        let g = group;
        while (g) {
            const key = `${ranking.id}@${Object(__WEBPACK_IMPORTED_MODULE_4__model_Group__["c" /* toGroupID */])(g)}`;
            if (this.aggregations.has(key)) {
                return true;
            }
            g = g.parent;
        }
        return false;
    }
    setAggregated(ranking, group, value) {
        const key = `${ranking.id}@${Object(__WEBPACK_IMPORTED_MODULE_4__model_Group__["c" /* toGroupID */])(group)}`;
        if (value === this.aggregations.has(key)) {
            return;
        }
        if (value) {
            this.aggregations.add(key);
        }
        else {
            this.aggregations.delete(key);
        }
        this.fire([ADataProvider.EVENT_GROUP_AGGREGATION_CHANGED, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], ranking, group, value);
    }
    aggregateAllOf(ranking, aggregateAll) {
        const groups = ranking.getGroups();
        groups.forEach((group) => {
            const key = `${ranking.id}@${Object(__WEBPACK_IMPORTED_MODULE_4__model_Group__["c" /* toGroupID */])(group)}`;
            if (aggregateAll) {
                this.aggregations.add(key);
            }
            else {
                this.aggregations.delete(key);
            }
        });
        this.fire([ADataProvider.EVENT_GROUP_AGGREGATION_CHANGED, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], ranking, groups, aggregateAll);
    }
    /**
     * is the given row selected
     * @param index
     * @return {boolean}
     */
    isSelected(index) {
        return this.selection.has(index);
    }
    /**
     * also select the given row
     * @param index
     */
    select(index) {
        if (this.selection.has(index)) {
            return; //no change
        }
        if (!this.multiSelections && this.selection.size > 0) {
            this.selection.clear();
        }
        this.selection.add(index);
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, this.getSelection());
    }
    jumpToNearest(indices) {
        if (indices.length === 0) {
            return;
        }
        this.fire(ADataProvider.EVENT_JUMP_TO_NEAREST, indices);
    }
    /**
     * also select all the given rows
     * @param indices
     */
    selectAll(indices) {
        if (indices.every((i) => this.selection.has(i))) {
            return; //no change
        }
        if (!this.multiSelections) {
            this.selection.clear();
            indices = indices.slice(0, 1); //just the first one
        }
        indices.forEach((index) => {
            this.selection.add(index);
        });
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, this.getSelection());
    }
    selectAllOf(ranking) {
        this.setSelection(ranking.getOrder());
    }
    /**
     * set the selection to the given rows
     * @param indices
     */
    setSelection(indices) {
        if (indices.length === 0) {
            return this.clearSelection();
        }
        if (this.selection.size === indices.length && indices.every((i) => this.selection.has(i))) {
            return; //no change
        }
        this.selection.clear();
        this.selectAll(indices);
    }
    /**
     * toggles the selection of the given data index
     * @param index
     * @param additional just this element or all
     * @returns {boolean} whether the index is currently selected
     */
    toggleSelection(index, additional = false) {
        if (this.isSelected(index)) {
            if (additional) {
                this.deselect(index);
            }
            else {
                this.clearSelection();
            }
            return false;
        }
        if (additional) {
            this.select(index);
        }
        else {
            this.setSelection([index]);
        }
        return true;
    }
    /**
     * deselect the given row
     * @param index
     */
    deselect(index) {
        if (!this.selection.has(index)) {
            return; //no change
        }
        this.selection.delete(index);
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, this.getSelection());
    }
    /**
     * returns a promise containing the selected rows
     * @return {Promise<any[]>}
     */
    selectedRows() {
        if (this.selection.size === 0) {
            return Promise.resolve([]);
        }
        return this.view(this.getSelection());
    }
    /**
     * returns the currently selected indices
     * @returns {Array}
     */
    getSelection() {
        return Array.from(this.selection);
    }
    /**
     * clears the selection
     */
    clearSelection() {
        if (this.selection.size === 0) {
            return; //no change
        }
        this.selection.clear();
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, [], false);
    }
    /**
     * utility to export a ranking to a table with the given separator
     * @param ranking
     * @param options
     * @returns {Promise<string>}
     */
    exportTable(ranking, options = {}) {
        return Promise.resolve(this.view(ranking.getOrder())).then((data) => Object(__WEBPACK_IMPORTED_MODULE_7__utils__["b" /* exportRanking */])(ranking, data, options));
    }
}
ADataProvider.EVENT_SELECTION_CHANGED = 'selectionChanged';
ADataProvider.EVENT_ADD_COLUMN = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN;
ADataProvider.EVENT_REMOVE_COLUMN = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN;
ADataProvider.EVENT_ADD_RANKING = 'addRanking';
ADataProvider.EVENT_REMOVE_RANKING = 'removeRanking';
ADataProvider.EVENT_DIRTY = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY;
ADataProvider.EVENT_DIRTY_HEADER = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER;
ADataProvider.EVENT_DIRTY_VALUES = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES;
ADataProvider.EVENT_ORDER_CHANGED = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED;
ADataProvider.EVENT_ADD_DESC = 'addDesc';
ADataProvider.EVENT_CLEAR_DESC = 'clearDesc';
ADataProvider.EVENT_JUMP_TO_NEAREST = 'jumpToNearest';
ADataProvider.EVENT_GROUP_AGGREGATION_CHANGED = __WEBPACK_IMPORTED_MODULE_5__model_AggregateGroupColumn__["b" /* default */].EVENT_AGGREGATE;
/* harmony default export */ __webpack_exports__["a"] = (ADataProvider);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missing__ = __webpack_require__(5);
/**
 * Created by sam on 04.11.2016.
 */




/**
 * implementation of a combine column, standard operations how to select
 */
class CompositeNumberColumn extends __WEBPACK_IMPORTED_MODULE_1__CompositeColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.missingValue = NaN;
        this.numberFormat = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])('.3n');
        if (desc.numberFormat) {
            this.numberFormat = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(desc.numberFormat);
        }
        if (desc.missingValue !== undefined) {
            this.missingValue = desc.missingValue;
        }
        this.setDefaultRenderer('interleaving');
        this.setDefaultGroupRenderer('interleaving');
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.missingValue = this.missingValue;
        return r;
    }
    restore(dump, factory) {
        if (dump.missingValue !== undefined) {
            this.missingValue = dump.missingValue;
        }
        if (dump.numberFormat) {
            this.numberFormat = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(dump.numberFormat);
        }
        super.restore(dump, factory);
    }
    getLabel(row, index) {
        if (!this.isLoaded()) {
            return '';
        }
        const v = this.getValue(row, index);
        //keep non number if it is not a number else convert using formatter
        return String(typeof v === 'number' && !isNaN(v) && isFinite(v) ? this.numberFormat(v) : v);
    }
    getValue(row, index) {
        if (!this.isLoaded()) {
            return null;
        }
        //weighted sum
        const v = this.compute(row, index);
        if (Object(__WEBPACK_IMPORTED_MODULE_3__missing__["b" /* isMissingValue */])(v)) {
            return this.missingValue;
        }
        return v;
    }
    compute(_row, _index) {
        return NaN;
    }
    getNumber(row, index) {
        const r = this.getValue(row, index);
        return r === null ? NaN : r;
    }
    getRawNumber(row, index) {
        return this.getNumber(row, index);
    }
    isMissing(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__missing__["b" /* isMissingValue */])(this.compute(row, index));
    }
    compare(a, b, aIndex, bIndex) {
        return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["d" /* default */].prototype.compare.call(this, a, b, aIndex, bIndex);
    }
    groupCompare(a, b) {
        return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["d" /* default */].prototype.groupCompare.call(this, a, b);
    }
    getRendererType() {
        return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["d" /* default */].prototype.getRendererType.call(this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CompositeNumberColumn;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);

class AFilterDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    constructor(column, attachment, title) {
        super(attachment, title);
        this.column = column;
    }
    markFiltered(filtered = false) {
        this.attachment.classList.toggle('filtered', filtered);
    }
}
const filterMissingText = 'Filter out rows containing missing values';
/* harmony export (immutable) */ __webpack_exports__["d"] = filterMissingText;

const filterMissingMarkup = (bakMissing) => `<label><input class="lu_filter_missing" type="checkbox" ${bakMissing ? 'checked="checked"' : ''}>${filterMissingText}</label>`;
/* harmony export (immutable) */ __webpack_exports__["b"] = filterMissingMarkup;

const filterMissingNumberMarkup = (bakMissing, count) => `<label ${count === 0 ? 'class="lu-disabled"' : ''}><input class="lu_filter_missing" type="checkbox" ${bakMissing ? 'checked="checked"' : ''} ${count === 0 ? 'disabled' : ''}>Filter out ${count} missing value rows</label>`;
/* harmony export (immutable) */ __webpack_exports__["c"] = filterMissingNumberMarkup;

/* harmony default export */ __webpack_exports__["a"] = (AFilterDialog);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = uniformContext;
/* harmony export (immutable) */ __webpack_exports__["b"] = nonUniformContext;
/* unused harmony export randomContext */
/* harmony export (immutable) */ __webpack_exports__["c"] = range;
/* harmony export (immutable) */ __webpack_exports__["a"] = frozenDelta;
/* harmony export (immutable) */ __webpack_exports__["e"] = updateFrozen;
class RowHeightException {
    constructor(index, y, height) {
        this.index = index;
        this.y = y;
        this.height = height;
    }
    get y2() {
        return this.y + this.height;
    }
}
/**
 * creates a uniform exception context, i.e no exceptions all rows are of the same height
 * @param {number} numberOfRows
 * @param {number} rowHeight
 * @param {number} rowPadding padding between rows
 * @return {IExceptionContext}
 */
function uniformContext(numberOfRows, rowHeight, rowPadding = 0) {
    rowHeight += rowPadding;
    const exceptionsLookup = {
        keys: () => [].values(),
        get: () => rowHeight,
        has: () => false,
        size: 0
    };
    return {
        exceptions: [],
        exceptionsLookup,
        totalHeight: numberOfRows * rowHeight,
        numberOfRows,
        defaultRowHeight: rowHeight,
        padding: () => rowPadding
    };
}
/**
 * computes the most frequent value in a given array like
 * @param {} values
 * @return {number}
 */
function mostFrequentValue(values) {
    const lookup = new Map();
    values.forEach((value) => {
        lookup.set(value, (lookup.get(value) || 0) + 1);
    });
    if (lookup.size === 0) {
        return 20; // default value since it doesn't matter
    }
    // sort desc take first key and asc by the second in case of tie, it is optimized to have exceptions for higher rows less for big rows
    const sorted = Array.from(lookup).sort((a, b) => {
        if (a[1] !== b[1]) {
            return b[1] - a[1];
        }
        return a[0] - b[0];
    });
    const mostFrequent = sorted[0][0];
    if (mostFrequent === 0) {
        return sorted.length > 1 ? sorted[1][0] : 20; // all empty
    }
    return mostFrequent;
}
/**
 * creates a non uniform context based on the given array like heights
 * @param {{forEach: ((callback: (height: number, index: number) => any) => any)}} rowHeights
 * @param {number} defaultRowHeight if not given the most frequent value will be used
 * @param {number} rowPadding padding between rows
 * @return {IExceptionContext}
 */
function nonUniformContext(rowHeights, defaultRowHeight = NaN, rowPadding = 0) {
    const exceptionsLookup = new Map();
    const exceptions = [];
    const padding = typeof rowPadding === 'function' ? rowPadding : () => rowPadding;
    if (isNaN(defaultRowHeight)) {
        defaultRowHeight = mostFrequentValue(rowHeights);
    }
    defaultRowHeight += padding(-1);
    let prev = -1, acc = 0, totalHeight = 0, numberOfRows = 0;
    rowHeights.forEach((height, index) => {
        height += padding(index);
        totalHeight += height;
        numberOfRows++;
        if (height === defaultRowHeight) {
            //regular
            return;
        }
        exceptionsLookup.set(index, height);
        const between = (index - prev - 1) * defaultRowHeight;
        prev = index;
        const y = acc + between;
        acc = y + height;
        exceptions.push(new RowHeightException(index, y, height));
    });
    return { exceptionsLookup, exceptions, totalHeight, defaultRowHeight, numberOfRows, padding };
}
/**
 * creates a random context with the given contraints
 * @param {number} numberOfRows
 * @param {number} defaultRowHeight
 * @param {number} minRowHeight
 * @param {number} maxRowHeight
 * @param {number} ratio around ratio percent will get a non uniform height
 * @param {number} seed random seed
 * @return {IExceptionContext}
 */
function randomContext(numberOfRows, defaultRowHeight, minRowHeight = 2, maxRowHeight = defaultRowHeight * 10, ratio = 0.2, seed = Date.now()) {
    let actSeed = seed;
    const random = () => {
        const x = Math.sin(actSeed++) * 10000;
        return x - Math.floor(x);
    };
    const getter = () => {
        const coin = random();
        if (coin < ratio) {
            //non uniform
            return minRowHeight + Math.round(random() * (maxRowHeight - minRowHeight));
        }
        return defaultRowHeight;
    };
    const forEach = (callback) => {
        for (let index = 0; index < numberOfRows; ++index) {
            callback(getter(), index);
        }
    };
    return nonUniformContext({ forEach }, defaultRowHeight);
}
/**
 * computes the visible range
 * @param {number} scrollTop top scrolling
 * @param {number} clientHeight visible height
 * @param {number} rowHeight height of a row by default
 * @param {IRowHeightException[]} heightExceptions exceptions of this default height
 * @param {number} numberOfRows the number of rows
 * @return {IVisibleRange} the computed visible range
 */
function range(scrollTop, clientHeight, rowHeight, heightExceptions, numberOfRows) {
    if (numberOfRows === 0) {
        return { first: 0, last: -1, firstRowPos: 0, endPos: 0 };
    }
    if (numberOfRows === 1) {
        return { first: 0, last: 0, firstRowPos: 0, endPos: heightExceptions.length === 0 ? rowHeight : heightExceptions[0].y2 };
    }
    const offset = scrollTop;
    const offset2 = offset + clientHeight;
    function indexOf(pos, indexShift) {
        return Math.min(numberOfRows - 1, indexShift + Math.max(0, Math.floor(pos / rowHeight)));
    }
    function calc(offsetShift, indexShift, isGuess = false) {
        const shifted = offset - offsetShift;
        const shifted2 = offset2 - offsetShift;
        const first = indexOf(shifted, indexShift);
        const last = indexOf(shifted2, indexShift);
        const firstRowPos = offsetShift + (first - indexShift) * rowHeight;
        const endPos = offsetShift + (last + 1 - indexShift) * rowHeight;
        //if (!isGuess) {
        //  console.log(first, '@', firstRowPos, last, '#', end, offset, offset2, firstRowPos <= offset, offset2 <= end);
        //}
        console.assert(!isGuess || !(firstRowPos > offset || (endPos < offset2 && last < numberOfRows - 1)), 'error', isGuess, firstRowPos, endPos, offset, offset2, indexShift, offsetShift);
        return { first, last, firstRowPos, endPos };
    }
    const r = calc(0, 0, true);
    if (heightExceptions.length === 0) {
        //uniform
        return r;
    }
    if (r.last <= heightExceptions[0].index) {
        if (r.last === heightExceptions[0].index) {
            return Object.assign(r, { endPos: heightExceptions[0].y2 });
        }
        //console.log('before the first exception = uniform with no shift');
        //console.log(r.first, '@', r.firstRowPos, r.last, '#', r.end, offset, offset2, r.firstRowPos <= offset, offset2 <= r.end);
        return r;
    }
    //the position where the exceptions ends
    const lastPos = heightExceptions[heightExceptions.length - 1];
    if (offset >= lastPos.y) {
        const rest = calc(lastPos.y2, lastPos.index + 1);
        if (offset < lastPos.y2) {
            // include me
            return Object.assign(rest, { first: lastPos.index, firstRowPos: lastPos.y });
        }
        return rest;
    }
    //we have some exceptions
    const visible = [];
    let closest = heightExceptions[0]; //closest before not in range
    for (const item of heightExceptions) {
        const { y, y2 } = item;
        if (y >= offset2) {
            break;
        }
        if (y2 <= offset) {
            closest = item;
            continue;
        }
        visible.push(item);
    }
    if (visible.length === 0) {
        //console.log('we are in the between some exceptions and none are visible');
        return calc(closest.y2, closest.index + 1); //skip myself
    }
    {
        //console.log('we show at least one exception');
        const firstException = visible[0];
        const lastException = visible[visible.length - 1];
        const first = Math.max(0, firstException.index - Math.max(0, Math.ceil((firstException.y - offset) / rowHeight)));
        let last = lastException.index;
        if (offset2 >= lastException.y2) {
            last = indexOf(offset2 - lastException.y2, lastException.index + 1);
        }
        const firstRowPos = firstException.y - (firstException.index - first) * rowHeight;
        const endPos = lastException.y2 + (last - lastException.index) * rowHeight;
        //console.log(first, '@', firstRowPos, last, '#', end, offset, offset2, firstRowPos <= offset, offset2 <= end);
        console.assert(firstRowPos <= offset && (endPos >= offset2 || last === numberOfRows - 1), 'error', firstRowPos, endPos, offset, offset2, firstException, lastException);
        return { first, last, firstRowPos, endPos };
    }
}
function frozenDelta(current, target) {
    const clength = current.length;
    const tlength = target.length;
    if (clength === 0) {
        return { added: target, removed: [], common: 0 };
    }
    if (tlength === 0) {
        return { added: [], removed: current, common: 0 };
    }
    if (clength === tlength) {
        return { added: [], removed: [], common: clength };
    }
    const removed = current.slice(Math.min(tlength, clength));
    const added = target.slice(Math.min(tlength, clength));
    return { added, removed, common: clength - removed.length };
}
function updateFrozen(old, columns, first) {
    const oldLast = old.length === 0 ? 0 : old[old.length - 1] + 1;
    const added = [];
    const removed = [];
    for (let i = old.length - 1; i >= 0; --i) {
        const index = old[i];
        if (index >= first) {
            removed.push(old.pop());
        }
        else {
            // can stop since sorted and it will never happen again
            break;
        }
    }
    //added
    for (let i = oldLast; i < first; ++i) {
        if (columns[i].frozen) {
            added.push(i);
            old.push(i);
        }
    }
    return { target: old, added, removed };
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["i"] = toFullTooltip;
/* harmony export (immutable) */ __webpack_exports__["c"] = createHeader;
/* harmony export (immutable) */ __webpack_exports__["j"] = updateHeader;
/* harmony export (immutable) */ __webpack_exports__["b"] = addIconDOM;
/* harmony export (immutable) */ __webpack_exports__["e"] = createToolbar;
/* harmony export (immutable) */ __webpack_exports__["d"] = createShortcutMenuItems;
/* harmony export (immutable) */ __webpack_exports__["f"] = createToolbarMenuItems;
/* unused harmony export dragWidth */
/* harmony export (immutable) */ __webpack_exports__["g"] = dragAbleColumn;
/* unused harmony export rearrangeDropAble */
/* harmony export (immutable) */ __webpack_exports__["h"] = resortDropAble;
/* unused harmony export mergeDropAble */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_NumbersColumn__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_BoxPlotColumn__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialogs_SortDialog__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialogs_RenameDialog__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dialogs_ChangeRendererDialog__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_LinkColumn__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_ScriptColumn__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dialogs_ScriptEditDialog__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dialogs_EditLinkDialog__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__model_RankColumn__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dialogs_WeightsEditDialog__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__model_StackColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dialogs_CutOffHierarchyDialog__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dialogs_SearchDialog__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__model_HierarchyColumn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dnd__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__model_NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__model_Ranking__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__model_CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__dialogs_StratifyThresholdDialog__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__dialogs_MoreColumnOptionsDialog__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__model_utils__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__model_SelectionColumn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__dialogs_CompositeChildrenDialog__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__model_StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__model_ImpositionCompositeColumn__ = __webpack_require__(30);






























/**
 * utility function to generate the tooltip text with description
 * @param col the column
 */
function toFullTooltip(col) {
    let base = col.label;
    if (col.description != null && col.description !== '') {
        base += `\n${col.description}`;
    }
    return base;
}
function createHeader(col, document, ctx, options = {}) {
    options = Object.assign({
        dragAble: true,
        mergeDropAble: true,
        rearrangeAble: true,
        resizeable: true
    }, options);
    const node = document.createElement('section');
    node.innerHTML = `
    <div class="lu-label">${col.label}</div>
    <div class="lu-toolbar"></div>
    <div class="lu-spacing"></div>
    <div class="lu-summary"></div>
    <div class="lu-handle"></div>
  `;
    createToolbar(node.querySelector('div.lu-toolbar'), col, ctx);
    toggleToolbarIcons(node, col);
    if (options.dragAble) {
        dragAbleColumn(node, col, ctx);
    }
    if (options.mergeDropAble) {
        mergeDropAble(node, col, ctx);
    }
    if (options.rearrangeAble) {
        rearrangeDropAble(node.querySelector('.lu-handle'), col, ctx);
    }
    if (options.resizeable) {
        dragWidth(col, node);
    }
    return node;
}
function updateHeader(node, col, ctx, interactive = false) {
    node.querySelector('.lu-label').innerHTML = col.label;
    node.title = toFullTooltip(col);
    const sort = node.querySelector(`i[title='Sort']`);
    if (sort) {
        const { asc, priority } = col.isSortedByMe();
        sort.dataset.sort = asc !== undefined ? asc : '';
        if (priority !== undefined) {
            sort.dataset.priority = (parseInt(priority, 10) + 1).toString();
        }
        else {
            delete sort.dataset.priority;
        }
    }
    const stratify = node.querySelector(`i[title^='Stratify']`);
    if (stratify) {
        const groupedBy = col.isGroupedBy();
        stratify.dataset.stratify = groupedBy >= 0 ? 'true' : 'false';
        if (groupedBy >= 0) {
            stratify.dataset.priority = (groupedBy + 1).toString();
        }
        else {
            delete stratify.dataset.priority;
        }
    }
    const summary = Object(__WEBPACK_IMPORTED_MODULE_25__model_utils__["a" /* findTypeLike */])(col, ctx.summaries);
    if (summary) {
        summary(col, node.querySelector('.lu-summary'), interactive, ctx);
    }
}
function addIconDOM(node, col, showLabel) {
    return (title, dialogClass, ...dialogArgs) => {
        node.insertAdjacentHTML('beforeend', `<i title="${title}"><span${!showLabel ? ' aria-hidden="true"' : ''}>${title}</span> </i>`);
        const i = node.lastElementChild;
        if (!dialogClass) {
            return i;
        }
        i.onclick = (evt) => {
            evt.stopPropagation();
            const dialog = new dialogClass(col, i, ...dialogArgs);
            dialog.openDialog();
        };
        return i;
    };
}
function createToolbar(node, col, ctx) {
    return createShortcutMenuItems(addIconDOM(node, col, false), col, ctx);
}
function createShortcutMenuItems(addIcon, col, ctx) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__model__["isSupportType"])(col.desc) || col instanceof __WEBPACK_IMPORTED_MODULE_26__model_SelectionColumn__["b" /* default */]) {
        addIcon('Sort').onclick = (evt) => {
            evt.stopPropagation();
            col.toggleMySorting();
        };
    }
    //stratify
    if (Object(__WEBPACK_IMPORTED_MODULE_21__model_CategoricalColumn__["b" /* isCategoricalColumn */])(col)) {
        addIcon('Stratify').onclick = (evt) => {
            evt.stopPropagation();
            col.groupByMe();
        };
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_18__model_NumberColumn__["d" /* default */]) {
        addIcon('Stratify by Threshold &hellip;', __WEBPACK_IMPORTED_MODULE_22__dialogs_StratifyThresholdDialog__["a" /* default */]);
    }
    if (!(col instanceof __WEBPACK_IMPORTED_MODULE_11__model_RankColumn__["b" /* default */])) {
        addIcon('Remove').onclick = (evt) => {
            evt.stopPropagation();
            if (!(col instanceof __WEBPACK_IMPORTED_MODULE_11__model_RankColumn__["b" /* default */])) {
                col.removeMe();
                return;
            }
            ctx.provider.removeRanking(col.findMyRanker());
            ctx.provider.ensureOneRanking();
        };
    }
    addIcon('More &hellip;', __WEBPACK_IMPORTED_MODULE_24__dialogs_MoreColumnOptionsDialog__["a" /* default */], '', ctx);
}
function createToolbarMenuItems(addIcon, col, ctx) {
    const isSupportColumn = Object(__WEBPACK_IMPORTED_MODULE_0__model__["isSupportType"])(col.desc);
    if (!isSupportColumn) {
        //rename
        addIcon('Rename + Color &hellip;', __WEBPACK_IMPORTED_MODULE_4__dialogs_RenameDialog__["a" /* default */]);
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_28__model_StringColumn__["a" /* default */]) {
        addIcon('Sort Group by Name').onclick = (evt) => {
            evt.stopPropagation();
            col.toggleMyGroupSorting();
        };
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_18__model_NumberColumn__["d" /* default */]) {
        addIcon('Sort Group by &hellip;', __WEBPACK_IMPORTED_MODULE_3__dialogs_SortDialog__["a" /* default */]);
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_1__model_NumbersColumn__["a" /* default */] || col instanceof __WEBPACK_IMPORTED_MODULE_2__model_BoxPlotColumn__["a" /* default */]) {
        //Numbers Sort
        addIcon('Sort by &hellip;', __WEBPACK_IMPORTED_MODULE_3__dialogs_SortDialog__["a" /* default */]);
    }
    //stratify
    if (Object(__WEBPACK_IMPORTED_MODULE_21__model_CategoricalColumn__["b" /* isCategoricalColumn */])(col) || col instanceof __WEBPACK_IMPORTED_MODULE_26__model_SelectionColumn__["b" /* default */]) {
        addIcon('Stratify').onclick = (evt) => {
            evt.stopPropagation();
            col.groupByMe();
        };
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_18__model_NumberColumn__["d" /* default */]) {
        addIcon('Stratify by Threshold &hellip;', __WEBPACK_IMPORTED_MODULE_22__dialogs_StratifyThresholdDialog__["a" /* default */]);
    }
    const possible = ctx.getPossibleRenderer(col);
    if (possible.item.length > 2 || possible.group.length > 2) {
        //Renderer Change
        addIcon('Visualization &hellip;', __WEBPACK_IMPORTED_MODULE_5__dialogs_ChangeRendererDialog__["a" /* default */], ctx);
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_6__model_LinkColumn__["a" /* default */]) {
        //edit link
        addIcon('Edit Link Pattern &hellip;', __WEBPACK_IMPORTED_MODULE_9__dialogs_EditLinkDialog__["a" /* default */], ctx.idPrefix, [].concat(col.desc.templates || [], ctx.linkTemplates));
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_7__model_ScriptColumn__["b" /* default */]) {
        //edit script
        addIcon('Edit Combine Script &hellip;', __WEBPACK_IMPORTED_MODULE_8__dialogs_ScriptEditDialog__["a" /* default */]);
    }
    //filter
    const filter = Object(__WEBPACK_IMPORTED_MODULE_25__model_utils__["a" /* findTypeLike */])(col, ctx.filters);
    if (filter) {
        addIcon('Filter &hellip;', filter, '', ctx.provider, ctx.idPrefix);
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_16__model_HierarchyColumn__["a" /* default */]) {
        //cutoff
        addIcon('Set Cut Off &hellip;', __WEBPACK_IMPORTED_MODULE_14__dialogs_CutOffHierarchyDialog__["a" /* default */], ctx.idPrefix);
    }
    if (ctx.searchAble(col)) {
        //search
        addIcon('Search &hellip;', __WEBPACK_IMPORTED_MODULE_15__dialogs_SearchDialog__["a" /* default */], ctx.provider);
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_13__model_StackColumn__["b" /* default */]) {
        //edit weights
        addIcon('Edit Weights &hellip;', __WEBPACK_IMPORTED_MODULE_12__dialogs_WeightsEditDialog__["a" /* default */]);
    }
    if (Object(__WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__["b" /* isMultiLevelColumn */])(col)) {
        const mcol = col;
        addIcon(mcol.getCollapsed() ? 'Expand' : 'Compress').onclick = (evt) => {
            evt.stopPropagation();
            mcol.setCollapsed(!mcol.getCollapsed());
            const i = evt.currentTarget;
            i.title = mcol.getCollapsed() ? 'Expand' : 'Compress';
        };
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__["a" /* default */] && col.parent instanceof __WEBPACK_IMPORTED_MODULE_20__model_Ranking__["a" /* default */]) {
        addIcon('Split Combined Column').onclick = (evt) => {
            evt.stopPropagation();
            // split the combined column into its children
            col.children.reverse().forEach((c) => col.insertAfterMe(c));
            col.removeMe();
        };
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__["a" /* default */] && (!Object(__WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__["b" /* isMultiLevelColumn */])(col) || col.getCollapsed())) {
        addIcon('Contained Columns &hellip;', __WEBPACK_IMPORTED_MODULE_27__dialogs_CompositeChildrenDialog__["a" /* default */], ctx);
    }
    if (!isSupportColumn) {
        //clone
        addIcon('Generate Snapshot').onclick = (evt) => {
            evt.stopPropagation();
            ctx.provider.takeSnapshot(col);
        };
    }
    addIcon('Remove').onclick = (evt) => {
        evt.stopPropagation();
        if (!(col instanceof __WEBPACK_IMPORTED_MODULE_11__model_RankColumn__["b" /* default */])) {
            col.removeMe();
            return;
        }
        ctx.provider.removeRanking(col.findMyRanker());
        ctx.provider.ensureOneRanking();
    };
}
function toggleToolbarIcons(node, col, defaultVisibleClientWidth = 22.5) {
    const toolbar = node.querySelector('.lu-toolbar');
    const moreIcon = toolbar.querySelector('[title^=More]');
    const availableWidth = col.getWidth() - (moreIcon.clientWidth || defaultVisibleClientWidth);
    const toggableIcons = Array.from(toolbar.children).filter((d) => d !== moreIcon)
        .reverse(); // start hiding with the last icon
    toggableIcons.forEach((icon) => {
        icon.classList.remove('hidden'); // first show all icons to calculate the correct `clientWidth`
    });
    toggableIcons.forEach((icon) => {
        const currentWidth = toggableIcons.reduce((a, b) => {
            const realWidth = b.clientWidth;
            if (realWidth > 0) {
                return a + realWidth;
            }
            if (!b.classList.contains('hidden')) {
                return a + defaultVisibleClientWidth;
            }
            return a;
        }, 0);
        icon.classList.toggle('hidden', (currentWidth > availableWidth)); // hide icons if necessary
    });
}
/**
 * allow to change the width of a column using dragging the handle
 */
function dragWidth(col, node) {
    let ueberElement;
    const handle = node.querySelector('.lu-handle');
    let start = 0;
    const mouseMove = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        const end = evt.clientX;
        if (Math.abs(start - end) < 2) {
            //ignore
            return;
        }
        const delta = end - start;
        start = end;
        const width = Math.max(0, col.getWidth() + delta);
        col.setWidth(width);
        toggleToolbarIcons(node, col);
    };
    const mouseUp = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        const end = evt.clientX;
        node.classList.remove('lu-change-width');
        ueberElement.removeEventListener('mousemove', mouseMove);
        ueberElement.removeEventListener('mouseup', mouseUp);
        ueberElement.removeEventListener('mouseleave', mouseUp);
        if (Math.abs(start - end) < 2) {
            //ignore
            return;
        }
        const delta = end - start;
        const width = Math.max(0, col.getWidth() + delta);
        col.setWidth(width);
        toggleToolbarIcons(node, col);
    };
    handle.onmousedown = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        node.classList.add('lu-change-width');
        start = evt.clientX;
        ueberElement = node.closest('header');
        ueberElement.addEventListener('mousemove', mouseMove);
        ueberElement.addEventListener('mouseup', mouseUp);
        ueberElement.addEventListener('mouseleave', mouseUp);
    };
    handle.onclick = (evt) => {
        // avoid resorting
        evt.stopPropagation();
        evt.preventDefault();
    };
}
const MIMETYPE_PREFIX = 'text/x-caleydo-lineup-column';
/* harmony export (immutable) */ __webpack_exports__["a"] = MIMETYPE_PREFIX;

/**
 * allow to drag the column away
 */
function dragAbleColumn(node, column, ctx) {
    Object(__WEBPACK_IMPORTED_MODULE_17__dnd__["a" /* dragAble */])(node, () => {
        const ref = JSON.stringify(ctx.provider.toDescRef(column.desc));
        const data = {
            'text/plain': column.label,
            [`${MIMETYPE_PREFIX}-ref`]: column.id,
            [MIMETYPE_PREFIX]: ref
        };
        if (Object(__WEBPACK_IMPORTED_MODULE_19__model_INumberColumn__["h" /* isNumberColumn */])(column)) {
            data[`${MIMETYPE_PREFIX}-number`] = ref;
            data[`${MIMETYPE_PREFIX}-number-ref`] = column.id;
        }
        return {
            effectAllowed: 'copyMove',
            data
        };
    }, true);
}
/**
 * dropper for allowing to rearrange (move, copy) columns
 */
function rearrangeDropAble(node, column, ctx) {
    Object(__WEBPACK_IMPORTED_MODULE_17__dnd__["b" /* dropAble */])(node, [`${MIMETYPE_PREFIX}-ref`, MIMETYPE_PREFIX], (result) => {
        let col = null;
        const data = result.data;
        if (!(`${MIMETYPE_PREFIX}-ref` in data)) {
            const desc = JSON.parse(data[MIMETYPE_PREFIX]);
            col = ctx.provider.create(ctx.provider.fromDescRef(desc));
            return col != null && column.insertAfterMe(col) != null;
        }
        // find by reference
        const id = data[`${MIMETYPE_PREFIX}-ref`];
        col = ctx.provider.find(id);
        if (!col || (col === column && !result.effect.startsWith('copy'))) {
            return false;
        }
        if (result.effect.startsWith('copy')) {
            col = ctx.provider.clone(col);
            return col != null && column.insertAfterMe(col) != null;
        }
        // detect whether it is an internal move operation or an real remove/insert operation
        const toInsertParent = col.parent;
        if (!toInsertParent) {
            return column.insertAfterMe(col) != null;
        }
        if (toInsertParent === column.parent) {
            // move operation
            return toInsertParent.moveAfter(col, column) != null;
        }
        col.removeMe();
        return column.insertAfterMe(col) != null;
    }, null, true);
}
/**
 * dropper for allowing to change the order by dropping it at a certain position
 */
function resortDropAble(node, column, ctx, where, autoGroup) {
    Object(__WEBPACK_IMPORTED_MODULE_17__dnd__["b" /* dropAble */])(node, [`${MIMETYPE_PREFIX}-ref`, MIMETYPE_PREFIX], (result) => {
        let col = null;
        const data = result.data;
        if (`${MIMETYPE_PREFIX}-ref` in data) {
            const id = data[`${MIMETYPE_PREFIX}-ref`];
            col = ctx.provider.find(id);
            if (!col || col === column) {
                return false;
            }
        }
        else {
            const desc = JSON.parse(data[MIMETYPE_PREFIX]);
            col = ctx.provider.create(ctx.provider.fromDescRef(desc));
            if (col) {
                column.findMyRanker().push(col);
            }
        }
        const ranking = column.findMyRanker();
        if (!col || col === column || !ranking) {
            return false;
        }
        const criteria = ranking.getSortCriterias();
        const groups = ranking.getGroupCriteria();
        const removeFromSort = (col) => {
            const existing = criteria.findIndex((d) => d.col === col);
            if (existing >= 0) {
                return criteria.splice(existing, 1)[0].asc;
            }
            return false;
        };
        // remove the one to add
        const asc = removeFromSort(col);
        const groupIndex = groups.indexOf(column);
        const index = criteria.findIndex((d) => d.col === column);
        if (autoGroup && groupIndex >= 0) {
            // before the grouping, so either ungroup or regroup
            removeFromSort(column);
            if (Object(__WEBPACK_IMPORTED_MODULE_21__model_CategoricalColumn__["b" /* isCategoricalColumn */])(col)) {
                groups.splice(groupIndex + (where === 'after' ? 1 : 0), 0, col);
                if (groups.length > ranking.getMaxGroupColumns()) {
                    // move the rest to sorting
                    const removed = groups.splice(0, groups.length - ranking.getMaxGroupColumns());
                    criteria.unshift(...removed.reverse().map((d) => ({ asc: false, col: d }))); // now a first sorting criteria
                }
            }
            else {
                // remove all before and shift to sorting + sorting
                const removed = groups.splice(0, groups.length - groupIndex);
                criteria.unshift(...removed.reverse().map((d) => ({ asc: false, col: d }))); // now a first sorting criteria
                criteria.unshift({ asc, col });
            }
        }
        else if (index < 0) {
            criteria.push({ asc, col });
        }
        else if (index === 0 && autoGroup && Object(__WEBPACK_IMPORTED_MODULE_21__model_CategoricalColumn__["b" /* isCategoricalColumn */])(col)) {
            // make group criteria
            groups.push(col);
        }
        else {
            criteria.splice(index + (where === 'after' ? 1 : 0), 0, { asc, col });
        }
        if (!Object(__WEBPACK_IMPORTED_MODULE_23__utils__["j" /* equalArrays */])(groups, ranking.getGroupCriteria())) {
            ranking.groupBy(groups);
        }
        ranking.setSortCriteria(criteria);
        return true;
    }, null, true);
}
/**
 * dropper for merging columns
 */
function mergeDropAble(node, column, ctx) {
    const resolveDrop = (result, numbersOnly) => {
        const data = result.data;
        const copy = result.effect === 'copy';
        const prefix = `${MIMETYPE_PREFIX}${numbersOnly ? '-number' : ''}`;
        if (`${prefix}-ref` in data) {
            const id = data[`${prefix}-ref`];
            let col = ctx.provider.find(id);
            if (copy) {
                col = ctx.provider.clone(col);
            }
            else if (col === column) {
                return null;
            }
            else {
                col.removeMe();
            }
            return col;
        }
        const desc = JSON.parse(data[prefix]);
        return ctx.provider.create(ctx.provider.fromDescRef(desc));
    };
    if (Object(__WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__["b" /* isMultiLevelColumn */])(column)) {
        if (column.canJustAddNumbers) {
            Object(__WEBPACK_IMPORTED_MODULE_17__dnd__["b" /* dropAble */])(node, [`${MIMETYPE_PREFIX}-number-ref`, `${MIMETYPE_PREFIX}-number`], (result) => {
                const col = resolveDrop(result, true);
                return col != null && column.push(col) != null;
            });
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_17__dnd__["b" /* dropAble */])(node, [`${MIMETYPE_PREFIX}-ref`, MIMETYPE_PREFIX], (result) => {
                const col = resolveDrop(result, false);
                return col != null && column.push(col) != null;
            });
        }
        return;
    }
    const justNumbers = (d) => (d instanceof __WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__["a" /* default */] && d.canJustAddNumbers) || (Object(__WEBPACK_IMPORTED_MODULE_19__model_INumberColumn__["h" /* isNumberColumn */])(d) && d.parent instanceof __WEBPACK_IMPORTED_MODULE_20__model_Ranking__["a" /* default */] && !(d instanceof __WEBPACK_IMPORTED_MODULE_29__model_ImpositionCompositeColumn__["b" /* default */]));
    const dropOrMerge = (justNumbers) => {
        return (result) => {
            const col = resolveDrop(result, justNumbers);
            if (!col) {
                return false;
            }
            if (column instanceof __WEBPACK_IMPORTED_MODULE_10__model_CompositeColumn__["a" /* default */]) {
                return (column.push(col) !== null);
            }
            const ranking = column.findMyRanker();
            const index = ranking.indexOf(column);
            const parent = ctx.provider.create(justNumbers ? Object(__WEBPACK_IMPORTED_MODULE_0__model__["createStackDesc"])() : Object(__WEBPACK_IMPORTED_MODULE_0__model__["createNestedDesc"])());
            column.removeMe();
            parent.push(column);
            parent.push(col);
            return ranking.insert(parent, index) != null;
        };
    };
    if (justNumbers(column)) {
        Object(__WEBPACK_IMPORTED_MODULE_17__dnd__["b" /* dropAble */])(node, [`${MIMETYPE_PREFIX}-number-ref`, `${MIMETYPE_PREFIX}-number`], dropOrMerge(true));
    }
    else {
        Object(__WEBPACK_IMPORTED_MODULE_17__dnd__["b" /* dropAble */])(node, [`${MIMETYPE_PREFIX}-ref`, `${MIMETYPE_PREFIX}`], dropOrMerge(false));
    }
}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/**
 * Created by sam on 04.11.2016.
 */




/**
 * factory for creating a description creating a stacked column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'Weighted Sum') {
    return { type: 'stack', label };
}
/**
 * implementation of the stacked column
 */
class StackColumn extends __WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        /**
         * whether this stack column is collapsed i.e. just looks like an ordinary number column
         * @type {boolean}
         * @private
         */
        this.collapsed = false;
        const that = this;
        this.adaptChange = function (oldValue, newValue) {
            that.adaptWidthChange(this.source, oldValue, newValue);
        };
        if (this.getRendererType() === 'interleaving') {
            this.setRendererType('stack');
        }
        if (this.getGroupRenderer() === 'interleaving') {
            this.setGroupRenderer('stack');
        }
    }
    createEventList() {
        return super.createEventList().concat([StackColumn.EVENT_COLLAPSE_CHANGED, StackColumn.EVENT_WEIGHTS_CHANGED, StackColumn.EVENT_MULTI_LEVEL_CHANGED]);
    }
    setCollapsed(value) {
        if (this.collapsed === value) {
            return;
        }
        this.fire([StackColumn.EVENT_COLLAPSE_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.collapsed, this.collapsed = value);
    }
    getCollapsed() {
        return this.collapsed;
    }
    get canJustAddNumbers() {
        return true;
    }
    flatten(r, offset, levelsToGo = 0, padding = 0) {
        let self = null;
        const children = levelsToGo <= __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].FLAT_ALL_COLUMNS ? this._children : this._children.filter((c) => !c.isHidden());
        //no more levels or just this one
        if (levelsToGo === 0 || levelsToGo <= __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
            let w = this.getWidth();
            if (!this.collapsed) {
                w += (children.length - 1) * padding;
            }
            r.push(self = { col: this, offset, width: w });
            if (levelsToGo === 0) {
                return w;
            }
        }
        //push children
        let acc = offset;
        children.forEach((c) => {
            acc += c.flatten(r, acc, levelsToGo - 1, padding) + padding;
        });
        if (self) {
            self.width = acc - offset - padding;
        }
        return acc - offset - padding;
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.collapsed = this.collapsed;
        return r;
    }
    restore(dump, factory) {
        this.collapsed = dump.collapsed === true;
        super.restore(dump, factory);
    }
    /**
     * inserts a column at a the given position
     */
    insert(col, index, weight = NaN) {
        if (!isNaN(weight)) {
            col.setWidth((weight / (1 - weight) * this.getWidth()));
        }
        col.on(`${__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED}.stack`, this.adaptChange);
        //increase my width
        super.setWidth(this.length === 0 ? col.getWidth() : (this.getWidth() + col.getWidth()));
        return super.insert(col, index);
    }
    push(col, weight = NaN) {
        return this.insert(col, this.length, weight);
    }
    insertAfter(col, ref, weight = NaN) {
        const i = this.indexOf(ref);
        if (i < 0) {
            return null;
        }
        return this.insert(col, i + 1, weight);
    }
    /**
     * adapts weights according to an own width change
     * @param col
     * @param oldValue
     * @param newValue
     */
    adaptWidthChange(col, oldValue, newValue) {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__utils__["t" /* similar */])(oldValue, newValue, 0.5)) {
            return;
        }
        const bak = this.getWeights();
        const full = this.getWidth(), change = (newValue - oldValue) / full;
        const oldWeight = oldValue / full;
        const factor = (1 - oldWeight - change) / (1 - oldWeight);
        const widths = this._children.map((c) => {
            if (c === col) {
                //c.weight += change;
                return newValue;
            }
            const guess = c.getWidth() * factor;
            const w = isNaN(guess) || guess < 1 ? 0 : guess;
            c.setWidthImpl(w);
            return w;
        });
        //adapt width if needed
        super.setWidth(widths.reduce((a, b) => a + b, 0));
        this.fire([StackColumn.EVENT_WEIGHTS_CHANGED, StackColumn.EVENT_MULTI_LEVEL_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getWeights());
    }
    getWeights() {
        const w = this.getWidth();
        return this._children.map((d) => d.getWidth() / w);
    }
    setWeights(weights) {
        const bak = this.getWeights();
        const delta = weights.length - this.length;
        let s;
        if (delta < 0) {
            s = weights.reduce((p, a) => p + a, 0);
            if (s <= 1) {
                for (let i = 0; i < -delta; ++i) {
                    weights.push((1 - s) * (1 / -delta));
                }
            }
            else if (s <= 100) {
                for (let i = 0; i < -delta; ++i) {
                    weights.push((100 - s) * (1 / -delta));
                }
            }
        }
        weights = weights.slice(0, this.length);
        s = weights.reduce((p, a) => p + a, 0) / this.getWidth();
        weights = weights.map((d) => d / s);
        this._children.forEach((c, i) => {
            c.setWidthImpl(weights[i]);
        });
        this.fire([StackColumn.EVENT_WEIGHTS_CHANGED, StackColumn.EVENT_MULTI_LEVEL_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, weights);
    }
    removeImpl(child) {
        child.on(`${__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED}.stack`, null);
        super.setWidth(this.length === 0 ? 100 : this.getWidth() - child.getWidth());
        return super.removeImpl(child);
    }
    setWidth(value) {
        const factor = value / this.getWidth();
        this._children.forEach((child) => {
            //disable since we change it
            child.setWidthImpl(child.getWidth() * factor);
        });
        super.setWidth(value);
    }
    compute(row, index) {
        const w = this.getWidth();
        return this._children.reduce((acc, d) => acc + d.getValue(row, index) * (d.getWidth() / w), 0);
    }
    getRendererType() {
        if (this.getCollapsed() && this.isLoaded()) {
            return StackColumn.COLLAPSED_RENDERER;
        }
        return super.getRendererType();
    }
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    toSortingDesc(toId) {
        const w = this.getWeights();
        return this._children.map((c, i) => ({ weight: w[i], id: c.toSortingDesc(toId) }));
    }
    isMissing(row, index) {
        return this._children.some((c) => Object(__WEBPACK_IMPORTED_MODULE_2__INumberColumn__["h" /* isNumberColumn */])(c) && c.isMissing(row, index));
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = StackColumn;

StackColumn.EVENT_COLLAPSE_CHANGED = 'collapseChanged';
StackColumn.EVENT_WEIGHTS_CHANGED = 'weightsChanged';
StackColumn.COLLAPSED_RENDERER = 'number';
StackColumn.EVENT_MULTI_LEVEL_CHANGED = 'nestedChildRatio';


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(7);
/**
 * Created by sam on 04.11.2016.
 */

/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'S') {
    return { type: 'selection', label };
}
/**
 * a checkbox column for selections
 */
class SelectionColumn extends __WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.setWidth(20);
    }
    createEventList() {
        return super.createEventList().concat([SelectionColumn.EVENT_SELECT]);
    }
    setValue(row, index, value) {
        const old = this.getValue(row, index);
        if (old === value) {
            return true;
        }
        return this.setImpl(row, index, value);
    }
    setImpl(row, index, value) {
        if (this.desc.setter) {
            this.desc.setter(row, index, value);
        }
        this.fire(SelectionColumn.EVENT_SELECT, row, value);
        return true;
    }
    toggleValue(row, index) {
        const old = this.getValue(row, index);
        this.setImpl(row, index, !old);
        return !old;
    }
    compare(a, b, aIndex, bIndex) {
        const va = this.getValue(a, aIndex) === true;
        const vb = this.getValue(b, bIndex) === true;
        return va === vb ? 0 : (va < vb ? -1 : +1);
    }
    group(row, index) {
        const isSelected = this.getValue(row, index);
        return isSelected ? SelectionColumn.SELECTED_GROUP : SelectionColumn.NOT_SELECTED_GROUP;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = SelectionColumn;

SelectionColumn.SELECTED_GROUP = {
    name: 'Selected',
    color: 'orange'
};
SelectionColumn.NOT_SELECTED_GROUP = {
    name: 'Unselected',
    color: 'gray'
};
SelectionColumn.EVENT_SELECT = 'select';


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = colorOf;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_CompositeNumberColumn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_ImpositionCompositeColumn__ = __webpack_require__(30);



function colorOf(col, row, imposer) {
    if (imposer && imposer.color) {
        return imposer.color(row);
    }
    if (row && (col instanceof __WEBPACK_IMPORTED_MODULE_0__model_CompositeNumberColumn__["a" /* default */] || Object(__WEBPACK_IMPORTED_MODULE_1__model__["isCategoricalColumn"])(col) || col instanceof __WEBPACK_IMPORTED_MODULE_2__model_ImpositionCompositeColumn__["b" /* default */])) {
        return col.getColor(row.v, row.dataIndex);
    }
    return col.color;
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isGroup;
function isGroup(item) {
    return item && item.name !== undefined; // use .name as separator
}


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createDOM"] = createDOM;
/* harmony export (immutable) */ __webpack_exports__["createCanvas"] = createCanvas;
/* harmony export (immutable) */ __webpack_exports__["createDOMGroup"] = createDOMGroup;
/* harmony export (immutable) */ __webpack_exports__["createCanvasGroup"] = createCanvasGroup;
/* harmony export (immutable) */ __webpack_exports__["possibleRenderer"] = possibleRenderer;
/* harmony export (immutable) */ __webpack_exports__["possibleGroupRenderer"] = possibleGroupRenderer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BarCellRenderer__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DefaultCellRenderer__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StringCellRenderer__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SelectionRenderer__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LinkCellRenderer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AnnotationRenderer__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ActionRenderer__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MultiLevelCellRenderer__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CategoricalCellRenderer__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__NumbersCellRenderer__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SparklineCellRenderer__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__VerticalBarCellRenderer__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__UpSetCellRenderer__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__CircleCellRenderer__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__BoxplotCellRenderer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__LoadingCellRenderer__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__HeatmapCellRenderer__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__EmptyCellRenderer__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__RankCellRenderer__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__CategoricalColorCellRenderer__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__AggregateGroupRenderer__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__HistogramRenderer__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__CategoricalColorShiftedCellRenderer__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ImageCellRenderer__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__BooleanCellRenderer__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__InterleavingCellRenderer__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__DotCellRenderer__ = __webpack_require__(100);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */



























const defaultCellRenderer = new __WEBPACK_IMPORTED_MODULE_1__DefaultCellRenderer__["a" /* DefaultCellRenderer */]();
/* harmony export (immutable) */ __webpack_exports__["defaultCellRenderer"] = defaultCellRenderer;

/**
 * default render factories
 */
const renderers = {
    rank: new __WEBPACK_IMPORTED_MODULE_18__RankCellRenderer__["a" /* default */](),
    boolean: new __WEBPACK_IMPORTED_MODULE_24__BooleanCellRenderer__["a" /* default */](),
    number: new __WEBPACK_IMPORTED_MODULE_0__BarCellRenderer__["a" /* default */](),
    string: new __WEBPACK_IMPORTED_MODULE_2__StringCellRenderer__["a" /* default */](),
    selection: new __WEBPACK_IMPORTED_MODULE_3__SelectionRenderer__["a" /* default */](),
    heatmap: new __WEBPACK_IMPORTED_MODULE_16__HeatmapCellRenderer__["a" /* default */](),
    image: new __WEBPACK_IMPORTED_MODULE_23__ImageCellRenderer__["a" /* default */](),
    link: new __WEBPACK_IMPORTED_MODULE_4__LinkCellRenderer__["a" /* default */](),
    annotate: new __WEBPACK_IMPORTED_MODULE_5__AnnotationRenderer__["a" /* default */](),
    actions: new __WEBPACK_IMPORTED_MODULE_6__ActionRenderer__["a" /* default */](),
    stack: new __WEBPACK_IMPORTED_MODULE_7__MultiLevelCellRenderer__["b" /* default */](),
    nested: new __WEBPACK_IMPORTED_MODULE_7__MultiLevelCellRenderer__["b" /* default */](false),
    categorical: new __WEBPACK_IMPORTED_MODULE_8__CategoricalCellRenderer__["a" /* default */](),
    catcolor: new __WEBPACK_IMPORTED_MODULE_19__CategoricalColorCellRenderer__["a" /* default */](),
    catcolorshifted: new __WEBPACK_IMPORTED_MODULE_22__CategoricalColorShiftedCellRenderer__["a" /* default */](),
    numbers: new __WEBPACK_IMPORTED_MODULE_9__NumbersCellRenderer__["a" /* default */](),
    sparkline: new __WEBPACK_IMPORTED_MODULE_10__SparklineCellRenderer__["a" /* default */](),
    verticalbar: new __WEBPACK_IMPORTED_MODULE_11__VerticalBarCellRenderer__["a" /* default */](),
    upset: new __WEBPACK_IMPORTED_MODULE_12__UpSetCellRenderer__["a" /* default */](),
    circle: new __WEBPACK_IMPORTED_MODULE_13__CircleCellRenderer__["a" /* default */](),
    boxplot: new __WEBPACK_IMPORTED_MODULE_14__BoxplotCellRenderer__["a" /* default */](),
    loading: new __WEBPACK_IMPORTED_MODULE_15__LoadingCellRenderer__["a" /* default */](),
    empty: new __WEBPACK_IMPORTED_MODULE_17__EmptyCellRenderer__["a" /* EmptyCellRenderer */](),
    aggregate: new __WEBPACK_IMPORTED_MODULE_20__AggregateGroupRenderer__["a" /* default */](),
    histogram: new __WEBPACK_IMPORTED_MODULE_21__HistogramRenderer__["a" /* default */](),
    interleaving: new __WEBPACK_IMPORTED_MODULE_25__InterleavingCellRenderer__["a" /* default */](),
    dot: new __WEBPACK_IMPORTED_MODULE_26__DotCellRenderer__["a" /* default */](),
    default: defaultCellRenderer
};
/* harmony export (immutable) */ __webpack_exports__["renderers"] = renderers;

function chooseRenderer(col, renderers) {
    const r = renderers[col.getRendererType()];
    return r || defaultCellRenderer;
}
function chooseGroupRenderer(col, renderers) {
    const r = renderers[col.getGroupRenderer()];
    return r || defaultCellRenderer;
}
function createDOM(col, renderers, context, imposer) {
    const r = chooseRenderer(col, renderers);
    return (r.createDOM ? r.createDOM.bind(r) : defaultCellRenderer.createDOM.bind(defaultCellRenderer))(col, context, imposer);
}
function createCanvas(col, renderers, context, imposer) {
    const r = chooseRenderer(col, renderers);
    return (r.createCanvas ? r.createCanvas.bind(r) : defaultCellRenderer.createCanvas.bind(defaultCellRenderer))(col, context, imposer);
}
function createDOMGroup(col, renderers, context, imposer) {
    const r = chooseGroupRenderer(col, renderers);
    return (r.createGroupDOM ? r.createGroupDOM.bind(r) : defaultCellRenderer.createGroupDOM.bind(defaultCellRenderer))(col, context, imposer);
}
function createCanvasGroup(col, renderers, context, imposer) {
    const r = chooseGroupRenderer(col, renderers);
    return (r.createGroupCanvas ? r.createGroupCanvas.bind(r) : defaultCellRenderer.createGroupCanvas.bind(defaultCellRenderer))(col, context, imposer);
}
function possibleRenderer(col, renderers, isGroup = false) {
    const valid = Object.keys(renderers).filter((type) => {
        const factory = renderers[type];
        return factory.canRender(col, isGroup);
    });
    // TODO some magic to remove and order
    return valid.map((type) => ({ type, label: !isGroup ? renderers[type].title : (renderers[type].groupTitle || renderers[type].title) }));
}
function possibleGroupRenderer(col, renderers) {
    return possibleRenderer(col, renderers, true);
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = joinGroups;
/* harmony export (immutable) */ __webpack_exports__["c"] = toGroupID;
/* harmony export (immutable) */ __webpack_exports__["d"] = unifyParents;
/**
 * Created by Samuel Gratzl on 24.05.2017.
 */
const defaultGroup = {
    name: 'Default',
    color: 'gray'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultGroup;

function joinGroups(groups) {
    console.assert(groups.length > 0);
    if (groups.length === 1) {
        return groups[0];
    }
    // create a chain
    const parents = groups.map((g) => Object.assign({ subGroups: [] }, g));
    groups.slice(1).forEach((g, i) => {
        g.parent = parents[i];
        parents[i].subGroups.push(g);
    });
    const g = {
        name: groups.map((d) => d.name).join(' ∩ '),
        color: groups[0].color,
        parent: parents[parents.length - 1]
    };
    g.parent.subGroups.push(g);
    return g;
}
function toGroupID(group) {
    let id = group.name;
    let g = group.parent;
    while (g) {
        id = `${g.name}.${id}`;
        g = g.parent;
    }
    return id;
}
function unifyParents(groups) {
    if (groups.length <= 1) {
        return;
    }
    const lookup = new Map();
    const resolve = (g) => {
        let id = g.name;
        if (g.parent) {
            const parent = resolve(g.parent);
            g.parent = parent.g;
            id = `${parent.id}.$[id}`;
        }
        // ensure there is only one instance per id (i.e. share common parents
        if (lookup.has(id)) {
            return { g: lookup.get(id), id };
        }
        if (g.parent) {
            g.parent.subGroups.push(g);
        }
        g.subGroups = []; // clear old children
        lookup.set(id, g);
        return { g, id };
    };
    // resolve just parents
    groups.forEach((g) => {
        if (g.parent) {
            g.parent = resolve(g.parent).g;
            g.parent.subGroups.push(g);
        }
    });
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(7);
/**
 * Created by sam on 04.11.2016.
 */

/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'Rank') {
    return { type: 'rank', label };
}
/**
 * a rank column
 */
class RankColumn extends __WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.setWidthImpl(50);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = RankColumn;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isBoxPlotColumn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__INumberColumn__ = __webpack_require__(2);
/**
 * Created by bikramkawan on 24/11/2016.
 */





function isBoxPlotColumn(col) {
    return typeof col.getBoxPlotData === 'function';
}
class BoxPlotColumn extends __WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        /**
         * currently active filter
         * @type {{min: number, max: number}}
         * @private
         */
        this.currentFilter = Object(__WEBPACK_IMPORTED_MODULE_4__INumberColumn__["l" /* noNumberFilter */])();
        if (desc.map) {
            this.mapping = Object(__WEBPACK_IMPORTED_MODULE_3__NumberColumn__["c" /* createMappingFunction */])(desc.map);
        }
        else if (desc.domain) {
            this.mapping = new __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["a" /* ScaleMappingFunction */](desc.domain, 'linear', desc.range || [0, 1]);
        }
        this.original = this.mapping.clone();
        this.sort = desc.sort || __WEBPACK_IMPORTED_MODULE_4__INumberColumn__["d" /* SORT_METHOD */].min;
    }
    compare(a, b, aIndex, bIndex) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__INumberColumn__["e" /* compareBoxPlot */])(this, a, b, aIndex, bIndex);
    }
    getBoxPlotData(row, index) {
        return this.getValue(row, index);
    }
    getRange() {
        return this.mapping.getRange(BoxPlotColumn.DEFAULT_FORMATTER);
    }
    getRawBoxPlotData(row, index) {
        return this.getRawValue(row, index);
    }
    getRawValue(row, index) {
        return super.getValue(row, index);
    }
    getValue(row, index) {
        const v = this.getRawValue(row, index);
        if (v === null) {
            return v;
        }
        return {
            min: this.mapping.apply(v.min),
            max: this.mapping.apply(v.max),
            median: this.mapping.apply(v.median),
            q1: this.mapping.apply(v.q1),
            q3: this.mapping.apply(v.q3)
        };
    }
    getNumber(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__INumberColumn__["f" /* getBoxPlotNumber */])(this, row, index, 'normalized');
    }
    getRawNumber(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__INumberColumn__["f" /* getBoxPlotNumber */])(this, row, index, 'raw');
    }
    getLabel(row, index) {
        const v = this.getRawValue(row, index);
        if (v === null) {
            return '';
        }
        const f = BoxPlotColumn.DEFAULT_FORMATTER;
        return `BoxPlot(min = ${f(v.min)}, q1 = ${f(v.q1)}, median = ${f(v.median)}, q3 = ${f(v.q3)}, max = ${f(v.max)})`;
    }
    getSortMethod() {
        return this.sort;
    }
    setSortMethod(sort) {
        if (this.sort === sort) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED], this.sort, this.sort = sort);
        // sort by me if not already sorted by me
        if (!this.isSortedByMe().asc) {
            this.sortByMe();
        }
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.sortMethod = this.getSortMethod();
        r.filter = !Object(__WEBPACK_IMPORTED_MODULE_4__INumberColumn__["j" /* isSameFilter */])(this.currentFilter, Object(__WEBPACK_IMPORTED_MODULE_4__INumberColumn__["l" /* noNumberFilter */])()) ? this.currentFilter : null;
        r.map = this.mapping.dump();
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if (dump.sortMethod) {
            this.sort = dump.sortMethod;
        }
        if (dump.filter) {
            this.currentFilter = Object(__WEBPACK_IMPORTED_MODULE_4__INumberColumn__["n" /* restoreFilter */])(dump.filter);
        }
        if (dump.map) {
            this.mapping = Object(__WEBPACK_IMPORTED_MODULE_3__NumberColumn__["c" /* createMappingFunction */])(dump.map);
        }
        else if (dump.domain) {
            this.mapping = new __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["a" /* ScaleMappingFunction */](dump.domain, 'linear', dump.range || [0, 1]);
        }
    }
    createEventList() {
        return super.createEventList().concat([__WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].EVENT_MAPPING_CHANGED]);
    }
    getOriginalMapping() {
        return this.original.clone();
    }
    getMapping() {
        return this.mapping.clone();
    }
    setMapping(mapping) {
        if (this.mapping.eq(mapping)) {
            return;
        }
        this.fire([BoxPlotColumn.EVENT_MAPPING_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.mapping.clone(), this.mapping = mapping);
    }
    isFiltered() {
        return __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.isFiltered.call(this);
    }
    getFilter() {
        return __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.getFilter.call(this);
    }
    setFilter(value = { min: -Infinity, max: +Infinity, filterMissing: false }) {
        __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.setFilter.call(this, value);
    }
    filter(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.filter.call(this, row, index);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoxPlotColumn;

BoxPlotColumn.EVENT_MAPPING_CHANGED = __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].EVENT_MAPPING_CHANGED;
BoxPlotColumn.DEFAULT_FORMATTER = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["format"])('.3n');


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__INumberColumn__ = __webpack_require__(2);
/**
 * Created by sam on 04.11.2016.
 */



const DEFAULT_SCRIPT = `let s = 0;
col.forEach((c) => s += c.v);
return s / col.length`;
/**
 * factory for creating a description creating a mean column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'script') {
    return { type: 'script', label, script: DEFAULT_SCRIPT };
}
function wrapWithContext(code) {
    let clean = code.trim();
    if (!clean.includes('return')) {
        clean = `return (${clean});`;
    }
    return `
  const max = function(arr) { return Math.max.apply(Math, arr); };
  const min = function(arr) { return Math.min.apply(Math, arr); };
  const extent = function(arr) { return [min(arr), max(arr)]; };
  const clamp = function(v, minValue, maxValue) { return v < minValue ? minValue : (v > maxValue ? maxValue : v); };
  const normalize = function(v, minMax, max) {
    if (Array.isArray(minMax)) {
      minMax = minMax[0];
      max = minMax[1];
    }
    return (v - minMax) / (max - minMax);
  };
  const denormalize = function(v, minMax, max) {
    if (Array.isArray(minMax)) {
      minMax = minMax[0];
      max = minMax[1];
    }
    return v * (max - minMax) + minMax;
  };
  const linear = function(v, source, target) {
    target = target || [0, 1];
    return denormalize(normalize(v, source), target);
  };
  const v = (function custom() {
    ${clean}
  })();

  return typeof v === 'number' ? v : NaN`;
}
/**
 * wrapper class for simpler column accessing
 */
class ColumnWrapper {
    constructor(c, v, raw) {
        this.c = c;
        this.v = v;
        this.raw = raw;
    }
    get type() {
        return this.c.desc.type;
    }
    get name() {
        return this.c.getMetaData().label;
    }
    get id() {
        return this.c.id;
    }
}
/**
 * helper context for accessing columns within a scripted columns
 */
class ColumnContext {
    constructor(children, allFactory) {
        this.children = children;
        this.allFactory = allFactory;
        this.lookup = new Map();
        this._all = null;
        children.forEach((c) => {
            this.lookup.set(`ID@${c.id}`, c);
            this.lookup.set(`NAME@${c.name}`, c);
        });
    }
    /**
     * get a column by name
     * @param {string} name
     * @return {ColumnWrapper}
     */
    byName(name) {
        return this.lookup.get(`NAME@${name}`);
    }
    /**
     * get a column by id
     * @param {string} id
     * @return {ColumnWrapper}
     */
    byID(id) {
        return this.lookup.get(`ID@${id}`);
    }
    /**
     * get a column by index
     * @param {number} index
     * @return {ColumnWrapper}
     */
    byIndex(index) {
        return this.children[index];
    }
    forEach(callback) {
        return this.children.forEach(callback);
    }
    /**
     * number of columns
     * @return {number}
     */
    get length() {
        return this.children.length;
    }
    /**
     * get the all context, i.e one with all columns of this ranking
     * @return {ColumnContext}
     */
    get all() {
        if (this._all === null) {
            this._all = this.allFactory ? this.allFactory() : null;
        }
        return this._all;
    }
}
class ScriptColumn extends __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.script = ScriptColumn.DEFAULT_SCRIPT;
        this.f = null;
        this.script = desc.script || this.script;
    }
    createEventList() {
        return super.createEventList().concat([ScriptColumn.EVENT_SCRIPT_CHANGED]);
    }
    setScript(script) {
        if (this.script === script) {
            return;
        }
        this.f = null;
        this.fire([ScriptColumn.EVENT_SCRIPT_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.script, this.script = script);
    }
    getScript() {
        return this.script;
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.script = this.script;
        return r;
    }
    restore(dump, factory) {
        this.script = dump.script || this.script;
        super.restore(dump, factory);
    }
    compute(row, index) {
        if (this.f == null) {
            this.f = new Function('children', 'values', 'raws', 'col', 'row', 'index', wrapWithContext(this.script));
        }
        const children = this._children;
        const values = this._children.map((d) => d.getValue(row, index));
        const raws = this._children.map((d) => Object(__WEBPACK_IMPORTED_MODULE_2__INumberColumn__["h" /* isNumberColumn */])(d) ? d.getRawNumber(row, index) : null);
        const col = new ColumnContext(children.map((c, i) => new ColumnWrapper(c, values[i], raws[i])), () => {
            const cols = this.findMyRanker().flatColumns;
            return new ColumnContext(cols.map((c) => new ColumnWrapper(c, c.getValue(row, index), Object(__WEBPACK_IMPORTED_MODULE_2__INumberColumn__["h" /* isNumberColumn */])(c) ? c.getRawNumber(row, index) : null)));
        });
        return this.f.call(this, children, values, raws, col, row, index);
    }
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    toSortingDesc(toId) {
        return {
            code: this.script,
            operands: this._children.map((c) => c.toSortingDesc(toId))
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ScriptColumn;

ScriptColumn.EVENT_SCRIPT_CHANGED = 'scriptChanged';
ScriptColumn.DEFAULT_SCRIPT = DEFAULT_SCRIPT;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__missing__ = __webpack_require__(5);
/**
 * Created by sam on 04.11.2016.
 */



/**
 * a string column in which the label is a text but the value a link
 */
class LinkColumn extends __WEBPACK_IMPORTED_MODULE_1__StringColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        /**
         * a pattern used for generating the link, $1 is replaced with the actual value
         * @type {null}
         */
        this.link = null;
        this.link = desc.link || null;
    }
    get headerCssClass() {
        return this.link == null ? 'link' : 'link link_pattern';
    }
    createEventList() {
        return super.createEventList().concat([LinkColumn.EVENT_LINK_CHANGED]);
    }
    setLink(link) {
        /* tslint:disable */
        if (link == this.link) {
            return;
        }
        /* tslint:enable */
        this.fire([LinkColumn.EVENT_LINK_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.link, this.link = link);
    }
    getLink() {
        return this.link || '';
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        /* tslint:disable */
        if (this.link != this.desc.link) {
            r.link = this.link;
        }
        /* tslint:enable */
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if (dump.link) {
            this.link = dump.link;
        }
    }
    getLabel(row, index) {
        const v = super.getRaw(row, index);
        if (v && v.alt) {
            return v.alt;
        }
        return String(v);
    }
    isLink(row, index) {
        //get original value
        const v = super.getRaw(row, index);
        //convert to link
        return !Object(__WEBPACK_IMPORTED_MODULE_2__missing__["b" /* isMissingValue */])(v) && (v.href != null || this.link);
    }
    getValue(row, index) {
        //get original value
        const v = super.getRaw(row, index);
        //convert to link
        if (v && v.href) {
            return v.href;
        }
        if (this.link) {
            return this.link.replace(/\$1/g, v || '');
        }
        return v;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LinkColumn;

LinkColumn.EVENT_LINK_CHANGED = 'linkChanged';


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);

/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'A') {
    return { type: 'aggregate', label };
}
/**
 * a checkbox column for selections
 */
class AggregateGroupColumn extends __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.setWidth(20);
    }
    createEventList() {
        return super.createEventList().concat([AggregateGroupColumn.EVENT_AGGREGATE]);
    }
    isAggregated(group) {
        const ranking = this.findMyRanker();
        if (this.desc.isAggregated) {
            return this.desc.isAggregated(ranking, group);
        }
        return false;
    }
    setAggregated(group, value) {
        const ranking = this.findMyRanker();
        const current = (this.desc.isAggregated) && this.desc.isAggregated(ranking, group);
        if (current === value) {
            return true;
        }
        if (this.desc.setAggregated) {
            this.desc.setAggregated(ranking, group, value);
        }
        this.fire(AggregateGroupColumn.EVENT_AGGREGATE, ranking, group, value);
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = AggregateGroupColumn;

AggregateGroupColumn.EVENT_AGGREGATE = 'aggregate';


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__ = __webpack_require__(10);
/**
 * Created by Samuel Gratzl on 17.11.2017.
 */




/**
 *  factory for creating a description creating a max column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'Imposition') {
    return { type: 'imposition', label };
}
/**
 * implementation of a combine column, standard operations how to select
 */
class ImpositionCompositeColumn extends __WEBPACK_IMPORTED_MODULE_0__CompositeColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.setDefaultRenderer('number');
        this.setDefaultGroupRenderer('boxplot');
    }
    getLabel(row, index) {
        const c = this._children;
        if (c.length === 0) {
            return '';
        }
        if (c.length === 1) {
            return c[0].getLabel(row, index);
        }
        return `${c[0].getLabel(row, index)} (${c.slice(1).map((c) => `${c.label} = ${c.getLabel(row, index)}`)})`;
    }
    getValue(row, index) {
        const c = this._children;
        return c.length === 0 ? NaN : c[0].getValue(row, index);
    }
    getColor(row, index) {
        const c = this._children;
        return c.length < 2 ? this.color : c[1].getColor(row, index);
    }
    getNumber(row, index) {
        const r = this.getValue(row, index);
        return r === null ? NaN : r;
    }
    getRawNumber(row, index) {
        return this.getNumber(row, index);
    }
    isMissing(row, index) {
        return this._children.length === 0 || this._children[0].isMissing(row, index);
    }
    compare(a, b, aIndex, bIndex) {
        return __WEBPACK_IMPORTED_MODULE_1__NumberColumn__["d" /* default */].prototype.compare.call(this, a, b, aIndex, bIndex);
    }
    groupCompare(a, b) {
        return __WEBPACK_IMPORTED_MODULE_1__NumberColumn__["d" /* default */].prototype.groupCompare.call(this, a, b);
    }
    insert(col, index) {
        if (this._children.length === 0 && !Object(__WEBPACK_IMPORTED_MODULE_2__INumberColumn__["h" /* isNumberColumn */])(col)) {
            return null;
        }
        if (this._children.length === 1 && !Object(__WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["b" /* isCategoricalColumn */])(col)) {
            return null;
        }
        if (this._children.length >= 2) {
            // limit to two
            return null;
        }
        return super.insert(col, index);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ImpositionCompositeColumn;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missing__ = __webpack_require__(4);


/**
 * default renderer instance rendering the value as a text
 */
class DefaultCellRenderer {
    /**
     * @param textClass {string} class to append to the text elements
     * @param align {string} the text alignment: left, center, right
     */
    constructor(textClass = 'text', align = 'left') {
        this.textClass = textClass;
        this.align = align;
        this.title = 'String';
    }
    canRender(_col) {
        return true;
    }
    createDOM(col) {
        return {
            template: `<div class="${this.textClass} ${this.align}"> </div>`,
            update: (n, d) => {
                Object(__WEBPACK_IMPORTED_MODULE_1__missing__["b" /* renderMissingDOM */])(n, col, d);
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["r" /* setText */])(n, col.getLabel(d.v, d.dataIndex));
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_1__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            const bak = ctx.textAlign;
            ctx.textAlign = this.align;
            const w = context.colWidth(col);
            let shift = 0;
            if (this.align === 'center') {
                shift = w / 2;
            }
            else if (this.align === 'right') {
                shift = w;
            }
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), shift, 0, w, context.textHints);
            ctx.textAlign = bak;
        };
    }
    static exampleText(col, rows) {
        const numExampleRows = 5;
        let examples = rows
            .slice(0, numExampleRows)
            .map((r) => col.getLabel(r.v, r.dataIndex))
            .join(', ');
        if (rows.length > numExampleRows) {
            examples += ', &hellip;';
        }
        return examples;
    }
    createGroupDOM(col) {
        return {
            template: `<div class="${this.textClass} ${this.align}"> </div>`,
            update: (n, group, rows) => {
                n.innerHTML = `
            ${group.name} (${rows.length})
            <div>${DefaultCellRenderer.exampleText(col, rows)}</div>
        `;
            }
        };
    }
    createGroupCanvas(col, context) {
        const w = context.colWidth(col);
        return (ctx, group, rows) => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* clipText */])(ctx, `${group.name} (${rows.length})`, 0, 2, w, context.textHints);
            const bak = ctx.font;
            ctx.font = '8pt "Helvetica Neue", Helvetica, Arial, sans-serif';
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* clipText */])(ctx, DefaultCellRenderer.exampleText(col, rows), 0, 2 + 12, w, context.textHints);
            ctx.font = bak;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultCellRenderer;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ERenderReason */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_ADataProvider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__interfaces__ = __webpack_require__(44);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */







var ERenderReason;
(function (ERenderReason) {
    ERenderReason[ERenderReason["DIRTY"] = 0] = "DIRTY";
    ERenderReason[ERenderReason["SCROLLED"] = 1] = "SCROLLED";
})(ERenderReason || (ERenderReason = {}));
class ABodyRenderer extends __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* AEventDispatcher */] {
    constructor(data, parent, slicer, root, options = {}) {
        super();
        this.data = data;
        this.slicer = slicer;
        this.options = Object(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* defaultConfig */])().body;
        this.histCache = new Map();
        //merge options
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["p" /* merge */])(this.options, options);
        this.$node = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](parent).append(root).classed('lu-body', true);
        this.changeDataStorage(data);
    }
    createEventList() {
        return super.createEventList().concat([ABodyRenderer.EVENT_HOVER_CHANGED, ABodyRenderer.EVENT_RENDER_FINISHED]);
    }
    get node() {
        return this.$node.node();
    }
    setOption(key, value) {
        this.options[key] = value;
    }
    changeDataStorage(data) {
        if (this.data) {
            this.data.on([`${__WEBPACK_IMPORTED_MODULE_4__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_VALUES}.bodyRenderer`, `${__WEBPACK_IMPORTED_MODULE_4__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.bodyRenderer`], null);
        }
        this.data = data;
        data.on(`${__WEBPACK_IMPORTED_MODULE_4__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_VALUES}.bodyRenderer`, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* debounce */])(this.update.bind(this), 1));
        data.on(`${__WEBPACK_IMPORTED_MODULE_4__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.bodyRenderer`, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* debounce */])(this.drawSelection.bind(this), 1));
    }
    showMeanLine(col) {
        //show mean line if option is enabled and top level
        return this.options.meanLine && Object(__WEBPACK_IMPORTED_MODULE_2__model__["isNumberColumn"])(col) && col.parent instanceof __WEBPACK_IMPORTED_MODULE_2__model__["Ranking"];
    }
    fireFinished() {
        this.fire(ABodyRenderer.EVENT_RENDER_FINISHED, this);
    }
    createContext(indexShift, totalNumberOfRows, creator, groupCreator) {
        const options = this.options;
        return {
            cellY: (index) => (index + indexShift) * (this.options.rowHeight),
            cellPrevY: (index) => (index + indexShift) * (this.options.rowHeight),
            idPrefix: options.idPrefix,
            totalNumberOfRows,
            option: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["k" /* findOption */])(options),
            renderer(col) {
                return creator(col, options.renderers, this);
            },
            groupRenderer(col) {
                return groupCreator(col, options.renderers, this);
            }
        };
    }
    select(dataIndex, additional = false) {
        return this.data.toggleSelection(dataIndex, additional);
    }
    fakeHover(dataIndex) {
        this.mouseOver(dataIndex, true);
    }
    mouseOver(dataIndex, hover = true) {
        this.fire(ABodyRenderer.EVENT_HOVER_CHANGED, hover ? dataIndex : -1);
    }
    scrolled() {
        return this.update(ERenderReason.SCROLLED);
    }
    showAggregatedGroup(ranking, group) {
        return this.data.isAggregated(ranking, group);
    }
    resolveHistMap(ranking) {
        return Promise.all(ranking.columns.map((col) => Promise.resolve(this.histCache.get(col.column.id)))).then((hists) => {
            const m = new Map();
            hists.forEach((hist, i) => {
                if (hist) {
                    m.set(ranking.columns[i].column.id, hist);
                }
            });
            return m;
        });
    }
    /**
     * render the body
     */
    update(reason = ERenderReason.DIRTY) {
        const rankings = this.data.getRankings();
        const singleGroup = rankings.every((d) => d.getGroups().length <= 1);
        const height = __WEBPACK_IMPORTED_MODULE_0_d3__["max"](rankings, (d) => __WEBPACK_IMPORTED_MODULE_0_d3__["sum"](d.getGroups(), (g) => this.showAggregatedGroup(d, g) ? this.options.groupHeight : this.options.rowHeight * g.order.length)) || 0;
        //TODO slicing doesn't work for multiple groups
        const totalNumberOfRows = __WEBPACK_IMPORTED_MODULE_0_d3__["max"](rankings, (d) => __WEBPACK_IMPORTED_MODULE_0_d3__["sum"](d.getGroups(), (g) => g.order.length));
        const visibleRange = singleGroup ? this.slicer(0, totalNumberOfRows, (i) => i * this.options.rowHeight) : { from: 0, to: +Infinity };
        const orderSlicer = (order) => {
            if (visibleRange.from === 0 && order.length <= visibleRange.to) {
                return order;
            }
            return order.slice(visibleRange.from, Math.min(order.length, visibleRange.to));
        };
        const context = this.createContextImpl(visibleRange.from, totalNumberOfRows);
        //ranking1:group1, ranking1:group2, ranking2:group1, ...
        const orders = [].concat(...rankings.map((r) => r.getGroups().map((group) => orderSlicer(group.order))));
        let flatOffset = 0;
        const data = this.data.fetch(orders);
        const padding = this.options.columnPadding;
        let totalWidth = 0;
        const rdata = rankings.map((r) => {
            const cols = r.children.filter((d) => !d.isHidden());
            const rankingShift = totalWidth;
            let width = 0;
            const colData = cols.map((o) => {
                const colShift = width;
                width += o.getWidth() + padding;
                if (Object(__WEBPACK_IMPORTED_MODULE_3__model_CompositeColumn__["b" /* isMultiLevelColumn */])(o) && !o.getCollapsed()) {
                    width += padding * (o.length - 1);
                }
                return {
                    column: o,
                    renderer: context.renderer(o),
                    groupRenderer: context.groupRenderer(o),
                    shift: colShift
                };
            });
            totalWidth += width;
            totalWidth += this.options.slopeWidth;
            const frozen = colData.slice(0, this.options.freezeCols);
            const currentOffset = flatOffset;
            flatOffset += r.getGroups().length;
            let acc = 0;
            const groups = r.getGroups().map((group, i) => {
                const aggregate = this.showAggregatedGroup(r, group);
                const order = orders[currentOffset + i];
                const y = acc, height = aggregate ? this.options.groupHeight : this.options.rowHeight * order.length;
                acc += height;
                return {
                    group,
                    order,
                    data: data[currentOffset + i],
                    aggregate,
                    y,
                    height
                };
            });
            return {
                id: r.id,
                ranking: r,
                shift: rankingShift,
                width,
                //compute frozen columns just for the first one
                frozen,
                frozenWidth: Math.max(...(frozen.map((d) => d.shift + d.column.getWidth()))),
                columns: colData.slice(this.options.freezeCols),
                groups,
                height: __WEBPACK_IMPORTED_MODULE_0_d3__["sum"](groups, (d) => d.height)
            };
        });
        //one to often
        totalWidth -= this.options.slopeWidth;
        return this.updateImpl(rdata, context, totalWidth, height, reason).then(this.fireFinished.bind(this));
    }
}
ABodyRenderer.EVENT_HOVER_CHANGED = __WEBPACK_IMPORTED_MODULE_6__interfaces__["a" /* RENDERER_EVENT_HOVER_CHANGED */];
ABodyRenderer.EVENT_RENDER_FINISHED = __WEBPACK_IMPORTED_MODULE_6__interfaces__["b" /* RENDERER_EVENT_RENDER_FINISHED */];
/* harmony default export */ __webpack_exports__["a"] = (ABodyRenderer);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IMixin__ = __webpack_require__(60);
/* unused harmony reexport IMixin */
/* unused harmony reexport IMixinAdapter */
/* unused harmony reexport IMixinClass */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__IMixin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PrefetchMixin__ = __webpack_require__(61);
/* unused harmony reexport PrefetchMixin */
/**
 * Created by Samuel Gratzl on 19.07.2017.
 */




/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = dummyRankingButtonHook;
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialogs__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_engine_summary__ = __webpack_require__(121);




function dummyRankingButtonHook() {
    return null;
}
function defaultConfig() {
    const idPrefix = `lu${Math.random().toString(36).slice(-8).substr(0, 3)}`; //generate a random string with length3;
    const renderers = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__renderer__["renderers"]);
    return {
        idPrefix,
        header: {
            idPrefix,
            slopeWidth: 150,
            columnPadding: 5,
            headerHistogramHeight: 40,
            headerHeight: 20,
            manipulative: true,
            summary: false,
            filters: Object.assign({}, __WEBPACK_IMPORTED_MODULE_1__dialogs__["a" /* filters */]),
            summaries: Object.assign({}, __WEBPACK_IMPORTED_MODULE_3__ui_engine_summary__["a" /* defaultSummaries */]),
            linkTemplates: [],
            searchAble: (col) => col instanceof __WEBPACK_IMPORTED_MODULE_2__model_StringColumn__["a" /* default */],
            sortOnLabel: true,
            autoRotateLabels: false,
            rotationHeight: 50,
            rotationDegree: -20,
            freezeCols: 0,
            rankingButtons: dummyRankingButtonHook
        },
        renderingOptions: {
            stacked: true,
            animation: true,
            summary: false,
            meanLine: false,
            histograms: false
        },
        body: {
            renderer: 'svg',
            visibleRowsOnly: true,
            backupScrollRows: 5,
            rowHeight: 16,
            groupHeight: 70,
            groupPadding: 5,
            rowPadding: 2,
            columnPadding: 5,
            textHeight: 13,
            rowBarPadding: 1,
            rowBarTopPadding: 1,
            rowBarBottomPadding: 1,
            idPrefix: '',
            slopeWidth: 150,
            stacked: true,
            animation: false,
            animationDuration: 1000,
            renderers,
            meanLine: false,
            actions: [],
            freezeCols: 0
        },
        manipulative: true,
        pool: false,
        renderers
    };
}


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MultiLevelCompositeColumn__ = __webpack_require__(70);
/**
 * Created by sam on 04.11.2016.
 */

/**
 * factory for creating a description creating a mean column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'Nested') {
    return { type: 'nested', label };
}
/**
 * a nested column is a composite column where the sorting order is determined by the nested ordering of the children
 * i.e., sort by the first child if equal sort by the second child,...
 */
class NestedColumn extends __WEBPACK_IMPORTED_MODULE_0__MultiLevelCompositeColumn__["a" /* default */] {
    compare(a, b, aIndex, bIndex) {
        const c = this.children;
        for (const ci of c) {
            const ciResult = ci.compare(a, b, aIndex, bIndex);
            if (ciResult !== 0) {
                return ciResult;
            }
        }
        return 0;
    }
    getLabel(row, index) {
        return this.children.map((d) => d.getLabel(row, index)).join(';');
    }
    getValue(row, index) {
        return this.children.map((d) => d.getValue(row, index)).join(';');
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = NestedColumn;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/**
 * Created by sam on 04.11.2016.
 */

/**
 * utility for creating an action description with optional label
 * @param label
 * @param actions
 * @param groupActions
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'actions', actions = [], groupActions = []) {
    return { type: 'actions', label, actions, groupActions };
}
/**
 * a default column with no values
 */
class ActionColumn extends __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.actions = desc.actions || [];
        this.groupActions = desc.groupActions || [];
    }
    getLabel() {
        return '';
    }
    getValue() {
        return '';
    }
    compare() {
        return 0; //can't compare
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ActionColumn;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = resolveInnerNodes;
/* unused harmony export isHierarchical */
/* unused harmony export deriveHierarchy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__missing__ = __webpack_require__(5);
/**
 * Created by Samuel Gratzl on 28.06.2017.
 */





/**
 * column for hierarchical categorical values
 */
class HierarchyColumn extends __WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.currentMaxDepth = Infinity;
        this.currentLeaves = [];
        this.currentLeavesNameCache = new Map();
        this.currentLeavesPathCache = new Map();
        /**
         * split multiple categories
         * @type {string}
         */
        this.separator = ';';
        this.separator = desc.separator || this.separator;
        this.hierarchySeparator = desc.hierarchySeparator || '.';
        this.hierarchy = this.initHierarchy(desc.hierarchy);
        this.currentNode = this.hierarchy;
        this.currentLeaves = computeLeaves(this.currentNode, this.currentMaxDepth);
        this.updateCaches();
        this.setDefaultRenderer('categorical');
    }
    initHierarchy(root) {
        const colors = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].category10().range().slice();
        const s = this.hierarchySeparator;
        const add = (prefix, node) => {
            const name = node.name === undefined ? node.value : node.name;
            let lastColorUsed = -1;
            const children = (node.children || []).map((child) => {
                if (typeof child === 'string') {
                    const path = prefix + child;
                    return {
                        path,
                        name: child,
                        label: path,
                        color: colors[(lastColorUsed++) % colors.length],
                        children: []
                    };
                }
                const r = add(`${prefix}${name}${s}`, child);
                if (!r.color) {
                    //hack to inject the next color
                    r.color = colors[(lastColorUsed++) % colors.length];
                }
                return r;
            });
            const path = prefix + name;
            const label = node.label ? `${node.label}` : path;
            return { path, name, children, label, color: node.color };
        };
        return add('', root);
    }
    createEventList() {
        return super.createEventList().concat([HierarchyColumn.EVENT_CUTOFF_CHANGED]);
    }
    get categories() {
        return this.currentLeaves.map((c) => c.name);
    }
    get categoryLabels() {
        return this.currentLeaves.map((c) => c.label);
    }
    get categoryColors() {
        return this.currentLeaves.map((c) => c.color);
    }
    getCutOff() {
        return {
            node: this.currentNode,
            maxDepth: this.currentMaxDepth
        };
    }
    setCutOff(node, maxDepth = Infinity) {
        if (this.currentNode === node && this.currentMaxDepth === maxDepth) {
            return;
        }
        const bak = this.getCutOff();
        this.currentNode = node;
        this.currentMaxDepth = maxDepth;
        this.currentLeaves = computeLeaves(node, maxDepth);
        this.updateCaches();
        this.fire([HierarchyColumn.EVENT_CUTOFF_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getCutOff());
    }
    resolveCategories(row, index) {
        const base = __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */].prototype.getValue.call(this, row, index);
        if (base === null || base === '') {
            return [];
        }
        return base.split(this.separator).map((v) => {
            v = v.trim();
            if (this.currentLeavesNameCache.has(v)) {
                return this.currentLeavesNameCache.get(v);
            }
            if (this.currentLeavesPathCache.has(v)) {
                return this.currentLeavesPathCache.get(v);
            }
            return this.currentLeaves.find((n) => {
                //direct hit or is a child of it
                return n.path === v || n.name === v || v.startsWith(n.path + this.hierarchySeparator);
            });
        }).filter((v) => Boolean(v));
    }
    resolveCategory(row, index) {
        const base = this.resolveCategories(row, index);
        return base.length > 0 ? base[0] : null;
    }
    getValue(row, index) {
        const base = this.getValues(row, index);
        return base.length > 0 ? base[0] : null;
    }
    getValues(row, index) {
        const base = this.resolveCategories(row, index);
        return base.map((d) => d.name);
    }
    getLabel(row, index) {
        return this.getLabels(row, index).join(this.separator);
    }
    getLabels(row, index) {
        const base = this.resolveCategories(row, index);
        return base.map((d) => d.label);
    }
    getFirstLabel(row, index) {
        const l = this.getLabels(row, index);
        return l.length > 0 ? l[0] : null;
    }
    getCategories(row, index) {
        return this.getValues(row, index);
    }
    getColor(row, index) {
        const base = this.resolveCategory(row, index);
        return base ? base.color : null;
    }
    compare(a, b, aIndex, bIndex) {
        const va = this.resolveCategories(a, aIndex);
        const vb = this.resolveCategories(b, bIndex);
        if (va.length === 0) {
            // missing
            return vb.length === 0 ? 0 : __WEBPACK_IMPORTED_MODULE_4__missing__["a" /* FIRST_IS_NAN */];
        }
        if (vb.length === 0) {
            return __WEBPACK_IMPORTED_MODULE_4__missing__["a" /* FIRST_IS_NAN */] * -1;
        }
        //check all categories
        for (let i = 0; i < Math.min(va.length, vb.length); ++i) {
            const ci = va[i].path.localeCompare(vb[i].path);
            if (ci !== 0) {
                return ci;
            }
        }
        //smaller length wins
        return va.length - vb.length;
    }
    group(row, index) {
        const base = this.resolveCategory(row, index);
        if (!base) {
            return super.group(row, index);
        }
        return { name: base.name, color: base.color };
    }
    updateCaches() {
        this.currentLeavesPathCache.clear();
        this.currentLeavesNameCache.clear();
        this.currentLeaves.forEach((n) => {
            this.currentLeavesPathCache.set(n.path, n);
            this.currentLeavesNameCache.set(n.name, n);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HierarchyColumn;

HierarchyColumn.EVENT_CUTOFF_CHANGED = 'cutOffChanged';
function computeLeaves(node, maxDepth = Infinity) {
    const leaves = [];
    //depth first
    const visit = (node, depth) => {
        //hit or end
        if (depth >= maxDepth || node.children.length === 0) {
            leaves.push(node);
        }
        else {
            // go down
            node.children.forEach((c) => visit(c, depth + 1));
        }
    };
    visit(node, 0);
    return leaves;
}
function resolveInnerNodes(node) {
    //breath first
    const queue = [node];
    let index = 0;
    while (index < queue.length) {
        const next = queue[index++];
        queue.push(...next.children);
    }
    return queue;
}
function isHierarchical(categories) {
    if (categories.length === 0 || typeof categories[0] === 'string') {
        return false;
    }
    // check if any has a given parent name
    return categories.some((c) => c.parent != null);
}
function deriveHierarchy(categories) {
    const lookup = new Map();
    categories.forEach((c) => {
        const p = c.parent || '';
        // set and fill up proxy
        const item = Object.assign({ children: [] }, lookup.get(c.name) || {}, c);
        lookup.set(c.name, item);
        if (!lookup.has(p)) {
            // create proxy
            lookup.set(p, { name: p, children: [] });
        }
        lookup.get(p).children.push(item);
    });
    const root = lookup.get('');
    console.assert(root !== undefined, 'hierarchy with no root');
    if (root.children.length === 1) {
        return root.children[0];
    }
    return root;
}


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getNumberOfBins;
/* harmony export (immutable) */ __webpack_exports__["b"] = computeStats;
/* harmony export (immutable) */ __webpack_exports__["a"] = computeHist;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/**
 * Created by Samuel Gratzl on 10.08.2017.
 */

function getNumberOfBins(length) {
    // as by default used in d3 the Sturges' formula
    return Math.ceil(Math.log(length) / Math.LN2) + 1;
}
/**
 * computes the simple statistics of an array using d3 histogram
 * @param arr the data array
 * @param indices array data indices
 * @param acc accessor function
 * @param missing accessor if the value is missing
 * @param range the total value range
 * @param bins the number of bins
 * @returns {{min: number, max: number, count: number, hist: histogram.Bin<number>[]}}
 */
function computeStats(arr, indices, acc, missing, range, bins) {
    if (arr.length === 0) {
        return {
            min: NaN,
            max: NaN,
            mean: NaN,
            count: 0,
            maxBin: 0,
            hist: [],
            missing: 0
        };
    }
    let missingCount = 0;
    const vs = arr.map((a, i) => {
        if (missing(a, indices[i])) {
            return NaN;
        }
        return acc(a, indices[i]);
    }).reduce((acc, act) => {
        if (isNaN(act)) {
            missingCount++;
        }
        else {
            acc.push(act);
        }
        return acc;
    }, []);
    const hist = __WEBPACK_IMPORTED_MODULE_0_d3__["layout"].histogram();
    if (range) {
        hist.range(() => range);
    }
    if (bins) {
        hist.bins(bins);
    }
    else {
        hist.bins(getNumberOfBins(arr.length));
    }
    const ex = __WEBPACK_IMPORTED_MODULE_0_d3__["extent"](vs);
    const histData = hist(vs);
    return {
        min: ex[0],
        max: ex[1],
        mean: __WEBPACK_IMPORTED_MODULE_0_d3__["mean"](vs),
        count: arr.length,
        maxBin: Math.max(...histData.map((d) => d.y)),
        hist: histData,
        missing: missingCount
    };
}
/**
 * computes a categorical histogram
 * @param arr the data array
 * @param indices the data array data indices
 * @param acc the accessor
 * @param categories the list of known categories
 * @returns {{hist: {cat: string, y: number}[]}}
 */
function computeHist(arr, indices, acc, categories) {
    const m = new Map();
    let missingCount = 0;
    categories.forEach((cat) => m.set(cat, 0));
    arr.forEach((a, i) => {
        const vs = acc(a, indices[i]);
        if (vs == null || vs.length === 0) {
            missingCount += 1;
            return;
        }
        vs.forEach((v) => {
            m.set(v, (m.get(v) || 0) + 1);
        });
    });
    const entries = [];
    m.forEach((v, k) => entries.push({ cat: k, y: v }));
    return {
        maxBin: Math.max(...entries.map((d) => d.y)),
        hist: entries,
        missing: missingCount
    };
}


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * helper class that renders nothing for a group
 */
class ANoGroupRenderer {
    createGroupDOM() {
        return {
            template: ``,
            update: () => undefined
        };
    }
    createGroupCanvas() {
        return () => undefined;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ANoGroupRenderer;

/* unused harmony default export */ var _unused_webpack_default_export = (ANoGroupRenderer);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = gridClass;
/* harmony export (immutable) */ __webpack_exports__["a"] = createData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AAggregatedGroupRenderer__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lineupengine_src_style__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_INumberColumn__ = __webpack_require__(2);






function gridClass(column) {
    return `lu-stacked-${column.id}`;
}
function createData(col, context, nestingPossible, imposer) {
    const stacked = nestingPossible && context.option('stacked', true);
    const padding = context.option('columnPadding', 0);
    let offset = 0;
    const cols = col.children.map((d) => {
        const shift = offset;
        const width = d.getWidth();
        offset += width;
        offset += (!stacked ? padding : 0);
        return {
            column: d,
            shift,
            width,
            renderer: context.renderer(d, imposer),
            groupRenderer: context.groupRenderer(d, imposer)
        };
    });
    return { cols, stacked, padding };
}
/**
 * renders a stacked column using composite pattern
 */
class MultiLevelCellRenderer extends __WEBPACK_IMPORTED_MODULE_1__AAggregatedGroupRenderer__["a" /* AAggregatedGroupRenderer */] {
    constructor(nestingPossible = true) {
        super();
        this.nestingPossible = nestingPossible;
        this.title = this.nestingPossible ? 'Stacked Bar' : 'Nested';
    }
    canRender(col) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__model_CompositeColumn__["b" /* isMultiLevelColumn */])(col);
    }
    createDOM(col, context, imposer) {
        const { cols, stacked, padding } = createData(col, context, this.nestingPossible, imposer);
        const useGrid = context.option('useGridLayout', false);
        return {
            template: `<div class='${col.desc.type} component${context.option('stackLevel', 0)} ${useGrid ? gridClass(col) : ''}${useGrid && !stacked ? ' lu-grid-space' : ''}'>${cols.map((d) => d.renderer.template).join('')}</div>`,
            update: (n, d, i, group) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_4__missing__["b" /* renderMissingDOM */])(n, col, d)) {
                    return;
                }
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* matchColumns */])(n, cols, 'detail', 'html');
                const children = Array.from(n.children);
                const total = col.getWidth();
                let missingWeight = 0;
                cols.forEach((col, ci) => {
                    const weight = col.column.getWidth() / total;
                    const cnode = children[ci];
                    cnode.style.transform = stacked ? `translate(-${Object(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* round */])((missingWeight / weight) * 100, 4)}%,0)` : null;
                    if (!useGrid) {
                        cnode.style.width = `${Object(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* round */])(weight * 100, 2)}%`;
                        cnode.style.marginRight = stacked ? null : `${padding}px`;
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_3_lineupengine_src_style__["b" /* isEdge */]) {
                        cnode.style.msGridColumn = (ci + 1).toString();
                    }
                    else {
                        cnode.style.gridColumnStart = (ci + 1).toString();
                    }
                    col.renderer.update(cnode, d, i, group);
                    if (stacked) {
                        missingWeight += (1 - col.column.getValue(d.v, d.dataIndex)) * weight;
                    }
                });
            }
        };
    }
    createCanvas(col, context, imposer) {
        const { cols, stacked } = createData(col, context, this.nestingPossible, imposer);
        return (ctx, d, i, dx, dy, group) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            let stackShift = 0;
            cols.forEach((col) => {
                const shift = col.shift - stackShift;
                ctx.translate(shift, 0);
                col.renderer(ctx, d, i, dx + shift, dy, group);
                ctx.translate(-shift, 0);
                if (stacked) {
                    stackShift += col.width * (1 - col.column.getValue(d.v, d.dataIndex));
                }
            });
        };
    }
    createGroupDOM(col, context, imposer) {
        if (this.nestingPossible && Object(__WEBPACK_IMPORTED_MODULE_5__model_INumberColumn__["h" /* isNumberColumn */])(col)) {
            return super.createGroupDOM(col, context, imposer);
        }
        const { cols, padding } = createData(col, context, false, imposer);
        const useGrid = context.option('useGridLayout', false);
        return {
            template: `<div class='${col.desc.type} component${context.option('stackLevel', 0)} ${useGrid ? gridClass(col) : ''}${useGrid ? ' lu-grid-space' : ''}'>${cols.map((d) => d.groupRenderer.template).join('')}</div>`,
            update: (n, group, rows) => {
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* matchColumns */])(n, cols, 'detail', 'html');
                const children = Array.from(n.children);
                const total = col.getWidth();
                cols.forEach((col, ci) => {
                    const weight = col.column.getWidth() / total;
                    const cnode = children[ci];
                    if (!useGrid) {
                        cnode.style.width = `${Object(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* round */])(weight * 100, 2)}%`;
                        cnode.style.marginRight = `${padding}px`;
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_3_lineupengine_src_style__["b" /* isEdge */]) {
                        cnode.style.msGridColumn = (ci + 1).toString();
                    }
                    else {
                        cnode.style.gridColumnStart = (ci + 1).toString();
                    }
                    col.groupRenderer.update(cnode, group, rows);
                });
            }
        };
    }
    createGroupCanvas(col, context, imposer) {
        if (this.nestingPossible && Object(__WEBPACK_IMPORTED_MODULE_5__model_INumberColumn__["h" /* isNumberColumn */])(col)) {
            return super.createGroupCanvas(col, context, imposer);
        }
        const { cols } = createData(col, context, false, imposer);
        return (ctx, group, rows, dx, dy) => {
            cols.forEach((col) => {
                const shift = col.shift;
                ctx.translate(shift, 0);
                col.groupRenderer(ctx, group, rows, dx + shift, dy, group);
                ctx.translate(-shift, 0);
            });
        };
    }
    aggregatedIndex(rows, col) {
        console.assert(Object(__WEBPACK_IMPORTED_MODULE_5__model_INumberColumn__["h" /* isNumberColumn */])(col));
        return Object(__WEBPACK_IMPORTED_MODULE_5__model_INumberColumn__["k" /* medianIndex */])(rows, col);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MultiLevelCellRenderer;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IColumn__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IColumn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__IColumn__);
/* unused harmony reexport IColumn */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GridStyleManager__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__GridStyleManager__["a"]; });
/* unused harmony reexport setColumn */
/* unused harmony reexport TEMPLATE */
/* unused harmony reexport setTemplate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StyleManager__ = __webpack_require__(56);
/* unused harmony reexport StyleManager */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__StyleManager__["b"]; });
/**
 * Created by Samuel Gratzl on 26.09.2017.
 */





/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setTemplate */
/* harmony export (immutable) */ __webpack_exports__["b"] = setColumn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StyleManager__ = __webpack_require__(56);
/**
 * Created by Samuel Gratzl on 13.07.2017.
 */

const TEMPLATE = `
  <header>
    <article></article>
  </header>
  <main>
    <article></article>
  </main>`;
/* unused harmony export TEMPLATE */

function setTemplate(root) {
    root.innerHTML = TEMPLATE;
    return root;
}
/**
 * sets the needed grid columns settings such that the given node is aligned with the given column
 * @param {HTMLElement} node the column node
 * @param {{index: number; id: string}} column the column meta data
 */
function setColumn(node, column) {
    if (__WEBPACK_IMPORTED_MODULE_0__StyleManager__["b" /* isEdge */]) {
        node.style.msGridColumn = column.index + 1;
    }
    else {
        node.style.gridColumnStart = column.id;
    }
    node.dataset.id = column.id;
}
/**
 * utility for custom generated CSS rules with a focus on dynamically generated grid layouts
 */
class GridStyleManager extends __WEBPACK_IMPORTED_MODULE_0__StyleManager__["a" /* default */] {
    constructor(root, id) {
        super(root);
        this.id = id;
        this.extraScrollUpdater = [];
        const headerScroller = root.querySelector('header');
        const bodyScroller = root.querySelector('main');
        // update frozen and sync header with body
        bodyScroller.addEventListener('scroll', () => {
            const left = bodyScroller.scrollLeft;
            headerScroller.scrollLeft = left;
            this.extraScrollUpdater.forEach((u) => u(left));
        });
    }
    /**
     * computes a compatible grid layout pattern based on the given columns
     * @param {{width: number}[]} columns
     * @param {string} unit
     * @return {string}
     */
    static columnWidths(columns, unit = 'px') {
        function repeatStandard(count, width) {
            return `repeat(${count}, ${width})`;
        }
        function repeatEdge(count, width) {
            return `(${width})[${count}]`;
        }
        const repeat = __WEBPACK_IMPORTED_MODULE_0__StyleManager__["b" /* isEdge */] ? repeatEdge : repeatStandard;
        let lastWidth = 0;
        let count = 0;
        let r = '';
        columns.forEach(({ width }) => {
            if (lastWidth === width) {
                count++;
                return;
            }
            if (count > 0) {
                r += count === 1 ? `${lastWidth}${unit} ` : `${repeat(count, `${lastWidth}${unit}`)} `;
            }
            count = 1;
            lastWidth = width;
        });
        if (count > 0) {
            r += count === 1 ? `${lastWidth}${unit}` : `${repeat(count, `${lastWidth}${unit}`)}`;
        }
        return r;
    }
    static gridColumn(columns, defaultWidth, unit = 'px') {
        const widths = GridStyleManager.columnWidths(columns, unit);
        if (__WEBPACK_IMPORTED_MODULE_0__StyleManager__["b" /* isEdge */]) {
            return `-ms-grid-columns: ${widths};`;
        }
        return `grid-template-columns: ${widths};
      grid-template-areas: "${columns.map((c) => c.id).join(' ')}";
      grid-auto-columns: ${defaultWidth}px;`;
    }
    /**
     * updates the column widths and default row height for a table
     * @param {number} defaultRowHeight
     * @param {IColumn[]} columns
     * @param {number} defaultWidth
     * @param {string} tableId optional tableId in case of multiple tables within the same engine
     * @param {string} unit
     */
    update(defaultRowHeight, columns, defaultWidth, padding, tableId, unit = 'px') {
        const selectors = tableId !== undefined ? this.tableIds(tableId, true) : { header: `${this.id} > header > article`, body: `${this.id} > main > article` };
        this.updateRule(`__heightsRule${selectors.body}`, `${selectors.body} > div {
      height: ${defaultRowHeight}px;
    }`);
        if (columns.length === 0) {
            //restore dummy rule
            this.deleteRule(`__widthRule${selectors.body}`);
            return;
        }
        const content = GridStyleManager.gridColumn(columns, defaultWidth, unit);
        if (__WEBPACK_IMPORTED_MODULE_0__StyleManager__["b" /* isEdge */]) {
            this.extraScrollUpdater.push(this.updateFrozenColumnsShift.bind(this, columns, selectors, padding, unit));
        }
        this.updateRule(`__widthRule${selectors.body}`, `${selectors.body} > div, ${selectors.header} { ${content} }`);
        this.updateFrozen(columns, selectors, padding, unit);
    }
    /**
     * removes a given tableId if not needed anymore
     * @param {string} tableId tableId to remove
     */
    remove(tableId) {
        const selectors = this.tableIds(tableId, true);
        this.deleteRule(`__heightsRule${selectors.body}`);
        this.deleteRule(`__widthRule${selectors.body}`);
        const prefix = `__frozen${selectors.body}_`;
        const rules = this.ruleNames.reduce((a, b) => a + (b.startsWith(prefix) ? 1 : 0), 0);
        // reset
        for (let i = 0; i < rules; ++i) {
            this.deleteRule(`${prefix}${i}`);
        }
    }
    /**
     * generates the HTML Ids used for the header and body article of a table
     * @param {string} tableId base table id
     * @param {boolean} asSelector flag whether to prepend with # for CSS selector
     * @return {{header: string; body: string}} the table ids used for header and body
     */
    tableIds(tableId, asSelector = false) {
        const cleanId = this.id.startsWith('#') ? this.id.slice(1) : this.id;
        return { header: `${asSelector ? '#' : ''}${cleanId}_H${tableId}`, body: `${asSelector ? '#' : ''}${cleanId}_B${tableId}` };
    }
    updateFrozen(columns, selectors, _padding, unit) {
        if (__WEBPACK_IMPORTED_MODULE_0__StyleManager__["b" /* isEdge */]) {
            return;
        }
        const prefix = `__frozen${selectors.body}_`;
        const rules = this.ruleNames.reduce((a, b) => a + (b.startsWith(prefix) ? 1 : 0), 0);
        const frozen = columns.filter((c) => c.frozen);
        if (frozen.length <= 0 || __WEBPACK_IMPORTED_MODULE_0__StyleManager__["b" /* isEdge */]) {
            // reset
            for (let i = 0; i < rules; ++i) {
                this.deleteRule(`${prefix}${i}`);
            }
            return;
        }
        //create the correct left offset
        let offset = frozen[0].width;
        frozen.slice(1).forEach((c, i) => {
            const rule = `${selectors.body} > div > .frozen[data-id="${c.id}"], ${selectors.header} .frozen[data-id="${c.id}"] {
        left: ${offset}${unit};
      }`;
            offset += c.width; // ignore padding since it causes problems regarding white background + padding(i);
            this.updateRule(`${prefix}${i}`, rule);
        });
        for (let i = frozen.length - 1; i < rules; ++i) {
            this.deleteRule(`${prefix}${i}`);
        }
    }
    updateFrozenColumnsShift(columns, selectors, _padding, unit, scrollLeft) {
        if (!__WEBPACK_IMPORTED_MODULE_0__StyleManager__["b" /* isEdge */]) {
            return;
        }
        const prefix = `__frozen${selectors.body}_`;
        const rules = this.ruleNames.reduce((a, b) => a + (b.startsWith(prefix) ? 1 : 0), 0);
        const hasFrozen = columns.some((c) => c.frozen);
        if (!hasFrozen) {
            for (let i = 0; i < rules; ++i) {
                this.deleteRule(`${prefix}${i}`);
            }
            return;
        }
        //create the correct left offset
        let offset = 0;
        let frozenWidth = 0;
        let nextFrozen = 0;
        columns.forEach((c) => {
            if (c.frozen && offset < (scrollLeft + frozenWidth)) {
                const rule = `${selectors.body} > div > .frozen[data-id="${c.id}"], ${selectors.header} .frozen[data-id="${c.id}"] {
          transform: translate(${scrollLeft - offset + frozenWidth}${unit}, 0);
        }`;
                this.updateRule(`${prefix}${nextFrozen++}`, rule);
                frozenWidth += c.width; //ignore padding + padding(i);
            }
            offset += c.width; //ignore padding + padding(i);
        });
        for (let i = nextFrozen; i < rules; ++i) {
            this.deleteRule(`${prefix}${i}`);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GridStyleManager;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = matchRows;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_INumberColumn__ = __webpack_require__(2);




class ANumbersCellRenderer {
    canRender(col, _isGroup) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__model_INumberColumn__["i" /* isNumbersColumn */])(col);
    }
    /**
     * mean value for now
     * @param {INumbersColumn & Column} col
     * @param {IDataRow[]} rows
     * @return {number[]}
     */
    static choose(col, rows) {
        const data = rows.map((r) => col.getRawNumbers(r.v, r.dataIndex));
        const cols = col.getDataLength();
        const r = [];
        // mean column
        for (let i = 0; i < cols; ++i) {
            const col = data.map((d) => d[i]).filter((d) => !Object(__WEBPACK_IMPORTED_MODULE_2__model_missing__["b" /* isMissingValue */])(d));
            r.push(Object(__WEBPACK_IMPORTED_MODULE_0_d3__["mean"])(col));
        }
        return r;
    }
    createDOM(col) {
        const { templateRow, render } = this.createDOMContext(col);
        return {
            template: `<div>${templateRow}</div>`,
            update: (n, d) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_1__missing__["b" /* renderMissingDOM */])(n, col, d)) {
                    return;
                }
                render(n, col.getRawNumbers(d.v, d.dataIndex));
            }
        };
    }
    createGroupDOM(col) {
        const { templateRow, render } = this.createDOMContext(col);
        return {
            template: `<div>${templateRow}</div>`,
            update: (n, _group, rows) => {
                // render a heatmap
                const chosen = ANumbersCellRenderer.choose(col, rows);
                render(n, chosen);
            }
        };
    }
    createCanvas(col, context) {
        const render = this.createCanvasContext(col, context);
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_1__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            const rowHeight = context.rowHeight(i);
            render(ctx, col.getRawNumbers(d.v, d.dataIndex), 0, rowHeight);
        };
    }
    createGroupCanvas(col, context) {
        const render = this.createCanvasContext(col, context);
        return (ctx, group, rows) => {
            const rowHeight = context.groupHeight(group);
            const chosen = ANumbersCellRenderer.choose(col, rows);
            render(ctx, chosen, 0, rowHeight);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ANumbersCellRenderer;

function matchRows(n, rows, template) {
    // first match the number of rows
    const children = Array.from(n.children);
    if (children.length > rows.length) {
        children.slice(rows.length).forEach((c) => c.remove());
    }
    else if (rows.length > children.length) {
        n.insertAdjacentHTML('beforeend', template.repeat(rows.length - children.length));
    }
}


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const RENDERER_EVENT_HOVER_CHANGED = 'hoverChanged';
/* harmony export (immutable) */ __webpack_exports__["a"] = RENDERER_EVENT_HOVER_CHANGED;

const RENDERER_EVENT_RENDER_FINISHED = 'renderFinished';
/* harmony export (immutable) */ __webpack_exports__["b"] = RENDERER_EVENT_RENDER_FINISHED;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StringColumn__ = __webpack_require__(9);
/**
 * Created by sam on 04.11.2016.
 */


/**
 * a string column in which the values can be edited locally
 */
class AnnotateColumn extends __WEBPACK_IMPORTED_MODULE_1__StringColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.annotations = new Map();
    }
    createEventList() {
        return super.createEventList().concat([AnnotateColumn.EVENT_VALUE_CHANGED]);
    }
    getValue(row, index) {
        if (this.annotations.has(index)) {
            return this.annotations.get(index);
        }
        return super.getValue(row, index);
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.annotations = {};
        this.annotations.forEach((v, k) => {
            r.annotations[k] = v;
        });
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if (!dump.annotations) {
            return;
        }
        Object.keys(dump.annotations).forEach((k) => {
            this.annotations.set(Number(k), dump.annotations[k]);
        });
    }
    setValue(row, index, value) {
        const old = this.getValue(row, index);
        if (old === value) {
            return true;
        }
        if (value === '' || value == null) {
            this.annotations.delete(index);
        }
        else {
            this.annotations.set(index, value);
        }
        this.fire([AnnotateColumn.EVENT_VALUE_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], index, old, value);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnnotateColumn;

AnnotateColumn.EVENT_VALUE_CHANGED = 'valueChanged';


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueColumn__ = __webpack_require__(7);
/**
 * Created by sam on 04.11.2016.
 */


/**
 * a string column with optional alignment
 */
class BooleanColumn extends __WEBPACK_IMPORTED_MODULE_1__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.currentFilter = null;
        this.trueMarker = 'X';
        this.falseMarker = '';
        this.setWidthImpl(30);
        this.trueMarker = desc.trueMarker || this.trueMarker;
        this.falseMarker = desc.falseMarker || this.falseMarker;
    }
    get categories() {
        return [this.trueMarker, this.falseMarker];
    }
    get categoryLabels() {
        return ['True', 'False'];
    }
    get categoryColors() {
        return ['green', 'red'];
    }
    getValue(row, index) {
        const v = super.getValue(row, index);
        if (typeof (v) === 'undefined' || v == null) {
            return false;
        }
        return v === true || v === 'true' || v === 'yes' || v === 'x';
    }
    isMissing() {
        return false;
    }
    getCategories(row, index) {
        const v = this.getValue(row, index);
        return v ? [this.trueMarker] : [this.falseMarker];
    }
    getColor(row, index) {
        const flagged = this.getValue(row, index);
        return flagged ? 'green' : 'red';
    }
    getLabel(row, index) {
        const v = this.getValue(row, index);
        return v ? this.trueMarker : this.falseMarker;
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        if (this.currentFilter !== null) {
            r.filter = this.currentFilter;
        }
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if (typeof dump.filter !== 'undefined') {
            this.currentFilter = dump.filter;
        }
    }
    isFiltered() {
        return this.currentFilter !== null;
    }
    filter(row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        const r = this.getValue(row, index);
        return r === this.currentFilter;
    }
    getFilter() {
        return this.currentFilter;
    }
    setFilter(filter) {
        if (this.currentFilter === filter) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.currentFilter, this.currentFilter = filter);
    }
    compare(a, b, aIndex, bIndex) {
        const av = this.getValue(a, aIndex);
        const bv = this.getValue(b, bIndex);
        return av === bv ? 0 : (av < bv ? -1 : +1);
    }
    group(row, index) {
        const enabled = this.getValue(row, index);
        return enabled ? BooleanColumn.GROUP_TRUE : BooleanColumn.GROUP_FALSE;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BooleanColumn;

BooleanColumn.GROUP_TRUE = { name: 'True', color: 'black' };
BooleanColumn.GROUP_FALSE = { name: 'False', color: 'white' };


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__ = __webpack_require__(15);
/**
 * Created by sam on 04.11.2016.
 */

/**
 * factory for creating a description creating a min column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'Min') {
    return { type: 'min', label };
}
class MinColumn extends __WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.setDefaultRenderer('interleaving');
    }
    getColor(row, index) {
        //compute the index of the maximal one
        const c = this._children;
        if (c.length === 0) {
            return this.color;
        }
        let minIndex = 0, minValue = c[0].getValue(row, index);
        for (let i = 1; i < c.length; ++i) {
            const v = c[i].getValue(row, index);
            if (v < minValue) {
                minIndex = i;
                minValue = v;
            }
            i++;
        }
        return c[minIndex].color;
    }
    compute(row, index) {
        return Math.min(...this._children.map((d) => d.getValue(row, index)));
    }
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    toSortingDesc(toId) {
        return {
            operation: 'min',
            operands: this._children.map((c) => c.toSortingDesc(toId))
        };
    }
    get canJustAddNumbers() {
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MinColumn;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__ = __webpack_require__(15);
/**
 * Created by sam on 04.11.2016.
 */

/**
 *  factory for creating a description creating a max column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'Max') {
    return { type: 'max', label };
}
/**
 * combines multiple columns by using the maximal value
 */
class MaxColumn extends __WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.setDefaultRenderer('interleaving');
    }
    getColor(row, index) {
        //compute the index of the maximal one
        const c = this._children;
        if (c.length === 0) {
            return this.color;
        }
        let maxIndex = 0, maxValue = c[0].getValue(row, index);
        for (let i = 1; i < c.length; ++i) {
            const v = c[i].getValue(row, index);
            if (v > maxValue) {
                maxIndex = i;
                maxValue = v;
            }
        }
        return c[maxIndex].color;
    }
    compute(row, index) {
        return Math.max(...this._children.map((d) => d.getValue(row, index)));
    }
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    toSortingDesc(toId) {
        return {
            operation: 'max',
            operands: this._children.map((c) => c.toSortingDesc(toId))
        };
    }
    get canJustAddNumbers() {
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MaxColumn;



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDesc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__ = __webpack_require__(15);
/**
 * Created by sam on 04.11.2016.
 */


/**
 * factory for creating a description creating a mean column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label = 'Mean') {
    return { type: 'mean', label };
}
class MeanColumn extends __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__["a" /* default */] {
    compute(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_0_d3__["mean"])(this._children, (d) => d.getValue(row, index));
    }
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    toSortingDesc(toId) {
        return {
            operation: 'avg',
            operands: this._children.map((c) => c.toSortingDesc(toId))
        };
    }
    get canJustAddNumbers() {
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MeanColumn;



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NumberColumn__ = __webpack_require__(8);
/**
 * Created by sam on 04.11.2016.
 */





/**
 * similar to a categorical column but the categories are mapped to numbers
 */
class CategoricalNumberColumn extends __WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.colors = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].category10();
        /**
         * category labels by default the category name itself
         * @type {Array}
         */
        this.catLabels = new Map();
        this.scale = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].ordinal().rangeRoundPoints([0, 1]);
        this.currentFilter = null;
        /**
         * separator for multi handling
         * @type {string}
         */
        this.separator = ';';
        this.combiner = __WEBPACK_IMPORTED_MODULE_0_d3__["max"];
        this.separator = desc.separator || this.separator;
        __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.initCategories.call(this, desc);
        this.scale.domain(this.colors.domain());
        if (desc.categories) {
            //lookup value or 0.5 by default
            const values = desc.categories.map((d) => ((typeof d !== 'string' && typeof (d.value) === 'number')) ? d.value : 0.5);
            this.scale.range(values);
        }
        this.setDefaultRenderer('number');
        this.setDefaultGroupRenderer('boxplot');
    }
    createEventList() {
        return super.createEventList().concat([CategoricalNumberColumn.EVENT_MAPPING_CHANGED]);
    }
    get categories() {
        return this.colors.domain().slice();
    }
    get categoryColors() {
        return this.colors.range().slice();
    }
    get categoryLabels() {
        //no mapping
        if (this.catLabels === null || this.catLabels.size === 0) {
            return this.categories;
        }
        //label or identity mapping
        return this.categories.map((c) => this.catLabels.has(c) ? this.catLabels.get(c) : c);
    }
    colorOf(cat) {
        return this.colors(cat);
    }
    getLabel(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getLabel.call(this, row, index);
    }
    getFirstLabel(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getFirstLabel.call(this, row, index);
    }
    getLabels(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getLabels.call(this, row, index);
    }
    getValue(row, index) {
        const r = this.getValues(row, index);
        return r.length > 0 ? this.combiner(r) : 0;
    }
    getValues(row, index) {
        const r = __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getValues.call(this, row, index);
        return r.map(this.scale);
    }
    getCategories(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getValues.call(this, row, index);
    }
    getNumber(row, index) {
        return this.getValue(row, index);
    }
    isMissing(row, index) {
        return this.getLabels(row, index).length === 0;
    }
    getRawNumber(row, index) {
        return this.getNumber(row, index);
    }
    getColor(row, index) {
        const vs = this.getValues(row, index);
        const cs = this.getColors(row, index);
        if (this.combiner === __WEBPACK_IMPORTED_MODULE_0_d3__["max"]) {
            //use the max color
            return cs.slice(1).reduce((prev, act, i) => vs[i + 1] > prev.v ? { c: act, v: vs[i + 1] } : prev, {
                c: cs[0],
                v: vs[0]
            }).c;
        }
        if (this.combiner === __WEBPACK_IMPORTED_MODULE_0_d3__["min"]) {
            //use the max color
            return cs.slice(1).reduce((prev, act, i) => vs[i + 1] < prev.v ? { c: act, v: vs[i + 1] } : prev, {
                c: cs[0],
                v: vs[0]
            }).c;
        }
        //use the first
        return cs[0] || null;
    }
    getColors(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getColors.call(this, row, index);
    }
    dump(toDescRef) {
        const r = __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.dump.call(this, toDescRef);
        r.scale = {
            domain: this.scale.domain(),
            range: this.scale.range(),
            separator: this.separator
        };
        return r;
    }
    restore(dump, factory) {
        __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.restore.call(this, dump, factory);
        if (dump.scale) {
            this.scale.domain(dump.scale.domain).range(dump.scale.range);
        }
        this.separator = dump.separator || this.separator;
    }
    getScale() {
        return {
            domain: this.scale.domain(),
            range: this.scale.range()
        };
    }
    getMapping() {
        return this.scale.range().slice();
    }
    setMapping(range) {
        const bak = this.getScale();
        this.scale.range(range);
        this.fire([CategoricalNumberColumn.EVENT_MAPPING_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getScale());
    }
    isFiltered() {
        return this.currentFilter != null;
    }
    filter(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.filter.call(this, row, index);
    }
    group(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.group.call(this, row, index);
    }
    getFilter() {
        return this.currentFilter;
    }
    setFilter(filter) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.setFilter.call(this, filter);
    }
    compare(a, b, aIndex, bIndex) {
        return __WEBPACK_IMPORTED_MODULE_4__NumberColumn__["d" /* default */].prototype.compare.call(this, a, b, aIndex, bIndex);
    }
    groupCompare(a, b) {
        return __WEBPACK_IMPORTED_MODULE_4__NumberColumn__["d" /* default */].prototype.groupCompare.call(this, a, b);
    }
    getRendererType() {
        return __WEBPACK_IMPORTED_MODULE_4__NumberColumn__["d" /* default */].prototype.getRendererType.call(this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoricalNumberColumn;

CategoricalNumberColumn.EVENT_MAPPING_CHANGED = __WEBPACK_IMPORTED_MODULE_4__NumberColumn__["d" /* default */].EVENT_MAPPING_CHANGED;


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__INumberColumn__ = __webpack_require__(2);
/**
 * Created by bikramkawan on 24/11/2016.
 */






class NumbersColumn extends __WEBPACK_IMPORTED_MODULE_1__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        /**
         * currently active filter
         * @type {{min: number, max: number}}
         * @private
         */
        this.currentFilter = Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["l" /* noNumberFilter */])();
        if (desc.map) {
            this.mapping = Object(__WEBPACK_IMPORTED_MODULE_3__NumberColumn__["c" /* createMappingFunction */])(desc.map);
        }
        else if (desc.domain) {
            this.mapping = new __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["a" /* ScaleMappingFunction */](desc.domain, 'linear', desc.range || [0, 1]);
        }
        this.original = this.mapping.clone();
        this.dataLength = desc.dataLength;
        this.threshold = desc.threshold || 0;
        this.colorRange = desc.colorRange || ['blue', 'red'];
        this.sort = desc.sort || __WEBPACK_IMPORTED_MODULE_5__INumberColumn__["d" /* SORT_METHOD */].median;
        // better initialize the default with based on the data length
        this.setWidth(Math.min(Math.max(100, this.dataLength * 10), 500));
        this.splicer = {
            length: this.dataLength,
            splice: (v) => v
        };
    }
    setSplicer(splicer) {
        this.fire([NumbersColumn.EVENT_SPLICE_CHANGED, __WEBPACK_IMPORTED_MODULE_2__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_2__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_2__Column__["a" /* default */].EVENT_DIRTY], this.splicer, this.splicer = splicer);
    }
    getSplicer() {
        return this.splicer;
    }
    compare(a, b, aIndex, bIndex) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["e" /* compareBoxPlot */])(this, a, b, aIndex, bIndex);
    }
    getColorRange() {
        return this.colorRange.slice();
    }
    getRawColorScale() {
        const colorScale = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear();
        const domain = this.mapping.domain;
        if (domain[0] < 0) {
            colorScale
                .domain([domain[0], 0, domain[1]])
                .range([this.colorRange[0], (this.colorRange.length > 2 ? this.colorRange[1] : 'white'), this.colorRange[this.colorRange.length - 1]]);
        }
        else {
            colorScale
                .domain([domain[0], domain[1]])
                .range([this.colorRange[0], this.colorRange[this.colorRange.length - 1]]);
        }
        return colorScale;
    }
    getRawNumbers(row, index) {
        return this.getRawValue(row, index);
    }
    getDataLength() {
        if (this.splicer) {
            return this.splicer.length;
        }
        return this.dataLength;
    }
    getThreshold() {
        return this.threshold;
    }
    getBoxPlotData(row, index) {
        const data = this.getRawValue(row, index);
        if (data === null) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_5__INumberColumn__["c" /* LazyBoxPlotData */](data, this.mapping);
    }
    getRange() {
        return this.mapping.getRange(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["b" /* DEFAULT_FORMATTER */]);
    }
    getRawBoxPlotData(row, index) {
        const data = this.getRawValue(row, index);
        if (data === null) {
            return null;
        }
        return new __WEBPACK_IMPORTED_MODULE_5__INumberColumn__["c" /* LazyBoxPlotData */](data);
    }
    getNumbers(row, index) {
        return this.getValue(row, index);
    }
    getNumber(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["f" /* getBoxPlotNumber */])(this, row, index, 'normalized');
    }
    getRawNumber(row, index) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["f" /* getBoxPlotNumber */])(this, row, index, 'raw');
    }
    getValue(row, index) {
        const values = this.getRawValue(row, index);
        return values.map((d) => Object(__WEBPACK_IMPORTED_MODULE_4__missing__["b" /* isMissingValue */])(d) ? NaN : this.mapping.apply(d));
    }
    getRawValue(row, index) {
        let r = super.getValue(row, index);
        if (this.splicer && r !== null) {
            r = this.splicer.splice(r);
        }
        return r === null ? [] : r;
    }
    getLabel(row, index) {
        const v = this.getRawValue(row, index);
        if (v === null) {
            return '';
        }
        return `[${v.map(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["b" /* DEFAULT_FORMATTER */]).join(', ')}]`;
    }
    getSortMethod() {
        return this.sort;
    }
    setSortMethod(sort) {
        if (this.sort === sort) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_2__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED], this.sort, this.sort = sort);
        // sort by me if not already sorted by me
        if (!this.isSortedByMe().asc) {
            this.sortByMe();
        }
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.sortMethod = this.getSortMethod();
        r.filter = !Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["j" /* isSameFilter */])(this.currentFilter, Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["l" /* noNumberFilter */])()) ? this.currentFilter : null;
        r.map = this.mapping.dump();
        return r;
    }
    restore(dump, factory) {
        super.restore(dump, factory);
        if (dump.sortMethod) {
            this.sort = dump.sortMethod;
        }
        if (dump.filter) {
            this.currentFilter = Object(__WEBPACK_IMPORTED_MODULE_5__INumberColumn__["n" /* restoreFilter */])(dump.filter);
        }
        if (dump.map) {
            this.mapping = Object(__WEBPACK_IMPORTED_MODULE_3__NumberColumn__["c" /* createMappingFunction */])(dump.map);
        }
        else if (dump.domain) {
            this.mapping = new __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["a" /* ScaleMappingFunction */](dump.domain, 'linear', dump.range || [0, 1]);
        }
    }
    createEventList() {
        return super.createEventList().concat([NumbersColumn.EVENT_MAPPING_CHANGED, NumbersColumn.EVENT_SPLICE_CHANGED]);
    }
    getOriginalMapping() {
        return this.original.clone();
    }
    getMapping() {
        return this.mapping.clone();
    }
    setMapping(mapping) {
        if (this.mapping.eq(mapping)) {
            return;
        }
        this.fire([NumbersColumn.EVENT_MAPPING_CHANGED, __WEBPACK_IMPORTED_MODULE_2__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_2__Column__["a" /* default */].EVENT_DIRTY], this.mapping.clone(), this.mapping = mapping);
    }
    isFiltered() {
        return __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.isFiltered.call(this);
    }
    getFilter() {
        return __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.getFilter.call(this);
    }
    setFilter(value = { min: -Infinity, max: +Infinity, filterMissing: false }) {
        __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.setFilter.call(this, value);
    }
    filter(row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].prototype.filter.call(this, row, index);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NumbersColumn;

NumbersColumn.EVENT_MAPPING_CHANGED = __WEBPACK_IMPORTED_MODULE_3__NumberColumn__["d" /* default */].EVENT_MAPPING_CHANGED;
NumbersColumn.EVENT_SPLICE_CHANGED = 'spliceChanged';


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADataProvider__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DataProvider", function() { return __WEBPACK_IMPORTED_MODULE_0__ADataProvider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LocalDataProvider__ = __webpack_require__(73);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LocalDataProvider", function() { return __WEBPACK_IMPORTED_MODULE_1__LocalDataProvider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RemoteDataProvider__ = __webpack_require__(74);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RemoteDataProvider", function() { return __WEBPACK_IMPORTED_MODULE_2__RemoteDataProvider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deriveColumnDescriptions", function() { return __WEBPACK_IMPORTED_MODULE_3__utils__["a"]; });
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */






/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Samuel Gratzl on 12.09.2017.
 */
/**
 * a set that preserves the insertion order
 */
class OrderedSet {
    constructor(values = []) {
        this[Symbol.toStringTag] = Symbol('OrderedSet');
        this.set = new Set();
        this.list = [];
        this.addAll(values);
    }
    get size() {
        return this.set.size;
    }
    clear() {
        this.set.clear();
        this.list.splice(0, this.list.length);
    }
    addAll(values) {
        values.forEach((v) => this.add(v));
        return this;
    }
    add(value) {
        if (this.set.has(value)) {
            return this;
        }
        this.set.add(value);
        this.list.push(value);
        return this;
    }
    has(value) {
        return this.set.has(value);
    }
    delete(value) {
        const r = this.set.delete(value);
        if (!r) {
            return false;
        }
        const index = this.list.indexOf(value);
        console.assert(index >= 0);
        this.list.splice(index, 1);
        return true;
    }
    deleteAll(values) {
        return values.reduce((acc, act) => this.delete(act) && acc, true);
    }
    forEach(callbackfn, thisArg) {
        this.list.forEach(function (v) {
            callbackfn.call(this, v, v, this);
        }, thisArg);
    }
    [Symbol.iterator]() {
        return this.list[Symbol.iterator]();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrderedSet;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deriveColumnDescriptions;
/* harmony export (immutable) */ __webpack_exports__["b"] = exportRanking;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__(12);


function deriveType(label, value, column, data, options) {
    const base = {
        type: 'string',
        label,
        column,
    };
    if (typeof value === 'number') {
        base.type = 'number';
        base.domain = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["extent"])(data, (d) => d[column]);
        return base;
    }
    if (typeof value === 'boolean') {
        base.type = 'boolean';
        return base;
    }
    if (typeof value === 'string') {
        //maybe a categorical
        const categories = new Set(data.map((d) => d[column]));
        if (categories.size < data.length * options.categoricalThreshold) {
            base.type = 'categorical';
            base.categories = categories;
        }
        return base;
    }
    //unknown type
    return base;
}
function deriveColumnDescriptions(data, options = {}) {
    const config = Object.assign({
        categoricalThreshold: 0.7,
    }, options);
    const r = [];
    if (data.length === 0) {
        // no data to derive something from
        return r;
    }
    const first = data[0];
    if (Array.isArray(first)) {
        //array of arrays
        return first.map((v, i) => deriveType(`Col${i}`, v, i, data, config));
    }
    //objects
    return Object.keys(first).map((key) => deriveType(key, first[key], key, data, config));
}
/**
 * utility to export a ranking to a table with the given separator
 * @param ranking
 * @param data
 * @param options
 * @returns {Promise<string>}
 */
function exportRanking(ranking, data, options = {}) {
    const opts = Object.assign({
        separator: '\t',
        newline: '\n',
        header: true,
        quote: false,
        quoteChar: '"',
        filter: (c) => !Object(__WEBPACK_IMPORTED_MODULE_1__model__["isSupportType"])(c),
        verboseColumnHeaders: false
    }, options);
    //optionally quote not numbers
    const escape = new RegExp(`[${opts.quoteChar}]`, 'g');
    function quote(l, c) {
        if ((opts.quote || l.indexOf('\n') >= 0) && (!c || !Object(__WEBPACK_IMPORTED_MODULE_1__model__["isNumberColumn"])(c))) {
            return `${opts.quoteChar}${l.replace(escape, opts.quoteChar + opts.quoteChar)}${opts.quoteChar}`;
        }
        return l;
    }
    const columns = ranking.flatColumns.filter((c) => opts.filter(c.desc));
    const order = ranking.getOrder();
    const r = [];
    if (opts.header) {
        r.push(columns.map((d) => quote(`${d.label}${opts.verboseColumnHeaders && d.description ? `\n${d.description}` : ''}`)).join(opts.separator));
    }
    data.forEach((row, i) => {
        r.push(columns.map((c) => quote(c.getLabel(row, order[i]), c)).join(opts.separator));
    });
    return r.join(opts.newline);
}


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Ranking__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ADataProvider__ = __webpack_require__(14);
/**
 * Created by sam on 04.11.2016.
 */



function isComplexAccessor(column) {
    // something like a.b or a[4]
    return typeof column === 'string' && column.indexOf('.') >= 0;
}
function resolveComplex(column, row) {
    const resolve = (obj, col) => {
        if (obj === undefined) {
            return obj; // propagate invalid values
        }
        if (/\d+/.test(col)) {
            return obj[+col];
        }
        return obj[col];
    };
    return column.split('.').reduce(resolve, row);
}
function rowGetter(row, _index, _id, desc) {
    const column = desc.column;
    if (isComplexAccessor(column)) {
        return resolveComplex(column, row);
    }
    return row[column];
}
/**
 * common base implementation of a DataProvider with a fixed list of column descriptions
 */
class ACommonDataProvider extends __WEBPACK_IMPORTED_MODULE_2__ADataProvider__["a" /* default */] {
    constructor(columns = [], options = {}) {
        super(options);
        this.columns = columns;
        this.rankingIndex = 0;
        /**
         * the local ranking orders
         */
        this.ranks = new Map();
        //generate the accessor
        columns.forEach((d) => {
            d.accessor = d.accessor || rowGetter;
            d.label = d.label || d.column;
        });
    }
    rankAccessor(_row, index, _id, _desc, ranking) {
        const groups = this.ranks.get(ranking.id) || [];
        let acc = 0;
        for (const group of groups) {
            const rank = group.order.indexOf(index);
            if (rank >= 0) {
                return acc + rank + 1; // starting with 1
            }
            acc += group.order.length;
        }
        return -1;
    }
    /**
     * returns the maximal number of nested/hierarchical sorting criteria
     * @return {number}
     */
    getMaxNestedSortingCriteria() {
        return 1;
    }
    getMaxGroupColumns() {
        return 1;
    }
    cloneRanking(existing) {
        const id = this.nextRankingId();
        const clone = new __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */](id, this.getMaxNestedSortingCriteria(), this.getMaxGroupColumns());
        if (existing) {
            //copy the ranking
            this.ranks.set(id, this.ranks.get(existing.id));
            //TODO better cloning
            existing.children.forEach((child) => {
                this.push(clone, child.desc);
            });
        }
        else {
            clone.push(this.create(Object(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()));
        }
        return clone;
    }
    cleanUpRanking(ranking) {
        //delete all stored information
        this.ranks.delete(ranking.id);
    }
    sort(ranking) {
        //use the server side to sort
        const r = this.sortImpl(ranking);
        if (Array.isArray(r)) {
            //store the result
            this.ranks.set(ranking.id, r);
            return r;
        }
        return r.then((r) => {
            this.ranks.set(ranking.id, r);
            return r;
        });
    }
    /**
     * adds another column description to this data provider
     * @param column
     */
    pushDesc(column) {
        const d = column;
        d.accessor = d.accessor || rowGetter;
        d.label = column.label || d.column;
        this.columns.push(column);
        this.fire(__WEBPACK_IMPORTED_MODULE_2__ADataProvider__["a" /* default */].EVENT_ADD_DESC, d);
    }
    clearColumns() {
        this.clearRankings();
        this.columns.splice(0, this.columns.length);
        this.fire(__WEBPACK_IMPORTED_MODULE_2__ADataProvider__["a" /* default */].EVENT_CLEAR_DESC);
    }
    getColumns() {
        return this.columns.slice();
    }
    findDesc(ref) {
        return this.columns.filter((c) => c.column === ref)[0];
    }
    /**
     * identify by the tuple type@columnname
     * @param desc
     * @returns {string}
     */
    toDescRef(desc) {
        return typeof desc.column !== 'undefined' ? `${desc.type}@${desc.column}` : desc;
    }
    fromDescRef(descRef) {
        if (typeof (descRef) === 'string') {
            return this.columns.find((d) => `${d.type}@${d.column}` === descRef);
        }
        return descRef;
    }
    restore(dump) {
        super.restore(dump);
        this.rankingIndex = 1 + Math.max(...this.getRankings().map((r) => +r.id.substring(4)));
    }
    nextRankingId() {
        return `rank${this.rankingIndex++}`;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ACommonDataProvider);


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Samuel Gratzl on 13.07.2017.
 */
// import manually import './style.scss';
const isEdge = typeof CSS !== 'undefined' && CSS.supports('(-ms-ime-align:auto)');
/* harmony export (immutable) */ __webpack_exports__["b"] = isEdge;

/**
 * utility for custom generated CSS rules
 */
class StyleManager {
    constructor(root) {
        this.rules = new Map();
        this.node = root.ownerDocument.createElement('style');
        root.appendChild(this.node);
        if (isEdge) {
            root.classList.add('ms-edge');
        }
    }
    get stylesheet() {
        const r = this.node.sheet;
        if (this.rules.size > 0 && r.cssRules.length === 0) {
            // recreate
            this.rules.forEach((v) => {
                v.index = r.cssRules.length;
                r.insertRule(v.rule.cssText);
                v.rule = r.cssRules.item(v.index);
            });
        }
        return r;
    }
    destroy() {
        this.node.remove();
    }
    addRule(id, rule) {
        // append
        const l = this.stylesheet.cssRules.length;
        this.stylesheet.insertRule(rule, l);
        this.rules.set(id, { rule: this.stylesheet.cssRules[l], index: l });
        return id;
    }
    findIndex(guess, rule) {
        const guessed = this.stylesheet.cssRules[guess];
        if (guessed === rule) {
            return guess;
        }
        return Array.from(this.stylesheet.cssRules).indexOf(rule);
    }
    updateRule(id, rule) {
        const r = this.rules.get(id);
        if (!r) {
            // add if not yet existing
            return this.addRule(id, rule);
        }
        r.index = this.findIndex(r.index, r.rule);
        this.stylesheet.deleteRule(r.index);
        this.stylesheet.insertRule(rule, r.index);
        r.rule = this.stylesheet.cssRules[r.index];
        return id;
    }
    deleteRule(id) {
        const r = this.rules.get(id);
        if (!r) {
            return;
        }
        r.index = this.findIndex(r.index, r.rule);
        this.stylesheet.deleteRule(r.index);
        this.rules.delete(id);
    }
    get ruleNames() {
        return Array.from(this.rules.keys());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StyleManager;



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missing__ = __webpack_require__(4);


/**
 * renders categorical columns as a colored rect with label
 */
class CategoricalColorCellRenderer {
    constructor() {
        this.title = 'Color';
    }
    canRender() {
        return false; // only direct selection
    }
    createDOM(col) {
        return {
            template: `<div style="background-color: transparent" title=""></div>`,
            update: (n, d) => {
                const missing = Object(__WEBPACK_IMPORTED_MODULE_1__missing__["b" /* renderMissingDOM */])(n, col, d);
                n.style.backgroundColor = missing ? null : col.getColor(d.v, d.dataIndex);
                n.title = col.getLabel(d.v, d.dataIndex);
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_1__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            ctx.fillStyle = col.getColor(d.v, d.dataIndex) || '';
            ctx.fillRect(0, 0, context.colWidth(col), context.rowHeight(i));
        };
    }
    static choose(col, rows) {
        const hist = new Map();
        col.categories.forEach((cat) => hist.set(cat, 0));
        rows.forEach((row) => col.getCategories(row.v, row.dataIndex).forEach((cat) => hist.set(cat, (hist.get(cat) || 0) + 1)));
        let max = 0, maxCat = 0;
        col.categories.forEach((cat, i) => {
            const count = hist.get(cat);
            if (count > max) {
                max = count;
                maxCat = i;
            }
        });
        return {
            count: max,
            label: col.categoryLabels[maxCat],
            color: col.categoryColors[maxCat]
        };
    }
    createGroupDOM(col) {
        return {
            template: `<div style="background-color: white"></div>`,
            update: (n, _group, rows) => {
                const { count, label, color } = CategoricalColorCellRenderer.choose(col, rows);
                n.textContent = `${label} (${count})`;
                n.style.backgroundColor = color;
            }
        };
    }
    createGroupCanvas(col, context) {
        const width = context.colWidth(col);
        return (ctx, group, rows) => {
            const height = context.groupHeight(group);
            const { count, label, color } = CategoricalColorCellRenderer.choose(col, rows);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = context.option('style.text', 'black');
            const bak = ctx.textAlign;
            ctx.textAlign = 'center';
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* clipText */])(ctx, `${label} (${count})`, width / 2, height / 2, width, context.textHints);
            ctx.textAlign = bak;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoricalColorCellRenderer;



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.9
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    if (element) {
      return element.ownerDocument.documentElement;
    }

    return document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE10$1() && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length - 1; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["a"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(102)))

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = stringFilter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AFilterDialog__ = __webpack_require__(16);


class StringFilterDialog extends __WEBPACK_IMPORTED_MODULE_1__AFilterDialog__["a" /* default */] {
    /**
     * opens a dialog for filtering a string column
     * @param column the column to filter
     * @param header the visual header element of this column
     * @param title optional title
     */
    constructor(column, header, title = 'Filter') {
        super(column, header, title);
    }
    openDialog() {
        const base = stringFilter(this.column);
        const popup = this.makePopup(base.template);
        const updateData = (filter) => {
            this.markFiltered(filter != null && filter !== '');
            this.column.setFilter(filter);
        };
        const update = base.init(popup.querySelector('form'), (filtered) => this.markFiltered(filtered));
        this.onButton(popup, {
            cancel: () => {
                updateData(base.original);
            },
            reset: () => {
                popup.querySelector('input[type="text"]').value = '';
                Array.from(popup.querySelectorAll('input[type=checkbox')).forEach((n) => n.checked = false);
                updateData(null);
            },
            submit: () => {
                update(true);
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StringFilterDialog;

function stringFilter(col) {
    let bak = col.getFilter() || '';
    const original = bak;
    const bakMissing = bak === __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__["a" /* default */].FILTER_MISSING;
    if (bakMissing) {
        bak = '';
    }
    return {
        original,
        template: `<input type="text" placeholder="containing..." autofocus value="${(bak instanceof RegExp) ? bak.source : bak}" style="width: 100%">
  <br><label><input type="checkbox" ${(bak instanceof RegExp) ? 'checked="checked"' : ''}>RegExp</label>
  ${Object(__WEBPACK_IMPORTED_MODULE_1__AFilterDialog__["b" /* filterMissingMarkup */])(bakMissing)}`,
        update(node) {
            const isRegex = node.querySelector('input[type="checkbox"]:first-of-type');
            const filterMissing = node.querySelector('input[type="checkbox"].lu_filter_missing');
            const input = node.querySelector('input[type="text"]');
            isRegex.checked = bak instanceof RegExp;
            filterMissing.checked = bakMissing;
            if (input.value !== bak) {
                input.value = (bak instanceof RegExp) ? bak.source : bak;
            }
        },
        init(node, filterCallback) {
            const isRegex = node.querySelector('input[type="checkbox"]:first-of-type');
            const filterMissing = node.querySelector('input[type="checkbox"].lu_filter_missing');
            const input = node.querySelector('input[type="text"]');
            const updateData = (filter) => {
                if (filterCallback) {
                    filterCallback((filter != null && filter !== ''));
                }
                col.setFilter(filter);
            };
            function updateImpl(force) {
                //get value
                let search = input.value;
                if (filterMissing.checked && search === '') {
                    search = __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__["a" /* default */].FILTER_MISSING;
                }
                if (search === '') {
                    updateData(search);
                    return;
                }
                if (search.length < 3 && !force) {
                    return;
                }
                if (isRegex.checked && search !== __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__["a" /* default */].FILTER_MISSING) {
                    search = new RegExp(search);
                }
                updateData(search);
            }
            isRegex.onchange = () => updateImpl(false);
            filterMissing.onchange = () => updateImpl(false);
            input.oninput = () => updateImpl(false);
            return updateImpl;
        }
    };
}


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EScrollResult; });
var EScrollResult;
(function (EScrollResult) {
    EScrollResult[EScrollResult["NONE"] = 0] = "NONE";
    EScrollResult[EScrollResult["ALL"] = 1] = "ALL";
    EScrollResult[EScrollResult["PARTIAL"] = 2] = "PARTIAL";
})(EScrollResult || (EScrollResult = {}));


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logic__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IMixin__ = __webpack_require__(60);
/**
 * Created by Samuel Gratzl on 13.07.2017.
 */


class PrefetchMixin {
    constructor(adapter, options) {
        this.adapter = adapter;
        this.prefetchTimeout = -1;
        this.options = {
            prefetchRows: 20,
            cleanUpRows: 3,
            delay: 50
        };
        Object.assign(this.options, options);
        return this;
    }
    prefetchDown() {
        this.prefetchTimeout = -1;
        const context = this.adapter.context;
        const nextLast = Math.min(this.adapter.visible.last + this.options.prefetchRows, context.numberOfRows - 1);
        // add some rows in advance
        if (this.adapter.visible.last === nextLast && this.adapter.visible.last >= (this.adapter.visible.forcedLast + this.options.prefetchRows)) {
            return;
        }
        this.adapter.addAtBottom(this.adapter.visible.last + 1, nextLast);
        //console.log('prefetch', visibleFirst, visibleLast + 1, '=>', nextLast, ranking.children.length);
        this.adapter.visible.last = nextLast;
    }
    prefetchUp() {
        this.prefetchTimeout = -1;
        if (this.adapter.visible.first <= (this.adapter.visible.forcedFirst - this.options.prefetchRows)) {
            return;
        }
        const context = this.adapter.context;
        const scroller = this.adapter.scroller;
        const fakeOffset = Math.max(scroller.scrollTop - this.options.prefetchRows * context.defaultRowHeight, 0);
        const height = scroller.clientHeight;
        const { first, firstRowPos } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["c" /* range */])(fakeOffset, height, context.defaultRowHeight, context.exceptions, context.numberOfRows);
        if (first === this.adapter.visible.first) {
            return;
        }
        const frozenShift = this.adapter.syncFrozen ? this.adapter.syncFrozen(first) : 0;
        this.adapter.addAtBeginning(first, this.adapter.visible.first - 1, frozenShift);
        //console.log('prefetch up ', visibleFirst, '=>', first, visibleLast, ranking.children.length);
        this.adapter.visible.first = first;
        this.adapter.updateOffset(firstRowPos);
    }
    triggerPrefetch(isGoingDown) {
        if (this.prefetchTimeout >= 0) {
            clearTimeout(this.prefetchTimeout);
        }
        if ((isGoingDown && this.adapter.visible.last >= (this.adapter.visible.forcedLast + this.options.prefetchRows)) ||
            (!isGoingDown && this.adapter.visible.first <= (this.adapter.visible.forcedFirst - this.options.prefetchRows))) {
            return;
        }
        this.prefetchTimeout = setTimeout(isGoingDown ? this.prefetchDown.bind(this) : this.prefetchUp.bind(this), this.options.delay);
    }
    cleanUpTop(first) {
        this.prefetchTimeout = -1;
        const newFirst = Math.max(0, first - this.options.cleanUpRows);
        if (newFirst <= this.adapter.visible.first) {
            return;
        }
        const frozenShift = this.adapter.syncFrozen ? this.adapter.syncFrozen(newFirst) : 0;
        this.adapter.removeFromBeginning(this.adapter.visible.first, newFirst - 1, frozenShift);
        const context = this.adapter.context;
        //console.log('cleanup up ', visibleFirst, '=>', newFirst, visibleLast, ranking.children.length);
        let shift = (newFirst - this.adapter.visible.first) * context.defaultRowHeight;
        if (context.exceptions.length > 0) {
            for (let i = this.adapter.visible.first; i < newFirst; ++i) {
                if (context.exceptionsLookup.has(i)) {
                    shift += context.exceptionsLookup.get(i) - context.defaultRowHeight;
                }
            }
        }
        this.adapter.visible.first = newFirst;
        this.adapter.updateOffset(this.adapter.visibleFirstRowPos + shift);
        this.prefetchDown();
    }
    cleanUpBottom(last) {
        this.prefetchTimeout = -1;
        const newLast = last + this.options.cleanUpRows;
        if (this.adapter.visible.last <= newLast) {
            return;
        }
        this.adapter.removeFromBottom(newLast + 1, this.adapter.visible.last);
        //console.log('cleanup bottom', visibleFirst, visibleLast, '=>', newLast, ranking.children.length);
        this.adapter.visible.last = newLast;
        this.prefetchUp();
    }
    triggerCleanUp(first, last, isGoingDown) {
        if (this.prefetchTimeout >= 0) {
            clearTimeout(this.prefetchTimeout);
        }
        if ((isGoingDown && (first - this.options.cleanUpRows) <= this.adapter.visible.first) || (!isGoingDown && this.adapter.visible.last <= (last + this.options.cleanUpRows))) {
            return;
        }
        this.prefetchTimeout = setTimeout(isGoingDown ? this.cleanUpTop.bind(this) : this.cleanUpBottom.bind(this), this.options.delay, isGoingDown ? first : last);
    }
    onScrolled(isGoingDown, scrollResult) {
        if (scrollResult === __WEBPACK_IMPORTED_MODULE_1__IMixin__["a" /* EScrollResult */].NONE) {
            if (this.options.cleanUpRows > 0) {
                this.triggerCleanUp(this.adapter.visible.forcedFirst, this.adapter.visible.forcedLast, isGoingDown);
            }
        }
        else if (this.options.prefetchRows > 0) {
            this.triggerPrefetch(isGoingDown);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PrefetchMixin;



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class KeyFinder {
    constructor(context, key) {
        this.context = context;
        this.key = key;
        this.cache = [];
        this.lastFilled = 0;
        this.key2index = new Map();
        this.context.exceptions.forEach((e) => {
            this.cache[e.index] = e.y;
            this.key2index.set(key(e.index), e.index);
        });
    }
    findValidStart(before) {
        for (let i = before - 1; i >= 0; --i) {
            if (this.cache[i] !== undefined) {
                return i;
            }
        }
        return -1;
    }
    /**
     *
     * @param {string} key
     * @return {number} -1 if not found
     */
    posByKey(key) {
        if (this.key2index.has(key)) {
            const index = this.key2index.get(key);
            return { index, pos: this.pos(index) };
        }
        return this.fillCacheTillKey(key);
    }
    pos(index) {
        if (this.context.exceptions.length === 0) {
            // fast pass
            return index * this.context.defaultRowHeight;
        }
        const cached = this.cache[index];
        if (cached !== undefined) {
            return cached;
        }
        //need to compute it
        // find the starting point where to start counting
        const start = this.findValidStart(index);
        if (start < 0) {
            this.fillCache(0, index, 0);
        }
        else {
            this.fillCache(start + 1, index, this.cache[start] + this.heightOf(start));
        }
        return this.cache[index];
    }
    fillCache(first, last, offset, callback) {
        if (last <= this.lastFilled) {
            //everything already there
            if (!callback) {
                return;
            }
            for (let i = first; i <= last; ++i) {
                callback(i, this.key(i), this.cache[i]);
            }
            return;
        }
        let pos = offset;
        for (let i = first; i <= last; ++i) {
            this.cache[i] = pos;
            const key = this.key(i);
            this.key2index.set(key, i);
            if (callback) {
                callback(i, key, pos);
            }
            pos += this.heightOf(i);
        }
    }
    heightOf(index) {
        const lookup = this.context.exceptionsLookup;
        return lookup.has(index) ? lookup.get(index) : this.context.defaultRowHeight;
    }
    exceptionHeightOf(index, returnDefault = false) {
        const padding = this.context.padding(index);
        const lookup = this.context.exceptionsLookup;
        if (lookup.has(index)) {
            return lookup.get(index) - padding;
        }
        return returnDefault ? this.context.defaultRowHeight - padding : null;
    }
    padding(index) {
        return this.context.padding(index);
    }
    fillCacheTillKey(target) {
        let pos = 0;
        for (let i = this.lastFilled; i < this.context.numberOfRows; ++i, ++this.lastFilled) {
            const c = this.cache[i];
            if (c !== undefined) {
                pos = c + this.heightOf(i);
                continue;
            }
            // new one fill up
            const key = this.key(i);
            this.cache[i] = pos;
            this.key2index.set(key, i);
            if (key === target) {
                return { index: i, pos };
            }
            pos += this.heightOf(i);
        }
        return { index: -1, pos: -1 };
    }
    positions(first, last, offset, callback) {
        this.fillCache(first, last, offset, callback);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyFinder;



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EAnimationMode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__KeyFinder__ = __webpack_require__(62);
/* unused harmony reexport KeyFinder */

var EAnimationMode;
(function (EAnimationMode) {
    EAnimationMode[EAnimationMode["UPDATE"] = 0] = "UPDATE";
    EAnimationMode[EAnimationMode["UPDATE_CREATE"] = 1] = "UPDATE_CREATE";
    EAnimationMode[EAnimationMode["UPDATE_REMOVE"] = 2] = "UPDATE_REMOVE";
    EAnimationMode[EAnimationMode["SHOW"] = 3] = "SHOW";
    EAnimationMode[EAnimationMode["HIDE"] = 4] = "HIDE";
})(EAnimationMode || (EAnimationMode = {}));
/**
 * maximal duration of all animations + extra waiting before e.g. rows are really removed
 * @type {number}
 */
const MAX_ANIMATION_TIME = 1100;
const defaultPhases = [
    {
        delay: 0,
        apply({ mode, previous, nodeY, current, node }) {
            node.dataset.animation = EAnimationMode[mode].toLowerCase();
            node.style.transform = `translate(0, ${previous.y - nodeY}px)`;
            if (mode === EAnimationMode.SHOW) {
                // already target height
                node.style.height = current.height !== null ? `${current.height}px` : null;
            }
            else {
                node.style.height = `${previous.height}px`;
            }
            node.style.opacity = mode === EAnimationMode.SHOW ? '0' : (mode === EAnimationMode.HIDE ? '1' : null);
        }
    },
    {
        delay: 10,
        apply({ mode, current, nodeY, node }) {
            // null for added/update since already at the right position
            node.style.transform = (mode === EAnimationMode.HIDE || mode === EAnimationMode.UPDATE_REMOVE) ? `translate(0, ${current.y - nodeY}px)` : null;
            if (mode !== EAnimationMode.HIDE) {
                node.style.height = current.height !== null ? `${current.height}px` : null;
            }
            node.style.opacity = mode === EAnimationMode.SHOW ? '1' : (mode === EAnimationMode.HIDE ? '0' : null);
        }
    },
    {
        delay: MAX_ANIMATION_TIME,
        apply({ node }) {
            delete node.dataset.animation;
            node.style.opacity = null;
            node.style.transform = null;
        }
    }
];
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultPhases;



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Ranking__ = __webpack_require__(13);


class RenderColumn {
    constructor(c, renderers, index) {
        this.c = c;
        this.renderers = renderers;
        this.index = index;
    }
    get width() {
        return this.c.getWidth();
    }
    get id() {
        return this.c.id;
    }
    get frozen() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["b" /* isSupportType */])(this.c.desc) || this.c.desc.frozen === true;
    }
    createHeader(document, ctx) {
        const node = Object(__WEBPACK_IMPORTED_MODULE_0__header__["c" /* createHeader */])(this.c, document, ctx);
        this.updateHeader(node, ctx);
        return node;
    }
    updateHeader(node, ctx) {
        node.className = `lu-header ${this.c.cssClass ? ` ${this.c.cssClass}` : ''} ${this.c.headerCssClass}${ctx.autoRotateLabels ? ' rotateable' : ''}${this.c.isFiltered() ? ' lu-filtered' : ''}`;
        node.classList.toggle('frozen', this.frozen);
        Object(__WEBPACK_IMPORTED_MODULE_0__header__["j" /* updateHeader */])(node, this.c, ctx);
    }
    createCell(index, document, ctx) {
        const isGroup = ctx.isGroup(index);
        const node = asElement(document, isGroup ? this.renderers.group.template : this.renderers.single.template);
        node.dataset.renderer = isGroup ? this.renderers.groupId : this.renderers.singleId;
        node.dataset.group = isGroup ? 'g' : 'd';
        this.updateCell(node, index, ctx);
        return node;
    }
    updateCell(node, index, ctx) {
        node.classList.toggle('frozen', this.frozen);
        const isGroup = ctx.isGroup(index);
        // assert that we have the template of the right mode
        const oldRenderer = node.dataset.renderer;
        const currentRenderer = isGroup ? this.renderers.groupId : this.renderers.singleId;
        const oldGroup = node.dataset.group;
        const currentGroup = (isGroup ? 'g' : 'd');
        if (oldRenderer !== currentRenderer || oldGroup !== currentGroup) {
            node = asElement(document, isGroup ? this.renderers.group.template : this.renderers.single.template);
            node.dataset.renderer = currentRenderer;
            node.dataset.group = currentGroup;
        }
        if (isGroup) {
            const g = ctx.getGroup(index);
            this.renderers.group.update(node, g, g.rows, ctx.statsOf(this.c));
        }
        else {
            const r = ctx.getRow(index);
            this.renderers.single.update(node, r, r.relativeIndex, r.group, ctx.statsOf(this.c));
        }
        return node;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RenderColumn;

function asElement(doc, html) {
    const helper = doc.createElement('div');
    helper.innerHTML = html;
    const s = helper.firstElementChild;
    helper.innerHTML = '';
    return s;
}


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Ranking__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_StackColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_NestedColumn__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__provider_ADataProvider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__model_SelectionColumn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__engine_header__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__model_NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__renderer__ = __webpack_require__(23);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
















function countMultiLevel(c) {
    if (Object(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["b" /* isMultiLevelColumn */])(c) && !c.getCollapsed()) {
        return 1 + Math.max.apply(Math, c.children.map(countMultiLevel));
    }
    return 1;
}
class HeaderRenderer {
    constructor(data, parent, options) {
        this.data = data;
        this.options = Object(__WEBPACK_IMPORTED_MODULE_13__config__["a" /* defaultConfig */])().header;
        this.histCache = new Map();
        this.dragHandler = __WEBPACK_IMPORTED_MODULE_0_d3__["behavior"].drag()
            .on('dragstart', function () {
            __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).classed('dragging', true);
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.stopPropagation();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.preventDefault();
        })
            .on('drag', function (d) {
            //the new width
            const newValue = Math.max(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"](this.parentNode)[0], 2);
            d.setWidth(newValue);
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.stopPropagation();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.preventDefault();
        })
            .on('dragend', function () {
            __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).classed('dragging', false);
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.stopPropagation();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.preventDefault();
        });
        this.dropHandler = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* dropAble */])([`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-ref`, __WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]], (data, d, copy) => {
            let col = null;
            if (`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-ref` in data) {
                const id = data[`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-ref`];
                col = this.data.find(id);
                if (!col) {
                    return false;
                }
                if (copy) {
                    col = this.data.clone(col);
                }
                else {
                    col.removeMe();
                }
            }
            else {
                const desc = JSON.parse(data[__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]]);
                col = this.data.create(this.data.fromDescRef(desc));
            }
            if (!col) {
                return false;
            }
            if (d instanceof __WEBPACK_IMPORTED_MODULE_2__model_Column__["a" /* default */]) {
                return d.insertAfterMe(col) != null;
            }
            const r = this.data.getLastRanking();
            return r.push(col) !== null;
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["p" /* merge */])(this.options, options);
        this.$node = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](parent).append('div').classed('lu-header', true);
        this.$node.append('div').classed('drop', true).call(this.dropHandler);
        this.changeDataStorage(data);
    }
    changeDataStorage(data) {
        if (this.data) {
            this.data.on(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["u" /* suffix */])('.headerRenderer', __WEBPACK_IMPORTED_MODULE_10__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_10__provider_ADataProvider__["a" /* default */].EVENT_ORDER_CHANGED, __WEBPACK_IMPORTED_MODULE_10__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED), null);
        }
        this.data = data;
        data.on(`${__WEBPACK_IMPORTED_MODULE_10__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_HEADER}.headerRenderer`, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* debounce */])(this.update.bind(this), 1));
        if (!this.options.summary) {
            return;
        }
        data.on(`${__WEBPACK_IMPORTED_MODULE_10__provider_ADataProvider__["a" /* default */].EVENT_ORDER_CHANGED}.headerRenderer`, () => {
            this.updateHist();
            this.update();
        });
        data.on(`${__WEBPACK_IMPORTED_MODULE_10__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.headerRenderer`, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* debounce */])(this.drawSelection.bind(this), 1));
    }
    get sharedHistCache() {
        return this.histCache;
    }
    /**
     * defines the current header height in pixel
     * @returns {number}
     */
    currentHeight() {
        return parseInt(this.$node.style('height'), 10);
    }
    updateHist() {
        const rankings = this.data.getRankings();
        rankings.forEach((ranking) => {
            const order = ranking.getOrder();
            const cols = ranking.flatColumns;
            const histo = order == null ? null : this.data.stats(order);
            cols.filter((d) => d instanceof __WEBPACK_IMPORTED_MODULE_14__model_NumberColumn__["d" /* default */] && !d.isHidden()).forEach((col) => {
                this.histCache.set(col.id, histo === null ? null : histo.stats(col));
            });
            cols.filter((d) => Object(__WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__["b" /* isCategoricalColumn */])(d) && !d.isHidden()).forEach((col) => {
                this.histCache.set(col.id, histo === null ? null : histo.hist(col));
            });
        });
    }
    /**
     * update the selection in the histograms
     */
    drawSelection() {
        if (!this.options.summary) {
            return;
        }
        //highlight the bins in the histograms
        const node = this.$node.node();
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* forEach */])(node, 'div.bar', (d) => d.classList.remove('selected'));
        const indices = this.data.getSelection();
        if (indices.length <= 0) {
            return;
        }
        const render = (data) => {
            //get the data
            const rankings = this.data.getRankings();
            rankings.forEach((ranking) => {
                const cols = ranking.flatColumns;
                //find all number histograms
                cols.filter((d) => d instanceof __WEBPACK_IMPORTED_MODULE_14__model_NumberColumn__["d" /* default */] && !d.isHidden()).forEach((col) => {
                    const bars = [].slice.call(node.querySelectorAll(`div.header[data-id="${col.id}"] div.bar`));
                    data.forEach((d, i) => {
                        const v = col.getValue(d, indices[i]);
                        //choose the right bin
                        for (let i = 1; i < bars.length; ++i) {
                            const bar = bars[i];
                            if (bar.dataset.x > v) {
                                bars[i - 1].classList.add('selected');
                                break;
                            }
                            if (i === bars.length - 1) {
                                bar.classList.add('selected');
                                break;
                            }
                        }
                    });
                });
                cols.filter((d) => Object(__WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__["b" /* isCategoricalColumn */])(d) && !d.isHidden()).forEach((col) => {
                    const header = node.querySelector(`div.header[data-id="${col.id}"]`);
                    data.forEach((d, i) => {
                        const cats = col.getCategories(d, indices[i]);
                        (cats || []).forEach((cat) => {
                            const h = header.querySelector(`div.bar[data-cat="${cat}"]`);
                            if (h) {
                                h.classList.add('selected');
                            }
                        });
                    });
                });
            });
        };
        const r = this.data.view(indices);
        if (Array.isArray(r)) {
            render(r);
        }
        else {
            r.then(render);
        }
    }
    renderRankingButtons(rankings, rankingsOffsets) {
        const $rankingbuttons = this.$node.selectAll('div.rankingbuttons').data(rankings);
        $rankingbuttons.enter().append('div')
            .classed('rankingbuttons', true)
            .call(this.options.rankingButtons);
        $rankingbuttons.style('left', (_d, i) => `${rankingsOffsets[i]}px`);
        $rankingbuttons.exit().remove();
    }
    update() {
        const that = this;
        const rankings = this.data.getRankings();
        const shifts = [], rankingOffsets = [];
        let totalWidth = 0;
        rankings.forEach((ranking) => {
            totalWidth += ranking.flatten(shifts, totalWidth, 1, this.options.columnPadding) + this.options.slopeWidth;
            rankingOffsets.push(totalWidth - this.options.slopeWidth);
        });
        //real width
        totalWidth -= this.options.slopeWidth;
        // fix for #179
        this.$node.select('div.drop').style('min-width', `${totalWidth}px`);
        const columns = shifts.map((d) => d.col);
        //update all if needed
        if (this.options.summary && this.histCache.size === 0 && rankings.length > 0) {
            this.updateHist();
        }
        this.renderColumns(columns, shifts);
        if (this.options.rankingButtons !== __WEBPACK_IMPORTED_MODULE_13__config__["b" /* dummyRankingButtonHook */]) {
            this.renderRankingButtons(rankings, rankingOffsets);
        }
        const levels = Math.max(...columns.map(countMultiLevel));
        let height = (this.options.summary ? this.options.headerHistogramHeight : this.options.headerHeight) + (levels - 1) * this.options.headerHeight;
        if (this.options.autoRotateLabels) {
            //check if we have overflows
            let rotatedAny = false;
            this.$node.selectAll('div.header')
                .style('height', `${height}px`).select('div.lu-label').each(function (d) {
                const w = this.querySelector('span.lu-label').offsetWidth;
                const actWidth = d.getWidth();
                if (w > (actWidth + 30)) {
                    __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).style('transform', `rotate(${that.options.rotationDegree}deg)`);
                    rotatedAny = true;
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).style('transform', null);
                }
            });
            this.$node.selectAll('div.header').style('margin-top', rotatedAny ? `${this.options.rotationHeight}px` : null);
            height += rotatedAny ? this.options.rotationHeight : 0;
        }
        this.$node.style('height', `${height}px`);
    }
    createToolbar($node) {
        const renderers = Object(__WEBPACK_IMPORTED_MODULE_13__config__["a" /* defaultConfig */])().renderers;
        const ctx = Object.assign({
            provider: this.data,
            statsOf: () => null,
            getPossibleRenderer: (col) => {
                return { item: Object(__WEBPACK_IMPORTED_MODULE_15__renderer__["possibleRenderer"])(col, renderers), group: Object(__WEBPACK_IMPORTED_MODULE_15__renderer__["possibleGroupRenderer"])(col, renderers) };
            }
        }, this.options);
        $node.each(function (col) {
            const $this = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this);
            const addIcon = (title, dialogClass, ...dialogArgs) => {
                const proxy = { onclick: () => undefined };
                $this.append('i').attr('title', title).html(`<span aria-hidden="true">${title}</span>`).on('click', function () {
                    proxy.onclick(__WEBPACK_IMPORTED_MODULE_0_d3__["event"]);
                });
                if (!dialogClass) {
                    return proxy;
                }
                proxy.onclick = (evt) => {
                    evt.stopPropagation();
                    const dialog = new dialogClass(col, evt.currentTarget.parentElement, ...dialogArgs);
                    dialog.openDialog();
                };
                return proxy;
            };
            Object(__WEBPACK_IMPORTED_MODULE_12__engine_header__["d" /* createShortcutMenuItems */])(addIcon, col, ctx);
        });
    }
    updateFreeze(left) {
        const numColumns = this.options.freezeCols;
        this.$node.selectAll('div.header')
            .style('z-index', (_d, i) => i < numColumns ? 1 : null)
            .style('transform', (_d, i) => i < numColumns ? `translate(${left}px,0)` : null);
    }
    renderColumns(columns, shifts, $base = this.$node, clazz = 'header') {
        const that = this;
        const $headers = $base.selectAll(`div.${clazz}`).data(columns, (d) => d.id);
        const $headersEnter = $headers.enter().append('div').attr('class', clazz)
            .on('click', (d) => {
            const mevent = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            if (this.options.manipulative && !mevent.defaultPrevented && mevent.currentTarget === mevent.target) {
                d.toggleMySorting();
            }
        });
        const $headersEnterDiv = $headersEnter.append('div').classed('lu-label', true)
            .on('click', (d) => {
            const mevent = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            if (this.options.manipulative && !mevent.defaultPrevented) {
                d.toggleMySorting();
            }
        })
            .call(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* dragAble */])((d) => {
            const ref = JSON.stringify(this.data.toDescRef(d.desc));
            const data = {
                'text/plain': d.label,
                [`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-ref`]: d.id,
                [__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]]: ref
            };
            if (Object(__WEBPACK_IMPORTED_MODULE_6__model_INumberColumn__["h" /* isNumberColumn */])(d)) {
                data[`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-number`] = ref;
                data[`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-number-ref`] = d.id;
            }
            return {
                data,
                effectAllowed: 'copyMove' //none, copy, copyLink, copyMove, link, linkMove, move, all
            };
        }));
        $headersEnterDiv.append('i').attr('class', 'fa fa sort_indicator');
        $headersEnterDiv.append('span').classed('lu-label', true).attr({
            'draggable': this.options.manipulative
        });
        if (this.options.manipulative) {
            $headersEnter.append('div').classed('lu-handle', true)
                .call(this.dragHandler)
                .style('width', `${this.options.columnPadding}px`)
                .call(this.dropHandler);
            $headersEnter.append('div').classed('lu-toolbar', true).call(this.createToolbar.bind(this));
        }
        if (this.options.summary) {
            $headersEnter.append('div').classed('summary', true);
        }
        $headers.style({
            width: (_d, i) => `${shifts[i].width + this.options.columnPadding}px`,
            left: (_d, i) => `${shifts[i].offset}px`,
            'background-color': (d) => d.color
        });
        $headers.attr({
            'class': (d) => `${clazz} ${d.cssClass || ''} ${d.headerCssClass} ${this.options.autoRotateLabels ? 'rotateable' : ''} ${d.isFiltered() ? 'filtered' : ''} ${d.isGroupedBy() >= 0 ? 'grouped' : ''}`,
            title: (d) => Object(__WEBPACK_IMPORTED_MODULE_12__engine_header__["i" /* toFullTooltip */])(d),
            'data-id': (d) => d.id
        });
        $headers.select('i.sort_indicator').attr('class', (d) => {
            const r = d.findMyRanker();
            if (!r) {
                return 'sort_indicator fa';
            }
            const criterias = r.getSortCriterias();
            const index = criterias.findIndex((c) => c.col === d);
            if (index === 0) {
                // TODO handle if secondary, ... criteria
                return `sort_indicator fa fa-sort-${criterias[index].asc ? 'asc' : 'desc'}`;
            }
            return 'sort_indicator fa';
        });
        $headers.select('span.lu-label').text((d) => d.label);
        const resolveDrop = (data, copy, numbersOnly) => {
            const prefix = `${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}${numbersOnly ? '-number' : ''}`;
            if (`${prefix}-ref` in data) {
                const id = data[`${prefix}-ref`];
                let col = this.data.find(id);
                if (copy) {
                    col = this.data.clone(col);
                }
                else if (col) {
                    col.removeMe();
                }
                return col;
            }
            const desc = JSON.parse(data[prefix]);
            return this.data.create(this.data.fromDescRef(desc));
        };
        const renderMultiLevel = function (col) {
            if (col.getCollapsed()) {
                __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).selectAll(`div.${clazz}_i`).remove();
                return;
            }
            const sShifts = [];
            col.flatten(sShifts, 0, 1, that.options.columnPadding);
            const sColumns = sShifts.map((d) => d.col);
            that.renderColumns(sColumns, sShifts, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this), clazz + (clazz.substr(clazz.length - 2) !== '_i' ? '_i' : ''));
        };
        $headers.filter((d) => Object(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["b" /* isMultiLevelColumn */])(d) && d.canJustAddNumbers).each(renderMultiLevel).select('div.lu-label').call(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* dropAble */])([`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-number-ref`, `${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-number`], (data, d, copy) => {
            const col = resolveDrop(data, copy, true);
            return d.push(col) != null;
        }));
        $headers.filter((d) => Object(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["b" /* isMultiLevelColumn */])(d) && !d.canJustAddNumbers).each(renderMultiLevel).select('div.lu-label').call(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* dropAble */])([`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-ref`, __WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]], (data, d, copy) => {
            const col = resolveDrop(data, copy, false);
            return d.push(col) != null;
        }));
        const justNumbers = (d) => (d instanceof __WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["a" /* default */] && d.canJustAddNumbers) || (Object(__WEBPACK_IMPORTED_MODULE_6__model_INumberColumn__["h" /* isNumberColumn */])(d) && d.parent instanceof __WEBPACK_IMPORTED_MODULE_4__model_Ranking__["a" /* default */]);
        const dropOrMerge = (justNumbers) => {
            return (data, d, copy) => {
                const col = resolveDrop(data, copy, justNumbers);
                if (d instanceof __WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["a" /* default */]) {
                    return (d.push(col) !== null);
                }
                const ranking = d.findMyRanker();
                const index = ranking.indexOf(d);
                const parent = this.data.create(justNumbers ? Object(__WEBPACK_IMPORTED_MODULE_8__model_StackColumn__["a" /* createDesc */])() : Object(__WEBPACK_IMPORTED_MODULE_9__model_NestedColumn__["a" /* createDesc */])());
                d.removeMe();
                parent.push(d);
                parent.push(col);
                return ranking.insert(parent, index) != null;
            };
        };
        $headers.filter((d) => !Object(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["b" /* isMultiLevelColumn */])(d) && justNumbers(d)).select('div.lu-label').call(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* dropAble */])([`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-number-ref`, `${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-number`], dropOrMerge(true)));
        $headers.filter((d) => !Object(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["b" /* isMultiLevelColumn */])(d) && !justNumbers(d)).select('div.lu-label').call(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* dropAble */])([`${__WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]}-ref`, __WEBPACK_IMPORTED_MODULE_12__engine_header__["a" /* MIMETYPE_PREFIX */]], dropOrMerge(false)));
        if (this.options.summary) {
            $headers.filter((d) => Object(__WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__["b" /* isCategoricalColumn */])(d)).each(function (col) {
                that.renderCategoricalSummary(col, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).select('div.summary'));
            });
            $headers.filter((d) => d instanceof __WEBPACK_IMPORTED_MODULE_14__model_NumberColumn__["d" /* default */]).each(function (col) {
                that.renderNumericalSummary(col, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).select('div.summary'));
            });
            $headers.filter((d) => d instanceof __WEBPACK_IMPORTED_MODULE_3__model_StringColumn__["a" /* default */]).each(function (col) {
                that.renderStringSummary(col, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).select('div.summary'));
            });
            $headers.filter((d) => d instanceof __WEBPACK_IMPORTED_MODULE_11__model_SelectionColumn__["b" /* default */]).each(function (col) {
                that.renderSelectionSummary(col, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).select('div.summary'));
            });
        }
        $headers.exit().remove();
    }
    renderCategoricalSummary(col, $this) {
        const hist = this.histCache.get(col.id);
        if (!hist) {
            return;
        }
        const render = (stats) => {
            const cats = col.categories;
            const colors = col.categoryColors;
            const $bars = $this.selectAll('div.bar').data(stats.hist);
            $bars.enter().append('div').classed('bar', true);
            const sx = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].ordinal().domain(cats).rangeBands([0, 100], 0.1);
            const sy = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([0, stats.maxBin]).range([0, 100]);
            $bars.style({
                left: (d) => `${sx(d.cat)}%`,
                width: `${sx.rangeBand()}%`,
                top: (d) => `${100 - sy(d.y)}%`,
                height: (d) => `${sy(d.y)}%`,
                'background-color': (d) => colors[cats.indexOf(d.cat)]
            }).attr({
                title: (d) => `${d.cat}: ${d.y}`,
                'data-cat': (d) => d.cat
            });
            $bars.exit().remove();
        };
        if (hist instanceof Promise) {
            hist.then(render);
        }
        else {
            render(hist);
        }
    }
    renderNumericalSummary(col, $this) {
        const hist = this.histCache.get(col.id);
        if (!hist) {
            return;
        }
        const render = (stats) => {
            const $bars = $this.selectAll('div.bar').data(stats.hist);
            $bars.enter().append('div').classed('bar', true);
            const sx = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].ordinal().domain(__WEBPACK_IMPORTED_MODULE_0_d3__["range"](stats.hist.length).map(String)).rangeBands([0, 100], 0.1);
            const sy = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([0, stats.maxBin]).range([0, 100]);
            $bars.style({
                left: (_d, i) => `${sx(String(i))}%`,
                width: `${sx.rangeBand()}%`,
                top: (d) => `${100 - sy(d.y)}%`,
                height: (d) => `${sy(d.y)}%`
            }).attr({
                title: (d, i) => `Bin ${i}: ${d.y}`,
                'data-x': (d) => d.x
            });
            $bars.exit().remove();
            let $mean = $this.select('div.mean');
            if ($mean.empty()) {
                $mean = $this.append('div').classed('mean', true);
            }
            $mean.style('left', `${stats.mean * 100}%`);
        };
        if (hist instanceof Promise) {
            hist.then(render);
        }
        else {
            render(hist);
        }
    }
    renderStringSummary(col, $this) {
        const f = col.getFilter();
        $this.text(f === null ? '' : f.toString());
    }
    renderSelectionSummary(col, $this) {
        let $i = $this.select('i');
        if ($i.empty()) {
            $i = $this.append('i')
                .attr('class', 'fa fa-square-o')
                .attr('title', 'Toggle Select All');
        }
        $i.on('click', () => {
            if ($i.classed('fa-square-o')) {
                const all = col.findMyRanker().getOrder();
                $i.attr('class', 'fa fa-check-square-o');
                this.data.setSelection(all);
            }
            else {
                $i.attr('class', 'fa fa-square-o');
                this.data.clearSelection();
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HeaderRenderer;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_header__ = __webpack_require__(18);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */





class PoolEntry {
    constructor(desc) {
        this.desc = desc;
        this.used = 0;
    }
}
class PoolRenderer {
    constructor(data, parent, options = {}) {
        this.data = data;
        this.options = {
            layout: 'vertical',
            elemWidth: 100,
            elemHeight: 40,
            width: 100,
            height: 500,
            additionalDesc: [],
            hideUsed: true,
            addAtEndOnClick: false
        };
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["p" /* merge */])(this.options, options);
        this.$node = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(parent).append('div').classed('lu-pool', true);
        this.changeDataStorage(data);
    }
    changeDataStorage(data) {
        if (this.data) {
            this.data.on(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["u" /* suffix */])('.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_RANKING, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_RANKING, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_DESC), null);
        }
        this.data = data;
        this.entries = data.getColumns().concat(this.options.additionalDesc).map((d) => new PoolEntry(d));
        data.on(`${__WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_DESC}.pool`, (desc) => {
            this.entries.push(new PoolEntry(desc));
            this.update();
        });
        if (!this.options.hideUsed) {
            return;
        }
        const that = this;
        data.on(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["u" /* suffix */])('.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_COLUMN), function (col) {
            const desc = col.desc, change = this.type === 'addColumn' ? 1 : -1;
            that.entries.some((entry) => {
                if (entry.desc !== desc) {
                    return false;
                }
                entry.used += change;
                return true;
            });
            that.update();
        });
        data.on(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["u" /* suffix */])('.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_RANKING, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_RANKING), function (ranking) {
            const descs = ranking.flatColumns.map((d) => d.desc), change = this.type === 'addRanking' ? 1 : -1;
            that.entries.some((entry) => {
                if (descs.indexOf(entry.desc) < 0) {
                    return false;
                }
                entry.used += change;
                return true;
            });
            that.update();
        });
        data.getRankings().forEach((ranking) => {
            const descs = ranking.flatColumns.map((d) => d.desc), change = +1;
            that.entries.some((entry) => {
                if (descs.indexOf(entry.desc) < 0) {
                    return false;
                }
                entry.used += change;
                return true;
            });
        });
    }
    remove() {
        this.$node.remove();
        if (!this.data) {
            return;
        }
        this.data.on(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["u" /* suffix */])('.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_RANKING, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_RANKING, __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_DESC), null);
    }
    update() {
        const data = this.data;
        const descToShow = this.entries.filter((e) => e.used === 0).map((d) => d.desc);
        const $headers = this.$node.selectAll('div.header').data(descToShow);
        const $headerEnter = $headers.enter().append('div').attr({
            'class': 'header',
            'draggable': true
        }).on('dragstart', (d) => {
            const e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            e.dataTransfer.effectAllowed = 'copyMove'; //none, copy, copyLink, copyMove, link, linkMove, move, all
            e.dataTransfer.setData('text/plain', d.label);
            e.dataTransfer.setData('application/caleydo-lineup-column', JSON.stringify(data.toDescRef(d)));
            if (Object(__WEBPACK_IMPORTED_MODULE_2__model__["isNumberColumn"])(d)) {
                e.dataTransfer.setData('application/caleydo-lineup-column-number', JSON.stringify(data.toDescRef(d)));
            }
        }).style({
            width: `${this.options.elemWidth}px`,
            height: `${this.options.elemHeight}px`
        });
        if (this.options.addAtEndOnClick) {
            $headerEnter.on('click', (d) => {
                this.data.push(this.data.getLastRanking(), d);
            });
        }
        $headerEnter.append('span').classed('label', true).text((d) => d.label);
        $headers.attr('class', (d) => `header ${(d.cssClass || '')} ${d.type}`);
        $headers.style({
            'transform': (_d, i) => {
                const pos = this.layout(i);
                return `translate(${pos.x}px,${pos.y}px)`;
            },
            'background-color': (d) => {
                const s = d;
                return s.cssClass ? null : s.color || __WEBPACK_IMPORTED_MODULE_2__model__["Column"].DEFAULT_COLOR;
            }
        });
        $headers.attr({
            title: (d) => Object(__WEBPACK_IMPORTED_MODULE_4__engine_header__["i" /* toFullTooltip */])(d)
        });
        $headers.select('span').text((d) => d.label);
        $headers.exit().remove();
        //compute the size of this node
        switch (this.options.layout) {
            case 'horizontal':
                this.$node.style({
                    width: `${this.options.elemWidth * descToShow.length}px`,
                    height: `${this.options.elemHeight}px`
                });
                break;
            case 'grid':
                const perRow = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["round"])(this.options.width / this.options.elemWidth, 0);
                this.$node.style({
                    width: `${perRow * this.options.elemWidth}px`,
                    height: `${Math.ceil(descToShow.length / perRow) * this.options.elemHeight}px`
                });
                break;
            //case 'vertical':
            default:
                this.$node.style({
                    width: `${this.options.elemWidth}px`,
                    height: `${this.options.elemHeight * descToShow.length}px`
                });
                break;
        }
    }
    layout(i) {
        switch (this.options.layout) {
            case 'horizontal':
                return { x: i * this.options.elemWidth, y: 0 };
            case 'grid':
                const perRow = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["round"])(this.options.width / this.options.elemWidth, 0);
                return { x: (i % perRow) * this.options.elemWidth, y: Math.floor(i / perRow) * this.options.elemHeight };
            //case 'vertical':
            default:
                return { x: 0, y: i * this.options.elemHeight };
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PoolRenderer;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRenderer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_EngineRenderer__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SeparatedRenderer__ = __webpack_require__(132);


function createRenderer(type = 'svg', data, parent, options = {}) {
    if (type === 'engine') {
        return new __WEBPACK_IMPORTED_MODULE_0__engine_EngineRenderer__["a" /* default */](data, parent, options);
    }
    return new __WEBPACK_IMPORTED_MODULE_1__SeparatedRenderer__["a" /* default */](data, parent, options, type);
}


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ABodyRenderer__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__renderer__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lineupengine_src_logic__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lineupengine_src_table_MultiTableRowRenderer__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_Ranking__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SlopeGraph__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__EngineRanking__ = __webpack_require__(124);
/**
 * Created by Samuel Gratzl on 18.07.2017.
 */












class EngineRenderer extends __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* AEventDispatcher */] {
    constructor(data, parent, options) {
        super();
        this.data = data;
        this.histCache = new Map();
        this.rankings = [];
        this.slopeGraphs = [];
        this.updateAbles = [];
        this.zoomFactor = 1;
        this.options = options;
        this.node = parent.ownerDocument.createElement('main');
        parent.appendChild(this.node);
        this.ctx = {
            provider: data,
            filters: this.options.header.filters,
            summaries: this.options.header.summaries ? this.options.header.summaries : {},
            linkTemplates: this.options.header.linkTemplates,
            autoRotateLabels: false,
            searchAble: this.options.header.searchAble,
            option: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* findOption */])(Object.assign({ useGridLayout: true }, this.options.body)),
            statsOf: (col) => {
                const r = this.histCache.get(col.id);
                if (r == null || r instanceof Promise) {
                    return null;
                }
                return r;
            },
            renderer: (col, imposer) => Object(__WEBPACK_IMPORTED_MODULE_3__renderer__["createDOM"])(col, this.options.renderers, this.ctx, imposer),
            groupRenderer: (col, imposer) => Object(__WEBPACK_IMPORTED_MODULE_3__renderer__["createDOMGroup"])(col, this.options.renderers, this.ctx, imposer),
            idPrefix: this.options.idPrefix,
            totalNumberOfRows: 0,
            createRenderer: (col, imposer) => {
                const single = Object(__WEBPACK_IMPORTED_MODULE_3__renderer__["createDOM"])(col, this.options.renderers, this.ctx, imposer);
                const group = Object(__WEBPACK_IMPORTED_MODULE_3__renderer__["createDOMGroup"])(col, this.options.renderers, this.ctx, imposer);
                return { single, group, singleId: col.getRendererType(), groupId: col.getGroupRenderer() };
            },
            getPossibleRenderer: (col) => ({ item: Object(__WEBPACK_IMPORTED_MODULE_3__renderer__["possibleRenderer"])(col, this.options.renderers), group: Object(__WEBPACK_IMPORTED_MODULE_3__renderer__["possibleGroupRenderer"])(col, this.options.renderers) }),
            columnPadding: this.options.body.columnPadding || 5
        };
        this.node.id = this.options.idPrefix;
        this.table = new __WEBPACK_IMPORTED_MODULE_8_lineupengine_src_table_MultiTableRowRenderer__["a" /* default */](this.node, `#${options.idPrefix}`);
        this.initProvider(data);
    }
    zoomOut() {
        this.zoomFactor = Math.max(this.zoomFactor - 0.1, 0.5);
        this.updateZoomFactor();
        this.update();
    }
    zoomIn() {
        this.zoomFactor = Math.min(this.zoomFactor + 0.1, 2.0);
        this.updateZoomFactor();
        this.update();
    }
    updateZoomFactor() {
        const body = this.node.querySelector('main');
        body.style.fontSize = `${this.zoomFactor * 100}%`;
    }
    pushUpdateAble(updateAble) {
        this.updateAbles.push(updateAble);
    }
    createEventList() {
        return super.createEventList().concat([EngineRenderer.EVENT_HOVER_CHANGED, EngineRenderer.EVENT_RENDER_FINISHED]);
    }
    changeDataStorage(data) {
        this.takeDownProvider();
        this.data = data;
        this.ctx.provider = data;
        this.initProvider(data);
    }
    takeDownProvider() {
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.body`, null);
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_ADD_RANKING}.body`, null);
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_RANKING}.body`, null);
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_GROUP_AGGREGATION_CHANGED}.body`, null);
        this.rankings.forEach((r) => this.table.remove(r));
        this.rankings.splice(0, this.rankings.length);
        this.slopeGraphs.forEach((s) => this.table.remove(s));
        this.slopeGraphs.splice(0, this.slopeGraphs.length);
    }
    initProvider(data) {
        data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.body`, () => this.updateSelection(data.getSelection()));
        data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_ADD_RANKING}.body`, (ranking) => {
            this.addRanking(ranking);
        });
        data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_RANKING}.body`, (ranking) => {
            this.removeRanking(ranking);
        });
        data.on(`${__WEBPACK_IMPORTED_MODULE_2__provider_ADataProvider__["a" /* default */].EVENT_GROUP_AGGREGATION_CHANGED}.body`, (ranking) => {
            this.update(this.rankings.filter((r) => r.ranking === ranking));
        });
        this.data.getRankings().forEach((r) => this.addRanking(r));
    }
    updateSelection(dataIndices) {
        const s = new Set(dataIndices);
        this.rankings.forEach((r) => r.updateSelection(s));
        this.slopeGraphs.forEach((r) => r.updateSelection(s));
    }
    updateHist(ranking) {
        if (!this.options.header.summary) {
            return;
        }
        const rankings = ranking ? [ranking] : this.rankings;
        rankings.forEach((r) => {
            const ranking = r.ranking;
            const order = ranking.getOrder();
            const cols = ranking.flatColumns;
            const histo = order == null ? null : this.data.stats(order);
            cols.filter((d) => d instanceof __WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__["d" /* default */] && !d.isHidden()).forEach((col) => {
                this.histCache.set(col.id, histo === null ? null : histo.stats(col));
            });
            cols.filter((d) => Object(__WEBPACK_IMPORTED_MODULE_5__model_CategoricalColumn__["b" /* isCategoricalColumn */])(d) && !d.isHidden()).forEach((col) => {
                this.histCache.set(col.id, histo === null ? null : histo.hist(col));
            });
            r.updateHeaders();
        });
        this.updateAbles.forEach((u) => u(this.ctx));
    }
    addRanking(ranking) {
        if (this.rankings.length > 0) {
            // add slope graph first
            const s = this.table.pushSeparator((header, body) => new __WEBPACK_IMPORTED_MODULE_10__SlopeGraph__["a" /* default */](header, body, `${ranking.id}S`, this.ctx));
            this.slopeGraphs.push(s);
        }
        const r = this.table.pushTable((header, body, tableId, style) => new __WEBPACK_IMPORTED_MODULE_11__EngineRanking__["a" /* default */](ranking, header, body, tableId, style, this.ctx, {
            animation: this.options.body.animation,
            customRowUpdate: this.options.body.customRowUpdate || (() => undefined)
        }));
        r.on(__WEBPACK_IMPORTED_MODULE_11__EngineRanking__["a" /* default */].EVENT_WIDTH_CHANGED, () => this.table.widthChanged());
        r.on(__WEBPACK_IMPORTED_MODULE_11__EngineRanking__["a" /* default */].EVENT_UPDATE_DATA, () => this.update([r]));
        ranking.on(`${__WEBPACK_IMPORTED_MODULE_9__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED}.renderer`, () => this.updateHist(r));
        this.rankings.push(r);
        this.update([r]);
    }
    removeRanking(ranking) {
        const index = this.rankings.findIndex((r) => r.ranking === ranking);
        if (index < 0) {
            return; // error
        }
        const section = this.rankings.splice(index, 1)[0];
        const slope = this.slopeGraphs.splice(index - 1, 1)[0];
        this.table.remove(section);
        if (slope) {
            this.table.remove(slope);
        }
    }
    update(rankings = this.rankings) {
        rankings = rankings.filter((d) => !d.hidden);
        if (rankings.length === 0) {
            return;
        }
        const orders = rankings.map((r) => r.ranking.getOrder());
        const data = this.data.fetch(orders);
        this.ctx.totalNumberOfRows = Math.max(...data.map((d) => d.length));
        // TODO support async
        const localData = data.map((d) => d.map((d) => d));
        if (this.histCache.size === 0) {
            this.updateHist();
        }
        const round2 = (v) => Object(__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* round */])(v, 2);
        const heightsFor = (ranking, data) => {
            if (this.options.body.dynamicHeight) {
                const impl = this.options.body.dynamicHeight(data, ranking);
                return {
                    defaultHeight: round2(this.zoomFactor * impl.defaultHeight),
                    height: (d) => round2(this.zoomFactor * impl.height(d))
                };
            }
            const item = round2(this.zoomFactor * this.options.body.rowHeight);
            const group = round2(this.zoomFactor * this.options.body.groupHeight);
            return {
                defaultHeight: item,
                height: (d) => Object(__WEBPACK_IMPORTED_MODULE_4__interfaces__["a" /* isGroup */])(d) ? group : item
            };
        };
        const groupPadding = round2(this.zoomFactor * this.options.body.groupPadding);
        const rowPadding = round2(this.zoomFactor * this.options.body.rowPadding);
        rankings.forEach((r, i) => {
            const grouped = r.groupData(localData[i]);
            const { height, defaultHeight } = heightsFor(r.ranking, grouped);
            const rowContext = Object(__WEBPACK_IMPORTED_MODULE_7_lineupengine_src_logic__["b" /* nonUniformContext */])(grouped.map(height), defaultHeight, (index) => {
                if (index >= 0 && grouped[index] && (Object(__WEBPACK_IMPORTED_MODULE_4__interfaces__["a" /* isGroup */])(grouped[index]) || grouped[index].meta === 'last' || grouped[index].meta === 'first last')) {
                    return groupPadding + rowPadding;
                }
                return rowPadding;
            });
            r.render(grouped, rowContext);
        });
        this.updateSlopeGraphs(rankings);
        this.table.widthChanged();
    }
    updateSlopeGraphs(rankings = this.rankings) {
        const indices = new Set(rankings.map((d) => this.rankings.indexOf(d)));
        this.slopeGraphs.forEach((s, i) => {
            if (s.hidden) {
                return;
            }
            const left = i;
            const right = i + 1;
            if (!indices.has(left) && !indices.has(right)) {
                return;
            }
            const leftRanking = this.rankings[left];
            const rightRanking = this.rankings[right];
            s.rebuild(leftRanking.currentData, leftRanking.context, rightRanking.currentData, rightRanking.context);
        });
    }
    fakeHover(dataIndex) {
        this.rankings.forEach((r) => r.fakeHover(dataIndex));
    }
    destroy() {
        this.takeDownProvider();
        this.table.destroy();
        this.node.remove();
    }
    scrollIntoView(_index) {
        // TODO
    }
    setBodyOption(_option, _value) {
        // TODO
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EngineRenderer;

EngineRenderer.EVENT_HOVER_CHANGED = __WEBPACK_IMPORTED_MODULE_1__ABodyRenderer__["a" /* default */].EVENT_HOVER_CHANGED;
EngineRenderer.EVENT_RENDER_FINISHED = __WEBPACK_IMPORTED_MODULE_1__ABodyRenderer__["a" /* default */].EVENT_RENDER_FINISHED;


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_PoolRenderer__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_interfaces__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_factory__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__utils__["g"]; });
/**
 * main module of LineUp.js containing the main class and exposes all other modules
 * Created by Samuel Gratzl on 14.08.2015.
 */








/**
 * main LineUp class managing data and rendering
 */
class LineUp extends __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* AEventDispatcher */] {
    constructor(container, data, config = {}) {
        super();
        this.data = data;
        /**
         * default config of LineUp with all available options
         */
        this.config = Object(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* defaultConfig */])();
        this.pools = [];
        /**
         * local variable that is used by update()
         * @type {boolean}
         */
        this.isUpdateInitialized = false;
        const $base = container instanceof __WEBPACK_IMPORTED_MODULE_3_d3__["selection"] ? container : Object(__WEBPACK_IMPORTED_MODULE_3_d3__["select"])(container);
        this.$container = $base.append('div').classed('lu', true);
        Object(__WEBPACK_IMPORTED_MODULE_2__utils__["p" /* merge */])(this.config, config);
        //backwards compatibility
        if (this.config.renderingOptions.histograms === true) {
            this.config.renderingOptions.summary = true;
        }
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.main`, this.triggerSelection.bind(this));
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_JUMP_TO_NEAREST}.main`, this.jumpToNearest.bind(this));
        this.renderer = Object(__WEBPACK_IMPORTED_MODULE_6__ui_factory__["a" /* createRenderer */])(this.config.body.renderer, this.data, this.node, this.config);
        this.forward(this.renderer, LineUp.EVENT_HOVER_CHANGED);
        if (this.config.pool && this.config.manipulative) {
            this.addPool(new __WEBPACK_IMPORTED_MODULE_1__ui_PoolRenderer__["a" /* default */](data, this.node, this.config.pool));
        }
    }
    createEventList() {
        return super.createEventList().concat([LineUp.EVENT_HOVER_CHANGED, LineUp.EVENT_SELECTION_CHANGED, LineUp.EVENT_MULTISELECTION_CHANGED, LineUp.EVENT_UPDATE_START, LineUp.EVENT_UPDATE_FINISHED]);
    }
    addPool(poolOrNode, config = typeof (this.config.pool) === 'boolean' ? {} : this.config.pool) {
        if (poolOrNode instanceof __WEBPACK_IMPORTED_MODULE_1__ui_PoolRenderer__["a" /* default */]) {
            this.pools.push(poolOrNode);
        }
        else {
            this.pools.push(new __WEBPACK_IMPORTED_MODULE_1__ui_PoolRenderer__["a" /* default */](this.data, poolOrNode, config));
        }
        return this.pools[this.pools.length - 1];
    }
    /**
     * returns the main lineup DOM element
     * @returns {Element}
     */
    get node() {
        return this.$container.node();
    }
    /**
     * destroys the DOM elements created by this lineup instance, this should be the last call to this lineup instance
     */
    destroy() {
        this.pools.forEach((p) => p.remove());
        this.$container.remove();
        this.renderer.destroy();
    }
    /**
     * sorts LineUp by he given column
     * @param column callback function finding the column to sort
     * @param ascending
     * @returns {boolean}
     */
    sortBy(column, ascending = false) {
        const col = this.data.find(column);
        if (col) {
            col.sortByMe(ascending);
        }
        return col !== null;
    }
    dump() {
        return this.data.dump();
    }
    changeDataStorage(data, dump) {
        if (this.data) {
            this.data.on([`${__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.main`, `${__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_JUMP_TO_NEAREST}.main`], null);
        }
        this.data = data;
        if (dump) {
            this.data.restore(dump);
        }
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED}.main`, this.triggerSelection.bind(this));
        this.data.on(`${__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_JUMP_TO_NEAREST}.main`, this.jumpToNearest.bind(this));
        this.renderer.changeDataStorage(data);
        this.pools.forEach((p) => p.changeDataStorage(data));
        this.update();
    }
    triggerSelection(dataIndices) {
        this.fire(LineUp.EVENT_SELECTION_CHANGED, dataIndices.length > 0 ? dataIndices[0] : -1);
        this.fire(LineUp.EVENT_MULTISELECTION_CHANGED, dataIndices);
    }
    jumpToNearest(dataIndices) {
        const ranking = this.data.getRankings()[0];
        if (dataIndices.length === 0 || ranking === undefined) {
            return;
        }
        const order = ranking.getOrder();
        //relative order
        const indices = dataIndices.map((d) => order.indexOf(d)).sort((a, b) => a - b);
        this.renderer.scrollIntoView(order.length, indices[0]);
        //fake hover in 100ms - TODO right timing
        setTimeout(() => {
            this.renderer.fakeHover(order[indices[0]]);
        }, 100);
    }
    restore(dump) {
        this.changeDataStorage(this.data, dump);
    }
    update() {
        // HACK: when calling update for the first time the BodyRenderer
        // fires 3x the `renderFinished` event. However, we want to wait for
        // the last event before firing LineUp.EVENT_UPDATE_FINISHED.
        // For any further call of update() the body render will fire the
        // `renderFinished` event only once
        let waitForBodyRenderer = (this.isUpdateInitialized) ? 1 : 3;
        this.isUpdateInitialized = true;
        this.fire(LineUp.EVENT_UPDATE_START);
        this.renderer.update();
        this.pools.forEach((p) => p.update());
        this.renderer.on(`${__WEBPACK_IMPORTED_MODULE_5__ui_interfaces__["b" /* RENDERER_EVENT_RENDER_FINISHED */]}.main`, () => {
            waitForBodyRenderer -= 1;
            if (waitForBodyRenderer === 0) {
                this.fire(LineUp.EVENT_UPDATE_FINISHED);
            }
        });
    }
    changeRenderingOption(option, value) {
        this.config.renderingOptions[option] = value;
        if (option === 'animation' || option === 'stacked') {
            this.renderer.setBodyOption(option, value);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineUp;

/**
 * triggered when the mouse is over a specific row
 * @argument data_index:number the selected data index or <0 if no row
 */
LineUp.EVENT_HOVER_CHANGED = __WEBPACK_IMPORTED_MODULE_5__ui_interfaces__["a" /* RENDERER_EVENT_HOVER_CHANGED */];
/**
 * triggered when the user click on a row
 * @argument data_index:number the selected data index or <0 if no row
 */
LineUp.EVENT_SELECTION_CHANGED = __WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED;
/**
 * triggered when the user selects one or more rows
 * @argument dataIndices:number[] the selected data indices
 */
LineUp.EVENT_MULTISELECTION_CHANGED = 'multiSelectionChanged';
/**
 * triggered when LineUpJS.update() was called
 */
LineUp.EVENT_UPDATE_START = 'updateStart';
/**
 * triggered when LineUpJS.update() was called and the rendering the body has finished
 */
LineUp.EVENT_UPDATE_FINISHED = 'updateFinished';


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StackColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);
/**
 * Created by sam on 04.11.2016.
 */





class MultiLevelCompositeColumn extends __WEBPACK_IMPORTED_MODULE_0__CompositeColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        /**
         * whether this stack column is collapsed i.e. just looks like an ordinary number column
         * @type {boolean}
         * @private
         */
        this.collapsed = false;
        const that = this;
        this.adaptChange = function (old, newValue) {
            that.adaptWidthChange(old, newValue);
        };
    }
    createEventList() {
        return super.createEventList().concat([MultiLevelCompositeColumn.EVENT_COLLAPSE_CHANGED, MultiLevelCompositeColumn.EVENT_MULTI_LEVEL_CHANGED]);
    }
    setCollapsed(value) {
        if (this.collapsed === value) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_2__StackColumn__["b" /* default */].EVENT_COLLAPSE_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.collapsed, this.collapsed = value);
    }
    getCollapsed() {
        return this.collapsed;
    }
    dump(toDescRef) {
        const r = super.dump(toDescRef);
        r.collapsed = this.collapsed;
        return r;
    }
    restore(dump, factory) {
        this.collapsed = dump.collapsed === true;
        super.restore(dump, factory);
    }
    flatten(r, offset, levelsToGo = 0, padding = 0) {
        return __WEBPACK_IMPORTED_MODULE_2__StackColumn__["b" /* default */].prototype.flatten.call(this, r, offset, levelsToGo, padding);
    }
    /**
     * inserts a column at a the given position
     * @param col
     * @param index
     */
    insert(col, index) {
        col.on(`${__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED}.stack`, this.adaptChange);
        //increase my width
        super.setWidth(this.length === 0 ? col.getWidth() : (this.getWidth() + col.getWidth()));
        return super.insert(col, index);
    }
    /**
     * adapts weights according to an own width change
     * @param oldValue
     * @param newValue
     */
    adaptWidthChange(oldValue, newValue) {
        if (Object(__WEBPACK_IMPORTED_MODULE_4__utils__["t" /* similar */])(oldValue, newValue, 0.5)) {
            return;
        }
        const act = this.getWidth();
        const next = act + (newValue - oldValue);
        this.fire([MultiLevelCompositeColumn.EVENT_MULTI_LEVEL_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], act, next);
        super.setWidth(next);
    }
    removeImpl(child) {
        child.on(`${__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED}.stack`, null);
        super.setWidth(this.length === 0 ? 100 : this.getWidth() - child.getWidth());
        return super.removeImpl(child);
    }
    setWidth(value) {
        const act = this.getWidth();
        const factor = value / act;
        this._children.forEach((child) => {
            //disable since we change it
            child.setWidthImpl(child.getWidth() * factor);
        });
        if (!Object(__WEBPACK_IMPORTED_MODULE_4__utils__["t" /* similar */])(act, value, 0.5)) {
            this.fire([MultiLevelCompositeColumn.EVENT_MULTI_LEVEL_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], act, value);
        }
        super.setWidth(value);
    }
    getRendererType() {
        if (this.getCollapsed()) {
            return MultiLevelCompositeColumn.EVENT_COLLAPSE_CHANGED;
        }
        return super.getRendererType();
    }
    isMissing(row, index) {
        if (this.getCollapsed()) {
            return this._children.some((c) => (Object(__WEBPACK_IMPORTED_MODULE_3__INumberColumn__["h" /* isNumberColumn */])(c) || Object(__WEBPACK_IMPORTED_MODULE_0__CompositeColumn__["b" /* isMultiLevelColumn */])(c)) && c.isMissing(row, index));
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiLevelCompositeColumn;

MultiLevelCompositeColumn.EVENT_COLLAPSE_CHANGED = __WEBPACK_IMPORTED_MODULE_2__StackColumn__["b" /* default */].EVENT_COLLAPSE_CHANGED;
MultiLevelCompositeColumn.EVENT_MULTI_LEVEL_CHANGED = __WEBPACK_IMPORTED_MODULE_2__StackColumn__["b" /* default */].EVENT_MULTI_LEVEL_CHANGED;


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missing__ = __webpack_require__(5);
/**
 * Created by bikramkawan on 24/11/2016.
 */


class BooleansColumn extends __WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.dataLength = desc.dataLength;
        this.categories = [];
        for (let i = 0; i < this.dataLength; ++i) {
            this.categories.push(`Category #${i + 1}`);
        }
        this.setDefaultRenderer('upset');
    }
    get categoryLabels() {
        return this.categories;
    }
    get categoryColors() {
        return ['green', 'red'];
    }
    getCategories(row, index) {
        const flagged = this.getValue(row, index);
        return this.categories.filter((_d, i) => flagged != null && flagged[i]);
    }
    getColor(row, index) {
        const flagged = this.getValue(row, index);
        return flagged ? 'green' : 'red';
    }
    compare(a, b, aIndex, bIndex) {
        const aVal = this.getValue(a, aIndex);
        const bVal = this.getValue(b, bIndex);
        if (aVal === null) {
            return bVal === null ? 0 : __WEBPACK_IMPORTED_MODULE_1__missing__["a" /* FIRST_IS_NAN */];
        }
        if (bVal === null) {
            return __WEBPACK_IMPORTED_MODULE_1__missing__["a" /* FIRST_IS_NAN */] * -1;
        }
        const aCat = aVal.filter((x) => x).length;
        const bCat = bVal.filter((x) => x).length;
        return (aCat - bCat);
    }
    getDataLength() {
        return this.dataLength;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BooleansColumn;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3__);
/**
 * Created by sam on 04.11.2016.
 */



class DateColumn extends __WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */] {
    constructor(id, desc) {
        super(id, desc);
        this.format = __WEBPACK_IMPORTED_MODULE_2_d3__["time"].format(desc.dateFormat || '%x');
        this.parse = desc.dateParse ? __WEBPACK_IMPORTED_MODULE_2_d3__["time"].format(desc.dateParse).parse : this.format.parse;
        this.setDefaultRenderer('default');
    }
    getValue(row, index) {
        const v = super.getValue(row, index);
        if (Object(__WEBPACK_IMPORTED_MODULE_1__missing__["b" /* isMissingValue */])(v)) {
            return null;
        }
        if (v instanceof Date) {
            return v;
        }
        return this.parse(String(v));
    }
    getLabel(row, index) {
        const v = this.getValue(row, index);
        if (!(v instanceof Date)) {
            return '';
        }
        return this.format(v);
    }
    compare(a, b, aIndex, bIndex) {
        const av = this.getValue(a, aIndex);
        const bv = this.getValue(b, bIndex);
        if (av === bv) {
            return 0;
        }
        if (!(av instanceof Date)) {
            return (bv instanceof Date) ? __WEBPACK_IMPORTED_MODULE_1__missing__["a" /* FIRST_IS_NAN */] : 0;
        }
        if (!(bv instanceof Date)) {
            return __WEBPACK_IMPORTED_MODULE_1__missing__["a" /* FIRST_IS_NAN */] * -1;
        }
        return av.getTime() - bv.getTime();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DateColumn;



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ACommonDataProvider__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_Group__ = __webpack_require__(24);
/**
 * Created by sam on 04.11.2016.
 */




/**
 * a data provider based on an local array
 */
class LocalDataProvider extends __WEBPACK_IMPORTED_MODULE_1__ACommonDataProvider__["a" /* default */] {
    constructor(_data, columns = [], options = {}) {
        super(columns, options);
        this._data = _data;
        this.options = {
            /**
             * whether the filter should be applied to all rankings regardless where they are
             */
            filterGlobally: false,
            jumpToSearchResult: false,
            maxNestedSortingCriteria: 1,
            maxGroupColumns: 1
        };
        Object.assign(this.options, options);
        const that = this;
        this.reorderAll = function () {
            //fire for all other rankings a dirty order event, too
            const ranking = this.source;
            that.getRankings().forEach((r) => {
                if (r !== ranking) {
                    r.dirtyOrder();
                }
            });
        };
    }
    getMaxGroupColumns() {
        return this.options.maxGroupColumns;
    }
    getMaxNestedSortingCriteria() {
        return this.options.maxNestedSortingCriteria;
    }
    get data() {
        return this._data;
    }
    /**
     * replaces the dataset rows with a new one
     * @param data
     */
    setData(data) {
        this._data = data;
        this.reorderAll();
    }
    clearData() {
        this.setData([]);
    }
    /**
     * append rows to the dataset
     * @param data
     */
    appendData(data) {
        this._data.push(...data);
        this.reorderAll();
    }
    cloneRanking(existing) {
        const clone = super.cloneRanking(existing);
        if (this.options.filterGlobally) {
            clone.on(`${__WEBPACK_IMPORTED_MODULE_0__model_Column__["a" /* default */].EVENT_FILTER_CHANGED}.reorderAll`, this.reorderAll);
        }
        return clone;
    }
    cleanUpRanking(ranking) {
        if (this.options.filterGlobally) {
            ranking.on(`${__WEBPACK_IMPORTED_MODULE_0__model_Column__["a" /* default */].EVENT_FILTER_CHANGED}.reorderAll`, null);
        }
        super.cleanUpRanking(ranking);
    }
    sortImpl(ranking) {
        if (this._data.length === 0) {
            return [];
        }
        //wrap in a helper and store the initial index
        let helper = this._data.map((r, i) => ({ v: r, dataIndex: i, group: null }));
        //do the optional filtering step
        if (this.options.filterGlobally) {
            const filtered = this.getRankings().filter((d) => d.isFiltered());
            if (filtered.length > 0) {
                helper = helper.filter((d) => filtered.every((f) => f.filter(d.v, d.dataIndex)));
            }
        }
        else if (ranking.isFiltered()) {
            helper = helper.filter((d) => ranking.filter(d.v, d.dataIndex));
        }
        if (helper.length === 0) {
            return [];
        }
        //create the groups for each row
        helper.forEach((r) => r.group = ranking.grouper(r.v, r.dataIndex) || __WEBPACK_IMPORTED_MODULE_3__model_Group__["a" /* defaultGroup */]);
        if ((new Set(helper.map((r) => r.group.name))).size === 1) {
            const group = helper[0].group;
            //no need to split
            //sort by the ranking column
            helper.sort((a, b) => ranking.comparator(a.v, b.v, a.dataIndex, b.dataIndex));
            //store the ranking index and create an argsort version, i.e. rank 0 -> index i
            const order = helper.map((r) => r.dataIndex);
            return [Object.assign({ order }, group)];
        }
        //sort by group and within by order
        helper.sort((a, b) => {
            const ga = a.group;
            const gb = b.group;
            if (ga.name !== gb.name) {
                return ga.name.toLowerCase().localeCompare(gb.name.toLowerCase());
            }
            return ranking.comparator(a.v, b.v, a.dataIndex, b.dataIndex);
        });
        //iterate over groups and create within orders
        const groups = [Object.assign({ order: [], rows: [] }, helper[0].group)];
        let group = groups[0];
        helper.forEach((row) => {
            const rowGroup = row.group;
            if (rowGroup.name === group.name) {
                group.order.push(row.dataIndex);
                group.rows.push(row);
            }
            else {
                group = Object.assign({ order: [row.dataIndex], rows: [row] }, rowGroup);
                groups.push(group);
            }
        });
        // sort groups
        groups.sort((a, b) => ranking.groupComparator(a, b));
        return groups;
    }
    viewRaw(indices) {
        //filter invalid indices
        return indices.map((index) => this._data[index]);
    }
    view(indices) {
        return this.viewRaw(indices);
    }
    fetch(orders) {
        return orders.map((order) => order.map((index) => ({
            v: this._data[index],
            dataIndex: index
        })));
    }
    /**
     * helper for computing statistics
     * @param indices
     * @returns {{stats: (function(INumberColumn): *), hist: (function(ICategoricalColumn): *)}}
     */
    stats(indices) {
        let d = null;
        const getD = () => {
            if (d === null) {
                d = this.viewRaw(indices);
            }
            return d;
        };
        return {
            stats: (col) => Object(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* computeStats */])(getD(), indices, col.getNumber.bind(col), col.isMissing.bind(col), [0, 1]),
            hist: (col) => Object(__WEBPACK_IMPORTED_MODULE_2__math__["a" /* computeHist */])(getD(), indices, col.getCategories.bind(col), col.categories)
        };
    }
    mappingSample(col) {
        const MAX_SAMPLE = 500; //at most 500 sample lines
        const l = this._data.length;
        if (l <= MAX_SAMPLE) {
            return this._data.map(col.getRawNumber.bind(col));
        }
        //randomly select 500 elements
        const indices = [];
        for (let i = 0; i < MAX_SAMPLE; ++i) {
            let j = Math.floor(Math.random() * (l - 1));
            while (indices.indexOf(j) >= 0) {
                j = Math.floor(Math.random() * (l - 1));
            }
            indices.push(j);
        }
        return indices.map((i) => col.getRawNumber(this.data[i], i));
    }
    searchAndJump(search, col) {
        //case insensitive search
        search = typeof search === 'string' ? search.toLowerCase() : search;
        const f = typeof search === 'string' ? (v) => v.toLowerCase().indexOf(search) >= 0 : search.test.bind(search);
        const indices = [];
        for (let i = 0; i < this._data.length; ++i) {
            if (f(col.getLabel(this._data[i], i))) {
                indices.push(i);
            }
        }
        this.jumpToNearest(indices);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LocalDataProvider;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ACommonDataProvider__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Group__ = __webpack_require__(24);
/**
 * Created by sam on 04.11.2016.
 */


/**
 * a remote implementation of the data provider
 */
class RemoteDataProvider extends __WEBPACK_IMPORTED_MODULE_0__ACommonDataProvider__["a" /* default */] {
    constructor(server, columns = [], options = {}) {
        super(columns, options);
        this.server = server;
        this.options = {
            maxCacheSize: 1000
        };
        this.cache = new Map();
        Object.assign(this.options, options);
    }
    sortImpl(ranking) {
        //generate a description of what to sort
        const desc = ranking.toSortingDesc((desc) => desc.column);
        //use the server side to sort
        return this.server.sort(desc).then((order) => [Object.assign({ order }, __WEBPACK_IMPORTED_MODULE_1__model_Group__["a" /* defaultGroup */])]);
    }
    loadFromServer(indices) {
        return this.server.view(indices).then((view) => {
            //enhance with the data index
            return view.map((v, i) => {
                const dataIndex = indices[i];
                return { v, dataIndex };
            });
        });
    }
    view(indices) {
        if (indices.length === 0) {
            return Promise.resolve([]);
        }
        const base = this.fetch([indices])[0];
        return Promise.all(base).then((rows) => rows.map((d) => d.v));
    }
    computeMissing(orders) {
        const union = new Set();
        const unionAdd = union.add.bind(union);
        orders.forEach((order) => order.forEach(unionAdd));
        // removed cached
        this.cache.forEach((_v, k) => union.delete(k));
        if ((this.cache.size + union.size) > this.options.maxCacheSize) {
            // clean up cache
        }
        // const maxLength = Math.max(...orders.map((o) => o.length));
        return Array.from(union);
    }
    loadInCache(missing) {
        if (missing.length === 0) {
            return;
        }
        // load data and map to rows;
        const v = this.loadFromServer(missing);
        missing.forEach((_m, i) => {
            const dataIndex = missing[i];
            this.cache.set(dataIndex, v.then((loaded) => ({ v: loaded[i], dataIndex })));
        });
    }
    fetch(orders) {
        const toLoad = this.computeMissing(orders);
        this.loadInCache(toLoad);
        return orders.map((order) => order.map((dataIndex) => this.cache.get(dataIndex)));
    }
    mappingSample(col) {
        return this.server.mappingSample(col.desc.column);
    }
    searchAndJump(search, col) {
        this.server.search(search, col.desc.column).then((indices) => {
            this.jumpToNearest(indices);
        });
    }
    stats(indices) {
        return this.server.stats(indices);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RemoteDataProvider;



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__impose__ = __webpack_require__(21);





/**
 * a renderer rendering a bar for numerical columns
 */
class BarCellRenderer {
    /**
     * flag to always render the value
     * @type {boolean}
     */
    constructor(renderValue = false) {
        this.renderValue = renderValue;
        this.title = 'Bar';
    }
    canRender(col, isGroup) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["h" /* isNumberColumn */])(col) && !isGroup && !Object(__WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["i" /* isNumbersColumn */])(col);
    }
    createDOM(col, _context, imposer) {
        return {
            template: `<div title="">
          <div style='background-color: ${col.color}'>
            <span ${this.renderValue ? '' : 'class="lu-hover-only"'}></span>
          </div>
        </div>`,
            update: (n, d) => {
                const value = col.getNumber(d.v, d.dataIndex);
                const missing = Object(__WEBPACK_IMPORTED_MODULE_3__missing__["b" /* renderMissingDOM */])(n, col, d);
                const w = isNaN(value) ? 0 : Math.round(value * 100 * 100) / 100;
                const title = col.getLabel(d.v, d.dataIndex);
                n.title = title;
                const bar = n.firstElementChild;
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* attr */])(bar, {
                    title
                }, {
                    width: missing ? '100%' : `${w}%`,
                    'background-color': missing ? null : Object(__WEBPACK_IMPORTED_MODULE_4__impose__["a" /* colorOf */])(col, d, imposer)
                });
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__["r" /* setText */])(bar.firstElementChild, title);
            }
        };
    }
    createCanvas(col, context, imposer) {
        const paddingTop = context.option('rowBarTopPadding', context.option('rowBarPadding', 1));
        const paddingBottom = context.option('rowBarBottomPadding', context.option('rowBarPadding', 1));
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_3__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            ctx.fillStyle = Object(__WEBPACK_IMPORTED_MODULE_4__impose__["a" /* colorOf */])(col, d, imposer) || __WEBPACK_IMPORTED_MODULE_0__model_Column__["a" /* default */].DEFAULT_COLOR;
            const width = context.colWidth(col) * col.getNumber(d.v, d.dataIndex);
            ctx.fillRect(0, paddingTop, isNaN(width) ? 0 : width, context.rowHeight(i) - (paddingTop + paddingBottom));
            if (this.renderValue || context.hovered(d.dataIndex) || context.selected(d.dataIndex)) {
                ctx.fillStyle = context.option('style.text', 'black');
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 1, 0, context.colWidth(col) - 1, context.textHints);
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BarCellRenderer;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_StringColumn__ = __webpack_require__(9);


/**
 * renders a string with additional alignment behavior
 * one instance factory shared among strings
 */
class StringCellRenderer {
    constructor() {
        this.alignments = {
            left: new __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */](),
            right: new __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */]('text_right', 'right'),
            center: new __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */]('text_center', 'center')
        };
        this.title = 'Default';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_1__model_StringColumn__["a" /* default */];
    }
    createDOM(col) {
        return this.alignments[col.alignment || 'left'].createDOM(col);
    }
    createCanvas(col, context) {
        return this.alignments[col.alignment || 'left'].createCanvas(col, context);
    }
    createGroupDOM(col) {
        return this.alignments[col.alignment || 'left'].createGroupDOM(col);
    }
    createGroupCanvas(col, context) {
        return this.alignments[col.alignment || 'left'].createGroupCanvas(col, context);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StringCellRenderer;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_SelectionColumn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


class SelectionRenderer {
    constructor() {
        this.title = 'Default';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_0__model_SelectionColumn__["b" /* default */];
    }
    createDOM(col) {
        return {
            template: `<div></div>`,
            update: (n, d) => {
                n.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    col.toggleValue(d.v, d.dataIndex);
                };
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, d) => {
            const bak = ctx.font;
            ctx.font = '10pt FontAwesome';
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, col.getValue(d.v, d.dataIndex) ? '\uf046' : '\uf096', 0, 0, context.colWidth(col), context.textHints);
            ctx.font = bak;
        };
    }
    createGroupCanvas(col, context) {
        return (ctx, group, rows) => {
            const selected = rows.reduce((act, r) => col.getValue(r.v, r.dataIndex) ? act + 1 : act, 0);
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, String(selected), 0, context.groupHeight(group), col.getWidth(), context.textHints);
        };
    }
    createGroupDOM(col) {
        return {
            template: `<div></div>`,
            update: (n, _group, rows) => {
                const selected = rows.reduce((act, r) => col.getValue(r.v, r.dataIndex) ? act + 1 : act, 0);
                const all = selected >= rows.length / 2;
                if (all) {
                    n.classList.add('lu-group-selected');
                }
                else {
                    n.classList.remove('lu-group-selected');
                }
                n.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const value = n.classList.toggle('lu-group-selected');
                    rows.forEach((row) => {
                        col.setValue(row.v, row.dataIndex, value);
                    });
                };
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SelectionRenderer;



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_LinkColumn__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ANoGroupRenderer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missing__ = __webpack_require__(4);




class LinkCellRenderer extends __WEBPACK_IMPORTED_MODULE_2__ANoGroupRenderer__["a" /* ANoGroupRenderer */] {
    constructor() {
        super(...arguments);
        this.title = 'Default';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_0__model_LinkColumn__["a" /* default */];
    }
    createDOM(col) {
        return {
            template: `<div class='link text'></div>`,
            update: (n, d) => {
                Object(__WEBPACK_IMPORTED_MODULE_3__missing__["b" /* renderMissingDOM */])(n, col, d);
                n.innerHTML = col.isLink(d.v, d.dataIndex) ? `<a class="link" href="${col.getValue(d.v, d.dataIndex)}" target="_blank">${col.getLabel(d.v, d.dataIndex)}</a>` : col.getLabel(d.v, d.dataIndex);
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, d, i, dx, dy) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_3__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            const isLink = col.isLink(d.v, d.dataIndex);
            if (!isLink) {
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 0, 0, context.colWidth(col), context.textHints);
                return;
            }
            const hovered = context.hovered(d.dataIndex);
            if (hovered) {
                const overlay = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["s" /* showOverlay */])(context.bodyDOMElement, context.idPrefix + col.id, dx, dy);
                overlay.style.width = `${context.colWidth(col)}px`;
                overlay.innerHTML = `<a class='link' href='${col.getValue(d.v, d.dataIndex)}' target='_blank'>${col.getLabel(d.v, d.dataIndex)}</a>`;
            }
            else {
                const bak = ctx.fillStyle;
                ctx.fillStyle = context.option('style.link', context.option('style.text', 'black'));
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 0, 0, context.colWidth(col), context.textHints);
                ctx.fillStyle = bak;
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LinkCellRenderer;



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_AnnotateColumn__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ANoGroupRenderer__ = __webpack_require__(39);



class AnnotationRenderer extends __WEBPACK_IMPORTED_MODULE_2__ANoGroupRenderer__["a" /* ANoGroupRenderer */] {
    constructor() {
        super(...arguments);
        this.title = 'Default';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_0__model_AnnotateColumn__["a" /* default */];
    }
    createDOM(col) {
        return {
            template: `<div class='annotations text'>
        <input class='lu-hover-only'>
        <span class='text lu-not-hover'></span>
       </div>`,
            update: (n, d) => {
                const input = n.firstElementChild;
                input.onchange = () => {
                    col.setValue(d.v, d.dataIndex, input.value);
                };
                input.onclick = (event) => {
                    event.stopPropagation();
                };
                n.lastElementChild.textContent = input.value = col.getLabel(d.v, d.dataIndex);
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, d, _i, dx, dy) => {
            const hovered = context.hovered(d.dataIndex);
            if (!hovered) {
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 0, 0, context.colWidth(col), context.textHints);
                return;
            }
            const overlay = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["s" /* showOverlay */])(context.bodyDOMElement, context.idPrefix + col.id, dx, dy);
            overlay.style.width = `${context.colWidth(col)}px`;
            overlay.innerHTML = `<input type='text' value='${col.getValue(d.v, d.dataIndex)}' style='width:${context.colWidth(col)}px'>`;
            const input = overlay.childNodes[0];
            input.onchange = function () {
                col.setValue(d.v, d.dataIndex, input.value);
            };
            input.onclick = function (event) {
                event.stopPropagation();
            };
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnnotationRenderer;



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_ActionColumn__ = __webpack_require__(36);


class ActionRenderer {
    constructor() {
        this.title = 'Default';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_1__model_ActionColumn__["b" /* default */];
    }
    createDOM(col, context) {
        const actions = context.option('actions', []).concat(col.actions);
        return {
            template: `<div class='actions lu-hover-only'>${actions.map((a) => `<span title='${a.name}' class='fa'>${a.icon}</span>`).join('')}</div>`,
            update: (n, d) => {
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* forEachChild */])(n, (ni, i) => {
                    ni.onclick = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        actions[i].action(d.v, d.dataIndex);
                    };
                });
            }
        };
    }
    createGroupDOM(col, context) {
        const actions = context.option('groupActions', []).concat(col.groupActions);
        return {
            template: `<div class='actions lu-hover-only'>${actions.map((a) => `<span title='${a.name}' class='fa'>${a.icon}</span>`).join('')}</div>`,
            update: (n, group, rows) => {
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* forEachChild */])(n, (ni, i) => {
                    ni.onclick = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        actions[i].action(group, rows);
                    };
                });
            }
        };
    }
    createCanvas(col, context) {
        const actions = context.option('actions', []).concat(col.actions);
        return (_ctx, d, _i, dx, dy) => {
            const hovered = context.hovered(d.dataIndex);
            if (!hovered) {
                return;
            }
            const overlay = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["s" /* showOverlay */])(context.bodyDOMElement, context.idPrefix + col.id, dx, dy);
            overlay.style.width = `${context.colWidth(col)}px`;
            overlay.classList.add('actions');
            overlay.innerHTML = actions.map((a) => `<span title='${a.name}' class='fa'>${a.icon}</span>`).join('');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* forEachChild */])(overlay, (ni, i) => {
                ni.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    actions[i].action(d.v, d.dataIndex);
                };
            });
        };
    }
    createGroupCanvas(col, context) {
        const actions = context.option('groupActions', []).concat(col.groupActions);
        return (_ctx, group, rows, dx, dy) => {
            const hovered = context.groupHovered(group);
            if (!hovered) {
                return;
            }
            const overlay = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["s" /* showOverlay */])(context.bodyDOMElement, context.idPrefix + col.id, dx, dy);
            overlay.style.width = `${context.colWidth(col)}px`;
            overlay.classList.add('actions');
            overlay.innerHTML = actions.map((a) => `<span title='${a.name}' class='fa'>${a.icon}</span>`).join('');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* forEachChild */])(overlay, (ni, i) => {
                ni.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    actions[i].action(group, rows);
                };
            });
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ActionRenderer;



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * helper class that renders a group renderer as a selected (e.g. median) single item
 */
class AAggregatedGroupRenderer {
    createGroupDOM(col, context, imposer) {
        const single = this.createDOM(col, context, imposer);
        return {
            template: `<div>${single.template}</div>`,
            update: (node, group, rows, hist) => {
                const aggregate = this.aggregatedIndex(rows, col);
                single.update(node.firstElementChild, rows[aggregate], aggregate, group, hist);
            }
        };
    }
    createGroupCanvas(col, context, imposer) {
        const single = this.createCanvas(col, context, imposer);
        return (ctx, group, rows, dx, dy, hist) => {
            const aggregate = this.aggregatedIndex(rows, col);
            const shift = (context.groupHeight(group) - context.rowHeight(aggregate)) / 2;
            ctx.translate(0, shift);
            single(ctx, rows[aggregate], aggregate, dx, dy + shift, group, hist);
            ctx.translate(0, -shift);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AAggregatedGroupRenderer;

/* unused harmony default export */ var _unused_webpack_default_export = (AAggregatedGroupRenderer);


/***/ }),
/* 82 */
/***/ (function(module, exports) {

/**
 * Created by Samuel Gratzl on 26.09.2017.
 */


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_math__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missing__ = __webpack_require__(4);




/**
 * renders categorical columns as a colored rect with label
 */
class CategoricalCellRenderer {
    constructor() {
        this.title = 'Color';
        this.groupTitle = 'Histogram';
    }
    canRender(col) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__model_CategoricalColumn__["b" /* isCategoricalColumn */])(col);
    }
    createDOM(col) {
        return {
            template: `<div>
        <div></div><div></div>
      </div>`,
            update: (n, d) => {
                Object(__WEBPACK_IMPORTED_MODULE_3__missing__["b" /* renderMissingDOM */])(n, col, d);
                n.firstElementChild.style.backgroundColor = col.getColor(d.v, d.dataIndex);
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["r" /* setText */])(n.lastElementChild, col.getLabel(d.v, d.dataIndex));
            }
        };
    }
    createCanvas(col, context) {
        const padding = context.option('rowBarPadding', 1);
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_3__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            ctx.fillStyle = col.getColor(d.v, d.dataIndex) || '';
            const cell = Math.min(context.colWidth(col) * 0.3, Math.max(context.rowHeight(i) - padding * 2, 0));
            ctx.fillRect(0, 0, cell, cell);
            ctx.fillStyle = context.option('style.text', 'black');
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), cell + 2, 0, context.colWidth(col) - cell - 2, context.textHints);
        };
    }
    createGroupDOM(col) {
        const colors = col.categoryColors;
        const labels = col.categoryLabels;
        const bins = col.categories.map((c, i) => `<div style="height: 0; background-color: ${colors[i]}" title="${labels[i]}: 0" data-cat="${c}"></div>`).join('');
        return {
            template: `<div>${bins}</div>`,
            update: (n, _group, rows, globalHist) => {
                const { maxBin, hist } = Object(__WEBPACK_IMPORTED_MODULE_2__provider_math__["a" /* computeHist */])(rows, rows.map((r) => r.dataIndex), (r) => col.getCategories(r.v, r.dataIndex), col.categories);
                const max = Math.max(maxBin, globalHist ? globalHist.maxBin : 0);
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["m" /* forEachChild */])(n, (d, i) => {
                    const { y } = hist[i];
                    d.style.height = `${Math.round(y * 100 / max)}%`;
                    d.title = `${labels[i]}: ${y}`;
                });
            }
        };
    }
    createGroupCanvas(col, context) {
        const padding = context.option('rowBarPadding', 1);
        const cats = col.categories;
        const colors = col.categoryColors;
        const widthPerBin = context.colWidth(col) / cats.length;
        return (ctx, group, rows, _dx, _dy, globalHist) => {
            const { maxBin, hist } = Object(__WEBPACK_IMPORTED_MODULE_2__provider_math__["a" /* computeHist */])(rows, rows.map((r) => r.dataIndex), (r) => col.getCategories(r.v, r.dataIndex), col.categories);
            const max = Math.max(maxBin, globalHist ? globalHist.maxBin : 0);
            const total = context.groupHeight(group) - padding;
            hist.forEach(({ y }, i) => {
                const height = (y / max) * total;
                ctx.fillStyle = colors[i];
                ctx.fillRect(i * widthPerBin + padding, (total - height) + padding, widthPerBin - 2 * padding, height);
            });
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoricalCellRenderer;



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ANumbersCellRenderer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_INumberColumn__ = __webpack_require__(2);





class NumbersCellRenderer extends __WEBPACK_IMPORTED_MODULE_1__ANumbersCellRenderer__["a" /* ANumbersCellRenderer */] {
    constructor() {
        super(...arguments);
        this.title = 'Heatmap';
    }
    createDOMContext(col) {
        const colorScale = col.getRawColorScale();
        let templateRows = '';
        for (let i = 0; i < col.getDataLength(); ++i) {
            templateRows += `<div style="background-color: white" title=""></div>`;
        }
        return {
            templateRow: templateRows,
            render: (row, data) => {
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* forEachChild */])(row, (d, i) => {
                    const v = data[i];
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* attr */])(d, {
                        title: Object(__WEBPACK_IMPORTED_MODULE_4__model_INumberColumn__["b" /* DEFAULT_FORMATTER */])(v),
                        'class': Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(v) ? 'lu-missing' : ''
                    }, {
                        'background-color': Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(v) ? null : colorScale(v)
                    });
                });
            }
        };
    }
    createCanvasContext(col, context) {
        const cellDimension = context.colWidth(col) / col.getDataLength();
        const padding = context.option('rowBarPadding', 1);
        const colorScale = col.getRawColorScale();
        return (ctx, data, offset, rowHeight) => {
            data.forEach((d, j) => {
                const x = j * cellDimension;
                if (Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(d)) {
                    Object(__WEBPACK_IMPORTED_MODULE_2__missing__["c" /* renderMissingValue */])(ctx, cellDimension, rowHeight, x, padding + offset);
                    return;
                }
                ctx.beginPath();
                ctx.fillStyle = colorScale(d);
                ctx.fillRect(x, padding + offset, cellDimension, rowHeight);
            });
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NumbersCellRenderer;



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export line */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ANumbersCellRenderer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_INumberColumn__ = __webpack_require__(2);





function line(data) {
    if (data.length === 0) {
        return '';
    }
    let p = '';
    let moveNext = true;
    data.forEach((d, i) => {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(d)) {
            moveNext = true;
        }
        else if (moveNext) {
            p += `M${i},${1 - d} `;
            moveNext = false;
        }
        else {
            p += `L${i},${1 - d} `;
        }
    });
    return p;
}
class SparklineCellRenderer {
    constructor() {
        this.title = 'Sparkline';
    }
    canRender(col) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__model_INumberColumn__["i" /* isNumbersColumn */])(col);
    }
    createDOM(col) {
        const yPos = 1 - col.getMapping().apply(col.getThreshold());
        return {
            template: `<svg viewBox="0 0 ${col.getDataLength() - 1} 1" preserveAspectRatio="none meet"><line x1="0" x2="${col.getDataLength() - 1}" y1="${yPos}" y2="${yPos}"></line><path></path></svg>`,
            update: (n, d) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_2__missing__["b" /* renderMissingDOM */])(n, col, d)) {
                    return;
                }
                const data = col.getNumbers(d.v, d.dataIndex);
                n.querySelector('path').setAttribute('d', line(data));
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, d, i) => {
            const h = context.rowHeight(i);
            if (Object(__WEBPACK_IMPORTED_MODULE_2__missing__["a" /* renderMissingCanvas */])(ctx, col, d, h)) {
                return;
            }
            const data = col.getNumbers(d.v, d.dataIndex);
            if (data.length === 0) {
                return;
            }
            ctx.save();
            const w = context.colWidth(col) / (col.getDataLength() - 1);
            // base line
            ctx.strokeStyle = '#c1c1c1';
            ctx.beginPath();
            ctx.moveTo(0, 1 - col.getMapping().apply(col.getThreshold()));
            ctx.lineTo(w * (data.length - 1), h);
            ctx.stroke();
            ctx.strokeStyle = 'black';
            this.renderLine(ctx, data, h, w);
            ctx.restore();
        };
    }
    renderLine(ctx, data, w, h) {
        ctx.beginPath();
        let moveNext = false;
        if (Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(data[0])) {
            moveNext = true;
        }
        else {
            ctx.moveTo(0, (1 - data[0]) * h);
        }
        for (let i = 1; i < data.length; ++i) {
            const v = data[i];
            if (Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(v)) {
                moveNext = true;
            }
            else if (moveNext) {
                ctx.moveTo(i * w, (1 - data[i]) * h);
                moveNext = false;
            }
            else {
                ctx.lineTo(i * w, (1 - data[i]) * h);
            }
        }
        ctx.stroke();
    }
    createGroupDOM(col) {
        const yPos = 1 - col.getMapping().apply(col.getThreshold());
        return {
            template: `<svg viewBox="0 0 ${col.getDataLength()} 1" preserveAspectRatio="none meet"><line x1="0" x2="${col.getDataLength() - 1}" y1="${yPos}" y2="${yPos}"></line><path></path></svg>`,
            update: (n, _group, rows) => {
                //overlapping ones
                Object(__WEBPACK_IMPORTED_MODULE_0__ANumbersCellRenderer__["b" /* matchRows */])(n, rows, `<path></path>`);
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["m" /* forEachChild */])(n, ((row, i) => {
                    const d = rows[i];
                    row.setAttribute('d', line(col.getNumbers(d.v, d.dataIndex)));
                }));
            }
        };
    }
    createGroupCanvas(col, context) {
        return (ctx, group, rows) => {
            //overlapping ones
            const h = context.groupHeight(group);
            const w = context.colWidth(col);
            ctx.save();
            ctx.strokeStyle = '#c1c1c1';
            ctx.beginPath();
            const tresholdLine = (1 - col.getMapping().apply(col.getThreshold())) * h;
            ctx.moveTo(0, tresholdLine);
            ctx.lineTo(w, tresholdLine);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            rows.forEach((d) => {
                const data = col.getNumbers(d.v, d.dataIndex);
                if (data.length === 0) {
                    return;
                }
                this.renderLine(ctx, data, w, h);
            });
            ctx.restore();
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SparklineCellRenderer;



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ANumbersCellRenderer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_INumberColumn__ = __webpack_require__(2);



class VerticalBarCellRenderer extends __WEBPACK_IMPORTED_MODULE_1__ANumbersCellRenderer__["a" /* ANumbersCellRenderer */] {
    constructor() {
        super(...arguments);
        this.title = 'Bar Chart';
    }
    canRender(col, isGroup) {
        return super.canRender(col, isGroup) && !isGroup;
    }
    static compute(v, threshold, domain) {
        if (v < threshold) {
            //threshold to down
            return { height: (threshold - v), bottom: (v - domain[0]) };
        }
        //from top to down
        return { height: (v - threshold), bottom: (threshold - domain[0]) };
    }
    createDOMContext(col) {
        const colorScale = col.getRawColorScale();
        const domain = col.getMapping().domain;
        const threshold = col.getThreshold();
        const range = domain[1] - domain[0];
        let templateRows = '';
        for (let i = 0; i < col.getDataLength(); ++i) {
            templateRows += `<div style="background-color: white" title=""></div>`;
        }
        return {
            templateRow: templateRows,
            render: (row, data) => {
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* forEachChild */])(row, (d, i) => {
                    const v = data[i];
                    const { bottom, height } = VerticalBarCellRenderer.compute(v, threshold, domain);
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* attr */])(d, {
                        title: Object(__WEBPACK_IMPORTED_MODULE_2__model_INumberColumn__["b" /* DEFAULT_FORMATTER */])(v)
                    }, {
                        'background-color': colorScale(v),
                        bottom: `${Math.round((100 * bottom) / range)}%`,
                        height: `${Math.round((100 * height) / range)}%`
                    });
                });
            }
        };
    }
    createCanvasContext(col, context) {
        const colorScale = col.getRawColorScale();
        const cellDimension = context.colWidth(col) / col.getDataLength();
        const domain = col.getMapping().domain;
        const threshold = col.getThreshold();
        const range = domain[1] - domain[0];
        return (ctx, data, offset, rowHeight) => {
            const scale = rowHeight / range;
            data.forEach((v, j) => {
                ctx.fillStyle = colorScale(v);
                const xpos = (j * cellDimension);
                const { bottom, height } = VerticalBarCellRenderer.compute(v, threshold, domain);
                ctx.fillRect(xpos, (range - height - bottom) * scale + offset, cellDimension, height * scale);
            });
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VerticalBarCellRenderer;



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__missing__ = __webpack_require__(4);



class UpSetCellRenderer {
    constructor() {
        this.title = 'Matrix';
    }
    static calculateSetPath(setData, cellDimension) {
        const catindexes = [];
        setData.forEach((d, i) => (d) ? catindexes.push(i) : -1);
        const left = (catindexes[0] * cellDimension) + (cellDimension / 2);
        const right = (catindexes[catindexes.length - 1] * cellDimension) + (cellDimension / 2);
        return { left, right };
    }
    static createDOMContext(col) {
        const dataLength = col.categories.length;
        let templateRows = '';
        for (let i = 0; i < dataLength; ++i) {
            templateRows += `<div></div>`;
        }
        return {
            templateRow: templateRows,
            render: (n, value) => {
                Array.from(n.children).slice(1).forEach((d, i) => {
                    const v = value[i];
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* attr */])(d, {
                        'class': v ? 'enabled' : ''
                    });
                });
                const line = n.firstElementChild;
                const left = value.findIndex((d) => d);
                const right = (value.length - 1) - value.reverse().findIndex((d) => d);
                if (left < 0 || left === right) {
                    line.style.display = 'none';
                    return;
                }
                line.style.display = null;
                line.style.left = `${Math.round(100 * (left + 0.5) / value.length)}%`;
                line.style.width = `${Math.round(100 * (right - left) / value.length)}%`;
            }
        };
    }
    static union(col, rows) {
        const values = new Set();
        rows.forEach((d) => {
            col.getCategories(d.v, d.dataIndex).forEach((cat) => values.add(cat));
        });
        return col.categories.map((cat) => values.has(cat));
    }
    canRender(col) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__model_CategoricalColumn__["b" /* isCategoricalColumn */])(col);
    }
    createDOM(col) {
        const { templateRow, render } = UpSetCellRenderer.createDOMContext(col);
        return {
            template: `<div><div></div>${templateRow}</div>`,
            update: (n, d) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_2__missing__["b" /* renderMissingDOM */])(n, col, d)) {
                    return;
                }
                const values = new Set(col.getCategories(d.v, d.dataIndex));
                const value = col.categories.map((cat) => values.has(cat));
                render(n, value);
            }
        };
    }
    createGroupDOM(col) {
        const { templateRow, render } = UpSetCellRenderer.createDOMContext(col);
        return {
            template: `<div><div></div>${templateRow}</div>`,
            update: (n, _group, rows) => {
                const value = UpSetCellRenderer.union(col, rows);
                render(n, value);
            }
        };
    }
    static createCanvasContext(col, context) {
        const dataLength = col.categories.length;
        const cellDimension = context.colWidth(col) / dataLength;
        const upsetCircle = context.option('style.upset.circle', 'black');
        const upsetInactive = context.option('style.upset.inactiveOpacity', 0.1);
        const upsetStroke = context.option('style.upset.stroke', 'black');
        return (ctx, data, rowHeight) => {
            const hasTrueValues = data.some((d) => d); //some values are true?
            const radius = (rowHeight / 3);
            ctx.save();
            ctx.fillStyle = upsetCircle;
            ctx.strokeStyle = upsetStroke;
            if (hasTrueValues) {
                const { left, right } = UpSetCellRenderer.calculateSetPath(data, cellDimension);
                ctx.beginPath();
                ctx.moveTo(left, rowHeight / 2);
                ctx.lineTo(right, rowHeight / 2);
                ctx.stroke();
            }
            data.forEach((d, j) => {
                const posy = (rowHeight / 2);
                const posx = (j * cellDimension) + (cellDimension / 2);
                ctx.beginPath();
                ctx.globalAlpha = d ? 1 : upsetInactive;
                ctx.arc(posx, posy, radius, 0, 2 * Math.PI);
                ctx.fill();
            });
            ctx.restore();
        };
    }
    createCanvas(col, context) {
        const render = UpSetCellRenderer.createCanvasContext(col, context);
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_2__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            // Circle
            const values = new Set(col.getCategories(d.v, d.dataIndex));
            const data = col.categories.map((cat) => values.has(cat));
            const rowHeight = context.rowHeight(i);
            render(ctx, data, rowHeight);
        };
    }
    createGroupCanvas(col, context) {
        const render = UpSetCellRenderer.createCanvasContext(col, context);
        return (ctx, group, rows) => {
            // Circle
            const data = UpSetCellRenderer.union(col, rows);
            const rowHeight = context.groupHeight(group);
            render(ctx, data, rowHeight);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UpSetCellRenderer;



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__impose__ = __webpack_require__(21);





class CircleCellRenderer {
    constructor() {
        this.title = 'Proportional Symbol';
    }
    canRender(col, isGroup) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["h" /* isNumberColumn */])(col) && !isGroup && !Object(__WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["i" /* isNumbersColumn */])(col);
    }
    createDOM(col, _context, imposer) {
        return {
            template: `<div style="background: radial-gradient(circle closest-side, red 100%, transparent 100%)" title="">
              <div class="lu-hover-only"></div>
          </div>`,
            update: (n, d) => {
                const v = col.getNumber(d.v, d.dataIndex);
                const p = Math.round(v * 100);
                const missing = Object(__WEBPACK_IMPORTED_MODULE_3__missing__["b" /* renderMissingDOM */])(n, col, d);
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* attr */])(n, {}, {
                    background: missing ? null : `radial-gradient(circle closest-side, ${Object(__WEBPACK_IMPORTED_MODULE_4__impose__["a" /* colorOf */])(col, d, imposer)} ${p}%, transparent ${p}%)`
                });
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__["r" /* setText */])(n.firstElementChild, col.getLabel(d.v, d.dataIndex));
            }
        };
    }
    createCanvas(col, context, imposer) {
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_3__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            const value = col.getNumber(d.v, d.dataIndex);
            const posy = (context.rowHeight(i) / 2);
            const posx = (context.colWidth(col) / 2);
            ctx.strokeStyle = ctx.fillStyle = Object(__WEBPACK_IMPORTED_MODULE_4__impose__["a" /* colorOf */])(col, d, imposer) || __WEBPACK_IMPORTED_MODULE_0__model_Column__["a" /* default */].DEFAULT_COLOR;
            ctx.beginPath();
            ctx.arc(posx, posy, (context.rowHeight(i) / 2) * value, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            if (context.hovered(d.dataIndex) || context.selected(d.dataIndex)) {
                ctx.fillStyle = context.option('style.text', 'black');
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 1, 0, context.colWidth(col) - 1, context.textHints);
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircleCellRenderer;



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export computeLabel */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_BoxPlotColumn__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__impose__ = __webpack_require__(21);






function computeLabel(v) {
    if (v === null) {
        return '';
    }
    const f = __WEBPACK_IMPORTED_MODULE_0__model_BoxPlotColumn__["a" /* default */].DEFAULT_FORMATTER;
    return `min = ${f(v.min)}\nq1 = ${f(v.q1)}\nmedian = ${f(v.median)}\nq3 = ${f(v.q3)}\nmax = ${f(v.max)}`;
}
class BoxplotCellRenderer {
    constructor() {
        this.title = 'Box Plot';
    }
    canRender(col, isGroup) {
        return (Object(__WEBPACK_IMPORTED_MODULE_0__model_BoxPlotColumn__["b" /* isBoxPlotColumn */])(col) && !isGroup || (Object(__WEBPACK_IMPORTED_MODULE_3__model__["isNumberColumn"])(col) && isGroup));
    }
    createDOM(col, _context, imposer) {
        const sortMethod = col.getSortMethod();
        const sortedByMe = col.isSortedByMe().asc !== undefined;
        return {
            template: `<div title="">
                    <div><div></div><div></div></div>
                 </div>`,
            update: (n, d) => {
                const data = col.getBoxPlotData(d.v, d.dataIndex);
                const missing = !data || Object(__WEBPACK_IMPORTED_MODULE_2__missing__["b" /* renderMissingDOM */])(n, col, d);
                if (missing) {
                    return;
                }
                const label = col.getRawBoxPlotData(d.v, d.dataIndex);
                renderDOMBoxPlot(n, data, label, sortedByMe ? sortMethod : '', Object(__WEBPACK_IMPORTED_MODULE_5__impose__["a" /* colorOf */])(col, d, imposer));
            }
        };
    }
    createCanvas(col, context, imposer) {
        const sortMethod = col.getSortMethod();
        const topPadding = context.option('rowBarPadding', 1);
        const sortedByMe = col.isSortedByMe().asc !== undefined;
        const width = context.colWidth(col);
        return (ctx, d, i) => {
            const rowHeight = context.rowHeight(i);
            if (Object(__WEBPACK_IMPORTED_MODULE_2__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            // Rectangle
            const data = col.getBoxPlotData(d.v, d.dataIndex);
            if (!data) {
                return;
            }
            const scaled = {
                min: data.min * width,
                median: data.median * width,
                q1: data.q1 * width,
                q3: data.q3 * width,
                max: data.max * width,
                outlier: data.outlier ? data.outlier.map((d) => d * width) : undefined
            };
            renderBoxPlot(ctx, scaled, sortedByMe ? sortMethod : '', Object(__WEBPACK_IMPORTED_MODULE_5__impose__["a" /* colorOf */])(col, d, imposer), rowHeight, topPadding, context);
        };
    }
    static createAggregatedBoxPlot(col, rows) {
        // concat all values
        const vs = [].concat(...rows.map((r) => col.getNumbers(r.v, r.dataIndex)));
        return new __WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["c" /* LazyBoxPlotData */](vs);
    }
    createGroupDOM(col, _context, imposer) {
        const sort = (col instanceof __WEBPACK_IMPORTED_MODULE_4__model_NumberColumn__["d" /* default */] && col.isGroupSortedByMe().asc !== undefined) ? col.getSortMethod() : '';
        return {
            template: `<div title="">
                    <div><div></div><div></div></div>
                 </div>`,
            update: (n, _group, rows) => {
                const box = Object(__WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["i" /* isNumbersColumn */])(col) ? BoxplotCellRenderer.createAggregatedBoxPlot(col, rows) : new __WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["c" /* LazyBoxPlotData */](rows.map((row) => col.getNumber(row.v, row.dataIndex)));
                renderDOMBoxPlot(n, box, box, sort, Object(__WEBPACK_IMPORTED_MODULE_5__impose__["a" /* colorOf */])(col, null, imposer));
            }
        };
    }
    createGroupCanvas(col, context, imposer) {
        const topPadding = context.option('rowBarGroupPadding', 1);
        const width = context.colWidth(col);
        const sort = (col instanceof __WEBPACK_IMPORTED_MODULE_4__model_NumberColumn__["d" /* default */] && col.isGroupSortedByMe().asc !== undefined) ? col.getSortMethod() : '';
        return (ctx, group, rows) => {
            const height = context.groupHeight(group);
            const data = Object(__WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["i" /* isNumbersColumn */])(col) ? BoxplotCellRenderer.createAggregatedBoxPlot(col, rows) : new __WEBPACK_IMPORTED_MODULE_1__model_INumberColumn__["c" /* LazyBoxPlotData */](rows.map((row) => col.getNumber(row.v, row.dataIndex)));
            const scaled = {
                min: data.min * width,
                median: data.median * width,
                q1: data.q1 * width,
                q3: data.q3 * width,
                max: data.max * width,
                outlier: data.outlier ? data.outlier.map((d) => d * width) : undefined
            };
            renderBoxPlot(ctx, scaled, sort, Object(__WEBPACK_IMPORTED_MODULE_5__impose__["a" /* colorOf */])(col, null, imposer), height, topPadding, context);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoxplotCellRenderer;

function renderDOMBoxPlot(n, data, label, sort, color) {
    n.title = computeLabel(label);
    const whiskers = n.firstElementChild;
    const box = whiskers.firstElementChild;
    const median = whiskers.lastElementChild;
    const leftWhisker = Math.max(data.q1 - 1.5 * (data.q3 - data.q1), data.min);
    const rightWhisker = Math.min(data.q3 + 1.5 * (data.q3 - data.q1), data.max);
    whiskers.style.left = `${Math.round(leftWhisker * 100)}%`;
    const range = rightWhisker - leftWhisker;
    whiskers.style.width = `${Math.round(range * 100)}%`;
    //relative within the whiskers
    box.style.left = `${Math.round((data.q1 - leftWhisker) / range * 100)}%`;
    box.style.width = `${Math.round((data.q3 - data.q1) / range * 100)}%`;
    box.style.backgroundColor = color;
    //relative within the whiskers
    median.style.left = `${Math.round((data.median - leftWhisker) / range * 100)}%`;
    whiskers.dataset.sort = sort;
    if (!data.outlier || data.outlier.length === 0) {
        if (n.children.length > 1) {
            n.innerHTML = '';
            n.appendChild(whiskers);
        }
        return;
    }
    // match lengths
    const outliers = Array.from(n.children).slice(1);
    outliers.slice(data.outlier.length).forEach((v) => v.remove());
    for (let i = outliers.length; i < data.outlier.length; ++i) {
        const p = n.ownerDocument.createElement('div');
        outliers.push(p);
        n.appendChild(p);
    }
    data.outlier.forEach((v, i) => {
        outliers[i].style.left = `${Math.round(v * 100)}%`;
    });
}
function renderBoxPlot(ctx, box, sort, color, height, topPadding, context) {
    const boxColor = color || context.option('style.boxplot.box', '#e0e0e0');
    const boxStroke = context.option('style.boxplot.stroke', 'black');
    const boxSortIndicator = context.option('style.boxplot.sortIndicator', '#ffa500');
    const boxTopPadding = topPadding + ((height - topPadding * 2) * 0.1);
    const left = Math.max((box.q1 - 1.5 * (box.q3 - box.q1)), box.min);
    const right = Math.min((box.q3 + 1.5 * (box.q3 - box.q1)), box.max);
    ctx.fillStyle = boxColor;
    ctx.strokeStyle = boxStroke;
    ctx.beginPath();
    ctx.rect(box.q1, boxTopPadding, box.q3 - box.q1, height - (boxTopPadding * 2));
    ctx.fill();
    ctx.stroke();
    //Line
    const bottomPos = height - topPadding;
    const middlePos = height / 2;
    ctx.beginPath();
    ctx.moveTo(left, middlePos);
    ctx.lineTo(box.q1, middlePos);
    ctx.moveTo(left, topPadding);
    ctx.lineTo(left, bottomPos);
    ctx.moveTo(box.median, boxTopPadding);
    ctx.lineTo(box.median, height - boxTopPadding);
    ctx.moveTo(box.q3, middlePos);
    ctx.lineTo(right, middlePos);
    ctx.moveTo(right, topPadding);
    ctx.lineTo(right, bottomPos);
    ctx.stroke();
    ctx.fill();
    if (sort !== '') {
        ctx.strokeStyle = boxSortIndicator;
        ctx.beginPath();
        ctx.moveTo(box[sort], topPadding);
        ctx.lineTo(box[sort], height - topPadding);
        ctx.stroke();
        ctx.fill();
    }
    if (!box.outlier) {
        return;
    }
    box.outlier.forEach((v) => {
        // currently dots with 3px
        ctx.fillRect(v - 1, middlePos - 1, 3, 3);
    });
}


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

class LoadingCellRenderer {
    constructor() {
        this.title = 'Loading';
    }
    canRender() {
        return false; // just direct selection
    }
    createDOM() {
        return {
            template: `<div>Loading…</div>`,
            update: () => undefined
        };
    }
    createCanvas(col, context) {
        const base = Date.now() % 360;
        return (ctx, _d, i) => {
            renderLoading(ctx, base, i, context.rowHeight(i), col, context);
        };
    }
    createGroupDOM() {
        return this.createDOM();
    }
    createGroupCanvas(col, context) {
        const base = Date.now() % 360;
        return (ctx, group) => {
            renderLoading(ctx, base, 0, context.groupHeight(group), col, context);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoadingCellRenderer;

function renderLoading(ctx, base, i, height, col, context) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* clipText */])(ctx, 'Loading…', 10, 0, context.colWidth(col) - 10, context.textHints);
    const angle = (base + i * 45) * (Math.PI / 180);
    ctx.save();
    ctx.font = '10pt FontAwesome';
    ctx.textAlign = 'center';
    const shift = (height - context.textHints.spinnerWidth) * 0.5;
    ctx.translate(2, shift + context.textHints.spinnerWidth * 0.5);
    ctx.rotate(angle);
    ctx.translate(0, -context.textHints.spinnerWidth * 0.5);
    ctx.fillText('\uf110', 0, 0);
    ctx.restore();
}


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toHeatMapColor */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__impose__ = __webpack_require__(21);






function toHeatMapColor(row, col, imposer) {
    let v = col.getNumber(row.v, row.dataIndex);
    if (isNaN(v)) {
        v = 1; // max = brightest
    }
    //hsl space encoding, encode in lightness
    const color = Object(__WEBPACK_IMPORTED_MODULE_3_d3__["hsl"])(Object(__WEBPACK_IMPORTED_MODULE_5__impose__["a" /* colorOf */])(col, row, imposer) || __WEBPACK_IMPORTED_MODULE_1__model_Column__["a" /* default */].DEFAULT_COLOR);
    color.l = 1 - v; // largest value = darkest color
    return color.toString();
}
class HeatmapCellRenderer {
    constructor() {
        this.title = 'Brightness';
    }
    canRender(col, isGroup) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["h" /* isNumberColumn */])(col) && !isGroup && !Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["i" /* isNumbersColumn */])(col);
    }
    createDOM(col, _context, imposer) {
        return {
            template: `<div title="">
        <div style="background-color: ${col.color}"></div><div> </div>
      </div>`,
            update: (n, d) => {
                const missing = Object(__WEBPACK_IMPORTED_MODULE_4__missing__["b" /* renderMissingDOM */])(n, col, d);
                n.title = col.getLabel(d.v, d.dataIndex);
                n.firstElementChild.style.backgroundColor = missing ? null : toHeatMapColor(d, col, imposer);
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__["r" /* setText */])(n.lastElementChild, n.title);
            }
        };
    }
    createCanvas(col, context, imposer) {
        const padding = context.option('rowBarPadding', 1);
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            ctx.fillStyle = toHeatMapColor(d, col, imposer);
            const cell = Math.min(context.colWidth(col) * 0.3, Math.max(context.rowHeight(i) - padding * 2, 0));
            ctx.fillRect(0, 0, cell, cell);
            ctx.fillStyle = context.option('style.text', 'black');
            Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), cell + 2, 0, context.colWidth(col) - cell - 2, context.textHints);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HeatmapCellRenderer;



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EmptyCellRenderer {
    constructor() {
        this.title = 'Nothing';
    }
    canRender() {
        return false; // just direct selection
    }
    createDOM(col) {
        return {
            template: `<div title=""></div>`,
            update: (n, d) => {
                n.title = col.getLabel(d.v, d.dataIndex);
            }
        };
    }
    createCanvas() {
        return () => {
            //dummy
        };
    }
    createGroupDOM() {
        return {
            template: `<div title=""></div>`,
            update: (n, group) => {
                n.title = group.name;
            }
        };
    }
    createGroupCanvas() {
        return () => {
            //dummy
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EmptyCellRenderer;



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_RankColumn__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);



class RankCellRenderer extends __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */] {
    constructor() {
        super('rank', 'right');
        this.title = 'String';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_1__model_RankColumn__["b" /* default */];
    }
    createGroupDOM(col) {
        return {
            template: `<div><div></div><div></div></div>`,
            update: (n, _group, rows) => {
                const fromTSpan = n.firstElementChild;
                const toTSpan = n.lastElementChild;
                if (rows.length === 0) {
                    fromTSpan.textContent = '';
                    toTSpan.textContent = '';
                    return;
                }
                fromTSpan.textContent = col.getLabel(rows[0].v, rows[0].dataIndex);
                toTSpan.textContent = col.getLabel(rows[rows.length - 1].v, rows[rows.length - 1].dataIndex);
            }
        };
    }
    createGroupCanvas(col, context) {
        return (ctx, group, rows) => {
            if (rows.length === 0) {
                return;
            }
            const fromRank = col.getLabel(rows[0].v, rows[0].dataIndex);
            const toRank = col.getLabel(rows[rows.length - 1].v, rows[rows.length - 1].dataIndex);
            const bak = ctx.textAlign;
            ctx.textAlign = 'right';
            const w = col.getWidth();
            const shift = w;
            Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* clipText */])(ctx, fromRank, shift, 0, w, context.textHints);
            Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* clipText */])(ctx, toRank, shift, context.groupHeight(group) - context.textHints.spinnerWidth, w, context.textHints);
            ctx.textAlign = bak;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RankCellRenderer;



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_AggregateGroupColumn__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


function render(ctx, icon, col, context) {
    const width = context.colWidth(col);
    const bak = ctx.font;
    const bakAlign = ctx.textAlign;
    ctx.textAlign = 'center';
    ctx.font = '10pt FontAwesome';
    //aggregate
    Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, icon, width / 2, 0, width, context.textHints);
    ctx.font = bak;
    ctx.textAlign = bakAlign;
}
class AggregateGroupRenderer {
    constructor() {
        this.title = 'Default';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_0__model_AggregateGroupColumn__["b" /* default */];
    }
    createDOM(col) {
        return {
            template: `<div title="Collapse Group"></div>`,
            update(node, _row, _i, group) {
                node.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    col.setAggregated(group, true);
                };
            }
        };
    }
    createGroupDOM(col) {
        return {
            template: `<div title="Expand Group"></div>`,
            update(node, group) {
                node.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    col.setAggregated(group, false);
                };
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, _d, i) => {
            if (i === 0) {
                render(ctx, '\uf0d7', col, context); //fa-caret-down
            }
        };
    }
    createGroupCanvas(col, context) {
        return (ctx) => {
            render(ctx, '\uf0da', col, context); //fa-caret-right
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AggregateGroupRenderer;



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__provider_math__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__impose__ = __webpack_require__(21);






/**
 * a renderer rendering a bar for numerical columns
 */
class HistogramRenderer {
    constructor() {
        this.title = 'Histogram';
    }
    canRender(col, isGroup) {
        return (Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["h" /* isNumberColumn */])(col) && isGroup) || (Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["i" /* isNumbersColumn */])(col) && !isGroup);
    }
    static getHistDOMRenderer(totalNumberOfRows, col, imposer) {
        const guessedBins = Object(__WEBPACK_IMPORTED_MODULE_1__provider_math__["c" /* getNumberOfBins */])(totalNumberOfRows);
        let bins = '';
        for (let i = 0; i < guessedBins; ++i) {
            bins += `<div style="height: 0" title="Bin ${i}: 0"></div>`;
        }
        const render = (n, rows, globalHist) => {
            const { bins, max, hist } = HistogramRenderer.createHist(globalHist, guessedBins, rows, col);
            //adapt the number of children
            if (n.children.length !== bins) {
                let tmp = '';
                for (let i = 0; i < bins; ++i) {
                    tmp += `<div style="height: 0" title="Bin ${i}: 0"></div>`;
                }
                n.innerHTML = tmp;
            }
            Object(__WEBPACK_IMPORTED_MODULE_2__utils__["m" /* forEachChild */])(n, (d, i) => {
                const { x, dx, y } = hist[i];
                d.style.height = `${Math.round(y * 100 / max)}%`;
                d.title = `${Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["b" /* DEFAULT_FORMATTER */])(x)} - ${Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["b" /* DEFAULT_FORMATTER */])(x + dx)} (${y})`;
                d.style.backgroundColor = Object(__WEBPACK_IMPORTED_MODULE_5__impose__["a" /* colorOf */])(col, null, imposer);
            });
        };
        return { template: `<div>${bins}</div>`, render };
    }
    createDOM(col, context, imposer) {
        const { template, render } = HistogramRenderer.getHistDOMRenderer(context.totalNumberOfRows, col, imposer);
        return {
            template,
            update: (n, row, _i, _group, globalHist) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_4__missing__["b" /* renderMissingDOM */])(n, col, row)) {
                    return;
                }
                render(n, [row], globalHist);
            }
        };
    }
    createGroupDOM(col, context, imposer) {
        const { template, render } = HistogramRenderer.getHistDOMRenderer(context.totalNumberOfRows, col, imposer);
        return {
            template,
            update: (n, _group, rows, globalHist) => {
                render(n, rows, globalHist);
            }
        };
    }
    static getHistCanvasRenderer(col, context, imposer) {
        const guessedBins = Object(__WEBPACK_IMPORTED_MODULE_1__provider_math__["c" /* getNumberOfBins */])(context.totalNumberOfRows);
        const padding = context.option('rowBarPadding', 1);
        return (ctx, height, rows, globalHist) => {
            const { max, bins, hist } = HistogramRenderer.createHist(globalHist, guessedBins, rows, col);
            const widthPerBin = context.colWidth(col) / bins;
            const total = height - padding;
            ctx.fillStyle = Object(__WEBPACK_IMPORTED_MODULE_5__impose__["a" /* colorOf */])(col, null, imposer) || context.option('style.histogram', 'lightgray');
            hist.forEach(({ y }, i) => {
                const height = (y / max) * total;
                ctx.fillRect(i * widthPerBin + padding, (total - height) + padding, widthPerBin - 2 * padding, height);
            });
        };
    }
    static createHist(globalHist, guessedBins, rows, col) {
        const bins = globalHist ? globalHist.hist.length : guessedBins;
        let stats;
        if (Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["i" /* isNumbersColumn */])(col)) {
            //multiple values
            const values = [].concat(...rows.map((r) => col.getNumbers(r.v, r.dataIndex)));
            stats = Object(__WEBPACK_IMPORTED_MODULE_1__provider_math__["b" /* computeStats */])(values, [], (v) => v, __WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */], [0, 1], bins);
        }
        else {
            stats = Object(__WEBPACK_IMPORTED_MODULE_1__provider_math__["b" /* computeStats */])(rows, rows.map((r) => r.dataIndex), (r) => col.getNumber(r.v, r.dataIndex), (r) => col.isMissing(r.v, r.dataIndex), [0, 1], bins);
        }
        const max = Math.max(stats.maxBin, globalHist ? globalHist.maxBin : 0);
        return { bins, max, hist: stats.hist };
    }
    createCanvas(col, context, imposer) {
        const r = HistogramRenderer.getHistCanvasRenderer(col, context, imposer);
        return (ctx, row, i, _dx, _dy, _group, globalHist) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__missing__["a" /* renderMissingCanvas */])(ctx, col, row, context.rowHeight(i))) {
                return;
            }
            return r(ctx, context.rowHeight(i), [row], globalHist);
        };
    }
    createGroupCanvas(col, context, imposer) {
        const r = HistogramRenderer.getHistCanvasRenderer(col, context, imposer);
        return (ctx, group, rows, _dx, _dy, globalHist) => {
            return r(ctx, context.groupHeight(group), rows, globalHist);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HistogramRenderer;



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CategoricalColorCellRenderer__ = __webpack_require__(57);



/**
 * renders categorical columns as a colored rect with label
 */
class CategoricalColorShiftedCellRenderer {
    constructor() {
        this.title = 'Shifted Most Frequent Category';
    }
    canRender(col, isGroup) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__model_CategoricalColumn__["b" /* isCategoricalColumn */])(col) && isGroup;
    }
    static total(ranking, group) {
        let before = 0;
        let total = 0;
        let after = false;
        ranking.getGroups().forEach((g) => {
            if (g === group || g.name === group.name) {
                after = true;
            }
            total += g.order.length;
            if (!after) {
                before += g.order.length;
            }
        });
        return { before, total };
    }
    createGroupDOM(col) {
        return {
            template: `<div></div>`,
            update: (n, group, rows) => {
                const { count, label, color } = __WEBPACK_IMPORTED_MODULE_2__CategoricalColorCellRenderer__["a" /* default */].choose(col, rows);
                const { total, before } = CategoricalColorShiftedCellRenderer.total(col.findMyRanker(), group);
                n.innerHTML = `<div style="background-color: ${color}; width: ${total === 0 ? 100 : Math.round(100 * count / total)}%; left: ${total === 0 ? 0 : Math.round(100 * before / total)}%"></div><span>${label} (${count})</span>`;
            }
        };
    }
    createGroupCanvas(col, context) {
        const width = context.colWidth(col);
        return (ctx, group, rows) => {
            const height = context.groupHeight(group);
            const { count, label, color } = __WEBPACK_IMPORTED_MODULE_2__CategoricalColorCellRenderer__["a" /* default */].choose(col, rows);
            ctx.fillStyle = color;
            const { total, before } = CategoricalColorShiftedCellRenderer.total(col.findMyRanker(), group);
            if (total === 0) {
                return;
            }
            ctx.fillRect(total === 0 ? 0 : (width * before / total), 0, total === 0 ? width : (width * count / total), height);
            ctx.fillStyle = context.option('style.text', 'black');
            const bak = ctx.textAlign;
            ctx.textAlign = 'center';
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* clipText */])(ctx, `${label} (${count})`, width / 2, height / 2, width, context.textHints);
            ctx.textAlign = bak;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoricalColorShiftedCellRenderer;



/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ANoGroupRenderer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_LinkColumn__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__missing__ = __webpack_require__(4);




class ImageCellRenderer extends __WEBPACK_IMPORTED_MODULE_1__ANoGroupRenderer__["a" /* ANoGroupRenderer */] {
    constructor() {
        super(...arguments);
        this.imageCache = new Map();
        this.title = 'Image';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_2__model_LinkColumn__["a" /* default */];
    }
    getImage(col, row, index) {
        if (!col.isLink(row, index)) {
            return null;
        }
        const url = col.getValue(row, index);
        if (!this.imageCache.has(url)) {
            // start loading
            const image = new Image();
            image.src = url;
            this.imageCache.set(url, image);
        }
        return this.imageCache.get(url);
    }
    createDOM(col) {
        return {
            template: `<div></div>`,
            update: (n, d) => {
                const missing = Object(__WEBPACK_IMPORTED_MODULE_3__missing__["b" /* renderMissingDOM */])(n, col, d);
                n.title = col.getLabel(d.v, d.dataIndex);
                n.style.backgroundImage = missing || !col.isLink(d.v, d.dataIndex) ? null : `url('${col.getValue(d.v, d.dataIndex)}')`;
            }
        };
    }
    createCanvas(col, context) {
        return (ctx, d, i) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_3__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            const isLink = col.isLink(d.v, d.dataIndex);
            if (!isLink) {
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 0, 0, context.colWidth(col), context.textHints);
                return;
            }
            const image = this.getImage(col, d.v, d.dataIndex);
            if (!image) {
                return;
            }
            const iw = image.width;
            const ih = image.height;
            if (iw === 0 || ih === 0) {
                return;
            }
            const w = context.colWidth(col);
            const h = context.rowHeight(i);
            const factor = Math.min(w / iw, h / ih);
            const rw = iw * factor;
            const rh = ih * factor;
            ctx.drawImage(image, (w - rw) / 2, (h - rh) / 2, rw, rh);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageCellRenderer;



/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_BooleanColumn__ = __webpack_require__(46);


class BooleanCellRenderer extends __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */] {
    constructor() {
        super('boolean', 'center');
        this.title = 'Default';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_1__model_BooleanColumn__["a" /* default */];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BooleanCellRenderer;



/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_CompositeNumberColumn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MultiLevelCellRenderer__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);




/**
 * a renderer rendering a bar for numerical columns
 */
class InterleavingCellRenderer {
    constructor() {
        this.title = 'Interleaved';
    }
    canRender(col) {
        return col instanceof __WEBPACK_IMPORTED_MODULE_1__model_CompositeNumberColumn__["a" /* default */];
    }
    createDOM(col, context) {
        const { cols } = Object(__WEBPACK_IMPORTED_MODULE_2__MultiLevelCellRenderer__["a" /* createData */])(col, context, false);
        return {
            template: `<div>${cols.map((r) => r.renderer.template).join('')}</div>`,
            update: (n, d, i, group, hist) => {
                const missing = Object(__WEBPACK_IMPORTED_MODULE_0__missing__["b" /* renderMissingDOM */])(n, col, d);
                if (missing) {
                    return;
                }
                Object(__WEBPACK_IMPORTED_MODULE_3__utils__["o" /* matchColumns */])(n, cols, 'detail', 'html');
                Array.from(n.children).forEach((ni, j) => {
                    cols[j].renderer.update(ni, d, i, group, hist);
                });
            }
        };
    }
    createGroupDOM(col, context) {
        const { cols } = Object(__WEBPACK_IMPORTED_MODULE_2__MultiLevelCellRenderer__["a" /* createData */])(col, context, false);
        return {
            template: `<div>${cols.map((r) => r.renderer.template).join('')}</div>`,
            update: (n, group, rows, hist) => {
                Object(__WEBPACK_IMPORTED_MODULE_3__utils__["o" /* matchColumns */])(n, cols, 'group', 'html');
                Array.from(n.children).forEach((ni, j) => {
                    cols[j].groupRenderer.update(ni, group, rows, hist);
                });
            }
        };
    }
    createCanvas(col, context) {
        const children = col.children;
        const renderers = children.map((c) => context.renderer(c));
        return (ctx, d, i, dx, dy, group, hist) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__missing__["a" /* renderMissingCanvas */])(ctx, col, d, context.rowHeight(i))) {
                return;
            }
            const rowHeight = context.rowHeight(i);
            const heightI = rowHeight / children.length;
            ctx.save();
            ctx.scale(1, 1 / children.length); // scale since internal use the height, too
            renderers.forEach((r, i) => {
                r(ctx, d, i, dx, dy + heightI * i, group, hist);
                ctx.translate(0, rowHeight);
            });
            ctx.restore();
        };
    }
    createGroupCanvas(col, context) {
        const children = col.children;
        const renderers = children.map((c) => context.groupRenderer(c));
        return (ctx, group, rows, dx, dy, hist) => {
            const rowHeight = context.groupHeight(group);
            const heightI = rowHeight / children.length;
            ctx.save();
            ctx.scale(1, 1 / children.length); // scale since internal use the height, too
            renderers.forEach((r, i) => {
                r(ctx, group, rows, dx, dy + heightI * i, hist);
                ctx.translate(0, rowHeight);
            });
            ctx.restore();
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InterleavingCellRenderer;



/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__missing__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_missing__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__impose__ = __webpack_require__(21);





/**
 * a renderer rendering a bar for numerical columns
 */
class DotCellRenderer {
    constructor() {
        this.title = 'Dot(s)';
        // TODO canvas
    }
    canRender(col) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["h" /* isNumberColumn */])(col);
    }
    static getDOMRenderer(col) {
        const dots = Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["i" /* isNumbersColumn */])(col) ? col.getDataLength() : 1;
        let tmp = '';
        for (let i = 0; i < dots; ++i) {
            tmp += `<div style='background-color: ${col.color}' title=''></div>`;
        }
        const render = (n, vs, labels, colors) => {
            //adapt the number of children
            if (n.children.length !== vs.length) {
                let tmp = '';
                for (let i = 0; i < vs.length; ++i) {
                    tmp += `<div style='background-color: ${colors[i]}' title='${labels[i]}'></div>`;
                }
                n.innerHTML = tmp;
            }
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["m" /* forEachChild */])(n, (d, i) => {
                const v = vs[i];
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* attr */])(d, {
                    title: labels[i]
                }, {
                    display: Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(v) ? 'none' : null,
                    left: `${Math.round(v * 100)}%`,
                    // jitter
                    top: vs.length > 1 ? `${Math.round(Math.random() * 80 + 10)}%` : null,
                    'background-color': colors[i]
                });
            });
        };
        return { template: `<div>${tmp}</div>`, render };
    }
    createDOM(col, _context, imposer) {
        const { template, render } = DotCellRenderer.getDOMRenderer(col);
        return {
            template,
            update: (n, row) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_2__missing__["b" /* renderMissingDOM */])(n, col, row)) {
                    return;
                }
                const color = Object(__WEBPACK_IMPORTED_MODULE_4__impose__["a" /* colorOf */])(col, row, imposer);
                const v = col.getValue(row.v, row.dataIndex);
                if (!Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["i" /* isNumbersColumn */])(col)) {
                    return render(n, [v], [col.getLabel(row.v, row.dataIndex)], [color]);
                }
                const vs = v.filter((vi) => !Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(vi));
                return render(n, vs, vs.map(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["b" /* DEFAULT_FORMATTER */]), vs.map((_) => color));
            }
        };
    }
    createGroupDOM(col, _context, imposer) {
        const { template, render } = DotCellRenderer.getDOMRenderer(col);
        return {
            template,
            update: (n, _group, rows) => {
                const vs = rows.map((r) => col.getValue(r.v, r.dataIndex));
                const colors = rows.map((r) => Object(__WEBPACK_IMPORTED_MODULE_4__impose__["a" /* colorOf */])(col, r, imposer));
                if (!Object(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["i" /* isNumbersColumn */])(col)) {
                    return render(n, vs, rows.map((r) => col.getLabel(r.v, r.dataIndex)), colors);
                }
                // concatenate all columns
                const all = [].concat(...vs.filter((vi) => !Object(__WEBPACK_IMPORTED_MODULE_3__model_missing__["b" /* isMissingValue */])(vi)));
                return render(n, all, all.map(__WEBPACK_IMPORTED_MODULE_0__model_INumberColumn__["b" /* DEFAULT_FORMATTER */]), vs.map((_v, i) => colors[i]));
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DotCellRenderer;



/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_BoxPlotColumn__ = __webpack_require__(26);




class SortDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    constructor(column, header, title = 'Change Sort Criteria') {
        super(header, title);
        this.column = column;
    }
    openDialog() {
        const bak = this.column.getSortMethod();
        const valueString = Object.keys(this.column instanceof __WEBPACK_IMPORTED_MODULE_3__model_BoxPlotColumn__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_2__model_INumberColumn__["d" /* SORT_METHOD */] : __WEBPACK_IMPORTED_MODULE_2__model_INumberColumn__["a" /* ADVANCED_SORT_METHOD */]);
        const order = this.column instanceof __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["d" /* default */] ? this.column.isGroupSortedByMe().asc : this.column.isSortedByMe().asc;
        const sortMethods = valueString.map((d) => {
            return `<label><input type="radio" name="multivaluesort" value="${d}"  ${(bak === d) ? 'checked' : ''} > ${d.slice(0, 1).toUpperCase() + d.slice(1)}</label><br>`;
        }).join('\n');
        const sortOrders = `
        <label><input type="radio" name="sortorder" value="asc"  ${(order === 'asc') ? 'checked' : ''} > Ascending</label><br>
        <label><input type="radio" name="sortorder" value="desc"  ${(order === 'desc') ? 'checked' : ''} > Decending</label><br>`;
        const popup = this.makeChoosePopup(`${sortMethods}<strong>Sort Order</strong><br>${sortOrders}`);
        Array.from(popup.querySelectorAll('input[name=multivaluesort]')).forEach((n) => {
            n.addEventListener('change', () => this.column.setSortMethod(n.value));
        });
        Array.from(popup.querySelectorAll('input[name=sortorder]')).forEach((n) => {
            n.addEventListener('change', () => {
                if (this.column instanceof __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["d" /* default */]) {
                    this.column.groupSortByMe(n.value === 'asc');
                }
                else {
                    this.column.sortByMe(n.value === 'asc');
                }
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SortDialog;



/***/ }),
/* 102 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);

class RenameDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    /**
     * opens a rename dialog for the given column
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param title optional title
     */
    constructor(column, header, title = 'Rename Column') {
        super(header, title);
        this.column = column;
    }
    openDialog() {
        const popup = this.makePopup(`
      <input type="text" value="${this.column.label}" required autofocus placeholder="name">
      <input type="color" value="${this.column.color}" required placeholder="color">
      <textarea rows="5">${this.column.description}</textarea><br>`, false);
        popup.classList.add('lu-rename-dialog');
        this.onButton(popup, {
            cancel: () => undefined,
            reset: () => undefined,
            submit: () => {
                const newValue = popup.querySelector('input[type="text"]').value;
                const newColor = popup.querySelector('input[type="color"]').value;
                const newDescription = popup.querySelector('textarea').value;
                this.column.setMetaData({ label: newValue, color: newColor, description: newDescription });
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RenameDialog;



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);

class ChangeRendererDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    constructor(column, header, ctx) {
        super(header, 'Visualization');
        this.column = column;
        this.ctx = ctx;
    }
    openDialog() {
        const current = this.column.getRendererType();
        const currentGroup = this.column.getGroupRenderer();
        const { item: possible, group: possibleGroup } = this.ctx.getPossibleRenderer(this.column);
        console.assert(possible.length > 1 || possibleGroup.length > 1); // otherwise no need to show this
        let html = '';
        html += possible.map((d) => {
            return `<label><input type="radio" name="renderertype" value=${d.type}  ${(current === d.type) ? 'checked' : ''}> ${d.label}</label><br>`;
        }).join('\n');
        if (currentGroup.length > 1) {
            html += '<strong>Group Visualization</strong><br>';
            html += possibleGroup.map((d) => {
                return `<label><input type="radio" name="grouptype" value=${d.type}  ${(currentGroup === d.type) ? 'checked' : ''}> ${d.label}</label><br>`;
            }).join('\n');
        }
        const popup = this.makeChoosePopup(html);
        Array.from(popup.querySelectorAll('input[name="renderertype"]')).forEach((n) => {
            n.addEventListener('change', () => this.column.setRendererType(n.value));
        });
        Array.from(popup.querySelectorAll('input[name="grouptype"]')).forEach((n) => {
            n.addEventListener('change', () => this.column.setGroupRenderer(n.value));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChangeRendererDialog;



/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_ScriptColumn__ = __webpack_require__(27);


class ScriptEditDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    /**
     * opens a dialog for editing the script code
     * @param column the column to edit
     * @param header the visual header element of this column
     * @param title optional title
     */
    constructor(column, header, title = 'Edit Script') {
        super(header, title);
        this.column = column;
    }
    openDialog() {
        const bak = this.column.getScript();
        const popup = this.makePopup(`<div class="script-description">
      <p>You can write any valid JavaScript code. It will be embedded in a function. Therefore the last statement has to return a value.
      In case of a single line statement the code piece statement <code>return</code> will be automatically prefixed.</p>
      <p>The function signature is: <br><code>(row: any, index: number, children: Column[], values: any[], raws: (number|null)[]) => number</code>
      <dl>
        <dt>param: <code>row</code></dt>
        <dd>the row in the dataset to compute the value for</dd>
        <dt>param: <code>index</code></dt>
        <dd>the index of the row</dd>
        <dt>param: <code>children</code></dt>
        <dd>the list of LineUp columns that are part of this ScriptColumn</dd>
        <dt>param: <code>values</code></dt>
        <dd>the computed value of each column (see <code>children</code>) for the current row</dd>
        <dt>param: <code>raws</code></dt>
        <dd>similar to <code>values</code>. Numeric columns return by default the normalized value, this array gives access to the original "raw" values before mapping is applied</dd>
        <dt>returns:</dt>
        <dd>the computed number <strong>in the range [0, 1] or NaN</strong></dd>
      </dl>
      <p>In addition to the standard JavaScript functions and objects (Math, ...) a couple of utility functions are available: </p>
      <dl>
        <dt><code>max(arr: number[]) => number</code></dt>
        <dd>computes the maximum of the given array of numbers</dd>
        <dt><code>min(arr: number[]) => number</code></dt>
        <dd>computes the minimum of the given array of numbers</dd>
        <dt><code>extent(arr: number[]) => [number, number]</code></dt>
        <dd>computes both minimum and maximum and returning an array with the first element the minimum and the second the maximum</dd>
        <dt><code>clamp(v: number, min: number, max: number) => number</code></dt>
        <dd>ensures that the given value is within the given min/max value</dd>
        <dt><code>normalize(v: number, min: number, max: number) => number</code></dt>
        <dd>normalizes the given value <code>(v - min) / (max - min)</code></dd>
        <dt><code>denormalize(v: number, min: number, max: number) => number</code></dt>
        <dd>inverts a normalized value <code>v * (max - min) + min</code></dd>
        <dt><code>linear(v: number, input: [number, number], output: [number, number]) => number</code></dt>
        <dd>performs a linear mapping from input domain to output domain both given as an array of [min, max] values. <code>denormalize(normalize(v, input[0], input[1]), output[0], output[1])</code></dd>
      </dl>
      </div><br>
      <textarea autofocus="true" rows="5" autofocus="autofocus" style="width: 95%;">${this.column.getScript()}</textarea>
      <br>`);
        const updateData = (script) => {
            this.column.setScript(script);
        };
        const updateImpl = () => {
            //get value
            const script = popup.querySelector('textarea').value;
            updateData(script);
        };
        this.onButton(popup, {
            cancel: () => {
                popup.querySelector('textarea').value = bak;
                updateData(bak);
            },
            reset: () => {
                popup.querySelector('textarea').value = __WEBPACK_IMPORTED_MODULE_1__model_ScriptColumn__["b" /* default */].DEFAULT_SCRIPT;
                updateData(__WEBPACK_IMPORTED_MODULE_1__model_ScriptColumn__["b" /* default */].DEFAULT_SCRIPT);
            },
            submit: () => {
                updateImpl();
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScriptEditDialog;



/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);

class EditLinkDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    /**
     * opens a dialog for editing the link of a column
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param templates list of possible link templates
     * @param idPrefix dom id prefix
     * @param title optional title
     */
    constructor(column, header, idPrefix, templates = [], title = 'Edit Link ($ as Placeholder)') {
        super(header, title);
        this.column = column;
        this.idPrefix = idPrefix;
        this.templates = templates;
    }
    openDialog() {
        let t = `<input
        type="text"
        size="15"
        value="${this.column.getLink()}"
        required="required"
        autofocus="autofocus"
        placeholder="link pattern"
        ${this.templates.length > 0 ? `list="ui${this.idPrefix}lineupPatternList"` : ''}
      ><br>`;
        if (this.templates.length > 0) {
            t += `<datalist id="ui${this.idPrefix}lineupPatternList">${this.templates.map((t) => `<option value="${t}">`)}</datalist>`;
        }
        const popup = this.makePopup(t);
        this.onButton(popup, {
            cancel: () => undefined,
            reset: () => undefined,
            submit: () => {
                const newValue = popup.querySelector('input').value;
                this.column.setLink(newValue);
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EditLinkDialog;



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);

class WeightsEditDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    /**
     * opens a dialog for editing the weights of a stack column
     * @param column the column to filter
     * @param header the visual header element of this column
     * @param title optional title
     */
    constructor(column, header, title = 'Edit Weights') {
        super(header, title);
        this.column = column;
    }
    openDialog() {
        const weights = this.column.getWeights(), children = this.column.children.map((d, i) => ({ col: d, weight: weights[i] * 100 }));
        //map weights to pixels
        const scale = (v) => Math.round((v / 100) * 120);
        const popup = this.makePopup('<table></table>');
        //show as a table with inputs and bars
        const base = popup.querySelector('table');
        children.forEach((d) => {
            base.insertAdjacentHTML('beforeend', `<tr>
        <td><input type="number" value="${d.weight}" min="0" max="100" size="5"></td>
        <td><div class="${d.col.cssClass} bar" style="background-color: ${d.col.color}"></div></td>
        <td>${d.col.label}</td>
       </tr>`);
            popup.lastElementChild.querySelector('input').addEventListener('input', function () {
                d.weight = +this.value;
                redraw();
            });
        });
        function redraw() {
            Array.from(base.querySelectorAll('.bar')).forEach((n, i) => n.style.width = `${scale(children[i].weight)}px`);
        }
        redraw();
        this.onButton(popup, {
            cancel: () => {
                this.column.setWeights(weights);
            },
            reset: () => {
                children.forEach((d, i) => d.weight = weights[i] * 100);
                Array.from(base.querySelectorAll('input')).forEach((n, i) => n.value = children[i].weight.toString());
                redraw();
            },
            submit: () => {
                this.column.setWeights(children.map((d) => d.weight));
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeightsEditDialog;



/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_HierarchyColumn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ADialog__ = __webpack_require__(6);


class CutOffHierarchyDialog extends __WEBPACK_IMPORTED_MODULE_1__ADialog__["a" /* default */] {
    /**
     * opens a dialog for filtering a categorical column
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param idPrefix id prefix used for generated ids
     */
    constructor(column, header, idPrefix) {
        super(header, 'Edit Hierarchy Cutoff');
        this.column = column;
        this.idPrefix = idPrefix;
    }
    openDialog() {
        const bak = this.column.getCutOff();
        const innerNodes = Object(__WEBPACK_IMPORTED_MODULE_0__model_HierarchyColumn__["b" /* resolveInnerNodes */])(this.column.hierarchy);
        const innerNodePaths = innerNodes.map((n) => n.path);
        const t = `<input type="text" value="${bak.node.label}"
        required="required" autofocus="autofocus" list="ui${this.idPrefix}lineupHierarchyList" placeholder="cut off node"><br>
        <input type="number" value="${isFinite(bak.maxDepth) ? bak.maxDepth : ''}" placeholder="max depth (&infin;)"><br>
        <datalist id="ui${this.idPrefix}lineupHierarchyList">${innerNodes.map((node) => `<option value="${node.path}">${node.label}</option>`)}</datalist>`;
        const popup = this.makePopup(t, false);
        //custom validation
        popup.querySelector('input[type="text"]').addEventListener('change', function () {
            const value = this.value;
            console.log('validate', value);
            if (innerNodePaths.indexOf(value) < 0) {
                this.setCustomValidity('invalid node');
            }
            else {
                this.setCustomValidity('');
            }
        });
        this.onButton(popup, {
            cancel: () => undefined,
            reset: () => undefined,
            submit: () => {
                const form = popup.querySelector('form');
                if (!form.checkValidity()) {
                    return false;
                }
                const newNode = popup.querySelector('input[type="text"]').value;
                const newNodeIndex = innerNodePaths.indexOf(newNode);
                const node = innerNodes[newNodeIndex];
                const maxDepthText = popup.querySelector('input[type="number"]').value;
                const maxDepth = maxDepthText === '' ? Infinity : parseInt(maxDepthText, 10);
                this.column.setCutOff(node, maxDepth);
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CutOffHierarchyDialog;



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);

class SearchDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    /**
     * opens a search dialog for the given column
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param provider the data provider for the actual search
     * @param title optional title
     */
    constructor(column, header, provider, title = 'Search') {
        super(header, title);
        this.column = column;
        this.provider = provider;
    }
    openDialog() {
        const popup = this.makePopup('<input type="text" size="15" value="" required autofocus placeholder="search..."><br><label><input type="checkbox">RegExp</label><br>');
        const input = popup.querySelector('input[type="text"]');
        const checkbox = popup.querySelector('input[type="checkbox"]');
        input.addEventListener('input', () => {
            let search = input.value;
            if (search.length < 3) {
                return;
            }
            const isRegex = checkbox.checked;
            if (isRegex) {
                search = new RegExp(search);
            }
            this.provider.searchAndJump(search, this.column);
        });
        const updateImpl = () => {
            let search = input.value;
            const isRegex = checkbox.checked;
            if (search.length > 0) {
                if (isRegex) {
                    search = new RegExp(search);
                }
                this.provider.searchAndJump(search, this.column);
            }
            __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */].removePopup(popup);
        };
        checkbox.addEventListener('change', updateImpl);
        this.onButton(popup, {
            cancel: () => undefined,
            reset: () => undefined,
            submit: () => {
                updateImpl();
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchDialog;



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hasDnDType */
/* unused harmony export copyDnD */
/* unused harmony export updateDropEffect */
/* harmony export (immutable) */ __webpack_exports__["a"] = dragAble;
/* harmony export (immutable) */ __webpack_exports__["b"] = dropAble;
/**
 * Created by Samuel Gratzl on 27.12.2016.
 */
/**
 * utility for drag-n-drop support
 * @param e
 * @param typesToCheck
 * @returns {any}
 */
function hasDnDType(e, ...typesToCheck) {
    const available = e.dataTransfer.types;
    /*
     * In Chrome datatransfer.types is an Array,
     * while in Firefox it is a DOMStringList
     * that only implements a contains-method!
     */
    if (typeof available.indexOf === 'function') {
        return typesToCheck.some((type) => available.indexOf(type) >= 0);
    }
    if (typeof available.includes === 'function') {
        return typesToCheck.some((type) => available.includes(type));
    }
    if (typeof available.contains === 'function') {
        return typesToCheck.some((type) => available.contains(type));
    }
    return false;
}
/**
 * helper storage for dnd in edge since edge doesn't support custom mime-types
 * @type {Map<number, {[p: string]: string}>}
 */
const dndTransferStorage = new Map();
function isEdgeDnD(e) {
    return dndTransferStorage.size > 0 && hasDnDType(e, 'text/plain');
}
/**
 * checks whether it is a copy operation
 * @param e
 * @returns {boolean|RegExpMatchArray}
 */
function copyDnD(e) {
    const dT = e.dataTransfer;
    return Boolean((e.ctrlKey && dT.effectAllowed.match(/copy/gi)) || (!dT.effectAllowed.match(/move/gi)));
}
/**
 * updates the drop effect accoriding to the current copyDnD state
 * @param e
 */
function updateDropEffect(e) {
    const dT = e.dataTransfer;
    if (copyDnD(e)) {
        dT.dropEffect = 'copy';
    }
    else {
        dT.dropEffect = 'move';
    }
}
let idCounter = 0;
/**
 * add drag support for the given element
 * @param {HTMLElement} node
 * @param {() => IDragStartResult} onDragStart callback to compute the payload an object of mime types
 * @param {boolean} stopPropagation whether to stop propagation in case of success
 */
function dragAble(node, onDragStart, stopPropagation = false) {
    const id = ++idCounter;
    node.draggable = true;
    node.addEventListener('dragstart', (e) => {
        node.classList.add('lu-dragging');
        const payload = onDragStart();
        e.dataTransfer.effectAllowed = payload.effectAllowed;
        if (stopPropagation) {
            e.stopPropagation();
        }
        const keys = Object.keys(payload.data);
        const allSucceded = keys.every((k) => {
            try {
                e.dataTransfer.setData(k, payload.data[k]);
                return true;
            }
            catch (e) {
                return false;
            }
        });
        if (allSucceded) {
            return;
        }
        //compatibility mode for edge
        const text = payload.data['text/plain'] || '';
        e.dataTransfer.setData('text/plain', `${id}${text ? `: ${text}` : ''}`);
        dndTransferStorage.set(id, payload.data);
    });
    node.addEventListener('dragend', (e) => {
        node.classList.remove('lu-dragging');
        if (stopPropagation) {
            e.stopPropagation();
        }
        if (dndTransferStorage.size > 0) {
            //clear the id
            dndTransferStorage.delete(id);
        }
    });
}
/**
 * add dropable support for the given node
 * @param {HTMLElement} node
 * @param {string[]} mimeTypes mimeTypes to look for
 * @param {(result: IDropResult, e: DragEvent) => boolean} onDrop callback when dropped, returns true if the drop was successful
 * @param {(e: DragEvent) => void} onDragOver optional drag over handler, e.g. for special effects
 * @param {boolean} stopPropagation flag if the event propagation should be stopped in case of success
 */
function dropAble(node, mimeTypes, onDrop, onDragOver = null, stopPropagation = false) {
    node.addEventListener('dragenter', (e) => {
        //var xy = mouse($node.node());
        if (hasDnDType(e, ...mimeTypes) || isEdgeDnD(e)) {
            node.classList.add('lu-dragover');
            if (stopPropagation) {
                e.stopPropagation();
            }
            //sounds good
            return false;
        }
        //not a valid mime type
        node.classList.remove('lu-dragover');
        return;
    });
    node.addEventListener('dragover', (e) => {
        if (hasDnDType(e, ...mimeTypes) || isEdgeDnD(e)) {
            e.preventDefault();
            updateDropEffect(e);
            node.classList.add('lu-dragover');
            if (stopPropagation) {
                e.stopPropagation();
            }
            if (onDragOver) {
                onDragOver(e);
            }
            //sound good
            return false;
        }
        return;
    });
    node.addEventListener('dragleave', (evt) => {
        // same fix as in phovea
        evt.target.classList.remove('lu-dragover');
    });
    node.addEventListener('drop', (e) => {
        e.preventDefault();
        if (stopPropagation) {
            e.stopPropagation();
        }
        updateDropEffect(e);
        const effect = e.dataTransfer.dropEffect;
        node.classList.remove('lu-dragover');
        if (isEdgeDnD(e)) {
            const base = e.dataTransfer.getData('text/plain');
            const id = parseInt(base.indexOf(':') >= 0 ? base.substring(0, base.indexOf(':')) : base, 10);
            if (dndTransferStorage.has(id)) {
                const data = dndTransferStorage.get(id);
                dndTransferStorage.delete(id);
                return !onDrop({ effect, data }, e);
            }
            return;
        }
        if (hasDnDType(e, ...mimeTypes)) {
            const data = {};
            //selects the data contained in the data transfer
            mimeTypes.forEach((mime) => {
                const value = e.dataTransfer.getData(mime);
                if (value !== '') {
                    data[mime] = value;
                }
            });
            return !onDrop({ effect, data }, e);
        }
        return;
    });
}


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);

class StratifyThresholdDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    /**
     * opens a dialog for editing the link of a column
     * @param column the column to rename
     * @param header the visual header element of this column
     */
    constructor(column, header) {
        super(header, 'Stratify by Threshold');
        this.column = column;
    }
    openDialog() {
        if (this.column.isGroupedBy() >= 0) {
            // disable grouping
            this.column.groupByMe();
            return;
        }
        const domain = this.column.getOriginalMapping().domain;
        const bak = this.column.getStratifyThresholds();
        const t = `<input
        type="number"
        size="15"
        value="${bak.length > 0 ? bak[0] : (domain[1] - domain[0]) / 2}"
        required
        autofocus
        min="${domain[0]}"
        max="${domain[1]}"
        step="any"
      ><br>`;
        const popup = this.makePopup(t);
        this.onButton(popup, {
            cancel: () => undefined,
            reset: () => undefined,
            submit: () => {
                const newValue = +popup.querySelector('input[type="number"]').value;
                this.column.setStratifyThresholds([newValue]);
                this.column.groupByMe();
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StratifyThresholdDialog;



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_engine_header__ = __webpack_require__(18);


class MoreColumnOptionsDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    /**
     * opens a rename dialog for the given column
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param title optional title
     * @param ctx
     */
    constructor(column, header, title = 'More', ctx) {
        super(header, title);
        this.column = column;
        this.ctx = ctx;
    }
    openDialog() {
        const popup = this.makeMenuPopup('');
        popup.classList.add('lu-more-options');
        Object(__WEBPACK_IMPORTED_MODULE_1__ui_engine_header__["f" /* createToolbarMenuItems */])(Object(__WEBPACK_IMPORTED_MODULE_1__ui_engine_header__["b" /* addIconDOM */])(popup, this.column, true), this.column, this.ctx);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MoreColumnOptionsDialog;



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = findTypeLike;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__INumberColumn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BoxPlotColumn__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CompositeNumberColumn__ = __webpack_require__(15);







function findTypeLike(col, lookup) {
    const type = col.desc.type;
    // direct hit
    if (lookup[type] !== undefined) {
        return lookup[type];
    }
    const aliases = typeAliases(col);
    const valid = aliases.find((a) => lookup[a] !== undefined);
    return valid ? lookup[valid] : undefined;
}
function typeAliases(col) {
    const aliases = ['default'];
    if (Object(__WEBPACK_IMPORTED_MODULE_0__CategoricalColumn__["b" /* isCategoricalColumn */])(col)) {
        aliases.push('categoricalLike');
    }
    if (Object(__WEBPACK_IMPORTED_MODULE_1__INumberColumn__["h" /* isNumberColumn */])(col)) {
        aliases.push('numberLike');
    }
    if (Object(__WEBPACK_IMPORTED_MODULE_2__BoxPlotColumn__["b" /* isBoxPlotColumn */])(col)) {
        aliases.push('boxplotLike');
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */]) {
        aliases.push('stringLike');
    }
    if (Object(__WEBPACK_IMPORTED_MODULE_4__CompositeColumn__["b" /* isMultiLevelColumn */])(col)) {
        aliases.push('multiLevelLike');
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_4__CompositeColumn__["a" /* default */]) {
        aliases.push('compositeLike');
    }
    if (col instanceof __WEBPACK_IMPORTED_MODULE_5__CompositeNumberColumn__["a" /* default */]) {
        aliases.push('compositeNumberLike');
    }
    return aliases.reverse(); // more specific first
}


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_engine_header__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_Column__ = __webpack_require__(1);




class CompositeChildrenDialog extends __WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */] {
    constructor(column, header, ctx) {
        super(header, '');
        this.column = column;
        this.ctx = ctx;
    }
    openDialog() {
        const popup = this.makePopup(`<div class="lu-sub-nested"></div>`);
        const wrapper = popup.querySelector('.lu-sub-nested');
        this.column.children.forEach((c) => {
            const n = Object(__WEBPACK_IMPORTED_MODULE_1__ui_engine_header__["c" /* createHeader */])(c, popup.ownerDocument, this.ctx, {
                mergeDropAble: false,
                resizeable: false
            });
            n.className = `lu-header ${c.cssClass ? ` ${c.cssClass}` : ''}${c.headerCssClass}${c.isFiltered() ? ' lu-filtered' : ''}`;
            Object(__WEBPACK_IMPORTED_MODULE_1__ui_engine_header__["j" /* updateHeader */])(n, c, this.ctx);
            wrapper.appendChild(n);
        });
        const id = `.dialog${Math.random().toString(36).slice(-8).substr(0, 3)}`;
        const stopListening = () => {
            this.column.on(Object(__WEBPACK_IMPORTED_MODULE_2__utils__["u" /* suffix */])(id, __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_REMOVE_COLUMN), null);
        };
        this.column.on(Object(__WEBPACK_IMPORTED_MODULE_2__utils__["u" /* suffix */])(id, __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_REMOVE_COLUMN), Object(__WEBPACK_IMPORTED_MODULE_2__utils__["f" /* debounce */])(() => {
            if (!popup.parentElement) {
                // already closed
                stopListening();
                return;
            }
            wrapper.innerHTML = '';
            this.column.children.forEach((c) => {
                const n = Object(__WEBPACK_IMPORTED_MODULE_1__ui_engine_header__["c" /* createHeader */])(c, popup.ownerDocument, this.ctx, {
                    mergeDropAble: false,
                    resizeable: false
                });
                n.className = `lu-header ${c.cssClass ? ` ${c.cssClass}` : ''}${c.headerCssClass}${c.isFiltered() ? ' lu-filtered' : ''}`;
                Object(__WEBPACK_IMPORTED_MODULE_1__ui_engine_header__["j" /* updateHeader */])(n, c, this.ctx);
                wrapper.appendChild(n);
            });
        }));
        this.onButton(popup, {
            cancel: () => stopListening(),
            reset: () => undefined,
            submit: () => {
                stopListening();
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CompositeChildrenDialog;



/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StringFilterDialog__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BooleanFilterDialog__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CategoricalFilterDialog__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MappingsFilterDialog__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CategoricalMappingFilterDialog__ = __webpack_require__(120);





const filters = {
    stringLike: __WEBPACK_IMPORTED_MODULE_0__StringFilterDialog__["a" /* default */],
    boolean: __WEBPACK_IMPORTED_MODULE_1__BooleanFilterDialog__["a" /* default */],
    categorical: __WEBPACK_IMPORTED_MODULE_2__CategoricalFilterDialog__["a" /* default */],
    number: __WEBPACK_IMPORTED_MODULE_3__MappingsFilterDialog__["a" /* default */],
    ordinal: __WEBPACK_IMPORTED_MODULE_4__CategoricalMappingFilterDialog__["a" /* default */],
    boxplot: __WEBPACK_IMPORTED_MODULE_3__MappingsFilterDialog__["a" /* default */],
    numbers: __WEBPACK_IMPORTED_MODULE_3__MappingsFilterDialog__["a" /* default */]
};
/* harmony export (immutable) */ __webpack_exports__["a"] = filters;



/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(16);

class BooleanFilterDialog extends __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */] {
    /**
     * opens a dialog for filtering a boolean column
     * @param column the column to filter
     * @param header the visual header element of this column
     * @param title optional title
     */
    constructor(column, header, title = 'Filter') {
        super(column, header, title);
    }
    openDialog() {
        const bak = this.column.getFilter();
        const popup = this.makePopup(`<label><input type="radio" name="boolean_check" value="null" ${bak === null ? 'checked="checked"' : ''}>No Filter</label><br>
     <label><input type="radio" name="boolean_check" value="true" ${bak === true ? 'checked="checked"' : ''}>True</label><br>
     <label><input type="radio" name="boolean_check" value="false" ${bak === false ? 'checked="checked"' : ''}>False</label>
    <br>`);
        const updateData = (filter) => {
            this.markFiltered((filter !== null));
            this.column.setFilter(filter);
        };
        function updateImpl() {
            //get value
            const isTrue = popup.querySelector('input[type="radio"][value="true"]').checked;
            const isFalse = popup.querySelector('input[type="radio"][value="false"]').checked;
            updateData(isTrue ? true : (isFalse ? false : null));
        }
        const radios = Array.from(popup.querySelectorAll('input[type="radio"]'));
        radios.forEach((r) => r.addEventListener('change', updateImpl));
        this.onButton(popup, {
            cancel: () => updateData(bak),
            reset: () => {
                const v = bak === null ? 'null' : String(bak);
                radios.forEach((r) => r.checked = r.value === v);
                updateData(null);
            },
            submit: () => {
                updateImpl();
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BooleanFilterDialog;



/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ADialog__ = __webpack_require__(6);


class CategoricalFilterDialog extends __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */] {
    /**
     * opens a dialog for filtering a categorical column
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param title optional title
     */
    constructor(column, header, title = 'Filter') {
        super(column, header, title);
    }
    openDialog() {
        const bakOri = this.column.getFilter() || { filter: [], filterMissing: false };
        const bak = bakOri.filter || [];
        const bakMissing = bakOri.filterMissing;
        const popup = this.makePopup(`<div class="selectionTable"><table><thead><th class="selectAll"></th><th>Category</th></thead><tbody></tbody></table></div>
        ${Object(__WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["b" /* filterMissingMarkup */])(bakMissing)}<br>`);
        // list all data rows !
        const colors = this.column.categoryColors, labels = this.column.categoryLabels;
        const trData = this.column.categories.map(function (d, i) {
            return { cat: d, label: labels[i], isChecked: bak.length === 0 || bak.indexOf(d) >= 0, color: colors[i] };
        }).sort(Object(__WEBPACK_IMPORTED_MODULE_1__ADialog__["b" /* sortByProperty */])('label'));
        const base = popup.querySelector('table');
        const rows = trData.map((d) => {
            base.insertAdjacentHTML('beforeend', `<tr>
          <td class="checkmark"></td>
          <td class="datalabel">${d.label}</td>
         </tr>`);
            const row = base.lastElementChild;
            row.querySelector('td.checkmark').addEventListener('click', () => {
                d.isChecked = !d.isChecked;
                redraw();
            });
            return row;
        });
        function redraw() {
            rows.forEach((row, i) => {
                const d = trData[i];
                row.querySelector('.checkmark').innerHTML = `<i class="fa fa-${(d.isChecked) ? 'check-' : ''}square-o"></i>`;
                row.querySelector('.datalabel').style.opacity = d.isChecked ? '1.0' : '.8';
            });
        }
        redraw();
        let isCheckedAll = true;
        function redrawSelectAll() {
            popup.querySelector('.selectAll').innerHTML = `<i class="fa fa-${(isCheckedAll) ? 'check-' : ''}square-o"></i>`;
        }
        popup.querySelector('thead').addEventListener('click', () => {
            isCheckedAll = !isCheckedAll;
            trData.forEach((row) => row.isChecked = isCheckedAll);
            redraw();
            redrawSelectAll();
        });
        const updateData = (filter, filterMissing) => {
            const noFilter = filter === null && filterMissing === false;
            this.markFiltered(!noFilter);
            this.column.setFilter(noFilter ? null : { filter: filter, filterMissing });
        };
        this.onButton(popup, {
            cancel: () => updateData(bak, bakMissing),
            reset: () => {
                trData.forEach((d) => d.isChecked = true);
                redraw();
                updateData(null, false);
            },
            submit: () => {
                let f = trData.filter((d) => d.isChecked).map((d) => d.cat);
                if (f.length === trData.length) {
                    f = null;
                }
                const filterMissing = popup.querySelector('input[type="checkbox"].lu_filter_missing').checked;
                updateData(f, filterMissing);
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoricalFilterDialog;



/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mappingeditor__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_popper_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ADialog__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_INumberColumn__ = __webpack_require__(2);





class MappingsFilterDialog extends __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */] {
    /**
     * opens the mapping editor for a given NumberColumn
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param title optional title
     * @param data the data provider for illustrating the mapping by example
     * @param idPrefix dom id prefix
     */
    constructor(column, header, title = 'Change Mapping', data, idPrefix) {
        super(column, header, title);
        this.data = data;
        this.idPrefix = idPrefix;
    }
    openDialog() {
        const original = this.column.getOriginalMapping();
        let bakfilter = this.column.getFilter(), bak = this.column.getMapping(), act = bak.clone(), actfilter = bakfilter;
        const parent = this.attachment.ownerDocument.body;
        parent.insertAdjacentHTML('beforeend', `<div class="lu-popup">${this.dialogForm('<div class="mappingArea"></div>')}</div>`);
        const popup = parent.lastElementChild;
        const applyMapping = (newscale, filter) => {
            act = newscale;
            actfilter = filter;
            this.markFiltered(!newscale.eq(original) || (bakfilter.min !== filter.min || bakfilter.max !== filter.min || bakfilter.filterMissing !== filter.filterMissing));
            this.column.setMapping(newscale);
            this.column.setFilter(filter);
        };
        const editorOptions = {
            idPrefix: this.idPrefix,
            callback: applyMapping,
            triggerCallback: 'dragend',
            padding_ver: 15
        };
        const dataSample = Promise.resolve(this.data.mappingSample(this.column));
        let editor = new __WEBPACK_IMPORTED_MODULE_1__mappingeditor__["a" /* default */](popup.querySelector('.mappingArea'), act, original, actfilter, dataSample, editorOptions);
        this.onButton(popup, {
            cancel: () => {
                this.column.setMapping(bak);
                this.markFiltered(!bak.eq(original));
            },
            reset: () => {
                bak = original;
                act = bak.clone();
                bakfilter = Object(__WEBPACK_IMPORTED_MODULE_4__model_INumberColumn__["l" /* noNumberFilter */])();
                actfilter = bakfilter;
                applyMapping(act, actfilter);
                popup.querySelector('.mappingArea').innerHTML = '';
                editor = new __WEBPACK_IMPORTED_MODULE_1__mappingeditor__["a" /* default */](popup.querySelector('.mappingArea'), act, original, actfilter, dataSample, editorOptions);
            },
            submit: () => {
                applyMapping(editor.scale, editor.filter);
                return true;
            }
        });
        const popper = new __WEBPACK_IMPORTED_MODULE_2_popper_js__["a" /* default */](this.attachment, popup, {
            placement: 'bottom-start',
            removeOnDestroy: true
        });
        __WEBPACK_IMPORTED_MODULE_3__ADialog__["a" /* default */].registerPopup(popup, popper, false);
        this.hidePopupOnClickOutside(popup);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MappingsFilterDialog;



/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialogs_AFilterDialog__ = __webpack_require__(16);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */



function clamp(v, min, max) {
    return Math.max(Math.min(v, max), min);
}
function unique(data) {
    return Array.from(new Set(data));
}
class MappingEditor {
    constructor(parent, scale, original, oldFilter, dataPromise, options) {
        this.scale = scale;
        this.original = original;
        this.oldFilter = oldFilter;
        this.dataPromise = dataPromise;
        this.options = {
            idPrefix: '',
            width: 370,
            height: 150,
            padding_hor: 7,
            padding_ver: 7,
            filter_height: 20,
            radius: 5,
            callback: () => undefined,
            callbackThisArg: null,
            triggerCallback: 'change' //change, dragend
        };
        Object.assign(this.options, options);
        //work on a local copy
        this.scale = scale.clone();
        this._filter = {
            min: this.oldFilter.min,
            max: this.oldFilter.max
        };
        this.build(Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(parent));
    }
    get filter() {
        return this.computeFilter();
    }
    build($root) {
        const options = this.options, that = this;
        $root = $root.append('div').classed('lu-mapping-editor', true);
        const width = options.width - options.padding_hor * 2;
        const height = options.height - options.padding_ver * 2 - options.filter_height;
        $root.node().innerHTML = `<form onsubmit="return false">
      <div><label for="me${options.idPrefix}mapping_type"><span class="title">Mapping / Scaling Type: </span><select id="me${options.idPrefix}mapping_type">
        <option value="linear">Linear</option>
        <option value="linear_invert">Invert</option>
        <option value="linear_abs">Absolute</option>
        <option value="log">Log</option>
        <option value="pow1.1">Pow 1.1</option>
        <option value="pow2">Pow 2</option>
        <option value="pow3">Pow 3</option>
        <option value="sqrt">Sqrt</option>
        <option value="script">Custom Script</option>
      </select>
      </label></div>
      <div class="filter_part"><span class="title">Mapping:</span></div>
      <div class="mapping_area">
        <div>
          <span>0</span>
          <input type="text" class="raw_min" id="me${options.idPrefix}raw_min" value="0"><label for="me${options.idPrefix}raw_min">Min</label>
        </div>
        <svg width="${options.width}" height="${options.height + 35}">
          <text x="${width / 2}" y="10">Normalized Input</text>
          <text x="${width / 2}" y="${options.height - options.filter_height + 5}">Raw Input</text>
          <line y1="${options.padding_ver}" y2="${options.padding_ver}" x1="${options.padding_hor}" x2="${width + options.padding_hor}" stroke="black"></line>
          <rect class="adder" x="${options.padding_hor}" width="${width}" height="10"></rect>
          <line y1="${options.height - options.filter_height - options.padding_ver}" y2="${options.height - options.filter_height - options.padding_ver}" x1="${options.padding_hor}" x2="${width + options.padding_hor}" stroke="black"></line>
          <rect class="adder" x="${options.padding_hor}" width="${width}" height="10" y="${options.height - options.filter_height - 10}"></rect>
          <g transform="translate(${options.padding_hor},${options.padding_ver})">
            <g class="samples"></g>
            <g class="mappings"></g>
            <g class="filter" transform="translate(0,${options.height - options.filter_height - options.padding_ver - 10 + 35})">
               <g class="left_filter" transform="translate(0,0)">
                  <path d="M0,0L4,7L-4,7z"></path>
                  <rect x="-4" y="7" width="40" height="13" rx="2" ry="2"></rect>
                  <text y="14" x="15" text-anchor="middle">Min</text>
                </g>
              <g class="right_filter" transform="translate(${width},0)">
                  <path d="M0,0L4,7L-4,7z"></path>
                  <rect x="-36" y="7" width="40" height="13" rx="2" ry="2"></rect>
                  <text y="14" x="-15" text-anchor="middle">Max</text>
              </g>
            </g>
          </g>
        </svg>
        <div>
          <span>1</span>
          <input type="text" class="raw_max" id="me${options.idPrefix}raw_max" value="1"><label for="me${options.idPrefix}raw_max">Max</label>
        </div>
      </div>
      <div class="filter_part2" style=""><span class="title">Filter:</span></div>

      <div id="me${options.idPrefix}filter_inputs">
        <div>
          <label for="me${options.idPrefix}min_filter_input">Min Filter:</label>
          <input id="me${options.idPrefix}min_filter_input" type="number" step="0.1">
        </div>
        <div>
          <label for="me${options.idPrefix}max_filter_input">Max Filter:</label>
          <input id="me${options.idPrefix}max_filter_input" type="number" step="0.1">
        </div>
      </div>
      <div>
         Extras: <label><input type="checkbox" id="me${options.idPrefix}filterMissing" ${this.oldFilter.filterMissing ? 'checked="checked"' : ''}>${__WEBPACK_IMPORTED_MODULE_2__dialogs_AFilterDialog__["d" /* filterMissingText */]}</label>
      </div>
      <div class="script" style="/* display: none; */">
        <label for="me${options.idPrefix}script_code">Custom Script</label><button>Apply</button>
        <textarea id="me${options.idPrefix}script_code">
        </textarea>
      </div>
    </form>`;
        const raw2pixel = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([Math.min(this.scale.domain[0], this.original.domain[0]), Math.max(this.scale.domain[this.scale.domain.length - 1], this.original.domain[this.original.domain.length - 1])])
            .range([0, width]);
        const normal2pixel = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([0, 1])
            .range([0, width]);
        const inputDomain = raw2pixel.domain();
        const outputDomain = normal2pixel.domain();
        $root.select('input.raw_min')
            .property('value', raw2pixel.domain()[0])
            .on('blur', function () {
            const d = raw2pixel.domain();
            d[0] = parseFloat(this.value);
            raw2pixel.domain(d);
            const old = that.scale.domain;
            old[0] = d[0];
            that.scale.domain = old;
            updateRaw();
            triggerUpdate();
        });
        $root.select('input.raw_max')
            .property('value', raw2pixel.domain()[1])
            .on('blur', function () {
            const d = raw2pixel.domain();
            d[1] = parseFloat(this.value);
            raw2pixel.domain(d);
            const old = that.scale.domain;
            old[old.length - 1] = d[1];
            that.scale.domain = old;
            updateRaw();
            triggerUpdate();
        });
        $root.select('input[type="checkbox"]').on('change', () => {
            triggerUpdate();
        });
        //lines that show mapping of individual data items
        let datalines = $root.select('g.samples').selectAll('line').data([]);
        this.dataPromise.then((data) => {
            //to unique values
            data = unique(data);
            datalines = datalines.data(data);
            datalines.enter()
                .append('line')
                .attr({
                x1: (d) => normal2pixel(that.scale.apply(d)),
                y1: 0,
                x2: raw2pixel,
                y2: height
            }).style('visibility', (d) => {
                const domain = that.scale.domain;
                return (d < domain[0] || d > domain[domain.length - 1]) ? 'hidden' : null;
            });
        });
        function updateDataLines() {
            datalines.attr({
                x1: (d) => normal2pixel(that.scale.apply(d)),
                x2: raw2pixel
            }).style('visibility', (d) => {
                const domain = that.scale.domain;
                return (d < domain[0] || d > domain[domain.length - 1]) ? 'hidden' : null;
            });
        }
        function createDrag(move) {
            return __WEBPACK_IMPORTED_MODULE_0_d3__["behavior"].drag()
                .on('dragstart', function () {
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this)
                    .classed('dragging', true)
                    .attr('r', options.radius * 1.1);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(`#me${options.idPrefix}mapping-overlay`).classed('hide', true);
            })
                .on('drag', move)
                .on('dragend', function () {
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this)
                    .classed('dragging', false)
                    .attr('r', options.radius);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(`#me${options.idPrefix}mapping-overlay`).classed('hide', false);
                triggerUpdate(true);
            });
        }
        let mappingLines = [];
        function renderMappingLines() {
            if (!(that.scale instanceof __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["a" /* ScaleMappingFunction */])) {
                return;
            }
            {
                const sscale = that.scale;
                const domain = sscale.domain;
                const range = sscale.range;
                mappingLines = domain.map((d, i) => ({ r: d, n: range[i] }));
            }
            function updateScale() {
                //sort by raw value
                mappingLines.sort((a, b) => a.r - b.r);
                //update the scale
                const scale = that.scale;
                scale.domain = mappingLines.map((d) => d.r);
                scale.range = mappingLines.map((d) => d.n);
                //console.log(sscale.domain, sscale.range);
                updateDataLines();
            }
            function removePoint(i) {
                if (mappingLines.length <= 2) {
                    return; //can't remove have to have at least two
                }
                mappingLines.splice(i, 1);
                updateScale();
                renderMappingLines();
            }
            function addPoint(x) {
                const px = clamp(x, 0, width);
                mappingLines.push({
                    n: normal2pixel.invert(px),
                    r: raw2pixel.invert(px)
                });
                updateScale();
                renderMappingLines();
            }
            $root.on('click', function () {
                $root.select(`#me${options.idPrefix}mapping-overlay`).remove();
            });
            $root.selectAll('rect.adder').on('click', () => {
                addPoint(Object(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"])($root.select('svg > g').node())[0]);
            });
            function createOverlay(d) {
                $root.select(`#me${options.idPrefix}mapping-overlay`).remove();
                const overlayOptions = [{
                        label: 'Normalized Input',
                        value: d.n,
                        domain: outputDomain,
                        type: 'normalized'
                    },
                    {
                        label: 'Raw Input',
                        value: d.r,
                        domain: inputDomain,
                        type: 'raw'
                    }];
                const overlay = $root.append('div');
                overlay.attr('id', `me${options.idPrefix}mapping-overlay`)
                    .attr('style', `left: ${__WEBPACK_IMPORTED_MODULE_0_d3__["event"].layerX + options.padding_hor + 50}px; top: ${__WEBPACK_IMPORTED_MODULE_0_d3__["event"].layerY + options.padding_ver}px`)
                    .on('click', () => __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation());
                const $overlays = overlay.selectAll('div').data(overlayOptions);
                const $overlaysEnter = $overlays.enter().append('div');
                $overlaysEnter
                    .append('label')
                    .attr('for', (datum) => `me${options.idPrefix}${datum.type}-input`)
                    .text((datum) => `${datum.label}: `);
                $overlaysEnter
                    .append('input')
                    .attr('id', (datum) => `me${options.idPrefix}${datum.type}-input`)
                    .attr('type', 'number')
                    .attr('min', (datum) => datum.domain[0])
                    .attr('max', (datum) => datum.domain[1])
                    .attr('step', 0.01)
                    .attr('data-type', (datum) => datum.type)
                    .attr('value', (datum) => parseFloat(datum.value.toFixed(2)))
                    .on('change', (datum) => {
                    // this is bound to the enclosing context, which is a mapping (<g class="mapping>)
                    const element = __WEBPACK_IMPORTED_MODULE_0_d3__["event"].target;
                    const type = datum.type;
                    let position = 0;
                    switch (type) {
                        case 'normalized':
                            d.n = parseFloat(element.value);
                            position = normal2pixel(parseFloat(element.value));
                            Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).select('line').attr('x1', position);
                            break;
                        case 'raw':
                            d.r = parseFloat(element.value);
                            position = raw2pixel(parseFloat(element.value));
                            Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).select('line').attr('x2', position);
                            break;
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).select(`circle.${type}`).attr('cx', position);
                    updateScale();
                    options.callback.call(options.callbackThisArg, that.scale.clone(), that.filter);
                });
                __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
            }
            function updateOverlayInput(value, type) {
                const overlay = document.querySelector(`#me${options.idPrefix}mapping-overlay`);
                if (overlay) {
                    const input = document.querySelector(`#me${options.idPrefix}${type}-input`);
                    input.value = value.toFixed(2);
                }
            }
            const $mapping = $root.select('g.mappings').selectAll('g.mapping').data(mappingLines);
            $mapping.on('click', createOverlay);
            const $mappingEnter = $mapping.enter().append('g').classed('mapping', true).on('contextmenu', (_d, i) => {
                __WEBPACK_IMPORTED_MODULE_0_d3__["event"].preventDefault();
                __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
                removePoint(i);
            });
            $mappingEnter.append('line').attr({
                y1: 0,
                y2: height
            }).call(createDrag(function (d) {
                //drag the line shifts both point in parallel
                const dx = __WEBPACK_IMPORTED_MODULE_0_d3__["event"].dx;
                const nx = clamp(normal2pixel(d.n) + dx, 0, width);
                const rx = clamp(raw2pixel(d.r) + dx, 0, width);
                d.n = normal2pixel.invert(nx);
                d.r = raw2pixel.invert(rx);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).attr('x1', nx).attr('x2', rx);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('circle.normalized').attr('cx', nx);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('circle.raw').attr('cx', rx);
                updateOverlayInput(d.r, 'raw');
                updateOverlayInput(d.n, 'normalized');
                updateScale();
            }));
            $mappingEnter.append('circle').classed('normalized', true).attr('r', options.radius).call(createDrag(function (d) {
                //drag normalized
                const px = clamp(__WEBPACK_IMPORTED_MODULE_0_d3__["event"].x, 0, width);
                d.n = normal2pixel.invert(px);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).attr('cx', px);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('line').attr('x1', px);
                updateOverlayInput(d.n, 'normalized');
                updateScale();
            }));
            $mappingEnter.append('circle').classed('raw', true).attr('r', options.radius).attr('cy', height).call(createDrag(function (d) {
                //drag raw
                const px = clamp(__WEBPACK_IMPORTED_MODULE_0_d3__["event"].x, 0, width);
                d.r = raw2pixel.invert(px);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).attr('cx', px);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('line').attr('x2', px);
                updateOverlayInput(d.r, 'raw');
                updateScale();
            }));
            $mapping.select('line').attr({
                x1: (d) => normal2pixel(d.n),
                x2: (d) => raw2pixel(d.r)
            });
            $mapping.select('circle.normalized').attr('cx', (d) => normal2pixel(d.n));
            $mapping.select('circle.raw').attr('cx', (d) => raw2pixel(d.r));
            $mapping.exit().remove();
        }
        function renderScript() {
            if (!(that.scale instanceof __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["b" /* ScriptMappingFunction */])) {
                $root.select('div.script').style('display', 'none');
                return;
            }
            $root.select('div.script').style('display', null);
            const sscale = that.scale;
            const $text = $root.select('textarea').text(sscale.code);
            $root.select('div.script').select('button').on('click', () => {
                sscale.code = $text.property('value');
                updateDataLines();
                triggerUpdate();
            });
        }
        renderMappingLines();
        renderScript();
        function triggerUpdate(isDragEnd = false) {
            if (isDragEnd && (options.triggerCallback !== 'dragend')) {
                return;
            }
            options.callback.call(options.callbackThisArg, that.scale.clone(), that.filter);
        }
        {
            const minFilter = (isFinite(this.oldFilter.min) ? raw2pixel(this.oldFilter.min) : 0);
            const maxFilter = (isFinite(this.oldFilter.max) ? raw2pixel(this.oldFilter.max) : width);
            // use the old filter if one was available, set to domain boundaries otherwise
            const initialValues = [
                (isFinite(this.oldFilter.min) ? this.oldFilter.min : inputDomain[0]).toFixed(1),
                (isFinite(this.oldFilter.max) ? this.oldFilter.max : inputDomain[1]).toFixed(1)
            ];
            Object(__WEBPACK_IMPORTED_MODULE_0_d3__["selectAll"])(`#me${options.idPrefix}filter_inputs div input`)
                .attr('min', inputDomain[0])
                .attr('max', inputDomain[1])
                .data(initialValues)
                .attr('value', (d) => d)
                .on('change', function (_d, i) {
                const value = parseFloat(this.value);
                const which = i === 0 ? 'min' : 'max';
                if (value >= inputDomain[0] && value <= inputDomain[1]) {
                    const selector = (which === 'min') ? 'left' : 'right';
                    const px = raw2pixel(value);
                    that._filter[which] = (value === inputDomain[0]) ? -Infinity : (value === inputDomain[1]) ? Infinity : value;
                    $root.select(`g.${selector}_filter`).attr('transform', `translate(${px}, 0)`);
                }
                triggerUpdate();
            });
            $root.selectAll('g.left_filter, g.right_filter')
                .data([this.oldFilter.min, this.oldFilter.max])
                .attr('transform', (_d, i) => `translate(${i === 0 ? minFilter : maxFilter},0)`).call(createDrag(function (_d, i) {
                //drag normalized
                const px = clamp(__WEBPACK_IMPORTED_MODULE_0_d3__["event"].x, 0, width);
                const v = raw2pixel.invert(px);
                const which = i === 0 ? 'min' : 'max';
                const filter = (px <= 0 && which === 'min' ? -Infinity : (px >= width && which === 'max' ? Infinity : v));
                that._filter[which] = filter;
                document.querySelector(`#me${options.idPrefix}filter_inputs #me${options.idPrefix}${which}_filter_input`).value = v.toFixed(1);
                Object(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).datum(filter)
                    .attr('transform', `translate(${px},0)`);
            }));
        }
        this.computeFilter = () => {
            return {
                min: this._filter.min,
                max: this._filter.max,
                filterMissing: $root.select('input[type="checkbox"]').property('checked')
            };
        };
        function updateRaw() {
            const d = raw2pixel.domain();
            $root.select('input.raw_min').property('value', d[0]);
            $root.select('input.raw_max').property('value', d[1]);
            updateDataLines();
            renderMappingLines();
            updateFilter();
        }
        function updateFilter() {
            const raw = raw2pixel.domain();
            $root.select(`g.left_filter`).attr('transform', `translate(${raw2pixel(isFinite(that._filter.min) ? that._filter.min : raw[0])}, 0)`);
            $root.select(`g.right_filter`).attr('transform', `translate(${raw2pixel(isFinite(that._filter.max) ? that._filter.max : raw[1])}, 0)`);
            const filterValues = [
                (isFinite(that._filter.min) ? that._filter.min : raw[0]).toFixed(1),
                (isFinite(that._filter.max) ? that._filter.max : raw[1]).toFixed(1)
            ];
            Object(__WEBPACK_IMPORTED_MODULE_0_d3__["selectAll"])(`#me${options.idPrefix}filter_inputs div input`).data(filterValues).property('value', String);
        }
        updateRaw();
        $root.select('select').on('change', function () {
            const v = this.value;
            if (v === 'linear_invert') {
                that.scale = new __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["a" /* ScaleMappingFunction */](raw2pixel.domain(), 'linear', [1, 0]);
            }
            else if (v === 'linear_abs') {
                const d = raw2pixel.domain();
                that.scale = new __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["a" /* ScaleMappingFunction */]([d[0], (d[1] - d[0]) / 2, d[1]], 'linear', [1, 0, 1]);
            }
            else if (v === 'script') {
                that.scale = new __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["b" /* ScriptMappingFunction */](raw2pixel.domain());
            }
            else {
                that.scale = new __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["a" /* ScaleMappingFunction */](raw2pixel.domain(), v);
            }
            updateDataLines();
            renderMappingLines();
            renderScript();
            triggerUpdate();
        }).property('selectedIndex', function () {
            let name = 'script';
            if (that.scale instanceof __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["a" /* ScaleMappingFunction */]) {
                name = that.scale.scaleType;
            }
            const types = ['linear', 'linear_invert', 'linear_abs', 'log', 'pow1.1', 'pow2', 'pow3', 'sqrt', 'script'];
            return types.indexOf(name);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MappingEditor;



/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ADialog__ = __webpack_require__(6);



class CategoricalMappingFilterDialog extends __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */] {
    /**
     * opens the mapping editor for a given CategoricalNumberColumn, i.e. to map categories to numbers
     * @param column the column to rename
     * @param header the visual header element of this column
     * @param title mapping title
     */
    constructor(column, header, title = 'Edit Categorical Mapping') {
        super(column, header, title);
    }
    openDialog() {
        const bakOri = this.column.getFilter() || { filter: [], filterMissing: false };
        const bak = bakOri.filter;
        const bakMissing = bakOri.filterMissing;
        const scale = __WEBPACK_IMPORTED_MODULE_1_d3__["scale"].linear().domain([0, 100]).range([0, 120]);
        const popup = this.makePopup(`<div class="selectionTable"><table><thead><th class="selectAll"></th><th colspan="2">Scale</th><th>Category</th></thead><tbody></tbody></table></div>
        ${Object(__WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["b" /* filterMissingMarkup */])(bakMissing)}<br>`);
        const range = this.column.getScale().range, colors = this.column.categoryColors, labels = this.column.categoryLabels;
        const trData = this.column.categories.map((d, i) => {
            return {
                cat: d,
                label: labels[i],
                isChecked: bak.length === 0 || bak.indexOf(d) >= 0,
                range: range[i] * 100,
                color: colors[i]
            };
        }).sort(Object(__WEBPACK_IMPORTED_MODULE_2__ADialog__["b" /* sortByProperty */])('label'));
        const base = popup.querySelector('table');
        const rows = trData.map((d) => {
            base.insertAdjacentHTML('beforeend', `<tr>
          <td class="checkmark"></td>
          <td><input type="number" value="${d.range}" min="0" max="100" size="5"></td>
          <td><div class="bar" style="background-color: ${d.color}"></div></td>
          <td class="datalabel">${d.label}</td>
         </tr>`);
            const row = base.lastElementChild;
            row.querySelector('td.checkmark').addEventListener('click', () => {
                d.isChecked = !d.isChecked;
                redraw();
            });
            row.querySelector('input').addEventListener('input', function () {
                d.range = parseFloat(this.value);
                redraw();
            });
            return row;
        });
        function redraw() {
            rows.forEach((row, i) => {
                const d = trData[i];
                row.querySelector('.checkmark').innerHTML = `<i class="fa fa-${(d.isChecked) ? 'check-' : ''}square-o"></i>`;
                row.querySelector('.bar').style.width = `${scale(d.range)}px`;
                row.querySelector('.datalabel').style.opacity = d.isChecked ? '1.0' : '.8';
            });
        }
        redraw();
        let isCheckedAll = true;
        function redrawSelectAll() {
            popup.querySelector('.selectAll').innerHTML = `<i class="fa fa-${(isCheckedAll) ? 'check-' : ''}square-o"></i>`;
        }
        popup.querySelector('thead').addEventListener('click', () => {
            isCheckedAll = !isCheckedAll;
            trData.forEach((row) => row.isChecked = isCheckedAll);
            redraw();
            redrawSelectAll();
        });
        redrawSelectAll();
        const updateData = (filter, filterMissing) => {
            const noFilter = filter === null && filterMissing === false;
            this.markFiltered(!noFilter);
            this.column.setFilter(noFilter ? null : { filter: filter, filterMissing });
        };
        this.onButton(popup, {
            cancel: () => {
                updateData(bak, bakMissing);
                this.column.setMapping(range);
            },
            reset: () => {
                trData.forEach((d) => {
                    d.isChecked = true;
                    d.range = 50;
                });
                redraw();
                updateData(null, false);
                this.column.setMapping(trData.map(() => 1));
            },
            submit: () => {
                let f = trData.filter((d) => d.isChecked).map((d) => d.cat);
                if (f.length === trData.length) {
                    f = null;
                }
                const filterMissing = popup.querySelector('input[type="checkbox"].lu_filter_missing').checked;
                updateData(f, filterMissing);
                this.column.setMapping(trData.map((d) => d.range / 100));
                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoricalMappingFilterDialog;



/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export summaryString */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_CategoricalColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_StringColumn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_CategoricalNumberColumn__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialogs_AFilterDialog__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dialogs_StringFilterDialog__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(0);








const defaultSummaries = {
    stringLike: summaryString,
    categoricalLike: summaryCategorical,
    numberLike: summaryNumerical,
    selection: summarySelection,
    aggregate: summaryAggregation
};
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultSummaries;

function summaryCategorical(col, node, interactive, ctx) {
    const stats = ctx.statsOf(col);
    const old = node.dataset.summary;
    if (!stats || stats.hist.length > 50) {
        node.innerHTML = '';
        return;
    }
    const cats = col.categories;
    const colors = col.categoryColors;
    const labels = col.categoryLabels;
    if (!old || !old.endsWith('hist')) {
        stats.hist.forEach(({ cat, y }) => {
            const i = cats.indexOf(cat);
            node.insertAdjacentHTML('beforeend', `<div style="height: ${Math.round(y * 100 / stats.maxBin)}%; background-color: ${colors[i]}" title="${labels[i]}: ${y}" data-cat="${cat}" ${interactive ? `data-title="${labels[i]}"` : ''}></div>`);
        });
    }
    else {
        const bins = Array.from(node.querySelectorAll('div[data-cat]'));
        for (let i = bins.length; i < stats.hist.length; ++i) {
            node.insertAdjacentHTML('beforeend', `<div style="background-color: ${colors[i]}" data-cat="${stats.hist[i].cat}" ${interactive ? `data-title="${labels[i]}"` : ''}></div>`);
            const n = node.lastElementChild;
            if (bins.length === 0) {
                node.insertBefore(node.firstElementChild, n);
            }
            else {
                node.insertBefore(node.children[i], n);
            }
            bins.push(n);
        }
        stats.hist.forEach(({ y }, i) => {
            const bin = bins[i];
            bin.style.height = `${Math.round(y * 100 / stats.maxBin)}%`;
            bin.title = `${labels[i]}: ${y}`;
        });
    }
    if (!(col instanceof __WEBPACK_IMPORTED_MODULE_0__model_CategoricalColumn__["a" /* default */] || col instanceof __WEBPACK_IMPORTED_MODULE_3__model_CategoricalNumberColumn__["a" /* default */])) {
        node.dataset.summary = 'hist';
        return;
    }
    node.dataset.summary = interactive ? 'interactive-filter-hist' : 'interactive-hist';
    // make histogram interactive
    const ccol = col;
    const start = ccol.getFilter();
    let filterMissing = null;
    Array.from(node.children).slice(0, cats.length).forEach((bin, i) => {
        const cat = bin.dataset.cat;
        bin.dataset.filtered = __WEBPACK_IMPORTED_MODULE_0__model_CategoricalColumn__["a" /* default */].filter(start, cat) ? '' : 'filtered';
        bin.onclick = (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            // toggle filter
            const old = ccol.getFilter();
            if (old === null || !Array.isArray(old.filter)) {
                // deselect
                const without = cats.slice();
                bin.dataset.filtered = 'filtered';
                without.splice(i, 1);
                ccol.setFilter({
                    filterMissing: filterMissing ? filterMissing.checked : false,
                    filter: without
                });
                return;
            }
            const filter = old.filter.slice();
            const contained = filter.indexOf(cat);
            if (contained >= 0) {
                // remove
                bin.dataset.filtered = 'filtered';
                filter.splice(contained, 1);
            }
            else {
                // readd
                bin.dataset.filtered = '';
                filter.push(cat);
            }
            ccol.setFilter({
                filterMissing: filterMissing ? filterMissing.checked : old.filterMissing,
                filter
            });
        };
    });
    if (!interactive) {
        return;
    }
    if (old !== 'interactive-filter-hist') {
        node.insertAdjacentHTML('beforeend', Object(__WEBPACK_IMPORTED_MODULE_4__dialogs_AFilterDialog__["c" /* filterMissingNumberMarkup */])(start !== null && start.filterMissing, stats.missing));
        filterMissing = node.querySelector('input');
    }
    else {
        filterMissing = node.querySelector('input');
        filterMissing.checked = start !== null && start.filterMissing;
    }
    filterMissing.onchange = () => {
        // toggle filter
        const old = ccol.getFilter();
        if (old === null) {
            ccol.setFilter({ filterMissing: filterMissing.checked, filter: [] });
        }
        else {
            ccol.setFilter({ filterMissing: filterMissing.checked, filter: old.filter });
        }
    };
}
function summaryNumerical(col, node, interactive, ctx) {
    const stats = ctx.statsOf(col);
    const old = node.dataset.summary;
    if (!stats) {
        node.innerHTML = '';
        return;
    }
    if (!interactive || !(col instanceof __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["d" /* default */])) {
        node.dataset.summary = 'hist';
        node.innerHTML = '';
        stats.hist.forEach(({ x, y }, i) => {
            node.insertAdjacentHTML('beforeend', `<div style="height: ${Math.round(y * 100 / stats.maxBin)}%; background-color: ${col.getMetaData().color};" title="Bin ${i}: ${y}" data-x="${x}"></div>`);
        });
        if (Object(__WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["e" /* isMapAbleColumn */])(col)) {
            const range = col.getRange();
            node.insertAdjacentHTML('beforeend', `<span>${range[0]}</span><span>${range[1]}</span>`);
        }
        return;
    }
    const ncol = col;
    const filter = ncol.getFilter();
    const domain = ncol.getMapping().domain;
    const percent = (v) => 100 * (v - domain[0]) / (domain[1] - domain[0]);
    const unpercent = (v) => ((v / 100) * (domain[1] - domain[0]) + domain[0]);
    const filterMin = isFinite(filter.min) ? filter.min : domain[0];
    const filterMax = isFinite(filter.max) ? filter.max : domain[1];
    if (old === 'slider-hist') {
        const bins = Array.from(node.querySelectorAll('div[data-x]'));
        for (let i = bins.length; i < stats.hist.length; ++i) {
            node.insertAdjacentHTML('afterbegin', `<div></div>`);
            bins.unshift(node.firstElementChild);
        }
        stats.hist.forEach(({ x, y }, i) => {
            const bin = bins[i];
            bin.style.height = `${Math.round(y * 100 / stats.maxBin)}%`;
            bin.style.backgroundColor = col.getMetaData().color;
            bin.title = `Bin ${i}: ${y}`;
            bin.dataset.x = String(x);
        });
    }
    else {
        node.dataset.summary = 'slider-hist';
        stats.hist.forEach(({ x, y }, i) => {
            node.insertAdjacentHTML('beforeend', `<div style="height: ${Math.round(y * 100 / stats.maxBin)}%" title="Bin ${i}: ${y}" data-x="${x}"></div>`);
        });
        node.insertAdjacentHTML('beforeend', `
      <div data-handle="min-hint" style="width: ${Math.round(percent(filterMin))}%"></div>
      <div data-handle="max-hint" style="width: ${Math.round(100 - percent(filterMax))}%"></div>
      <div data-handle="min" data-value="${Object(__WEBPACK_IMPORTED_MODULE_7__utils__["q" /* round */])(filterMin, 2)}" style="left: ${Math.round(percent(filterMin))}%"></div>
      <div data-handle='max' data-value="${Object(__WEBPACK_IMPORTED_MODULE_7__utils__["q" /* round */])(filterMax, 2)}" style="right: ${Math.round(100 - percent(filterMax))}%"></div>
      ${Object(__WEBPACK_IMPORTED_MODULE_4__dialogs_AFilterDialog__["c" /* filterMissingNumberMarkup */])(filter.filterMissing, stats.missing)}
    `);
    }
    const min = node.querySelector('[data-handle=min]');
    const max = node.querySelector('[data-handle=max]');
    const minHint = node.querySelector('[data-handle=min-hint]');
    const maxHint = node.querySelector('[data-handle=max-hint]');
    const filterMissing = node.querySelector('input');
    if (old === 'slider-hist') {
        // just update
        minHint.style.width = `${Math.round(percent(filterMin))}%`;
        maxHint.style.width = `${Math.round(100 - percent(filterMax))}%`;
        min.dataset.value = Object(__WEBPACK_IMPORTED_MODULE_7__utils__["q" /* round */])(filterMin, 2).toString();
        max.dataset.value = Object(__WEBPACK_IMPORTED_MODULE_7__utils__["q" /* round */])(filterMax, 2).toString();
        min.style.left = `${Math.round(percent(filterMin))}%`;
        max.style.right = `${Math.round(100 - percent(filterMax))}%`;
        filterMissing.checked = filter.filterMissing;
        return;
    }
    const update = () => {
        const minValue = unpercent(parseFloat(min.style.left));
        const maxValue = unpercent(100 - parseFloat(max.style.right));
        ncol.setFilter({
            filterMissing: filterMissing.checked,
            min: Math.abs(minValue - domain[0]) < 0.001 ? NaN : minValue,
            max: Math.abs(maxValue - domain[1]) < 0.001 ? NaN : maxValue
        });
    };
    filterMissing.onchange = () => update();
    Object(__WEBPACK_IMPORTED_MODULE_6_d3__["selectAll"])([min, max]).call(__WEBPACK_IMPORTED_MODULE_6_d3__["behavior"].drag()
        .on('dragstart', function () {
        Object(__WEBPACK_IMPORTED_MODULE_6_d3__["select"])(this).classed('lu-dragging', true);
    })
        .on('drag', function () {
        const evt = __WEBPACK_IMPORTED_MODULE_6_d3__["event"];
        const total = node.clientWidth;
        const px = Math.max(0, Math.min(evt.x, total));
        const percent = Math.round(100 * px / total);
        this.dataset.value = Object(__WEBPACK_IMPORTED_MODULE_7__utils__["q" /* round */])(unpercent(percent), 2).toString();
        if (this.dataset.handle === 'min') {
            this.style.left = `${percent}%`;
            minHint.style.width = `${percent}%`;
            return;
        }
        this.style.right = `${100 - percent}%`;
        maxHint.style.width = `${100 - percent}%`;
    })
        .on('dragend', function () {
        Object(__WEBPACK_IMPORTED_MODULE_6_d3__["select"])(this).classed('lu-dragging', false);
        update();
    }));
}
function summaryString(col, node, interactive) {
    const old = node.dataset.summary;
    node.dataset.summary = 'string';
    if (!interactive) {
        const filter = col.getFilter() || '';
        node.textContent = filter === __WEBPACK_IMPORTED_MODULE_2__model_StringColumn__["a" /* default */].FILTER_MISSING ? '' : String(filter);
        return;
    }
    const base = Object(__WEBPACK_IMPORTED_MODULE_5__dialogs_StringFilterDialog__["b" /* stringFilter */])(col);
    if (old === 'string') {
        base.update(node);
        return;
    }
    // init
    node.innerHTML = base.template;
    base.init(node);
}
function summarySelection(col, node, _interactive, ctx) {
    const provider = ctx.provider;
    const old = node.dataset.summary;
    node.dataset.summary = 'selection';
    if (old !== 'selection') {
        //init
        node.innerHTML = `<i class='fa fa-square-o' title='(Un)Select All'></i>`;
    }
    const button = node.firstElementChild;
    button.onclick = (evt) => {
        evt.stopPropagation();
        if (button.classList.contains('fa-square-o')) {
            provider.selectAllOf(col.findMyRanker());
        }
        else {
            provider.setSelection([]);
        }
        button.classList.toggle('fa-square-o');
        button.classList.toggle('fa-check-square-o');
    };
}
function summaryAggregation(col, node, _interactive, ctx) {
    const old = node.dataset.summary;
    node.dataset.summary = 'aggregation';
    if (old !== 'aggregation') {
        //init
        let defaultValue = 'down';
        const ranking = col.findMyRanker();
        if (ranking) {
            const all = ranking.getGroups().every((g) => col.isAggregated(g));
            if (all) {
                defaultValue = 'right';
            }
        }
        node.innerHTML = `<i class='fa fa-caret-${defaultValue}' title='(Un)Aggregate All'></i>`;
    }
    const button = node.firstElementChild;
    button.onclick = (evt) => {
        evt.stopPropagation();
        const ranking = col.findMyRanker();
        if (!ranking) {
            return;
        }
        const aggregate = button.classList.contains('fa-caret-down');
        button.classList.toggle('fa-caret-down');
        button.classList.toggle('fa-caret-right');
        ctx.provider.aggregateAllOf(ranking, aggregate);
    };
}


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logic__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixin_index__ = __webpack_require__(33);



class MultiTableRowRenderer {
    constructor(node, htmlId, options = {}) {
        this.node = node;
        this.tableId = 0;
        this.sections = [];
        this.visible = {
            first: 0,
            forcedFirst: 0,
            last: 0,
            forcedLast: 0
        };
        this.options = {
            columnPadding: 0
        };
        this.context = Object(__WEBPACK_IMPORTED_MODULE_1__logic__["d" /* uniformContext */])(0, 500);
        Object.assign(this.options, options);
        node.innerHTML = `<header></header><main></main>`;
        node.classList.add('lineup-engine', 'lineup-multi-engine');
        this.style = new __WEBPACK_IMPORTED_MODULE_0__style_index__["a" /* GridStyleManager */](this.node, htmlId);
        const main = this.main;
        let oldLeft = main.scrollLeft;
        main.addEventListener('scroll', () => {
            const left = main.scrollLeft;
            if (left === oldLeft) {
                return;
            }
            const isGoingRight = left > oldLeft;
            oldLeft = left;
            this.onScrolledHorizontally(left, main.clientWidth, isGoingRight);
        });
    }
    update() {
        this.context = Object(__WEBPACK_IMPORTED_MODULE_1__logic__["b" /* nonUniformContext */])(this.sections.map((d) => d.width), NaN, this.options.columnPadding);
        this.updateGrid();
        this.onScrolledHorizontally(this.main.scrollLeft, this.main.clientWidth, false);
    }
    updateGrid() {
        const content = __WEBPACK_IMPORTED_MODULE_0__style_index__["a" /* GridStyleManager */].gridColumn(this.sections, this.context.defaultRowHeight - this.context.padding(-1));
        this.style.updateRule(`multiTableRule`, `${this.style.id} > header, ${this.style.id} > main { ${content} }`);
    }
    onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight) {
        const { first, last } = Object(__WEBPACK_IMPORTED_MODULE_1__logic__["c" /* range */])(scrollLeft, clientWidth, this.context.defaultRowHeight, this.context.exceptions, this.context.numberOfRows);
        const visible = this.visible;
        visible.forcedFirst = first;
        visible.forcedLast = last;
        let offset = 0;
        this.sections.forEach((s, i) => {
            if (i >= first && i <= last) {
                s.show(Math.max(0, scrollLeft - offset), Math.min(scrollLeft + clientWidth - offset, s.width), isGoingRight);
            }
            else {
                s.hide();
            }
            offset += s.width;
        });
        visible.first = first;
        visible.last = last;
        return __WEBPACK_IMPORTED_MODULE_2__mixin_index__["a" /* EScrollResult */].PARTIAL;
    }
    destroy() {
        this.sections.forEach((d) => d.destroy());
        this.node.remove();
    }
    get doc() {
        return this.node.ownerDocument;
    }
    get header() {
        return this.node.querySelector('header');
    }
    get main() {
        return this.node.querySelector('main');
    }
    pushTable(factory, ...extras) {
        const header = this.doc.createElement('article');
        const body = this.doc.createElement('article');
        const tableId = `T${this.tableId++}`;
        const ids = this.style.tableIds(tableId);
        header.id = ids.header;
        body.id = ids.body;
        this.header.appendChild(header);
        this.main.appendChild(body);
        const table = factory(header, body, tableId, this.style, ...extras);
        table.init();
        this.sections.push(table);
        this.update();
        return table;
    }
    pushSeparator(factory, ...extras) {
        const header = this.doc.createElement('section');
        const body = this.doc.createElement('section');
        this.header.appendChild(header);
        this.main.appendChild(body);
        const separator = factory(header, body, this.style, ...extras);
        separator.init();
        this.sections.push(separator);
        this.update();
        return separator;
    }
    remove(section) {
        const index = this.sections.indexOf(section);
        if (index < 0) {
            return false;
        }
        this.sections.splice(index, 1);
        section.destroy();
        this.update();
        return true;
    }
    widthChanged() {
        this.update();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiTableRowRenderer;



/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lineupengine_src_logic__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces__ = __webpack_require__(22);
/**
 * Created by Samuel Gratzl on 21.09.2017.
 */


const SLOPEGRAPH_WIDTH = 200;
class ItemSlope {
    constructor(left, right, dataIndex) {
        this.left = left;
        this.right = right;
        this.dataIndex = dataIndex;
    }
    get dataIndices() {
        return [this.dataIndex];
    }
    isSelected(selection) {
        return selection.has(this.dataIndex);
    }
    update(path) {
        path.setAttribute('class', 'lu-slope');
        path.setAttribute('d', `M0,${this.left}L${SLOPEGRAPH_WIDTH},${this.right}`);
    }
}
class GroupSlope {
    constructor(left, right, dataIndices) {
        this.left = left;
        this.right = right;
        this.dataIndices = dataIndices;
    }
    isSelected(selection) {
        return this.dataIndices.some((s) => selection.has(s));
    }
    update(path) {
        path.setAttribute('class', 'lu-group-slope');
        path.setAttribute('d', `M0,${this.left[0]}L${SLOPEGRAPH_WIDTH},${this.right[0]}L${SLOPEGRAPH_WIDTH},${this.right[1]}L0,${this.left[1]}Z`);
    }
}
class SlopeGraph {
    constructor(header, body, id, ctx) {
        this.header = header;
        this.body = body;
        this.id = id;
        this.ctx = ctx;
        this.leftSlopes = [];
        this.rightSlopes = [];
        this.pool = [];
        this.width = SLOPEGRAPH_WIDTH;
        this.node = header.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.node.innerHTML = `<g transform="translate(0,0)"></g>`;
        header.classList.add('lu-slopegraph');
        body.classList.add('lu-slopegraph');
        this.body.style.height = `1px`;
        body.appendChild(this.node);
    }
    init() {
        this.hide(); // hide by default
        const scroller = this.body.parentElement;
        //sync scrolling of header and body
        let oldTop = scroller.scrollTop;
        this.scrollListener = () => {
            const top = scroller.scrollTop;
            if (oldTop === top) {
                return;
            }
            oldTop = top;
            this.onScrolledVertically(top, scroller.clientHeight);
        };
        scroller.addEventListener('scroll', this.scrollListener);
    }
    get hidden() {
        return this.header.classList.contains('loading');
    }
    set hidden(value) {
        this.header.classList.toggle('loading', value);
        this.body.classList.toggle('loading', value);
    }
    hide() {
        this.hidden = true;
    }
    show() {
        const was = this.hidden;
        this.hidden = false;
        if (was) {
            this.revalidate();
        }
    }
    destroy() {
        this.node.remove();
        this.body.parentElement.removeEventListener('scroll', this.scrollListener);
    }
    revalidate() {
        if (!this.leftContext || this.hidden) {
            return;
        }
        const p = this.body.parentElement;
        this.onScrolledVertically(p.scrollTop, p.clientHeight);
    }
    rebuild(left, leftContext, right, rightContext) {
        this.leftContext = leftContext;
        this.rightContext = rightContext;
        const lookup = new Map();
        let acc = 0;
        this.rightSlopes = right.map((r, i) => {
            const height = (rightContext.exceptionsLookup.get(i) || rightContext.defaultRowHeight);
            const padded = height - rightContext.padding(i);
            if (Object(__WEBPACK_IMPORTED_MODULE_1__interfaces__["a" /* isGroup */])(r)) {
                const p = {
                    rows: r.rows.map((d) => d.dataIndex),
                    start: acc,
                    heightPerRow: padded / r.rows.length,
                    offset: 0,
                    ref: i
                };
                r.rows.forEach((ri) => lookup.set(ri.dataIndex, p));
            }
            else {
                const dataIndex = r.dataIndex;
                lookup.set(dataIndex, { rows: [dataIndex], start: acc, heightPerRow: padded, offset: 0, ref: i });
            }
            acc += height;
            return [];
        });
        acc = 0;
        this.leftSlopes = left.map((r, i) => {
            const height = (leftContext.exceptionsLookup.get(i) || rightContext.defaultRowHeight);
            const padded = height - rightContext.padding(i);
            const slopes = [];
            if (Object(__WEBPACK_IMPORTED_MODULE_1__interfaces__["a" /* isGroup */])(r)) {
                const free = new Set(r.rows.map((d) => d.dataIndex));
                const heightPerItem = padded / r.rows.length;
                let offset = 0;
                r.rows.forEach((d) => {
                    if (!free.has(d.dataIndex)) {
                        return; // already handled
                    }
                    free.delete(d.dataIndex);
                    const p = lookup.get(d.dataIndex);
                    if (!p) {
                        return; // no matching
                    }
                    //
                    const intersection = p.rows.filter((r) => free.delete(r));
                    intersection.push(d.dataIndex); //self
                    const common = intersection.length;
                    const s = common === 1 ? new ItemSlope(acc + offset + heightPerItem / 2, p.start + p.offset + p.heightPerRow / 2, d.dataIndex) :
                        new GroupSlope([acc + offset, acc + offset + heightPerItem * intersection.length], [p.start + p.offset, p.start + p.offset + p.heightPerRow * common], intersection);
                    slopes.push(s);
                    this.rightSlopes[p.ref].push(s);
                    p.offset += common * p.heightPerRow;
                    offset += common * heightPerItem;
                });
            }
            else {
                const dataIndex = r.dataIndex;
                const p = lookup.get(dataIndex);
                if (p) {
                    const s = new ItemSlope(acc + padded / 2, p.start + p.offset + p.heightPerRow / 2, dataIndex);
                    slopes.push(s);
                    this.rightSlopes[p.ref].push(s);
                    p.offset += p.heightPerRow; // shift by one item
                }
            }
            acc += height;
            return slopes;
        });
        this.revalidate();
    }
    onScrolledVertically(scrollTop, clientHeight) {
        if (!this.leftContext || !this.rightContext) {
            return;
        }
        const left = Object(__WEBPACK_IMPORTED_MODULE_0_lineupengine_src_logic__["c" /* range */])(scrollTop, clientHeight, this.leftContext.defaultRowHeight, this.leftContext.exceptions, this.leftContext.numberOfRows);
        const right = Object(__WEBPACK_IMPORTED_MODULE_0_lineupengine_src_logic__["c" /* range */])(scrollTop, clientHeight, this.rightContext.defaultRowHeight, this.rightContext.exceptions, this.rightContext.numberOfRows);
        const start = Math.min(left.firstRowPos, right.firstRowPos);
        const end = Math.max(left.endPos, right.endPos);
        this.body.style.transform = `translate(0, ${start.toFixed(0)}px)`;
        this.body.style.height = `${(end - start).toFixed(0)}px`;
        (this.node.firstElementChild).setAttribute('transform', `translate(0,-${start.toFixed(0)})`);
        this.choose(left.first, left.last, right.first, right.last);
    }
    choose(leftVisibleFirst, leftVisibleLast, rightVisibleFirst, rightVisibleLast) {
        // assume no separate scrolling
        const slopes = new Set();
        for (let i = leftVisibleFirst; i <= leftVisibleLast; ++i) {
            this.leftSlopes[i].forEach((s) => slopes.add(s));
        }
        for (let i = rightVisibleFirst; i <= rightVisibleLast; ++i) {
            this.rightSlopes[i].forEach((s) => slopes.add(s));
        }
        this.render(slopes);
    }
    render(slopes) {
        const g = this.node.firstElementChild;
        const paths = Array.from(g.children);
        //match lengths
        for (let i = slopes.size; i < paths.length; ++i) {
            const elem = paths[i];
            this.pool.push(elem);
            elem.remove();
        }
        for (let i = paths.length; i < slopes.size; ++i) {
            const elem = this.pool.pop();
            if (elem) {
                g.appendChild(elem);
                paths.push(elem);
            }
            else {
                const path = g.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.onclick = (evt) => {
                    const s = path.__data__;
                    const p = this.ctx.provider;
                    const ids = s.dataIndices;
                    if (evt.ctrlKey) {
                        ids.forEach((id) => p.toggleSelection(id, true));
                    }
                    else {
                        // either unset or set depending on the first state
                        const isSelected = p.isSelected(ids[0]);
                        p.setSelection(isSelected ? [] : ids);
                    }
                };
                g.appendChild(path);
                paths.push(path);
            }
        }
        const p = this.ctx.provider;
        const selectionLookup = { has: (dataIndex) => p.isSelected(dataIndex) };
        // update paths
        let i = 0;
        slopes.forEach((s) => {
            const p = paths[i++];
            s.update(p);
            p.__data__ = s; // data binding
            const selected = s.isSelected(selectionLookup);
            p.classList.toggle('lu-selected', selected);
            if (selected) {
                g.appendChild(p); // to put it on top
            }
        });
    }
    updateSelection(selectedDataIndices) {
        const g = this.node.firstElementChild;
        const paths = Array.from(g.children);
        paths.forEach((p) => {
            const s = p.__data__;
            const selected = s.isSelected(selectedDataIndices);
            p.classList.toggle('lu-selected', selected);
            if (selected) {
                g.appendChild(p); // to put it on top
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlopeGraph;



/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lineupengine_src_table_ACellTableSection__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Ranking__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RenderColumn__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_Column__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__MultiLevelRenderColumn__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lineupengine_src_logic__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_StackColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_CompositeColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__interfaces__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SelectionManager__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__animation__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lineupengine_src_mixin_PrefetchMixin__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_lineupengine_src_style_GridStyleManager__ = __webpack_require__(42);














class RankingEvents extends __WEBPACK_IMPORTED_MODULE_9__utils__["a" /* AEventDispatcher */] {
    fire(type, ...args) {
        super.fire(type, ...args);
    }
    createEventList() {
        return super.createEventList().concat([RankingEvents.EVENT_WIDTH_CHANGED, RankingEvents.EVENT_UPDATE_DATA]);
    }
}
RankingEvents.EVENT_WIDTH_CHANGED = 'widthChanged';
RankingEvents.EVENT_UPDATE_DATA = 'updateData';
class EngineRanking extends __WEBPACK_IMPORTED_MODULE_0_lineupengine_src_table_ACellTableSection__["a" /* ACellTableSection */] {
    constructor(ranking, header, body, tableId, style, ctx, options = {}) {
        super(header, body, tableId, style, __WEBPACK_IMPORTED_MODULE_12_lineupengine_src_mixin_PrefetchMixin__["a" /* default */]);
        this.ranking = ranking;
        this.ctx = ctx;
        this.data = [];
        this.events = new RankingEvents();
        this.on = this.events.on.bind(this.events);
        this.options = {
            animation: true,
            customRowUpdate: () => undefined
        };
        Object.assign(this.options, options);
        const that = this;
        this.delayedUpdate = Object(__WEBPACK_IMPORTED_MODULE_9__utils__["f" /* debounce */])((function () {
            if (this.type !== __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES) {
                that.events.fire(EngineRanking.EVENT_UPDATE_DATA);
                return;
            }
            if (this.primaryType !== __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_RENDERER_TYPE_CHANGED && this.primaryType !== __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_GROUP_RENDERER_TYPE_CHANGED && this.primaryType !== __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_LABEL_CHANGED) {
                that.updateBody();
            }
        }), 50, (current, next) => {
            const currentEvent = current.self.type;
            // order changed is more important
            return currentEvent === __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED ? current : next;
        });
        ranking.on(`${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER}.body`, Object(__WEBPACK_IMPORTED_MODULE_9__utils__["f" /* debounce */])(() => this.updateHeaders(), 50));
        ranking.on(`${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES}.body`, this.delayedUpdate);
        ranking.on([`${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN}.body`, `${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN}.body`, `${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_MOVE_COLUMN}.body`], Object(__WEBPACK_IMPORTED_MODULE_9__utils__["f" /* debounce */])(() => this.updateAll(), 50));
        ranking.on(`${__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED}.body`, this.delayedUpdate);
        this.selection = new __WEBPACK_IMPORTED_MODULE_10__SelectionManager__["a" /* default */](this.ctx, body);
        this.selection.on(__WEBPACK_IMPORTED_MODULE_10__SelectionManager__["a" /* default */].EVENT_SELECT_RANGE, (from, to, additional) => {
            this.selection.selectRange(this.data.slice(from, to + 1), additional);
        });
        this.renderCtx = Object.assign({
            isGroup: (index) => Object(__WEBPACK_IMPORTED_MODULE_8__interfaces__["a" /* isGroup */])(this.data[index]),
            getRow: (index) => this.data[index],
            getGroup: (index) => this.data[index]
        }, ctx);
        // default context
        const columns = this.createColumns();
        this._context = Object.assign({
            columns,
            column: Object(__WEBPACK_IMPORTED_MODULE_5_lineupengine_src_logic__["b" /* nonUniformContext */])(columns.map((w) => w.width), 100, this.ctx.columnPadding)
        }, Object(__WEBPACK_IMPORTED_MODULE_5_lineupengine_src_logic__["d" /* uniformContext */])(0, 20));
    }
    get id() {
        return this.ranking.id;
    }
    onVisibilityChanged(visible) {
        super.onVisibilityChanged(visible);
        if (visible) {
            this.delayedUpdate.call({ type: __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED });
        }
    }
    updateHeaders() {
        return super.updateHeaders();
    }
    get currentData() {
        return this.data;
    }
    get context() {
        return this._context;
    }
    createHeader(document, column) {
        if (column instanceof __WEBPACK_IMPORTED_MODULE_4__MultiLevelRenderColumn__["a" /* default */]) {
            column.updateWidthRule(this.style);
        }
        return column.createHeader(document, this.renderCtx);
    }
    updateHeader(node, column) {
        if (column instanceof __WEBPACK_IMPORTED_MODULE_4__MultiLevelRenderColumn__["a" /* default */]) {
            column.updateWidthRule(this.style);
        }
        return column.updateHeader(node, this.renderCtx);
    }
    createCell(document, index, column) {
        return column.createCell(index, document, this.renderCtx);
    }
    updateCell(node, index, column) {
        return column.updateCell(node, index, this.renderCtx);
    }
    updateAll() {
        const columns = this.createColumns();
        this._context = Object.assign({}, this._context, {
            columns,
            column: Object(__WEBPACK_IMPORTED_MODULE_5_lineupengine_src_logic__["b" /* nonUniformContext */])(columns.map((w) => w.width), 100, this.ctx.columnPadding)
        });
        super.recreate();
        this.events.fire(EngineRanking.EVENT_WIDTH_CHANGED);
    }
    updateBody() {
        if (this.hidden) {
            return;
        }
        this.forEachRow((row, rowIndex) => this.updateRow(row, rowIndex));
    }
    updateHeaderOf(i) {
        const node = this.header.children[i];
        const column = this._context.columns[i];
        if (column instanceof __WEBPACK_IMPORTED_MODULE_4__MultiLevelRenderColumn__["a" /* default */]) {
            column.updateWidthRule(this.style);
        }
        this.updateHeader(node, column);
    }
    createRow(node, rowIndex) {
        super.createRow(node, rowIndex);
        const isGroup = this.renderCtx.isGroup(rowIndex);
        this.options.customRowUpdate(node, rowIndex);
        if (isGroup) {
            node.dataset.agg = 'group';
            return;
        }
        const { dataIndex, meta } = this.renderCtx.getRow(rowIndex);
        node.dataset.dataIndex = dataIndex.toString();
        node.dataset.agg = 'detail'; //or 'group'
        node.dataset.meta = meta || '';
        this.selection.updateState(node, dataIndex);
        this.selection.add(node);
    }
    updateRow(node, rowIndex) {
        const isGroup = this.renderCtx.isGroup(rowIndex);
        const wasGroup = node.dataset.agg === 'group';
        this.options.customRowUpdate(node, rowIndex);
        if (isGroup !== wasGroup) {
            // change of mode clear the children to reinitialize them
            node.innerHTML = '';
            // adapt body
            node.dataset.agg = isGroup ? 'group' : 'detail';
            if (isGroup) {
                node.dataset.dataIndex = '';
                this.selection.remove(node);
            }
            else {
                this.selection.add(node);
            }
        }
        if (!isGroup) {
            const { dataIndex, meta } = this.renderCtx.getRow(rowIndex);
            node.dataset.dataIndex = dataIndex.toString();
            node.dataset.meta = meta || '';
            this.selection.updateState(node, dataIndex);
        }
        super.updateRow(node, rowIndex);
    }
    updateSelection(selectedDataIndices) {
        this.forEachRow((node, rowIndex) => {
            if (this.renderCtx.isGroup(rowIndex)) {
                this.updateRow(node, rowIndex);
            }
            else {
                // fast pass for item
                this.selection.update(node, selectedDataIndices);
            }
        }, true);
    }
    updateColumnWidths() {
        // update the column context in place
        this._context.column = Object(__WEBPACK_IMPORTED_MODULE_5_lineupengine_src_logic__["b" /* nonUniformContext */])(this._context.columns.map((w) => w.width), 100, this.ctx.columnPadding);
        super.updateColumnWidths();
        const { columns } = this.context;
        //no data update needed since just width changed
        columns.forEach((column) => {
            if (column instanceof __WEBPACK_IMPORTED_MODULE_4__MultiLevelRenderColumn__["a" /* default */]) {
                column.updateWidthRule(this.style);
            }
        });
        this.events.fire(EngineRanking.EVENT_WIDTH_CHANGED);
    }
    updateColumn(index) {
        const column = this.context.columns[index];
        this.forEachRow((row, rowIndex) => {
            const before = row.children[index];
            const after = this.updateCell(before, rowIndex, column);
            if (before !== after && after) {
                Object(__WEBPACK_IMPORTED_MODULE_13_lineupengine_src_style_GridStyleManager__["b" /* setColumn */])(after, column);
                row.replaceChild(after, before);
            }
        });
    }
    destroy() {
        super.destroy();
        this.ranking.flatColumns.forEach((c) => this.disableListener(c));
    }
    disableListener(c) {
        c.on(`${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_WIDTH_CHANGED}.body`, null);
        c.on([`${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_RENDERER_TYPE_CHANGED}.body`, `${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_GROUP_RENDERER_TYPE_CHANGED}.body`, `${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_LABEL_CHANGED}.body`], null);
        if (!(Object(__WEBPACK_IMPORTED_MODULE_7__model_CompositeColumn__["b" /* isMultiLevelColumn */])(c))) {
            return;
        }
        c.on(`${__WEBPACK_IMPORTED_MODULE_6__model_StackColumn__["b" /* default */].EVENT_MULTI_LEVEL_CHANGED}.body`, null);
        c.on(`${__WEBPACK_IMPORTED_MODULE_6__model_StackColumn__["b" /* default */].EVENT_MULTI_LEVEL_CHANGED}.bodyUpdate`, null);
    }
    groupData(data) {
        const groups = this.ranking.getGroups();
        const provider = this.ctx.provider;
        const toMeta = (relativeIndex, length) => {
            if (length === 1) {
                return 'first last';
            }
            if (relativeIndex === 0) {
                return 'first';
            }
            if (relativeIndex === length - 1) {
                return 'last';
            }
            return undefined;
        };
        if (groups.length === 1) {
            // simple case
            if (provider.isAggregated(this.ranking, groups[0])) {
                // just a single row
                return [Object.assign({ rows: data }, groups[0])];
            }
            // simple ungrouped case
            return data.map((r, i) => Object.assign({ group: groups[0], relativeIndex: i, meta: toMeta(i, data.length) }, r));
        }
        //multiple groups
        let offset = 0;
        const r = [];
        groups.forEach((group) => {
            const length = group.order.length;
            const groupData = data.slice(offset, offset + length);
            offset += length;
            if (provider.isAggregated(this.ranking, group)) {
                r.push(Object.assign({ rows: groupData }, group));
            }
            else {
                r.push(...groupData.map((r, i) => Object.assign({ group, relativeIndex: i, meta: toMeta(i, groupData.length) }, r)));
            }
        });
        return r;
    }
    render(data, rowContext) {
        const previous = this._context;
        previous.columns.forEach((c) => this.disableListener(c.c));
        const previousData = this.data;
        this.data = data;
        this.renderCtx.totalNumberOfRows = data.length;
        const columns = this.createColumns();
        this._context = Object.assign({
            columns,
            column: Object(__WEBPACK_IMPORTED_MODULE_5_lineupengine_src_logic__["b" /* nonUniformContext */])(columns.map((w) => w.width), 100, this.ctx.columnPadding)
        }, rowContext);
        return super.recreate(this.options.animation ? Object(__WEBPACK_IMPORTED_MODULE_11__animation__["a" /* lineupAnimation */])(previous, previousData, this.data) : undefined);
    }
    fakeHover(dataIndex) {
        const old = this.body.querySelector(`[data-data-index].lu-hovered`);
        if (old) {
            old.classList.remove('lu-hovered');
        }
        const item = this.body.querySelector(`[data-data-index="${dataIndex}"]`);
        if (item) {
            item.classList.add('lu-hovered');
        }
    }
    createColumns() {
        const flatCols = [];
        this.ranking.flatten(flatCols, 0, 1, 0);
        const cols = flatCols.map((c) => c.col);
        return cols.map((c, i) => this.createColumn(c, i));
    }
    createColumn(c, i) {
        const renderers = this.ctx.createRenderer(c);
        c.on(`${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_WIDTH_CHANGED}.body`, () => {
            this.updateColumnWidths();
        });
        c.on([`${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_RENDERER_TYPE_CHANGED}.body`, `${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_GROUP_RENDERER_TYPE_CHANGED}.body`, `${__WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].EVENT_LABEL_CHANGED}.body`], () => {
            // replace myself upon renderer type change
            this._context.columns[i] = this.createColumn(c, i);
            this.updateColumn(i);
        });
        if (Object(__WEBPACK_IMPORTED_MODULE_7__model_CompositeColumn__["b" /* isMultiLevelColumn */])(c) && !c.getCollapsed()) {
            const r = new __WEBPACK_IMPORTED_MODULE_4__MultiLevelRenderColumn__["a" /* default */](c, renderers, i, this.ctx.columnPadding);
            c.on(`${__WEBPACK_IMPORTED_MODULE_6__model_StackColumn__["b" /* default */].EVENT_MULTI_LEVEL_CHANGED}.body`, () => {
                r.updateWidthRule(this.style);
            });
            c.on(`${__WEBPACK_IMPORTED_MODULE_6__model_StackColumn__["b" /* default */].EVENT_MULTI_LEVEL_CHANGED}.bodyUpdate`, Object(__WEBPACK_IMPORTED_MODULE_9__utils__["f" /* debounce */])(() => this.updateColumn(i), 25));
            return r;
        }
        return new __WEBPACK_IMPORTED_MODULE_2__RenderColumn__["a" /* default */](c, renderers, i);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EngineRanking;

EngineRanking.EVENT_WIDTH_CHANGED = RankingEvents.EVENT_WIDTH_CHANGED;
EngineRanking.EVENT_UPDATE_DATA = RankingEvents.EVENT_UPDATE_DATA;


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ARowRenderer__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_ACellAdapter__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixin_index__ = __webpack_require__(33);
/**
 * Created by Samuel Gratzl on 26.09.2017.
 */



class ACellTableSection extends __WEBPACK_IMPORTED_MODULE_0__ARowRenderer__["a" /* default */] {
    constructor(header, body, tableId, style, ...mixinClasses) {
        super(body, ...mixinClasses);
        this.header = header;
        this.tableId = tableId;
        this.style = style;
        const that = this;
        class LocalCell extends __WEBPACK_IMPORTED_MODULE_1__internal_ACellAdapter__["a" /* default */] {
            get context() {
                return that.context;
            }
            createHeader(document, column) {
                return that.createHeader(document, column);
            }
            updateHeader(node, column) {
                return that.updateHeader(node, column);
            }
            createCell(document, index, column) {
                return that.createCell(document, index, column);
            }
            updateCell(node, index, column) {
                return that.updateCell(node, index, column);
            }
            forEachRow(callback) {
                return that.forEachRow(callback);
            }
        }
        this.cell = new LocalCell(this.header, this.style, tableId, ...mixinClasses);
    }
    addColumnMixin(mixinClass, options) {
        this.cell.addColumnMixin(mixinClass, options);
    }
    get width() {
        return this.context.column.totalHeight;
    }
    get hidden() {
        return this.header.classList.contains('loading');
    }
    set hidden(value) {
        const old = this.hidden;
        if (old === value) {
            return;
        }
        this.header.classList.toggle('loading', value);
        this.body.classList.toggle('loading', value);
        this.onVisibilityChanged(!value);
    }
    onVisibilityChanged(_visible) {
        // hook
    }
    hide() {
        this.hidden = true;
    }
    show(scrollLeft, clientWidth, isGoingRight) {
        this.hidden = false;
        this.cell.onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight);
    }
    init() {
        this.hide(); // hide by default
        this.cell.init();
        super.init();
    }
    destroy() {
        super.destroy();
        this.header.remove();
        this.style.remove(this.tableId);
    }
    onScrolledVertically(scrollTop, clientHeight, isGoingDown) {
        if (this.hidden) {
            return __WEBPACK_IMPORTED_MODULE_2__mixin_index__["a" /* EScrollResult */].NONE;
        }
        return super.onScrolledVertically(scrollTop, clientHeight, isGoingDown);
    }
    onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight) {
        return this.cell.onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight);
    }
    updateHeaders() {
        this.cell.updateHeaders();
    }
    updateColumnWidths() {
        const context = this.context;
        this.style.update(context.defaultRowHeight - context.padding(-1), context.columns, context.column.defaultRowHeight - context.column.padding(-1), context.column.padding, this.tableId);
    }
    recreate(ctx) {
        const scroller = this.bodyScroller;
        const oldLeft = scroller.scrollLeft;
        this.cell.recreate(oldLeft, scroller.clientWidth);
        super.recreate(ctx);
        // restore left
        scroller.scrollLeft = oldLeft;
    }
    clearPool() {
        super.clearPool();
        this.cell.clearPool();
    }
    createRow(node, rowIndex) {
        this.cell.createRow(node, rowIndex);
    }
    updateRow(node, rowIndex) {
        this.cell.updateRow(node, rowIndex);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ACellTableSection;



/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logic__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abortAble__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixin__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animation_KeyFinder__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation__ = __webpack_require__(63);
/**
 * Created by Samuel Gratzl on 13.07.2017.
 */





class ARowRenderer {
    constructor(body, ...mixinClasses) {
        this.body = body;
        this.pool = [];
        this.loadingPool = [];
        this.loading = new Map();
        this.visible = {
            first: 0,
            forcedFirst: 0,
            last: -1,
            forcedLast: -1
        };
        this.visibleFirstRowPos = 0;
        this.abortAnimation = () => undefined;
        this.adapter = this.createAdapter();
        this.mixins = mixinClasses.map((mixinClass) => new mixinClass(this.adapter));
        this.fragment = body.ownerDocument.createDocumentFragment();
    }
    addMixin(mixinClass, options) {
        this.mixins.push(new mixinClass(this.adapter, options));
    }
    createAdapter() {
        const r = {
            visible: this.visible,
            addAtBeginning: this.addAtBeginning.bind(this),
            addAtBottom: this.addAtBottom.bind(this),
            removeFromBeginning: this.removeFromBeginning.bind(this),
            removeFromBottom: this.removeFromBottom.bind(this),
            updateOffset: this.updateOffset.bind(this),
            scroller: this.bodyScroller
        };
        Object.defineProperties(r, {
            visibleFirstRowPos: {
                get: () => this.visibleFirstRowPos,
                enumerable: true
            },
            context: {
                get: () => this.context,
                enumerable: true
            }
        });
        return r;
    }
    get bodyScroller() {
        return this.body.parentElement;
    }
    /**
     * initializes the table and register the onscroll listener
     * @returns {void} nothing
     */
    init() {
        const scroller = this.bodyScroller;
        //sync scrolling of header and body
        let oldTop = scroller.scrollTop;
        this.scrollListener = () => {
            const top = scroller.scrollTop;
            if (oldTop === top) {
                return;
            }
            const isGoingDown = top > oldTop;
            oldTop = top;
            this.onScrolledVertically(top, scroller.clientHeight, isGoingDown);
        };
        scroller.addEventListener('scroll', this.scrollListener);
        this.recreate();
    }
    destroy() {
        this.bodyScroller.removeEventListener('scroll', this.scrollListener);
        this.body.remove();
    }
    static cleanUp(item) {
        if (item.style.height) {
            item.style.height = null;
        }
    }
    select(index) {
        let item;
        let result;
        if (this.pool.length > 0) {
            item = this.pool.pop();
            result = this.updateRow(item, index);
        }
        else if (this.loadingPool.length > 0) {
            item = this.loadingPool.pop();
            item.classList.remove('loading');
            result = this.createRow(item, index);
        }
        else {
            item = this.body.ownerDocument.createElement('div');
            result = this.createRow(item, index);
        }
        item.dataset.index = String(index);
        return { item, result };
    }
    selectProxy() {
        let proxy;
        if (this.loadingPool.length > 0) {
            proxy = this.loadingPool.pop();
        }
        else {
            proxy = this.body.ownerDocument.createElement('div');
            proxy.classList.add('loading');
        }
        return proxy;
    }
    recycle(item) {
        ARowRenderer.cleanUp(item);
        // check if the original dom element is still being manipulated
        if (this.loading.has(item)) {
            const abort = this.loading.get(item);
            abort.abort();
        }
        else {
            this.pool.push(item);
        }
    }
    proxy(item, result) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_1__abortAble__["b" /* isAbortAble */])(result)) {
            return item;
        }
        const abort = result;
        //lazy loading
        const real = item;
        const proxy = this.selectProxy();
        // copy attributes
        proxy.dataset.index = real.dataset.index;
        proxy.style.height = real.style.height;
        this.loading.set(proxy, abort);
        abort.then((result) => {
            if (result === __WEBPACK_IMPORTED_MODULE_1__abortAble__["a" /* ABORTED */]) {
                //aborted can recycle the real one
                ARowRenderer.cleanUp(real);
                this.pool.push(real);
            }
            else {
                //fully loaded
                this.body.replaceChild(real, proxy);
            }
            this.loading.delete(proxy);
            ARowRenderer.cleanUp(proxy);
            this.loadingPool.push(proxy);
        });
        return proxy;
    }
    create(index) {
        const { item, result } = this.select(index);
        const { exceptionsLookup: ex, padding } = this.context;
        if (ex.has(index)) {
            item.style.height = `${ex.get(index) - padding(index)}px`;
        }
        return this.proxy(item, result);
    }
    removeAll() {
        const arr = Array.from(this.body.children);
        this.body.innerHTML = '';
        arr.forEach((item) => {
            this.recycle(item);
        });
    }
    update() {
        const first = this.visible.first;
        const fragment = this.fragment;
        const items = Array.from(this.body.children);
        this.body.innerHTML = '';
        items.forEach((item, i) => {
            if (this.loading.has(item)) {
                // still loading
                return;
            }
            const abort = this.updateRow(item, i + first);
            fragment.appendChild(this.proxy(item, abort));
        });
        this.body.appendChild(fragment);
    }
    forEachRow(callback, inplace = false) {
        const rows = Array.from(this.body.children);
        const fragment = this.fragment;
        if (!inplace) {
            this.body.innerHTML = '';
        }
        rows.forEach((row, index) => {
            if (!row.classList.contains('loading') && row.dataset.animation !== 'update_remove' && row.dataset.animation !== 'hide') {
                //skip loading ones and temporary ones
                callback(row, index + this.visible.first);
            }
            if (!inplace) {
                fragment.appendChild(row);
            }
        });
        if (!inplace) {
            this.body.appendChild(fragment);
        }
    }
    removeFromBeginning(from, to) {
        return this.remove(from, to, true);
    }
    removeFromBottom(from, to) {
        return this.remove(from, to, false);
    }
    remove(from, to, fromBeginning) {
        for (let i = from; i <= to; ++i) {
            const item = (fromBeginning ? this.body.firstChild : this.body.lastChild);
            item.remove();
            this.recycle(item);
        }
    }
    addAtBeginning(from, to) {
        if (from === to) {
            this.body.insertBefore(this.create(from), this.body.firstChild);
            return;
        }
        const fragment = this.fragment;
        for (let i = from; i <= to; ++i) {
            fragment.appendChild(this.create(i));
        }
        this.body.insertBefore(fragment, this.body.firstChild);
    }
    addAtBottom(from, to) {
        if (from === to) {
            this.body.appendChild(this.create(from));
            return;
        }
        const fragment = this.fragment;
        for (let i = from; i <= to; ++i) {
            fragment.appendChild(this.create(i));
        }
        this.body.appendChild(fragment);
    }
    updateOffset(firstRowPos) {
        const { totalHeight } = this.context;
        this.visibleFirstRowPos = firstRowPos;
        //odd start patch for correct background
        this.body.classList.toggle('odd', this.visible.first % 2 === 1);
        this.body.style.transform = `translate(0, ${firstRowPos.toFixed(0)}px)`;
        this.body.style.height = `${Math.max(1, totalHeight - firstRowPos).toFixed(0)}px`;
    }
    /**
     * removes all rows and recreates the table
     * @returns {void} nothing
     */
    recreate(ctx) {
        this.abortAnimation();
        if (ctx) {
            return this.recreateAnimated(ctx);
        }
        return this.recreatePure();
    }
    recreatePure() {
        const context = this.context;
        const scroller = this.bodyScroller;
        //update first to avoid resetting scrollTop
        this.updateOffset(0);
        this.removeAll();
        this.clearPool();
        const { first, last, firstRowPos } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["c" /* range */])(scroller.scrollTop, scroller.clientHeight, context.defaultRowHeight, context.exceptions, context.numberOfRows);
        this.visible.first = this.visible.forcedFirst = first;
        this.visible.last = this.visible.forcedLast = last;
        if (first < 0) {
            // empty
            this.updateOffset(0);
            return;
        }
        this.addAtBottom(first, last);
        this.updateOffset(firstRowPos);
    }
    recreateAnimated(ctx) {
        const lookup = new Map();
        const prev = new __WEBPACK_IMPORTED_MODULE_3__animation_KeyFinder__["a" /* default */](ctx.previous, ctx.previousKey);
        const cur = new __WEBPACK_IMPORTED_MODULE_3__animation_KeyFinder__["a" /* default */](this.context, ctx.currentKey);
        const next = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["c" /* range */])(this.bodyScroller.scrollTop, this.bodyScroller.clientHeight, cur.context.defaultRowHeight, cur.context.exceptions, cur.context.numberOfRows);
        {
            const rows = Array.from(this.body.children);
            const old = Object.assign({}, this.visible);
            //store the current rows in a lookup and clear
            prev.positions(old.first, Math.min(old.last, old.first + rows.length), this.visibleFirstRowPos, (i, key, pos) => {
                const n = rows[i];
                if (n) {
                    lookup.set(key, { n, pos, i });
                }
                // else {
                //  console.error(i, key, pos, rows);
                //}
            });
            this.body.innerHTML = ``;
        }
        this.visible.first = this.visible.forcedFirst = next.first;
        this.visible.last = this.visible.forcedLast = next.last;
        const fragment = this.fragment;
        const animation = [];
        let nodeY = next.firstRowPos;
        cur.positions(next.first, next.last, next.firstRowPos, (i, key, pos) => {
            let node;
            let mode = __WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */].UPDATE;
            let previous;
            if (lookup.has(key)) {
                // still visible
                const item = lookup.get(key);
                lookup.delete(key);
                // update height
                node = this.proxy(item.n, this.updateRow(item.n, i));
                previous = {
                    index: item.i,
                    y: item.pos,
                    height: prev.exceptionHeightOf(item.i, true)
                };
            }
            else {
                // need a new row
                const old = prev.posByKey(key);
                // maybe not visible  before so keep in place
                node = this.create(i);
                mode = old.index < 0 ? __WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */].SHOW : __WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */].UPDATE_CREATE;
                previous = {
                    index: old.index,
                    y: old.pos >= 0 ? old.pos : pos,
                    height: old.index < 0 ? cur.exceptionHeightOf(i, true) : prev.exceptionHeightOf(old.index, true)
                };
            }
            animation.push({
                node,
                key,
                mode,
                previous,
                nodeY,
                nodeYCurrentHeight: pos,
                current: {
                    index: i,
                    y: pos,
                    height: cur.exceptionHeightOf(i)
                }
            });
            node.style.transform = `translate(0, ${nodeY - pos}px)`;
            nodeY += previous.height + (previous.index < 0 ? cur.padding(i) : prev.padding(previous.index));
            fragment.appendChild(node);
        });
        let nodeYCurrentHeight = next.endPos;
        // items that are going to be removed
        lookup.forEach((item, key) => {
            // calculate their next position
            const r = cur.posByKey(key);
            // maybe not visible anymore, keep in place
            const nextPos = r.pos >= 0 ? r.pos : item.pos;
            const node = item.n;
            // located at addedPos
            // should end up at nextPos
            // was previously at item.pos
            node.style.transform = `translate(0, ${item.pos - nodeY}px)`;
            fragment.appendChild(node);
            const prevHeight = prev.exceptionHeightOf(item.i, true);
            animation.push({
                node: item.n,
                key,
                mode: r.index < 0 ? __WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */].HIDE : __WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */].UPDATE_REMOVE,
                previous: {
                    index: item.i,
                    y: item.pos,
                    height: prevHeight
                },
                nodeY,
                nodeYCurrentHeight,
                current: {
                    index: r.index,
                    y: nextPos,
                    height: r.index < 0 ? null : cur.exceptionHeightOf(r.index)
                }
            });
            nodeYCurrentHeight += r.index < 0 ? cur.context.defaultRowHeight : (cur.exceptionHeightOf(r.index, true) + cur.padding(r.index));
            nodeY += prevHeight + prev.padding(item.i);
        });
        this.updateOffset(next.firstRowPos);
        this.animate(animation, ctx.phases || __WEBPACK_IMPORTED_MODULE_4__animation__["b" /* defaultPhases */], prev, cur, fragment);
    }
    animate(animation, phases, previousFinder, currentFinder, fragment) {
        if (animation.length <= 0) {
            this.body.appendChild(fragment);
            return;
        }
        let currentTimer = -1;
        let actPhase = 0;
        const executePhase = (phase) => {
            animation.forEach((anim) => phase.apply(anim, previousFinder, currentFinder));
        };
        const run = () => {
            //dummy log for forcing dom update
            console.assert(animation[0].node.offsetTop >= 0, 'dummy log for forcing dom update');
            executePhase(phases[actPhase++]);
            // shifted by one since already added through ++
            if (actPhase < phases.length) {
                // schedule the next one
                const next = phases[actPhase];
                currentTimer = setTimeout(run, next.delay);
                return;
            }
            // last one
            const body = this.body.classList;
            Array.from(body).forEach((v) => {
                if (v.startsWith('le-') && v.endsWith('-animation')) {
                    body.remove(v);
                }
            });
            // clean up
            animation.forEach(({ node, mode }) => {
                if (mode !== __WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */].UPDATE_REMOVE && mode !== __WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */].HIDE) {
                    return;
                }
                node.remove();
                node.style.transform = null;
                this.recycle(node);
            });
            this.abortAnimation = () => undefined;
            currentTimer = -1;
        };
        this.abortAnimation = () => {
            if (currentTimer <= 0) {
                return;
            }
            // abort by removing
            clearTimeout(currentTimer);
            currentTimer = -1;
            // run the last phase
            actPhase = phases.length - 1;
            run();
        };
        // execute all phases having a delay of zero
        while (phases[actPhase].delay === 0) {
            executePhase(phases[actPhase++]);
        }
        // after the initial one
        const body = this.body;
        this.body.appendChild(fragment);
        body.classList.add('le-row-animation');
        (new Set(animation.map((d) => d.mode))).forEach((mode) => {
            // add class but map to UPDATE only
            body.classList.add(`le-${__WEBPACK_IMPORTED_MODULE_4__animation__["a" /* EAnimationMode */][mode].toLowerCase().split('_')[0]}-animation`);
        });
        // next tick such that DOM will be updated
        currentTimer = setTimeout(run, phases[actPhase].delay);
    }
    clearPool() {
        // clear pool
        this.pool.splice(0, this.pool.length);
    }
    revalidate() {
        const scroller = this.bodyScroller;
        this.onScrolledVertically(scroller.scrollTop, scroller.clientHeight, true);
        this.updateOffset(this.visibleFirstRowPos);
    }
    /**
     * scrolling vertically
     * @param {number} scrollTop top scrolling
     * @param {number} clientHeight visible height
     * @param {boolean} isGoingDown hint whether the scrollTop increases
     * @return {EScrollResult} full in case of a full rebuild or partial update
     */
    onScrolledVertically(scrollTop, clientHeight, isGoingDown) {
        const scrollResult = this.onScrolledImpl(scrollTop, clientHeight);
        this.mixins.forEach((mixin) => mixin.onScrolled(isGoingDown, scrollResult));
        return scrollResult;
    }
    onScrolledImpl(scrollTop, clientHeight) {
        const context = this.context;
        const { first, last, firstRowPos } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["c" /* range */])(scrollTop, clientHeight, context.defaultRowHeight, context.exceptions, context.numberOfRows);
        const visible = this.visible;
        visible.forcedFirst = first;
        visible.forcedLast = last;
        if ((first - visible.first) >= 0 && (last - visible.last) <= 0) {
            //nothing to do
            return __WEBPACK_IMPORTED_MODULE_2__mixin__["a" /* EScrollResult */].NONE;
        }
        let r = __WEBPACK_IMPORTED_MODULE_2__mixin__["a" /* EScrollResult */].PARTIAL;
        if (first > visible.last || last < visible.first) {
            //no overlap, clean and draw everything
            //console.log(`ff added: ${last - first + 1} removed: ${visibleLast - visibleFirst + 1} ${first}:${last} ${offset}`);
            //removeRows(visibleFirst, visibleLast);
            this.removeAll();
            this.addAtBottom(first, last);
            r = __WEBPACK_IMPORTED_MODULE_2__mixin__["a" /* EScrollResult */].ALL;
        }
        else if (first < visible.first) {
            //some first rows missing and some last rows to much
            //console.log(`up added: ${visibleFirst - first + 1} removed: ${visibleLast - last + 1} ${first}:${last} ${offset}`);
            this.removeFromBottom(last + 1, visible.last);
            this.addAtBeginning(first, visible.first - 1);
        }
        else {
            //console.log(`do added: ${last - visibleLast + 1} removed: ${first - visibleFirst + 1} ${first}:${last} ${offset}`);
            //some last rows missing and some first rows to much
            this.removeFromBeginning(visible.first, first - 1);
            this.addAtBottom(visible.last + 1, last);
        }
        visible.first = first;
        visible.last = last;
        this.updateOffset(firstRowPos);
        return r;
    }
}
/* unused harmony export ARowRenderer */

/* harmony default export */ __webpack_exports__["a"] = (ARowRenderer);


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony export (immutable) */ __webpack_exports__["b"] = isAbortAble;
const ABORTED = Symbol('aborted');
/* harmony export (immutable) */ __webpack_exports__["a"] = ABORTED;

function abortAble(loader) {
    return {
        then(onfulfilled) {
            let aborted = null;
            const isAborted = () => aborted === null;
            const aborter = new Promise((resolve) => aborted = resolve);
            const fullfiller = loader.then((r) => {
                if (isAborted()) {
                    return ABORTED;
                }
                return Promise.resolve(onfulfilled(r)).then((r) => isAborted() ? ABORTED : r);
            });
            const p = Promise.race([aborter, fullfiller]);
            return {
                abort: () => {
                    if (aborted !== null) {
                        aborted(ABORTED);
                        aborted = null;
                    }
                },
                then: p.then.bind(p),
                catch: p.catch.bind(p),
                [Symbol.toStringTag]: p[Symbol.toStringTag]
            };
        }
    };
}
function isAbortAble(abortAble) {
    return abortAble !== undefined && abortAble !== null && abortAble && typeof abortAble.then === 'function' && typeof abortAble.abort === 'function';
}


/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logic__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_GridStyleManager__ = __webpack_require__(42);
/**
 * Created by Samuel Gratzl on 19.07.2017.
 */



const debug = false;
class ACellAdapter {
    constructor(header, style, tableId, ...mixinClasses) {
        this.header = header;
        this.style = style;
        this.tableId = tableId;
        /**
         * pool of cells per column
         * @type {Array}
         */
        this.cellPool = [];
        this.visibleColumns = {
            frozen: [],
            first: 0,
            forcedFirst: 0,
            last: -1,
            forcedLast: -1
        };
        this.visibleFirstColumnPos = 0;
        this.columnAdapter = this.createColumnAdapter();
        this.columnMixins = mixinClasses.map((mixinClass) => new mixinClass(this.columnAdapter));
        this.columnFragment = header.ownerDocument.createDocumentFragment();
    }
    get headerScroller() {
        return this.header.parentElement;
    }
    addColumnMixin(mixinClass, options) {
        this.columnMixins.push(new mixinClass(this.columnAdapter, options));
    }
    createColumnAdapter() {
        const r = {
            visible: this.visibleColumns,
            addAtBeginning: this.addColumnAtStart.bind(this),
            addAtBottom: this.addColumnAtEnd.bind(this),
            removeFromBeginning: this.removeColumnFromStart.bind(this),
            removeFromBottom: this.removeColumnFromEnd.bind(this),
            updateOffset: this.updateColumnOffset.bind(this),
            scroller: this.headerScroller,
            syncFrozen: this.syncFrozen.bind(this)
        };
        Object.defineProperties(r, {
            visibleFirstRowPos: {
                get: () => this.visibleFirstColumnPos,
                enumerable: true
            },
            context: {
                get: () => this.context.column,
                enumerable: true
            },
        });
        return r;
    }
    init() {
        const context = this.context;
        this.style.update(context.defaultRowHeight - context.padding(-1), context.columns, context.column.defaultRowHeight - context.column.padding(-1), context.column.padding, this.tableId);
        context.columns.forEach(() => {
            //init pool
            this.cellPool.push([]);
        });
    }
    onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight) {
        const scrollResult = this.onScrolledHorizontallyImpl(scrollLeft, clientWidth);
        this.columnMixins.forEach((mixin) => mixin.onScrolled(isGoingRight, scrollResult));
        return scrollResult;
    }
    removeColumnFromStart(from, to, frozenShift = this.visibleColumns.frozen.length) {
        this.forEachRow((row) => {
            this.removeCellFromStart(row, from, to, frozenShift);
        });
        if (debug) {
            this.verifyRows();
        }
    }
    removeCellFromStart(row, from, to, frozenShift) {
        for (let i = from; i <= to; ++i) {
            const node = (frozenShift === 0 ? row.firstElementChild : row.children[frozenShift]);
            node.remove();
            this.recycleCell(node, i);
        }
        if (debug) {
            verifyRow(row, -1, this.context.columns);
        }
    }
    removeColumnFromEnd(from, to) {
        this.forEachRow((row) => {
            this.removeCellFromEnd(row, from, to);
        });
        if (debug) {
            this.verifyRows();
        }
    }
    removeCellFromEnd(row, from, to) {
        for (let i = to; i >= from; --i) {
            const node = row.lastElementChild;
            node.remove();
            this.recycleCell(node, i);
        }
        if (debug) {
            verifyRow(row, -1, this.context.columns);
        }
    }
    removeFrozenCells(row, columnIndices, shift) {
        for (const columnIndex of columnIndices) {
            const node = row.children[shift];
            node.remove();
            this.recycleCell(node, columnIndex);
        }
        if (debug) {
            verifyRow(row, -1, this.context.columns);
        }
    }
    removeFrozenColumns(columnIndices, shift) {
        this.forEachRow((row) => {
            this.removeFrozenCells(row, columnIndices, shift);
        });
        if (debug) {
            this.verifyRows();
        }
    }
    removeAllColumns(includingFrozen) {
        this.forEachRow((row) => {
            this.removeAllCells(row, includingFrozen);
        });
        if (debug) {
            this.verifyRows();
        }
    }
    removeAllCells(row, includingFrozen, shift = this.visibleColumns.first) {
        const arr = Array.from(row.children);
        const frozen = this.visibleColumns.frozen;
        row.innerHTML = '';
        if (includingFrozen || frozen.length === 0) {
            for (const i of frozen) {
                this.recycleCell(arr.shift(), i);
            }
        }
        else {
            // have frozen and keep them, so readd them
            for (const _ of frozen) {
                row.appendChild(arr.shift());
            }
        }
        arr.forEach((item, i) => {
            this.recycleCell(item, i + shift);
        });
        if (debug) {
            verifyRow(row, -1, this.context.columns);
        }
    }
    selectCell(row, column, columns) {
        const pool = this.cellPool[column];
        const columnObj = columns[column];
        if (pool.length > 0) {
            const item = pool.pop();
            const r = this.updateCell(item, row, columnObj);
            if (r && r !== item) {
                Object(__WEBPACK_IMPORTED_MODULE_2__style_GridStyleManager__["b" /* setColumn */])(r, columnObj);
            }
            return r ? r : item;
        }
        const r = this.createCell(this.header.ownerDocument, row, columnObj);
        Object(__WEBPACK_IMPORTED_MODULE_2__style_GridStyleManager__["b" /* setColumn */])(r, columnObj);
        return r;
    }
    recycleCell(item, column) {
        this.cellPool[column].push(item);
    }
    addColumnAtStart(from, to, frozenShift = this.visibleColumns.frozen.length) {
        const { columns } = this.context;
        this.forEachRow((row, rowIndex) => {
            this.addCellAtStart(row, rowIndex, from, to, frozenShift, columns);
        });
        if (debug) {
            this.verifyRows();
        }
    }
    addCellAtStart(row, rowIndex, from, to, frozenShift, columns) {
        if (debug) {
            verifyRow(row, rowIndex, this.context.columns);
        }
        for (let i = to; i >= from; --i) {
            const cell = this.selectCell(rowIndex, i, columns);
            row.insertBefore(cell, frozenShift > 0 ? row.children[frozenShift] : row.firstChild);
        }
        if (debug) {
            verifyRow(row, rowIndex, this.context.columns);
        }
    }
    insertFrozenCells(row, rowIndex, columnIndices, shift, columns) {
        const before = row.children[shift];
        for (const i of columnIndices) {
            const cell = this.selectCell(rowIndex, i, columns);
            if (before) {
                row.insertBefore(cell, before);
            }
            else {
                row.appendChild(cell);
            }
        }
    }
    insertFrozenColumns(columnIndices, shift) {
        const { columns } = this.context;
        this.forEachRow((row, rowIndex) => {
            this.insertFrozenCells(row, rowIndex, columnIndices, shift, columns);
        });
    }
    addColumnAtEnd(from, to) {
        const { columns } = this.context;
        this.forEachRow((row, rowIndex) => {
            this.addCellAtEnd(row, rowIndex, from, to, columns);
        });
        if (debug) {
            this.verifyRows();
        }
    }
    verifyRows() {
        const { columns } = this.context;
        this.forEachRow((row, rowIndex) => verifyRow(row, rowIndex, columns));
    }
    addCellAtEnd(row, rowIndex, from, to, columns) {
        for (let i = from; i <= to; ++i) {
            const cell = this.selectCell(rowIndex, i, columns);
            row.appendChild(cell);
        }
        if (debug) {
            verifyRow(row, rowIndex, this.context.columns);
        }
    }
    updateHeaders() {
        const { columns } = this.context;
        Array.from(this.header.children).forEach((node, i) => {
            this.updateHeader(node, columns[i]);
        });
    }
    recreate(left, width) {
        const context = this.context;
        if (context.hasFrozenColumns === undefined) {
            context.hasFrozenColumns = context.columns.some((c) => c.frozen);
        }
        this.style.update(context.defaultRowHeight - context.padding(-1), context.columns, context.column.defaultRowHeight - context.column.padding(-1), context.column.padding, this.tableId);
        this.clearPool();
        // init pool
        for (let i = this.cellPool.length; i < context.columns.length; ++i) {
            this.cellPool.push([]);
        }
        //create all header columns
        {
            const fragment = this.columnFragment;
            const document = fragment.ownerDocument;
            this.header.innerHTML = '';
            context.columns.forEach((col) => {
                const n = this.createHeader(document, col);
                Object(__WEBPACK_IMPORTED_MODULE_2__style_GridStyleManager__["b" /* setColumn */])(n, col);
                fragment.appendChild(n);
            });
            this.header.appendChild(fragment);
        }
        const { first, last, firstRowPos } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["c" /* range */])(left, width, context.column.defaultRowHeight, context.column.exceptions, context.column.numberOfRows);
        this.visibleColumns.first = this.visibleColumns.forcedFirst = first;
        this.visibleColumns.last = this.visibleColumns.forcedLast = last;
        if (context.hasFrozenColumns) {
            const { target } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["e" /* updateFrozen */])([], context.columns, first);
            this.visibleColumns.frozen = target;
        }
        this.updateColumnOffset(firstRowPos);
    }
    clearPool() {
        this.cellPool.forEach((p) => p.splice(0, p.length));
    }
    updateColumnOffset(firstColumnPos) {
        this.visibleFirstColumnPos = firstColumnPos;
        // TODO
    }
    createRow(node, rowIndex) {
        const { columns, hasFrozenColumns } = this.context;
        const visible = this.visibleColumns;
        if (hasFrozenColumns) {
            for (const i of visible.frozen) {
                const cell = this.selectCell(rowIndex, i, columns);
                node.appendChild(cell);
            }
        }
        for (let i = visible.first; i <= visible.last; ++i) {
            const cell = this.selectCell(rowIndex, i, columns);
            node.appendChild(cell);
        }
    }
    updateRow(node, rowIndex) {
        const { columns, hasFrozenColumns } = this.context;
        const visible = this.visibleColumns;
        //columns may not match anymore if it is a pooled item a long time ago
        const existing = Array.from(node.children);
        switch (existing.length) {
            case 0:
                if (hasFrozenColumns) {
                    this.insertFrozenCells(node, rowIndex, visible.frozen, 0, columns);
                }
                this.addCellAtEnd(node, rowIndex, visible.first, visible.last, columns);
                break;
            case 1:
                const old = existing[0];
                const id = old.dataset.id;
                const columnIndex = columns.findIndex((c) => c.id === id);
                node.removeChild(old);
                this.recycleCell(old, columnIndex);
                if (hasFrozenColumns) {
                    this.insertFrozenCells(node, rowIndex, visible.frozen, 0, columns);
                }
                this.addCellAtEnd(node, rowIndex, visible.first, visible.last, columns);
                break;
            default://>=2
                if (hasFrozenColumns) {
                    //sync the frozen columns
                    const currentFrozen = [];
                    for (const node of existing) {
                        const id = node.dataset.id;
                        const col = columns.findIndex((c) => c.id === id);
                        if (columns[col].frozen) {
                            currentFrozen.push(col);
                        }
                        else {
                            //just interested in the first frozen
                            break;
                        }
                    }
                    const { common, removed, added } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["a" /* frozenDelta */])(currentFrozen, visible.frozen);
                    //update the common ones
                    existing.slice(0, common).forEach((child, i) => {
                        const col = columns[currentFrozen[i]];
                        const cell = this.updateCell(child, rowIndex, col);
                        if (cell && cell !== child) {
                            Object(__WEBPACK_IMPORTED_MODULE_2__style_GridStyleManager__["b" /* setColumn */])(cell, col);
                            node.replaceChild(cell, child);
                        }
                    });
                    this.removeFrozenCells(node, removed, common);
                    this.insertFrozenCells(node, rowIndex, added, common, columns);
                    //remove the ones already handled
                    existing.splice(0, currentFrozen.length);
                }
                const firstId = existing[0].dataset.id;
                const lastId = existing[existing.length - 1].dataset.id;
                const firstIndex = columns.findIndex((c) => c.id === firstId);
                const lastIndex = columns.findIndex((c) => c.id === lastId);
                const frozenShift = visible.frozen.length;
                if (firstIndex === visible.first && lastIndex === visible.last) {
                    //match update
                    existing.forEach((child, i) => {
                        const col = columns[i + visible.first];
                        const cell = this.updateCell(child, rowIndex, col);
                        if (cell && cell !== child) {
                            Object(__WEBPACK_IMPORTED_MODULE_2__style_GridStyleManager__["b" /* setColumn */])(cell, col);
                            node.replaceChild(cell, child);
                        }
                    });
                }
                else if (visible.last > firstIndex || visible.first < lastIndex) {
                    //no match at all
                    this.removeAllCells(node, false, firstIndex);
                    this.addCellAtStart(node, rowIndex, visible.first, visible.last, frozenShift, columns);
                }
                else if (visible.first < firstIndex) {
                    //some first rows missing and some last rows to much
                    this.removeCellFromEnd(node, visible.last + 1, firstIndex);
                    this.addCellAtStart(node, rowIndex, visible.first, firstIndex - 1, frozenShift, columns);
                }
                else {
                    //some last rows missing and some first rows to much
                    this.removeCellFromStart(node, firstIndex, visible.first - 1, frozenShift);
                    this.addCellAtEnd(node, rowIndex, lastIndex + 1, visible.last, columns);
                }
        }
    }
    syncFrozen(first) {
        const { columns, hasFrozenColumns } = this.context;
        const visible = this.visibleColumns;
        if (!hasFrozenColumns) {
            return 0;
        }
        if (first === 0) {
            if (visible.frozen.length > 0) {
                this.removeFrozenColumns(visible.frozen, 0);
                visible.frozen = [];
            }
            return 0;
        }
        const old = visible.frozen.length;
        const { target, added, removed } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["e" /* updateFrozen */])(visible.frozen, columns, first);
        if (removed.length > 0) {
            this.removeFrozenColumns(removed, old - removed.length);
        }
        if (added.length > 0) {
            this.insertFrozenColumns(added, old - removed.length);
        }
        visible.frozen = target;
        return target.length;
    }
    onScrolledHorizontallyImpl(scrollLeft, clientWidth) {
        const { column } = this.context;
        const { first, last, firstRowPos } = Object(__WEBPACK_IMPORTED_MODULE_0__logic__["c" /* range */])(scrollLeft, clientWidth, column.defaultRowHeight, column.exceptions, column.numberOfRows);
        const visible = this.visibleColumns;
        visible.forcedFirst = first;
        visible.forcedLast = last;
        if ((first - visible.first) >= 0 && (last - visible.last) <= 0) {
            //nothing to do
            return __WEBPACK_IMPORTED_MODULE_1__mixin__["a" /* EScrollResult */].NONE;
        }
        let r = __WEBPACK_IMPORTED_MODULE_1__mixin__["a" /* EScrollResult */].PARTIAL;
        const frozenShift = this.syncFrozen(first);
        if (first > visible.last || last < visible.first) {
            //no overlap, clean and draw everything
            //console.log(`ff added: ${last - first + 1} removed: ${visibleLast - visibleFirst + 1} ${first}:${last} ${offset}`);
            //removeRows(visibleFirst, visibleLast);
            this.removeAllColumns(false);
            this.addColumnAtEnd(first, last);
            r = __WEBPACK_IMPORTED_MODULE_1__mixin__["a" /* EScrollResult */].ALL;
        }
        else if (first < visible.first) {
            //some first rows missing and some last rows to much
            //console.log(`up added: ${visibleFirst - first + 1} removed: ${visibleLast - last + 1} ${first}:${last} ${offset}`);
            this.removeColumnFromEnd(last + 1, visible.last);
            this.addColumnAtStart(first, visible.first - 1, frozenShift);
        }
        else {
            //console.log(`do added: ${last - visibleLast + 1} removed: ${first - visibleFirst + 1} ${first}:${last} ${offset}`);
            //some last rows missing and some first rows to much
            this.removeColumnFromStart(visible.first, first - 1, frozenShift);
            this.addColumnAtEnd(visible.last + 1, last);
        }
        visible.first = first;
        visible.last = last;
        this.updateColumnOffset(firstRowPos);
        return r;
    }
}
/* unused harmony export ACellAdapter */

/* harmony default export */ __webpack_exports__["a"] = (ACellAdapter);
function verifyRow(row, index, columns) {
    const cols = Array.from(row.children);
    //sort incrementally
    if (cols.length <= 1) {
        return;
    }
    const colObjs = cols.map((c) => columns.find((d) => d.id === c.dataset.id));
    console.assert(colObjs.every((d) => Boolean(d)), 'all columns must exist', index);
    console.assert(colObjs.every((d, i) => i === 0 || d.index >= colObjs[i - 1].index), 'all columns in ascending order', index);
    console.assert((new Set(colObjs)).size === colObjs.length, 'unique columns', colObjs);
}


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RenderColumn__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lineupengine_src_style__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__renderer_MultiLevelCellRenderer__ = __webpack_require__(40);





class MultiLevelRenderColumn extends __WEBPACK_IMPORTED_MODULE_1__RenderColumn__["a" /* default */] {
    constructor(c, renderers, index, columnPadding) {
        super(c, renderers, index);
        this.columnPadding = columnPadding;
    }
    get mc() {
        return this.c;
    }
    get width() {
        return this.c.getWidth() + this.columnPadding * this.mc.length;
    }
    createHeader(document, ctx) {
        const node = super.createHeader(document, ctx);
        const wrapper = document.createElement('div');
        wrapper.classList.add('lu-nested');
        wrapper.classList.add(Object(__WEBPACK_IMPORTED_MODULE_4__renderer_MultiLevelCellRenderer__["c" /* gridClass */])(this.c));
        node.appendChild(wrapper);
        const mc = this.mc;
        if (mc.getCollapsed()) {
            return node;
        }
        mc.children.forEach((c, i) => {
            const n = Object(__WEBPACK_IMPORTED_MODULE_0__header__["c" /* createHeader */])(c, document, ctx);
            n.style.marginLeft = i > 0 ? `${this.columnPadding * 2}px` : null;
            n.classList.add('lu-header');
            if (__WEBPACK_IMPORTED_MODULE_3_lineupengine_src_style__["b" /* isEdge */]) {
                n.style.msGridColumn = (i + 1).toString();
            }
            else {
                n.style.gridColumnStart = (i + 1).toString();
            }
            wrapper.appendChild(n);
        });
        this.updateNested(wrapper, ctx);
        return node;
    }
    updateHeader(node, ctx) {
        super.updateHeader(node, ctx);
        const wrapper = node.querySelector('.lu-nested');
        if (!wrapper) {
            return; // too early
        }
        this.updateNested(wrapper, ctx);
    }
    updateWidthRule(style) {
        const mc = this.mc;
        const total = this.width;
        const widths = mc.children.map((c) => `${Object(__WEBPACK_IMPORTED_MODULE_2__utils__["q" /* round */])(100 * c.getWidth() / total, 2)}%`);
        const clazz = Object(__WEBPACK_IMPORTED_MODULE_4__renderer_MultiLevelCellRenderer__["c" /* gridClass */])(this.c);
        style.updateRule(`stacked-${this.c.id}`, `.lineup-engine .${clazz} {
      display: ${__WEBPACK_IMPORTED_MODULE_3_lineupengine_src_style__["b" /* isEdge */] ? '-ms-grid' : 'grid'};
      ${__WEBPACK_IMPORTED_MODULE_3_lineupengine_src_style__["b" /* isEdge */] ? '-ms-grid-columns' : 'grid-template-columns'}: ${widths.join(' ')};
    }`);
        return clazz;
    }
    updateNested(wrapper, ctx) {
        const mc = this.mc;
        if (mc.getCollapsed()) {
            return;
        }
        const sub = this.mc.children;
        const children = Array.from(wrapper.children);
        sub.forEach((c, i) => {
            const node = children[i];
            node.className = `lu-header ${c.cssClass ? ` ${c.cssClass}` : ''}${this.c.headerCssClass}${this.c.isFiltered() ? ' lu-filtered' : ''}`;
            Object(__WEBPACK_IMPORTED_MODULE_0__header__["j" /* updateHeader */])(node, c, ctx);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiLevelRenderColumn;



/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__provider_OrderedSet__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces__ = __webpack_require__(22);



class SelectionManager extends __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* AEventDispatcher */] {
    constructor(ctx, body) {
        super();
        this.ctx = ctx;
        this.body = body;
        this.start = null;
        this.startNode = null;
        this.endNode = null;
        const root = body.parentElement.parentElement;
        let hr = root.querySelector('hr');
        if (!hr) {
            hr = root.ownerDocument.createElement('hr');
            root.appendChild(hr);
        }
        this.hr = hr;
        body.addEventListener('mousemove', (evt) => {
            if (!this.start) {
                return;
            }
            this.showHint(this.start, evt);
        });
        body.addEventListener('mousedown', (evt) => {
            const r = root.getBoundingClientRect();
            this.start = { x: evt.x, y: evt.y, xShift: r.left, yShift: r.top };
        });
        const end = (evt) => {
            this.select(evt.ctrlKey);
            this.start = this.startNode = this.endNode = null;
            this.body.classList.remove('lu-selection-active');
            this.hr.classList.remove('lu-selection-active');
        };
        body.addEventListener('mouseup', end);
        body.addEventListener('mouseleave', end);
    }
    createEventList() {
        return super.createEventList().concat([SelectionManager.EVENT_SELECT_RANGE]);
    }
    select(additional) {
        if (!this.start || !this.startNode || !this.endNode) {
            return;
        }
        if (this.startNode === this.endNode) {
            return; // no single
        }
        const startIndex = parseInt(this.startNode.dataset.index, 10);
        const endIndex = parseInt(this.endNode.dataset.index, 10);
        const from = Math.min(startIndex, endIndex);
        const end = Math.max(startIndex, endIndex);
        if (from === end) {
            return; // no single
        }
        this.fire(SelectionManager.EVENT_SELECT_RANGE, from, end, additional);
    }
    showHint(start, end) {
        this.start = start;
        const sy = start.y;
        const ey = end.y;
        const visible = Math.abs(sy - ey) > SelectionManager.MIN_DISTANCE;
        this.body.classList.toggle('lu-selection-active', visible);
        this.hr.classList.toggle('lu-selection-active', visible);
        this.hr.style.transform = `translate(${start.x - start.xShift}px,${sy - start.yShift}px)scale(1,${Math.abs(ey - sy)})rotate(${ey > sy ? 90 : -90}deg)`;
    }
    remove(node) {
        node.onclick = node.onmousedown = node.onmouseup = undefined;
    }
    add(node) {
        node.onclick = (evt) => {
            const dataIndex = parseInt(node.dataset.dataIndex, 10);
            this.ctx.provider.toggleSelection(dataIndex, evt.ctrlKey);
        };
        node.onmousedown = () => {
            this.startNode = node;
        };
        node.onmouseup = () => {
            if (this.start) {
                this.endNode = node;
            }
        };
    }
    selectRange(rows, additional = false) {
        const current = new __WEBPACK_IMPORTED_MODULE_1__provider_OrderedSet__["a" /* default */](additional ? this.ctx.provider.getSelection() : []);
        const toggle = (dataIndex) => {
            if (current.has(dataIndex)) {
                current.delete(dataIndex);
            }
            else {
                current.add(dataIndex);
            }
        };
        rows.forEach((d) => {
            if (Object(__WEBPACK_IMPORTED_MODULE_2__interfaces__["a" /* isGroup */])(d)) {
                d.rows.forEach((r) => toggle(r.dataIndex));
            }
            else {
                toggle(d.dataIndex);
            }
        });
        this.ctx.provider.setSelection(Array.from(current));
    }
    updateState(node, dataIndex) {
        if (this.ctx.provider.isSelected(dataIndex)) {
            node.classList.add('lu-selected');
        }
        else {
            node.classList.remove('lu-selected');
        }
    }
    update(node, selectedDataIndices) {
        const dataIndex = parseInt(node.dataset.dataIndex, 10);
        if (selectedDataIndices.has(dataIndex)) {
            node.classList.add('lu-selected');
        }
        else {
            node.classList.remove('lu-selected');
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SelectionManager;

SelectionManager.EVENT_SELECT_RANGE = 'selectRange';
SelectionManager.MIN_DISTANCE = 10;


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lineupAnimation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__ = __webpack_require__(63);


function toGroupLookup(items) {
    const item2groupIndex = new Map();
    const group2firstItemIndex = new Map();
    items.forEach((item, i) => {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__interfaces__["a" /* isGroup */])(item)) {
            item.rows.forEach((d) => item2groupIndex.set(d.dataIndex, i));
        }
        else if (item.group && item.relativeIndex === 0) {
            group2firstItemIndex.set(item.group.name, i);
        }
    });
    return { item2groupIndex, group2firstItemIndex };
}
function toKey(item) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__interfaces__["a" /* isGroup */])(item)) {
        return item.name;
    }
    return item.dataIndex.toString();
}
function lineupAnimation(previous, previousData, currentData) {
    const previousKey = (index) => toKey(previousData[index]);
    const currentKey = (index) => toKey(currentData[index]);
    const previousGroupCount = previousData.reduce((acc, i) => acc + (Object(__WEBPACK_IMPORTED_MODULE_0__interfaces__["a" /* isGroup */])(i) ? 1 : 0), 0);
    const currentGroupCount = currentData.reduce((acc, i) => acc + (Object(__WEBPACK_IMPORTED_MODULE_0__interfaces__["a" /* isGroup */])(i) ? 1 : 0), 0);
    if (previousGroupCount === currentGroupCount) {
        // reorder or filter only
        return { currentKey, previous, previousKey };
    }
    // try to appear where the group was uncollapsed and vice versa
    let prevHelper;
    const appearPosition = (currentRowIndex, previousFinder, defaultValue) => {
        if (!prevHelper) {
            prevHelper = toGroupLookup(previousData);
        }
        const item = currentData[currentRowIndex];
        const referenceIndex = Object(__WEBPACK_IMPORTED_MODULE_0__interfaces__["a" /* isGroup */])(item) ? prevHelper.group2firstItemIndex.get(item.name) : prevHelper.item2groupIndex.get(item.dataIndex);
        if (referenceIndex === undefined) {
            return defaultValue;
        }
        const pos = previousFinder.posByKey(previousKey(referenceIndex));
        return pos.pos >= 0 ? pos.pos : defaultValue;
    };
    let currHelper;
    const removePosition = (previousRowIndex, currentFinder, defaultValue) => {
        if (!currHelper) {
            currHelper = toGroupLookup(currentData);
        }
        const item = previousData[previousRowIndex];
        const referenceIndex = Object(__WEBPACK_IMPORTED_MODULE_0__interfaces__["a" /* isGroup */])(item) ? currHelper.group2firstItemIndex.get(item.name) : currHelper.item2groupIndex.get(item.dataIndex);
        if (referenceIndex === undefined) {
            return defaultValue;
        }
        const pos = currentFinder.posByKey(currentKey(referenceIndex));
        return pos.pos >= 0 ? pos.pos : defaultValue;
    };
    const phases = [
        Object.assign({}, __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["b" /* defaultPhases */][0], {
            apply(item, previousFinder) {
                __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["b" /* defaultPhases */][0].apply(item);
                if (item.mode === __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["a" /* EAnimationMode */].SHOW) {
                    item.node.style.transform = `translate(0, ${appearPosition(item.current.index, previousFinder, item.previous.y) - item.nodeY}px)`;
                }
            }
        }),
        Object.assign({}, __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["b" /* defaultPhases */][1], {
            apply(item, _previousFinder, currentFinder) {
                __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["b" /* defaultPhases */][1].apply(item);
                if (item.mode === __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["a" /* EAnimationMode */].HIDE) {
                    item.node.style.transform = `translate(0, ${removePosition(item.previous.index, currentFinder, item.current.y) - item.nodeY}px)`;
                }
            }
        }),
        __WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["b" /* defaultPhases */][__WEBPACK_IMPORTED_MODULE_1_lineupengine_src_animation__["b" /* defaultPhases */].length - 1]
    ];
    return { previous, previousKey, currentKey, phases };
}


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOMBodyRenderer__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CanvasBodyRenderer__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ABodyRenderer__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__HeaderRenderer__ = __webpack_require__(65);
/**
 * Created by Samuel Gratzl on 09.08.2017.
 */





class SeparatedRenderer extends __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* AEventDispatcher */] {
    constructor(data, parent, options, type) {
        super();
        this.config = options;
        this.header = new __WEBPACK_IMPORTED_MODULE_4__HeaderRenderer__["a" /* default */](data, parent, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* merge */])({}, this.config.header, {
            idPrefix: this.config.idPrefix,
            manipulative: this.config.manipulative,
            summary: this.config.renderingOptions.summary,
            freezeCols: this.config.body.freezeCols,
        }));
        parent.insertAdjacentHTML('beforeend', `<div class="lu-body-wrapper"></div>`);
        const bodyWrapper = parent.lastElementChild;
        {
            const bodyConfig = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* merge */])({}, this.config.body, {
                meanLine: this.config.renderingOptions.meanLine,
                animation: this.config.renderingOptions.animation,
                stacked: this.config.renderingOptions.stacked,
                idPrefix: this.config.idPrefix,
                renderers: this.config.renderers
            });
            this.body = type === 'canvas' ? new __WEBPACK_IMPORTED_MODULE_2__CanvasBodyRenderer__["a" /* default */](data, bodyWrapper, this.slice.bind(this), bodyConfig) : new __WEBPACK_IMPORTED_MODULE_1__DOMBodyRenderer__["a" /* default */](data, bodyWrapper, this.slice.bind(this), bodyConfig);
        }
        //share hist caches
        this.body.histCache = this.header.sharedHistCache;
        this.forward(this.body, __WEBPACK_IMPORTED_MODULE_3__ABodyRenderer__["a" /* default */].EVENT_HOVER_CHANGED);
        this.forward(this.body, __WEBPACK_IMPORTED_MODULE_3__ABodyRenderer__["a" /* default */].EVENT_RENDER_FINISHED);
        if (!this.config.body.visibleRowsOnly) {
            return;
        }
        this.contentScroller = new __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* ContentScroller */](bodyWrapper, this.body.node, {
            pageSize: this.config.body.backupScrollRows * this.config.body.rowHeight,
            backupRows: this.config.body.backupScrollRows,
            rowHeight: this.config.body.rowHeight
        });
        this.contentScroller.on(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* ContentScroller */].EVENT_SCROLL, (_top, left) => {
            //in two svg mode propagate horizontal shift
            this.header.$node.style('margin-left', `${-left}px`);
            if (this.config.body.freezeCols > 0) {
                this.header.updateFreeze(left);
                this.body.updateFreeze(left);
            }
        });
        this.contentScroller.on(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* ContentScroller */].EVENT_REDRAW, (delta) => this.body.scrolled(delta));
    }
    createEventList() {
        return [__WEBPACK_IMPORTED_MODULE_3__ABodyRenderer__["a" /* default */].EVENT_RENDER_FINISHED, __WEBPACK_IMPORTED_MODULE_3__ABodyRenderer__["a" /* default */].EVENT_HOVER_CHANGED];
    }
    slice(start, length, row2y) {
        if (this.contentScroller) {
            return this.contentScroller.select(start, length, row2y);
        }
        return { from: start, to: length };
    }
    destroy() {
        if (this.contentScroller) {
            this.contentScroller.destroy();
        }
    }
    changeDataStorage(data) {
        this.header.changeDataStorage(data);
        this.body.changeDataStorage(data);
    }
    scrollIntoView(length, index) {
        if (this.contentScroller) {
            this.contentScroller.scrollIntoView(0, length, index, (i) => i * this.config.body.rowHeight);
        }
        else {
            const container = this.body.node.parentElement;
            container.scrollTop = index * this.config.body.rowHeight;
        }
    }
    fakeHover(index) {
        this.body.fakeHover(index);
    }
    update() {
        this.header.update();
        this.body.update();
    }
    setBodyOption(option, value) {
        this.body.setOption(option, value);
        this.body.update();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SeparatedRenderer;



/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ABodyRenderer__ = __webpack_require__(32);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */




class DOMBodyRenderer extends __WEBPACK_IMPORTED_MODULE_3__ABodyRenderer__["a" /* default */] {
    constructor(data, parent, slicer, options = {}) {
        super(data, parent, slicer, 'div', options);
        this.currentFreezeLeft = 0;
    }
    animated($rows) {
        if (this.options.animationDuration > 0 && this.options.animation) {
            return $rows.transition().duration(this.options.animationDuration);
        }
        return $rows;
    }
    renderRankings($body, data, context) {
        const that = this;
        const $rankings = $body.selectAll('div.ranking').data(data, (d) => d.id);
        $rankings.enter().append('div')
            .attr('class', 'ranking')
            .style('left', (d) => `${d.shift}px`);
        //animated shift
        this.animated($rankings)
            .style('left', (d) => `${d.shift}px`);
        const toWait = [];
        const $groups = $rankings.selectAll('div.group').data((d) => d.groups, (d) => d.group.name);
        const $groupsEnter = $groups.enter().append('div').attr('class', 'group');
        const $aggregateEnter = $groupsEnter.append('div').attr('class', 'aggregate').attr('data-agg', 'group');
        $aggregateEnter.append('div').attr('class', 'cols');
        $aggregateEnter.append('div').attr('class', 'frozen').style('transform', `translate${this.currentFreezeLeft}px,0)`);
        $groupsEnter.append('div').attr('class', 'rows').attr('data-agg', 'detail');
        $groupsEnter.append('div').attr('class', 'meanlines');
        $groupsEnter.style('top', (d) => `${d.y}px`);
        const renderDetail = ($this, ranking, group) => {
            $this.selectAll('div.aggregate .cols > *, div.aggregate .frozen > *').remove();
            $this.select('div.aggregate').style('height', null); //reset height
            const $rows = $this.select('div.rows').selectAll('div.row').data(group.order, String);
            const $rowsEnter = $rows.enter().append('div').attr('class', 'row');
            $rowsEnter.style('top', (_d, i) => `${context.cellPrevY(i)}px`);
            $rowsEnter
                .on('mouseenter', (d) => this.mouseOver(d, true))
                .on('mouseleave', (d) => this.mouseOver(d, false))
                .on('click', (d) => this.select(d, __WEBPACK_IMPORTED_MODULE_0_d3__["event"].ctrlKey));
            //create templates
            const createTemplates = (node, columns) => {
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["o" /* matchColumns */])(node, columns, 'detail');
            };
            $rowsEnter.append('div').attr('class', 'frozen').style('transform', `translate${this.currentFreezeLeft}px,0)`).each(function () {
                createTemplates(this, ranking.frozen);
            });
            $rowsEnter.append('div').attr('class', 'cols').each(function () {
                createTemplates(this, ranking.columns);
            });
            $rows.each(function (d, i) {
                const selected = that.data.isSelected(d);
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* attr */])(this, {
                    'class': `row${i % 2 === 0 ? ' even' : ''}${selected ? ' selected' : ''}`,
                    'data-data-index': d
                });
            });
            //animated reordering
            this.animated($rows)
                .style('top', (_d, i) => `${context.cellY(i)}px`)
                .style('height', `${this.options.rowHeight}px`);
            const updateColumns = (node, r, i, columns) => {
                //update nodes and create templates
                const updateRow = (row) => {
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__["o" /* matchColumns */])(node, columns, 'detail');
                    columns.forEach((col, ci) => {
                        const cnode = node.childNodes[ci];
                        // use the shift if possible since it considers more cornercases
                        cnode.style.width = `${ci < columns.length - 2 ? (columns[ci + 1].shift - col.shift) : col.column.getWidth()}px`;
                        col.renderer.update(cnode, row, i, group.group);
                    });
                };
                const d = r.data[i];
                if (d instanceof Promise) {
                    return d.then(updateRow);
                }
                return updateRow(d);
            };
            //update columns
            //order for frozen in html + set the size in html to have a proper background instead of a clip-path
            const maxFrozen = data.length === 0 || data[0].frozen.length === 0 ? 0 : (__WEBPACK_IMPORTED_MODULE_0_d3__["max"](data[0].frozen, (f) => f.shift + f.column.getWidth()) + that.options.columnPadding);
            $rows.select('div.cols').each(function (_d, i) {
                this.style.marginLeft = `${maxFrozen}px`;
                toWait.push(updateColumns(this, group, i, ranking.columns));
            });
            $rows.select('div.frozen').each(function (_d, i) {
                this.style.width = `${maxFrozen}px`;
                toWait.push(updateColumns(this, group, i, ranking.frozen));
            });
            $rows.exit().remove();
            {
                const $meanlines = $groups.select('div.meanlines').selectAll('div.meanline').data(ranking.columns.filter((c) => this.showMeanLine(c.column)));
                $meanlines.enter().append('div').attr('class', 'meanline');
                $meanlines.each(function (d) {
                    const h = that.histCache.get(d.column.id);
                    const $mean = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this);
                    if (!h) {
                        return;
                    }
                    const render = (stats) => {
                        const xPos = d.shift + d.column.getWidth() * stats.mean;
                        $mean.style('left', `${isNaN(xPos) ? 0 : xPos}px`).style('height', `${group.height}px`);
                    };
                    if (h instanceof Promise) {
                        h.then(render);
                    }
                    else {
                        render(h);
                    }
                });
                $meanlines.exit().remove();
            }
        };
        const renderAggregate = ($this, ranking, group) => {
            $this.selectAll('div.rows > *, div.meanlines > *').remove();
            const $base = $this.select('div.aggregate').style('height', `${group.height}px`);
            const updateColumns = (node, r, columns) => {
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__["o" /* matchColumns */])(node, columns, 'group');
                return Promise.all(r.data).then((rows) => {
                    return Promise.all(columns.map((col, ci) => {
                        return Promise.resolve(this.histCache.get(col.column.id)).then((hist) => {
                            const cnode = node.childNodes[ci];
                            cnode.style.width = `${ci < columns.length - 2 ? (columns[ci + 1].shift - col.shift) : col.column.getWidth()}px`;
                            col.groupRenderer.update(cnode, r.group, rows, hist);
                        });
                    }));
                });
            };
            //update columns
            //order for frozen in html + set the size in html to have a proper background instead of a clip-path
            const maxFrozen = data.length === 0 || data[0].frozen.length === 0 ? 0 : __WEBPACK_IMPORTED_MODULE_0_d3__["max"](data[0].frozen, (f) => f.shift + f.column.getWidth());
            $base.select('div.cols').each(function () {
                this.style.marginLeft = `${maxFrozen}px`;
                toWait.push(updateColumns(this, group, ranking.columns));
            });
            $base.select('div.frozen').each(function () {
                this.style.width = `${maxFrozen}px`;
                toWait.push(updateColumns(this, group, ranking.frozen));
            });
        };
        $groups.each(function (group, _j, k) {
            const f = group.aggregate ? renderAggregate : renderDetail;
            f(__WEBPACK_IMPORTED_MODULE_0_d3__["select"](this), data[k], group);
        });
        //animated reordering
        this.animated($groups).style('top', (d) => `${d.y}px`);
        $groups.exit().remove();
        $rankings.exit().remove();
        return Promise.all(toWait);
    }
    select(dataIndex, additional = false) {
        const selected = super.select(dataIndex, additional);
        this.$node.selectAll(`[data-data-index="${dataIndex}"]`).classed('selected', selected);
        return selected;
    }
    drawSelection() {
        const indices = this.data.getSelection();
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* forEach */])(this.node, '.selected', (d) => d.classList.remove('selected'));
        if (indices.length === 0) {
            return;
        }
        const q = indices.map((d) => `[data-data-index='${d}']`).join(',');
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* forEach */])(this.node, q, (d) => d.classList.add('selected'));
    }
    mouseOver(dataIndex, hover = true) {
        super.mouseOver(dataIndex, hover);
        function setClass(item) {
            item.classList.add('hover');
        }
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* forEach */])(this.node, '.hover', (d) => d.classList.remove('hover'));
        if (hover) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* forEach */])(this.node, `[data-data-index='${dataIndex}']`, setClass);
        }
    }
    renderSlopeGraphs($parent, data, context, height) {
        const slopes = data.slice(1).map((d, i) => ({
            left: data[i].groups[0].order,
            left_i: i,
            right: d.groups[0].order,
            right_i: i + 1
        }));
        const $slopes = $parent.selectAll('svg.slopegraph').data(slopes);
        $slopes.enter().append('svg').attr('class', 'slopegraph');
        $slopes.attr('width', this.options.slopeWidth)
            .attr('height', height)
            .style('left', (_d, i) => `${data[i + 1].shift - this.options.slopeWidth}px`);
        const $lines = $slopes.selectAll('line.slope').data((d) => {
            const cache = new Map();
            d.right.forEach((dataIndex, pos) => cache.set(dataIndex, pos));
            return d.left.map((dataIndex, pos) => ({
                dataIndex,
                lpos: pos,
                rpos: cache.get(dataIndex)
            })).filter((d) => d.rpos != null);
        });
        $lines.enter().append('line').attr({
            'class': 'slope',
            x2: this.options.slopeWidth
        }).on('mouseenter', (d) => this.mouseOver(d.dataIndex, true))
            .on('mouseleave', (d) => this.mouseOver(d.dataIndex, false));
        $lines.attr('data-data-index', (d) => d.dataIndex);
        const pos = (index) => {
            const act = context.cellY(index);
            const next = context.cellY(index + 1);
            return act + (next - act) * 0.5;
        };
        $lines.attr({
            y1: (d) => pos(d.lpos),
            y2: (d) => pos(d.rpos)
        });
        $lines.exit().remove();
        $slopes.exit().remove();
    }
    updateFreeze(left) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* forEach */])(this.node, 'div.row .frozen', (row) => {
            row.style.transform = `translate(${left}px,${0}px)`;
        });
        this.currentFreezeLeft = left;
    }
    createContextImpl(indexShift, totalNumberOfRows) {
        return this.createContext(indexShift, totalNumberOfRows, __WEBPACK_IMPORTED_MODULE_2__renderer__["createDOM"], __WEBPACK_IMPORTED_MODULE_2__renderer__["createDOMGroup"]);
    }
    updateImpl(data, context, width, height) {
        // - ... added one to often
        this.node.style.width = `${Math.max(0, width)}px`;
        this.node.style.height = `${Math.max(0, height)}px`;
        let $body = this.$node.select('div.body');
        if ($body.empty()) {
            $body = this.$node.append('div').classed('body', true);
        }
        this.renderSlopeGraphs($body, data, context, height);
        return this.renderRankings($body, data, context);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DOMBodyRenderer;



/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_SelectionColumn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__renderer_index__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ABodyRenderer__ = __webpack_require__(32);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */





class BodyCanvasRenderer extends __WEBPACK_IMPORTED_MODULE_4__ABodyRenderer__["a" /* default */] {
    constructor(data, parent, slicer, options = {}) {
        super(data, parent, slicer, 'div', Object(__WEBPACK_IMPORTED_MODULE_1__utils__["p" /* merge */])({}, BodyCanvasRenderer.CUSTOM_OPTIONS, options));
        this.currentFreezeLeft = 0;
        this.currentHover = -1;
        this.lastShifts = [];
        this.$node.append('canvas');
        this.initInteraction();
    }
    columnUnderMouse(x) {
        for (const shift of this.lastShifts) {
            if (shift.shift <= x && x < (shift.shift + shift.column.getWidth())) {
                return shift.column;
            }
        }
        return null;
    }
    rowUnderMouse(y) {
        //TODO doesn't support grouping
        const rowHeight = this.options.rowHeight;
        return Math.floor((y + 1) / rowHeight);
    }
    itemUnderMouse(xy) {
        const row = this.rowUnderMouse(xy[1]);
        if (row < 0) {
            return null;
        }
        const col = this.columnUnderMouse(xy[0]);
        if (col === null) {
            return null;
        }
        const order = col.findMyRanker().getOrder();
        return {
            dataIndex: order[row],
            column: col
        };
    }
    initInteraction() {
        this.$node.on('selectstart', () => __WEBPACK_IMPORTED_MODULE_0_d3__["event"].preventDefault());
        this.$node.on('mousemove', () => {
            const mouse = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"])(this.node);
            const pos = this.itemUnderMouse(mouse);
            this.mouseOver(pos ? pos.dataIndex : -1);
        });
        this.$node.on('mouseenter', () => {
            this.mouseOver(-1, false);
        });
        this.$node.on('mouseleave', () => {
            this.mouseOver(-1, false);
        });
        this.$node.on('click', () => {
            const mouse = Object(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"])(this.node);
            const pos = this.itemUnderMouse(mouse);
            if (pos) {
                //additional if click on Selection Column
                this.select(pos.dataIndex, __WEBPACK_IMPORTED_MODULE_0_d3__["event"].ctrlKey || pos.column instanceof __WEBPACK_IMPORTED_MODULE_2__model_SelectionColumn__["b" /* default */]);
            }
        });
    }
    /**
     * get a style
     */
    style(name) {
        const o = this.options;
        return (o.style || {})[name];
    }
    select(dataIndex, additional = false) {
        const selected = super.select(dataIndex, additional);
        this.update();
        return selected;
    }
    drawSelection() {
        this.update(); //no shortcut so far
    }
    updateFreeze(left) {
        this.currentFreezeLeft = left;
        this.update(); //no shortcut so far
    }
    mouseOver(dataIndex, hover = true) {
        if (hover === (this.currentHover === dataIndex)) {
            return;
        }
        this.currentHover = dataIndex;
        super.mouseOver(dataIndex, dataIndex >= 0);
        if (!hover || dataIndex < 0) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils__["n" /* hideOverlays */])(this.$node.node());
        }
        this.update();
    }
    isHovered(dataIndex) {
        return this.currentHover === dataIndex;
    }
    renderRow(ctx, context, ranking, di, i, group) {
        const dataIndex = di.dataIndex;
        let dx = ranking.shift;
        const dy = context.cellY(i) + group.y;
        ctx.translate(dx, dy);
        if (i % 2 === 0) {
            ctx.fillStyle = this.style('bg');
            ctx.fillRect(0, 0, ranking.width, context.rowHeight(i));
            ctx.fillStyle = this.style('text');
        }
        const isSelected = this.data.isSelected(dataIndex);
        if (isSelected) {
            ctx.strokeStyle = this.style('selection');
            ctx.strokeRect(0, 0, ranking.width, context.rowHeight(i));
        }
        else if (this.isHovered(dataIndex)) {
            ctx.strokeStyle = this.style('hover');
            ctx.strokeRect(0, 0, ranking.width, context.rowHeight(i));
        }
        //clip the remaining children
        ctx.save();
        //shift if needs to shifted and then maximal that just the shifted columns are visible
        const frozenLeft = this.currentFreezeLeft < ranking.shift ? 0 : Math.min(this.currentFreezeLeft - ranking.shift, ranking.width - ranking.frozenWidth);
        if (ranking.frozenWidth > 0 && frozenLeft > 0) {
            ctx.rect(dx + frozenLeft + ranking.frozenWidth, 0, ranking.width, context.rowHeight(i));
            ctx.clip();
        }
        ranking.columns.forEach((child) => {
            ctx.save();
            ctx.translate(child.shift, 0);
            child.renderer(ctx, di, i, dx + child.shift, dy, group.group);
            ctx.restore();
        });
        ctx.restore();
        ctx.translate(frozenLeft, 0);
        dx += frozenLeft;
        ranking.frozen.forEach((child) => {
            ctx.save();
            ctx.translate(child.shift, 0);
            child.renderer(ctx, di, i, dx + child.shift, dy, group);
            ctx.restore();
        });
        ctx.translate(-dx, -dy);
    }
    renderMeanlines(ctx, ranking, y, height) {
        const cols = ranking.columns.filter((c) => this.showMeanLine(c.column));
        return Promise.all(cols.map((d) => {
            const h = this.histCache.get(d.column.id);
            if (!h) {
                return;
            }
            return Promise.resolve(h).then((stats) => {
                const xPos = ranking.shift + d.shift + d.column.getWidth() * stats.mean;
                if (isNaN(xPos)) {
                    return;
                }
                ctx.strokeStyle = this.style('meanLine');
                ctx.beginPath();
                ctx.moveTo(xPos, y);
                ctx.lineTo(xPos, y + height);
                ctx.stroke();
            });
        }));
    }
    renderGroup(ctx, ranking, group, rows, hists) {
        let dx = ranking.shift;
        const dy = group.y;
        ctx.translate(dx, dy);
        //clip the remaining children
        ctx.save();
        //shift if needs to shifted and then maximal that just the shifted columns are visible
        const frozenLeft = this.currentFreezeLeft < ranking.shift ? 0 : Math.min(this.currentFreezeLeft - ranking.shift, ranking.width - ranking.frozenWidth);
        if (ranking.frozenWidth > 0 && frozenLeft > 0) {
            ctx.rect(dx + frozenLeft + ranking.frozenWidth, 0, ranking.width, group.height);
            ctx.clip();
        }
        ranking.columns.forEach((child) => {
            ctx.save();
            ctx.translate(child.shift, 0);
            child.groupRenderer(ctx, group.group, rows, dx + child.shift, dy, hists.get(child.column.id));
            ctx.restore();
        });
        ctx.restore();
        ctx.translate(frozenLeft, 0);
        dx += frozenLeft;
        ranking.frozen.forEach((child) => {
            ctx.save();
            ctx.translate(child.shift, 0);
            child.groupRenderer(ctx, group.group, rows, dx + child.shift, dy, hists.get(child.column.id));
            ctx.restore();
        });
        ctx.translate(-dx, -dy);
    }
    renderRankings(ctx, data, context) {
        const renderRow = this.renderRow.bind(this, ctx, context);
        const renderGroup = this.renderGroup.bind(this, ctx);
        //asynchronous rendering!!!
        const all = Promise.all.bind(Promise);
        return all(data.map((ranking) => {
            let histMap;
            return all(ranking.groups.map((group) => {
                if (group.aggregate) {
                    if (histMap == null) {
                        histMap = this.resolveHistMap(ranking);
                    }
                    return Promise.all([all(group.data), histMap]).then((data) => {
                        const rows = data[0];
                        const hists = data[1];
                        return renderGroup(ranking, group, rows, hists);
                    });
                }
                const toRender = group.data;
                return all(toRender.map((p, i) => {
                    // TODO render loading row
                    return Promise.resolve(p).then((di) => renderRow(ranking, di, i, group));
                })).then(() => this.renderMeanlines(ctx, ranking, group.y, group.height));
            }));
        }));
    }
    renderSlopeGraphs(ctx, data, context) {
        const slopes = data.slice(1).map((d, i) => ({
            left: data[i].groups[0].order,
            left_i: i,
            right: d.groups[0].order,
            right_i: i + 1
        }));
        ctx.save();
        ctx.strokeStyle = this.style('slope');
        slopes.forEach((slope, i) => {
            ctx.save();
            ctx.translate(data[i + 1].shift - this.options.slopeWidth, 0);
            const cache = new Map();
            slope.right.forEach((dataIndex, pos) => {
                cache.set(dataIndex, pos);
            });
            const lines = slope.left.map((dataIndex, pos) => ({
                dataIndex,
                lpos: pos,
                rpos: cache.get(dataIndex)
            })).filter((d) => d.rpos != null);
            lines.forEach((line) => {
                const isSelected = this.data.isSelected(line.dataIndex);
                const isHovered = this.isHovered(line.dataIndex);
                if (isSelected) {
                    ctx.strokeStyle = this.style('selection');
                }
                else if (isHovered) {
                    ctx.strokeStyle = this.style('hover');
                }
                ctx.beginPath();
                ctx.moveTo(0, context.rowHeight(line.lpos) * 0.5 + context.cellY(line.lpos));
                ctx.lineTo(this.options.slopeWidth, context.rowHeight(line.rpos) * 0.5 + context.cellY(line.rpos));
                ctx.stroke();
                if (isSelected || isHovered) {
                    ctx.strokeStyle = this.style('slope');
                }
            });
            ctx.restore();
        });
        ctx.restore();
    }
    createContextImpl(indexShift, totalNumberOfRows) {
        const base = this.createContext(indexShift, totalNumberOfRows, __WEBPACK_IMPORTED_MODULE_3__renderer_index__["createCanvas"], __WEBPACK_IMPORTED_MODULE_3__renderer_index__["createCanvasGroup"]);
        base.hovered = this.isHovered.bind(this);
        base.groupHovered = () => false; // TODO support grouping hovering
        base.selected = (dataIndex) => this.data.isSelected(dataIndex);
        base.bodyDOMElement = this.$node.node();
        base.rowHeight = () => this.options.rowHeight;
        base.groupHeight = () => this.options.groupHeight;
        base.colWidth = (col) => col.getWidth();
        return base;
    }
    computeShifts(data) {
        const r = [];
        data.forEach((d) => {
            const base = d.shift;
            r.push(...d.frozen.map((c) => ({ column: c.column, shift: c.shift + base + this.currentFreezeLeft })));
            r.push(...d.columns.map((c) => ({ column: c.column, shift: c.shift + base })));
        });
        return r;
    }
    updateImpl(data, context, width, height) {
        const $canvas = this.$node.select('canvas');
        const firstLine = Math.max(context.cellY(0) - 20, 0); //where to start
        const lastLine = Math.min(Math.max(...data.map((d) => d.height)) + 20, height);
        this.$node.style({
            width: `${Math.max(0, width)}px`,
            height: `${height}px`
        });
        $canvas.attr({
            width: Math.max(0, width),
            height: lastLine - firstLine
        }).style('margin-top', `${firstLine}px`);
        this.lastShifts = this.computeShifts(data);
        const ctx = $canvas.node().getContext('2d');
        ctx.save();
        ctx.font = this.style('font');
        ctx.textBaseline = 'top';
        ctx.fillStyle = this.style('text');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //hacky to set to since I'm creating the context, okish
        context.textHints = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* createTextHints */])(ctx, this.style('font'));
        ctx.translate(0, -firstLine);
        this.renderSlopeGraphs(ctx, data, context);
        return this.renderRankings(ctx, data, context).then(() => {
            ctx.restore();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BodyCanvasRenderer;

BodyCanvasRenderer.CUSTOM_OPTIONS = {
    style: {
        text: 'black',
        font: '10pt "Helvetica Neue", Helvetica, Arial, sans-serif',
        slope: 'darkgray',
        link: 'blue',
        selection: '#ffa500',
        hover: '#e5e5e5',
        bg: '#f7f7f7',
        meanLine: 'darkgray',
        histogram: 'lightgray',
        boxplot: {
            box: '#e0e0e0',
            stroke: 'black',
            sortIndicator: '#ffa500'
        },
        upset: {
            circle: 'black',
            inactiveOpacity: 0.1,
            stroke: 'black'
        }
    }
};


/***/ }),
/* 135 */,
/* 136 */,
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createLocalStorage"] = createLocalStorage;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__renderer_index__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lineup__ = __webpack_require__(69);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deriveColors", function() { return __WEBPACK_IMPORTED_MODULE_5__lineup__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deriveColumnDescriptions", function() { return __WEBPACK_IMPORTED_MODULE_2__provider__["deriveColumnDescriptions"]; });
/**
 * main module of LineUp.js containing the main class and exposes all other modules
 * Created by Samuel Gratzl on 14.08.2015.
 */








/**
 * access to the model module
 */
const model = __WEBPACK_IMPORTED_MODULE_1__model__;
/* harmony export (immutable) */ __webpack_exports__["model"] = model;

/**
 * access to the provider module
 */
const provider = __WEBPACK_IMPORTED_MODULE_2__provider__;
/* harmony export (immutable) */ __webpack_exports__["provider"] = provider;

/**
 * access to the renderer module
 */
const renderer = __WEBPACK_IMPORTED_MODULE_3__renderer_index__;
/* harmony export (immutable) */ __webpack_exports__["renderer"] = renderer;

/**
 * access to the ui module
 */
const ui = __WEBPACK_IMPORTED_MODULE_4__ui__;
/* harmony export (immutable) */ __webpack_exports__["ui"] = ui;

/**
 * creates a local storage provider
 * @param data
 * @param columns
 * @param options
 * @returns {LocalDataProvider}
 */
function createLocalStorage(data, columns, options = {}) {
    return new __WEBPACK_IMPORTED_MODULE_2__provider__["LocalDataProvider"](data, columns, options);
}
function create(data, container, config = {}) {
    return new __WEBPACK_IMPORTED_MODULE_5__lineup__["a" /* default */](container, data, config);
}


/***/ }),
/* 138 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HeaderRenderer__ = __webpack_require__(65);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderRenderer", function() { return __WEBPACK_IMPORTED_MODULE_0__HeaderRenderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PoolRenderer__ = __webpack_require__(66);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PoolRenderer", function() { return __WEBPACK_IMPORTED_MODULE_1__PoolRenderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__factory__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createRenderer", function() { return __WEBPACK_IMPORTED_MODULE_2__factory__["a"]; });
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */





/***/ })
/******/ ]);
});
//# sourceMappingURL=LineUpJS.js.map