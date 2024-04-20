<script lang="ts">
	import type { Room } from "$lib/classes/room";
	import Icon from "@iconify/svelte";
	import { Avatar } from "@skeletonlabs/skeleton";

    export let room:Room
</script>

<div class="flex justify-between items-center space-x-2">
    <Avatar src="https://api.dicebear.com/8.x/icons/svg?seed={room.name}" width="w-8 h-8 rounded-md"/>
    <h3 class="h-full h3 text-ellipsis overflow-hidden">{room.name}</h3>
    {#if room.favored}
        <Icon icon="mdi:star-check" class="min-w-8 min-h-8 text-primary-500"/>
    {:else}
        <Icon icon="mdi:star-outline" class="min-w-8 min-h-8"/>
    {/if}
</div>