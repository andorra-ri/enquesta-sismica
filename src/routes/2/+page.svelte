<script lang="ts">
	import Button from '@smui/button';

	import ImageList, {
		Item,
		ImageAspectContainer,
		Image,
		Supporting,
		Label
	} from '@smui/image-list';
	import { onDestroy, onMount } from 'svelte';

	import { sendToSupabase } from '$lib/fetch';
	import { schema, surveyValues, previousPage, type FormValues } from '$lib/store';
	import { perceptionIndexImages } from '$lib/surveyObjects';
	import LinearProgress from '@smui/linear-progress';
	import { goto } from '$app/navigation';
	import ImageCard from '$lib/ImageCard.svelte';

	let formValues: FormValues = {};
	const unsubscribe = surveyValues.subscribe((data) => {
		formValues = data;
	});

	onDestroy(unsubscribe);

	onMount(async () => {
		document.body.scrollIntoView();
	});

	const handleSubmit = async () => {
		console.log('2', formValues);
		try {
			await schema.validate(formValues, { abortEarly: false });
			surveyValues.update(() => formValues);
			await sendToSupabase($surveyValues);
			console.log('data sent');
			goto('/3');
		} catch (error) {
			console.log('Errors enviant dades', error);
		}
	};

	const handlePrevious = () => {
		schema
			.validate(formValues, { abortEarly: false })
			.then(function (valid) {
				surveyValues.update(() => formValues);
				goto('/1');
			})
			.catch(function (valid) {
				errors = valid.inner.reduce(
					(acc, d) => ({ ...acc, [d.path]: { value: d.value, message: d.message } }),
					{}
				);
				console.log(errors);
			});
	};
</script>

<div class="section-title">Índex de percepció</div>
<div>Pàgina 3 de 3</div>
<LinearProgress progress={1} />

<div>Seleccioni la imatge que millor resumeixi la situació viscuda</div>
<div class="image-list">
	{#each perceptionIndexImages as image}
		<ImageCard
			imageUrl={image.imageLink}
			label={image.text}
			selected={formValues.perceptionImage === image.value}
			on:click={() => {
				formValues.perceptionImage = image.value;
			}}
		/>
	{/each}
</div>

<div class="buttons">
	<Button variant="raised" on:click={handlePrevious}>Anterior</Button>
	<Button variant="raised" on:click={handleSubmit}>Enviar el formulari</Button>
</div>

<style lang="scss">
	@use '@material/image-list/index' as image-list;

	.image-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}

	@media (max-width: 600px) {
		.image-list {
			grid-template-columns: 1fr; /* Changes to single column */
		}
	}

	.section-title {
		font-weight: bold;
		display: flex;
		font-family: Roboto, sans-serif;
		padding-bottom: 10px;
	}
</style>
