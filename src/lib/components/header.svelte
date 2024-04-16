<script lang="ts">
	import { AppBar, Avatar, LightSwitch, popup, type PopupSettings } from "@skeletonlabs/skeleton";
    import { username, logout, db } from "$lib/auth";
    import { getToastStore } from '@skeletonlabs/skeleton';
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";
    import { errorToast, successToast } from '$lib/toast';
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from "svelte";

    const modalStore = getModalStore();
    const toastStore = getToastStore();

    let connectedPeerCount = 0;

    function onLogout(){
        toastStore.trigger(successToast("Logging out of AnoAsked."))
        logout()
        .then(() => {
            goto("/")
        })
        .catch(err => toastStore.trigger(errorToast(err)))
    }

    function onSettings(){
        const modal: ModalSettings = {
            title: 'User settings',
            body: 'This data is saved encrypted.',
            type: 'component',
            component: 'settingsModal',
        };
        modalStore.trigger(modal);
    }

    function onDeleteLocal(){
        alert("not implemented")
    }

    const userPopup: PopupSettings = {
        event: 'click',
        target: 'userPopup',
        placement: 'bottom-end',
    };

    onMount(() => {
        const opt_peers = db.back('opt.peers'); // get peers, as configured in the setup
        connectedPeerCount = 0
        let peer: any;
        for (peer of Object.values(opt_peers)) {
            if (peer && peer.wire && peer.wire.readyState === 1 && peer.wire.OPEN === 1 && peer.wire.constructor.name === 'WebSocket') {
                connectedPeerCount++;
            }
        }
        console.log(Object.values(opt_peers))
    })
</script>

<!-- App Bar -->
<AppBar>
    <svelte:fragment slot="lead" >
        <a class="flex space-x-2 hover:text-primary-500" href="/">
            <img src="/favicon.svg" alt="AnoAsked Logo" class="w-6 h-6" />
            <strong class="text-xl pixeled">AnoAsked</strong>
        </a>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <a class="btn btn-sm variant-ghost-surface" href="https://github.com/AnoAsked" target="_blank" rel="noreferrer">
            GitHub
        </a>
        <p>{connectedPeerCount}</p>
        {#if $username}
            <button use:popup={userPopup}>
                {#if $username}
                    <Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={$username}" width="w-8" rounded="rounded-full" cursor="cursor-pointer"/>
                {:else}
                    <div class="placeholder-circle w-8 animate-pulse" />
                {/if}
            </button>
            <div class="card p-4 space-y-2 w-48 shadow-xl" data-popup="userPopup">
                <h6 class="h6 text-center text-ellipsis overflow-hidden">{$username}</h6>
                <div class="space-y-1">
                    <button type="button" class="btn btn-sm variant-soft w-full" on:click={onSettings}>
                        <span><Icon icon="mdi:settings" class="w-6 h-6" /></span>
                        <span>Settings</span>
                    </button>
                    <div class="btn btn-sm variant-soft w-full active:">
                        <span><LightSwitch title="Switch dark and light mode."/></span>
                        <span>Change</span>
                    </div>
                    <button type="button" class="btn btn-sm variant-soft w-full">
                        <span><Icon icon="mdi:trash" class="w-6 h-6" /></span>
                        <span>Delete local data</span>
                    </button>
                    <button type="button" class="btn btn-sm variant-soft-error w-full" on:click={onLogout}>
                        <span><Icon icon="mdi:logout" class="w-6 h-6" /></span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        {/if}
    </svelte:fragment>
</AppBar>