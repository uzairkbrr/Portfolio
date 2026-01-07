import { SHEET_URL, TABS } from './config.js';

// Parsers
const parseCSV = (csvText) => {
    const rows = [];
    const lines = csvText.split('\n');
    if (lines.length === 0) return [];
    
    // Split headers and remove potential BOM from the first key
    const headers = lines[0].split(',').map(h => h.trim().replace(/^\uFEFF/, ''));

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // Handle quotes efficiently (basic parser)
        const row = {};
        const currentLine = lines[i];
        let values = [];
        let inQuote = false;
        let currentValue = '';
        
        for (let j = 0; j < currentLine.length; j++) {
            const char = currentLine[j];
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());

        headers.forEach((header, index) => {
            // Remove quotes if they wrap the value
            const val = values[index] ? values[index].replace(/^"|"$/g, '') : '';
            row[header] = val;
        });
        rows.push(row);
    }
    return rows;
};

// Fetchers
export const fetchData = async (type) => {
    // If explicit null in config, return empty or fallback
    if (TABS[type] === null) return null;

    try {
        const response = await fetch(SHEET_URL(TABS[type]));
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        return [];
    }
};
