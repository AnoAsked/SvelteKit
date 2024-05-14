<script lang="ts">
	import Icon from "@iconify/svelte";
	import { createEventDispatcher, onMount } from 'svelte';
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

	const dispatch = createEventDispatcher();
	const modalStore = getModalStore();


	onMount(() => {
		const inputElement = document.getElementById("hidden-upload");
		// @ts-ignore
		inputElement.addEventListener("change", handleFiles, false);
	})


    let message = '';
    let key = '';

	let file:File|undefined

	let encryptionKey = ''

	async function onSend() {
		dispatch('send', {
			encryptionKey: encryptionKey,
			message: message,
			file: file,
			key: key
		});
		message = ''
		encryptionKey = ''
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
		console.log(file)
	}

	$: if(!message) encryptionKey = ''
	$: {modal.value = encryptionKey}
</script>

<input class="w-0" id="hidden-upload" type="file" hidden disabled={!message} accept="image/jpeg,image/jpg,image/gif,image/png,image/apng,image/tiff,video/mp4,video/webm,video/x-matroska,video/quicktime,video/x-flv,video/x-msvideo,video/x-ms-wmv,video/mpeg"/>
<form class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
	<div class="flex flex-col input-group-shim !p-0">
		<button class="btn rounded-none variant-filled-surface h-full" title="Add tags" disabled={true}><Icon icon="mdi:tags" class="w-6 h-6" /></button>
		{#if file}
		<button class="btn rounded-none variant-filled-error h-full" title="Remove the attachment" on:click={() => file = undefined}><Icon icon="mdi:attachment-minus" class="w-6 h-6" /></button>
		{:else}
		<label class="{message ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 hover:brightness-100'} btn rounded-none variant-filled-surface h-full w-14 p-0 py-2" title="Add an attachment" for="hidden-upload"><Icon icon="mdi:attachment-plus" class="w-6 h-6" /></label>
		{/if}
	</div>
	<textarea
		bind:value={message}
		class="bg-transparent border-0 ring-0 max-h-36 resize-none read-only"
		placeholder="Write a message..."
		rows={message.split('\n').length + 1}
	/>
	<div class="flex flex-col input-group-shim !p-0">
		<button class="btn rounded-none variant-filled-surface h-full" title="Encrypt message" disabled={!message} on:click={() => modalStore.trigger(modal)}><Icon icon="mdi:key" class="w-6 h-6" /></button>
		<button class="btn rounded-none variant-filled-surface h-full {message ? '!bg-primary-500' : ''}" title="Send message" disabled={!message} on:click|preventDefault={onSend}><Icon icon="mdi:send" class="w-6 h-6" /></button>
	</div>
</form>