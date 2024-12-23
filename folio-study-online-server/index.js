const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

//initialization
const app = express()
const port = process.env.PORT || 5000
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
}

//middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://folio-online-assignment.web.app', 'https://folio-online-assignment.firebaseapp.com'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
// 'folio-online-assignment.web.app', 'folio-online-assignment.firebaseapp.com'

//custom-middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).send({ message: 'unauthorized2' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized' })
        }
        req.decoded = decoded
        next()
    })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@inochi.zmivthc.mongodb.net/?retryWrites=true&w=majority&appName=Inochi`;
console.log(uri)

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const assignmentCollection = client.db('FolioDB').collection('assignments')
        const submissionCollection = client.db('FolioDB').collection('submission')

        app.get('/assignments', async (req, res) => {
            const difficulty = req.query?.difficulty
            let query = {}
            if (difficulty) { query = { difficulty: difficulty } }
            const result = await assignmentCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/assignments/details/:email', verifyToken, async (req, res) => {
            const userEmail = req.params.email
            if (userEmail !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden' })
            }

            const id = req.query?._id
            query = { _id: new ObjectId(id) }
            console.log(query)

            const result = await assignmentCollection.findOne(query)
            console.log(result)
            res.send(result)
        })

        app.get('/pending_assignments/:email', verifyToken, async (req, res) => {
            const id = req.query?._id
            const reqEmail = req.query?.email
            const userEmail = req.params.email
            let query = { status: 'Pending' }

            //verify
            if (req.decoded.email !== userEmail) {
                return res.status(403).send({ message: 'forbidden' })
            }
            if (id) { query = { _id: new ObjectId(id) } }
            else if (reqEmail) {
                if (userEmail !== reqEmail) {
                    return res.status(403).send({ message: 'forbidden' })
                }
                query = { email: reqEmail }
            }

            //then get
            const result = await submissionCollection.find(query).toArray()
            res.send(result)
        })

        app.put('/pending_assignments/:email', verifyToken, async (req, res) => {
            //verify
            const userEmail = req.params.email
            if (req.decoded.email !== userEmail) {
                return res.status(403).send({ message: 'forbidden' })
            }

            //then update
            const id = req.query?._id
            if (id) { query = { _id: new ObjectId(id) } }
            const evaluate = req.body
            const submissionUpdate = {
                $set: {
                    feedback: evaluate.feedback,
                    obtainedMarks: evaluate.obtainedMarks,
                    status: evaluate.status,
                }
            }
            const result = await submissionCollection.updateOne(query, submissionUpdate)
            res.send(result)
        })

        app.post('/assignments/:email', verifyToken, async (req, res) => {

            //verify
            const userEmail = req.params.email
            if (req.decoded.email !== userEmail) {
                return res.status(403).send({ message: 'forbidden' })
            }

            //then post
            const createAssignment = req.body
            const result = await assignmentCollection.insertOne(createAssignment);
            res.send(result)
        })

        app.post('/submit_assignment/:email', verifyToken, async (req, res) => {

            //verify
            const userEmail = req.params.email
            if (req.decoded.email !== userEmail) {
                return res.status(403).send({ message: 'forbidden' })
            }

            //then post
            const submitAssignment = req.body
            const result = await submissionCollection.insertOne(submitAssignment);
            res.send(result)
        })

        app.put('/assignments/:email', verifyToken, async (req, res) => {

            //verify
            const userEmail = req.params.email
            if (req.decoded.email !== userEmail) {
                return res.status(403).send({ message: 'forbidden' })
            }

            //then update
            const id = req.query._id
            const assignment = req.body
            const query = { _id: new ObjectId(id) }
            const assignmentUpdate = {
                $set: {
                    title: assignment.title,
                    image: assignment.image,
                    marks: assignment.marks,
                    difficulty: assignment.difficulty,
                    description: assignment.description,
                    dueDate: assignment.dueDate,
                }
            }
            const result = await assignmentCollection.updateOne(query, assignmentUpdate)
            res.send(result)
        })

        app.delete('/assignments/:email', verifyToken, async (req, res) => {

            //verify
            const userEmail = req.params.email
            if (req.decoded.email !== userEmail) {
                return res.status(403).send({ message: 'forbidden' })
            }

            //then delete
            const id = req.query._id
            const query = { _id: new ObjectId(id)}
            const result = await assignmentCollection.deleteOne(query)
            res.send(result)
        })

        // })

        app.post('/jwt', async (req, res) => {
            const user = req.body
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

            res
                .cookie('token', token, cookieOptions)
                .send({ success: true })
        })

        app.post("/logout", async (req, res) => {
            res
                .clearCookie("token", { ...cookieOptions, maxAge: 0 })
                .send({ success: true });
        });


    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Folio Server Running')
})

app.listen(port, () => {
    console.log('folio server is running on port: ', port)
})