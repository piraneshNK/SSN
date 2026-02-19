const API_KEY = 'live_PHINnAOahMPgB0EE3d0onx3xEouE6NolDgqSl2Z3318rs7EX5xenVurwNngEM9Qw';
const BASE_URL = 'https://api.thecatapi.com/v1';
const CACHE_KEY = 'pn_cat_breeds_cache_v1';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 Days

export const fetchCatBreeds = async () => {
    try {
        // 1. Check Cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            const age = Date.now() - timestamp;
            if (age < CACHE_DURATION) {
                console.log("🐱 Using cached cat breed data");
                return data;
            }
        }

        // 2. Fetch from API
        console.log("🌐 Fetching fresh cat breed data from TheCatAPI...");
        const response = await fetch(`${BASE_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY }
        });

        if (!response.ok) throw new Error('Cat API Failed');

        const data = await response.json();

        // 3. Save to Cache
        const cacheEntry = {
            timestamp: Date.now(),
            data: data.map(b => ({
                id: b.id,
                name: b.name,
                weight: b.weight.metric,
                life_span: b.life_span,
                temperament: b.temperament,
                origin: b.origin,
                description: b.description,
                // Image Logic: Cat API image IDs are often referenced
                image: b.image?.url || (b.reference_image_id ? `https://cdn2.thecatapi.com/images/${b.reference_image_id}.jpg` : null)
            }))
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));

        return cacheEntry.data;
    } catch (error) {
        console.error("Error fetching cat breeds:", error);
        return []; // Fallback
    }
};
