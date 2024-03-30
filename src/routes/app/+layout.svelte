<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
    import { user, username } from '$lib/auth';
	import { onMount } from 'svelte';

    onMount(() => {
        if (!$username && browser) goto("/auth")
    })

    $: if (!$username && browser) goto("/auth")
</script>

{#if ($username && browser && user.is)}
    <slot />
{/if}