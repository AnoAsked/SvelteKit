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
	import SEA from "gun/sea";
	import iapi from "$lib/iapi";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import { errorToast } from "$lib/toast";

    const toastStore = getToastStore();

    export let data:PageData

    let loading = false;

    let currentRoom:Room;
    let currentBubbles:Bubble[] = [];

    async function onMessageSend(event:any){
        loading = true
        if(currentRoom){
            let attachment = ""
            if(event?.detail?.file){
                var formData = new FormData();
                formData.append('image', event?.detail?.file);
                await iapi.post("", formData).then(res => {
                    if(res.status === 200)
                        attachment = res.data.data.link
                    else
                        toastStore.trigger(errorToast(res.statusText))
                }).catch(() => {
                    toastStore.trigger(errorToast("An error occurred while sending message."))
                    loading = false
                    return;
                })
            }

            const secret_message = event.detail.encryptionKey ? await SEA.encrypt(event.detail.message, event.detail.encryptionKey) : event.detail.message
            const secret_attachment = attachment ? event.detail.encryptionKey ? await SEA.encrypt(attachment, event.detail.encryptionKey) : attachment : ''
            const bubble = user.get('all').set({message: secret_message, attachment: secret_attachment, room: currentRoom.name, tags: event?.detail?.tags})

            let id = ''
            let dublicate = true

            // Check if id exists
            while (dublicate) {
                id = uuidv4()
                await db.get('bubbles').get(id, (ack:any) => dublicate = ack.put)
            }

            // create new in b/hash
            db.get('bubbles').get(id).get("data").put(bubble)
            // add hash to r/room
            db.get('rooms').get(currentRoom.name).set({id: id})

            // add bubble to tags
            event?.detail?.tags.forEach((tag:string) => {
                db.get('tags').get(tag).set({id: id})
            });

            currentBubbles=currentBubbles
        }
        loading = false
    }

    function roomChanged(){
        currentRoom = new Room(data.room, false)
        currentBubbles = []

        db.get('rooms').get(currentRoom.name)
            .map()
            .on(async (bubbleId:any) => {
                if (bubbleId){
                    db.get('bubbles').get(bubbleId.id).get("data")
                    .on(async (bubble:any) => {
                        if (bubble){
                            let add = new Bubble(
                                bubbleId.id,
                                bubble.room,
                                await db.user(bubble).get('alias') ?? await db.user(bubble).get('alias'), 
                                new Date((GUN.state as any).is(bubble, 'message')),
                                bubble?.message,
                                bubble?.attachment,
                                bubble?.tags,
                            )

                            if (add.message && !currentBubbles.some( ({timestamp}) => timestamp.valueOf() == add.timestamp.valueOf())) {
                                currentBubbles = [...currentBubbles, add].sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
                            }
                        }
                    })
                }
            })
    }

    $: if(data.room) roomChanged()
</script>

<RoomHeader bind:room={currentRoom}/>
<hr class="!border-t-2" />
<RoomView bind:bubbles={currentBubbles}/>
<Prompt on:send={onMessageSend} bind:loading={loading}/>