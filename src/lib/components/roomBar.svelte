<script lang=ts>
	import type { Room } from "$lib/classes/room";
	import CreateRoom from "./roomJoin.svelte";
	import RoomTree from "./roomTree.svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function onRoomChanged(){
        dispatch('roomChanged');
    }
</script>

<div class="flex flex-col h-full w-full">
    <CreateRoom/>
    <div class="card variant-soft grow">
        <RoomTree on:roomChanged={onRoomChanged}/>
    </div>
</div>