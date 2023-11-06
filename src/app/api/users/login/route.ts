import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcrypt";
import User from "@/models/userModel";
import next, { NextApiRequest } from "next";
import mongoose from "mongoose";

connect();

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;

    const email = query.get("email");
    const password = query.get("password");

    const user = await User.findOne({ email });

    mongoose.connection.close();

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    const validPassword = await bcryptjs.compare(password!, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 500 });
    }

    return NextResponse.json({ message: "Logged successfully", success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
