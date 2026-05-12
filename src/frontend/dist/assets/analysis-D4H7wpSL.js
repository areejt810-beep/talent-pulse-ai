import { r as reactExports, j as jsxRuntimeExports, c as cn, a as LoadingSpinner, b as useRouter } from "./index-DauUnvke.js";
import { g as useCallbackRef, h as useLayoutEffect2, i as useGetAnalysisHistory, b as useListResumes, j as useAnalyzeResume, k as useGetLatestAnalysis, P as ProtectedRoute, L as Layout, B as Brain, F as FileText, C as ChevronRight } from "./ProtectedRoute-ZnmF4YYk.js";
import { c as createLucideIcon, u as useComposedRefs, a as Button, S as Sparkles, B as Badge, b as ue } from "./sparkles-CUW_-72z.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CaVkMHAg.js";
import { T as TriangleAlert, C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-l78gczC9.js";
import { C as Clock, P as Progress } from "./progress-BdtUtNsb.js";
import { P as Primitive, b as createContextScope, c as composeEventHandlers } from "./index-Di3XlykX.js";
import { P as Presence } from "./index-Bk2FDhxj.js";
import { u as useDirection } from "./index-CthikdS4.js";
import { c as clamp } from "./index-IXOTxK3N.js";
import { Z as Zap } from "./zap-ANKCZ_f_.js";
import { T as TrendingUp } from "./trending-up-CrO9Xe6C.js";
import { C as CircleCheck } from "./circle-check-CAXEPSz5.js";
import { C as ChevronDown } from "./chevron-down-CrIo2e2W.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
const SAMPLE_ANALYSIS = {
  resumeId: BigInt(1),
  overallScore: 87,
  summary: "Strong senior frontend profile with 8+ years React expertise. AI detected 94% alignment with current market demand for TypeScript and modern React patterns. Minor gaps in system design documentation.",
  strengths: [
    "Exceptional React & TypeScript proficiency",
    "Strong performance optimization track record",
    "Open source contributions (2.4k GitHub stars)",
    "Cross-functional team leadership experience"
  ],
  weaknesses: [
    "Limited system design case studies",
    "No explicit mention of CI/CD pipelines",
    "Missing quantified performance improvements"
  ],
  skills: [
    { name: "React", level: "Expert", yearsOfExperience: 8 },
    { name: "TypeScript", level: "Expert", yearsOfExperience: 6 },
    { name: "Node.js", level: "Advanced", yearsOfExperience: 5 },
    { name: "GraphQL", level: "Intermediate", yearsOfExperience: 3 },
    { name: "AWS", level: "Intermediate", yearsOfExperience: 4 },
    { name: "Docker", level: "Beginner", yearsOfExperience: 1 }
  ],
  recommendations: [
    "Add 3-4 system design case studies from past projects",
    "Quantify your performance improvements with metrics",
    "Highlight CI/CD experience in the skills section",
    'Consider adding a dedicated "Impact" section'
  ],
  analyzedAt: BigInt(Date.now() - 36e5)
};
const HISTORY_SAMPLE = [
  {
    ...SAMPLE_ANALYSIS,
    overallScore: 87,
    analyzedAt: BigInt(Date.now() - 36e5),
    label: "v3 — Latest"
  },
  {
    ...SAMPLE_ANALYSIS,
    overallScore: 74,
    analyzedAt: BigInt(Date.now() - 864e5),
    label: "v2"
  },
  {
    ...SAMPLE_ANALYSIS,
    overallScore: 61,
    analyzedAt: BigInt(Date.now() - 1728e5),
    label: "v1"
  }
];
const SKILLS_GAP = [
  {
    skill: "System Design",
    importance: "critical",
    reason: "Required in 89% of senior roles"
  },
  {
    skill: "CI/CD (GitHub Actions)",
    importance: "critical",
    reason: "DevOps integration expected"
  },
  {
    skill: "Kubernetes",
    importance: "important",
    reason: "Cloud-native deployments trend"
  },
  {
    skill: "Testing (Jest / RTL)",
    importance: "important",
    reason: "Quality signal for employers"
  },
  {
    skill: "Micro-frontends",
    importance: "nice-to-have",
    reason: "Emerging architecture pattern"
  },
  {
    skill: "Web Performance APIs",
    importance: "nice-to-have",
    reason: "Differentiates senior candidates"
  }
];
const SUGGESTIONS = [
  {
    id: 1,
    category: "Formatting",
    title: "Improve ATS keyword density",
    description: "Your resume lacks critical keywords that ATS systems scan for in senior frontend roles.",
    before: "Built and maintained web applications using modern technologies.",
    after: "Architected and delivered 5+ React + TypeScript SPAs serving 200k+ monthly users, improving Core Web Vitals by 40%."
  },
  {
    id: 2,
    category: "Structure",
    title: "Add quantified impact metrics",
    description: "Hiring managers and AI screeners weigh quantified achievements 3× more than generic descriptions.",
    before: "Reduced load times significantly in the main product.",
    after: "Reduced initial bundle size by 62% (4.2 MB → 1.6 MB) via code-splitting and tree-shaking, cutting LCP from 4.8s to 1.9s."
  },
  {
    id: 3,
    category: "Keywords",
    title: "Align skills to job description language",
    description: "Recruiters search exact terms. Replace generic labels with industry-standard terminology.",
    before: "Experience with cloud services and container technology.",
    after: "AWS (ECS, Lambda, S3), Docker, Terraform IaC — 3 years production experience."
  },
  {
    id: 4,
    category: "Content",
    title: "Surface open source contributions",
    description: "Your GitHub contributions signal expertise but are not visible in the current resume.",
    before: "Contributed to several open-source projects.",
    after: "Maintainer of react-virtual-list (2.4k ★) — 12 releases, 40+ contributors; merged into Tanstack Virtual roadmap."
  }
];
function AtsGauge({ score }) {
  const r = 52;
  const cx = 64;
  const cy = 64;
  const circumference = 2 * Math.PI * r;
  const arcLen = circumference * 0.75;
  const filled = arcLen * (score / 100);
  const color = score >= 70 ? score >= 85 ? "oklch(var(--accent))" : "oklch(var(--chart-3))" : score >= 50 ? "oklch(var(--chart-4))" : "oklch(var(--destructive))";
  const textColor = score >= 70 ? score >= 85 ? "text-accent" : "text-chart-3" : score >= 50 ? "text-chart-4" : "text-destructive";
  const label = score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Fair" : "Needs Work";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 128 128",
          className: "w-full h-full -rotate-[135deg]",
          "aria-label": `Score: ${score}%`,
          role: "img",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx,
                cy,
                r,
                fill: "none",
                stroke: "oklch(var(--border))",
                strokeWidth: "10",
                strokeDasharray: `${arcLen} ${circumference}`,
                strokeLinecap: "round"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx,
                cy,
                r,
                fill: "none",
                stroke: color,
                strokeWidth: "10",
                strokeDasharray: `${filled} ${circumference}`,
                strokeLinecap: "round",
                style: {
                  transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display text-3xl font-bold leading-none ${textColor}`,
            children: score
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "/100" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-xs font-semibold uppercase tracking-wider ${textColor}`,
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "ATS Score" })
  ] });
}
const importanceMeta = {
  critical: {
    label: "Critical",
    icon: CircleAlert,
    cls: "text-destructive border-destructive/40 bg-destructive/10"
  },
  important: {
    label: "Important",
    icon: TriangleAlert,
    cls: "text-chart-4 border-chart-4/40 bg-chart-4/10"
  },
  "nice-to-have": {
    label: "Nice to Have",
    icon: Info,
    cls: "text-muted-foreground border-border bg-muted/30"
  }
};
function SkillsGapSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "analysis.skills_gap.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3.5 w-3.5 text-destructive" }),
          "Skills Gap"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SKILLS_GAP.map((item, i) => {
          const meta = importanceMeta[item.importance];
          const Icon = meta.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `analysis.skill_gap.item.${i + 1}`,
              className: "flex items-start gap-3 py-2 border-b border-border/50 last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: `h-3.5 w-3.5 mt-0.5 shrink-0 ${meta.cls.split(" ")[0]}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: item.skill }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.reason })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `text-[10px] shrink-0 ${meta.cls}`,
                    children: meta.label
                  }
                )
              ]
            },
            item.skill
          );
        }) }) })
      ]
    }
  );
}
function SuggestionCard({
  s,
  index
}) {
  const [open, setOpen] = reactExports.useState(false);
  const categoryColor = {
    Formatting: "text-primary border-primary/30 bg-primary/10",
    Structure: "text-accent border-accent/30 bg-accent/10",
    Keywords: "text-chart-5 border-chart-5/30 bg-chart-5/10",
    Content: "text-chart-3 border-chart-3/30 bg-chart-3/10"
  };
  const cls = categoryColor[s.category] ?? "text-muted-foreground border-border bg-muted/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `analysis.suggestion.item.${index + 1}`,
        className: "w-full flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-smooth text-left",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 text-accent mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-[10px] ${cls}`, children: s.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: s.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: s.description })
          ] }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 mx-0.5 rounded-lg border border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-destructive/5 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5", children: "Before" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground font-mono leading-relaxed", children: s.before })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-accent/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5", children: "After (AI Suggested)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground font-mono leading-relaxed", children: s.after })
      ] })
    ] }) })
  ] });
}
function HistoryItem({
  analysis,
  index,
  isSelected,
  onClick
}) {
  const date = new Date(Number(analysis.analyzedAt)).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );
  const timeAgo = (() => {
    const diffMs = Date.now() - Number(analysis.analyzedAt);
    const h = Math.floor(diffMs / 36e5);
    const d = Math.floor(diffMs / 864e5);
    if (h < 1) return "just now";
    if (h < 24) return `${h}h ago`;
    return `${d}d ago`;
  })();
  const scoreColor = analysis.overallScore >= 85 ? "text-accent" : analysis.overallScore >= 70 ? "text-chart-3" : analysis.overallScore >= 50 ? "text-chart-4" : "text-destructive";
  const scoreBg = analysis.overallScore >= 85 ? "bg-accent/10 border-accent/30" : analysis.overallScore >= 70 ? "bg-chart-3/10 border-chart-3/30" : analysis.overallScore >= 50 ? "bg-chart-4/10 border-chart-4/30" : "bg-destructive/10 border-destructive/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `analysis.history.item.${index + 1}`,
      className: `w-full flex items-center gap-3 p-2.5 rounded-lg border transition-smooth text-left ${isSelected ? "border-accent/50 bg-accent/5" : "border-border bg-card hover:bg-muted/30"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${scoreBg}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display text-sm font-bold ${scoreColor}`, children: analysis.overallScore })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: timeAgo })
        ] }),
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-accent shrink-0" })
      ]
    }
  );
}
function EmptyState({
  onAnalyze,
  isPending
}) {
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 gap-6",
      "data-ocid": "analysis.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-10 w-10 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-muted-foreground" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground", children: "No Analysis Yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: "Upload your resume and run an AI analysis to get your ATS score, skills gap report, and personalized improvement suggestions." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "gap-2",
              "data-ocid": "analysis.empty.upload_button",
              onClick: () => router.navigate({ to: "/resumes" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                "Upload Resume"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: onAnalyze,
              disabled: isPending,
              className: "gap-2",
              "data-ocid": "analysis.empty.run_button",
              children: [
                isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                "Run AI Analysis"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AnalysisPage() {
  const { data: analyses, isLoading } = useGetAnalysisHistory();
  const { data: resumes } = useListResumes();
  const analyzeMutation = useAnalyzeResume();
  const activeResume = resumes == null ? void 0 : resumes.find((r) => r.isActive);
  const allAnalyses = analyses && analyses.length > 0 ? analyses : HISTORY_SAMPLE;
  const [selectedIdx, setSelectedIdx] = reactExports.useState(0);
  const selectedAnalysis = allAnalyses[selectedIdx] ?? SAMPLE_ANALYSIS;
  useGetLatestAnalysis((activeResume == null ? void 0 : activeResume.id) ?? null);
  const hasRealData = analyses && analyses.length > 0;
  const handleAnalyze = () => {
    if (!activeResume) {
      ue.error("Please set an active resume first");
      return;
    }
    analyzeMutation.mutate(activeResume.id, {
      onSuccess: () => ue.success("Analysis complete! AI insights ready."),
      onError: () => ue.error("Analysis failed. Please try again.")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "analysis.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "AI Analysis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Deep resume insights powered by AI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: handleAnalyze,
          disabled: analyzeMutation.isPending,
          "data-ocid": "analysis.run.primary_button",
          className: "gap-2",
          children: analyzeMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
            "Analyzing..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            "Run Analysis"
          ] })
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : !hasRealData && !analyses ? (
      // True empty state (no data at all, not even sample)
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          onAnalyze: handleAnalyze,
          isPending: analyzeMutation.isPending
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "analysis.history.section",
          className: "flex flex-col gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " History"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[600px] pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: allAnalyses.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              HistoryItem,
              {
                analysis: a,
                index: i,
                isSelected: selectedIdx === i,
                onClick: () => setSelectedIdx(i)
              },
              `${a.resumeId.toString()}-${a.analyzedAt.toString()}`
            )) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-accent/30 bg-accent/5 p-4 flex items-start gap-3",
            "data-ocid": "analysis.ai_banner.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5 text-accent shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "AI-Powered Analysis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: selectedAnalysis.summary })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "shrink-0 text-accent border-accent/40 font-mono text-xs",
                  children: [
                    selectedAnalysis.overallScore,
                    "%"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border",
              "data-ocid": "analysis.score.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "ATS Score" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-4 pb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AtsGauge, { score: selectedAnalysis.overallScore }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full space-y-2", children: [
                    {
                      label: "Skills Match",
                      value: Math.min(
                        100,
                        selectedAnalysis.overallScore + 5
                      )
                    },
                    {
                      label: "Experience",
                      value: Math.min(
                        100,
                        selectedAnalysis.overallScore - 2
                      )
                    },
                    {
                      label: "Presentation",
                      value: Math.max(
                        0,
                        selectedAnalysis.overallScore - 10
                      )
                    }
                  ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground w-24 shrink-0", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value, className: "flex-1 h-1.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-foreground w-8 text-right", children: value })
                  ] }, label)) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border",
              "data-ocid": "analysis.skills.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-accent" }),
                  "Detected Skills"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: selectedAnalysis.skills.map((skill, i) => {
                  const levelStyles = {
                    Expert: "bg-accent/15 text-accent border-accent/30",
                    Advanced: "bg-primary/15 text-primary border-primary/30",
                    Intermediate: "bg-chart-3/15 text-chart-3 border-chart-3/30",
                    Beginner: "bg-muted text-muted-foreground border-border"
                  };
                  const cls = levelStyles[skill.level] ?? "bg-muted text-muted-foreground border-border";
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": `analysis.skill.item.${i + 1}`,
                      className: "flex items-center justify-between py-1.5 border-b border-border/50 last:border-0",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: skill.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                            skill.yearsOfExperience,
                            "y exp"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: `text-[10px] shrink-0 ${cls}`,
                            children: skill.level
                          }
                        )
                      ]
                    },
                    skill.name
                  );
                }) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border",
              "data-ocid": "analysis.recommendations.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-3.5 w-3.5 text-accent" }),
                  "AI Recommendations"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedAnalysis.recommendations.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `analysis.recommendation.item.${i + 1}`,
                    className: "flex items-start gap-2 py-1.5 border-b border-border/50 last:border-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: rec })
                    ]
                  },
                  rec
                )) }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border",
              "data-ocid": "analysis.strengths.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-chart-3" }),
                  "Strengths"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedAnalysis.strengths.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `analysis.strength.item.${i + 1}`,
                    className: "flex items-start gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-chart-3 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: s })
                    ]
                  },
                  s
                )) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border",
              "data-ocid": "analysis.weaknesses.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3.5 w-3.5 text-destructive" }),
                  "Areas to Improve"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedAnalysis.weaknesses.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `analysis.weakness.item.${i + 1}`,
                    className: "flex items-start gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: w })
                    ]
                  },
                  w
                )) }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsGapSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "bg-card border-border",
            "data-ocid": "analysis.suggestions.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5 text-accent" }),
                "Improvement Suggestions",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-auto text-xs", children: [
                  SUGGESTIONS.length,
                  " items"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SUGGESTIONS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SuggestionCard, { s, index: i }, s.id)) }) })
            ]
          }
        )
      ] })
    ] })
  ] }) }) });
}
export {
  AnalysisPage as default
};
