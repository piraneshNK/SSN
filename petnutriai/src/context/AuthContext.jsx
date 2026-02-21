import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, push, get, query, orderByChild, equalTo, set } from "firebase/database";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// Simple hash for demo purposes (not for production)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        // Persist session in localStorage
        const saved = localStorage.getItem('pn_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    // Register a new user in RTDB
    async function signup(email, password) {
        // Check if email already exists
        const usersRef = ref(database, 'auth_users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const users = snapshot.val();
            const exists = Object.values(users).some(u => u.email === email);
            if (exists) {
                throw new Error('An account with this email already exists.');
            }
        }

        // Create new user entry in RTDB
        const newUserRef = push(ref(database, 'auth_users'));
        const userId = newUserRef.key;
        const userData = {
            uid: userId,
            email,
            passwordHash: simpleHash(password),
            createdAt: Date.now()
        };
        await set(newUserRef, userData);

        // Set session
        const sessionUser = { uid: userId, email };
        setCurrentUser(sessionUser);
        localStorage.setItem('pn_user', JSON.stringify(sessionUser));
        return sessionUser;
    }

    // Login: look up user in RTDB
    async function login(email, password) {
        const usersRef = ref(database, 'auth_users');
        const snapshot = await get(usersRef);

        if (!snapshot.exists()) {
            throw new Error('No account found. Please register first.');
        }

        const users = snapshot.val();
        const match = Object.values(users).find(
            u => u.email === email && u.passwordHash === simpleHash(password)
        );

        if (!match) {
            throw new Error('Incorrect email or password.');
        }

        const sessionUser = { uid: match.uid, email: match.email };
        setCurrentUser(sessionUser);
        localStorage.setItem('pn_user', JSON.stringify(sessionUser));
        return sessionUser;
    }

    // Logout
    function logout() {
        setCurrentUser(null);
        localStorage.removeItem('pn_user');
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
