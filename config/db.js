

// const { MongoClient } = require("mongodb");
// require('dotenv').config();

// // Replace the following with your Atlas connection string
// const url = process.env.MONGODB_URI;

// // Specify the database and collection you want to use
// const dbName = 'SignUp';
// const collectionName = 'Users';

// // Connect to your Atlas cluster and specify the database and collection
// const client = new MongoClient(url, { useUnifiedTopology: true });

// async function run() {
//     try {
//         await client.connect();
//         console.log("Successfully connected to Atlas");

//         // Specify the database and collection
//         const db = client.db(dbName);
//         const coll = db.collection(collectionName);

//         // You can now use the 'collection' object to interact with your specific collection
//         // const p = await coll.insertone(UserDocument);

//       } catch (err) {
//         console.log(err.stack);
//       } finally {
//         await client.close();
//        }
// }

// run().catch(console.dir);


require('dotenv').config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI,{})
  .then(() =>{
    console.log("Successfully connected to Atlas");
  })
  .catch((err)=>{
    console.log(err);
  })
