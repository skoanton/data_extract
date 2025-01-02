export const sortByXY = (data) => {
    return data.sort((a, b) => {
        if (a.X === b.X) {
            return a.Y - b.Y;
        }
        return a.X - b.X;
    });
}