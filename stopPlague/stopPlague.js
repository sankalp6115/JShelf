// content-guard.js

function logMessage() {
  console.info("%c[ContentGuard] Basic content protection active", "color: green;");
}

// Helper to add/remove listeners cleanly
function bindListener(target, event, handler) {
  target.addEventListener(event, handler);
  return () => target.removeEventListener(event, handler);
}

// 🚫 Block Ctrl + key
export function stopCtrlKey(keys = []) {
  const handler = (e) => {
    if (e.ctrlKey && keys.includes(e.key.toLowerCase())) {
      e.preventDefault();
      console.warn(`[ContentGuard] Ctrl+${e.key.toUpperCase()} blocked`);
    }
  };
  return bindListener(document, "keydown", handler);
}

// 🚫 Block Ctrl + Shift + key
export function stopCtrlShiftKey(keys = []) {
  const handler = (e) => {
    if (e.ctrlKey && e.shiftKey && keys.includes(e.key.toLowerCase())) {
      e.preventDefault();
      console.warn(`[ContentGuard] Ctrl+Shift+${e.key.toUpperCase()} blocked`);
    }
  };
  return bindListener(document, "keydown", handler);
}

// 🚫 Block copy, replace clipboard content
export function stopCopy(replaceText = "") {
  const handler = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      navigator.clipboard.writeText(replaceText).catch(() => {});
      console.warn(`[ContentGuard] Copy attempt replaced with custom text`);
    }
  };
  return bindListener(document, "keydown", handler);
}

// 🚫 Block right-click
export function stopRightClick(showMessage = false) {
  const handler = (e) => {
    e.preventDefault();
    if (showMessage) alert("Right-click is disabled on this site.");
  };
  return bindListener(document, "contextmenu", handler);
}

// 🚫 Block F12 (DevTools)
export function stopF12() {
  const handler = (e) => {
    if (e.key === "F12") {
      e.preventDefault();
      console.warn("[ContentGuard] F12 blocked");
    }
  };
  return bindListener(document, "keydown", handler);
}

// 🚫 Disable text selection except for inputs/textareas
export function disableTextSelect() {
  const elements = document.querySelectorAll("body *");
  const excluded = ["input", "textarea", "button", "form"];

  elements.forEach((el) => {
    if (excluded.includes(el.tagName.toLowerCase())) {
      el.style.userSelect = "auto";
    } else {
      el.style.userSelect = "none";
    }
  });
}

export function initContentGuard(options = {}) {
  logMessage();
  const unbinders = [];

  if (options.ctrlKeys) unbinders.push(stopCtrlKey(options.ctrlKeys));
  if (options.ctrlShiftKeys) unbinders.push(stopCtrlShiftKey(options.ctrlShiftKeys));
  if (options.replaceCopyText) unbinders.push(stopCopy(options.replaceCopyText));
  if (options.blockRightClick) unbinders.push(stopRightClick(options.showRightClickMsg));
  if (options.blockF12) unbinders.push(stopF12());
  if (options.disableTextSelect) disableTextSelect();

  return () => unbinders.forEach((unbind) => unbind()); // cleanup function
}
