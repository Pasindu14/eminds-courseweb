class ResponseHandler<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;

    constructor() {
        this.success = true;
        this.message = "";
    }

    setSuccess(message: string, data?: T) {
        this.success = true;
        this.message = message;
        if (data) this.data = data;

        return {
            success: this.success,
            message: this.message,
            data: this.data,
        };
    }

    setError(message: string, error?: any) {
        this.success = false;
        this.message = message;
        if (error) this.error = error;

        return {
            success: this.success,
            message: this.message,
            error: this.error,
        };
    }
}


export default ResponseHandler;