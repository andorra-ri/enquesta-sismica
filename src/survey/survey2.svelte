<script lang="ts">
	import Button from '@smui/button';

	import ImageList, {
		Item,
		ImageAspectContainer,
		Image,
		Supporting,
		Label
	} from '@smui/image-list';
	import { sendToSupabase } from './fetch';
	import { schema, surveyValues, type FormValues } from './store';
	import { perceptionIndexImages } from './surveyObjects';
	import LinearProgress from '@smui/linear-progress';

	let formValues: FormValues = {};
	surveyValues.subscribe((data) => {
		formValues = data;
	});

	const handleSubmit = async () => {
		try {
			await schema.validate(formValues, { abortEarly: false });
			surveyValues.update(() => formValues);
			await sendToSupabase($surveyValues);
			console.log('data sent');
		} catch (error) {
			console.log('Errors enviant dades', error);
		}
	};
</script>

<div class="section-title">Índex de percepció</div>
<LinearProgress progress={1}>Pàgina 1 de 3</LinearProgress>

<div>Seleccioni la imatge que millor resumeixi la situació viscuda</div>
<div class="image-list-masonry">
	<ImageList masonry>
		{#each perceptionIndexImages as image}
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
<Button type="submit" on:click={handleSubmit}>Enviar el formulari</Button>

<style lang="scss">
	@use '@material/image-list/index' as image-list;

	.image-list-masonry {
		@include image-list.masonry-columns(2);
		@include image-list.shape-radius(10px);
		max-width: 599px;
	}

	:global(.selected-image) {
		border-style: dotted;
		border-color: #ff3e00;
		border-width: 1px;
		background-color: whitesmoke;
	}

	@media (max-width: 599px) {
		.image-list-masonry {
			@include image-list.masonry-columns(1);
		}
	}
	:global(.mdc-image-list__image-aspect-container) {
		padding-bottom: calc(100% / 1.2);
	}
	.section-title {
		font-weight: bold;
		display: flex;
		font-family: Roboto, sans-serif;
		padding-bottom: 10px;
	}
</style>
