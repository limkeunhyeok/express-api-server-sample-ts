export declare class Response {
    success: boolean;
    response?: any;
    message?: string;
    constructor(success: boolean);
    data(data: any): this;
    error(message: string): this;
    toJson(): {
        success: boolean;
        response: any;
        error: string;
    };
}
