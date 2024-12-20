module.exports = {
  apps: [{
    name: "movie-poster-app",
    script: "./server.js",
    env_production: {
      NODE_ENV: "production",
      PORT: 13234
    },
    env_development: {
      NODE_ENV: "development",
      PORT: 3000
    }
  }]
};