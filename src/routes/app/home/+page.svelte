<script lang="ts">
	import { page } from "$app/stores";
	import { username } from "$lib/auth";
	import Prompt from "$lib/components/prompt.svelte";
	import Bubble from "$lib/components/bubble.svelte";
	import Icon from "@iconify/svelte";
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    if($page.url.searchParams.get('verify')){
        const modal: ModalSettings = {
            type: 'component',
            component: 'settingsModal',
        };
        modalStore.trigger(modal);
    }

    let bubbles = [{user: 'aaaa', message: "Welcome to AnoAsked!", timestamp: Date.now()}, {user: 'bbbb', message: "Hello there!", timestamp: Date.now()}];
</script>

<div class="h-full flex justify-center">
    <div class="flex flex-col w-full lg:w-1/2 xl:w-1/3">
        <div class="grow flex flex-col space-y-2">
            {#each bubbles as bubble}
                <Bubble bubble={bubble}/>
            {/each}
        </div>
        <Prompt />
    </div>
</div>

