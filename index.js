Survey.StylesManager.applyTheme("bootstrap");

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
const json = {
  title: "Enquesta sísmica",
  showProgressBar: "top",
  logo: "logo.png",
  logoWidth: 200,
  logoHeight: 60,
  completedHtml: "Gràcies per omplir el formulari.",
  pages: [
    {
      elements: [
        {
          type: "radiogroup",
          name: "existentSeism",
          title: "Triar un sisme mesurat",
          colCount: 2,
          isRequired: true,
          hasNone: false,
          defaultValue: "yes",
          choices: [
            {
              value: "yes",
              text: "Sí, triar de la llista de sota",
            },
            {
              value: "no",
              text: "No apareix a la llista. Introduir la data i hora manualment",
            },
          ],
        },
        {
          type: "dropdown",
          name: "seism",
          title: "Trïi el sisme",
          isRequired: true,
          visibleIf: "{existentSeism}='yes'",
          choices: [],
        },
        {
          name: "earthquakeDate",
          type: "text",
          inputType: "date",
          title: "Data del terratrèmol:",
          isRequired: true,
          autoComplete: "bdate",
          maxWidth: "300px",
          visibleIf: "{existentSeism}='no'",
        },
        {
          name: "earthquakeHour",
          type: "text",
          inputType: "text",
          title: "Hora:",
          placeHolder: "HH:MM",
          startWithNewLine: false,

          isRequired: true,
          validators: [
            {
              type: "regex",
              regex: "[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}",
              text: "Format d'hora incorrecte. Ha de ser HH:MM, per exemple 14:56",
            },
          ],
          maxWidth: "300px",
          visibleIf: "{existentSeism}='no'",
        },
        {
          type: "radiogroup",
          name: "felt",
          title: "Ha notat el sisme?",
          colCount: 2,
          isRequired: true,
          hasNone: false,
          choices: [
            {
              value: "yes",
              text: "Sí",
            },
            {
              value: "no",
              text: "No",
            },
          ],
        },

        {
          type: "radiogroup",
          name: "locationMap",
          title: "Voleu triar la ubicació amb un mapa?",
          colCount: 2,
          isRequired: true,
          hasNone: false,
          choices: [
            {
              value: "yes",
              text: "Sí, seleccionar la ubicació arrossegant la icona del mapa",
            },
            {
              value: "no",
              text: "No, afegir la ubicació a mà (trieu aquesta opció si sabeu l'adreça exacta)",
            },
          ],
        },
        {
          type: "leaflet",
          name: "leaflet",
          title: "Lloc",
          useUserPosition: true,
          zoom: 14,
          height: 200,
          visibleIf: "{locationMap}='yes'",
        },
        {
          type: "dropdown",
          name: "parroquia",
          title: "Parròquia on es trobava en el moment del terràtremol",
          visibleIf: "{locationMap}='no'",
          choices: [],
        },
        {
          type: "dropdown",
          name: "territori",
          startWithNewLine: false,
          title:
            "Territori dins la parròquia on es trobava en el moment del terràtremol",
          visibleIf: "{locationMap}='no'",
          choices: [],
        },
        {
          type: "text",
          name: "street",
          title: "Carrer",
          inputType: "text",
          isRequired: false,

          visibleIf: "{locationMap}='no'",
        },
        {
          type: "text",
          name: "street",
          title: "Número",
          inputType: "number",
          isRequired: false,
          startWithNewLine: false,

          visibleIf: "{locationMap}='no'",
        },

        {
          type: "dropdown",
          name: "position",
          title: "Al moment de la sacsejada es trobava",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "outsideBuilding", text: "A l'aire lliure" },
            { value: "insideBuilding", text: "A l'interior d'un edifici" },
            { value: "vehicleStopped", text: "Dins d'un vehicle estacionat" },
            { value: "vehicleMoving", text: "Dins d'un vehicle en moviment" },
            { value: "other", text: "Altres" },
          ],
        },

        {
          type: "text",
          name: "floor",
          title: "En quin pis es trobava?",
          inputType: "number",
          visibleIf: "{position}='insideBuilding'",
        },
        {
          type: "text",
          name: "totalFloors",
          title: "Quants pisos té l'edifici?",
          startWithNewLine: false,

          inputType: "number",
          visibleIf: "{position}='insideBuilding'",
        },
        {
          type: "comment",
          name: "commentsBuilding",
          title: "Descripció del lloc on ereu",
          inputType: "text",
          isRequired: false,
          maxWidth: "700px",
          visibleIf: "{position}='other'",
        },
        {
          type: "dropdown",
          name: "situationObserver",
          title: "Al moment de la sacsejada, estaveu",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "moving", text: "En moviment" },
            { value: "laying", text: "Estirat" },
            { value: "seating", text: "Assegut" },
            { value: "standing", text: "De peu" },
            { value: "sleeping", text: "Dormint" },
            { value: "other", text: "Altres" },
          ],
        },
        {
          type: "comment",
          name: "commentsBuilding",
          title: "Descriviu el que feieu en el moment de la sacsejada",
          inputType: "text",
          isRequired: false,
          maxWidth: "700px",
          visibleIf: "{situationObserver}='other'",
        },
        {
          type: "dropdown",
          name: "numberPeopleInside",
          title:
            "Al moment de la sacsejada, quantes persones sentiren el terratrèmol?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          visibleIf: "{position}='insideBuilding'",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "dontknow", text: "No ho sé" },
            { value: "nobody", text: "Ningú" },
            { value: "some", text: "Algunes, la majoria no" },
            { value: "most", text: "La majoria, algunes no" },
            { value: "upperFloors", text: "Només a les plantes superiors" },
            { value: "everybody", text: "Tothom" },
          ],
        },
        {
          type: "dropdown",
          name: "numberPeopleOutside",
          title:
            "Al moment de la sacsejada, quantes persones sentiren el terratrèmol?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          visibleIf: "{position}!='insideBuilding'",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "dontknow", text: "No ho sé" },
            { value: "nobody", text: "Ningú" },
            { value: "some", text: "Algunes, la majoria no" },
            { value: "most", text: "La majoria, algunes no" },
            { value: "everybody", text: "Tothom" },
          ],
        },
        {
          type: "dropdown",
          name: "numberPeopleGoingOut",
          title: "Quantes persones sortiren al carrer espantades?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "dontknow", text: "No ho sé" },
            { value: "nobody", text: "Ningú" },
            { value: "some", text: "Algunes, la majoria no" },
            { value: "most", text: "La majoria, algunes no" },
            { value: "everybody", text: "Tothom" },
          ],
        },
        {
          type: "dropdown",
          name: "numberPeopleAwake",
          title: "Quantes persones es van despertar?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "dontknow", text: "No ho sé" },
            { value: "nobody", text: "Ningú" },
            { value: "some", text: "Algunes, la majoria no" },
            { value: "most", text: "La majoria, algunes no" },
            { value: "everybody", text: "Tothom" },
            { value: "noOneSleeping", text: "Ningú no dormia" },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: "dropdown",
          name: "movementDescription",
          title: "Com descriuria el moviment durant el terratrèmol?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "notFelt", text: "No vaig sentir el moviment" },
            { value: "veryMild", text: "Molt lleu" },
            { value: "mild", text: "Lleu" },
            { value: "moderate", text: "Moderat" },
            { value: "strong", text: "Fort" },
            { value: "veryStrong", text: "Molt fort" },
          ],
        },
        {
          type: "dropdown",
          name: "noise",
          title: "Va sentir algun soroll?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "no", text: "No" },
            { value: "didntNotice", text: "No m'hi vaig fixar" },
            { value: "weak", text: "Dèbil" },
            { value: "moderate", text: "Moderat" },
            { value: "strong", text: "Fort" },
          ],
        },
        {
          type: "dropdown",
          name: "reaction",
          title: "Quina reacció vareu tenir durant el terratrèmol?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "none", text: "Cap" },
            { value: "smallFright", text: "Un petit ensurt" },
            { value: "alarm", text: "Vaig alarmar-me" },
            { value: "frightened", text: "Vaig tenir por" },
            { value: "veryFrightened", text: "Vaig tenir molta por" },
            { value: "panic", text: "Vaig tenir pànic" },
          ],
        },
        {
          type: "dropdown",
          name: "standingDifficulty",
          title: "Us va resultar difícil estar dret durant el terratrèmol?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "seated", text: "No estava dret" },
            { value: "no", text: "No" },
            { value: "yes", text: "Sí" },
          ],
        },
        {
          type: "dropdown",
          name: "animalsFrightened",
          title: "Es van espantar els animals?",
          isRequired: true,
          hasNone: false,
          defaultValue: "notSpecified",
          choices: [
            { value: "notSpecified", text: "Sense especificar" },
            { value: "dontKnow", text: "No ho sé" },
            { value: "no", text: "No" },
            { value: "yes", text: "Sí" },
          ],
        },
        {
          type: "panel",
          name: "effects",
          elements: [
            {
              type: "dropdown",
              name: "effectsLamps",
              title: "Als llums penjats",
              hasNone: false,
              defaultValue: "notSpecified",

              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "none", text: "Cap" },
                { value: "oscilation", text: "Oscil·lació" },
                { value: "bigOscilation", text: "Gran oscil·lació" },
              ],
            },
            {
              type: "dropdown",
              name: "effectsLiquids",
              title: "Als líquids en recipients",
              hasNone: false,
              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "none", text: "Cap" },
                { value: "oscilation", text: "Oscil·lació" },
                { value: "bigOscilation", text: "Gran oscil·lació" },
              ],
            },
            {
              type: "dropdown",
              name: "effectsPaintings",
              title: "Als quadres penjats a les parets",
              hasNone: false,
              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "none", text: "Cap" },
                { value: "vibration", text: "Van vibrar" },
                { value: "moved", text: "Es van moure" },
                { value: "fell", text: "Algun va caure" },
              ],
            },
            {
              type: "dropdown",
              name: "effectsDoorsWindows",
              title: "A portes i finestres",
              hasNone: false,
              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "none", text: "Cap" },
                { value: "vibration", text: "Van vibrar" },
                { value: "oscilation", text: "Oscil·lació" },
                { value: "openClose", text: "Van obrir-se o tancar-se" },
              ],
            },
            {
              type: "dropdown",
              name: "effectsFurniture",
              title: "A mobles i electrodomèstics",
              hasNone: false,
              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "none", text: "Cap" },
                { value: "vibration", text: "Van vibrar" },
                { value: "movement", text: "Alguns es van moure" },
                { value: "fall", text: "Algun es va caure" },
              ],
            },
            {
              type: "dropdown",
              name: "effectsPlants",
              title: "A les plantes",
              hasNone: false,
              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "none", text: "Cap" },
                { value: "vibration", text: "Van vibrar" },
                { value: "movement", text: "Alguna es va moure" },
                { value: "fall", text: "Alguna va caure" },
              ],
            },
            {
              type: "dropdown",
              name: "effectsShelves",
              title: "A les prestatgeries o taules",
              hasNone: false,
              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "none", text: "Cap" },
                { value: "vibration", text: "Van vibrar" },
                { value: "strongVibration", text: "Van vibrar am força" },
                { value: "someFall", text: "Alguna va caure" },
                { value: "manyFall", text: "Moltes van caure" },
                { value: "mostFall", text: "La majoria van caure" },
              ],
            },
            {
              type: "comment",
              name: "commentseffectsShelves",
              title: "Descriviu, si voleu, quins objectes van caure",
              inputType: "text",
              isRequired: false,
              maxWidth: "700px",
            },
          ],
          title: "Quins efectes vareu observar",
        },
        {
          type: "panel",
          name: "buildingDamage",
          elements: [
            {
              type: "dropdown",
              name: "buildingType",
              title: "La construcció de l'edifici és",
              hasNone: false,

              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                {
                  value: "typeA",
                  text: "Tipus A: Parets de maçoneria en sec o amb fang, o edifici amb patologia generalitzada",
                },
                {
                  value: "typeB",
                  text: "Tipus B: Construccions amb mur de fàbrica de totxo, blocs de morter, etc.",
                },
                {
                  value: "typeC",
                  text: "Tipus C: Construccions amb estructura metàl·ica o de formigó armat",
                },
              ],
              maxWidth: "700px",
            },
            {
              type: "text",
              name: "buildingYear",
              title: "Any de contrucció de l'edifici",
              inputType: "number",
              startWithNewLine: false,
            },
            {
              type: "dropdown",
              name: "buildingDamage",
              title: "Vareu observar danys a l'edifici?",
              hasNone: false,
              defaultValue: "notSpecified",
              choices: [
                { value: "notSpecified", text: "Sense especificar" },
                { value: "dontKnow", text: "No ho vaig observar" },
                { value: "no", text: "No" },
                { value: "yes", text: "Sí" },
              ],
            },
            {
              type: "checkbox",
              name: "buildingDamageDescription",
              title: "Vareu observar danys a l'edifici?",
              visibleIf: "{buildingDamage}='yes'",
              colCount: 3,
              choices: [
                {
                  value: "smallCracksCoating",
                  text: "Revestiment de les parets amb petites esquerdes",
                },
                {
                  value: "bigCracksCoating",
                  text: "Revestiment de les parets amb esquerdes grans",
                },
                {
                  value: "cracksWalls",
                  text: "Petites esquerdes a les parets",
                },
                {
                  value: "cracksWindows",
                  text: "Algunes finestres esquerdades",
                },
                {
                  value: "cracksWallsBig",
                  text: "Parets amb algunes esquerdes grans",
                },
                {
                  value: "cracksWallsMany",
                  text: "Parets amb moltes esquerdes grans",
                },
                { value: "fallenTiles", text: "Teules o lluminàries caigudes" },
                { value: "cracksSmokestack", text: "Xemeneies esquerdades" },
                {
                  value: "cracksWindowsMany",
                  text: "Molres finestres esquerdades o trencades",
                },
                {
                  value: "stonesFromWalls",
                  text: "Pedres o rajoles caigudes de les parets",
                },
                {
                  value: "fallenCoating",
                  text: "Petits trossos de revestiment caiguts",
                },
                {
                  value: "damagedSmokestack",
                  text: "Xemeneies antigues amb grans danys",
                },
                {
                  value: "fallenSmokestack",
                  text: "Xemeneies antigues caigudes",
                },
                {
                  value: "damagedSmokestackModern",
                  text: "Xemeneies modernes amb grans danys",
                },
                {
                  value: "fallenSmokestackModern",
                  text: "Xemeneies modernes caigudes",
                },
                { value: "fallenFloatingWall", text: "Mur flotant caigut" },
                { value: "fallenWall", text: "Mur caigut" },
                {
                  value: "fallenBalcony",
                  text: "Porxos, balcons o altres afegits del edifici separats o caiguts",
                },
                {
                  value: "fallenBuilding",
                  text: "Edifici desplaçat permanentment",
                },
              ],
            },
            {
              type: "comment",
              name: "commentsDamage",
              title: "Altres comentaris sobre els danys",
              inputType: "text",
              isRequired: false,
              maxWidth: "700px",
            },
          ],
          title: "Danys observats als edificis",
        },

        {
          type: "comment",
          name: "comments",
          title: "Desitgeu afegir algun altre comentari o aclaració?",
          inputType: "text",
          isRequired: false,
          maxWidth: "700px",
        },
      ],
    },
  ],
};

Survey.Survey.cssType = "bootstrap";

const supabaseUrl = "https://svyhccttsxgjrefxiiro.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA4ODc0NiwiZXhwIjoxOTU0NjY0NzQ2fQ.XmlC695aKtt85caWPcPSDWBUP9z4RDS_eGQ-eWjfwKE";

const getSeism = async () => {
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey, {schema: 'seismology'});

  const { data: dataSeism, error: errorSeism } = await supabaseClient
    .from("seism")
    .select();

  errorSeism && console.log("Error downloading seisms:", errorSeism);

  const { data: dataMunicipalities, error: errorMunicipalities } =
    await supabaseClient
      .from("territorial_division")
      .select("parroquia, territori");

  errorMunicipalities &&
    console.log("Error downloading municipalities:", errorMunicipalities);

  const parroquiesList = [
    ...new Set(dataMunicipalities.map((d) => d.parroquia)),
  ];

  const jsonWithSeism = {
    ...json,
    pages: [
      ...json.pages.map((page) => ({
        ...page,
        elements: page.elements.map((element) => {
          switch (element.name) {
            case "seism":
              return {
                ...element,
                choices: dataSeism.map(
                  (seism) =>
                    seism.datetime +
                    " magnitud: " +
                    seism.magnitude +
                    " (" +
                    seism.region +
                    ")"
                ),
              };
            case "parroquia":
              return {
                ...element,
                choices: parroquiesList,
              };
            case "territori":
              return {
                ...element,
                choices: dataMunicipalities.map((d) => ({
                  value: d.territori,
                  visibleIf: "{parroquia} = '" + d.parroquia + "'",
                })),
              };
            default:
              return element;
          }
        }),
      })),
    ],
  };

  var model = new Survey.Model(jsonWithSeism);
  window.survey = model;

  model.locale = "ca";
  survey.onComplete.add(async function (sender) {
    const indices = getIndices(sender.data);
    document.querySelector("#surveyResult").textContent =
      "Resultar JSON:\n" +
      JSON.stringify(indices) +
      "---" +
      JSON.stringify(sender.data, null, 3);

    await supabaseClient.from("survey").insert([
      {
        survey_data: sender.data,
        cws: indices.cws,
        cii: indices.cii,
        indices: indices,
      },
    ]);
  });

  model.render("surveyElement");
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

getSeism();
