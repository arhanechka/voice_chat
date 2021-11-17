const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432
}

const clientUrl = process.env.CLIENT_URL

const agoraConfig = {
    agoraKey: process.env.AGORA_KEY,
    agoraSecret: process.env.AGORA_SECRET
}

const axiosConfig = {
    baseURL: process.env.AGORA_URL
}

module.exports = {dbConfig, clientUrl, agoraConfig, axiosConfig}