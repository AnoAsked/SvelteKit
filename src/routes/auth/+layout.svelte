<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
    import { user, username } from '$lib/auth';
	import { onMount } from 'svelte';

    onMount(() => {
        if ($username && browser) goto("/app")
        console.log(user.is)
    })

    $: if ($username && browser) goto("/app")
</script>

{#if (!$username && browser && !user.is)}
    <slot />
{/if}