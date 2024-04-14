<script lang="ts">
	export let imageUrl: string;
	export let label: string;
	export let selected: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={`card ${selected ? 'selected' : ''}`} on:click>
	<img src={imageUrl} alt={label} class="image" />
	<div class="label">{label}</div>
</div>

<style lang="scss">
	.card {
		background-color: whitesmoke;
		border-style: dotted;
		border-width: 1px;
		border-color: whitesmoke;
	}

	.card.selected {
		border-style: dotted;
		border-color: #ff3e00;
	}

	.image {
		width: 100%;
	}
	.label {
		padding: 4px;
	}
</style>
