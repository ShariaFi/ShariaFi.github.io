/**
 * @fileoverview AppConfig.js: A global configuration object/utility.
 * This acts as a Singleton for centralizing application constants and paths,
 * ensuring the Don't Repeat Yourself (DRY) principle across all modules.
 * This is crucial for maintainability and scalability (Robust Python).
 */

const AppConfig = {
    // --- API/Data Paths ---
    DATA_PATHS: {
        INSTRUMEN: 'assets/data/instrumen.json',
        KURIKULUM: 'assets/data/kurikulum.json',
        QUIZ: 'assets/data/quiz-investasi.json',
    },

    // --- Event Bus Contracts ---
    EVENTS: {
        TAB_CHANGED: 'tabChanged',
        NAVIGATE_TO_TAB: 'navigateToTab',
        CRITICAL_ERROR: 'criticalError', // Proposed for Robustness improvement
    },

    // --- Constants & Defaults ---
    DEFAULT_TAB_ID: 'beranda',
    QUIZ_QUESTION_COUNT: 10,
    // Add other magic strings or constants here as needed.
};

// Ensures the object is globally accessible (similar to an exported module in modern JS)
// Note: In a non-module environment, assigning to window is common practice.
// For modern JS, we would use 'export default AppConfig;'
// Assuming the current environment remains non-modular for now:
// window.AppConfig = AppConfig;