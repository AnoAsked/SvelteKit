<script lang="ts">
	import { browser } from '$app/environment';
    import { username } from '$lib/auth';
	import RoomBar from '$lib/components/roomBar.svelte';
	import { AppShell, Drawer, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { afterNavigate } from '$app/navigation';

    const modalStore = getModalStore();

    afterNavigate(({from}) => {
        if(from?.url.pathname === "/auth/register"){
            const modal: ModalSettings = {
                type: 'component',
                component: 'settingsModal',
            };
            modalStore.trigger(modal);
        }
    }) 
</script>

{#if ($username && browser)}
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