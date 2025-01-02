export const combineDuplicates = (formattedData) => {
    const matchGroups = new Map();
    const newXgArray = [];

    formattedData.forEach(data => {
        const key = `${data.X}-${data.Y}-${data.Avslut}-${data.Skede}-${data.Touch}`;

        if (!matchGroups.has(key)) {
            matchGroups.set(key, []);
        }

        matchGroups.get(key).push(data);

    });

    matchGroups.forEach(group => {

        if (group.length > 1) {
            const averageXg = group.reduce((sum, item) => sum + item.XG, 0) / group.length;

            const updatedDuplicate = { ...group[0], XG: averageXg };
            newXgArray.push(updatedDuplicate);
        } else {
            newXgArray.push(group[0]);
        }
    });

    
    return newXgArray;

}