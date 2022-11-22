const express = require('express')
const app = express()
const { getDB } = require('./databaseHandler')
const { ObjectId } = require('mongodb')
const async = require('hbs/lib/async')

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }));


app.post('/sendPayLoad', (req, res) => {
    let response = ''
    try {
        const payLoad = req.body.jsonpayload
        console.log("payLoad " + payLoad)

        const jsonObjec = JSON.parse(payLoad)

        console.log(jsonObjec.userId)

        console.log(jsonObjec.detailList.length)

        let names = ''
        let destinations = ''
        let dates = ''
        let descriptions = ''
        let transportions = ''
        let numbers = ''
        let risk = ''
        jsonObjec.detailList.forEach(element => {
            names += element.name + ","
            destinations += element.destination + ","
            dates += element.date + ","
            descriptions += element.description + ","
            transportions += element.modeOfTransportation + ","
            numbers += element.amountOfPeople + ","
            risk += element.riskAssessment + ","
        });
        console.log("names " + names);
        names = names.substring(0, names.length - 1) // remove the last ","

        console.log(jsonObjec.detailList[0].name)
        console.log("names " + names);
        response = {
            'uploadResponseCode': 'SUCCESS',
            'userid': jsonObjec.userId,
            'number': jsonObjec.detailList.length,
            'name': names,
            'destination': destinations,
            'date': dates,
            'description':descriptions,
            'mode of transportation': transportions,
            'amount of people': numbers,
            'risk assessment': risk,
            'message': 'successful upload – all done!'

        }
    } catch (error) {
        response = {
            'uploadResponseCode': 'ERROR',
            'message': 'your request is invalid! check the request format!'
        }
    }
    res.json(response)
})
app.get('/', async (req, res) => {
    const allExpense = []

    const db = await getDB();
    const a = await db.collection('DataWebservice').find({}).toArray();
    
    for (let i = 0; i < a.length; i++) {
            await db.collection('DataWebservice').updateOne({name: a[i].name},{
                $set:{
                    allExpense:allExpense
                }
            })
        }
    for (let i = 0; i < a.length; i++) {
        const trip = a[i].name;
        const expense = await db.collection('DataExpenseWebservice').find({ name_trip: trip }).toArray();
        await db.collection('DataWebservice').updateOne({name:trip},{
            $set:{
                allExpense:expense
            }
        })
    }
    res.render('webservice',{data:a})
})
const PORT = process.env.PORT || 5111
app.listen(PORT)
console.log("Server is running! " + PORT)