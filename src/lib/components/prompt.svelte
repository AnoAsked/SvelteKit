<script lang="ts">
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    let message = '';
    let attachment = '';
    let key = '';

	function onSend() {
		dispatch('send', {
			message: message,
			attachment: attachment,
			key: key
		});
		message = ''
	}
</script>

<form class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
	<div class="flex flex-col input-group-shim !p-0">
		<button class="btn rounded-none variant-filled-surface h-full" title="Add tags" disabled={true}><Icon icon="mdi:tags" class="w-6 h-6" /></button>
		<button class="btn rounded-none variant-filled-surface h-full" title="Add an attachment" disabled={true}><Icon icon="mdi:attachment" class="w-6 h-6" /></button>
	</div>
	<textarea
		bind:value={message}
		class="bg-transparent border-0 ring-0 max-h-36 resize-none"
		name="prompt"
		id="prompt"
		placeholder="Write a message..."
		rows={message.split('\n').length + 1}
	/>
	<div class="flex flex-col input-group-shim !p-0">
		<button class="btn rounded-none variant-filled-surface h-full" title="Encrypt message" disabled={true}><Icon icon="mdi:key" class="w-6 h-6" /></button>
		<button class="btn rounded-none variant-filled-surface h-full {message ? '!bg-primary-500' : ''}" title="Send message" disabled={!message} on:click|preventDefault={onSend}><Icon icon="mdi:send" class="w-6 h-6" /></button>
	</div>
</form>