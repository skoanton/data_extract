export const translateBodyPart = (id) => {
    const mapping = {
        37: "Nick",
        38: "Skott",
        70: "Övrigt",
        40: "Skott",
    };
    return mapping[id] || "Okänd";
};

export const translateShotType = (id) => {
    const mapping = {
        61: "Hörna",
        62: "Frispark",
        87: "Öppet spel",
        88: "Straff",
    };
    return mapping[id] || "Okänt skede";
};

/* export const translateOutcome = (id) => {
    const mapping = {
        96: "Blockad",
        97: "Mål",
        98: "Utanför",
        99: "På mål",
        100: "På mål",
        101: "Utanför",
        115: "På mål",
        116: "På mål",
    };
    return mapping[id] || "Okänt resultat";
}; */