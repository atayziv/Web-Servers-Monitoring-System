import { ClientLog } from "../models/client-log";
import { HttpClient } from "./http-client";

export class Logger {
    public static debug(message: string, stack?: string): void {
        Logger.sendLog("debug", message, stack);
    }

    public static info(message: string, stack?: string): void {
        Logger.sendLog("info", message, stack);
    }

    public static warn(message: string, stack?: string): void {
        Logger.sendLog("warn", message, stack);
    }

    public static error(message: string, stack?: string): void {
        Logger.sendLog("error", message, stack);
    }

    private static sendLog(level: ClientLog["level"], message: string, stack?: string): void {
        const clientLog: ClientLog = { level, message, stack };
        HttpClient.sendLogToServer(clientLog);
    }
}
