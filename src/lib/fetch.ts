import { createClient, type PostgrestError } from '@supabase/supabase-js';
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

export const getOneSeismData = async (guid: string) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});
	const { data: dataSeism, error: errorSeism } = await supabaseClient
		.from('last_seisms')
		.select()
		.eq('guid', guid);

	errorSeism && console.log('Error downloading seisms:', errorSeism);
	return dataSeism?.[0] as SeismsData | undefined;
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

	console.log('Uploading image', fileName, fileToUpload);
	const { data, error } = await supabaseClient.storage
		.from('seismology')
		.upload(fileName, fileToUpload, {
			cacheControl: '3600',
			upsert: false
		});

	const publicUrl = await supabaseClient.storage.from('seismology').getPublicUrl(fileName);

	return publicUrl.data.publicUrl;
};

export interface SurveyData {
	perceptionImage: string;
	felt: boolean;
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
	image: string;
}
export const getSeismSurveys = async (seismGuid: string) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	let dataSeism: Survey[] = [];
	let errorSeism: PostgrestError | null;
	if (seismGuid === 'none') {
		const { data, error } = await supabaseClient
			.from('survey')
			.select()
			.is('seism_guid', null)
			.order('input_date', { ascending: false });
		dataSeism = data ?? [];
		errorSeism = error;
	} else {
		const { data, error } = await supabaseClient
			.from('survey')
			.select()
			.eq('seism_guid', seismGuid)
			.order('input_date', { ascending: false });
		dataSeism = data ?? [];
		errorSeism = error;
	}

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
	num_felt: number;
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

interface IndicesParroquia{
	numSurveys:number;
	numFelt:number;
	felt: boolean;
	feltIndex: number;
	motionIndex: number;
	reactionIndex: number;
	standIndex: number;
	shelfIndex: number;
	pictureIndex: number;
	furnitureIndex: number;
	damageIndex: number;
	cws: number;
	cii: number;
}
interface IndicesParroquies{
	[parroguia_id:string]: IndicesParroquia
}
const recalculateAvg=(prev: number, cur: number, num:number)=> (prev*(num-1)+cur)/num

export const getCalculatedIndicesParroquiesFromSurveys = (surveys:Survey[], parroquies: ParroquiaData[]=[] ): Indices[]=>{
const byParroquia=surveys.reduce((acc, cur)=>{
	if(!(cur.parroquia_id in acc)){
		acc[cur.parroquia_id] = {numSurveys: 1, 
			felt: false, 
			numFelt:0, 
			feltIndex: parseFloat(cur.indices.feltIndex),
			motionIndex: parseFloat(cur.indices.motionIndex),
			reactionIndex: parseFloat(cur.indices.reactionIndex),
			standIndex:  parseFloat(cur.indices.standIndex),
			shelfIndex: parseFloat(cur.indices.shelfIndex),
			pictureIndex:  parseFloat(cur.indices.pictureIndex),
			furnitureIndex:  parseFloat(cur.indices.furnitureIndex),
			damageIndex:  parseFloat(cur.indices.damageIndex),
			cws:0,
			cii: 0,
		}
	}else {
		acc[cur.parroquia_id].numSurveys += 1
		acc[cur.parroquia_id].feltIndex = recalculateAvg(acc[cur.parroquia_id].feltIndex, parseFloat(cur.indices.feltIndex), acc[cur.parroquia_id].numSurveys);
		acc[cur.parroquia_id].motionIndex = recalculateAvg(acc[cur.parroquia_id].motionIndex, parseFloat(cur.indices.motionIndex), acc[cur.parroquia_id].numSurveys)
		acc[cur.parroquia_id].reactionIndex = recalculateAvg(acc[cur.parroquia_id].reactionIndex, parseFloat(cur.indices.reactionIndex), acc[cur.parroquia_id].numSurveys)
		acc[cur.parroquia_id].standIndex = recalculateAvg(acc[cur.parroquia_id].standIndex, parseFloat(cur.indices.standIndex), acc[cur.parroquia_id].numSurveys)
		acc[cur.parroquia_id].shelfIndex = recalculateAvg(acc[cur.parroquia_id].shelfIndex, parseFloat(cur.indices.shelfIndex), acc[cur.parroquia_id].numSurveys)
		acc[cur.parroquia_id].pictureIndex = recalculateAvg(acc[cur.parroquia_id].pictureIndex, parseFloat(cur.indices.pictureIndex), acc[cur.parroquia_id].numSurveys)
		acc[cur.parroquia_id].furnitureIndex = recalculateAvg(acc[cur.parroquia_id].furnitureIndex, parseFloat(cur.indices.furnitureIndex), acc[cur.parroquia_id].numSurveys)
		acc[cur.parroquia_id].damageIndex = recalculateAvg(acc[cur.parroquia_id].damageIndex, parseFloat(cur.indices.damageIndex), acc[cur.parroquia_id].numSurveys)
	}
	if(cur.survey_data.felt){
		acc[cur.parroquia_id].felt = true
		acc[cur.parroquia_id].numFelt += 1
	}
	acc[cur.parroquia_id].cws = 5 * acc[cur.parroquia_id].feltIndex 
	+ acc[cur.parroquia_id].motionIndex
	+ acc[cur.parroquia_id].reactionIndex
	+ 2 * acc[cur.parroquia_id].standIndex
	+ 5 * acc[cur.parroquia_id].shelfIndex
	+ 2 * acc[cur.parroquia_id].pictureIndex
	+ 3 * acc[cur.parroquia_id].furnitureIndex
	+ 5 * acc[cur.parroquia_id].damageIndex
	if(!acc[cur.parroquia_id].felt){
		acc[cur.parroquia_id].cii = 1
	} else if(acc[cur.parroquia_id].cws < 6.53){
		acc[cur.parroquia_id].cii = 2
	} else {
		acc[cur.parroquia_id].cii = 3.4 * Math.log(acc[cur.parroquia_id].cws) - 4.38
	}
	return acc
},{} as IndicesParroquies)


	const seismGuid = surveys[0].guid
	const datetime = surveys[0].input_date

	return Object.entries(byParroquia).map(([parroquiaId, indices])=>({
		seism_guid: seismGuid,
		datetime: datetime,
		parroquia: parroquies?.find((d) => d.id === parseInt(parroquiaId))?.parroquia ?? "Fora d'Andorra",
		cii: indices.cii,
		cws: indices.cws,
		num_felt: indices.numFelt,
		num_surveys: indices.numSurveys
	}))
}

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
