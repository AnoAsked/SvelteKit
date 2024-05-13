<script lang="ts">
	import { db, username } from "$lib/auth";
	import type { Bubble } from "$lib/classes/bubble";
	import Icon from "@iconify/svelte";
	import { Avatar, getModalStore, getToastStore, popup, type ModalSettings, type PopupSettings } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import 'gun/lib/unset.js';
	import SEA from "gun/sea";
	import { errorToast } from "$lib/toast";

	const modalStore = getModalStore();
	const toastStore = getToastStore();

    export let bubble:Bubble;

	let likes:string[] = []
	let dislikes:string[] = []
	let decryptionKey = ''
	let decryptedMessage:string|undefined = undefined

	function like(set:boolean){
		if(dislikes.includes($username)){
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "disliked"})
		}
		
		if(set){
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "liked"})
		}
		else{
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "liked"})
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "none"})
		}
	}

	function dislike(set:boolean){
		if(likes.includes($username)){
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "liked"})
		}
		
		if(set){
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "disliked"})
		}
		else{
			db.get('bubbles').get(bubble.id).get("stats").unset({name: $username, stat: "disliked"})
			db.get('bubbles').get(bubble.id).get("stats").set({name: $username, stat: "none"})
		}
	}

	onMount(() => {
		decryptedMessage = bubble.message
		decryptMessage()
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
				likes = likes
				dislikes = dislikes
			}
		})
	})

	const modal: ModalSettings = {
		type: 'prompt',
		title: 'Decryption key for message',
		body: 'Set your decryption key in the field below.',
		value: decryptionKey,
		buttonTextSubmit: 'Decrypt',
		response: (r: string) => {if(r || r === '') decryptionKey = r; decryptMessage()},
	};

	$: modal.value = decryptionKey

	async function decryptMessage(){
		try {
			decryptedMessage = decryptionKey ? (await SEA.decrypt(bubble.message, decryptionKey)) : bubble.message
		} catch (err) {
			if (err instanceof Error) {
				toastStore.trigger(errorToast(err.message))
			}
		}
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
		{#if decryptedMessage == undefined}
			<span class="badge variant-filled-error p-1 h-min"><p>Could not decrypt message</p><Icon icon="mdi:encryption-alert-outline" class="w-4 h-4" /></span>
		{:else}
			<textarea
				readonly
				bind:value={decryptedMessage}
				class="bg-transparent border-0 ring-0 w-full resize-none"
			/>
		{/if}
		<div class="flex justify-between space-x-2">
			<div class="flex space-x-2">
				{#if decryptedMessage == undefined}
					<span class="badge variant-filled-error p-1 h-min"><Icon icon="mdi:encryption-alert-outline" class="w-4 h-4" /></span>
				{:else}
					<span class="badge variant-filled-success p-1 h-min"><Icon icon="mdi:decrypted-check-outline" class="w-4 h-4" /></span>
				{/if}
				<button title="Decrypt" on:click={() => modalStore.trigger(modal)}>
					<Icon icon="mdi:key" class="min-w-6 min-h-6"/>
				</button>
			</div>

			<div class="flex space-x-5">
				{#if likes.includes($username)}
					<button on:click={() => like(false)} title="Like bubble" class="flex space-x-2 items-center">
						<Icon icon="mdi:like" class="min-w-6 min-h-6 text-primary-500"/>
						<span>{likes.length}</span>
					</button>
				{:else}
					<button on:click={() => like(true)} title="Unlike bubble" class="flex space-x-2 items-center">
						<Icon icon="mdi:like-outline" class="min-w-6 min-h-6" />
						<span>{likes.length}</span>
					</button>
				{/if}
	
				{#if dislikes.includes($username)}
					<button on:click={() => dislike(false)} title="Like bubble" class="flex space-x-2 items-center">
						<Icon icon="mdi:dislike" class="min-w-6 min-h-6 text-primary-500"/>
						<span>{dislikes.length}</span>
					</button>
				{:else}
					<button on:click={() => dislike(true)} title="Unlike bubble" class="flex space-x-2 items-center">
						<Icon icon="mdi:dislike-outline" class="min-w-6 min-h-6" />
						<span>{dislikes.length}</span>
					</button>
				{/if}

				<a href="/app/b/{bubble.id}" title="Comments">
					<Icon icon="mdi:comment-text-multiple-outline" class="min-w-6 min-h-6"/>
				</a>
			</div>
		</div>
	</div>
	{#if bubble.user === $username}
		<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={bubble.user}" width="w-8" />
	{/if}
</div>