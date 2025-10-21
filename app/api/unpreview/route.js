import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  cookies().delete("hk-preview");
  return NextResponse.redirect(new URL("/", req.url));
}
