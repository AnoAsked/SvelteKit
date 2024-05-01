<script lang="ts">
	import { Bubble } from "$lib/classes/bubble";
	import { Room } from "$lib/classes/room";
	import RoomHeader from "$lib/components/roomHeader.svelte";
	import RoomView from "$lib/components/roomView.svelte";
	import Prompt from "$lib/components/prompt.svelte";
	import { db, user } from "$lib/auth";
    import GUN from "gun";
	import type { PageData } from "./$types";
    import { v4 as uuidv4 } from 'uuid';

    export let data:PageData

    let currentRoom:Room;
    let currentBubbles:Bubble[] = [];

    async function onMessageSend(event:any){
        if(currentRoom){
            const data = user.get('all').set({message: event.detail.message, attachment: event.detail?.attachment})

            let id = ''
            let dublicate = true

            while (dublicate) {
                id = uuidv4()
                console.log(id)
                await db.get('rooms').get(currentRoom.name).get(id, (ack:any) => dublicate = ack.put)
            }

            db.get('rooms').get(currentRoom.name).get(id).put(data)
            currentBubbles=currentBubbles
        }
    }

    function roomChanged(){
        currentRoom = new Room(data.room, false)
        currentBubbles = []

        db.get('rooms').get(currentRoom.name)
            .map()
            .on(async (data:any) => {
                if (data){
                    let bubble = new Bubble(
                        await db.user(data).get('alias'), 
                        new Date((GUN.state as any).is(data, 'message')),
                        data?.message,
                        data?.attachment
                    )

                    if (bubble.message && !currentBubbles.some( ({timestamp}) => timestamp.valueOf() == bubble.timestamp.valueOf())) {
                        currentBubbles = [...currentBubbles, bubble].sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
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