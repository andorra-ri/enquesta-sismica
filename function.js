const json = {
  existentSeism: "yes",
  seism: "2021-01-01T00:00:00+00:00 magnitud: 2 (Ripolles)",
  felt: "yes",
  locationMap: "yes",
  leaflet: {
    lng: " 2.146564",
    lat: "41.390819",
  },
  position: "notSpecified",
  situationObserver: "notSpecified",
  numberPeopleOutside: "notSpecified",
  numberPeopleGoingOut: "notSpecified",
  numberPeopleAwake: "notSpecified",
  movementDescription: "notFelt",
  noise: "notSpecified",
  reaction: "notSpecified",
  standingDifficulty: "notSpecified",
  animalsFrightened: "notSpecified",
  effectsLamps: "notSpecified",
  effectsLiquids: "notSpecified",
  effectsPaintings: "notSpecified",
  effectsDoorsWindows: "notSpecified",
  effectsFurniture: "notSpecified",
  effectsPlants: "dontKnow",
  effectsShelves: "none",
  buildingType: "notSpecified",
  buildingDamage: "yes",
  buildingDamageDescription: [
    "smallCracksCoating",
    "cracksWindows",
    "fallenTiles",
  ],
};

const getIndices = (data) => {
  const feltYesNo = data.felt === "yes" ? 1 : 0;
  let numberPeopleInside;
  switch (data.numberPeopleInside) {
    case "notSpecified":
      numberPeopleInside = 0.72;
      break;
    case "dontknow":
      numberPeopleInside = 0.72;
      break;
    case "nobody":
      numberPeopleInside = 0.36;
      break;
    case "some":
      numberPeopleInside = 0.72;
      break;
    case "most":
      numberPeopleInside = 1;
      break;
    case "upperFloors":
      numberPeopleInside = 0.36;
      break;
    case "everybody":
      numberPeopleInside = 1;
      break;
    default:
      numberPeopleInside = 0.72;
  }

  let numberPeopleOutside;
  switch (data.numberPeopleOutside) {
    case "notSpecified":
      numberPeopleOutside = 0.72;
      break;
    case "dontknow":
      numberPeopleOutside = 0.72;
      break;
    case "nobody":
      numberPeopleOutside = 0.36;
      break;
    case "some":
      numberPeopleOutside = 0.72;
      break;
    case "most":
      numberPeopleOutside = 1;
      break;
    case "everybody":
      numberPeopleOutside = 1;
      break;
    default:
      numberPeopleOutside = 0.72;
  }

  let numberPeopleAwake;
  switch (data.numberPeopleAwake) {
    case "notSpecified":
      numberPeopleAwake = 0.72;
      break;
    case "dontknow":
      numberPeopleAwake = 0.72;
      break;
    case "nobody":
      numberPeopleAwake = 0.36;
      break;
    case "some":
      numberPeopleAwake = 0.72;
      break;
    case "most":
      numberPeopleAwake = 1;
      break;
    case "everybody":
      numberPeopleAwake = 1;
      break;
    case "noOneSleeping":
      numberPeopleAwake = 0.72;
      break;
    default:
      numberPeopleAwake = 0.72;
  }
  const feltIndex =
    feltYesNo *
    Math.max(numberPeopleInside, numberPeopleOutside, numberPeopleAwake);

  let motionIndex;
  switch (data.movementDescription) {
    case "notSpecified":
      motionIndex = 0;
      break;
    case "notFelt":
      motionIndex = 0;
      break;
    case "veryMild":
      motionIndex = 1;
      break;
    case "mild":
      motionIndex = 2;
      break;
    case "moderate":
      motionIndex = 3;
      break;
    case "strong":
      motionIndex = 4;
      break;
    case "veryStrong":
      motionIndex = 5;
      break;
    default:
      motionIndex = 0;
  }

  let reactionIndex;
  switch (data.reaction) {
    case "notSpecified":
      reactionIndex = 0;
      break;
    case "none":
      reactionIndex = 0;
      break;
    case "smallFright":
      reactionIndex = 1;
      break;
    case "alarm":
      reactionIndex = 2;
      break;
    case "frightened":
      reactionIndex = 3;
      break;
    case "veryFrightened":
      reactionIndex = 4;
      break;
    case "panic":
      reactionIndex = 5;
      break;
    default:
      reactionIndex = 0;
  }

  let standIndex;
  switch (data.standingDifficulty) {
    case "notSpecified":
      standIndex = 0;
      break;
    case "seated":
      standIndex = 0;
      break;
    case "no":
      standIndex = 0;
      break;
    case "yes":
      standIndex = 1;
      break;
    default:
      standIndex = 0;
  }

  let shelfIndex;
  switch (data.effectsShelves) {
    case "notSpecified":
      shelfIndex = 0;
      break;
    case "dontKnow":
      shelfIndex = 0;
      break;
    case "none":
      shelfIndex = 0;
      break;
    case "vibration":
      shelfIndex = 0;
      break;
    case "strongVibration":
      shelfIndex = 0;
      break;
    case "someFall":
      shelfIndex = 1;
      break;
    case "manyFall":
      shelfIndex = 2;
      break;
    case "mostFall":
      shelfIndex = 3;
      break;
    default:
      shelfIndex = 0;
  }

  let pictureIndex;
  switch (data.effectsPaintings) {
    case "notSpecified":
      pictureIndex = 0;
      break;
    case "dontKnow":
      pictureIndex = 0;
      break;
    case "none":
      pictureIndex = 0;
      break;
    case "vibration":
      pictureIndex = 0;
      break;
    case "moved":
      pictureIndex = 1;
      break;
    case "someFall":
      pictureIndex = 1;
      break;
    default:
      pictureIndex = 0;
  }

  let furnitureIndex;
  switch (data.effectsFurniture) {
    case "notSpecified":
      furnitureIndex = 0;
      break;
    case "dontKnow":
      furnitureIndex = 0;
      break;
    case "none":
      furnitureIndex = 0;
      break;
    case "vibration":
      furnitureIndex = 0;
      break;
    case "movement":
      furnitureIndex = 1;
      break;
    case "fall":
      furnitureIndex = 1;
      break;
    default:
      furnitureIndex = 0;
  }

  let damageIndex = 0;
  if (data.buildingDamageDescription) {
    if (data.buildingDamageDescription.includes("smallCracksCoating")) {
      damageIndex = 0.25;
    }
    if (data.buildingDamageDescription.includes("bigCracksCoating")) {
      damageIndex = 0.5;
    }
    if (data.buildingDamageDescription.includes("cracksWalls")) {
      damageIndex = 0.5;
    }
    if (data.buildingDamageDescription.includes("cracksWindows")) {
      damageIndex = 0.5;
    }
    if (data.buildingDamageDescription.includes("cracksWallsMany")) {
      damageIndex = 0.75;
    }
    if (data.buildingDamageDescription.includes("cracksWallsBig")) {
      damageIndex = 1;
    }
    if (data.buildingDamageDescription.includes("fallenTiles")) {
      damageIndex = 1;
    }
    if (data.buildingDamageDescription.includes("cracksSmokestack")) {
      damageIndex = 1;
    }
    if (data.buildingDamageDescription.includes("cracksWindowsMany")) {
      damageIndex = 2;
    }
    if (data.buildingDamageDescription.includes("stonesFromWalls")) {
      damageIndex = 2;
    }
    if (data.buildingDamageDescription.includes("fallenCoating")) {
      damageIndex = 2;
    }
    if (data.buildingDamageDescription.includes("damagedSmokestack")) {
      damageIndex = 2;
    }
    if (data.buildingDamageDescription.includes("fallenSmokestack")) {
      damageIndex = 2;
    }
    if (data.buildingDamageDescription.includes("damagedSmokestackModern")) {
      damageIndex = 3;
    }
    if (data.buildingDamageDescription.includes("fallenSmokestackModern")) {
      damageIndex = 3;
    }
    if (data.buildingDamageDescription.includes("fallenFloatingWall")) {
      damageIndex = 3;
    }
    if (data.buildingDamageDescription.includes("fallenWall")) {
      damageIndex = 3;
    }
    if (data.buildingDamageDescription.includes("fallenBalcony")) {
      damageIndex = 3;
    }
    if (data.buildingDamageDescription.includes("fallenBuilding")) {
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
    cii,
  };
};

console.log(getIndices(json));
