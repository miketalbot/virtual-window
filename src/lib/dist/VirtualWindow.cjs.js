'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
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
}

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function useObserver(measure) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _measure = React.useCallback(measureFirstItem, [measure].concat(_toConsumableArray(deps)));

  var observer = React.useMemo(function () {
    return new ResizeObserver(_measure);
  }, [_measure].concat(_toConsumableArray(deps)));
  React.useEffect(function () {
    return function () {
      observer.disconnect();
    };
  }, [observer]);
  return observer;

  function measureFirstItem(entries) {
    if (!(entries !== null && entries !== void 0 && entries.length)) return;
    measure(entries[0]);
  }
}

function useMeasurement() {
  var measure = React.useCallback(measureItem, []);
  var observer = useObserver(measure, []);
  var currentTarget = React.useRef(null); // a ref is just a function that is called
  // by React when an element is mounted
  // we use this to create an attach method
  // that immediately observes the size
  // of the reference

  var attach = React.useCallback(function attach(target) {
    if (!target) return;
    currentTarget.current = target;
    observer.observe(target);
  }, [observer]);

  var _useState = React.useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1]; // Return the size, the attach ref and the current
  // element attached to


  return [size, attach, currentTarget.current];

  function measureItem(_ref) {
    var contentRect = _ref.contentRect,
        target = _ref.target;

    if (contentRect.height > 0) {
      updateSize(target, contentRect);
    }
  }

  function updateSize(target, rect) {
    setSize({
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
      element: target
    });
  }
}

var MeasuredContext = /*#__PURE__*/React.createContext({
  sizes: {},
  measuredId: 1,
  total: 0,
  count: 0,
  changed: function changed() {}
});
var EMPTY = {
  height: 0,
  width: 0
};
function Measured(_ref) {
  var children = _ref.children,
      style = _ref.style,
      id = _ref.id;
  var context = React.useContext(MeasuredContext);

  var _useState = React.useState(function () {
    return id === undefined ? context.measureId++ : id;
  }),
      _useState2 = _slicedToArray(_useState, 1),
      measureId = _useState2[0];

  var _useMeasurement = useMeasurement(),
      _useMeasurement2 = _slicedToArray(_useMeasurement, 2),
      size = _useMeasurement2[0],
      attach = _useMeasurement2[1];

  var existing = context.sizes[measureId] || EMPTY;

  if (size.height > 0 && size.height !== existing.height) {
    if (existing === EMPTY) {
      context.count++;
    }

    context.total -= existing.height;
    context.total += size.height;
    context.sizes[measureId] = size;
    context.changed();
  }

  return /*#__PURE__*/React__default.createElement("div", {
    key: measureId,
    style: style,
    ref: attach
  }, children);
}

var debounce = function debounce(fn, delay) {
  var timer = 0;
  return function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      return fn.apply(void 0, params);
    }, delay);
  };
};

function useDebouncedRefresh() {
  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      refresh = _useState2[0],
      setRefresh = _useState2[1]; // eslint-disable-next-line react-hooks/exhaustive-deps


  var changed = React.useCallback(debounce(function () {
    return setRefresh(function (i) {
      return i + 1;
    });
  }), [setRefresh]);
  changed.id = refresh;
  return changed;
}

/*

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

*/
function scope() {
  for (var _len = arguments.length, variables = new Array(_len), _key = 0; _key < _len; _key++) {
    variables[_key] = arguments[_key];
  }

  return function (fn) {
    return fn.apply(void 0, variables);
  };
}

var AVOID_DIVIDE_BY_ZERO = 0.001;
function useScroll(whenScrolled) {
  var observer = useObserver(measure);
  var scrollCallback = React.useRef();
  scrollCallback.current = whenScrolled;
  var requested = React.useRef(false);

  var _useState = React.useState(AVOID_DIVIDE_BY_ZERO),
      _useState2 = _slicedToArray(_useState, 2),
      windowHeight = _useState2[0],
      setWindowHeight = _useState2[1];

  var scroller = React.useRef();
  React.useEffect(configure, [observer]);
  return [scroller, windowHeight, scroller.current];

  function configure() {
    if (!scroller.current) return;
    var observed = scroller.current;
    observer.observe(observed);
    observed.addEventListener("scroll", handleScroll);
    return function () {
      observed.removeEventListener("scroll", handleScroll);
    };

    function handleScroll(event) {
      if (requested.current) return;
      requested.current = true;
      requestAnimationFrame(function () {
        requested.current = false;

        if (scrollCallback.current) {
          scope(event.target)(function (_) {
            scrollCallback.current({
              top: Math.floor(_.scrollTop),
              left: Math.floor(_.scrollLeft),
              height: _.scrollHeight,
              width: _.scrollWidth
            });
          });
        }
      });
    }
  }

  function measure(_ref) {
    var height = _ref.contentRect.height;
    setWindowHeight(height || AVOID_DIVIDE_BY_ZERO);
  }
}

/*

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

*/
var keys = new WeakMap();
var repeatId = 0;
function getKey(item) {
  if (_typeof(item) === "object") {
    var _keys$get;

    var key = (_keys$get = keys.get(item)) !== null && _keys$get !== void 0 ? _keys$get : repeatId++;
    keys.set(item, key);
    return key;
  } else {
    return item;
  }
}

function RenderItem(_ref) {
  var _objectSpread2$1;

  var data = _ref.data,
      top = _ref.top,
      offset = _ref.offset,
      item = _ref.item,
      visible = _ref.visible,
      _ref$keyFn = _ref.keyFn,
      keyFn = _ref$keyFn === void 0 ? getKey : _ref$keyFn,
      _ref$pass = _ref.pass,
      pass = _ref$pass === void 0 ? "item" : _ref$pass,
      index = _ref.index;
  var style = React.useMemo(function () {
    return {
      top: top + offset,
      position: "absolute",
      width: "100%",
      opacity: visible ? 1 : 0
    };
  }, [top, visible, offset]);
  return /*#__PURE__*/React__default.createElement(Measured, {
    id: index,
    style: style
  }, /*#__PURE__*/React__default.createElement(item.type, _extends({
    key: data ? keyFn(data) || index : index
  }, _objectSpread2(_objectSpread2({}, item.props), {}, (_objectSpread2$1 = {}, _defineProperty(_objectSpread2$1, pass, data), _defineProperty(_objectSpread2$1, "index", index), _objectSpread2$1)))));
}

/*

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

*/
function Simple(_ref) {
  var item = _ref.item;
  return item || null;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".virtual-repeat_vr-items__36v0F {\n  height: 0;\n  overflow: visible;\n}\n\n.virtual-repeat_vr-scroll-holder__LtRmX {\n  height: 100%;\n  flex: 1;\n  position: relative;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n";
var css = {"vr-items":"virtual-repeat_vr-items__36v0F","vr-scroll-holder":"virtual-repeat_vr-scroll-holder__LtRmX"};
styleInject(css_248z);

var _excluded = ["children", "list", "totalCount", "itemSize", "className", "item", "onVisibleChanged", "onConfigure", "overscan"],
    _excluded2 = ["windowHeight", "expectedSize", "rendered", "totalCount", "delta", "list", "overscan", "measureContext", "top"];
function VirtualWindow(_ref) {
  var children = _ref.children,
      list = _ref.list,
      _ref$totalCount = _ref.totalCount,
      totalCount = _ref$totalCount === void 0 ? 0 : _ref$totalCount,
      _ref$itemSize = _ref.itemSize,
      itemSize = _ref$itemSize === void 0 ? 36 : _ref$itemSize,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      item = _ref.item,
      _ref$onVisibleChanged = _ref.onVisibleChanged,
      onVisibleChanged = _ref$onVisibleChanged === void 0 ? function () {} : _ref$onVisibleChanged,
      _ref$onConfigure = _ref.onConfigure,
      onConfigure = _ref$onConfigure === void 0 ? function () {} : _ref$onConfigure,
      _ref$overscan = _ref.overscan,
      overscan = _ref$overscan === void 0 ? 2 : _ref$overscan,
      props = _objectWithoutProperties(_ref, _excluded);

  // Configuration Phase
  // Configuration Phase
  children = Array.isArray(children) ? children : children ? [children] : undefined;
  list = list || (children.length > 0 ? children : undefined);
  item = item || /*#__PURE__*/React__default.createElement(Simple, null);

  var _useState = React.useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      _useState2$0$top = _useState2[0].top,
      top = _useState2$0$top === void 0 ? 0 : _useState2$0$top,
      setScrollInfo = _useState2[1];

  var previousTop = React.useRef(0);
  var changed = useDebouncedRefresh();
  var lastRendered = React.useRef([]);

  var _useScroll = useScroll(setScrollInfo),
      _useScroll2 = _slicedToArray(_useScroll, 3),
      scrollMonitor = _useScroll2[0],
      windowHeight = _useScroll2[1],
      scrollingElement = _useScroll2[2];

  var measureContext = React.useMemo(function () {
    return {
      sizes: {},
      changed: changed,
      total: 0,
      count: 0
    };
  }, [changed]);
  totalCount = list ? list.length : totalCount; // Calculation Phase

  var delta = Math.floor(previousTop.current - top);
  previousTop.current = top;
  var expectedSize = Math.floor(measureContext.count > 0 ? measureContext.total / measureContext.count : itemSize); //eslint-disable-next-line react-hooks/exhaustive-deps

  var _useMemo = React.useMemo(render, [top, delta, expectedSize, totalCount, list, measureContext, windowHeight, measureContext.count, item, overscan]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      draw = _useMemo2[0],
      visible = _useMemo2[1];

  var calculatedHeight = Math.floor((totalCount - visible.length) * expectedSize + visible.reduce(function (c, a) {
    return c + a.props.height;
  }, 0)); //eslint-disable-next-line react-hooks/exhaustive-deps

  var totalHeight = React.useMemo(function () {
    return calculatedHeight;
  }, [//eslint-disable-next-line react-hooks/exhaustive-deps
  Math.floor(expectedSize / 4), top]);
  lastRendered.current = visible;
  var last = visible[visible.length - 1];

  if (last && +last.key === totalCount - 1 && totalHeight > windowHeight) {
    if (last.props.top + last.props.height < windowHeight) {
      delta = Math.floor(windowHeight - (last.props.top + last.props.height));

      var _render = render();

      var _render2 = _slicedToArray(_render, 2);

      draw = _render2[0];
      visible = _render2[1];
      lastRendered.current = visible;
    }
  }

  if (visible.length) {
    var first = visible[0];

    if (first.key === 0 && first.props.top > 0) {
      scrollingElement.scrollTop = 0;
    }
  } //Notification Phase


  useVisibilityEvents();
  React.useEffect(function () {
    return onConfigure({
      expectedSize: expectedSize,
      scrollingElement: scrollingElement
    });
  }, [expectedSize, scrollingElement, onConfigure]); // Render Phase

  var style = React.useMemo(function () {
    return {
      height: totalHeight
    };
  }, [totalHeight]);
  return /*#__PURE__*/React__default.createElement(MeasuredContext.Provider, {
    value: measureContext
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: scrollMonitor,
    className: "".concat(className, " ").concat(css["vr-scroll-holder"])
  }, /*#__PURE__*/React__default.createElement("div", {
    style: style
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "".concat(className, " ").concat(css["vr-items"])
  }, draw))));

  function render() {
    return renderItems(_objectSpread2({
      windowHeight: windowHeight,
      expectedSize: expectedSize,
      rendered: lastRendered.current,
      totalCount: totalCount,
      delta: delta,
      list: list,
      measureContext: measureContext,
      top: top,
      item: item,
      overscan: overscan
    }, props));
  }

  function useVisibilityEvents() {
    // Send visibility events
    var firstVisible;
    var lastVisible;

    var _iterator = _createForOfIteratorHelper(visible),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _item = _step.value;

        if (_item.props.top + _item.props.height > 0 && _item.props.top < windowHeight) {
          firstVisible = firstVisible || _item;
          lastVisible = _item;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    React.useEffect(function () {
      return onVisibleChanged(firstVisible, lastVisible);
    }, [firstVisible, lastVisible]);
  }
}

function renderItems(_ref2) {
  var windowHeight = _ref2.windowHeight,
      expectedSize = _ref2.expectedSize,
      rendered = _ref2.rendered,
      totalCount = _ref2.totalCount,
      delta = _ref2.delta,
      list = _ref2.list,
      _ref2$overscan = _ref2.overscan,
      overscan = _ref2$overscan === void 0 ? 2 : _ref2$overscan,
      measureContext = _ref2.measureContext,
      top = _ref2.top,
      props = _objectWithoutProperties(_ref2, _excluded2);

  if (windowHeight < 1) return [[], []];
  var sizes = measureContext.sizes;

  if (!rendered.length || top < expectedSize || Math.abs(delta) > windowHeight * 5) {
    return layoutAll();
  } else {
    return layoutAgain();
  }

  function layoutAll() {
    var topItem = Math.max(0, Math.floor(top / expectedSize));
    return layout(topItem, -(top % expectedSize));
  }

  function layoutAgain() {
    var draw = [];
    var renderedVisible = [];
    var firstVisible = rendered.find(function (f) {
      return f.props.top + delta >= 0;
    });
    if (!firstVisible) return layoutAll();
    var topOfFirstVisible = firstVisible.props.top + delta;

    if (topOfFirstVisible > 0) {

      var _layout = layout(+firstVisible.key - 1, topOfFirstVisible, -1);

      var _layout2 = _slicedToArray(_layout, 2);

      draw = _layout2[0];
      renderedVisible = _layout2[1];
    }

    var _layout3 = layout(+firstVisible.key, topOfFirstVisible),
        _layout4 = _slicedToArray(_layout3, 2),
        existingDraw = _layout4[0],
        exisitingVisible = _layout4[1];

    return [draw.concat(existingDraw), renderedVisible.concat(exisitingVisible)];
  }

  function layout(scan, start) {
    var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var draw = [];
    var renderedVisible = [];
    var adding = true;

    for (; scan >= 0 && start > -windowHeight * overscan && scan < totalCount && start < windowHeight * (1 + overscan); scan += direction) {
      var _sizes$scan;

      var height = (_sizes$scan = sizes[scan]) === null || _sizes$scan === void 0 ? void 0 : _sizes$scan.height;

      if (height === undefined) {
        adding = false;
      }

      if (direction < 0) {
        start += (height || expectedSize) * direction;
      }

      var item = /*#__PURE__*/React__default.createElement(RenderItem, _extends({}, props, {
        visible: adding,
        height: height,
        top: start,
        offset: top,
        key: scan,
        index: scan,
        data: list ? list[scan] : undefined
      }));

      if (direction > 0) {
        start += (height || expectedSize) * direction;
      }

      if (adding) {
        if (direction > 0) {
          renderedVisible.push(item);
        } else {
          renderedVisible.unshift(item);
        }
      }

      draw.push(item);
    }

    return [draw, renderedVisible];
  }
}

exports.Measured = Measured;
exports.MeasuredContext = MeasuredContext;
exports.VirtualWindow = VirtualWindow;
exports.useDebouncedRefresh = useDebouncedRefresh;
exports.useMeasurement = useMeasurement;
exports.useObserver = useObserver;
exports.useScroll = useScroll;
