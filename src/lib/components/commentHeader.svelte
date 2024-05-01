<script lang="ts">
	import type { Bubble } from "$lib/classes/bubble";
	import Icon from "@iconify/svelte";
	import BubbleView from "./bubbleView.svelte";

    export let bubble:Bubble
</script>

{#if bubble}
    <div class="flex justify-between items-center space-x-2">
        <button class="btn btn-sm variant-ghost-surface w-min" on:click={() => history.back()}>
            <Icon icon="mdi:arrow-back" class="w-6 h-6" />
            <span>Back</span>
        </button>
        <h3 class="h-full h3 text-ellipsis overflow-hidden">Comments</h3>
        <a class="btn btn-sm variant-ghost-surface w-min" href="/app/r/{bubble?.room}">
            <Icon icon="mdi:arrow-left-top" class="w-6 h-6" />
            <span>Room</span>
        </a>
    </div>
    <hr class="!border-t-2" />
    <BubbleView bubble={bubble}/>
{/if}