const API_KEY = 'live_vFqUI0ogB7WF5OSPjyuHD5dM6Q1UDKdkFbKB6HJ8NEwTVctird7GZiKNj2RTw7ol';
const BASE_URL = 'https://api.thedogapi.com/v1';
const CACHE_KEY = 'pn_dog_breeds_cache_v2'; // Changed key to force refresh
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 Days

export const fetchBreeds = async () => {
    try {
        // 1. Check Cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            const age = Date.now() - timestamp;
            if (age < CACHE_DURATION) {
                console.log("🐶 Using cached breed data (v2)");
                return data;
            }
        }

        // 2. Fetch from API if cache expired or missing
        console.log("🌐 Fetching fresh breed data from TheDogAPI...");
        const response = await fetch(`${BASE_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY }
        });

        if (!response.ok) throw new Error('API Failed');

        const data = await response.json();

        // 3. Save to Cache
        const cacheEntry = {
            timestamp: Date.now(),
            data: data.map(b => ({
                id: b.id,
                name: b.name,
                weight: b.weight.metric,
                height: b.height.metric,
                life_span: b.life_span,
                temperament: b.temperament,
                bred_for: b.bred_for,
                breed_group: b.breed_group,
                // Improved Image Logic: URL or construct from reference_id
                image: b.image?.url || (b.reference_image_id ? `https://cdn2.thedogapi.com/images/${b.reference_image_id}.jpg` : null)
            }))
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));

        return cacheEntry.data;
    } catch (error) {
        console.error("Error fetching breeds:", error);
        return []; // Fallback
    }
};

// Helper shared or duplicated
export const getAverageWeight = (weightStr) => {
    if (!weightStr) return null;
    if (weightStr === "NaN") return null;

    const parts = weightStr.split('-').map(p => parseFloat(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return Math.round((parts[0] + parts[1]) / 2);
    }
    return !isNaN(parseFloat(weightStr)) ? Math.round(parseFloat(weightStr)) : null;
};
