<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
    import { user, username } from '$lib/auth';
	import RoomBar from '$lib/components/roomBar.svelte';
	import { AppShell, Drawer, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

    const modalStore = getModalStore();

    if($page.url.searchParams.get('verify')){
        const modal: ModalSettings = {
            type: 'component',
            component: 'settingsModal',
        };
        modalStore.trigger(modal);
    }

    onMount(() => {
        if (!$username && browser) goto("/auth")
    })

    $: if (!$username && browser) goto("/auth")
</script>

{#if ($username && browser && user.is)}
    <Drawer>
        <RoomBar/>
    </Drawer>

    <AppShell slotSidebarLeft="w-0 md:w-80 h-full md:p-2" slotPageContent="p-2">
        <svelte:fragment slot="sidebarLeft">
            <RoomBar/>
        </svelte:fragment>
        <div class="h-full flex justify-center">
            <div class="flex flex-col space-y-4 w-full max-w-screen-md">
                <slot/>
            </div>
        </div>
    </AppShell>
{/if}