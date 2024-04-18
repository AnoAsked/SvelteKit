<script lang="ts">
	import Icon from "@iconify/svelte";
	import { Avatar, TreeView, TreeViewItem, getDrawerStore } from "@skeletonlabs/skeleton";
	import TreeViewRoom from '$lib/components/treeViewRoom.svelte';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	let favourites = [{name: 'favourites 1', favored: true}, {name: 'favourites 2', favored: true}, {name: 'favourites 3', favored: true}, {name: 'trending 1', favored: true}];
	let trending = [{name: 'trending 1', favored: true}, {name: 'trending 2', favored: false}, {name: 'trending 3', favored: false}];
</script>

<TreeView>
	<TreeViewItem on:click={drawerClose}>
		<svelte:fragment slot="lead"><Icon icon="mdi:globe" class="w-6 h-6" /></svelte:fragment>
		Home
	</TreeViewItem>
	<TreeViewItem>
		<svelte:fragment slot="lead"><Icon icon="mdi:star-check" class="w-6 h-6" /></svelte:fragment>
		Favourite rooms
		<svelte:fragment slot="children">
			{#each favourites as item}
				<TreeViewItem on:click={drawerClose}>
					<TreeViewRoom name={item.name} favored={item.favored}/>
				</TreeViewItem>
			{/each}
		</svelte:fragment>
	</TreeViewItem>
	<TreeViewItem>
		<svelte:fragment slot="lead"><Icon icon="mdi:trending-up" class="w-6 h-6" /></svelte:fragment>
		Trending rooms
		<svelte:fragment slot="children">
			{#each trending as item}
				<TreeViewItem on:click={drawerClose}>
					<TreeViewRoom name={item.name} favored={item.favored}/>
				</TreeViewItem>
			{/each}
		</svelte:fragment>
	</TreeViewItem>
</TreeView>