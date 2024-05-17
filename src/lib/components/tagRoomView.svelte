<script lang="ts">
	import { Bubble } from "$lib/classes/bubble";
    import TagBubbleView from "$lib/components/tagBubbleView.svelte";
    import DateSeperator from "$lib/components/dateSeperator.svelte";
    import { afterUpdate, tick } from 'svelte';

    export let tag:string
    export let bubbles:Bubble[] = []

    let element:any;

	afterUpdate(() => {
		if(bubbles) scrollToBottom(element);
    });

    export const scrollToBottom = async (node:any) => {
        await tick();
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
        <TagBubbleView bubble={bubble} pageTag={tag}/>
        {/each}
    </div>
</div>