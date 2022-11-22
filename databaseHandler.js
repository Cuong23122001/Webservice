const async = require('hbs/lib/async');
const { MongoClient } = require('mongodb');

// const URL = 'mongodb://0.0.0.0:27017';
// const URL = 'mongodb+srv://admin:hsPOvEloe0djkzKP@cluster0.zcq0f.mongodb.net/test'
const URL = 'mongodb+srv://tripmanagementapp:asdase2312easasfa@cluster0.jipi4x0.mongodb.net/test'
const DATABASE_NAME = "AppMobile"

async function getDB() {
    const client = await MongoClient.connect(URL)
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}
module.exports = {
    getDB
}