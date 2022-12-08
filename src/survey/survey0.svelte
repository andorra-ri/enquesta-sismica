<script lang="ts">
	import Button from '@smui/button';
	import Card from '@smui/card';
	import FormField from '@smui/form-field';
	import LinearProgress from '@smui/linear-progress';
	import Radio from '@smui/radio';
	import Select, { Option } from '@smui/select';
	import Switch from '@smui/switch';
	import Textfield from '@smui/textfield';
	import { onMount , onDestroy} from 'svelte';
	import { getParroquiesData, getSeismData, type ParroquiaData, type SeismsData } from './fetch';
	import Leaflet from './leaflet.svelte';
	import { nextPage, schema, surveyValues, type FormValues } from './store';
	import {
		floorOptions,
		numberPeopleAwake,
		numberPeopleGoingOutOptions,
		numberPeopleInsideOptions,
		numberPeopleOutsideOptions,
		positionOptions,
		situationObserverOptions,
        totalFloorOptions
	} from './surveyObjects';

	let seisms: SeismsData[] = [];
	let parroquies: ParroquiaData[] = [];

	let formValues: FormValues = {};
	const unsubscribe = surveyValues.subscribe((data) => {
		formValues = data;
	});

	onDestroy(unsubscribe);
	onMount(async () => {
		seisms = await getSeismData();
		parroquies = await getParroquiesData();
	});

	const setCoordinates = (coords: [number, number]) => {
		formValues.coordinates = coords;
	};

	let feltSeism: boolean = formValues.felt ==='yes' ? true :  false;

	$: feltSeism, (formValues.felt = feltSeism ? 'yes' : 'no');

	let pais: string | undefined;
	let parroquia: string | undefined;
	let municipality: string = '';

	$: {
		formValues.pais = pais;
		parroquia = undefined;
		pais;
		formValues.territori = undefined;
		municipality = '';
	}

	$: {
		formValues.parroquia = parroquia;
		formValues.territori = undefined;
	}

	$: {
		formValues.municipality = municipality;
	}

	type Error = Record<
		string,
		{
			message: string;
			value: string;
		}
	>;
	let errors: Error[] = [];

	const handleSubmit = () => {
		schema
			.validate(formValues, { abortEarly: false })
			.then(function (valid) {
				console.log('VALID  !');
				surveyValues.update(() => formValues);
				nextPage();}
			)
			.catch(function (valid) {
				errors = valid.inner.reduce(
					(acc, d) => ({ ...acc, [d.path]: { value: d.value, message: d.message } }),
					{}
				);
				console.log(errors);
			});
	};

	// Workaround so it works on Chrome: https://github.com/hperrin/svelte-material-ui/issues/268#issuecomment-1227112762
	function dateClicked(e) {
		if (e.target?.nodeName === 'INPUT') {
			e.target.showPicker();
		}
	}
</script>

<div class="header">
	<img src="images/logo.png" alt="logo" class="logo" />
	<div>
		<div class="title">Enquesta sísmica</div>
		<p>
			Per tal d'avaluar la o les intensitats amb les quals s’ha notat el terratrèmol al territori
			andorrà, li agrairíem que ompli la següent enquesta sísmica de la manera més detallada
			possible.
		</p>
		<p>
			Encara que no hagi notat el terratrèmol, la seva informació és igualment útil. Gràcies per la
			seva col·laboració.
		</p>
	</div>
</div>
<LinearProgress progress={0.333}>Pàgina 1 de 3</LinearProgress>
<Card padded class={'existentSeism' in errors ? 'error' : 'valid'}>
	<div>Surt el sisme que ha percebut o no a la llista inferior?</div>
	<FormField>
		<Radio bind:group={formValues.existentSeism} value="yes" touch />
		<span slot="label">Sí, triar de la llista de sota</span>
	</FormField>
	<FormField>
		<Radio bind:group={formValues.existentSeism} value="no" touch />
		<span slot="label">No apareix a la llista. Introduir la data i hora manualment</span>
	</FormField>
</Card>
<!-- if length is not checked, option doesn't exist before loading seisms and seismuuid is set to undefined! -->
{#if formValues.existentSeism === 'yes' && seisms.length > 0}
	<Card padded class={'seism' in errors ? 'error' : 'valid'}>
		<div>Triï el sisme *</div>
		<FormField>
			<Select style="min-width: 300px" label="Data del sisme" bind:value={formValues.seism}>
				{#each seisms as seism}
					<Option value={seism.guid}
						>{`${new Date(seism.datetime).toLocaleDateString('ca-ES', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							timeZone: 'CET'
						})} ${new Date(seism.datetime).toLocaleTimeString('ca-ES', {
							hour: '2-digit',
							minute: '2-digit',
							timeZone: 'CET'
						})}`}</Option
					>
				{/each}
			</Select>
		</FormField>
	</Card>
{:else}<Card padded class="halign">
		<div class={'earthquakeDate' in errors ? 'error' : 'valid'}>
			<FormField>
				<div>Data del terratrèmol *</div>
				<Textfield on:click={dateClicked} bind:value={formValues.earthquakeDate} type="date" />
			</FormField>
		</div>
		<div class={'earthquakeHour' in errors ? 'error' : 'valid'}>
			<FormField>
				<div>Hora local (HH:MM) *</div>
				<Textfield bind:value={formValues.earthquakeHour} type="time" />
			</FormField>
		</div></Card
	>
{/if}

<Card padded class={'felt' in errors ? 'error' : 'valid'}>
	<div>Ha notat el sisme? *</div>
	<FormField>
		<Switch bind:checked={feltSeism} />
		{feltSeism ? 'Sí' : 'No'}
	</FormField>
</Card>
<Card padded>
	<Select
		style="min-width: 300px"
		label="En el moment de la sacsejada es trobava..."
		bind:value={formValues.position}
	>
		{#each Object.entries(positionOptions) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
	<div >
		{#if formValues.position === 'insideBuilding'}
			<div>
				<Select style="min-width: 300px" label="Al pis" bind:value={formValues.floor}>
					{#each Object.entries(floorOptions) as [floor, floorText]}
						<Option value={floor}>
							{floorText}
						</Option>
					{/each}
				</Select>
			</div>
		{/if}

		{#if formValues.position === 'insideBuilding'}
			<div>
				<Select
					style="min-width: 300px"
					label="Nombre total de plantes"
					bind:value={formValues.totalFloors}
				>
					{#each Object.entries(totalFloorOptions) as [floor, floorText]}
						<Option value={floor}>
							{floorText}
						</Option>
					{/each}
				</Select>
			</div>
		{/if}
	</div>

	{#if formValues.position === 'other'}
		<div>
			<span class="field-label">Indiqui on es trobava:</span>
			<Textfield style="width:70%" bind:value={formValues.commentsPosition} type="email" />
		</div>
	{/if}
</Card>
<Card padded>
	{#if formValues.position !== 'insideBuilding'}
	<div class={'locationMap' in errors ? 'error' : 'valid'}>
		<div>Voleu triar la ubicació amb un mapa?</div>
		<FormField>
			<Radio bind:group={formValues.locationMap} value="yes" touch />
			<span slot="label">Seleccioneu la ubicació el més detallada possible arrossegant la icona blava del mapa</span>
		</FormField>
		<FormField>
			<Radio bind:group={formValues.locationMap} value="no" touch />
			<span slot="label"
				>No, afegir la ubicació a mà (trieu aquesta opció si sabeu l'adreça exacta)</span
			>
		</FormField>
	</div>
	{/if}

	{#if formValues.locationMap === 'no' || formValues.position === 'insideBuilding'}
		
		<div
			class={'pais' in errors || 'parroquia' in errors || 'territori' in errors ? 'error' : 'valid'}
		>
			<FormField>
				<Select bind:value={pais} label="País">
					{#each ['Andorra', 'Espanya', 'França'] as country}
						<Option value={country}>{country}</Option>
					{/each}
				</Select>
				<span slot="label">País on es trobava en el moment del terratrèmol</span>
			</FormField>
			{#if formValues.pais === 'Andorra'}
				<FormField>
					<Select disabled={formValues.pais !== 'Andorra'} bind:value={parroquia} label="Parròquia">
						{#each [...new Set(parroquies.map((d) => d.parroquia))] as parroquia}
							<Option value={parroquia}>{parroquia}</Option>
						{/each}
					</Select>
					<span slot="label">Parròquia on es trobava en el moment del terratrèmol</span>
				</FormField>

				<FormField>
					<Select
						disabled={!formValues.parroquia}
						bind:value={formValues.territori}
						label="Territori"
					>
						{#each parroquies
							.filter((d) => d.parroquia === formValues.parroquia)
							.map((d) => d.territori) as territori}
							<Option value={territori}>{territori}</Option>
						{/each}
					</Select>
					<span slot="label"
						>Territori dins la parròquia on es trobava en el moment del terratrèmol</span
					>
				</FormField>
			{:else if formValues.pais === 'Espanya' || formValues.pais === 'França'}
				<FormField>
					<Textfield bind:value={municipality} type="email" />
					<span slot="label">Municipi on es trobava en el moment del terratrèmol</span>
				</FormField>
			{/if}
			{#if !!formValues.pais}
				<FormField>
					<Textfield bind:value={formValues.street} type="email" />
					<span slot="label">Carrer</span>
				</FormField>

				<FormField>
					<Textfield bind:value={formValues.streetNumber} type="email" />
					<span slot="label">Número</span>
				</FormField>
			{/if}
		</div>

		
	{:else}
	<Leaflet onChange={setCoordinates} /> 
	{/if}
</Card>

<Card padded>
	<FormField>
		<Select
			style="min-width: 300px"
			label="En el moment de la sacsejada, estava..."
			bind:value={formValues.situationObserver}
		>
			{#each Object.entries(situationObserverOptions) as [situationObserver, situationObserverText]}
				<Option value={situationObserver}>
					{situationObserverText}
				</Option>
			{/each}
		</Select>
	</FormField>

	{#if formValues.situationObserver === 'other'}
		<div>
			<span class="field-label">Indiqui què estava fent:</span>
			<Textfield bind:value={formValues.commentsBuilding} type="email" />
		</div>
	{/if}
</Card>
<Card padded>
	{#if formValues.position === 'insideBuilding'}
		<div class="radio-group">
			<p>A prop seu, quantes persones van percebre el terratrèmol?</p>
			{#each Object.entries(numberPeopleInsideOptions) as [numberPeople, numberPeopleText], i}
				{#if i > 0 && i % 3 === 0}
					<br />
				{/if}
				<FormField style="min-width: 250px">
					<Radio bind:group={formValues.numberPeopleInside} value={numberPeople} />
					<span slot="label">
						{numberPeopleText}
					</span>
				</FormField>
			{/each}
		</div>
	{/if}

	{#if formValues.position !== 'insideBuilding'}
		<div class="radio-group">
			<p>A prop seu, quantes persones van percebre el terratrèmol?</p>
			{#each Object.entries(numberPeopleOutsideOptions) as [numberPeople, numberPeopleText], i}
				{#if i > 0 && i % 3 === 0}
					<br />
				{/if}
				<FormField style="min-width: 250px">
					<Radio bind:group={formValues.numberPeopleOutside} value={numberPeople} />
					<span slot="label">
						{numberPeopleText}
					</span>
				</FormField>
			{/each}
		</div>
	{/if}
</Card>
<Card padded>
	<div class="radio-group">
		<p>A prop seu, quantes persones van córrer espantades al carrer?</p>
		{#each Object.entries(numberPeopleGoingOutOptions) as [numberPeople, numberPeopleText], i}
			{#if i > 0 && i % 3 === 0}
				<br />
			{/if}
			<FormField style="min-width: 250px">
				<Radio bind:group={formValues.numberPeopleGoingOut} value={numberPeople} />
				<span slot="label">
					{numberPeopleText}
				</span>
			</FormField>
		{/each}
	</div>
</Card>
<Card padded>
	<div class="radio-group">
		<p>A prop seu, quantes persones es van despertar?</p>
		{#each Object.entries(numberPeopleAwake) as [numberPeople, numberPeopleText], i}
			{#if i > 0 && i % 3 === 0}
				<br />
			{/if}
			<FormField style="min-width: 250px">
				<Radio bind:group={formValues.numberPeopleAwake} value={numberPeople} />
				<span slot="label">
					{numberPeopleText}
				</span>
			</FormField>
		{/each}
	</div>
</Card>

<div class="buttons">
	{#if Object.keys(errors).length > 0}
		<div class="error">
			{#each Object.entries(errors) as [fieldName, error]}
				<div>{fieldName}: {error.message}</div>
			{/each}
		</div>
	{/if}

	<Button variant="raised" type="submit" on:click={handleSubmit}>Següent</Button>
</div> 

<style>
	.error {
		border-style: dotted;
		border-color: red;
		border-width: 1px;
		background-color: rgba(255, 0, 0, 0.05);
	}
	.header {
		font-weight: bold;
		font-family: Roboto, sans-serif;
		padding-bottom: 10px;
		display: flex;
	}
	.header img {
		max-width: 500px;
	}

 @media(max-width: 800px){
	.header{
			display:flex;
			flex-direction:column;
		}
	}
	.title {
		font-size: 2em;
	}
	.logo {
		max-height: 64px;
	}
	:global(.halign) {
		display: flex;
		flex-direction: row;
	}
	:global(.mdc-card) {
		margin-top: 10px;
	}
	.field-label {
		font-family: Roboto, sans-serif;
		font-size: 14px;
	}
	.buttons{
		margin-top:5px;
	}
</style>
