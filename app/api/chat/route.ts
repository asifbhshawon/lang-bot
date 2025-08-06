import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Replace with your actual FastAPI server URL
    const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';
    
    const response = await fetch(`${FASTAPI_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI server responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a mock response for development/testing
    const { message } = await request.json();
    return NextResponse.json({
      response: `**Echo Response:** ${message}\n\nThis is a **mock response** while your FastAPI server is not available. Here's some sample markdown:\n\n\`\`\`python\ndef hello_world():\n    print("Hello from the chat!")\n    return "AI response"\n\`\`\`\n\n- List item 1\n- List item 2\n- List item 3\n\n> This is a blockquote with *italic* and **bold** text.`
    });
  }
}