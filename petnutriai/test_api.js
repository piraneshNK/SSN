const API_KEY = 'live_vFqUI0ogB7WF5OSPjyuHD5dM6Q1UDKdkFbKB6HJ8NEwTVctird7GZiKNj2RTw7ol';
const url = 'https://api.thedogapi.com/v1/breeds?limit=2';

console.log("Fetching...");
try {
    const response = await fetch(url, { headers: { 'x-api-key': API_KEY } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log(JSON.stringify(data.map(b => ({
        name: b.name,
        image: b.image,
        ref: b.reference_image_id
    })), null, 2));
} catch (e) {
    console.error("Error:", e);
}
