import type { FormValues } from './store';
interface Point {
    type: 'Point';
    coordinates: [number, number];
}
export interface SeismsData {
    guid: string;
    datetime: Date;
    magnitude: number;
    region: string;
    depth: number;
    coordinates: Point;
}
export declare const getSeismData: () => Promise<SeismsData[]>;
export interface ParroquiaData {
    parroquia: string;
    territori: string;
}
export declare const getParroquiesData: () => Promise<ParroquiaData[]>;
export declare const sendToSupabase: (data: FormValues) => Promise<void>;
export declare const uploadImage: (fileName: string, fileToUpload: string) => Promise<string>;
export {};
