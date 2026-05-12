import { r as reactExports, j as jsxRuntimeExports, c as cn, d as useNavigate, a as LoadingSpinner } from "./index-DauUnvke.js";
import { g as useCallbackRef, c as useGetJobMatches, b as useListResumes, n as useSaveJobMatch, o as useRemoveJobMatch, p as useFindJobMatches, P as ProtectedRoute, L as Layout, T as Target } from "./ProtectedRoute-ZnmF4YYk.js";
import { u as useComposedRefs, a as Button, b as ue, S as Sparkles, B as Badge } from "./sparkles-CUW_-72z.js";
import { C as Card, a as CardContent } from "./card-CaVkMHAg.js";
import { I as Input } from "./input-DNv_hJZp.js";
import { a as useId, P as Primitive, c as composeEventHandlers, b as createContextScope, u as useControllableState } from "./index-Di3XlykX.js";
import { c as createCollection } from "./index-DAVM7C0w.js";
import { u as useDirection } from "./index-CthikdS4.js";
import { P as Presence } from "./index-Bk2FDhxj.js";
import { g as getMatchBg, a as getMatchColor, M as MapPin } from "./types-Di94XbtX.js";
import { S as Search } from "./search-kXbX4np7.js";
import { C as ChevronDown } from "./chevron-down-CrIo2e2W.js";
import { B as Briefcase } from "./briefcase-CSyaap7y.js";
import { C as CalendarDays, B as BookmarkCheck, a as Bookmark } from "./calendar-days-Tz7rVi3X.js";
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const SAMPLE_MATCHES = [
  {
    id: BigInt(1),
    jobTitle: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote",
    relevanceScore: 94,
    description: "Join Stripe's payments infrastructure team. Build world-class React applications powering global commerce. Strong TypeScript and GraphQL experience required.",
    skillBreakdown: [],
    isSaved: true,
    matchedAt: BigInt(Date.now() - 864e5 * 2),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0)
  },
  {
    id: BigInt(2),
    jobTitle: "React Engineer",
    company: "Vercel",
    location: "Remote",
    relevanceScore: 91,
    description: "Shape the future of the web at Vercel. Work on Next.js, our Edge Network, and developer experience tools used by millions.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 864e5),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0)
  },
  {
    id: BigInt(3),
    jobTitle: "Full Stack Developer",
    company: "Linear",
    location: "San Francisco, CA",
    relevanceScore: 88,
    description: "Build the software development tools that engineers love. Work across the full stack in a high-performance team known for exceptional UX.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 864e5 * 3),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0)
  },
  {
    id: BigInt(4),
    jobTitle: "Software Engineer II",
    company: "Figma",
    location: "New York, NY",
    relevanceScore: 76,
    description: "Build collaborative design tools that millions of designers rely on. Focus on performance and real-time collaboration features.",
    skillBreakdown: [],
    isSaved: true,
    matchedAt: BigInt(Date.now() - 864e5 * 4),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0)
  },
  {
    id: BigInt(5),
    jobTitle: "Frontend Lead",
    company: "Notion",
    location: "Remote",
    relevanceScore: 85,
    description: "Lead frontend architecture of Notion's editor and database products. Drive technical vision for a global team building productivity tools.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 864e5 * 5),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0)
  },
  {
    id: BigInt(6),
    jobTitle: "Staff Engineer, Platform",
    company: "Shopify",
    location: "Remote",
    relevanceScore: 62,
    description: "Define the technical direction of Shopify's storefront platform. Partner with product and design to build the next generation of commerce infrastructure.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 864e5 * 7),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0)
  }
];
function formatPostedDate(postedAt) {
  const diffMs = Date.now() - Number(postedAt) / 1e6;
  const diffDays = Math.floor(diffMs / 864e5);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}
function MatchCard({
  match,
  onSave,
  onRemove,
  index,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      "data-ocid": `matches.item.${index}`,
      className: "bg-card border-border transition-smooth cursor-pointer hover:border-accent/50 hover:shadow-md group",
      onClick: () => onClick(match.id),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground group-hover:text-accent transition-colors", children: match.jobTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono font-bold ${getMatchBg(match.relevanceScore)} ${getMatchColor(match.relevanceScore)}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5" }),
                    match.relevanceScore,
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: match.company })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: match.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: formatPostedDate(match.matchedAt) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                match.isSaved ? onRemove(match.id) : onSave(match.id);
              },
              "data-ocid": match.isSaved ? `matches.unsave.button.${index}` : `matches.save.button.${index}`,
              "aria-label": match.isSaved ? "Remove bookmark" : "Save job",
              className: `p-1.5 rounded-md transition-smooth shrink-0 ${match.isSaved ? "text-accent hover:text-accent/70" : "text-muted-foreground hover:text-accent"}`,
              children: match.isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 line-clamp-2", children: match.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mt-3", children: [
          match.skillBreakdown.slice(0, 4).map((sm) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: sm.skill }, sm.skill)),
          match.skillBreakdown.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs text-muted-foreground", children: [
            "+",
            match.skillBreakdown.length - 4
          ] })
        ] })
      ] })
    }
  );
}
function MatchesPage() {
  const { data: matches, isLoading } = useGetJobMatches();
  const { data: resumes } = useListResumes();
  const saveMutation = useSaveJobMatch();
  const removeMutation = useRemoveJobMatch();
  const findMutation = useFindJobMatches();
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [scoreFilter, setScoreFilter] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("relevance");
  const activeResume = resumes == null ? void 0 : resumes.find((r) => r.isActive);
  const displayMatches = matches && matches.length > 0 ? matches : SAMPLE_MATCHES;
  const handleSave = (id) => {
    saveMutation.mutate(id, {
      onSuccess: () => ue.success("Job saved to your list"),
      onError: () => ue.error("Failed to save job")
    });
  };
  const handleRemove = (id) => {
    removeMutation.mutate(id, {
      onSuccess: () => ue.success("Job removed from saved list"),
      onError: () => ue.error("Failed to remove job")
    });
  };
  const handleFindMatches = () => {
    if (!activeResume) {
      ue.error("Please set an active resume first");
      return;
    }
    findMutation.mutate(activeResume.id, {
      onSuccess: () => ue.success("Job matches updated!"),
      onError: () => ue.error("Failed to find matches")
    });
  };
  const handleCardClick = (id) => {
    navigate({ to: "/matches/$matchId", params: { matchId: id.toString() } });
  };
  const scoreThreshold = {
    all: 0,
    "80": 80,
    "70": 70,
    "50": 50
  };
  let filtered = displayMatches.filter((m) => activeTab === "saved" ? m.isSaved : true).filter((m) => m.relevanceScore >= scoreThreshold[scoreFilter]).filter(
    (m) => m.jobTitle.toLowerCase().includes(search.toLowerCase()) || m.company.toLowerCase().includes(search.toLowerCase())
  );
  if (sortBy === "newest") {
    filtered = [...filtered].sort(
      (a, b) => Number(b.matchedAt) - Number(a.matchedAt)
    );
  } else if (sortBy === "salary") {
    filtered = [...filtered].sort(
      (a, b) => b.relevanceScore - a.relevanceScore
    );
  } else {
    filtered = [...filtered].sort(
      (a, b) => b.relevanceScore - a.relevanceScore
    );
  }
  const savedCount = displayMatches.filter((m) => m.isSaved).length;
  const avgScore = displayMatches.length > 0 ? Math.round(
    displayMatches.reduce((acc, m) => acc + m.relevanceScore, 0) / displayMatches.length
  ) : 0;
  const scoreFilterOptions = [
    { value: "all", label: "All Scores" },
    { value: "80", label: "80%+" },
    { value: "70", label: "70%+" },
    { value: "50", label: "50%+" }
  ];
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "newest", label: "Newest" },
    { value: "salary", label: "Salary" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", "data-ocid": "matches.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Job Matches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "AI-curated roles matching your profile" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: handleFindMatches,
          disabled: findMutation.isPending,
          "data-ocid": "matches.find.primary_button",
          className: "gap-2 shrink-0",
          children: findMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
            "Finding..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }),
            "Find Matches"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-foreground", children: displayMatches.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Saved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-accent", children: savedCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Avg Score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-foreground", children: [
          avgScore,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Filtered" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-foreground", children: filtered.length })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => setActiveTab(v),
        "data-ocid": "matches.tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-card border border-border h-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "all",
              "data-ocid": "matches.all.tab",
              className: "text-xs px-4",
              children: [
                "All Matches",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]", children: displayMatches.length })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "saved",
              "data-ocid": "matches.saved.tab",
              className: "text-xs px-4",
              children: [
                "Saved",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]", children: savedCount })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 flex-wrap",
        "data-ocid": "matches.filter.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search by title or company...",
                "data-ocid": "matches.search_input",
                className: "pl-9 bg-card border-border text-sm h-9"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "matches.score_filter.select", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: scoreFilter,
                onChange: (e) => setScoreFilter(e.target.value),
                className: "appearance-none pl-3 pr-8 h-9 rounded-md bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer",
                children: scoreFilterOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "matches.sort.select", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                className: "appearance-none pl-3 pr-8 h-9 rounded-md bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer",
                children: sortOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: opt.value, children: [
                  "Sort: ",
                  opt.label
                ] }, opt.value))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" })
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "matches.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-8 w-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: activeTab === "saved" ? "No saved matches yet" : "No matches found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: activeTab === "saved" ? "Bookmark jobs from the All Matches tab to see them here." : 'Click "Find Matches" above to run AI-powered job matching against your active resume.' }),
          activeTab === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleFindMatches,
              disabled: findMutation.isPending,
              "data-ocid": "matches.empty.find_button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }),
                "Run AI Matching"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "matches.list", children: filtered.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MatchCard,
      {
        match,
        onSave: handleSave,
        onRemove: handleRemove,
        index: i + 1,
        onClick: handleCardClick
      },
      match.id.toString()
    )) })
  ] }) }) });
}
export {
  MatchesPage as default
};
