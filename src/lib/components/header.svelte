<script lang="ts">
	import { AppBar, Avatar, getDrawerStore, LightSwitch, popup, type PopupSettings } from "@skeletonlabs/skeleton";
    import { username, logout, db, user } from "$lib/auth";
    import { getToastStore } from '@skeletonlabs/skeleton';
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";
    import { errorToast, successToast } from '$lib/toast';
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();
    const toastStore = getToastStore();

    let connected:boolean|undefined = undefined;

    function onLogout(){
        toastStore.trigger(successToast("Logging out of AnoAsked."))
        logout()
        .then(() => {
            goto("/auth")
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
        toastStore.trigger(successToast("Clearing local data and logging out."))
        logout()
        .then(() => {
            localStorage.clear()
            goto("/auth")
        })
        .catch(err => toastStore.trigger(errorToast(err)))
    }

    const userPopup: PopupSettings = {
        event: 'click',
        target: 'userPopup',
        placement: 'bottom-end',
    };

    const drawerStore = getDrawerStore();
    function drawerOpen(): void {
        drawerStore.open({
            width: 'w-80',
            padding: 'p-2',
	        rounded: 'rounded-xl',
        });
    }
</script>

<!-- App Bar -->
<AppBar>
    <svelte:fragment slot="lead">
        <div class="flex items-center">
            <button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
                <span><Icon icon="mdi:forwardburger" class="w-6 h-6" /></span>
            </button>
            <a class="flex space-x-2 hover:text-primary-500" href="/">
                <img src="/favicon.svg" alt="AnoAsked Logo" class="w-6 h-6" />
                <strong class="text-xl pixeled">AnoAsked</strong>
            </a>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="trail">
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
                    <a type="button" class="btn btn-sm variant-soft w-full" href="https://github.com/AnoAsked" target="_blank" rel="noreferrer">
                        <span><Icon icon="mdi:github" class="w-6 h-6" /></span>
                        <span>Visit me on github</span>
                    </a>
                    <button type="button" class="btn btn-sm variant-soft-error w-full" on:click={onDeleteLocal}>
                        <span><Icon icon="mdi:trash" class="w-6 h-6" /></span>
                        <span>Delte and logout</span>
                    </button>
                    <button type="button" class="btn btn-sm variant-soft-warning w-full" on:click={onLogout}>
                        <span><Icon icon="mdi:logout" class="w-6 h-6" /></span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        {/if}
    </svelte:fragment>
</AppBar>