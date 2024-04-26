import { Toaster, toast } from 'sonner'

export const toastSuccess = (message: string) => {
    toast.success(message, { position: 'bottom-right' });
}


export const toastError = (message: string) => {
    toast.error(message, { position: 'bottom-right' });
}