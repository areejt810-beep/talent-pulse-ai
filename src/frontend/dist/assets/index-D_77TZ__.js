import { u as useInternetIdentity, j as jsxRuntimeExports, P as PageLoader, N as Navigate } from "./index-DauUnvke.js";
function IndexPage() {
  const { isAuthenticated, loginStatus } = useInternetIdentity();
  if (loginStatus === "initializing") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Loading Talent Pulse AI..." });
  }
  if (isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
}
export {
  IndexPage as default
};
