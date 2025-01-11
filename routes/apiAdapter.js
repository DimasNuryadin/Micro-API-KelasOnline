const axios = require('axios');
const { TIMEOUT } = process.env;

// Untuk akses ke semua services
module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: parseInt(TIMEOUT)
  });
}