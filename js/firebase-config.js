// Firebase configuration with environment-specific settings
const firebaseConfig = {
    apiKey: "AIzaSyCyCfi4JqEKhluLkMxNHu-HyCTV_Gdiyhg",
    authDomain: "checkin-1b7f3.firebaseapp.com",
    databaseURL: "https://checkin-1b7f3-default-rtdb.firebaseio.com",
    projectId: "checkin-1b7f3",
    storageBucket: "checkin-1b7f3.firebasestorage.app",
    messagingSenderId: "838850473833",
    appId: "1:838850473833:web:f0759a1a4fc395066e97f8",
    measurementId: "G-Q87BPZR13Z"
};

// Initialize Firebase with authentication check
function initializeFirebase() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Get database reference
    const database = firebase.database();
    
    // Set up authentication state observer
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, set up database reference with user context
            window.checkInsRef = database.ref('checkIns');
            console.log('User is authenticated, database reference created');
        } else {
            // User is signed out, remove database reference
            window.checkInsRef = null;
            console.log('User is not authenticated');
        }
    });
    
    return database;
} 