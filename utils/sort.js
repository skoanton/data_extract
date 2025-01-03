export const sortByXY = (data) => {
    return data.sort((a, b) => {
        if (a.X === b.X) {
            return a.Y - b.Y;
        }
        return a.X - b.X;
    });
}


export const removeDecimals = (data) => {

    const roundedCoordinates = data.map(element => ({
        ...element,
        X: Math.round(element.X),
        Y: Math.round(element.Y)  
    }));

    return roundedCoordinates;
}