import { NextResponse } from 'next/server';

function handleCors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: handleCors() });
}

export async function GET() {
  return NextResponse.json({
    name: "Warp Clicker Orchestrator",
    status: "active",
    platform: "Warp Clicker",
    version: "1.0.0"
  }, { headers: handleCors() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Agent interaction received",
      receivedAt: new Date().toISOString(),
      payload: body
    }, { headers: handleCors() });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: handleCors() });
  }
}
