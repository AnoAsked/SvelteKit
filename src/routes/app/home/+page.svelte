<script lang="ts">
	import { page } from "$app/stores";
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
</script>

<div class="flex justify-center items-center h-full w-full"><h1 class="h1">HOME</h1></div>