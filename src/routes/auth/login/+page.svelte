<script lang="ts">
	import Icon from '@iconify/svelte';
    import { login } from '$lib/auth';
    import { ProgressRadial, focusTrap, getToastStore } from '@skeletonlabs/skeleton';
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
            goto("/app/r/home", {replaceState: true})
        })
        .catch(() => toastStore.trigger(errorToast("An error occurred while trying to login.")))
        .finally(() => loading = false)
    }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Login to <span class="h1 pixeled text-primary-500">AnoAsked</span></h2>
		<form use:focusTrap={true} class="space-y-6" on:submit|preventDefault={onLogin}>
            <div class="flex flex-col justify-center space-y-2 w-80">
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input type="text" placeholder="Enter username..." bind:value={username} disabled={loading}/>
                    <div><Icon icon="mdi:user" class="w-6 h-6" /></div>
                </div>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                    <input type="password" placeholder="Enter password..." bind:value={password} disabled={loading}/>
                    <div><Icon icon="mdi:password" class="w-6 h-6" /></div>
                </div>
            </div>
            <button type="submit" class="btn btn-md variant-ghost-success" disabled={loading}>
                {#if loading}
                    <ProgressRadial value={undefined} class="w-6 h-6"/>
                {:else}
                    <Icon icon="mdi:login" class="w-6 h-6" />
                {/if}
                <span>Login</span>
            </button>
        </form>
        <div class="flex justify-center items-center space-x-2">
            <a class="btn btn-md variant-ghost-surface w-min" href="/auth">
                <Icon icon="mdi:arrow-back" class="w-6 h-6" />
                <span>Back</span>
            </a>
            <a type="button" class="btn btn-md variant-ghost" href="/auth/register">
                <Icon icon="mdi:register" class="w-6 h-6" />
                <span>Register</span>
            </a>
        </div>
	</div>
</div>