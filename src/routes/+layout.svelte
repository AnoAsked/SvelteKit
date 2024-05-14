<script lang="ts">
	import '../app.postcss';

	// Skeleton
	import { AppShell, Toast, initializeStores, Modal, type ModalComponent, storePopup } from '@skeletonlabs/skeleton';
	initializeStores();
	
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import Header from '$lib/components/header.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Modals
	import SettingsModal from '$lib/components/settings.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		settingsModal: { ref: SettingsModal }
	};

	// Routing
	import { browser } from '$app/environment';
	import { username } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: {
		if (!$username && browser) {
			if (!$page.url.pathname.startsWith("/auth"))
				goto("/auth")
		} else if ($username && browser){
			if (!$page.url.pathname.startsWith("/app") || $page.url.pathname === "/app")
				goto("/app/home")
		}
	}
</script>

<Toast zIndex="z-[1000]"/>
<Modal components={modalRegistry} />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<Header/>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
