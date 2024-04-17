<script lang="ts">
	import Icon from "@iconify/svelte";
	import { Avatar } from "@skeletonlabs/skeleton";

    export let name = "Group name"
    export let favored = true
</script>

<div class="flex gap-x-2 justify-between w-56">
    <Avatar src="https://api.dicebear.com/8.x/icons/svg?seed={name}" width="w-6 h-6 rounded-md"/>
    <h6 class="h6 text-center max-w-32 text-ellipsis overflow-hidden text-base text-nowrap">{name}</h6>
    {#if favored}
        <Icon icon="mdi:star-check" class="w-6 h-6 text-primary-500"/>
    {:else}
        <Icon icon="mdi:star-outline" class="w-6 h-6"/>
    {/if}
</div>