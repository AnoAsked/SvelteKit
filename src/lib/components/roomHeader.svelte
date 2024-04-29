<script lang="ts">
	import { user } from "$lib/auth";
	import type { Room } from "$lib/classes/room";
	import Icon from "@iconify/svelte";
	import { Avatar } from "@skeletonlabs/skeleton";

    export let room:Room

    let favoredRooms:String[] = []

    function onFavor(){
        favoredRooms.push(room.name)
        user.get('favored').put(JSON.stringify(favoredRooms))
    }

    function onUnFavor(){
        const index = favoredRooms.indexOf(room.name, 0);
        if (index > -1) {
            favoredRooms.splice(index, 1);
        }
        user.get('favored').put(JSON.stringify(favoredRooms))
    }

    function roomChanged(){
        user?.get('favored').on((data:any) => {
            favoredRooms = JSON.parse(data)
            room.favored = favoredRooms.includes(room.name)
        })
    }

    $: if(room) roomChanged()
</script>

<div class="flex justify-between items-center space-x-2">
    <Avatar src="https://api.dicebear.com/8.x/icons/svg?seed={room.name}" width="w-8 h-8 rounded-md"/>
    <h3 class="h-full h3 text-ellipsis overflow-hidden">{room.name}</h3>
    {#if room.favored}
        <button on:click={onUnFavor} title="Unfavor room">
            <Icon icon="mdi:star-check" class="min-w-8 min-h-8 text-primary-500"/>
        </button>
    {:else}
    <button on:click={onFavor} title="Favor room">
        <Icon icon="mdi:star-outline" class="min-w-8 min-h-8" />
    </button>
    {/if}
</div>