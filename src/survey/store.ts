import { writable } from "svelte/store";
import * as yup from "yup";
import {
  animalsFrightened,
  buildingDamage,
  buildingDamageDescription,
  buildingType,
  effectsDoorsWindows,
  effectsFurniture,
  effectsLamps,
  effectsLiquids,
  effectsPaintings,
  effectsPlants,
  effectsShelves,
  floorOptions,
  movementDescription,
  noise,
  numberPeopleAwake,
  numberPeopleGoingOutOptions,
  numberPeopleInsideOptions,
  numberPeopleOutsideOptions,
  positionOptions,
  reaction,
  situationObserverOptions,
  standingDifficulty,
  totalFloorOptions,
  whatDidYouDo,
} from "./surveyObjects";

export const surveyValues = writable<FormValues>({
  seism: "",
  existentSeism: "yes",
  earthquakeDate: "",
  earthquakeHour: "",
  locationMap: "yes",
  streetTypeOther: "",
  floorComments: "",
  street: "",
  streetNumber: "",
  addressNotes: "",
  commentsPosition: "",
  commentsBuilding: "",
  commentsWhatDidYouDo: "",
  commentseffectsShelves: "",
  buildingYear: "",
  commentsDamage: "",
  comments: "",
  otherSeisms: "",
  perceptionImage: "",
  buildingDamageDescription: [],
  effectsOnLandscape: [],
});

export const surveyPage = writable(0);

export const nextPage = () => surveyPage.update((n) => (n < 4 ? n + 1 : n));
export const previousPage = () => surveyPage.update((n) => (n > 0 ? n - 1 : n));

export const schema = yup.object().shape({
  existentSeism: yup.string().oneOf(["yes", "no"]).required(),
  earthquakeDate: yup
    .date()
    .nullable()
    .default(undefined)
    .transform((curr, orig) => (orig === "" ? null : curr))
    .typeError("Format de data invàlid"),
  earthquakeHour: yup
    .string()
    .nullable()
    .default(undefined)
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(/[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}/),
  seism: yup
    .string()
    .when("existentSeism", { is: "yes", then: yup.string().required() }),
  felt: yup.string().oneOf(["yes", "no"]).required(),
  locationMap: yup.string().oneOf(["yes", "no"]).required(),
  pais: yup.string().when("position", {
    is: "insideBuilding",
    then: yup.string().required(),
  }),
  parroquia: yup.string().when(["position", "pais"], {
    is: (position: string, pais: string) =>
      position === "insideBuilding" && pais === "Andorra",
    then: yup.string().required(),
  }),
  municipality: yup.string().when(["position", "pais"], {
    is: (position: string, pais: string) =>
      position === "insideBuilding" && pais !== "Andorra",
    then: yup.string().required(),
  }),
  street: yup.string(),
  streetNumber: yup.string(),
  position: yup.string().oneOf(Object.keys(positionOptions)).required(),
  floor: yup.string().oneOf(Object.keys(floorOptions)),
  totalFloors: yup.string().oneOf(Object.keys(floorOptions)),
  commentsPosition: yup.string(),
  situationObserver: yup.string().oneOf(Object.keys(situationObserverOptions)),
  commentsBuilding: yup.string(),
  numberPeopleInside: yup
    .string()
    .oneOf(Object.keys(numberPeopleInsideOptions)),
  numberPeopleOutside: yup
    .string()
    .oneOf(Object.keys(numberPeopleOutsideOptions)),
  numberPeopleGoingOut: yup
    .string()
    .oneOf(Object.keys(numberPeopleGoingOutOptions)),
  numberPeopleAwake: yup.string().oneOf(Object.keys(numberPeopleAwake)),
  movementDescription: yup.string().oneOf(Object.keys(movementDescription)),
  noise: yup.string().oneOf(Object.keys(noise)),
  reaction: yup.string().oneOf(Object.keys(reaction)),
  standingDifficulty: yup.string().oneOf(Object.keys(standingDifficulty)),
  animalsFrightened: yup.string().oneOf(Object.keys(animalsFrightened)),
  whatDidYouDo: yup.string().oneOf(Object.keys(whatDidYouDo)),
  commentsWhatDidYouDo: yup.string(),
  effectsLamps: yup.string().oneOf(Object.keys(effectsLamps)),
  effectsLiquids: yup.string().oneOf(Object.keys(effectsLiquids)),
  effectsPaintings: yup.string().oneOf(Object.keys(effectsPaintings)),
  effectsDoorsWindows: yup.string().oneOf(Object.keys(effectsDoorsWindows)),
  effectsFurniture: yup.string().oneOf(Object.keys(effectsFurniture)),
  effectsPlants: yup.string().oneOf(Object.keys(effectsPlants)),
  effectsShelves: yup.string().oneOf(Object.keys(effectsShelves)),
  commentseffectsShelves: yup.string(),
  buildingType: yup.string().oneOf(Object.keys(buildingType)),
  buildingYear: yup.string(),
  buildingDamage: yup.string().oneOf(Object.keys(buildingDamage)),
  buildingDamageDescription: yup
    .array()
    .of(yup.string().oneOf(Object.keys(buildingDamageDescription))),
  commentsDamage: yup.string(),
  comments: yup.string(),
  otherSeisms: yup.string(),
  perceptionImage: yup.string(),
});

yup.setLocale({
  mixed: {
    default: "Valor no vàlid",
    oneOf: "El valor ha de ser un dels següents: ${values}",
  },
});

export interface FormValues {
  existentSeism?: string;
  earthquakeDate?: string;
  earthquakeHour?: string;
  seism?: string;
  felt?: string;
  locationMap?: string;
  coordinates?: [number, number];
  pais?: string;
  parroquia?: string;
  territori?: string;
  municipality?: string;
  streetType?: string;
  streetTypeOther?: string;
  street?: string;
  streetNumber?: string;
  addressNotes?: string;
  position?: keyof typeof positionOptions;
  floor?: keyof typeof floorOptions;
  floorComments?: string;
  totalFloors?: keyof typeof totalFloorOptions;
  commentsPosition?: string;
  situationObserver?: keyof typeof situationObserverOptions;
  commentsBuilding?: string;
  numberPeopleInside?: keyof typeof numberPeopleInsideOptions;
  numberPeopleOutside?: keyof typeof numberPeopleOutsideOptions;
  numberPeopleGoingOut?: keyof typeof numberPeopleGoingOutOptions;
  numberPeopleAwake?: keyof typeof numberPeopleAwake;
  movementDescription?: keyof typeof movementDescription;
  noise?: keyof typeof noise;
  reaction?: keyof typeof reaction;
  standingDifficulty?: keyof typeof standingDifficulty;
  animalsFrightened?: keyof typeof animalsFrightened;
  whatDidYouDo?: keyof typeof whatDidYouDo;
  commentsWhatDidYouDo?: string;
  effectsLamps?: keyof typeof effectsLamps;
  effectsLiquids?: keyof typeof effectsLiquids;
  effectsPaintings?: keyof typeof effectsPaintings;
  effectsDoorsWindows?: keyof typeof effectsDoorsWindows;
  effectsFurniture?: keyof typeof effectsFurniture;
  effectsPlants?: keyof typeof effectsPlants;
  effectsShelves?: keyof typeof effectsShelves;
  commentseffectsShelves?: string;
  buildingType?: keyof typeof buildingType;
  buildingYear?: string;
  buildingDamage?: keyof typeof buildingDamage;
  buildingDamageDescription?: (keyof typeof buildingDamageDescription)[];
  effectsOnLandscape?: (keyof typeof effectsOnLandscape)[];
  commentsDamage?: string;
  comments?: string;
  otherSeisms?: string;
  perceptionImage?: string;
  image?: string;
}
