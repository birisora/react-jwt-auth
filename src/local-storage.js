export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

// saved as key-value pairs, where both key and value have to be strings
// wrapped in try since safari incognito mode will throw an exception
// for persistence to work, we need to reload token when application loads
// in src/store.js
export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

// uses removeItem method of localStorage to remove token
export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};
