<script lang="ts">
	import api from "$lib/api";
	import { email, username } from "$lib/auth";
	import { Status } from "$lib/enums/status";
	import { errorToast, successToast, warningToast } from "$lib/toast";
	import Icon from "@iconify/svelte";
	import { ProgressRadial, getToastStore } from "@skeletonlabs/skeleton";

	const toastStore = getToastStore();

    export let status:Status;
    export let checkStatus:Function;

	let loading = false
	let code:string

	function onVerify(){
		loading = true
		api.post("verify", {
			username: $username,
			email: $email
		}).then(res => {
			if (res.data.status == "FAILED")
				toastStore.trigger(errorToast(res.data.message))
			else{
				toastStore.trigger(successToast(res.data.message))
				status = res.data.status
			}
		}).catch(err => {
			console.error(err)
			toastStore.trigger(errorToast(err))
		}).finally(() => {
			loading = false
			checkStatus()
		})
	}

	function onResend(){
		api.post("resend", {
			username: $username,
			email: $email
		}).then(res => {
			if (res.data.status == "FAILED")
				toastStore.trigger(errorToast(res.data.message))
			else{
				toastStore.trigger(successToast(res.data.message))
				status = res.data.status
			}
		}).catch(err => {
			console.error(err)
			toastStore.trigger(errorToast(err))
		}).finally(() => {
			checkStatus()
		})
	}

	function onConfirm(){
		loading = true
		api.post("confirm", {
			email: $email,
			code: code
		}).then(res => {
			if (res.data.status == "FAILED")
				toastStore.trigger(errorToast(res.data.message))
			else if(res.data.status == "PENDING"){
				toastStore.trigger(warningToast(res.data.message))
			} else{
				toastStore.trigger(successToast(res.data.message))
				status = res.data.status
			}
		}).catch(err => {
			console.error(err)
			toastStore.trigger(errorToast(err))
		}).finally(() => {
			loading = false
			checkStatus()
		})
	}
</script>

<div class="flex flex-wrap space-x-1 space-y-1">
	{#if status == Status.PENDING}
	<div class="w-48 input-group input-group-divider grid-cols-[1fr_auto]">
		<input type="text" placeholder="Enter code..." bind:value={code} disabled={loading}/>
		<div><Icon icon="mdi:confirmation-number-outline" class="w-6 h-6" /></div>
	</div>
	<button class="btn btn-sm variant-ghost-warning" disabled={loading} on:click|preventDefault={onConfirm}>
		{#if loading}
			<ProgressRadial value={undefined} class="w-6 h-6"/>
		{:else}
			<Icon icon="mdi:email-arrow-right-outline" class="w-6 h-6" />
		{/if}
		<span>Confirm</span>
	</button>
	<button class="btn btn-sm variant-ghost-warning" disabled={loading} on:click|preventDefault={onResend}>
		<Icon icon="mdi:email-sync-outline" class="w-6 h-6" />
		<span>Resend</span>
	</button>
	{:else if status == Status.UNVERIFIED}
	<button class="btn btn-sm variant-ghost-success" disabled={loading} on:click|preventDefault={onVerify}>
		{#if loading}
			<ProgressRadial value={undefined} class="w-6 h-6"/>
		{:else}
			<Icon icon="mdi:email-arrow-right-outline" class="w-6 h-6" />
		{/if}
		<span>Verify now</span>
	</button>
	{/if}
</div>
