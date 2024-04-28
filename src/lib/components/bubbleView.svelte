<script lang="ts">
	import { username } from "$lib/auth";
	import type { Bubble } from "$lib/classes/bubble";
	import { Avatar } from "@skeletonlabs/skeleton";

    export let bubble:Bubble;
</script>

<div class="grid {bubble.user === $username ? 'grid-cols-[1fr_auto]' : 'grid-cols-[auto_1fr]'} gap-2">
	{#if bubble.user !== $username}
		<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={bubble.user}" width="w-8" />
	{/if}
	<div class="card p-4 {bubble.user === $username ? 'variant-soft-secondary rounded-tr-none' : 'variant-soft rounded-tl-none'} space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">{bubble.user}</p>
			<small class="opacity-50">{bubble.timestamp.toLocaleTimeString()}</small>
		</header>
		<p>{bubble.message}</p>
	</div>
	{#if bubble.user === $username}
		<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={bubble.user}" width="w-8" />
	{/if}
</div>