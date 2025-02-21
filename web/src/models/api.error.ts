
export interface ApiError {
    readonly statusCode: number;
    readonly error: string;
    readonly message: string;
}

export function isApiError(e: any) : e is ApiError {
    return !!e && typeof e === "object" && "statusCode" in e && "error" in e;
}