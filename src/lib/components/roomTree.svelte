<script lang="ts">
	import Icon from "@iconify/svelte";
	import { Avatar, TreeView, TreeViewItem, getDrawerStore } from "@skeletonlabs/skeleton";
	import TreeViewRoom from '$lib/components/treeViewRoom.svelte';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	let favourites = ['favourites 1', 'favourites 2', 'favourites 3'];
	let trending = ['trending 1', 'trending 2', 'trending 3'];
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
			{#each favourites as name}
				<TreeViewItem on:click={drawerClose}>
					<TreeViewRoom name={name} favored={true}/>
				</TreeViewItem>
			{/each}
		</svelte:fragment>
	</TreeViewItem>
	<TreeViewItem>
		<svelte:fragment slot="lead"><Icon icon="mdi:trending-up" class="w-6 h-6" /></svelte:fragment>
		Trending rooms
		<svelte:fragment slot="children">
			{#each trending as name}
				<TreeViewItem on:click={drawerClose}>
					<TreeViewRoom name={name} favored={true}/>
				</TreeViewItem>
			{/each}
		</svelte:fragment>
	</TreeViewItem>
</TreeView>