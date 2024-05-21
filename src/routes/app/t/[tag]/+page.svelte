<script lang="ts">
	import { Bubble } from "$lib/classes/bubble";
	import { Room } from "$lib/classes/room";
	import TagRoomHeader from "$lib/components/tagRoomHeader.svelte";
	import TagRoomView from "$lib/components/tagRoomView.svelte";
	import { db, user } from "$lib/auth";
    import GUN from "gun";
	import type { PageData } from "./$types";

    export let data:PageData

    let currentTag:string;
    let currentBubbles:Bubble[] = [];

    function tagChanged(){
        currentTag = data.tag
        currentBubbles = []

        db.get('tags').get(currentTag)
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
                                bubble?.attachment
                            )

                            if (add.message && !currentBubbles?.some( ({timestamp}) => timestamp.valueOf() == add.timestamp.valueOf())) {
                                currentBubbles = [...currentBubbles, add].sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
                            }
                        }
                    })
                }
            })
    }

    $: if(data.tag) tagChanged()
</script>

<TagRoomHeader bind:tag={currentTag}/>
<hr class="!border-t-2" />
<TagRoomView bind:bubbles={currentBubbles} bind:tag={currentTag}/>