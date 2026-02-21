import { database } from '../firebase';
import { ref, push, set, remove } from 'firebase/database';

// Save or update a pet profile for a user
export const savePetProfile = async (userId, petProfile) => {
    if (!userId || !petProfile) return;

    try {
        const petsRef = ref(database, `users/${userId}/pets`);

        if (petProfile.id) {
            // Update existing pet
            const petRef = ref(database, `users/${userId}/pets/${petProfile.id}`);
            await set(petRef, {
                ...petProfile,
                lastUpdated: Date.now()
            });
            return petProfile.id;
        } else {
            // Create new pet entry
            const newPetRef = push(petsRef);
            const petData = {
                ...petProfile,
                id: newPetRef.key,
                createdAt: Date.now(),
                lastUpdated: Date.now()
            };
            await set(newPetRef, petData);
            return newPetRef.key;
        }
    } catch (error) {
        console.error("Error saving pet profile:", error);
        throw error;
    }
};

// Delete a pet profile for a user
export const deletePetProfile = async (userId, petId) => {
    if (!userId || !petId) return;
    try {
        const petRef = ref(database, `users/${userId}/pets/${petId}`);
        await remove(petRef);
    } catch (error) {
        console.error("Error deleting pet profile:", error);
        throw error;
    }
};
