<script lang="ts">
	import Icon from '@iconify/svelte';
    import { login, register } from '$lib/auth';
    import { focusTrap, getToastStore, ProgressRadial, type ToastSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { errorToast, successToast } from '$lib/toast';
    
    const toastStore = getToastStore();

    let username: string
    let password: string
    let redoPassword: string

    let loading: boolean = false

    function onRegister(){

        if(password !== redoPassword){
            toastStore.trigger(errorToast("The passwords have to be the identical."))
            return false;
        }

        loading = true
        register(username, password)
        .then(() => {
            login(username, password)
            .then(() => {
                toastStore.trigger(successToast("Registered and logged into AnoAsked."))
                goto("/app")
            })
            .catch(err => {
                toastStore.trigger(successToast("Registered with AnoAsked."))
                toastStore.trigger(errorToast(err))
                goto("/auth")
            })
            goto("/app")
        })
        .catch(err => toastStore.trigger(errorToast(err)))
        .finally(() => loading = false)
    }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Bei <span class="h1 pixeled text-primary-500">AnoAsked</span> registrieren</h2>
        <form use:focusTrap={true} class="space-y-6" on:submit|preventDefault={onRegister}>
            <div class="flex flex-col justify-center space-y-2 w-80">
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input type="text" placeholder="Benutzername definieren..." bind:value={username} disabled={loading}/>
                    <div><Icon icon="mdi:user" class="w-6 h-6" /></div>
                </div>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input type="password" placeholder="Passwort definieren..." bind:value={password} disabled={loading}/>
                    <div><Icon icon="mdi:password" class="w-6 h-6" /></div>
                </div>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input type="password" placeholder="Passwort wiederholen..." bind:value={redoPassword} disabled={loading}/>
                    <div><Icon icon="mdi:reload" class="w-6 h-6" /></div>
                </div>
            </div>
            <button type="submit" class="btn btn-md variant-ghost-success" disabled={loading}>
                {#if loading}
                    <ProgressRadial value={undefined} class="w-6 h-6"/>
                {:else}
                    <Icon icon="mdi:register" class="w-6 h-6" />
                {/if}
                <span>Registrieren</span>
            </button>
        </form>
        <div class="flex justify-center items-center space-x-2">
            <a class="btn btn-md variant-ghost-surface w-min" href="/auth">
                <Icon icon="mdi:arrow-back" class="w-6 h-6" />
                <span>Zurück</span>
            </a>
            <a type="button" class="btn btn-md variant-ghost" href="/auth/login">
                <Icon icon="mdi:login" class="w-6 h-6" />
                <span>Anmelden</span>
            </a>
        </div>
	</div>
</div>