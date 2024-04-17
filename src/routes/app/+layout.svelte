<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
    import { user, username } from '$lib/auth';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    import RoomTree from '$lib/components/roomTree.svelte';
	import Search from '$lib/components/search.svelte';

    onMount(() => {
        if (!$username && browser) goto("/auth")
    })

    $: if (!$username && browser) goto("/auth")
</script>

{#if ($username && browser && user.is)}
    <AppShell slotSidebarLeft="w-0 md:w-80 h-full p-2" slotPageHeader="p-2" slotPageContent="p-2">
        <svelte:fragment slot="sidebarLeft">
            <div class="card h-full w-full variant-soft">
                <RoomTree/>
            </div>
        </svelte:fragment>
        <svelte:fragment slot="pageHeader">
            <div class="w-full">
                <Search/>
            </div>
        </svelte:fragment>
        <slot />
    </AppShell>
{/if}