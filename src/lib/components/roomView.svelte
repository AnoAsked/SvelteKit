<script lang="ts">
	import { Bubble } from "$lib/classes/bubble";
    import BubbleView from "$lib/components/bubbleView.svelte";
    import DateSeperator from "$lib/components/dateSeperator.svelte";
    import { afterUpdate } from 'svelte';

    export let bubbles:Bubble[] = []

    let element:any;

	afterUpdate(() => {
		if(bubbles) scrollToBottom(element);
    });

    export const scrollToBottom = async (node:any) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

    $: if(bubbles && element) scrollToBottom(element)
</script>

<div class="grow flex flex-col overflow-auto h-0" bind:this={element}>
    <div class="mr-2 space-y-2">
        {#each bubbles as bubble, index (bubble?.timestamp)}
            {#if bubble.timestamp.toLocaleDateString() !== bubbles[index-1]?.timestamp.toLocaleDateString()}
                <DateSeperator date={bubble?.timestamp}/>
            {/if}
        <BubbleView bubble={bubble}/>
        {/each}
    </div>
</div>