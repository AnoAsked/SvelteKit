<script>
	import Icon from "@iconify/svelte";

    export let name = ''
</script>

<div class="flex justify-center mb-2">
    <div class="input-group input-group-divider grid-cols-[1fr_auto] m-2">
        <input type="search" placeholder="Join room..." bind:value={name} class="overflow-hidden"/>
        <button class="btn rounded-none variant-filled-surface {name ? '!bg-primary-500' : ''}"><Icon icon="mdi:location-enter" class="w-6 h-6" /></button>
    </div>
</div>