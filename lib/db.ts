import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName =
  process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "u816628190_yuvidev";

type MongoGlobal = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

type CounterDocument = {
  _id: string;
  seq: number;
};

const globalForMongo = globalThis as MongoGlobal;

const clientPromise =
  globalForMongo._mongoClientPromise ??
  new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClientPromise = clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getNextSequence(name: string): Promise<number> {
  const db = await getDb();
  const result = await db.collection<CounterDocument>("counters").findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" }
  );

  if (!result) {
    throw new Error(`Unable to increment ${name} counter`);
  }

  return result.seq as number;
}
