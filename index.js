const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://online-market:58mXujTbnIWSzavC@cluster0.8dssgfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const allonlinecollection = client.db("online-market").collection("specialProducts");

  


  app.get('/products', async (req, res) => {
    const search = req.query.search;
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; 
    let query = {};
  
    if (search) {
      query = {
        productName: { $regex: search, $options: 'i' } // 'i' for case-insensitive search
      };
    }
  
    try {
      const result = await allonlinecollection.find(query).sort({ productName: sortOrder }).toArray(); // Apply the query here
      res.send(result);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World islamic university')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})