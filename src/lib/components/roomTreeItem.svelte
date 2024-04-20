<script lang="ts">
	import type { Room } from "$lib/classes/room";
	import Icon from "@iconify/svelte";
	import { Avatar } from "@skeletonlabs/skeleton";

    export let room:Room
</script>

<a class="flex gap-x-2 justify-between w-56" href="/app/r/{room.name}">
    <Avatar src="https://api.dicebear.com/8.x/icons/svg?seed={room.name}" width="w-6 h-6 rounded-md"/>
    <h6 class="h6 text-center max-w-32 text-ellipsis overflow-hidden text-base text-nowrap">{room.name}</h6>
    {#if room.favored}
        <Icon icon="mdi:star-check" class="w-6 h-6 text-primary-500"/>
    {:else}
        <Icon icon="mdi:star-outline" class="w-6 h-6"/>
    {/if}
</a>