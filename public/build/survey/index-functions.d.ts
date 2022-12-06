import type { FormValues } from "./store";
export declare const getIndices: (data: FormValues) => {
    feltIndex: number;
    reactionIndex: number;
    motionIndex: number;
    standIndex: number;
    shelfIndex: number;
    pictureIndex: number;
    furnitureIndex: number;
    damageIndex: number;
    cws: number;
    cii: number;
};
export declare const createXMLReport: (data: FormValues) => string;
