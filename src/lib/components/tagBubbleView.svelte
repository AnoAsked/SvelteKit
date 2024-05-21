<script lang="ts">
	import { db, user, username } from "$lib/auth";
	import type { Bubble } from "$lib/classes/bubble";
	import Icon from "@iconify/svelte";
	import { Avatar, getToastStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import 'gun/lib/unset.js';
	import SEA from "gun/sea";
	import { errorToast } from "$lib/toast";
	import type { Tag } from "$lib/classes/tag";

	const toastStore = getToastStore();

    export let bubble:Bubble;

    let personalTags:Tag[];

	let attachmentOfTypeVideo:boolean|undefined = undefined

	let decryptionKey = ''
	let decryptedMessage:string|undefined = undefined
	let decryptedAttachment:string|undefined = undefined

	onMount(() => {
		decryptedMessage = bubble.message
		decryptedAttachment = bubble?.attachment
		decryptBubble()

		bubble.tags = []

		db.get('bubbles').get(bubble.id).get("tags").map().on((tag:string) => {
			if (tag){
				if(!bubble.tags?.includes(tag))
					bubble.tags?.push(tag)
				bubble.tags = bubble.tags
			}
		})

		user?.get('tags').on((res:string) => {
			if(res){
				personalTags = []
				personalTags = JSON.parse(res)
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
	<a class="card p-4 {bubble.user === $username ? 'variant-soft-secondary rounded-tr-none' : 'variant-soft rounded-tl-none'} space-y-2" href="/app/b/{bubble.id}">
		<header class="flex justify-between items-center">
			<p class="font-bold">{bubble.user}</p>
			<small class="opacity-50">{bubble.timestamp.toLocaleTimeString()}</small>
		</header>
		{#if bubble?.tags}
			<div class="w-full flex space-x-2">
				{#each bubble?.tags ?? [] as tag}
					<a class="chip {personalTags?.some(t => t.name === tag) ? "variant-filled-primary" : "variant-outline-primary"}" href="/app/t/{tag}">{tag}</a>
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
	</a>
	{#if bubble.user === $username}
		<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={bubble.user}" width="w-8" />
	{/if}
</div>