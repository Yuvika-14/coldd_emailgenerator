import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const pythonBackendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000/api/generate-email";

    const response = await fetch(pythonBackendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { detail: errorData.detail || `Backend error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API proxy error:", error);
    
    // Handle connection refused when Python backend server is not running
    if (error.cause?.code === "ECONNREFUSED" || error.message?.includes("fetch failed")) {
      return NextResponse.json(
        {
          detail:
            "Python backend server is not running on http://127.0.0.1:8000. Please start it by running 'uvicorn main:app --reload --port 8000' inside the 'd:\\coldemail' folder.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { detail: error.message || "Failed to communicate with backend server." },
      { status: 500 }
    );
  }
}
