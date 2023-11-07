import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcrypt";
import User from "@/models/userModel";
import mongoose from "mongoose";

connect();

export async function POST(request: Request) {
  try {
    const requestBody: any = await request.json();

    // console.log(requestBody);

    const { firstName, lastName, email, username, password } = requestBody;

    const user = await User.findOne({ email });

    if (user) {
      mongoose.connection.close();
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // console.log(savedUser);

    mongoose.connection.close();
    return NextResponse.json({ message: "Created user successfully", success: true, savedUser });
  } catch (error: any) {
    mongoose.connection.close();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
