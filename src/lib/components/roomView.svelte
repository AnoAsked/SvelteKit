<script lang="ts">
	import { Bubble } from "$lib/classes/bubble";
    import BubbleView from "$lib/components/bubbleView.svelte";
    import DateSeperator from "$lib/components/dateSeperator.svelte";

    export let bubbles:Bubble[] = []
</script>

<div class="grow flex flex-col overflow-auto h-96">
    <div class="mr-2 space-y-2">
        {#each bubbles as bubble, index (bubble?.timestamp)}
            {#if bubble.timestamp.toLocaleDateString() !== bubbles[index-1]?.timestamp.toLocaleDateString()}
                <DateSeperator date={bubble?.timestamp}/>
            {/if}
            <BubbleView bubble={bubble}/>
        {/each}
    </div>
</div>