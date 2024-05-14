<script lang="ts">
	import { register } from '$lib/auth';
	import { errorToast, successToast, warningToast } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();

	let loading = false

    function onAnonymousRegister(){
		let username = uuidv4()
		let password = uuidv4()

		loading = true

		register(username, password, '')
		.then(() => {
			toastStore.trigger(successToast("Created user for anonymous use."))
			navigator.clipboard.writeText(`http://${window.location.host}/auth/link/${username}/${password}`)
			toastStore.trigger(warningToast("Copied user link to clipboard. (unsafe)"))
			goto("/app/r/Home", {replaceState: true})
		})
		.catch(err => {
			toastStore.trigger(errorToast(err))
		})
		.finally(() => loading = false)
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to <span class="h1 pixeled text-primary-500">AnoAsked</span></h2>
		<figure class="flex relative flex-col">
			<section class="img-bg img-animation" />
			<img src="/favicon.svg" alt="AnoAsked Logo" class="img-bg" />
		</figure>
		<div class="flex flex-col justify-center space-y-2">
			<a class="btn btn-md variant-soft-success" href="/auth/login">
				<Icon icon="mdi:verified" class="w-6 h-6" />
				<span>Continue verified</span>
			</a>
			<button class="btn btn-md variant-soft-error" on:click={onAnonymousRegister}>
				{#if loading}
					<ProgressRadial value={undefined} class="w-6 h-6"/>
				{:else}
					<Icon icon="mdi:anonymous" class="w-6 h-6" />
				{/if}
				<span>Continue anonymous</span>
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-animation {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
