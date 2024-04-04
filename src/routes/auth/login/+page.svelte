<script lang="ts">
	import Icon from '@iconify/svelte';
    import { login } from '$lib/auth';
    import { ConicGradient, ProgressRadial, focusTrap, getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { errorToast, successToast } from '$lib/toast';
    
    const toastStore = getToastStore();

    let username: string
    let password: string

    let loading: boolean = false

    function onLogin(){
        loading = true
        login(username, password)
        .then(() => {
            toastStore.trigger(successToast("Logged into AnoAsked."))
            goto("/app")
        })
        .catch(err => toastStore.trigger(errorToast(err)))
        .finally(() => loading = false)
    }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Bei <span class="h1 pixeled text-primary-500">AnoAsked</span> anmelden</h2>
		<form use:focusTrap={true} class="space-y-6" on:submit|preventDefault={onLogin}>
            <div class="flex flex-col justify-center space-y-2 w-80">
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input type="text" placeholder="Benutzername eingeben..." bind:value={username} disabled={loading}/>
                    <div><Icon icon="mdi:user" class="w-6 h-6" /></div>
                </div>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input type="password" placeholder="Passwort eingeben..." bind:value={password} disabled={loading}/>
                    <div><Icon icon="mdi:password" class="w-6 h-6" /></div>
                </div>
            </div>
            <button type="submit" class="btn btn-md variant-ghost-success" disabled={loading}>
                {#if loading}
                    <ProgressRadial value={undefined} class="w-6 h-6"/>
                {:else}
                    <Icon icon="mdi:login" class="w-6 h-6" />
                {/if}
                <span>Anmelden</span>
            </button>
        </form>
        <div class="flex justify-center items-center space-x-2">
            <a class="btn btn-md variant-ghost-surface w-min" href="/auth">
                <Icon icon="mdi:arrow-back" class="w-6 h-6" />
                <span>Zurück</span>
            </a>
            <a type="button" class="btn btn-md variant-ghost" href="/auth/register">
                <Icon icon="mdi:register" class="w-6 h-6" />
                <span>Registrieren</span>
            </a>
        </div>
	</div>
</div>