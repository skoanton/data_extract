export const combineDuplicates = (dataPoints) => {
    const groupedData = new Map();
    const combinedData = [];

    dataPoints.forEach(point => {
        const key = `${point.X}-${point.Y}-${point.Avslut}-${point.Skede}-${point.Touch}`;

        if (!groupedData.has(key)) {
            groupedData.set(key, []);
        }

        groupedData.get(key).push(point);

    });

    groupedData.forEach(group => {

        if (group.length > 1) {
            const averageXG = group.reduce((sum, item) => sum + item.XG, 0) / group.length;

            const updatedDuplicate = { ...group[0], XG: averageXG };
            combinedData.push(updatedDuplicate);
        } else {
            combinedData.push(group[0]);
        }
    });

    
    return combinedData;

}