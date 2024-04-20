<script lang="ts">
	import Icon from "@iconify/svelte";
	import { Avatar, TreeView, TreeViewItem, getDrawerStore } from "@skeletonlabs/skeleton";
	import TreeViewRoom from '$lib/components/roomTreeItem.svelte';
	import { Room } from "$lib/classes/room";
	import { goto } from "$app/navigation";

	const drawerStore = getDrawerStore();

	export let favouriteRooms:Room[] = [];
	export let trendingRooms:Room[] = [];

	function selectRoom(route:string) {
		goto(route)
		drawerStore.close();
	}

	favouriteRooms = [{name: 'favourites 1', favored: true}, {name: 'favourites 2', favored: true}, {name: 'favourites 3', favored: true}, {name: 'trending 1', favored: true}];
	trendingRooms = [{name: 'trending 1', favored: true}, {name: 'trending 2', favored: false}, {name: 'trending 3', favored: false}];
</script>

<TreeView>
	<TreeViewItem on:click={() => selectRoom("/app/home")}>
		<svelte:fragment slot="lead"><Icon icon="mdi:globe" class="w-6 h-6" /></svelte:fragment>
		Home
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
		<svelte:fragment slot="lead"><Icon icon="mdi:trending-up" class="w-6 h-6" /></svelte:fragment>
		Trending rooms
		<svelte:fragment slot="children">
			{#each trendingRooms as room}
				<TreeViewItem on:click={() => selectRoom("/app/r/"+room.name)}>
					<TreeViewRoom room={room}/>
				</TreeViewItem>
			{/each}
		</svelte:fragment>
	</TreeViewItem>
</TreeView>