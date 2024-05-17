<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { InputChip, getModalStore } from '@skeletonlabs/skeleton';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	let tags: string[] = $modalStore[0].meta.tags;

	function onFormSubmit(): void {
		// @ts-ignore
		$modalStore[0].response(tags);
		parent.onClose()
	}
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<h3 class="h3 flex items-center font-bold">Reference tags</h3>
		<article>Tags can be used to mark bubbles, with for example locations or keywords.</article>
		<InputChip bind:value={tags} name="tags" placeholder="Enter a tag (mark/location)..." chips="variant-outline-primary" regionInput="focus:outline-0"/>
		<footer class="modal-footer flex justify-end">
			<button class="btn btn-md variant-ghost-surface w-min" on:click={parent.onClose}>
                Cancel
            </button>
			<button class="btn btn-md variant-filled w-min" on:click={onFormSubmit}>
                Set
            </button>
		</footer>
	</div>
{/if}