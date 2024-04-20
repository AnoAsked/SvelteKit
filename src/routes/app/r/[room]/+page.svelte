<script lang="ts">
	import { Bubble } from "$lib/classes/bubble";
	import { Room } from "$lib/classes/room";
	import RoomHeader from "$lib/components/roomHeader.svelte";
	import RoomView from "$lib/components/roomView.svelte";
	import Prompt from "$lib/components/prompt.svelte";
	import { db, user } from "$lib/auth";
	import { onMount } from "svelte";
    import GUN from "gun";
	import type { PageData } from "./$types";

    let currentRoom:Room = {name: "fasdfa", favored: false};
    let currentBubbles:Bubble[] = [];

    export let data:PageData

    function onMessageSend(event:any){
        if(currentRoom){
            const data = user.get('all').set({message: event.detail.message, attachment: event.detail?.attachment})
            const index = new Date().toISOString();
            db.get('rooms').get(currentRoom.name).get(index).put(data)
        }
    }

    function roomChanged(){
        currentRoom = new Room(data.room, false)
        currentBubbles = []
        db.get('rooms').get(currentRoom.name)
            .map()
            .once(async (data:any) => {
                if (data){
                    let bubble = new Bubble(
                        await db.user(data).get('alias'), 
                        new Date((GUN.state as any).is(data, 'message')),
                        data.message,
                        data?.attachment
                    )

                    if (bubble.message){
                        currentBubbles = [...currentBubbles as [], bubble];
                    }
                }
            })
    }

    $: if(data.room) roomChanged()
</script>

<RoomHeader bind:room={currentRoom}/>
<hr class="!border-t-2" />
<RoomView bind:bubbles={currentBubbles}/>
<Prompt on:send={onMessageSend}/>