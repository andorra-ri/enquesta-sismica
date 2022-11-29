<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import Card from '@smui/card';
	import Radio from '@smui/radio';

	import Select, { Option } from '@smui/select';
	import { changePage, schema, surveyValues, type FormValues } from './store';
	import Button from '@smui/button';
	import LinearProgress from '@smui/linear-progress';

	import {
		animalsFrightened,
		buildingDamage,
		buildingDamageDescription,
		buildingType,
		effectsDoorsWindows,
		effectsFurniture,
		effectsLamps,
		effectsLiquids,
		effectsPaintings,
		effectsPlants,
		effectsShelves,
		movementDescription,
		noise,
		reaction,
		standingDifficulty,
		whatDidYouDo
	} from './surveyObjects';
	import Textfield from '@smui/textfield';
	import FormField from '@smui/form-field';
	import Dropzone from 'svelte-file-dropzone';
	import { uploadImage } from './fetch';

	let formValues: FormValues = {};
	let publicUrl: string;
	surveyValues.subscribe((data) => {
		formValues = data;
	});
	interface Files {
		accepted: string[];
		rejected: string[];
	}
	let files: Files = {
		accepted: [],
		rejected: []
	};
	const handleFilesSelect = async (e) => {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
		console.log(files.accepted);
		const fileToUpload = files.accepted[0];
		const fileName = `public/${uuidv4()}.jpg`;
		publicUrl = await uploadImage(fileName, fileToUpload);

		formValues.image = fileName;
	};

	let errors: Error[] = [];
	const handleSubmit = () => {
		schema
			.validate(formValues, { abortEarly: false })
			.then(function (valid) {
				console.log('VALID  !');
				surveyValues.update(() => formValues);
				changePage();
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

<div class="section-title">Percepció personal</div>
<LinearProgress progress={0.666}>Pàgina 2 de 3</LinearProgress>

<Card padded>
	<Select
		style="max-width: 400px"
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
	<Select style="max-width: 400px" label="Va sentir soroll?" bind:value={formValues.noise}>
		{#each Object.entries(noise) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
</Card>

<Card padded>
	<Select
		style="max-width: 400px"
		label="Quina reacció va tenir durant el terratrèmol?"
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
		<p>Es van espantar els animals?</p>
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
		label="Què va fer durant la sacsejada?"
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
			<Textfield style="width:70%" bind:value={formValues.commentsWhatDidYouDo} type="email" />
		</FormField>
	{/if}
</Card>
<Card padded>
	<Select style="max-width: 400px" label="Als llums penjats:" bind:value={formValues.effectsLamps}>
		{#each Object.entries(effectsLamps) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
</Card>

<Card padded>
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
</Card>

<Card padded>
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
</Card>

<Card padded>
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
</Card>

<Card padded>
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
</Card>

<Card padded>
	<Select style="max-width: 400px" label="A les plantes:" bind:value={formValues.effectsPlants}>
		{#each Object.entries(effectsPlants) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
</Card>

<Card padded>
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
		<Textfield style="width: 70%" bind:value={formValues.commentseffectsShelves} type="email" />
	</FormField>
</Card>
<Card padded>
	<Select
		style="max-width: 400px"
		label="La construcció de l'edifici és del tipus:"
		bind:value={formValues.buildingType}
	>
		{#each Object.entries(buildingType) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>

	<FormField>
		<div>Any de construcció de l'edifici (si el sap)</div>
		<Textfield bind:value={formValues.buildingYear} type="number" />
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
		<div>
			<Select
				style="max-width: 400px"
				label="Quins danys va observar?"
				bind:value={formValues.buildingDamageDescription}
			>
				{#each Object.entries(buildingDamageDescription) as [position, positionText]}
					<Option value={position}>
						{positionText}
					</Option>
				{/each}
			</Select>
		</div>
		<FormField>
			<div>Altres comentaris sobre els danys</div>
			<Textfield bind:value={formValues.commentsDamage} type="email" />
		</FormField>
	{/if}

	<FormField>
		<div>Desitgeu afegir algun aclariment o descriure el que heu notat?</div>
		<Textfield style="width: 70%" bind:value={formValues.comments} type="email" />
	</FormField>
</Card>
<Card padded>
	<FormField>
		<div>
			Si just abans o després d'aquest terratrèmol en va notar d'altres indiqui-ho a continuació
		</div>
		<Textfield style="width: 70%" bind:value={formValues.otherSeisms} type="email" />
	</FormField>
</Card>
{#if formValues.felt === 'yes' && !formValues.image}
	<Card padded>
		<div>Afegeix una foto si en tens:</div>
		<Dropzone on:drop={handleFilesSelect}
			>Arrossega el fitxer o fes clic per afegir les imatges</Dropzone
		>
	</Card>
{/if}

{#if formValues.image}
	<Card padded>
		<img src={publicUrl} alt="imatge de l'usuari" />
	</Card>
{/if}
<div><Button type="submit" on:click={handleSubmit}>Següent</Button></div>

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
</style>
