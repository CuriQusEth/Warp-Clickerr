import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "Warp Clicker Orchestrator",
    status: "active",
    platform: "Warp Clicker",
    version: "1.0.0"
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Agent interaction received",
      receivedAt: new Date().toISOString(),
      payload: body
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
