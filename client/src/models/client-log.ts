export interface ClientLog {
    level: "debug" | "info" | "warn" | "error";
    message: string;
    stack?: string;
}
