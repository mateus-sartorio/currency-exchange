import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  let client;

  try {
    client = await clientPromise;
  } catch {
    return new Response("could not connect to database");
  }

  const db = client.db("currency-exchange");
  const data = await db.collection("users").find({}).toArray();

  return new Response(JSON.stringify({ "a-b": "b" }));
}
