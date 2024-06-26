import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { Encrpyt } from "@/app/lib/encrypt";
import { IUser } from "@/app/lib/entities";
import { Jwt } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  await connectMongo();
  const body: Pick<IUser, "username" | "password"> = await req.json();

  const username = body.username.trim();
  const password = body.password.trim();

  if (!username || !password) {
    return NextResponse.json(
      {
        error: "A username and password are required to log in to an account.",
      },
      { status: 400 }
    );
  }

  const accountExists = await User.findOne({ username: username });

  if (!accountExists) {
    return NextResponse.json(
      {
        error: `There is no account with the username: ${username}.`,
      },
      { status: 400 }
    );
  }

  const encrypt = new Encrpyt();

  const passwordAreEqual = await encrypt.compareString(password, accountExists.password);

  if (!passwordAreEqual) {
    return NextResponse.json(
      {
        error: `Incorrect password.`,
      },
      { status: 400 }
    );
  }

  const data = {
    username: accountExists.username,
    email: accountExists.email,
    plan: accountExists.plan,
    emailVerified: accountExists.emailVerified,
  };

  const jwt = new Jwt({ cookieName: "token", payload: data });

  await jwt.signJWT();

  return NextResponse.json(
    {
      data: data,
      message: "User successfully logged in!",
    },
    { status: 200 }
  );
}
