import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcrypt";
import User from "@/models/userModel";
import { request } from "http";

connect();

export async function GET() {}

export async function POST(request: Request) {
  try {
    const requestBody: any = await request.json();
    console.log(requestBody);

    const { email } = requestBody;

    User.findOne({ email });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
