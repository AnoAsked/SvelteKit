<script>
	import { goto } from "$app/navigation";
	import Icon from "@iconify/svelte";
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    export let name = ''

    function onClick(){
        drawerStore.close();
        goto(`/app/r/${name}`)
        name = ''
    }
</script>

<div class="flex justify-center mb-2">
    <div class="input-group input-group-divider grid-cols-[1fr_auto] m-2">
        <input type="search" placeholder="Join room..." bind:value={name} class="overflow-hidden"/>
        <button disabled={!name || name.trim() === ''} class="btn rounded-none variant-filled-surface {!name || name.trim() === '' ? '' : '!bg-primary-500'}" on:click|preventDefault={onClick}><Icon icon="mdi:location-enter" class="w-6 h-6" /></button>
    </div>
</div>