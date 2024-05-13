<script lang="ts">
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from 'svelte';
	import SEA from "gun/sea";
	import { getModalStore, popup, type ModalSettings, type PopupSettings } from "@skeletonlabs/skeleton";

	const dispatch = createEventDispatcher();
	const modalStore = getModalStore();

    let message = '';
    let attachment = '';
    let key = '';

	let encryptionKey = ''

	async function onSend() {
		dispatch('send', {
			encryptionKey: encryptionKey,
			message: message,
			attachment: attachment,
			key: key
		});
		message = ''
		encryptionKey = ''
	}
	
	const modal: ModalSettings = {
		type: 'prompt',
		title: 'Encryption key',
		body: 'Set your encryption key in the field below.',
		value: encryptionKey,
		buttonTextSubmit: 'Set',
		response: (r: string) => {if(r || r === '') encryptionKey = r},
	};

	$: if(!message) encryptionKey = ''
	$: {modal.value = encryptionKey}
</script>

<form class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
	<div class="flex flex-col input-group-shim !p-0">
		<button class="btn rounded-none variant-filled-surface h-full" title="Add tags" disabled={true}><Icon icon="mdi:tags" class="w-6 h-6" /></button>
		<button class="btn rounded-none variant-filled-surface h-full" title="Add an attachment" disabled={true}><Icon icon="mdi:attachment" class="w-6 h-6" /></button>
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