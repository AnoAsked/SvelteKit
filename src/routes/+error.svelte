<script lang="ts">
    import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
    import '../app.postcss';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="text-center flex flex-col items-center">
        <h1 class="h1 text-9xl pixeled text-primary-500">{$page.status}</h1>
        <h3 class="h3 font-semibold">{$page.error?.message}</h3>
        <a class="btn btn-md variant-ghost-surface mt-32" href="/">
            <Icon icon="mdi:arrow-back" class="w-6 h-6" />
            <span>Zurück</span>
        </a>
    </div>
</div>