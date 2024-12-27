# Shot Data to CSV

This project fetches shot data from multiple football matches using the StatsBomb Open Data API. The data is processed, reformatted, and exported as a CSV file for further analysis.

## Features

- Fetches JSON data of match events from the StatsBomb API.
- Filters and formats relevant shot data (e.g., shot location, type, outcome).
- Exports the processed data to a CSV file for easy use in data analysis tools.

## Getting Started

### Prerequisites

To run this project, you need:

- [Node.js](https://nodejs.org/) installed on your system.
- Internet access to fetch data from the API.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shot-data-to-csv.git
   cd shot-data-to-csv
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. Run the script to fetch and process data:

   ```bash
   node index.js
   ```

   This script will:

   - Fetch JSON files from the StatsBomb API.
   - Filter and reformat the data.
   - Save the output as a CSV file in the project directory.

2. The output CSV file will be saved as `data.csv` in the project directory.

### Example Output

The CSV file includes the following fields:

- `X`: X-coordinate of the shot.
- `Y`: Y-coordinate of the shot.
- `Avslut`: The body part used for the shot.
- `Skede`: The type of shot (e.g., Corner, Free Kick, Open Play).
- `Outcome`: The outcome of the shot (e.g., Goal, Miss).
- `Touch`: Whether it was a first-time shot or not.
- `XG`: The expected goals value for the shot.

Example CSV:

```csv
X,Y,Avslut,Skede,Outcome,Touch,XG
50,30,Foot,Open Play,Goal,1,0.15
40,25,Head,Corner,Miss,2,0.05
```

## Project Structure

```
.
├── index.js          # Main entry point
├── utils/
│   ├── createCsv.js  # Utility for generating CSV files
│   ├── translate.js  # Translation utilities for shot data
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

## Key Functions

### `fetchDownloadLinks`

Fetches JSON files from the StatsBomb API, processes the data, and generates the CSV file.

### `fetchData`

Fetches and filters shot data from individual JSON files.

### `createCsv`

Converts formatted data into a CSV file and saves it locally.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Axios**: For HTTP requests to the API.
- **fs**: File system module for saving CSV files.
- **path**: Module for handling file paths.

## API Reference

- **StatsBomb Open Data**: [https://github.com/statsbomb/open-data](https://github.com/statsbomb/open-data)

## How It Works

1. **Fetch Data**: The script retrieves JSON files from the StatsBomb API.
2. **Process Data**: Filters relevant events (shots) and extracts key details like location, shot type, and expected goals.
3. **Export Data**: Formats the data into a CSV file for analysis.

## Future Improvements

- Add more configurable filtering options for shot data.
- Allow customization of output CSV file location and format.
- Implement parallel data fetching with limited concurrency.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **StatsBomb** for providing open access to football data.

---

Feel free to adapt this README to your specific project needs!
