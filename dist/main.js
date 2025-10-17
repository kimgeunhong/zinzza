import { createRoot } from "react-dom/client";
import { jsx as _jsx } from "react/jsx-runtime";
import { App } from "./App.js";

const container = document.getElementById("root");
if (!container) {
  throw new Error("루트 엘리먼트를 찾을 수 없습니다.");
}

const root = createRoot(container);
root.render(/*#__PURE__*/ _jsx(App, {}));
