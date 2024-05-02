<script lang="ts">
	import { db, username } from "$lib/auth";
	import type { Bubble } from "$lib/classes/bubble";
	import Icon from "@iconify/svelte";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import 'gun/lib/unset.js';

    export let bubble:Bubble;

	let likes:string[] = []
	let dislikes:string[] = []

	function like(set:boolean){
		if(dislikes.includes($username)){
			console.log("unset disliked")
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "disliked"})
		}
		
		if(set){
			console.log("set liked")
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "liked"})
		}
		else{
			console.log("unset liked && set none")
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "liked"})
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "none"})
		}
	}

	function dislike(set:boolean){
		if(likes.includes($username)){
			console.log("unset liked")
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "liked"})
		}
		
		if(set){
			console.log("set disliked")
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "disliked"})
		}
		else{
			console.log("unset disliked && set none")
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "disliked"})
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "none"})
		}
	}

	onMount(() => {
		db.get('bubbles').get(bubble.id).get("stats").map().on((data:any) => {
			if(data){
				if (data.stat === "liked") {
					if (!likes.includes(data.name))
						likes.push(data.name);
					const indexOfDislikes = dislikes.indexOf(data.name, 0);
					if (indexOfDislikes > -1) {
						dislikes.splice(indexOfDislikes, 1);
					}
				}
				if (data.stat === "disliked"){
					if (!dislikes.includes(data.name))
						dislikes.push(data.name);
					const indexOfLikes = likes.indexOf(data.name, 0);
					if (indexOfLikes > -1) {
						likes.splice(indexOfLikes, 1);
					}
				}
				if (data.stat === "none"){
					const indexOfLikes = likes.indexOf(data.name, 0);
					if (indexOfLikes > -1) {
						likes.splice(indexOfLikes, 1);
					}
					const indexOfDislikes = dislikes.indexOf(data.name, 0);
					if (indexOfDislikes > -1) {
						dislikes.splice(indexOfDislikes, 1);
					}
				}
				console.log("likes:")
				console.log(likes)
				console.log("dislikes:")
				console.log(dislikes)
				likes = likes
				dislikes = dislikes
			}
		})
	})
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
				{#if likes.includes($username)}
					<button on:click={() => like(false)} title="Like bubble">
						<Icon icon="mdi:like" class="min-w-6 min-h-6 text-primary-500"/>
						<span>{likes.length}</span>
					</button>
				{:else}
					<button on:click={() => like(true)} title="Unlike bubble">
						<Icon icon="mdi:like-outline" class="min-w-6 min-h-6" />
						<span>{likes.length}</span>
					</button>
				{/if}
	
				{#if dislikes.includes($username)}
					<button on:click={() => dislike(false)} title="Like bubble">
						<Icon icon="mdi:dislike" class="min-w-6 min-h-6 text-primary-500"/>
						<span>{dislikes.length}</span>
					</button>
				{:else}
					<button on:click={() => dislike(true)} title="Unlike bubble">
						<Icon icon="mdi:dislike-outline" class="min-w-6 min-h-6" />
						<span>{dislikes.length}</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
	{#if bubble.user === $username}
		<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={bubble.user}" width="w-8" />
	{/if}
</div>