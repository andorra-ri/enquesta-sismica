<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		getOneSeismData,
		getParroquiesData,
		getSeismData,
		type ParroquiaData,
		type SeismsData
	} from '$lib/fetch';
	import Leaflet from '$lib/leaflet.svelte';
	import { schema, surveyValues, type FormValues } from '$lib/store';
	import {
		floorOptions,
		numberPeopleAwake,
		numberPeopleGoingOutOptions,
		numberPeopleInsideOptions,
		numberPeopleOutsideOptions,
		positionOptions,
		situationObserverOptions,
		streetTypes,
		totalFloorOptions,
		yesNo
	} from '$lib/surveyObjects';
	import Button from '@smui/button';
	import Card from '@smui/card';
	import FormField from '@smui/form-field';
	import LinearProgress from '@smui/linear-progress';
	import Radio from '@smui/radio';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	const initialSeismId = $page.url.searchParams.get('id');

	let seisms: SeismsData[] = [];
	let parroquies: ParroquiaData[] = [];

	let formValues: FormValues = {};
	const unsubscribe = surveyValues.subscribe((data) => {
		formValues = data;
	});

	onDestroy(unsubscribe);
	let selectedSeism: string | undefined;
	onMount(async () => {
		parroquies = (await getParroquiesData()) ?? [];
		seisms = await getSeismData();
		if (seisms.length === 0) {
			formValues.existentSeism = 'no';
		}
		if (initialSeismId) {
			if (seisms.findIndex((d) => d.guid === initialSeismId) === -1) {
				const missingSeism = await getOneSeismData(initialSeismId);

				if (missingSeism) {
					seisms = [...seisms, missingSeism];
				}
			}
			selectedSeism = initialSeismId;
			formValues.existentSeism = 'yes';
		}
	});

	const setCoordinates = (coords: [number, number]) => {
		formValues.coordinates = coords;
	};

	let pais: string | undefined;
	let parroquia: string | undefined;
	let territori: string | undefined;
	let municipality: string;

	$: {
		formValues.pais = pais;
		parroquia = undefined;
		pais;
		formValues.territori = undefined;
		municipality = '';
	}

	$: {
		formValues.parroquia = parroquia ? parseInt(parroquia) : undefined;
		formValues.territori = undefined;
	}

	$: {
		formValues.municipality = municipality;
	}

	$: {
		formValues.territori = territori ? parseInt(territori) : undefined;
	}

	$: {
		if (selectedSeism !== 'new') {
			formValues.seism = selectedSeism;
			formValues.existentSeism = 'yes';
		} else {
			formValues.existentSeism = 'no';
		}
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
				goto('/1');
			})
			.catch(function (valid) {
				console.log(valid);
				errors = valid.inner.reduce(
					(acc, d) => ({ ...acc, [d.path]: { value: d.value, message: d.message } }),
					{}
				);
				console.log(errors, formValues);
			});
	};

	// Workaround so it works on Chrome: https://github.com/hperrin/svelte-material-ui/issues/268#issuecomment-1227112762
	function dateClicked(e) {
		if (e.target?.nodeName === 'INPUT') {
			e.target.showPicker();
		}
	}

	let geocodingSearch: string = '';
	let geocodingCoords: { lon: number; lat: number } | undefined = undefined;

	const getGeocoding = async () => {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${geocodingSearch}&limit=1&format=jsonv2`
		);
		const data: { lon: string; lat: string }[] = await res.json();
		if (data.length > 0)
			geocodingCoords = { lon: parseFloat(data[0].lon), lat: parseFloat(data[0].lat) };
		return data;
	};
</script>

<svelte:head>
	<title>Enquesta sísmica</title>
	<meta name="description" content="Enquesta sísmica Andorra Recerca i Innovació" />
</svelte:head>
<div class="header">
	<img src="images/logo.png" alt="logo" class="logo" />
	<div>
		<div class="title">Enquesta sísmica</div>
		<p>
			Per tal d'avaluar la intensitat amb la qual s’ha notat el terratrèmol al territori andorrà,
			agrairíem que omplís la següent enquesta sísmica de la manera més detallada possible.
		</p>
		<p>
			Encara que no hagi notat el terratrèmol, la seva informació és igualment útil. Gràcies per la
			seva col·laboració.
		</p>
	</div>
</div>
<div>Pàgina 1 de 3</div>
<LinearProgress progress={0.333} />

<!-- if length is not checked, option doesn't exist before loading seisms and seismuuid is set to undefined! -->
{#if formValues.existentSeism === 'yes' && seisms.length > 0}
	<Card padded class={'seism' in errors ? 'error' : 'valid'}>
		<div class="mandatory">Triï el terratrèmol *</div>
		<FormField>
			<Select style="min-width: 400px" label="Data del terratrèmol" bind:value={selectedSeism}>
				<Option value="new">Cap d'aquesta llista</Option>
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
						})} (${seism.region}). Mag:${seism.magnitude.toFixed(1)}`}</Option
					>
				{/each}
			</Select>
		</FormField>
	</Card>
{:else}<Card padded class="date-time">
		<div class={'earthquakeDate' in errors ? 'error' : 'valid'}>
			<FormField>
				<div class="mandatory">Data del terratrèmol *</div>
				<Textfield on:click={dateClicked} bind:value={formValues.earthquakeDate} type="date" />
			</FormField>
		</div>
		<div class={'earthquakeHour' in errors ? 'error' : 'valid'}>
			<FormField>
				<div class="mandatory">Hora local (HH:MM) *</div>
				<Textfield bind:value={formValues.earthquakeHour} type="time" />
			</FormField>
		</div>
		<button
			on:click={() => {
				formValues.existentSeism = 'yes';
				selectedSeism = undefined;
			}}
			class="seism-button"
			disabled={seisms.length === 0}
		>
			{#if seisms.length > 0}triar de la llista{:else}no hi ha sismes recents{/if}
		</button>
	</Card>
{/if}

<Card padded class={'felt' in errors ? 'error' : 'valid'}>
	<FormField>
		<Select
			style="min-width: 300px"
			label="Ha notat el terratrèmol? *"
			class="mandatory"
			bind:value={formValues.felt}
		>
			{#each Object.entries(yesNo) as [position, positionText]}
				<Option value={position}>
					{positionText}
				</Option>
			{/each}
		</Select>
	</FormField>
</Card>
<Card padded class={'position' in errors ? 'error' : 'valid'}>
	<Select
		style="width: 350px"
		label="En el moment del terratrèmol es trobava...*"
		class="mandatory"
		bind:value={formValues.position}
	>
		{#each Object.entries(positionOptions) as [position, positionText]}
			<Option value={position}>
				{positionText}
			</Option>
		{/each}
	</Select>
	<div>
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

			<div>
				<Select
					style="min-width: 300px"
					label="Nombre total de plantes"
					bind:value={formValues.totalFloors}
				>
					{#each Object.entries(totalFloorOptions).sort( (a, b) => (isNaN(parseFloat(a[0])) ? 1 : -1) ) as [floor, floorText]}
						<Option value={floor}>
							{floorText}
						</Option>
					{/each}
				</Select>
			</div>
			<div>
				<span class="field-label">Aclariment sobre les plantes, si s’escau:</span>
				<Textfield style="width:70%" bind:value={formValues.floorComments} type="text" />
			</div>
		{/if}
	</div>

	{#if formValues.position === 'other'}
		<div>
			<span class="field-label">Indiqui on es trobava:</span>
			<Textfield style="width:70%" bind:value={formValues.commentsPosition} type="text" />
		</div>
	{/if}
</Card>
{#if formValues.position === 'insideBuilding'}
	<Card padded>
		<div
			class={'pais' in errors ||
			'parroquia' in errors ||
			'territori' in errors ||
			'municipality' in errors
				? 'error'
				: 'valid'}
		>
			<div>
				<FormField>
					<Select bind:value={pais} label="País">
						{#each ['Andorra', 'Espanya', 'França'] as country}
							<Option value={country}>{country}</Option>
						{/each}
					</Select>
					<span slot="label" class="mandatory"
						>País on es trobava en el moment del terratrèmol*</span
					>
				</FormField>
			</div>
			{#if formValues.pais === 'Andorra'}
				<div>
					<FormField>
						<Select
							disabled={formValues.pais !== 'Andorra'}
							bind:value={parroquia}
							label="Parròquia"
						>
							{#each [...new Set(parroquies)] as parroquia}
								<Option value={parroquia.id.toString()}>{parroquia.parroquia}</Option>
							{/each}
						</Select>
						<span slot="label" class="mandatory"
							>Parròquia on es trobava en el moment del terratrèmol*</span
						>
					</FormField>
				</div>
				<div>
					<FormField>
						<Select disabled={!formValues.parroquia} bind:value={territori} label="Territori">
							{#each parroquies.find((d) => d.id === formValues.parroquia)?.territori ?? [] as territori}
								<Option value={territori.id.toString()}>{territori.nom}</Option>
							{/each}
						</Select>
						<span slot="label"
							>Territori dins la parròquia on es trobava en el moment del terratrèmol</span
						>
					</FormField>
				</div>
			{:else if formValues.pais === 'Espanya' || formValues.pais === 'França'}
				<div>
					<div class="mdc-form-field">
						<div class="text-field-label mandatory">
							Municipi on es trobava en el moment del terratrèmol*
						</div>
						<Textfield bind:value={municipality} type="text" />
					</div>
				</div>
			{/if}
			{#if !!formValues.pais}
				<div>
					<Select bind:value={formValues.streetType} label="Tipus de via">
						{#each Object.entries(streetTypes) as [streetType, streetTypeText]}
							<Option value={streetType}>{streetTypeText}</Option>
						{/each}
					</Select>
				</div>
				{#if formValues.streetType === 'other'}
					<div>
						<div class="mdc-form-field">
							<Textfield bind:value={formValues.streetTypeOther} type="text" />
						</div>
					</div>
				{/if}
				<div>
					<div class="mdc-form-field">
						<div class="text-field-label">Nom de la via</div>
						<Textfield bind:value={formValues.street} type="text" />
					</div>
				</div>
				<div>
					<div class="mdc-form-field">
						<div class="text-field-label">Número</div>
						<Textfield bind:value={formValues.streetNumber} type="text" />
					</div>
				</div>
				<div class="mdc-form-field" style="width:70%">
					<div class="text-field-label">Complement d'adreça:</div>
					<Textfield style="width:100%" bind:value={formValues.addressNotes} type="text" />
				</div>
			{/if}
		</div>
	</Card>
{:else if formValues.position}
	<Card padded>
		<div>
			Seleccioneu la ubicació tan detallada com sigui possible, arrossegant la icona blava i fent
			zoom sobre el mapa.
		</div>
		<!-- <div class="geocoding">
			<span class="field-label">Cercar ubicacio posant l'adreça aproximada:</span>
			<Textfield bind:value={geocodingSearch} type="text" />
			<button on:click={() => getGeocoding()}>Cerca</button>
		</div> -->
		{#key geocodingCoords}
			<Leaflet
				onChange={setCoordinates}
				initialLng={geocodingCoords
					? geocodingCoords.lon
					: formValues.coordinates && formValues.coordinates[0]}
				initialLat={geocodingCoords
					? geocodingCoords.lat
					: formValues.coordinates && formValues.coordinates[1]}
				autoPosition={geocodingCoords !== undefined}
			/>
		{/key}
	</Card>
{/if}

<Card padded>
	<FormField>
		<Select
			style="min-width: 350px"
			label="En el moment del terratrèmol, estava..."
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
			<Textfield bind:value={formValues.commentsBuilding} type="text" />
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
			Hi ha camps obligatoris sense omplir. Si us plau revisi les respostes
			{#each Object.entries(errors) as [fieldName, error]}
				<div>{fieldName}: {error.message}</div>
			{/each}
		</div>
	{/if}

	<Button variant="raised" type="submit" on:click={handleSubmit}>Següent</Button>
</div>

<style>
	:global(.error) {
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
		max-width: 210px;
		max-height: 82px;
		height: auto;
		width: auto;
	}

	@media (max-width: 800px) {
		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	@media (min-width: 800px) {
		:global(.date-time) {
			display: flex;
			flex-direction: row;
		}
	}

	.title {
		font-size: 2em;
	}
	.logo {
		max-height: 64px;
		padding-bottom: 20px;
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
	.mandatory {
		font-weight: 500;
	}
	:global(.mandatory .mdc-floating-label) {
		font-weight: 500;
	}
	.buttons {
		margin-top: 5px;
	}
	.text-field-label {
		height: 70px;
		align-items: center;
		display: flex;
	}

	.seism-button {
		margin-top: 10px;
		width: 140px;
		background-color: transparent;
	}

	.geocoding {
		margin-bottom: 10px;
	}

	.geocoding button {
		background-color: transparent;
	}
</style>
