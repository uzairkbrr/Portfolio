// Access key for Google Sheets (Public Read-Only)
// This file is gitignored to keep the source ID private from the repo history.
// However, note that it is technically visible in network requests.
export const SHEET_ID = '1V00FAQSVO5O08GdQFEeqdUIJ4sOa87FejzHC0WuVC00';
export const SHEET_URL = (gid) => `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&id=${SHEET_ID}&gid=${gid}`;

// Sheet GIDs (The 'gid' parameter in the URL for each tab)
export const TABS = {
    lessons: 0,
    projects: 1201051471,
    experience: 1800472574,
    vibe_coded: 581432039,
    achievements: 168499249,
    socials: 1662867441,
    read_books: 694911149,
};
