import { Toaster, toast } from 'sonner'

export const toastSuccess = (message: string) => {
    toast.success(message, { position: "top-right" });
}


export const toastError = (message: string) => {
    toast.error(message, { position: "top-right" });
}