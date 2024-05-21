<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { user } from "$lib/auth";
	import { Tag } from "$lib/classes/tag";

    export let tag:string

    let personalTags:Tag[] = []

    onMount(() => {
		user?.get('tags').on((res:string) => {
			if(res){
                personalTags = []
				personalTags = JSON.parse(res)
            }
		})

        console.log(personalTags)
    })

    function onRemove(){
        const index = personalTags.findIndex(t => t.name === tag);
        if (index > -1) {
            personalTags.splice(index, 1);
        }
        user.get('tags').put(JSON.stringify(personalTags))
        personalTags = personalTags
    }

    function onAdd(){
        personalTags.push(new Tag(tag, ""))
        user.get('tags').put(JSON.stringify(personalTags))
        personalTags = personalTags
    }
</script>

<div class="flex justify-between items-center space-x-2">
    <div class="w-20">
        <button class="btn btn-sm variant-ghost-surface w-min" on:click={() => history.back()}>
            <Icon icon="mdi:arrow-back" class="w-6 h-6" />
            <span>Back</span>
        </button>
    </div>
    <h3 class="h-full h3 text-ellipsis overflow-hidden">{tag}</h3>
    <div class="flex justify-end w-20">
        {#if personalTags?.some(t => t.name === tag)}
            <button on:click={onRemove} title="Remove tag" class="w-min">
                <Icon icon="mdi:tag-minus" class="min-w-8 min-h-8 text-primary-500"/>
            </button>
        {:else}
        <button on:click={onAdd} title="Add tag" class="w-min">
            <Icon icon="mdi:tag-plus-outline" class="min-w-8 min-h-8" />
        </button>
        {/if}
    </div>
</div>