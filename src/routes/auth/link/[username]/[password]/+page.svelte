<script lang="ts">
	import { login } from "$lib/auth";
	import type { PageData } from "./$types";
	import { errorToast, successToast } from "$lib/toast";
    import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from "$app/navigation";
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

    const toastStore = getToastStore();

    export let data:PageData

    let loading: boolean = true

    onMount(() => {
        login(data.username, data.password)
        .then(() => {
            toastStore.trigger(successToast("Logged into AnoAsked via anonymous link."))
            goto("/app/r/Home", {replaceState: true})
        })
        .catch(err => toastStore.trigger(errorToast(err)))
        .finally(() => loading = false)
    })
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Linked anonymous login into <span class="h1 pixeled text-primary-500">AnoAsked</span></h2>
        <div class="flex justify-center items-center space-x-2">
            {#if loading}
                <ProgressRadial value={undefined} class="w-6 h-6"/>
            {:else}
                <a class="btn btn-md variant-ghost-surface w-min" href="/auth">
                    <Icon icon="mdi:arrow-back" class="w-6 h-6" />
                    <span>Back</span>
                </a>
            {/if}
        </div>
	</div>
</div>