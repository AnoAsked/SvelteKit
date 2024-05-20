<script lang="ts">
	import { Status } from "$lib/enums/status";
	import Icon from "@iconify/svelte";
	import { ProgressRadial } from "@skeletonlabs/skeleton";

    export let status:Status;
    export let text:boolean = true;
</script>

{#if status == Status.PENDING}
<span class="badge variant-filled-warning p-1 h-min w-min" title="Pending">{#if text}<p>Pending</p>{/if}<Icon icon="mdi:account-question-outline" class="w-4 h-4" /></span>
{:else if status == Status.VERIFIED}
<span class="badge variant-filled-success p-1 h-min w-min" title="Verified">{#if text}<p>Verified</p>{/if}<Icon icon="mdi:verified" class="w-4 h-4" /></span>
{:else if status == Status.UNVERIFIED}
<span class="badge variant-filled-error p-1 h-min w-min" title="Unverified">{#if text}<p>Unverified</p>{/if}<Icon icon="mdi:remove-circle" class="w-4 h-4" /></span>
{:else}
<span class="badge variant-filled p-1 h-min w-min" title="Loading">{#if text}<p>Loading</p>{/if}<ProgressRadial value={undefined} class="w-4 h-4"/></span>
{/if}