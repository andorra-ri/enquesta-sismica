import type { FormValues } from "./store";
export interface SeismsData {
    guid: string;
    datetime: Date;
    magnitude: number;
    region: string;
    lon: string;
    lat: string;
}
export declare const getSeismData: () => Promise<SeismsData[]>;
export interface ParroquiaData {
    parroquia: string;
    territori: string;
}
export declare const getParroquiesData: () => Promise<ParroquiaData[]>;
export declare const sendToSupabase: (data: FormValues) => Promise<void>;
export declare const uploadImage: (fileName: string, fileToUpload: string) => Promise<string>;
