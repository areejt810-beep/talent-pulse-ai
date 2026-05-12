import { r as reactExports, j as jsxRuntimeExports, c as cn, a as LoadingSpinner, L as Link, E as ExternalBlob } from "./index-DauUnvke.js";
import { b as useListResumes, d as useDeleteResume, e as useSetActiveResume, P as ProtectedRoute, L as Layout, F as FileText, B as Brain, f as useUploadResume } from "./ProtectedRoute-ZnmF4YYk.js";
import { c as createLucideIcon, u as useComposedRefs, a as Button, B as Badge, b as ue } from "./sparkles-CUW_-72z.js";
import { u as useControllableState, a as useId, P as Primitive, c as composeEventHandlers, b as createContextScope, d as createSlot, e as createContext2 } from "./index-Di3XlykX.js";
import { P as Portal$1, h as hideOthers, R as ReactRemoveScroll, u as useFocusGuards, F as FocusScope, D as DismissableLayer, X, L as Label } from "./label-BtlO_UF3.js";
import { P as Presence } from "./index-Bk2FDhxj.js";
import { I as Input } from "./input-DNv_hJZp.js";
import { C as Clock, P as Progress } from "./progress-BdtUtNsb.js";
import { U as Upload, S as Star } from "./upload-BnBw4tj3.js";
import { C as CircleCheck } from "./circle-check-CAXEPSz5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43", key: "16m0ql" }],
  ["path", { d: "M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91", key: "1vt8nq" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
];
const StarOff = createLucideIcon("star-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription$1.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const SAMPLE_RESUMES = [
  {
    id: BigInt(1),
    filename: "senior-frontend-engineer.pdf",
    fileKey: "key_001",
    tag: "Engineering",
    isActive: true,
    uploadedAt: BigInt(Date.now() - 864e5 * 3)
  },
  {
    id: BigInt(2),
    filename: "fullstack-developer-2024.pdf",
    fileKey: "key_002",
    tag: "Full Stack",
    isActive: false,
    uploadedAt: BigInt(Date.now() - 864e5 * 7)
  }
];
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function UploadDialog({
  open,
  onClose
}) {
  const uploadMutation = useUploadResume();
  const [file, setFile] = reactExports.useState(null);
  const [tag, setTag] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState(0);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const reset = () => {
    setFile(null);
    setTag("");
    setProgress(0);
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  const acceptFile = (f) => {
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      ue.error("Only PDF files are supported");
      return;
    }
    setFile(f);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) acceptFile(dropped);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleFileChange = (e) => {
    var _a;
    const picked = (_a = e.target.files) == null ? void 0 : _a[0];
    if (picked) acceptFile(picked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setProgress(pct);
    });
    uploadMutation.mutate(
      {
        filename: file.name,
        fileKey: blob,
        tag: tag || "General"
      },
      {
        onSuccess: () => {
          ue.success("Resume uploaded successfully");
          handleClose();
        },
        onError: () => ue.error("Upload failed — please try again")
      }
    );
  };
  const isPending = uploadMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-md bg-card border-border",
      "data-ocid": "resumes.upload_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: "Upload Resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-muted-foreground", children: "Upload a PDF resume. Add a version tag to stay organized." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "aria-label": "Drop PDF here or click to browse",
              "data-ocid": "resumes.dropzone",
              className: `relative w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-smooth ${isDragging ? "border-primary bg-primary/10" : file ? "border-accent bg-accent/5" : "border-border hover:border-primary/60 hover:bg-muted/30"}`,
              onDrop: handleDrop,
              onDragOver: handleDragOver,
              onDragLeave: handleDragLeave,
              onClick: () => {
                var _a;
                return !file && ((_a = fileInputRef.current) == null ? void 0 : _a.click());
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: ".pdf",
                    className: "hidden",
                    onChange: handleFileChange,
                    "data-ocid": "resumes.file_input"
                  }
                ),
                file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-accent shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: file.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      (file.size / 1024).toFixed(1),
                      " KB"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Remove file",
                      "data-ocid": "resumes.remove_file_button",
                      className: "ml-auto text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer",
                      onClick: (e) => {
                        e.stopPropagation();
                        setFile(null);
                        setProgress(0);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "Drag & drop your PDF here" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "or",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary underline underline-offset-2", children: "browse files" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: "Supports: PDF only" })
                ] })
              ]
            }
          ),
          isPending && progress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-1.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "version-tag", className: "text-sm text-foreground", children: "Version Tag" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "version-tag",
                placeholder: "e.g. Engineering, SWE-2024, General",
                value: tag,
                onChange: (e) => setTag(e.target.value),
                "data-ocid": "resumes.tag_input",
                className: "bg-background border-input text-foreground placeholder:text-muted-foreground/60"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Label this version to tell resumes apart." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: handleClose,
                disabled: isPending,
                "data-ocid": "resumes.upload.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: !file || isPending,
                "data-ocid": "resumes.upload.submit_button",
                className: "gap-2",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { className: "h-3.5 w-3.5" }),
                  "Uploading…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                  "Upload Resume"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function DeleteDialog({
  resumeId,
  filename,
  onClose,
  onConfirm,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!resumeId, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-sm bg-card border-border",
      "data-ocid": "resumes.delete_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: "Delete Resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-muted-foreground", children: [
            "Are you sure you want to delete",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: filename }),
            "? This action cannot be undone."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onClose,
              disabled: isPending,
              "data-ocid": "resumes.delete.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "destructive",
              onClick: onConfirm,
              disabled: isPending,
              "data-ocid": "resumes.delete.confirm_button",
              className: "gap-2",
              children: [
                isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                "Delete"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function ResumeRow({
  resume,
  index,
  onDeleteRequest,
  onSetActive
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `resumes.item.${index}`,
      className: `flex items-center gap-3 px-4 py-3 rounded-lg border transition-smooth ${resume.isActive ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20" : "border-border bg-card hover:bg-muted/20"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex items-center justify-center w-9 h-9 rounded-md shrink-0 ${resume.isActive ? "bg-accent/15" : "bg-muted"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileText,
              {
                className: `h-4.5 w-4.5 ${resume.isActive ? "text-accent" : "text-muted-foreground"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: resume.filename }),
            resume.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] px-1.5 py-0 h-4 bg-accent/20 text-accent border border-accent/40 shrink-0", children: "★ Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mt-0.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs h-4 px-1.5 py-0", children: resume.tag || "General" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: formatDate(resume.uploadedAt) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              asChild: true,
              "data-ocid": `resumes.view.button.${index}`,
              className: "h-8 w-8 p-0 text-muted-foreground hover:text-primary",
              "aria-label": "View resume details",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analysis", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              asChild: true,
              "data-ocid": `resumes.analyze.button.${index}`,
              className: "h-8 w-8 p-0 text-muted-foreground hover:text-chart-1",
              "aria-label": "Analyze resume",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analysis", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }) })
            }
          ),
          resume.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-8 w-8 p-0 text-accent",
              "aria-label": "Currently active resume",
              disabled: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-current" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "data-ocid": `resumes.set_active.button.${index}`,
              onClick: () => onSetActive(resume.id),
              "aria-label": "Set as active resume",
              className: "h-8 w-8 p-0 text-muted-foreground hover:text-accent",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarOff, { className: "h-3.5 w-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "data-ocid": `resumes.delete_button.${index}`,
              onClick: () => onDeleteRequest(resume.id, resume.filename),
              "aria-label": "Delete resume",
              className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function ResumesPage() {
  const { data: resumes, isLoading } = useListResumes();
  const deleteMutation = useDeleteResume();
  const setActiveMutation = useSetActiveResume();
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const displayResumes = resumes && resumes.length > 0 ? resumes : SAMPLE_RESUMES;
  const activeResume = displayResumes.find((r) => r.isActive);
  const handleDeleteRequest = (id, filename) => {
    setDeleteTarget({ id, filename });
  };
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        ue.success("Resume deleted");
        setDeleteTarget(null);
      },
      onError: () => ue.error("Failed to delete resume")
    });
  };
  const handleSetActive = (id) => {
    setActiveMutation.mutate(id, {
      onSuccess: () => ue.success("Active resume updated"),
      onError: () => ue.error("Failed to update active resume")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-4xl", "data-ocid": "resumes.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Resumes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Upload, manage, and analyze your resumes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "resumes.upload_button",
            className: "gap-2 shrink-0",
            onClick: () => setShowUpload(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
              "Upload Resume"
            ]
          }
        )
      ] }),
      activeResume && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg border border-accent/30 bg-accent/8 p-4 flex items-center gap-3",
          "data-ocid": "resumes.active_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-accent shrink-0 fill-current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-accent", children: "Active Resume" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate font-medium", children: activeResume.filename })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/20 text-accent border border-accent/40 text-xs shrink-0", children: activeResume.tag || "General" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-3 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-chart-3 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
          "Mark one resume as",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Active" }),
          " — it will be used for AI analysis and job matching. Only PDF files are supported."
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : displayResumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onUpload: () => setShowUpload(true) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", "data-ocid": "resumes.list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          displayResumes.length,
          " ",
          displayResumes.length === 1 ? "resume" : "resumes"
        ] }) }),
        displayResumes.map((resume, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResumeRow,
          {
            resume,
            index: i + 1,
            onDeleteRequest: handleDeleteRequest,
            onSetActive: handleSetActive
          },
          resume.id.toString()
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UploadDialog, { open: showUpload, onClose: () => setShowUpload(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteDialog,
      {
        resumeId: (deleteTarget == null ? void 0 : deleteTarget.id) ?? null,
        filename: (deleteTarget == null ? void 0 : deleteTarget.filename) ?? "",
        onClose: () => setDeleteTarget(null),
        onConfirm: handleDeleteConfirm,
        isPending: deleteMutation.isPending
      }
    )
  ] }) });
}
function EmptyState({ onUpload }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "resumes.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: "No resumes yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed", children: "Upload your first resume to start getting AI-powered analysis and personalized job matches." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "resumes.empty.upload_button",
            className: "gap-2",
            onClick: onUpload,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
              "Upload your first resume"
            ]
          }
        )
      ]
    }
  );
}
export {
  ResumesPage as default
};
