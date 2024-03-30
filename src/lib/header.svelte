<script lang="ts">
	import { AppBar, Avatar, LightSwitch } from "@skeletonlabs/skeleton";
    import { username, logout } from "$lib/auth";
    import { getToastStore } from '@skeletonlabs/skeleton';
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";
    import { errorToast, successToast } from '$lib/toast';
    
    const toastStore = getToastStore();

    function onLogout(){
        logout()
        .then(() => {
            toastStore.trigger(successToast("Logged out of AnoAsked."))
            goto("/")
        })
        .catch(err => toastStore.trigger(errorToast(err)))
    }
</script>

<!-- App Bar -->
<AppBar>
    <svelte:fragment slot="lead" >
        <a class="flex space-x-2" href="/">
            <img src="/favicon.svg" alt="AnoAsked Logo" class="w-6 h-6" />
            <strong class="text-xl pixeled">AnoAsked</strong>
        </a>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch title="Wechsel heller und dunkler modus."/>
        <a class="btn btn-sm variant-ghost-surface" href="https://github.com/AnoAsked" target="_blank" rel="noreferrer">
            GitHub
        </a>
        {#if $username}
            <Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={$username}" width="w-8" rounded="rounded-full" />
            <button type="button" class="btn btn-sm variant-ghost-surface" on:click={onLogout}>
                <span><Icon icon="mdi:logout" class="w-6 h-6" /></span>
                <span>Logout</span>
            </button>
        {/if}
    </svelte:fragment>
</AppBar>