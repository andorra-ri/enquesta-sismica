import type { FormValues } from './store';

export const getIndices = (data: FormValues) => {
	const feltYesNo = data.felt === 'yes' ? 1 : 0;
	let numberPeopleInside;
	switch (data.numberPeopleInside) {
		case 'notSpecified':
			numberPeopleInside = 0.72;
			break;
		case 'nobody':
			numberPeopleInside = 0.36;
			break;
		case 'some':
			numberPeopleInside = 0.72;
			break;
		case 'most':
			numberPeopleInside = 1;
			break;
		case 'upperFloors':
			numberPeopleInside = 0.36;
			break;
		case 'everybody':
			numberPeopleInside = 1;
			break;
		default:
			numberPeopleInside = 0.72;
	}

	let numberPeopleOutside;
	switch (data.numberPeopleOutside) {
		case 'notSpecified':
			numberPeopleOutside = 0.72;
			break;
		case 'nobody':
			numberPeopleOutside = 0.36;
			break;
		case 'some':
			numberPeopleOutside = 0.72;
			break;
		case 'most':
			numberPeopleOutside = 1;
			break;
		case 'everybody':
			numberPeopleOutside = 1;
			break;
		default:
			numberPeopleOutside = 0.72;
	}

	let numberPeopleAwake;
	switch (data.numberPeopleAwake) {
		case 'notSpecified':
			numberPeopleAwake = 0.72;
			break;
		case 'nobody':
			numberPeopleAwake = 0.36;
			break;
		case 'some':
			numberPeopleAwake = 0.72;
			break;
		case 'most':
			numberPeopleAwake = 1;
			break;
		case 'everybody':
			numberPeopleAwake = 1;
			break;
		case 'noOneSleeping':
			numberPeopleAwake = 0.72;
			break;
		default:
			numberPeopleAwake = 0.72;
	}
	const feltIndex =
		feltYesNo * Math.max(numberPeopleInside, numberPeopleOutside, numberPeopleAwake);

	let motionIndex;
	switch (data.movementDescription) {
		case 'notSpecified':
			motionIndex = 0;
			break;
		case 'notFelt':
			motionIndex = 0;
			break;
		case 'veryMild':
			motionIndex = 1;
			break;
		case 'mild':
			motionIndex = 2;
			break;
		case 'moderate':
			motionIndex = 3;
			break;
		case 'strong':
			motionIndex = 4;
			break;
		case 'veryStrong':
			motionIndex = 5;
			break;
		default:
			motionIndex = 0;
	}

	let reactionIndex;
	switch (data.reaction) {
		case 'notSpecified':
			reactionIndex = 0;
			break;
		case 'none':
			reactionIndex = 0;
			break;
		case 'smallFright':
			reactionIndex = 1;
			break;
		case 'alarm':
			reactionIndex = 2;
			break;
		case 'frightened':
			reactionIndex = 3;
			break;
		case 'veryFrightened':
			reactionIndex = 4;
			break;
		case 'panic':
			reactionIndex = 5;
			break;
		default:
			reactionIndex = 0;
	}

	let standIndex;
	switch (data.standingDifficulty) {
		case 'notSpecified':
			standIndex = 0;
			break;
		case 'seated':
			standIndex = 0;
			break;
		case 'no':
			standIndex = 0;
			break;
		case 'yes':
			standIndex = 1;
			break;
		default:
			standIndex = 0;
	}

	let shelfIndex;
	switch (data.effectsShelves) {
		case 'notSpecified':
			shelfIndex = 0;
			break;
		case 'none':
			shelfIndex = 0;
			break;
		case 'vibration':
			shelfIndex = 0;
			break;
		case 'strongVibration':
			shelfIndex = 0;
			break;
		case 'someFall':
			shelfIndex = 1;
			break;
		case 'manyFall':
			shelfIndex = 2;
			break;
		case 'mostFall':
			shelfIndex = 3;
			break;
		default:
			shelfIndex = 0;
	}

	let pictureIndex;
	switch (data.effectsPaintings) {
		case 'notSpecified':
			pictureIndex = 0;
			break;
		case 'none':
			pictureIndex = 0;
			break;
		case 'vibration':
			pictureIndex = 0;
			break;
		case 'moved':
			pictureIndex = 1;
			break;
		case 'fell':
			pictureIndex = 1;
			break;
		default:
			pictureIndex = 0;
	}

	let furnitureIndex;
	switch (data.effectsFurniture) {
		case 'notSpecified':
			furnitureIndex = 0;
			break;
		case 'none':
			furnitureIndex = 0;
			break;
		case 'vibration':
			furnitureIndex = 0;
			break;
		case 'movement':
			furnitureIndex = 1;
			break;
		case 'fall':
			furnitureIndex = 1;
			break;
		default:
			furnitureIndex = 0;
	}

	let damageIndex = 0;
	if (data.buildingDamageDescription) {
		if (data.buildingDamageDescription.includes('smallCracksCoating')) {
			damageIndex = 0.25;
		}
		if (data.buildingDamageDescription.includes('bigCracksCoating')) {
			damageIndex = 0.5;
		}
		if (data.buildingDamageDescription.includes('cracksWalls')) {
			damageIndex = 0.5;
		}
		if (data.buildingDamageDescription.includes('cracksWindows')) {
			damageIndex = 0.5;
		}
		if (data.buildingDamageDescription.includes('cracksWallsMany')) {
			damageIndex = 0.75;
		}
		if (data.buildingDamageDescription.includes('cracksWallsBig')) {
			damageIndex = 1;
		}
		if (data.buildingDamageDescription.includes('fallenTiles')) {
			damageIndex = 1;
		}
		if (data.buildingDamageDescription.includes('cracksSmokestack')) {
			damageIndex = 1;
		}
		if (data.buildingDamageDescription.includes('cracksWindowsMany')) {
			damageIndex = 2;
		}
		if (data.buildingDamageDescription.includes('stonesFromWalls')) {
			damageIndex = 2;
		}
		if (data.buildingDamageDescription.includes('fallenCoating')) {
			damageIndex = 2;
		}
		if (data.buildingDamageDescription.includes('damagedSmokestack')) {
			damageIndex = 2;
		}
		if (data.buildingDamageDescription.includes('fallenSmokestack')) {
			damageIndex = 2;
		}
		if (data.buildingDamageDescription.includes('damagedSmokestackModern')) {
			damageIndex = 3;
		}
		if (data.buildingDamageDescription.includes('fallenSmokestackModern')) {
			damageIndex = 3;
		}
		if (data.buildingDamageDescription.includes('fallenFloatingWall')) {
			damageIndex = 3;
		}
		if (data.buildingDamageDescription.includes('fallenWall')) {
			damageIndex = 3;
		}
		if (data.buildingDamageDescription.includes('fallenBalcony')) {
			damageIndex = 3;
		}
		if (data.buildingDamageDescription.includes('fallenBuilding')) {
			damageIndex = 3;
		}
	}

	const cws =
		5 * feltIndex +
		motionIndex +
		reactionIndex +
		2 * standIndex +
		5 * shelfIndex +
		2 * pictureIndex +
		3 * furnitureIndex +
		5 * damageIndex;

	let cii;
	if (cws >= 6.53) {
		cii = 3.4 * Math.log(cws) - 4.38;
	} else if (feltYesNo === 1) {
		cii = 2;
	} else {
		cii = 1;
	}

	return {
		feltIndex,
		reactionIndex,
		motionIndex,
		standIndex,
		shelfIndex,
		pictureIndex,
		furnitureIndex,
		damageIndex,
		cws,
		cii
	};
};

export const createXMLReport = (data: FormValues) => {
	const doc = document.implementation.createDocument('', '', null);
	const catalogue = doc.createElement('cataleg_macrosismica');

	const survey = doc.createElement('questionari');
	survey.setAttribute('temps_rx', Math.round(Date.now() / 1000).toString());
	survey.setAttribute('programa', 'pocrisc_ari');
	survey.setAttribute('font', 'pocrisc_ari_web');
	survey.setAttribute('institucio', 'AndorraRecerca+Innovació');
	const event = doc.createElement('esdeveniment');

	survey.appendChild(event);
	survey.appendChild(createPerceptionLocation(data, doc));
	survey.appendChild(createPosition(data, doc));
	survey.appendChild(createFeel(data, doc));
	survey.appendChild(createPerception(data, doc));
	survey.appendChild(createObjects(data, doc));
	survey.appendChild(createDamage(data, doc));
	survey.appendChild(createComments(data, doc));
	survey.appendChild(createImage(data, doc));
	survey.appendChild(createStats(doc));

	catalogue.appendChild(survey);
	doc.appendChild(catalogue);

	const serializer = new XMLSerializer();
	const xmlStr = serializer.serializeToString(doc);
	return '<?xml version="1.0"?>' + xmlStr;
};

const createPerceptionLocation = (data: FormValues, doc: XMLDocument) => {
	const perceptionLocation = doc.createElement('lloc_percepcio');

	const userLocationLayer = doc.createElement('capa_municipi_usuari');
	const userLocationLayerDescription = doc.createElement('desc_capa_municipi_usuari');
	const userLocationCode = doc.createElement('codi_municipi_usuari');

	const userLocationName = doc.createElement('nom_municipi_usuari');
	const userLocationEntityLayer = doc.createElement('capa_entitat_poblacio_usuari');
	const userLocationEntityDescription = doc.createElement('desc_capa_entitat_poblacio_usuari');
	const userLocationEntityCode = doc.createElement('codi_entitat_poblacio_usuari');
	const userLocationEntityName = doc.createElement('nom_entitat_poblacio_usuari');
	const userStreetType = doc.createElement('tipus_via_usuari');
	const userStreetName = doc.createElement('nom_via_usuari');
	const userStreetNumber = doc.createElement('numero_via_usuari');
	const userPostalCode = doc.createElement('codi_postal_usuari');
	const userToponymName = doc.createElement('toponim_usuari');
	const userCountry = doc.createElement('pais_usuari');

	const geoLocationCode = doc.createElement('codi_municipi_geo');
	const geoLocationName = doc.createElement('nom_municipi_geo');
	const geoLocationEntityCode = doc.createElement('codi_entitat_poblacio_geo');
	const geoLocationEntityName = doc.createElement('nom_entitat_poblacio_geo');
	const geoStreetType = doc.createElement('tipus_via_geo');
	const geoStreetName = doc.createElement('nom_via_geo');
	const geoStreetNumber = doc.createElement('numero_via_geo');
	const geoPostalCode = doc.createElement('codi_postal_geo');
	const geoToponymName = doc.createElement('toponim_geo');
	const geoCoordinates = doc.createElement('coordenada_geo');

	const geoCoordinatesLat = doc.createElement('latitud');
	const lat = data.coordinates && data.coordinates[1];
	geoCoordinatesLat.innerHTML = (lat ?? 0).toString();
	const geoCoordinatesLon = doc.createElement('longitud');
	const lon = data.coordinates && data.coordinates[0];
	geoCoordinatesLon.innerHTML = (lon ?? 0).toString();
	const geoCoordinatesAltitude = doc.createElement('elevacio');
	const geoCoordinatesEPSG = doc.createElement('sistema_referencia');
	geoCoordinatesEPSG.innerHTML = 'EPSG:4326';

	geoCoordinates.appendChild(geoCoordinatesLat);
	geoCoordinates.appendChild(geoCoordinatesLon);
	geoCoordinates.appendChild(geoCoordinatesAltitude);
	geoCoordinates.appendChild(geoCoordinatesEPSG);

	const geoPrecision = doc.createElement('indicador_exactitud_geo');

	perceptionLocation.appendChild(userLocationLayer);
	perceptionLocation.appendChild(userLocationLayerDescription);
	perceptionLocation.appendChild(userLocationCode);
	perceptionLocation.appendChild(userLocationName);
	perceptionLocation.appendChild(userLocationEntityLayer);
	perceptionLocation.appendChild(userLocationEntityDescription);
	perceptionLocation.appendChild(userLocationEntityCode);
	perceptionLocation.appendChild(userLocationEntityName);
	perceptionLocation.appendChild(userStreetType);
	perceptionLocation.appendChild(userStreetName);
	perceptionLocation.appendChild(userStreetNumber);
	perceptionLocation.appendChild(userPostalCode);
	perceptionLocation.appendChild(userToponymName);
	perceptionLocation.appendChild(userCountry);
	perceptionLocation.appendChild(geoLocationCode);
	perceptionLocation.appendChild(geoLocationName);
	perceptionLocation.appendChild(geoLocationEntityCode);
	perceptionLocation.appendChild(geoLocationEntityName);
	perceptionLocation.appendChild(geoStreetType);
	perceptionLocation.appendChild(geoStreetName);
	perceptionLocation.appendChild(geoStreetNumber);
	perceptionLocation.appendChild(geoPostalCode);
	perceptionLocation.appendChild(geoToponymName);
	perceptionLocation.appendChild(geoCoordinates);
	perceptionLocation.appendChild(geoPrecision);

	return perceptionLocation;
};

const createPosition = (data: FormValues, doc: XMLDocument) => {
	const position = doc.createElement('ubicacio');

	let positionCode = 1;
	let positionText = '';
	switch (data.position) {
		case 'notSpecified':
			positionCode = 1;
			positionText = 'Sense especificar';
			break;
		case 'outsideBuilding':
			positionCode = 2;
			positionText = "A l'aire lliure";
			break;
		case 'insideBuilding':
			positionCode = 3;
			positionText = "A l'interior d'un edifici";
			break;
		case 'vehicleStopped':
			positionCode = 4;
			positionText = "Dins d'un vehicle estacionat";
			break;
		case 'vehicleMoving':
			positionCode = 5;
			positionText = "Dins d'un vehicle en moviment";
			break;
		case 'other':
			positionCode = 6;
			positionText = 'Altres';
			break;
	}

	const positionCodeEl = doc.createElement('trobava');
	positionCodeEl.innerHTML = positionCode.toString();
	position.appendChild(positionCodeEl);

	const positionTextEl = doc.createElement('trobava_txt');
	positionTextEl.innerHTML = positionText;
	position.appendChild(positionTextEl);

	const positionFloor = doc.createElement('trobava_pis');
	if (data.floor) positionFloor.innerHTML = data.floor.toString();
	position.appendChild(positionFloor);

	const positionTotalFloors = doc.createElement('trobava_plantes');
	if (data.totalFloors) positionTotalFloors.innerHTML = data.totalFloors.toString();
	position.appendChild(positionTotalFloors);

	let situationObserverCode = 1;
	let situationObserverText = '';
	switch (data.situationObserver) {
		case 'notSpecified':
			situationObserverCode = 1;
			situationObserverText = 'Sense especificar';
			break;
		case 'moving':
			situationObserverCode = 2;
			situationObserverText = 'En moviment';
			break;
		case 'laying':
			situationObserverCode = 3;
			situationObserverText = 'Estirat';
			break;
		case 'seating':
			situationObserverCode = 4;
			situationObserverText = 'Assegut';
			break;
		case 'standing':
			situationObserverCode = 5;
			situationObserverText = 'De peu';
			break;
		case 'sleeping':
			situationObserverCode = 6;
			situationObserverText = 'Dormint';
			break;
		case 'other':
			situationObserverCode = 7;
			situationObserverText = 'Altres';
			break;
	}

	const situationObserverEl = doc.createElement('estava');
	situationObserverEl.innerHTML = situationObserverCode.toString();
	position.appendChild(situationObserverEl);

	const situationObserverTextEl = doc.createElement('estava_txt');
	situationObserverTextEl.innerHTML = situationObserverText;
	position.appendChild(situationObserverTextEl);

	return position;
};

const createFeel = (data: FormValues, doc: XMLDocument) => {
	const feel = doc.createElement('sentir');

	const felt = doc.createElement('sentit');
	felt.innerHTML = data.felt === 'yes' ? '1' : '0';
	feel.appendChild(felt);

	let numberPeopleInsideCode = 1;
	switch (data.numberPeopleInside) {
		case 'notSpecified':
			numberPeopleInsideCode = 1;
			break;
		case 'nobody':
			numberPeopleInsideCode = 3;
			break;
		case 'some':
			numberPeopleInsideCode = 4;
			break;
		case 'most':
			numberPeopleInsideCode = 5;
			break;
		case 'upperFloors':
			numberPeopleInsideCode = 6;
			break;
		case 'everybody':
			numberPeopleInsideCode = 7;
			break;
	}

	const numberPeopleInside = doc.createElement('quants_dins');
	numberPeopleInside.innerHTML = numberPeopleInsideCode.toString();
	feel.appendChild(numberPeopleInside);

	let numberPeopleOutsideCode = 1;
	switch (data.numberPeopleOutside) {
		case 'notSpecified':
			numberPeopleOutsideCode = 1;
			break;
		case 'nobody':
			numberPeopleOutsideCode = 3;
			break;
		case 'some':
			numberPeopleOutsideCode = 4;
			break;
		case 'most':
			numberPeopleOutsideCode = 5;
			break;
		case 'everybody':
			numberPeopleOutsideCode = 6;
			break;
	}

	const numberPeopleOutside = doc.createElement('quants_fora');
	numberPeopleOutside.innerHTML = numberPeopleOutsideCode.toString();
	feel.appendChild(numberPeopleOutside);

	let numberPeopleGoingOutCode = 1;
	switch (data.numberPeopleGoingOut) {
		case 'notSpecified':
			numberPeopleGoingOutCode = 1;
			break;
		case 'nobody':
			numberPeopleGoingOutCode = 3;
			break;
		case 'some':
			numberPeopleGoingOutCode = 4;
			break;
		case 'most':
			numberPeopleGoingOutCode = 5;
			break;
		case 'everybody':
			numberPeopleGoingOutCode = 6;
			break;
	}

	const numberPeopleGoingOut = doc.createElement('quants_correr');
	numberPeopleGoingOut.innerHTML = numberPeopleGoingOutCode.toString();
	feel.appendChild(numberPeopleGoingOut);

	let numberPeopleAwakeCode = 1;
	switch (data.numberPeopleAwake) {
		case 'notSpecified':
			numberPeopleAwakeCode = 1;
			break;
		case 'nobody':
			numberPeopleAwakeCode = 3;
			break;
		case 'some':
			numberPeopleAwakeCode = 4;
			break;
		case 'most':
			numberPeopleAwakeCode = 5;
			break;
		case 'everybody':
			numberPeopleAwakeCode = 6;
			break;
		case 'noOneSleeping':
			numberPeopleAwakeCode = 7;
			break;
	}

	const numberPeopleAwake = doc.createElement('quants_despertarse');
	numberPeopleAwake.innerHTML = numberPeopleAwakeCode.toString();
	feel.appendChild(numberPeopleAwake);

	return feel;
};

const createPerception = (data: FormValues, doc: XMLDocument) => {
	const perception = doc.createElement('percepcio');
	const movement = doc.createElement('moviment');

	let movementCode = 1;
	switch (data.movementDescription) {
		case 'notSpecified':
			movementCode = 1;
			break;
		case 'notFelt':
			movementCode = 2;
			break;
		case 'veryMild':
			movementCode = 3;
			break;
		case 'mild':
			movementCode = 4;
			break;
		case 'moderate':
			movementCode = 5;
			break;
		case 'strong':
			movementCode = 6;
			break;
		case 'veryStrong':
			movementCode = 7;
			break;
	}
	movement.innerHTML = movementCode.toString();
	perception.appendChild(movement);

	const movementText = doc.createElement('moviment_txt');
	perception.appendChild(movementText);

	const noise = doc.createElement('soroll');

	let noiseCode = 1;
	switch (data.noise) {
		case 'notSpecified':
			noiseCode = 1;
			break;
		case 'no':
			noiseCode = 2;
			break;
		case 'didntNotice':
			noiseCode = 3;
			break;
		case 'weak':
			noiseCode = 4;
			break;
		case 'moderate':
			noiseCode = 5;
			break;
		case 'strong':
			noiseCode = 6;
			break;
	}
	noise.innerHTML = noiseCode.toString();
	perception.appendChild(noise);

	const noiseText = doc.createElement('soroll_txt');
	perception.appendChild(noiseText);

	const reaction = doc.createElement('reaccio');

	let reactionCode = 1;
	switch (data.reaction) {
		case 'notSpecified':
			reactionCode = 1;
			break;
		case 'none':
			reactionCode = 2;
			break;
		case 'smallFright':
			reactionCode = 3;
			break;
		case 'alarm':
			reactionCode = 4;
			break;
		case 'frightened':
			reactionCode = 5;
			break;
		case 'veryFrightened':
			reactionCode = 6;
			break;
		case 'panic':
			reactionCode = 6;
			break;
	}
	reaction.innerHTML = reactionCode.toString();
	perception.appendChild(reaction);

	const standingDifficulty = doc.createElement('dret');

	let standingDifficultyCode = 1;
	switch (data.standingDifficulty) {
		case 'notSpecified':
			standingDifficultyCode = 1;
			break;
		case 'seated':
			standingDifficultyCode = 2;
			break;
		case 'no':
			standingDifficultyCode = 3;
			break;
		case 'yes':
			standingDifficultyCode = 4;
			break;
	}
	standingDifficulty.innerHTML = standingDifficultyCode.toString();
	perception.appendChild(standingDifficulty);

	const animalsFrightened = doc.createElement('animals');

	let animalsFrightenedCode = 1;
	switch (data.animalsFrightened) {
		case 'notSpecified':
			animalsFrightenedCode = 1;
			break;
		case 'no':
			animalsFrightenedCode = 3;
			break;
		case 'yes':
			animalsFrightenedCode = 4;
			break;
	}
	animalsFrightened.innerHTML = animalsFrightenedCode.toString();
	perception.appendChild(animalsFrightened);

	return perception;
};

const createObjects = (data: FormValues, doc: XMLDocument) => {
	const objects = doc.createElement('objectes');

	const effectsLamps = doc.createElement('llums');
	let effectsLampsCode = 1;
	switch (data.effectsLamps) {
		case 'notSpecified':
			effectsLampsCode = 1;
			break;
		case 'none':
			effectsLampsCode = 3;
			break;
		case 'oscilation':
			effectsLampsCode = 4;
			break;
		case 'bigOscilation':
			effectsLampsCode = 5;
			break;
	}
	effectsLamps.innerHTML = effectsLampsCode.toString();
	objects.appendChild(effectsLamps);

	const effectsLiquids = doc.createElement('liquids');
	let effectsLiquidsCode = 1;
	switch (data.effectsLiquids) {
		case 'notSpecified':
			effectsLiquidsCode = 1;
			break;
		case 'none':
			effectsLiquidsCode = 3;
			break;
		case 'oscilation':
			effectsLiquidsCode = 4;
			break;
		case 'bigOscilation':
			effectsLiquidsCode = 5;
			break;
	}
	effectsLiquids.innerHTML = effectsLiquidsCode.toString();
	objects.appendChild(effectsLiquids);

	const effectsPaintings = doc.createElement('quadres');
	let effectsPaintingsCode = 1;
	switch (data.effectsPaintings) {
		case 'notSpecified':
			effectsPaintingsCode = 1;
			break;
		case 'none':
			effectsPaintingsCode = 3;
			break;
		case 'vibration':
			effectsPaintingsCode = 4;
			break;
		case 'moved':
			effectsPaintingsCode = 5;
			break;
		case 'fell':
			effectsPaintingsCode = 6;
			break;
	}
	effectsPaintings.innerHTML = effectsPaintingsCode.toString();
	objects.appendChild(effectsPaintings);

	const effectsDoorsWindows = doc.createElement('portes');
	let effectsDoorsWindowsCode = 1;
	switch (data.effectsDoorsWindows) {
		case 'notSpecified':
			effectsDoorsWindowsCode = 1;
			break;
		case 'none':
			effectsDoorsWindowsCode = 3;
			break;
		case 'vibration':
			effectsDoorsWindowsCode = 4;
			break;
		case 'oscilation':
			effectsDoorsWindowsCode = 5;
			break;
		case 'openClose':
			effectsDoorsWindowsCode = 6;
			break;
	}
	effectsDoorsWindows.innerHTML = effectsDoorsWindowsCode.toString();
	objects.appendChild(effectsDoorsWindows);

	const effectsFurniture = doc.createElement('mobles');
	let effectsFurnitureCode = 1;
	switch (data.effectsFurniture) {
		case 'notSpecified':
			effectsFurnitureCode = 1;
			break;
		case 'none':
			effectsFurnitureCode = 3;
			break;
		case 'vibration':
			effectsFurnitureCode = 4;
			break;
		case 'movement':
			effectsFurnitureCode = 5;
			break;
		case 'fall':
			effectsFurnitureCode = 6;
			break;
	}
	effectsFurniture.innerHTML = effectsFurnitureCode.toString();
	objects.appendChild(effectsFurniture);

	const effectsPlants = doc.createElement('plantes');
	let effectsPlantsCode = 1;
	switch (data.effectsPlants) {
		case 'notSpecified':
			effectsPlantsCode = 1;
			break;
		case 'none':
			effectsPlantsCode = 3;
			break;
		case 'vibration':
			effectsPlantsCode = 4;
			break;
		case 'movement':
			effectsPlantsCode = 5;
			break;
		case 'fall':
			effectsPlantsCode = 6;
			break;
	}
	effectsPlants.innerHTML = effectsPlantsCode.toString();
	objects.appendChild(effectsPlants);

	const effectsShelves = doc.createElement('obj_vibrar');
	let effectsShelvesCode = 1;
	switch (data.effectsShelves) {
		case 'notSpecified':
			effectsShelvesCode = 1;
			break;
		case 'none':
			effectsShelvesCode = 3;
			break;
		case 'vibration':
			effectsShelvesCode = 4;
			break;
		case 'strongVibration':
			effectsShelvesCode = 5;
			break;
		case 'someFall':
			effectsShelvesCode = 6;
			break;
		case 'manyFall':
			effectsShelvesCode = 7;
			break;
		case 'mostFall':
			effectsShelvesCode = 8;
			break;
	}
	effectsShelves.innerHTML = effectsShelvesCode.toString();
	objects.appendChild(effectsShelves);

	const commentseffectsShelves = doc.createElement('obj_vibrar_txt');
	if (data.commentseffectsShelves) commentseffectsShelves.innerHTML = data.commentseffectsShelves;
	objects.appendChild(commentseffectsShelves);

	return objects;
};

const createDamage = (data: FormValues, doc: XMLDocument) => {
	const damage = doc.createElement('danys');

	const buildingType = doc.createElement('tipus_edifici');
	let buildingTypeCode = 0;
	switch (data.buildingType) {
		case 'notSpecified':
			buildingTypeCode = 0;
			break;
		case 'typeA':
			buildingTypeCode = 1;
			break;
		case 'typeB':
			buildingTypeCode = 2;
			break;
		case 'typeC':
			buildingTypeCode = 3;
			break;
		case 'typeD':
			buildingTypeCode = 4;
			break;
	}
	buildingType.innerHTML = buildingTypeCode.toString();
	damage.appendChild(buildingType);

	const buildingYear = doc.createElement('any_edifici');
	if (data.buildingYear) buildingYear.innerHTML = data.buildingYear;
	damage.appendChild(buildingYear);

	const buildingDamage = doc.createElement('danys');
	let buildingDamageCode = 0;
	switch (data.buildingType) {
		case 'notSpecified':
			buildingDamageCode = 0;
			break;
		default:
			buildingDamageCode = 3;
	}
	buildingDamage.innerHTML = buildingDamageCode.toString();
	damage.appendChild(buildingDamage);

	//What is supposed to go here?
	const buildingDamageDescription = doc.createElement('danys_tipus');
	damage.appendChild(buildingDamageDescription);

	const commentsDamage = doc.createElement('danys_txt');
	if (data.commentsDamage) commentsDamage.innerHTML = data.commentsDamage;
	damage.appendChild(commentsDamage);

	return damage;
};

const createComments = (data: FormValues, doc: XMLDocument) => {
	const comments = doc.createElement('comentari');

	const userComments = doc.createElement('comentari_usuari');
	if (data.comments) userComments.innerHTML = data.comments;
	comments.appendChild(userComments);
	//What is supposed to go here?
	const comments_txt = doc.createElement('varis_txt');
	comments.appendChild(comments_txt);
	return comments;
};

const createImage = (data: FormValues, doc: XMLDocument) => {
	const image = doc.createElement('imatge');

	const imageValue = doc.createElement('imatge');
	let imageValueCode = 1;

	switch (data.perceptionImage) {
		case 'notSpecified':
			imageValueCode = 0;
			break;
		case 'notPerceived':
			imageValueCode = 1;
			break;
		case 'perceived':
			imageValueCode = 2;
			break;
		case 'light':
			imageValueCode = 3;
			break;
		case 'moderate':
			imageValueCode = 4;
			break;
		case 'strong':
			imageValueCode = 5;
			break;
		case 'veryStrong':
			imageValueCode = 6;
			break;
		case 'severe':
			imageValueCode = 7;
			break;
		case 'verySevere':
			imageValueCode = 8;
			break;
	}
	imageValue.innerHTML = imageValueCode.toString();

	image.appendChild(imageValue);
	return image;
};

const createStats = (doc: XMLDocument) => {
	const stats = doc.createElement('estadistica');
	const userLangValue = navigator.language;

	const language = doc.createElement('idioma');
	language.innerHTML = userLangValue;
	stats.appendChild(language);

	const isMobile = doc.createElement('mobil');

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		isMobile.innerHTML = '1';
	} else {
		isMobile.innerHTML = '0';
	}

	stats.appendChild(isMobile);
	const user = doc.createElement('usuari');
	stats.appendChild(user);

	return stats;
};
