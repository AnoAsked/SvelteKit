<script lang="ts">
	import { username } from "$lib/auth";
	import type { Bubble } from "$lib/classes/bubble";
	import Icon from "@iconify/svelte";
	import { Avatar } from "@skeletonlabs/skeleton";

    export let bubble:Bubble;

	let liked = false;
	let disliked = false;

	function like(set:boolean){
		if(disliked)
			disliked = false
		
		liked = set
	}

	function dislike(set:boolean){
		if(liked)
			liked = false
		
		disliked = set
	}
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
		<div class="flex justify-between">
			<a href="/app/b/{bubble.id}" title="Comments">
				<Icon icon="mdi:comment-text-multiple-outline" class="min-w-6 min-h-6"/>
			</a>

			<div class="flex space-x-2">
				{#if liked}
					<button on:click={() => like(false)} title="Like bubble">
						<Icon icon="mdi:like" class="min-w-6 min-h-6 text-primary-500"/>
					</button>
				{:else}
					<button on:click={() => like(true)} title="Unlike bubble">
						<Icon icon="mdi:like-outline" class="min-w-6 min-h-6" />
					</button>
				{/if}
	
				{#if disliked}
					<button on:click={() => dislike(false)} title="Like bubble">
						<Icon icon="mdi:dislike" class="min-w-6 min-h-6 text-primary-500"/>
					</button>
				{:else}
					<button on:click={() => dislike(true)} title="Unlike bubble">
						<Icon icon="mdi:dislike-outline" class="min-w-6 min-h-6" />
					</button>
				{/if}
			</div>
		</div>
	</div>
	{#if bubble.user === $username}
		<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={bubble.user}" width="w-8" />
	{/if}
</div>