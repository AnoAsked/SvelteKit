<script lang="ts">
    export let date:Date
</script>

<div class="flex flex-col w-full">
    <p class="self-center opacity-50">{date?.toLocaleDateString()}</p>
    <hr class="!border-t-2" />
</div>