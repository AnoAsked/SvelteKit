<script lang="ts">
	import Icon from "@iconify/svelte";
	import { createEventDispatcher, onMount } from 'svelte';
	import { ProgressRadial, getModalStore, getToastStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { errorToast } from "$lib/toast";

	const dispatch = createEventDispatcher();
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	onMount(() => {
		const inputElement = document.getElementById("hidden-upload");
		// @ts-ignore
		inputElement.addEventListener("change", handleFiles, false);
	})

	export let loading = false;

    let message = '';

	let file:File|undefined = undefined
	let tags:string[] = []
	let encryptionKey = ''

	async function onSend() {
		if(file){
			if(file?.type.startsWith("video"))
				if(file?.size > 200000000){
					toastStore.trigger(errorToast("Video size can not exceed 200MB!"))
					return;
				}
			else
				if(file?.size > 10000000){
					toastStore.trigger(errorToast("Image size can not exceed 10MB!"))
					return;
				}
		}

		dispatch('send', {
			encryptionKey: encryptionKey,
			message: message,
			tags: tags,
			file: file
		});

		message = ''
		encryptionKey = ''
		tags = []
		file = undefined
	}
	
	const modal: ModalSettings = {
		type: 'prompt',
		title: 'Encryption key',
		body: 'Set your encryption key in the field below.',
		value: encryptionKey,
		buttonTextSubmit: 'Set',
		response: (r: string) => {if(r || r === '') encryptionKey = r},
	};

	function handleFiles() {
		// @ts-ignore
		file = this.files[0];
	}

	function onTags(){
        const modal: ModalSettings = {
            type: 'component',
            component: 'tagsModal',
			meta: { tags: tags.slice(0) },
			response: (r: string[]) => {
				if(r) 
					tags = r
				if(r !== undefined && r?.length === 0)
					tags = []
			},
        };
        modalStore.trigger(modal);
    }

	$: if(!message) encryptionKey = ''
	$: {modal.value = encryptionKey}
</script>

<input class="w-0" id="hidden-upload" type="file" hidden disabled={!message} accept="image/jpeg,image/jpg,image/gif,image/png,image/apng,image/tiff,video/mp4,video/webm,video/x-matroska,video/quicktime,video/x-flv,video/x-msvideo,video/x-ms-wmv,video/mpeg,video/mov"/>
<form class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
	<div class="flex flex-col input-group-shim !p-0">
		<button class="btn rounded-none h-full {tags?.length > 0 ? "variant-filled-primary" : "variant-filled-surface"}" title="Add tags" disabled={!message || loading} on:click={onTags}><Icon icon="mdi:tags" class="w-6 h-6" /></button>
		{#if file}
		<button class="btn rounded-none variant-filled-primary h-full" title="Remove the attachment" on:click={() => file = undefined}><Icon icon="mdi:attachment-minus" class="w-6 h-6" /></button>
		{:else}
		<label class="{(message && !loading) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 hover:brightness-100'} btn rounded-none variant-filled-surface h-full w-14 p-0 py-2" title="Add an attachment" for="hidden-upload"><Icon icon="mdi:attachment-plus" class="w-6 h-6" /></label>
		{/if}
	</div>
	<textarea
		bind:value={message}
		class="bg-transparent border-0 ring-0 max-h-36 resize-none read-only focus:outline-0"
		placeholder="Write a message..."
		disabled={loading}
		rows={message.split('\n').length + 1}
	/>
	<div class="flex flex-col input-group-shim !p-0">
		<button class="btn rounded-none {encryptionKey ? "variant-filled-primary" : "variant-filled-surface"} h-full" title={encryptionKey ? "Edit encryption key" : "Set encryption key"} disabled={!message || loading} on:click={() => modalStore.trigger(modal)}>
			{#if encryptionKey}
				<Icon icon="mdi:key-change" class="w-6 h-6" />
			{:else}
				<Icon icon="mdi:key-plus" class="w-6 h-6" />
			{/if}
		</button>
		<button class="btn rounded-none variant-filled-surface h-full {message ? '!bg-primary-500' : ''}" disabled={!message || loading} title="Send message" on:click|preventDefault={onSend}>
			{#if loading}
				<ProgressRadial value={undefined} class="w-6 h-6"/>
			{:else}
				<Icon icon="mdi:send" class="w-6 h-6" />
			{/if}
		</button>
	</div>
</form>