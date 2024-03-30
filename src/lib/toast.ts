import type { ToastSettings } from "@skeletonlabs/skeleton";

export function errorToast(message:string):ToastSettings {
    return toast(message, "variant-filled-error")
}

export function warningToast(message:string):ToastSettings {
    return toast(message, "variant-filled-warning")
}

export function successToast(message:string):ToastSettings {
    return toast(message, "variant-filled-success")
}

export function toast(message:string, background:string):ToastSettings {
    return {
        message: message,
        background: background,
    } satisfies ToastSettings
}