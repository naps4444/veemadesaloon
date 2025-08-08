// lib/mongodb.ts

import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

declare global {
  // For hot-reload in dev
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise!;

export { clientPromise };
