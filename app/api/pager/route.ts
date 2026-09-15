import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const num = String(body?.num ?? "").trim();

    if (!num) {
      return NextResponse.json({
        status: 0,
        message: "شماره میز را وارد کنید",
      });
    }

    return NextResponse.json({
      status: 1,
      message: "درخواست شما ثبت شد",
    });
  } catch {
    return NextResponse.json(
      { status: 0, message: "خطا در ثبت درخواست" },
      { status: 400 },
    );
  }
}
