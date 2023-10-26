import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGO_URI;

const options: MongoClientOptions = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Add Mongo URI to .env.local");
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
