// Logger.js
/* eslint-disable no-console */
const Logger = {
    debug(message, stack) {
        Logger.sendLog("debug", message, stack);
    },

    info(message, stack) {
        Logger.sendLog("info", message, stack);
    },

    warn(message, stack) {
        Logger.sendLog("warn", message, stack);
    },

    error(message, stack) {
        Logger.sendLog("error", message, stack);
    },

    sendLog(level, message, stack) {
        // Temporarily, write logs only to the browser's console
        switch (level) {
            case "info":
                console.info("INFO Log:", message, "stack trace:", stack);
                break;
            case "warn":
                console.warn("WARN Log:", message, "stack trace:", stack);
                break;
            case "error":
                console.error("ERROR Log:", message, "stack trace:", stack);
                break;
            default:
                console.debug("DEBUG Log:", message, "stack trace:", stack);
                break;
        }
    },
};

export default Logger;
