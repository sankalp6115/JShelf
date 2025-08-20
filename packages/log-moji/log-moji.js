const config = {
  emojis: {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warn: "⚠️",
    debug: "🐛",
    group: "📂"
  },
  colors: {
    success: "color: green; font-weight: bold;",
    error: "color: red; font-weight: bold;",
    info: "color: blue;",
    warn: "color: orange;",
    debug: "color: purple;"
  },
  showTimestamp: true,
  showStack: false
};

const getTime = () => {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}:${ms}`;
};

const getStack = () => {
  const err = new Error();
  return err.stack?.split("\n")[3]?.trim() || "";
};

export const log = {
  success(...args) {
    console.log(
      `%c${config.emojis.success} ${config.showTimestamp ? `[${getTime()}]` : ""}`,
      config.colors.success,
      ...args,
      config.showStack ? `(${getStack()})` : ""
    );
  },
  error(...args) {
    console.error(
      `%c${config.emojis.error} ${config.showTimestamp ? `[${getTime()}]` : ""}`,
      config.colors.error,
      ...args,
      config.showStack ? `(${getStack()})` : ""
    );
  },
  info(...args) {
    console.info(
      `%c${config.emojis.info} ${config.showTimestamp ? `[${getTime()}]` : ""}`,
      config.colors.info,
      ...args,
      config.showStack ? `(${getStack()})` : ""
    );
  },
  warn(...args) {
    console.warn(
      `%c${config.emojis.warn} ${config.showTimestamp ? `[${getTime()}]` : ""}`,
      config.colors.warn,
      ...args,
      config.showStack ? `(${getStack()})` : ""
    );
  },
  debug(...args) {
    console.debug(
      `%c${config.emojis.debug} ${config.showTimestamp ? `[${getTime()}]` : ""}`,
      config.colors.debug,
      ...args,
      config.showStack ? `(${getStack()})` : ""
    );
  },
  group(label) {
    console.group(`${config.emojis.group} ${label}`);
  },
  groupEnd() {
    console.groupEnd();
  }
};
