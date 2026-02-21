import { AlertTriangle } from 'lucide-react';
import { BANNED_IN_INDIA, BANNED_IN_UK, BANNED_CATS_IN_INDIA, RESTRICTED_CATS_IN_INDIA } from '../data/bannedBreeds';

export default function BannedBreedWarning({ petProfile, location }) {
    if (!petProfile || !location) return null;

    let warningMessage = null;

    if (petProfile.petType === 'dog') {
        let isBanned = false;
        let countryName = '';

        if (location.country === 'India') {
            isBanned = BANNED_IN_INDIA.some(b =>
                petProfile.breed && petProfile.breed.toLowerCase().includes(b.toLowerCase())
            );
            countryName = 'India';
        } else if (location.country === 'UK') {
            isBanned = BANNED_IN_UK.some(b =>
                petProfile.breed && petProfile.breed.toLowerCase().includes(b.toLowerCase())
            );
            countryName = 'the UK';
        }

        if (isBanned) warningMessage = `The selected breed (${petProfile.breed}) is restricted/banned in ${countryName}.`;

    } else if (petProfile.petType === 'cat' && location.country === 'India') {
        const isBanned = BANNED_CATS_IN_INDIA.some(b =>
            petProfile.breed && petProfile.breed.toLowerCase().includes(b.toLowerCase())
        );
        const isRestricted = RESTRICTED_CATS_IN_INDIA.some(b =>
            petProfile.breed && petProfile.breed.toLowerCase().includes(b.toLowerCase())
        );

        if (isBanned) warningMessage = `The selected breed (${petProfile.breed}) is banned in India (Wild Life Protection Act).`;
        if (isRestricted) warningMessage = `The selected breed (${petProfile.breed}) is restricted. Check local Forestry Rules.`;
    }

    if (!warningMessage) return null;

    return (
        <div className="bg-red-600 text-white px-4 py-3 shadow-lg animate-pulse sticky top-[73px] z-40 flex items-center justify-center gap-3 text-sm sm:text-base font-bold text-center">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            <span>
                Warning: {warningMessage}
            </span>
        </div>
    );
}
