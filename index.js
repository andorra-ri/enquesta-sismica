Survey.StylesManager.applyTheme("bootstrap");

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
const json = {
  title: "Enquesta sísmica",
  showProgressBar: "top",
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
          type: "text",
          name: "parroquia",
          title:
            "Parròquia o municipi on es trobava en el moment del terràtremol",
          inputType: "text",
          isRequired: true,
          maxWidth: "400px",
          visibleIf: "{locationMap}='no'",
        },
        {
          type: "text",
          name: "territori",
          title:
            "Territori dins la parròquia on es trobava en el moment del terràtremol",
          inputType: "text",
          isRequired: false,
          maxWidth: "400px",
          visibleIf: "{locationMap}='no'",
        },
        {
          type: "text",
          name: "street",
          title: "Carrer",
          inputType: "text",
          isRequired: false,
          maxWidth: "400px",
          visibleIf: "{locationMap}='no'",
        },
        {
          type: "text",
          name: "street",
          title: "Número",
          inputType: "number",
          isRequired: false,
          maxWidth: "400px",
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
          maxWidth: "300px",
        },
        {
          type: "text",
          name: "totalFloors",
          title: "Quants pisos té l'edifici?",
          inputType: "number",
          visibleIf: "{position}='insideBuilding'",
          maxWidth: "300px",
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
            { value: "frighted", text: "Vaig tenir por" },
            { value: "veryFrighted", text: "Vaig tenir molta por" },
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
              maxWidth: "300px",
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
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

  const { data: dataSeism, error } = await supabaseClient
    .from("seism")
    .select();

  error && console.log("Error downloading seisms:", error);

  const jsonWithSeism = {
    ...json,
    pages: [
      ...json.pages.map((page) => ({
        ...page,
        elements: page.elements.map((element) =>
          element.name === "seism"
            ? {
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
              }
            : element
        ),
      })),
    ],
  };
  console.log(dataSeism);
  console.log(jsonWithSeism);
  var model = new Survey.Model(jsonWithSeism);
  window.survey = model;

  model.locale = "ca";
  survey.onComplete.add(function (sender) {
    document.querySelector("#surveyResult").textContent =
      "Resultar JSON:\n" + JSON.stringify(sender.data, null, 3);
  });

  model.render("surveyElement");
};

getSeism();
