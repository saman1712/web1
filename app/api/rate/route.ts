import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const mobile = String(body?.mobile ?? "").trim();
    const questions = Array.isArray(body?.questions) ? body.questions : [];

    if (questions.length === 0) {
      return NextResponse.json({
        status: 0,
        message: "لطفا به سوالات پاسخ دهید",
      });
    }

    if (name.length < 2) {
      return NextResponse.json({
        status: 0,
        message: "لطفا نام خود را وارد کنید",
      });
    }

    if (!/^09\d{9}$/.test(mobile.replace(/\s/g, ""))) {
      return NextResponse.json({
        status: 0,
        message: "شماره موبایل معتبر نیست",
      });
    }

    return NextResponse.json({
      status: 1,
      message: "نظر شما با موفقیت ثبت شد",
    });
  } catch {
    return NextResponse.json(
      { status: 0, message: "خطا در ثبت نظر" },
      { status: 400 },
    );
  }
}
