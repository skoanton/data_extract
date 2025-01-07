import fs from 'fs';
export const createCsv = (data) => {
    console.log("Converting data to CSV...");
    const titleKeys = Object.keys(data[0]);

    const refinedData = []
    refinedData.push(titleKeys);

    data.forEach(item => {
        refinedData.push(Object.values(item));
    });

    let csvContent = ``;
    refinedData.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    const filePath = './data.csv';
    fs.writeFileSync(filePath, csvContent, 'utf8');
    console.log(`CSV-filen har sparats: ${filePath}`);
}