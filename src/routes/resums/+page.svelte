<script lang="ts">
	import {
		getParroquiesData,
		getSeismData,
		getSeismSurveys,
		setSeismSurveyApproval,
		type ParroquiaData,
		type SeismsData,
		type Survey
	} from '$lib/fetch';
	import { perceptionIndexImages } from '$lib/surveyObjects';
	import Card from '@smui/card';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import Checkbox from '@smui/checkbox';
	let seisms: SeismsData[] = [];
	let parroquies: ParroquiaData[] = [];

	let seism: string;

	let surveys: Survey[] = [];

	let approved: string[] = [];

	onMount(async () => {
		seisms = await getSeismData();

		parroquies = await getParroquiesData();
	});
	const getSurveys = async () => {
		if (seism) surveys = await getSeismSurveys(seism);
	};

	const setApproved = () => (approved = surveys.filter((d) => d.approved).map((d) => d.guid));

	$: seism, getSurveys();
	$: surveys, setApproved();

	$: approved, console.log(approved);

	const pathChanged = (event: Event, guid: string) => {
		const target = event.target as HTMLInputElement;
		setSeismSurveyApproval(guid, target.checked);
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
		<p>Resums de les enquestes</p>
	</div>
</div>
<Card padded>
	<div>Triï el sisme</div>
	<FormField>
		<Select style="min-width: 300px" label="Data del sisme" bind:value={seism}>
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
<DataTable>
	<Head>
		<Row>
			<Cell>Aprovat</Cell>
			<Cell>Data</Cell>
			<Cell>Indexs</Cell>
			<Cell>Respostes</Cell>
			<Cell>Percepció</Cell>
		</Row>
	</Head>
	<Body>
		{#each surveys as survey}
			<Row>
				<Cell
					><Checkbox
						checked={survey.approved}
						value={survey.guid}
						on:change={(e) => pathChanged(e, survey.guid)}
					/></Cell
				>
				<Cell>{format(new Date(survey.input_date), 'yyyy-MM-dd HH:mm')}</Cell>
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
</style>
