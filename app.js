const express = require('express')
const app = express()
const { insertObject, getRole, getDB } = require('./databaseHandler')
const { ObjectId } = require('mongodb')
const async = require('hbs/lib/async')

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}));


app.post('/sendPayLoad', (req,res)=>{
    let response = ''
    try {
        const payLoad = req.body.jsonpayload
        console.log(payLoad)
        const jsonObjec = JSON.parse(payLoad)
        
        console.log(jsonObjec.userId)
        console.log(jsonObjec.detailList.length)
        let names = ''
        jsonObjec.detailList.forEach(element => {
            names += element.name + ","
        });
        names = names.substring(0,names.length -1) // remove the last ","
        console.log(jsonObjec.detailList[0].name)
        response = {
            'uploadResponseCode' :'SUCCESS',
            'userid' : jsonObjec.userId,
            'number': jsonObjec.detailList.length,
            'names' : names,
            'message':'successful upload – all done!'

        }
    } catch (error) {
        response = {
            'uploadResponseCode' :'ERROR',
            'message':'your request is invalid! check the request format!'
        }
    }    
    res.json(response)
})
app.get('/',async(req,res)=>{
    const db = await getDB();
    const a = await db.collection('DataWebservice').find({}).toArray();
    console.log(a);
    res.render('webservice')
})

const PORT = process.env.PORT || 5500
app.listen(PORT)
console.log("Server is running! " + PORT)