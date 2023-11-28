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
<div class="image-list-masonry">
	<ImageList masonry>
		{#each perceptionIndexImages.reduce((acc, cur, i)=> {
			/*Had to reorder since masonry can't be in rows and other options don't work*/
			const row= i%3;
			const col = (i-row)/3;
			acc[col+row*3]=cur;
			return acc;
			}, new Array(perceptionIndexImages.length)) as image}
			<Item
				on:click={() => (formValues.perceptionImage = image.value)}
				class={formValues.perceptionImage === image.value && 'selected-image'}
				StyleSheet
			>
				<ImageAspectContainer>
					<Image src={image.imageLink} alt={image.text} />
				</ImageAspectContainer>
				<Supporting>
					<Label>{image.text}</Label>
				</Supporting>
			</Item>
		{/each}
	</ImageList>
</div>

<div class="buttons">
	<Button variant="raised" on:click={handlePrevious}>Anterior</Button>
	<Button variant="raised" on:click={handleSubmit}>Enviar el formulari</Button>
</div>

<style lang="scss">
	@use '@material/image-list/index' as image-list;

	.image-list-masonry {
		@include image-list.masonry-columns(3);
		@include image-list.shape-radius(10px);
		max-width: 599px;
		padding-bottom: 10px;
	}

	:global(.selected-image) {
		border-style: dotted;
		border-color: #ff3e00;
		border-width: 1px;
		background-color: whitesmoke;
	}
	:global(.mdc-image-list__image-aspect-container) {
		padding-bottom: calc(100% / 1.2);
	
	}
	@media (max-width: 599px) {
		.image-list-masonry {
			@include image-list.masonry-columns(1);
		}
		:global(.mdc-image-list__image-aspect-container) {
			padding-bottom: 45%;
		}
	}
	

	:global(.mdc-image-list){
		background-color: #e8dff5;
	}
	.section-title {
		font-weight: bold;
		display: flex;
		font-family: Roboto, sans-serif;
		padding-bottom: 10px;
	}
</style>
