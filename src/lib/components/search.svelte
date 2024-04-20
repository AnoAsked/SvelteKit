<script lang="ts">
	import Icon from "@iconify/svelte";

    export let search = ""
</script>

<div class="flex justify-center">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim"><Icon icon="mdi:search" class="w-6 h-6" /></div>
        <input type="search" placeholder="Search..." bind:value={search}/>
        <button class="variant-filled-surface {search ? '!bg-primary-500' : ''}" disabled={!search}>Search</button>
    </div>
</div>