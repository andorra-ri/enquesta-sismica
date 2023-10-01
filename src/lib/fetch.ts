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

export const getSeismData = async () => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	const now = new Date();
	const fifteenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15);

	const { data: dataSeism, error: errorSeism } = await supabaseClient
		.from('last_seisms')
		.select()
		.gt('datetime', fifteenDaysAgo.toISOString().split('T')[0]);

	errorSeism && console.log('Error downloading seisms:', errorSeism);
	return (dataSeism ?? []) as SeismsData[];
};

export interface TerritoriData {
	nom: string;
}
export interface ParroquiaData {
	parroquia: string;
	territori: TerritoriData[];
}

export const getParroquiesData = async () => {
	const supabaseClientPublic = createClient(supabaseUrl, supabaseAnonKey);

	const { data: dataMunicipalities, error: errorMunicipalities } = await supabaseClientPublic.from(
		'parroquia'
	).select(`parroquia,
    territori!fk_parroquia (nom)`);

	errorMunicipalities && console.log('Error downloading municipalities:', errorMunicipalities);
	return dataMunicipalities as ParroquiaData[];
};

export const sendToSupabase = async (data: FormValues) => {
	const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
		db: {
			schema: 'seismology'
		}
	});

	const indices = getIndices(data);

	const xmlReport = createXMLReport(data);
	// await supabaseClient.from("survey").insert([
	//   {
	//     survey_data: data,
	//     cws: indices.cws,
	//     cii: indices.cii,
	//     indices: indices,
	//     xml_report: xmlReport,
	//     seism_guid: data.seism,
	//     image: data.image,
	//   },
	// ]);

	await supabaseClient.rpc('addsurvey', {
		survey_data: JSON.stringify(data),
		cws: indices.cws,
		cii: indices.cii,
		indices: JSON.stringify(indices),
		seism_guid: data.seism,
		xml_report: xmlReport,
		parroquia: data.parroquia,
		territori: data.territori,
		image: data.image ?? '',
		lon: data.coordinates ? data.coordinates[0] : 0,
		lat: data.coordinates ? data.coordinates[1] : 0
	});
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
export interface Survey {
	guid: string;
	cws: number;
	cii: number;
	input_date: Date;
	survey_data: SurveyData;
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
