const CACHE_KEY = 'pn_user_location';

// Default Fallback (for dev or if API blocked)
const DEFAULT_LOCATION = {
    country: 'India',
    code: 'IN',
    flag: '🇮🇳'
};

export const getUserLocation = async () => {
    // 1. Check Session Storage (we don't want to spam API on every reload)
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        // Use ipapi.co (Free tier, generous limits for client-side)
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Location API failed');

        const data = await response.json();
        const location = {
            country: data.country_name, // "India", "United States"
            code: data.country_code,    // "IN", "US"
            flag: getFlagEmoji(data.country_code)
        };

        sessionStorage.setItem(CACHE_KEY, JSON.stringify(location));
        return location;
    } catch (error) {
        console.warn("Location detection failed:", error);
        // Default to India as requested
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(DEFAULT_LOCATION));
        return DEFAULT_LOCATION;
    }
};

// Helper to get flag emoji from code (e.g. IN -> 🇮🇳)
const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};
