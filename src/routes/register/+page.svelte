<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Bei <span class="h1 pixeled text-primary-500">AnoAsked</span> registrieren</h2>
		<div class="flex flex-col justify-center space-y-2 w-80">
            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                <input type="text" placeholder="Benutzername definieren..." />
                <div><Icon icon="mdi:user" class="w-6 h-6" /></div>
            </div>
            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                <input type="password" placeholder="Passwort definieren..." />
                <div><Icon icon="mdi:password" class="w-6 h-6" /></div>
            </div>
            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                <input type="password" placeholder="Passwort wiederholen..." />
                <div><Icon icon="mdi:reload" class="w-6 h-6" /></div>
            </div>
		</div>
        <a type="button" class="btn btn-md variant-ghost-success" href="/home">
            <Icon icon="mdi:register" class="w-6 h-6" />
            <span>Registrieren</span>
        </a>
        <div class="flex justify-center items-center space-x-2">
            <a class="btn btn-md variant-ghost-surface w-min" href="/">
                <Icon icon="mdi:arrow-back" class="w-6 h-6" />
                <span>Zurück</span>
            </a>
            <a type="button" class="btn btn-md variant-ghost" href="/login">
                <Icon icon="mdi:login" class="w-6 h-6" />
                <span>Anmelden</span>
            </a>
        </div>
	</div>
</div>