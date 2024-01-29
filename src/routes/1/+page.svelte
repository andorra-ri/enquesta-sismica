<script lang="ts">
	import Card from '@smui/card';
	import Checkbox from '@smui/checkbox';
	import Radio from '@smui/radio';
	import { v4 as uuidv4 } from 'uuid';
	import { onDestroy, onMount } from 'svelte';

	import Button from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
	import Select, { Option } from '@smui/select';
	import { nextPage, previousPage, schema, surveyValues, type FormValues } from '$lib/store';

	import FormField from '@smui/form-field';
	import Textfield from '@smui/textfield';
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { ImageAspectContainer, Image } from '@smui/image-list';
	import { uploadImage } from '$lib/fetch';
	import {
		animalsFrightened,
		buildingDamage,
		buildingDamageDescription,
		buildingType,
		effectsDoorsWindows,
		effectsFurniture,
		effectsLamps,
		effectsLiquids,
		effectsOnLandscape,
		effectsPaintings,
		effectsPlants,
		effectsShelves,
		movementDescription,
		noise,
		otherSeisms,
		reaction,
		standingDifficulty,
		whatDidYouDo
	} from '$lib/surveyObjects';
	import { goto } from '$app/navigation';

	let formValues: FormValues = {};
	let publicUrl: string;
	const unsubscribe = surveyValues.subscribe((data) => {
		formValues = data;
	});

	onDestroy(unsubscribe);

	onMount(async () => {
		document.body.scrollIntoView();
	});

	interface Files {
		accepted: string[];
		rejected: string[];
	}

	let files: Files = {
		accepted: [],
		rejected: []
	};
	let publicUrls: string[] = [];

	const handleFilesSelect = async (e) => {
		const { acceptedFiles, fileRejections } = e.detail;

		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
		const fileNames: string[] = [];
		const newPublicUrls: string[] = [];

		for (const fileToUpload of files.accepted) {
			const fileName = `public/${uuidv4()}.jpg`;
			publicUrl = await uploadImage(fileName, fileToUpload);
			fileNames.push(fileName);
			newPublicUrls.push(publicUrl);
		}

		publicUrls = newPublicUrls;
		formValues.image = fileNames;
	};
	let errors: Error[] = [];
	const handleSubmit = () => {
		console.log('1', formValues);
		schema
			.validate(formValues, { abortEarly: false })
			.then(function (valid) {
				console.log('VALID  !', valid);
				surveyValues.update(() => formValues);
				goto('/2');
			})
			.catch(function (valid) {
				console.log('error in validation', valid.inner);
				errors = valid.inner.reduce(
					(acc, d) => ({
						...acc,
						[d.path]: { value: d.value, message: d.message }
					}),
					{}
				);
				console.log(errors);
			});
	};

	const handlePrevious = () => {
		schema
			.validate(formValues, { abortEarly: false })
			.then(function (valid) {
				surveyValues.update(() => formValues);
				goto('/');
			})
			.catch(function (valid) {
				errors = valid.inner.reduce(
					(acc, d) => ({
						...acc,
						[d.path]: { value: d.value, message: d.message }
					}),
					{}
				);
				console.log(errors);
			});
	};

	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
</script>

<div class="section-title">Percepció personal</div>
<div>Pàgina 2 de 3</div>
<LinearProgress progress={0.666} />

<Card padded>
	<Select
		style="max-width: 430px"
		label="Com descriuria el moviment durant el terratrèmol?"
		bind:value={formValues.movementDescription}
	>
		{#each Object.entries(movementDescription) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
</Card>

<Card padded>
	<Select style="max-width: 430px" label="Va sentir soroll?" bind:value={formValues.noise}>
		{#each Object.entries(noise) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
</Card>

<Card padded>
	<Select
		style="max-width: 430px"
		label="Què va fer durant el terratrèmol?"
		bind:value={formValues.reaction}
	>
		{#each Object.entries(reaction) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
</Card>

<Card padded>
	<div class="radio-group">
		<p>Li va resultar difícil estar dret durant el terratrèmol?</p>
		{#each Object.entries(standingDifficulty) as [position, positionText], i}
			{#if i > 0 && i % 4 === 0}
				<br />
			{/if}
			<FormField style="min-width: 250px">
				<Radio bind:group={formValues.standingDifficulty} value={position} />
				<span slot="label">
					{positionText}
				</span>
			</FormField>
		{/each}
	</div>
</Card>

<Card padded>
	<div class="radio-group">
		<p>Si tenia animals a la vora, es van espantar?</p>
		{#each Object.entries(animalsFrightened) as [position, positionText], i}
			{#if i > 0 && i % 4 === 0}
				<br />
			{/if}
			<FormField style="min-width: 250px">
				<Radio bind:group={formValues.animalsFrightened} value={position} />
				<span slot="label">
					{positionText}
				</span>
			</FormField>
		{/each}
	</div>
</Card>

<Card padded>
	<Select
		style="max-width: 400px"
		label="Què va fer durant la terratrèmol?"
		bind:value={formValues.whatDidYouDo}
	>
		{#each Object.entries(whatDidYouDo) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>

	{#if formValues.whatDidYouDo === 'other'}
		<FormField>
			<div>Indiqui què va fer:</div>
			<Textfield style="width:70%" bind:value={formValues.commentsWhatDidYouDo} type="text" />
		</FormField>
	{/if}
</Card>

{#if formValues.position === 'insideBuilding'}
	<Card padded>
		<div>Quins efectes va observar sobre els següents objectes?</div>
		<Select
			style="max-width: 400px"
			label="Als líquids en recipients:"
			bind:value={formValues.effectsLiquids}
		>
			{#each Object.entries(effectsLiquids) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>
		<Select
			style="max-width: 400px"
			label="Als quadres penjats a les parets:"
			bind:value={formValues.effectsPaintings}
		>
			{#each Object.entries(effectsPaintings) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>
		<Select
			style="max-width: 400px"
			label="Als llums penjats:"
			bind:value={formValues.effectsLamps}
		>
			{#each Object.entries(effectsLamps) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>

		<Select
			style="max-width: 400px"
			label="A portes i finestres:"
			bind:value={formValues.effectsDoorsWindows}
		>
			{#each Object.entries(effectsDoorsWindows) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>

		<Select
			style="max-width: 400px"
			label="A mobles i electrodomèstics:"
			bind:value={formValues.effectsFurniture}
		>
			{#each Object.entries(effectsFurniture) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>

		<Select style="max-width: 400px" label="A les plantes:" bind:value={formValues.effectsPlants}>
			{#each Object.entries(effectsPlants) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>

		<Select
			style="max-width: 400px"
			label="Als objectes a les prestatgeries o taules:"
			bind:value={formValues.effectsShelves}
		>
			{#each Object.entries(effectsShelves) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>

		<FormField style="width: 100%">
			<div>Descriviu, si voleu, quins objectes van vibrar o van caure:</div>
			<Textfield style="width: 70%" bind:value={formValues.commentseffectsShelves} type="text" />
		</FormField>
	</Card>
	<Card padded>
		<div class="radio-group">
			<p>La construcció de l'edifici és del tipus:</p>
			{#each Object.entries(buildingType) as [position, positionText], i}
				<div class="building-type">
					<FormField style="min-width: 250px">
						<Radio bind:group={formValues.buildingType} value={position} />

						<span slot="label">
							{positionText}
						</span>
					</FormField>
					{#if position !== 'notSpecified' && position !== 'typeD'}
						<Image src={`images/${position}.png`} alt={position} />
					{/if}
				</div>
			{/each}
		</div>
		<FormField>
			<div>Any de construcció de l'edifici (si el sap)</div>
			<Textfield bind:value={formValues.buildingYear} />
		</FormField>
	</Card>

	<Card padded>
		<Select
			style="max-width: 400px"
			label="Va observar danys a l'edifici?"
			bind:value={formValues.buildingDamage}
		>
			{#each Object.entries(buildingDamage) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>

		{#if formValues.buildingDamage === 'yes'}
			<div>Marqui tots els danys que va observar:</div>
			<div class="two-column">
				{#each Object.entries(buildingDamageDescription) as [position, positionText], i (i)}
					<FormField>
						<Checkbox bind:group={formValues.buildingDamageDescription} value={position} />
						<span slot="label">{alphabet[i]}) {positionText}</span>
					</FormField>
				{/each}
			</div>
			<div>
				<FormField style="width: 100%">
					<div>Altres comentaris sobre els danys a l'edifici</div>
					<Textfield bind:value={formValues.commentsDamage} style="width: 100%" type="text" />
				</FormField>
			</div>
		{/if}

		{#if formValues.buildingDamage === 'yes'}
			<div>Afegeixi fotos dels danys si en té:</div>
			<Dropzone on:drop={handleFilesSelect}
				>Arrossega els fitxers o fes clic per afegir les imatges</Dropzone
			>
		{/if}

		{#each publicUrls as imageUrl}
			<img src={imageUrl} width="500px" alt="imatge de l'usuari" />
		{/each}
	</Card>
{/if}
<Card padded>
	<div>Marqui si va observar efectes sobre l’entorn:</div>
	<div class="two-column">
		{#each Object.entries(effectsOnLandscape) as [position, positionText]}
			<FormField>
				<Checkbox bind:group={formValues.effectsOnLandscape} value={position} />
				<span slot="label">{positionText}</span>
			</FormField>
		{/each}
	</div>
</Card>
<Card padded>
	<div>Desitgeu afegir algun aclariment o descriure el que heu notat?</div>
	<FormField>
		<Textfield style="width: 70%" bind:value={formValues.comments} type="text" />
	</FormField>

	<div style="padding-top: 15px">
		Just abans o després d'aquest terratrèmol en va notar d'altres?
	</div>

	<FormField>
		<Select style="width: 525px" bind:value={formValues.otherSeisms}>
			{#each Object.entries(otherSeisms) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>
	</FormField>
	{#if formValues.otherSeisms === 'yes'}
		<FormField>
			<div>Què va notar i quan?</div>
			<Textfield style="width: 70%" bind:value={formValues.otherSeismsText} type="text" />
		</FormField>
	{/if}
</Card>

<div class="buttons">
	<Button variant="raised" on:click={handlePrevious}>Anterior</Button>
	<Button variant="raised" on:click={handleSubmit}>Següent</Button>
</div>

<style>
	.section-title {
		font-weight: bold;
		display: flex;
		font-family: Roboto, sans-serif;
		padding-bottom: 10px;
	}
	.radio-group {
		font-family: Roboto, sans-serif;
	}
	.building-type {
		display: flex;
		align-items: center;
	}

	@media (min-width: 800px) {
		.two-column {
			font-family: Roboto, sans-serif;
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 800px) {
		.two-column {
			display: flex;
			flex-direction: column;
		}
	}
	.buttons {
		margin-top: 5px;
	}

	:global(.mdc-image-list__image) {
		max-width: 200px;
		max-height: 200px;
	}
</style>
