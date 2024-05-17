<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import { Avatar, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { db, email, user, username } from '$lib/auth';
	import vapi from "$lib/vapi";
	import { Status } from '$lib/enums/status';
	import StatusBadge from '$lib/components/statusBadge.svelte';
	import { errorToast, successToast } from '$lib/toast';
	import StatusForm from '$lib/components/statusForm.svelte';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let status:Status = Status.LOADING;

	let formEmail:string = $email

	function onFormSubmit(): void {
		$email = formEmail
		user.get('email').put(formEmail).then(() => {
			toastStore.trigger(successToast("Saved changes."))
		}).catch(() => {
			toastStore.trigger(errorToast("Failed to save email."))
		})
	}

	onMount(() => {
		checkStatus()
	});

	function checkStatus(){
		vapi.post("check", {
			username: $username
		}).then(res => {
			if (res.data.status == "FAILED")
				toastStore.trigger(errorToast(res.data.message))
			status = res.data.status
		}).catch(() => {
			toastStore.trigger(errorToast("An error occurred while checking for user status."))
		})
	}
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<div class="flex justify-between">
			<div class="flex flex-col space-y-2">
				<h3 class="h3 flex items-center"><Icon icon="mdi:settings" class="w-6 h-6 mr-2" />User settings</h3>
				<h4 class="h4 flex items-center">{$username}</h4>
				<div class="flex space-x-2">
					<p>Status:</p>
					<StatusBadge status={status}/>
				</div>
				<StatusForm status={status} checkStatus={checkStatus}/>
			</div>
			<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg?seed={$username}" width="w-full h-full max-w-32" rounded="rounded-full"/>
		</div>
		<article>This data is encrypted and distributed amongst multiple peers.</article>
		<form class="modal-form border border-surface-500 p-4 space-y-2 rounded-container-token">
			<label class="label">
				<span>Email</span>
				<input class="input" type="email" bind:value={formEmail} placeholder="Enter email address..." />
			</label>
		</form>
		<footer class="modal-footer flex justify-between">
			<button class="btn btn-md variant-ghost-surface w-min" on:click={parent.onClose}>
                <Icon icon="mdi:arrow-back" class="w-6 h-6" />
                <span>Back</span>
            </button>
			<button class="btn btn-md variant-ghost-surface w-min" on:click={onFormSubmit}>
                <Icon icon="mdi:content-save" class="w-6 h-6" />
                <span>Save</span>
            </button>
		</footer>
	</div>
{/if}