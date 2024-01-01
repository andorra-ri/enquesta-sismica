import { createClient } from '@supabase/supabase-js';
import { createXMLReport, getIndices } from './index-functions';
import type { FormValues } from './store';

const supabaseUrl = 'https://svyhccttsxgjrefxiiro.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA4ODc0NiwiZXhwIjoxOTU0NjY0NzQ2fQ.XmlC695aKtt85caWPcPSDWBUP9z4RDS_eGQ-eWjfwKE';

export interface SeismsData {
	guid: string;
	datetime: Date;
	magnitude: number;
	region: string;
	lon: string;
	lat: string;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	db: {
		schema: 'seismology'
	}
});

export const getSeismData = async (last: boolean = true) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	const now = new Date();
	const fifteenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15);

	const { data: dataSeism, error: errorSeism } = last
		? await supabaseClient
				.from('last_seisms')
				.select()
				.gt('datetime', fifteenDaysAgo.toISOString().split('T')[0])
		: await supabaseClient.from('last_seisms').select();

	errorSeism && console.log('Error downloading seisms:', errorSeism);
	return (dataSeism ?? []) as SeismsData[];
};

export interface TerritoriData {
	nom: string;
	id: number;
}
export interface ParroquiaData {
	parroquia: string;
	id: number;
	territori: TerritoriData[];
}

export const getParroquiesData = async () => {
	const supabaseClientPublic = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	// const { data: dataMunicipalities, error: errorMunicipalities } = await supabaseClientPublic.from(
	// 	'parroquia'
	// ).select(`parroquia,id,
	// territori!fk_parroquia (nom, id)`);

	// errorMunicipalities && console.log('Error downloading municipalities:', errorMunicipalities);

	const { data: dataTerritorial, error: errorTerritorial } = await supabaseClientPublic
		.from('territorial_division')
		.select('parroquia, territori, parroquia_id, territori_id');

	const parroquiesData = dataTerritorial?.reduce<ParroquiaData[]>((acc, cur) => {
		const territori = { nom: cur.territori, id: cur.territori_id } as TerritoriData;
		const parroquia_idx = acc.findIndex((d) => d.id === cur.parroquia_id);
		if (parroquia_idx === -1) {
			return [
				...acc,
				{
					parroquia: cur.parroquia,
					id: cur.parroquia_id,
					territori: [territori]
				}
			];
		}
		return [
			...acc.slice(0, parroquia_idx),
			{ ...acc[parroquia_idx], territori: [...acc[parroquia_idx].territori, territori] },
			...acc.slice(parroquia_idx + 1)
		];
	}, []);

	errorTerritorial && console.log('Error downloading municipalities:', errorTerritorial);
	return parroquiesData;
};

export const sendToSupabase = async (data: FormValues) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	const indices = getIndices(data);

	const xmlReport = createXMLReport(data);

	// await supabaseClient.rpc('addsurvey', {
	// 	survey_data: JSON.stringify(data),
	// 	cws: indices.cws,
	// 	cii: indices.cii,
	// 	indices: JSON.stringify(indices),
	// 	seism_guid: data.seism,
	// 	xml_report: xmlReport,
	// 	parroquia_id: data.parroquia,
	// 	territori_id: data.territori,
	// 	image: data.image ?? '',
	// 	lon: data.coordinates ? data.coordinates[0] : 0,
	// 	lat: data.coordinates ? data.coordinates[1] : 0
	// });

	await supabaseClient.from('survey').insert([
		{
			survey_data: data,
			cws: indices.cws,
			cii: indices.cii,
			indices: indices,
			seism_guid: data.seism,
			xml_report: xmlReport,
			parroquia_id: data.parroquia,
			territori_id: data.territori,
			image: data.image ?? ''
		}
	]);
};

export const uploadImage = async (fileName: string, fileToUpload: string) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});
	const { data, error } = await supabaseClient.storage
		.from('seismology')
		.upload(fileName, fileToUpload);

	const publicUrl = await supabaseClient.storage.from('seismology').getPublicUrl(fileName);

	return publicUrl.data.publicUrl;
};

export interface SurveyData {
	perceptionImage: string;
}
export interface SurveyIndices {
	cii: string;
	cws: string;
	feltIndex: string;
	shelfIndex: string;
	standIndex: string;
	damageIndex: string;
	motionIndex: string;
	pictureIndex: string;
	reactionIndex: string;
	furnitureIndex: string;
}

export interface Survey {
	guid: string;
	approved: boolean;
	input_date: Date;
	survey_data: SurveyData;
	indices: SurveyIndices;
	parroquia_id: number;
	territori_id: number;
}
export const getSeismSurveys = async (seismGuid: string) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	const { data: dataSeism, error: errorSeism } = await supabaseClient
		.from('survey')
		.select()
		.eq('seism_guid', seismGuid);

	errorSeism && console.log('Error downloading seisms:', errorSeism);
	return (dataSeism ?? []) as Survey[];
};

export interface Indices {
	seism_guid: string;
	datetime: Date;
	cii: number;
	cws: number;
	parroquia?: string;
	num_surveys: number;
}
export const getCalculatedIndicesParroquies = async (seismGuid: string) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	const { data: dataIndices, error: errorSeism } = await supabaseClient
		.from('indexes_parroquies')
		.select()
		.eq('seism_guid', seismGuid);

	errorSeism && console.log('Error downloading indexes:', errorSeism);
	return (dataIndices ?? []) as Indices[];
};

export const getCalculatedIndicesAndorra = async (seismGuid: string) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	const { data: dataIndices, error: errorSeism } = await supabaseClient
		.from('indexes_andorra')
		.select()
		.eq('seism_guid', seismGuid);

	errorSeism && console.log('Error downloading indexes:', errorSeism);
	return (dataIndices ?? [])[0] as Indices;
};

export const setSeismSurveyApproval = async (seismGuid: string, value: boolean) => {
	console.log(`Approve ${value} ${seismGuid}`);

	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});
	await supabaseClient.from('survey').update({ approved: value }).eq('guid', seismGuid);
};

export const deleteSeismSurvey = async (seismGuid: string) => {
	console.log(`Delete  ${seismGuid}`);

	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});
	await supabaseClient.from('survey').delete().eq('guid', seismGuid);
};
