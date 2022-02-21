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
          maxWidth: "700px",
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
          initialLatitude: 42.545,
          initialLongitude: 1.563
        },
        {
          type: "dropdown",
          maxWidth: "700px",
          name: "pais",
          title: "País on es trobava en el moment del terràtremol",
          visibleIf: "{locationMap}='no'",
          defaultValue: "Andorra",
          choices: ["Andorra", "Espanya","França"],
          startWithNewLine: false,
        },
        {
          type: "dropdown",
          maxWidth: "700px",
          name: "parroquia",
          title: "Parròquia on es trobava en el moment del terràtremol",
          visibleIf: "{locationMap}='no' and {pais}='Andorra'",
          startWithNewLine: false,
          choices: [],
        },
        {
          type: "dropdown",
          maxWidth: "700px",
          name: "territori",
          startWithNewLine: false,
          title:
            "Territori dins la parròquia on es trobava en el moment del terràtremol",
          visibleIf: "{locationMap}='no' and {pais}='Andorra'",
          choices: [],
        },
        {
          type: "text",
          name: "municipality",
          title: "Municipi on es trobava en el moment del terràtremol",
          inputType: "number",
          isRequired: false,
          startWithNewLine: false,
          visibleIf: "{locationMap}='no' and {pais}!='Andorra'",
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
          maxWidth: "700px",
          name: "position",
          title: "Al moment de la sacsejada es trobava",
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
          visibleIf: "{position}='insideBuilding'",
          "validators": [
            {
                "type": "numeric",
                "minValue": 1,
                "maxValue": 25
            }
        ]
        
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
          maxWidth: "700px",
          name: "situationObserver",
          title: "Al moment de la sacsejada, estaveu",
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
          maxWidth: "700px",
          name: "numberPeopleInside",
          title:
            "Al moment de la sacsejada, quantes persones sentiren el terratrèmol?",
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
          type: "radiogroup",
          colCount: 3,
          name: "numberPeopleOutside",
          title:
            "Al moment de la sacsejada, quantes persones sentiren el terratrèmol?",
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
          type: "radiogroup",
          colCount: 3,
          name: "numberPeopleGoingOut",
          title: "Quantes persones sortiren al carrer espantades?",
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
          type: "radiogroup",
          colCount: 3,
          name: "numberPeopleAwake",
          title: "Quantes persones es van despertar?",
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
      title: "Percepció personal",
      elements: [
        {
          type: "dropdown",
          maxWidth: "700px",
          name: "movementDescription",
          title: "Com descriuria el moviment durant el terratrèmol?",
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
          maxWidth: "700px",
          name: "noise",
          title: "Va sentir algun soroll?",
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
          maxWidth: "700px",
          name: "reaction",
          title: "Quina reacció vareu tenir durant el terratrèmol?",
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
          maxWidth: "700px",
          name: "standingDifficulty",
          title: "Us va resultar difícil estar dret durant el terratrèmol?",
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
          maxWidth: "700px",
          name: "animalsFrightened",
          title: "Es van espantar els animals?",
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
              maxWidth: "700px",
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
              maxWidth: "700px",
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
              maxWidth: "700px",
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
              maxWidth: "700px",
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
              maxWidth: "700px",
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
              maxWidth: "700px",
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
              maxWidth: "700px",
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
              maxWidth: "700px",
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
              maxWidth: "400px",
              startWithNewLine: false,
              "validators": [
                {
                    "type": "numeric",
                    "minValue": 1000,
                    "maxValue": 2050
                }
            ]
            },
            {
              type: "dropdown",
              maxWidth: "700px",
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
    {
      title: "Índex de percepció",
      elements: [
        {
          type: "imagepicker",
          name: "perceptionImage",
          title:
            "Seleccioneu la imatge que millor resumeixi la situació viscuda",
          imageWidth: 362,
          imageHeight: 288,
          showLabel: true,
          defaultValue: "notSpecified",
          choices: [
            {
              text: "No percebut",
              value: "notPerceived",
              imageLink: "images/EMS98-1.jpg",
            },
            {
              text: "Poc percebut",
              value: "perceived",
              imageLink: "images/EMS98-2.jpg",
            },
            {
              text: "Lleuger",
              value: "light",
              imageLink: "images/EMS98-3.jpg",
            },
            {
              text: "Moderat",
              value: "moderate",
              imageLink: "images/EMS98-4.jpg",
            },
            {
              text: "Fort",
              value: "strong",
              imageLink: "images/EMS98-5.jpg",
            },
            {
              text: "Molt fort",
              value: "veryStrong",
              imageLink: "images/EMS98-6.jpg",
            },
            {
              text: "Sever",
              value: "severe",
              imageLink: "images/EMS98-7.jpg",
            },
            {
              text: "Molt sever",
              value: "verySevere",
              imageLink: "images/EMS98-8.jpg",
            },
            {
              text: "No especificat",
              value: "notSpecified",
              imageLink: "images/EMS98-0.jpg",
            },
          ],
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
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey, {
    schema: "seismology",
  });

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
    const xmlReport = createXMLReport(sender.data);
    await supabaseClient.from("survey").insert([
      {
        survey_data: sender.data,
        cws: indices.cws,
        cii: indices.cii,
        indices: indices,
        xml_report: xmlReport,
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
const createPerceptionLocation = (data, doc) => {
  const perceptionLocation = doc.createElement("lloc_percepcio");

  const userLocationLayer = doc.createElement("capa_municipi_usuari");
  const userLocationLayerDescription = doc.createElement(
    "desc_capa_municipi_usuari"
  );
  const userLocationCode = doc.createElement("codi_municipi_usuari");

  const userLocationName = doc.createElement("nom_municipi_usuari");
  const userLocationEntityLayer = doc.createElement(
    "capa_entitat_poblacio_usuari"
  );
  const userLocationEntityDescription = doc.createElement(
    "desc_capa_entitat_poblacio_usuari"
  );
  const userLocationEntityCode = doc.createElement(
    "codi_entitat_poblacio_usuari"
  );
  const userLocationEntityName = doc.createElement(
    "nom_entitat_poblacio_usuari"
  );
  const userStreetType = doc.createElement("tipus_via_usuari");
  const userStreetName = doc.createElement("nom_via_usuari");
  const userStreetNumber = doc.createElement("numero_via_usuari");
  const userPostalCode = doc.createElement("codi_postal_usuari");
  const userToponymName = doc.createElement("toponim_usuari");
  const userCountry = doc.createElement("pais_usuari");

  const geoLocationCode = doc.createElement("codi_municipi_geo");
  const geoLocationName = doc.createElement("nom_municipi_geo");
  const geoLocationEntityCode = doc.createElement("codi_entitat_poblacio_geo");
  const geoLocationEntityName = doc.createElement("nom_entitat_poblacio_geo");
  const geoStreetType = doc.createElement("tipus_via_geo");
  const geoStreetName = doc.createElement("nom_via_geo");
  const geoStreetNumber = doc.createElement("numero_via_geo");
  const geoPostalCode = doc.createElement("codi_postal_geo");
  const geoToponymName = doc.createElement("toponim_geo");
  const geoCoordinates = doc.createElement("coordenada_geo");

  const geoCoordinatesLat = doc.createElement("latitud");
  if (data.leaflet && data.leaflet.lat) geoCoordinatesLat.innerHTML = data.leaflet.lat;
  const geoCoordinatesLon = doc.createElement("longitud");
  if (data.leaflet && data.leaflet.lng) geoCoordinatesLon.innerHTML = data.leaflet.lng;
  const geoCoordinatesAltitude = doc.createElement("elevacio");
  const geoCoordinatesEPSG = doc.createElement("sistema_referencia");
  geoCoordinatesEPSG.innerHTML = "EPSG:4326";

  geoCoordinates.appendChild(geoCoordinatesLat);
  geoCoordinates.appendChild(geoCoordinatesLon);
  geoCoordinates.appendChild(geoCoordinatesAltitude);
  geoCoordinates.appendChild(geoCoordinatesEPSG);

  const geoPrecision = doc.createElement("indicador_exactitud_geo");

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

const createPosition = (data, doc) => {
  const position = doc.createElement("ubicacio");

  let positionCode = 1;
  let positionText = "";
  switch (data.position) {
    case "notSpecified":
      positionCode = 1;
      positionText = "Sense especificar";
      break;
    case "outsideBuilding":
      positionCode = 2;
      positionText = "A l'aire lliure";
      break;
    case "insideBuilding":
      positionCode = 3;
      positionText = "A l'interior d'un edifici";
      break;
    case "vehicleStopped":
      positionCode = 4;
      positionText = "Dins d'un vehicle estacionat";
      break;
    case "vehicleMoving":
      positionCode = 5;
      positionText = "Dins d'un vehicle en moviment";
      break;
    case "other":
      positionCode = 6;
      positionText = "Altres";
      break;
  }

  const positionCodeEl = doc.createElement("trobava");
  positionCodeEl.innerHTML = positionCode;
  position.appendChild(positionCodeEl);

  const positionTextEl = doc.createElement("trobava_txt");
  positionTextEl.innerHTML = positionText;
  position.appendChild(positionTextEl);

  const positionFloor = doc.createElement("trobava_pis");
  if (data.floor) positionFloor.innerHTML = data.floor;
  position.appendChild(positionFloor);

  const positionTotalFloors = doc.createElement("trobava_plantes");
  if (data.totalFloors) positionTotalFloors.innerHTML = data.totalFloors;
  position.appendChild(positionTotalFloors);

  let situationObserverCode = 1;
  let situationObserverText = "";
  switch (data.situationObserver) {
    case "notSpecified":
      situationObserverCode = 1;
      situationObserverText = "Sense especificar";
      break;
    case "moving":
      situationObserverCode = 2;
      situationObserverText = "En moviment";
      break;
    case "laying":
      situationObserverCode = 3;
      situationObserverText = "Estirat";
      break;
    case "seating":
      situationObserverCode = 4;
      situationObserverText = "Assegut";
      break;
    case "standing":
      situationObserverCode = 5;
      situationObserverText = "De peu";
      break;
    case "sleeping":
      situationObserverCode = 6;
      situationObserverText = "Dormint";
      break;
    case "other":
      situationObserverCode = 7;
      situationObserverText = "Altres";
      break;
  }

  const situationObserverEl = doc.createElement("estava");
  situationObserverEl.innerHTML = situationObserverCode;
  position.appendChild(situationObserverEl);

  const situationObserverTextEl = doc.createElement("estava_txt");
  situationObserverTextEl.innerHTML = situationObserverText;
  position.appendChild(situationObserverTextEl);

  return position;
};

const createFeel = (data, doc) => {
  const feel = doc.createElement("sentir");

  const felt = doc.createElement("sentit");
  felt.innerHTML = data.felt === "yes" ? 1 : 0;
  feel.appendChild(felt);

  let numberPeopleInsideCode = 1;
  switch (data.numberPeopleInside) {
    case "notSpecified":
      numberPeopleInsideCode = 1;
      break;
    case "dontknow":
      numberPeopleInsideCode = 2;
      break;
    case "nobody":
      numberPeopleInsideCode = 3;
      break;
    case "some":
      numberPeopleInsideCode = 4;
      break;
    case "most":
      numberPeopleInsideCode = 5;
      break;
    case "upperFloors":
      numberPeopleInsideCode = 6;
      break;
    case "everybody":
      numberPeopleInsideCode = 7;
      break;
  }

  const numberPeopleInside = doc.createElement("quants_dins");
  numberPeopleInside.innerHTML = numberPeopleInsideCode;
  feel.appendChild(numberPeopleInside);

  let numberPeopleOutsideCode = 1;
  switch (data.numberPeopleOutside) {
    case "notSpecified":
      numberPeopleOutsideCode = 1;
      break;
    case "dontknow":
      numberPeopleOutsideCode = 2;
      break;
    case "nobody":
      numberPeopleOutsideCode = 3;
      break;
    case "some":
      numberPeopleOutsideCode = 4;
      break;
    case "most":
      numberPeopleOutsideCode = 5;
      break;
    case "everybody":
      numberPeopleOutsideCode = 6;
      break;
  }

  const numberPeopleOutside = doc.createElement("quants_fora");
  numberPeopleOutside.innerHTML = numberPeopleOutsideCode;
  feel.appendChild(numberPeopleOutside);

  let numberPeopleGoingOutCode = 1;
  switch (data.numberPeopleGoingOut) {
    case "notSpecified":
      numberPeopleGoingOutCode = 1;
      break;
    case "dontknow":
      numberPeopleGoingOutCode = 2;
      break;
    case "nobody":
      numberPeopleGoingOutCode = 3;
      break;
    case "some":
      numberPeopleGoingOutCode = 4;
      break;
    case "most":
      numberPeopleGoingOutCode = 5;
      break;
    case "everybody":
      numberPeopleGoingOutCode = 6;
      break;
  }

  const numberPeopleGoingOut = doc.createElement("quants_correr");
  numberPeopleGoingOut.innerHTML = numberPeopleGoingOutCode;
  feel.appendChild(numberPeopleGoingOut);

  let numberPeopleAwakeCode = 1;
  switch (data.numberPeopleAwake) {
    case "notSpecified":
      numberPeopleAwakeCode = 1;
      break;
    case "dontknow":
      numberPeopleAwakeCode = 2;
      break;
    case "nobody":
      numberPeopleAwakeCode = 3;
      break;
    case "some":
      numberPeopleAwakeCode = 4;
      break;
    case "most":
      numberPeopleAwakeCode = 5;
      break;
    case "everybody":
      numberPeopleAwakeCode = 6;
      break;
    case "noOneSleeping":
      numberPeopleAwakeCode = 7;
      break;
  }

  const numberPeopleAwake = doc.createElement("quants_despertarse");
  numberPeopleAwake.innerHTML = numberPeopleAwakeCode;
  feel.appendChild(numberPeopleAwake);

  return feel;
};

const createPerception = (data, doc) => {
  const perception = doc.createElement("percepcio");
  const movement = doc.createElement("moviment");

  let movementCode = 1;
  switch (data.movementDescription) {
    case "notSpecified":
      movementCode = 1;
      break;
    case "notFelt":
      movementCode = 2;
      break;
    case "veryMild":
      movementCode = 3;
      break;
    case "mild":
      movementCode = 4;
      break;
    case "moderate":
      movementCode = 5;
      break;
    case "strong":
      movementCode = 6;
      break;
    case "veryStrong":
      movementCode = 7;
      break;
  }
  movement.innerHTML = movementCode;
  perception.appendChild(movement);

  const movementText = doc.createElement("moviment_txt");
  perception.appendChild(movementText);

  const noise = doc.createElement("soroll");

  let noiseCode = 1;
  switch (data.noise) {
    case "notSpecified":
      noiseCode = 1;
      break;
    case "no":
      noiseCode = 2;
      break;
    case "didntNotice":
      noiseCode = 3;
      break;
    case "weak":
      noiseCode = 4;
      break;
    case "moderate":
      noiseCode = 5;
      break;
    case "strong":
      noiseCode = 6;
      break;
  }
  noise.innerHTML = noiseCode;
  perception.appendChild(noise);

  const noiseText = doc.createElement("soroll_txt");
  perception.appendChild(noiseText);

  const reaction = doc.createElement("reaccio");

  let reactionCode = 1;
  switch (data.reaction) {
    case "notSpecified":
      reactionCode = 1;
      break;
    case "none":
      reactionCode = 2;
      break;
    case "smallFright":
      reactionCode = 3;
      break;
    case "alarm":
      reactionCode = 4;
      break;
    case "frightened":
      reactionCode = 5;
      break;
    case "veryFrightened":
      reactionCode = 6;
      break;
    case "panic":
      reactionCode = 6;
      break;
  }
  reaction.innerHTML = reactionCode;
  perception.appendChild(reaction);

  const standingDifficulty = doc.createElement("dret");

  let standingDifficultyCode = 1;
  switch (data.standingDifficulty) {
    case "notSpecified":
      standingDifficultyCode = 1;
      break;
    case "seated":
      standingDifficultyCode = 2;
      break;
    case "no":
      standingDifficultyCode = 3;
      break;
    case "yes":
      standingDifficultyCode = 4;
      break;
  }
  standingDifficulty.innerHTML = standingDifficultyCode;
  perception.appendChild(standingDifficulty);

  const animalsFrightened = doc.createElement("animals");

  let animalsFrightenedCode = 1;
  switch (data.animalsFrightened) {
    case "notSpecified":
      animalsFrightenedCode = 1;
      break;
    case "seated":
      animalsFrightenedCode = 2;
      break;
    case "no":
      animalsFrightenedCode = 3;
      break;
    case "yes":
      animalsFrightenedCode = 4;
      break;
  }
  animalsFrightened.innerHTML = animalsFrightenedCode;
  perception.appendChild(animalsFrightened);

  return perception;
};

const createObjects = (data, doc) => {
  const objects = doc.createElement("objectes");

  const effectsLamps = doc.createElement("llums");
  let effectsLampsCode = 1;
  switch (data.effectsLamps) {
    case "notSpecified":
      effectsLampsCode = 1;
      break;
    case "dontKnow":
      effectsLampsCode = 2;
      break;
    case "none":
      effectsLampsCode = 3;
      break;
    case "oscilation":
      effectsLampsCode = 4;
      break;
    case "bigOscilation":
      effectsLampsCode = 5;
      break;
  }
  effectsLamps.innerHTML = effectsLampsCode;
  objects.appendChild(effectsLamps);

  const effectsLiquids = doc.createElement("liquids");
  let effectsLiquidsCode = 1;
  switch (data.effectsLiquids) {
    case "notSpecified":
      effectsLiquidsCode = 1;
      break;
    case "dontKnow":
      effectsLiquidsCode = 2;
      break;
    case "none":
      effectsLiquidsCode = 3;
      break;
    case "oscilation":
      effectsLiquidsCode = 4;
      break;
    case "bigOscilation":
      effectsLiquidsCode = 5;
      break;
  }
  effectsLiquids.innerHTML = effectsLiquidsCode;
  objects.appendChild(effectsLiquids);

  const effectsPaintings = doc.createElement("quadres");
  let effectsPaintingsCode = 1;
  switch (data.effectsPaintings) {
    case "notSpecified":
      effectsPaintingsCode = 1;
      break;
    case "dontKnow":
      effectsPaintingsCode = 2;
      break;
    case "none":
      effectsPaintingsCode = 3;
      break;
    case "vibration":
      effectsPaintingsCode = 4;
      break;
    case "moved":
      effectsPaintingsCode = 5;
      break;
    case "fell":
      effectsPaintingsCode = 6;
      break;
  }
  effectsPaintings.innerHTML = effectsPaintingsCode;
  objects.appendChild(effectsPaintings);

  const effectsDoorsWindows = doc.createElement("portes");
  let effectsDoorsWindowsCode = 1;
  switch (data.effectsDoorsWindows) {
    case "notSpecified":
      effectsDoorsWindowsCode = 1;
      break;
    case "dontKnow":
      effectsDoorsWindowsCode = 2;
      break;
    case "none":
      effectsDoorsWindowsCode = 3;
      break;
    case "vibration":
      effectsDoorsWindowsCode = 4;
      break;
    case "oscilation":
      effectsDoorsWindowsCode = 5;
      break;
    case "openClose":
      effectsDoorsWindowsCode = 6;
      break;
  }
  effectsDoorsWindows.innerHTML = effectsDoorsWindowsCode;
  objects.appendChild(effectsDoorsWindows);

  const effectsFurniture = doc.createElement("mobles");
  let effectsFurnitureCode = 1;
  switch (data.effectsFurniture) {
    case "notSpecified":
      effectsFurnitureCode = 1;
      break;
    case "dontKnow":
      effectsFurnitureCode = 2;
      break;
    case "none":
      effectsFurnitureCode = 3;
      break;
    case "vibration":
      effectsFurnitureCode = 4;
      break;
    case "movement":
      effectsFurnitureCode = 5;
      break;
    case "fall":
      effectsFurnitureCode = 6;
      break;
  }
  effectsFurniture.innerHTML = effectsFurnitureCode;
  objects.appendChild(effectsFurniture);

  const effectsPlants = doc.createElement("plantes");
  let effectsPlantsCode = 1;
  switch (data.effectsPlants) {
    case "notSpecified":
      effectsPlantsCode = 1;
      break;
    case "dontKnow":
      effectsPlantsCode = 2;
      break;
    case "none":
      effectsPlantsCode = 3;
      break;
    case "vibration":
      effectsPlantsCode = 4;
      break;
    case "movement":
      effectsPlantsCode = 5;
      break;
    case "fall":
      effectsPlantsCode = 6;
      break;
  }
  effectsPlants.innerHTML = effectsPlantsCode;
  objects.appendChild(effectsPlants);

  const effectsShelves = doc.createElement("obj_vibrar");
  let effectsShelvesCode = 1;
  switch (data.effectsShelves) {
    case "notSpecified":
      effectsShelvesCode = 1;
      break;
    case "dontKnow":
      effectsShelvesCode = 2;
      break;
    case "none":
      effectsShelvesCode = 3;
      break;
    case "vibration":
      effectsShelvesCode = 4;
      break;
    case "strongVibration":
      effectsShelvesCode = 5;
      break;
    case "someFall":
      effectsShelvesCode = 6;
      break;
    case "manyFall":
      effectsShelvesCode = 7;
      break;
    case "mostFall":
      effectsShelvesCode = 8;
      break;
  }
  effectsShelves.innerHTML = effectsShelvesCode;
  objects.appendChild(effectsShelves);

  const commentseffectsShelves = doc.createElement("obj_vibrar_txt");
  if (data.commentseffectsShelves)
    commentseffectsShelves.innerHTML = data.commentseffectsShelves;
  objects.appendChild(commentseffectsShelves);

  return objects;
};

const createDamage = (data, doc) => {
  const damage = doc.createElement("danys");

  const buildingType = doc.createElement("tipus_edifici");
  let buildingTypeCode = 0;
  switch (data.buildingType) {
    case "notSpecified":
      buildingTypeCode = 0;
      break;
    case "typeA":
      buildingTypeCode = 1;
      break;
    case "typeB":
      buildingTypeCode = 2;
      break;
    case "typeC":
      buildingTypeCode = 3;
      break;
  }
  buildingType.innerHTML = buildingTypeCode;
  damage.appendChild(buildingType);

  const buildingYear = doc.createElement("any_edifici");
  if (data.buildingYear) buildingYear.innerHTML = data.buildingYear;
  damage.appendChild(buildingYear);

  const buildingDamage = doc.createElement("danys");
  let buildingDamageCode = 0;
  switch (data.buildingType) {
    case "notSpecified":
      buildingDamageCode = 0;
      break;
    case "dontKnow":
      buildingDamageCode = 1;
      break;
    case "no":
      buildingDamageCode = 2;
      break;
    case "yes":
      buildingDamageCode = 3;
      break;
  }
  buildingDamage.innerHTML = buildingDamageCode;
  damage.appendChild(buildingDamage);

  //What is supposed to go here?
  const buildingDamageDescription = doc.createElement("danys_tipus");
  damage.appendChild(buildingDamageDescription);

  const commentsDamage = doc.createElement("danys_txt");
  if (data.commentsDamage) commentsDamage.innerHTML = data.commentsDamage;
  damage.appendChild(commentsDamage);

  return damage;
};

const createImage = (data, doc) => {
  const image = doc.createElement("imatge");

  const imageValue = doc.createElement("imatge");
  let imageValueCode = 1;

  switch (data.perceptionImage) {
    case "notSpecified":
      imageValueCode = 0;
      break;
    case "notPerceived":
      imageValueCode = 1;
      break;
    case "perceived":
      imageValueCode = 2;
      break;
    case "light":
      imageValueCode = 3;
      break;
    case "moderate":
      imageValueCode = 4;
      break;
    case "strong":
      imageValueCode = 5;
      break;
    case "veryStrong":
      imageValueCode = 6;
      break;
    case "severe":
      imageValueCode = 7;
      break;
    case "verySevere":
      imageValueCode = 8;
      break;
  }
  imageValue.innerHTML = imageValueCode;

  image.appendChild(imageValue);
  return image;
};

const createComments = (data, doc) => {
  const comments = doc.createElement("comentari");

  const userComments = doc.createElement("comentari_usuari");
  if (data.comments) userComments.appendChild(data.comments);
  comments.appendChild(userComments);
  //What is supposed to go here?
  const comments_txt = doc.createElement("varis_txt");
  comments.appendChild(comments_txt);
  return comments;
};

const createStats = (doc) => {
  const stats = doc.createElement("estadistica");
  const userLangValue = navigator.language || navigator.userLanguage;

  const language = doc.createElement("idioma");
  language.innerHTML = userLangValue;
  stats.appendChild(language);

  const isMobile = doc.createElement("mobil");

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile.innerHTML = 1;
  } else {
    isMobile.innerHTML = 0;
  }

  stats.appendChild(isMobile);
  const user = doc.createElement("usuari");
  stats.appendChild(user);

  return stats;
};

const createXMLReport = (data) => {
  const doc = document.implementation.createDocument("", "", null);
  const catalogue = doc.createElement("cataleg_macrosismica");

  const survey = doc.createElement("questionari");
  survey.setAttribute("temps_rx", Math.round(Date.now() / 1000));
  survey.setAttribute("programa", "pocrisc_ari");
  survey.setAttribute("font", "pocrisc_ari_web");
  survey.setAttribute("institucio", "AndorraRecerca+Innovació");
  const event = doc.createElement("esdeveniment");

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
getSeism();
