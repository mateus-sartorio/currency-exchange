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

    const { email, password, newCurrency } = requestBody;

    let user = await User.findOne({ email });

    if (!user) {
      mongoose.connection.close();
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    const result = await User.updateOne(
      { email, password },
      {
        $set: {
          favoriteCurrencies: [...user.favoriteCurrencies, newCurrency],
        },
        $currentDate: { lastUpdated: true },
      }
    );

    if (result.modifiedCount > 0) {
      user = await User.findOne({ email });
    }

    mongoose.connection.close();
    return NextResponse.json({ message: "Created user successfully", success: true, user });
  } catch (error: any) {
    mongoose.connection.close();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
