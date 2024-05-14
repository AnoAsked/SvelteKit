<script lang="ts">
	import Icon from "@iconify/svelte";
	import { TreeView, TreeViewItem, getDrawerStore } from "@skeletonlabs/skeleton";
	import TreeViewRoom from '$lib/components/roomTreeItem.svelte';
	import { Room } from "$lib/classes/room";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { user, username } from "$lib/auth";

	const drawerStore = getDrawerStore();

	export let favouriteRooms:Room[] = [];
	export let personalTags:String[] = [];

	function selectRoom(route:string) {
		goto(route)
		drawerStore.close();
	}

	onMount(() => {
        user?.get('favored').on((data:any) => {
			favouriteRooms = []
			JSON.parse(data).forEach((name:string) => {
				favouriteRooms.push(new Room(name, true))
			});
			favouriteRooms = favouriteRooms
        })
	})
</script>

<TreeView>
	<TreeViewItem on:click={() => selectRoom("/app/home")}>
		<svelte:fragment slot="lead"><Icon icon="mdi:globe" class="w-6 h-6" /></svelte:fragment>
		<a href="/app/home">Home</a>
	</TreeViewItem>
	<TreeViewItem>
		<svelte:fragment slot="lead"><Icon icon="mdi:star-check" class="w-6 h-6" /></svelte:fragment>
		Favourite rooms
		<svelte:fragment slot="children">
			{#each favouriteRooms as room}
				<TreeViewItem on:click={() => selectRoom("/app/r/"+room.name)}>
					<TreeViewRoom room={room}/>
				</TreeViewItem>
			{/each}
		</svelte:fragment>
	</TreeViewItem>
	<TreeViewItem>
		<svelte:fragment slot="lead"><Icon icon="mdi:tags" class="w-6 h-6" /></svelte:fragment>
		Posts with your tags
		<svelte:fragment slot="children">
			{#each personalTags as tag}
				<TreeViewItem on:click={() => selectRoom("/app/t/"+tag)}>
					<p>{tag}</p>
				</TreeViewItem>
			{/each}
		</svelte:fragment>
	</TreeViewItem>
</TreeView>