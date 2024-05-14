<script lang="ts">
	import { Bubble } from "$lib/classes/bubble";
	import RoomView from "$lib/components/roomView.svelte";
	import Prompt from "$lib/components/prompt.svelte";
	import { db, user } from "$lib/auth";
    import GUN from "gun";
	import type { PageData } from "./$types";
    import { v4 as uuidv4 } from 'uuid';
	import CommentHeader from "$lib/components/commentHeader.svelte";

    export let data:PageData

    let currentComments:Bubble[] = [];

    let parent:Bubble

    async function onMessageSend(event:any){
        if(data.bubble){
            const bubble = user.get('all').set({message: event.detail.message, attachment: event?.detail?.attachment, room: parent.room})

            let id = ''
            let dublicate = true

            // Check if id exists
            while (dublicate) {
                id = uuidv4()
                await db.get('bubbles').get(id, (ack:any) => dublicate = ack.put)
            }

            db.get('bubbles').get(id).get("data").put(bubble)
            db.get('bubbles').get(data.bubble).get("comments").set({id: id})

            currentComments=currentComments
        }
    }

    async function bubbleChanged(){
        await db.get('bubbles').get(data.bubble).get("data").once(async (parentBubble:any) => {
            if (parentBubble){       
                parent = new Bubble(
                    data.bubble,
                    parentBubble.room,
                    await db.user(parentBubble).get('alias'), 
                    new Date((GUN.state as any).is(parentBubble, 'message')),
                    parentBubble?.message,
                    parentBubble?.attachment
                )
            }
        })

        currentComments = []

        db.get('bubbles').get(data.bubble).get("comments")
            .map()
            .on(async (bubbleId:any) => {
                if (bubbleId){
                    db.get('bubbles').get(bubbleId.id).get("data")
                    .on(async (bubble:any) => {
                        if (bubble){
                            let add = new Bubble(
                                bubbleId.id,
                                bubble.room,
                                await db.user(bubble).get('alias'), 
                                new Date((GUN.state as any).is(bubble, 'message')),
                                bubble?.message,
                                bubble?.attachment
                            )

                            if (add.message && !currentComments.some( ({timestamp}) => timestamp.valueOf() == add.timestamp.valueOf())) {
                                currentComments = [...currentComments, add].sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
                            }
                        }
                    })
                }
            })
    }

    $: if(data.bubble) bubbleChanged()
</script>

<CommentHeader bind:bubble={parent}/>
<hr class="!border-t-2" />
<RoomView bind:bubbles={currentComments}/>
<Prompt on:send={onMessageSend}/>