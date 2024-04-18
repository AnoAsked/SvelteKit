<script lang="ts">
	import Icon from "@iconify/svelte";

    export let search = ""
</script>

<div class="flex justify-center">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] w-full lg:w-1/2 xl:w-1/3">
        <div class="input-group-shim"><Icon icon="mdi:search" class="w-6 h-6 {search ? 'text-primary-500' : ''}" /></div>
        <input type="search" placeholder="Search..." bind:value={search}/>
        <button class="variant-filled-surface" disabled={!search}><span class="{search ? 'text-primary-500' : ''}">Search</span></button>
    </div>
</div>