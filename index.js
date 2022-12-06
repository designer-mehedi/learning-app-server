const express = require('express'); 
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json());


// Mongodb

const uri =
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.faz05ry.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const run = async() => {
    try {
		const coursesCollection = client.db("onlineTutor").collection("courses");

        app.get('/courses', async(req, res) => {
            const query = {};
            const courses = await coursesCollection.find(query).toArray();
            res.send(courses); 
        });

        app.get('/course/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await coursesCollection.findOne(query);
            res.send(result);
        })
		
	}
    finally{}
}
run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('learning api running'); 
})


app.listen(port, () => {
    console.log(`learning app server running on port ${port}` ); 
})