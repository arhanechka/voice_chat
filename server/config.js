const dbConfig = {
    user: "testuser",
    host: "localhost",
    database: "testdb",
    password: "root",
    port: 5432
}

const clientUrl = "http://localhost:3000"

const agoraConfig = {
    agoraKey: "c58907dd57714d019eb285ab88fd9905",
    agoraSecret: "26e5177e12b443be98c222337c201714"
}

const axiosConfig = {
    baseURL: "http://api.agora.io"
}

module.exports = {dbConfig, clientUrl, agoraConfig, axiosConfig}