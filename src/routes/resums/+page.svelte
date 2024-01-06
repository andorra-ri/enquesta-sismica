<script lang="ts">
	import Auth from '$lib/Auth.svelte';
	import {
		getCalculatedIndicesAndorra,
		getCalculatedIndicesParroquies,
		getParroquiesData,
		getSeismData,
		getSeismSurveys,
		setSeismSurveyApproval,
		supabase,
		type Indices,
		type ParroquiaData,
		type SeismsData,
		type Survey
	} from '$lib/fetch';
	import { perceptionIndexImages } from '$lib/surveyObjects';
	import Card from '@smui/card';
	import Checkbox from '@smui/checkbox';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import type { AuthSession } from '@supabase/supabase-js';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';
	let seisms: SeismsData[] = [];
	let parroquies: ParroquiaData[] | undefined = [];

	let seism: string;

	let surveys: Survey[] = [];
	let surveysOutside: number = 0;

	let indicesParroquies: Indices[] = [];
	let indicesAndorra: Indices;

	onMount(async () => {
		seisms = await getSeismData(false);

		parroquies = await getParroquiesData();
	});
	const getSeismInfo = async () => {
		if (seism) {
			surveys = await getSeismSurveys(seism);
			indicesParroquies = await getCalculatedIndicesParroquies(seism);
			indicesAndorra = await getCalculatedIndicesAndorra(seism);
			surveysOutside = surveys.reduce((acc, cur) => {
				if (!cur.parroquia_id) {
					return acc + 1;
				}
				return acc;
			}, 0);
		}
	};

	$: seism, getSeismInfo();

	const pathChanged = async (event: Event, guid: string) => {
		const target = event.target as HTMLInputElement;
		await setSeismSurveyApproval(guid, target.checked);
		indicesParroquies = await getCalculatedIndicesParroquies(seism);
		indicesAndorra = await getCalculatedIndicesAndorra(seism);
	};

	let session: AuthSession | null;

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			session = data.session;
		});

		supabase.auth.onAuthStateChange((_event, _session) => {
			session = _session;
		});
	});
</script>

<svelte:head>
	<title>Enquesta sísmica</title>
	<meta name="description" content="Enquesta sísmica Andorra Recerca i Innovació" />
</svelte:head>

{#if !session}
	<Auth />
{:else}
	<div class="header">
		<img src="images/logo.png" alt="logo" class="logo" />
		<div>
			<div class="title">Enquesta sísmica</div>
			<p>Resums de les enquestes</p>
		</div>
	</div>
	<Card padded>
		<div>Triï el terratrèmol</div>
		<FormField>
			<Select style="min-width: 300px" label="Data del terratrèmol" bind:value={seism}>
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
						})} (${seism.region}). Mag:${seism.magnitude}`}</Option
					>
				{/each}
			</Select>
		</FormField>
	</Card>
	{#if indicesAndorra}
		<DataTable>
			<Row>
				<Cell>Resultats per tot Andorra:</Cell>
				<Cell>CWS: {indicesAndorra.cws}</Cell>
				<Cell>CII: {indicesAndorra.cii}</Cell>
				<Cell>Nombre de respostes: {indicesAndorra.num_surveys}</Cell>
				<Cell>Nombre sentits: {indicesAndorra.num_felt}</Cell>
			</Row>
		</DataTable>
	{/if}
	<Card>Enquestes fora d'Andorra: {surveysOutside}</Card>
	<br />
	<DataTable>
		<Head>
			<Row>
				<Cell>Parròquia</Cell>
				<Cell>CWS</Cell>
				<Cell>CII</Cell>
				<Cell>Nombre de respostes/sentits</Cell>
			</Row>
		</Head>
		<Body>
			{#each indicesParroquies as index}
				<Row>
					<Cell>{index.parroquia}</Cell>
					<Cell>{index.cws}</Cell>
					<Cell>{index.cii}</Cell>
					<Cell>{index.num_surveys}/{index.num_felt}</Cell>
				</Row>
			{/each}
		</Body>
	</DataTable>
	<br />
	<DataTable>
		<Head>
			<Row>
				<Cell>Aprovat</Cell>
				<Cell>Data</Cell>
				<Cell>Localització</Cell>
				<Cell>Indexs</Cell>
				<Cell>Respostes</Cell>
				<Cell>Percepció</Cell>
			</Row>
		</Head>
		<Body>
			{#each surveys as survey}
				<Row>
					<Cell>
						<div class="approve">
							<Checkbox
								checked={survey.approved}
								value={survey.guid}
								on:change={(e) => pathChanged(e, survey.guid)}
							/>
							<!-- <IconButton on:click={() => deleteSeismSurvey(survey.guid)} style="margin:0">
								<Icon class="material-icons" on>delete</Icon><Icon class="material-icons"
									>delete</Icon
								>
							</IconButton> -->
						</div>
					</Cell>
					<Cell>{format(new Date(survey.input_date), 'yyyy-MM-dd HH:mm')}</Cell>
					<Cell
						>{parroquies?.find((d) => d.id === survey.parroquia_id)?.parroquia ?? "Fora d'Andorra"} -
						{parroquies
							?.find((d) => d.id === survey.parroquia_id)
							?.territori.find((d) => d.id === survey.territori_id)?.nom ?? ''}</Cell
					>
					<Cell>
						<ul>
							{#each Object.entries(survey.indices) as index}
								<li>{index[0]}: {index[1]}</li>
							{/each}
						</ul>
					</Cell>
					<Cell>
						<ul>
							{#each Object.entries(survey.survey_data) as data}
								<li>{data[0]}: {data[1]}</li>
							{/each}
						</ul>
					</Cell>
					<Cell>
						<img
							src={perceptionIndexImages.find((d) => d.value === survey.survey_data.perceptionImage)
								?.imageLink}
							alt="imatge percebuda"
						/>
					</Cell>
				</Row>
			{/each}
		</Body>
	</DataTable>
{/if}

<style>
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
	}
	:global(.halign) {
		display: flex;
		flex-direction: row;
	}
	:global(.mdc-card) {
		margin-top: 10px;
	}

	.approve {
		display: flex;
		align-items: center;
	}
</style>
