// Configuration file for sensitive data
const config = {
    // API Keys
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    
    // Authentication
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    
    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    
    // Other sensitive data
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL
};

// Export configuration
module.exports = config; 