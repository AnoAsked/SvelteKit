<script lang="ts">
	import { browser } from '$app/environment';
    import { username } from '$lib/auth';
</script>

{#if (!$username && browser)}
    <slot />
{/if}