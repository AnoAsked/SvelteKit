<script lang="ts">
	import { db, username } from "$lib/auth";
	import type { Bubble } from "$lib/classes/bubble";
	import Icon from "@iconify/svelte";
	import { Avatar, InputChip, getModalStore, getToastStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import 'gun/lib/unset.js';
	import SEA from "gun/sea";
	import { errorToast } from "$lib/toast";

	const modalStore = getModalStore();
	const toastStore = getToastStore();

    export let bubble:Bubble;

	let likes:string[] = []
	let dislikes:string[] = []

	let attachmentOfTypeVideo:boolean|undefined = undefined

	let decryptionKey = ''
	let decryptedMessage:string|undefined = undefined
	let decryptedAttachment:string|undefined = undefined

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
		decryptedAttachment = bubble?.attachment
		decryptBubble()
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
		response: (r: string) => {if(r || r === '') decryptionKey = r; decryptBubble()},
	};

	$: modal.value = decryptionKey

	async function decryptBubble(){
		SEA.err = ""
		decryptedMessage = decryptionKey ? (await SEA.decrypt(bubble.message, decryptionKey)) : bubble.message
		decryptedAttachment = bubble?.attachment ? decryptionKey ? (await SEA.decrypt(bubble?.attachment, decryptionKey)) : bubble?.attachment : undefined
		if(SEA.err && SEA.err != "Could not decrypt"){
			toastStore.trigger(errorToast(SEA.err))		
		}
		attachmentOfTypeVideo = isVideoType()
	}

	function isVideoType():boolean|undefined{
		const upper = decryptedAttachment?.toLocaleUpperCase()
		if(!upper) return undefined 
		if (
			upper.endsWith(".MP4") ||
			upper.endsWith(".MOV") ||
			upper.endsWith(".MPEG") ||
			upper.endsWith(".AVI") ||
			upper.endsWith(".WEBM") ||
			upper.endsWith(".QUICKTIME") ||
			upper.endsWith(".X-MATROSKA") ||
			upper.endsWith(".X-FLV") ||
			upper.endsWith(".X-MSVIDEO") ||
			upper.endsWith(".X-MS-WMV") ||
			upper.endsWith(".GIFV")
		) return true
		if(
			upper.endsWith(".JPEG") ||
			upper.endsWith(".JPG") ||
			upper.endsWith(".PNG") ||
			upper.endsWith(".GIF") ||
			upper.endsWith(".APNG") ||
			upper.endsWith(".TIFF")
		) return false
		return undefined
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
		{#if bubble?.tags}
			<div class="w-full">
				{#each bubble?.tags ?? [] as tag}
					<span class="chip variant-outline-primary">{tag}</span>
				{/each}
			</div>
		{/if}
		{#if decryptedMessage == undefined}
			<span class="badge variant-filled-error p-1 h-min"><p>Could not decrypt message</p><Icon icon="mdi:encryption-alert-outline" class="w-4 h-4" /></span>
		{:else}
			<textarea
				readonly
				bind:value={decryptedMessage}
				class="bg-transparent border-0 ring-0 w-full resize-none max-h-60"
				rows={decryptedMessage.split('\n').length}
			/>
			{#if attachmentOfTypeVideo !== undefined}
				<div class="pb-2">
					{#if attachmentOfTypeVideo}
						<video controls class="w-full mx-auto max-h-96">
							<source src={decryptedAttachment}>
							<track kind="captions">
							Your browser does not support HTML video.
						</video>
					{:else}
						<img src={decryptedAttachment} alt="Media of this post." class="w-max mx-auto max-h-96"/>
					{/if}
				</div>
			{/if}
		{/if}
		<div class="flex justify-between space-x-2">
			<div class="flex space-x-2">
				{#if decryptionKey}
					<span title="Decrypted" class="badge variant-filled-success p-1 h-min"><Icon icon="mdi:decrypted-check-outline" class="w-4 h-4" /></span>
				{:else}
					<span title="No key" class="badge variant-filled-error p-1 h-min"><Icon icon="mdi:encryption-alert-outline" class="w-4 h-4" /></span>
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

				<a href="/app/b/{bubble.id}" title="Comments" class="flex space-x-2 items-center">
					<Icon icon="mdi:comment-text-multiple-outline" class="min-w-6 min-h-6"/>
				</a>
			</div>
		</div>
	</div>
	{#if bubble.user === $username}
		<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={bubble.user}" width="w-8" />
	{/if}
</div>