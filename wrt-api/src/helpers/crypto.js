const CryptoJs = require('crypto-js');
const config = require("../config.json");

function encrypt(token) {
    return CryptoJs.AES.encrypt(token, config.encryption_key.DATABASE);
}

function decrypt(token) {
    return CryptoJs.AES.decrypt(token, config.encryption_key.DATABASE).toString(CryptoJs.enc.Utf8);
}

module.exports = {
    decrypt,
    encrypt
}