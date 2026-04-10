import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Initialize Supabase with Service Role Key for backend product fetching
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Check if API Key is configured
    if (!process.env.GEMINI_API_KEY) {
       return NextResponse.json({ 
         valid: true,
         metrics: { sebum: 65, barrier: 45, hydration: 30, texture: 55 },
         verdict: "DEMO MODE: Please configure GEMINI_API_KEY in environment variables for live analysis.",
         recommendations: []
       });
    }

    // 1. Fetch available products for context
    const { data: products } = await supabase.from("products").select("id, name, description");
    const productCatalog = products?.map(p => `${p.name} (ID: ${p.id}): ${p.description}`).join("\n") || "";

    // 2. Initialize Model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    // 3. System Prompt
    const prompt = `
      Act as a clinical dermatologist analyzing a high-resolution skin scan for the brand "BE-OWNED SKIN".
      
      STEP 1: VALIDATION
      Check if the provided image is a human face, skin texture, or a clear dermatological target.
      If the image is NOT human skin (e.g. an object, animal, computer screen, random text, landscape), set "valid" to false and provide a clinical rejection message in the "error" field.

      STEP 2: ANALYSIS (Only if valid is true)
      Analyze the skin for the following parameters (return as percentages 0-100):
      1. Sebum Toxicity (Oiliness/Congestion level)
      2. Barrier Integrity (Sensitivity/Redness/Barrier health)
      3. Hydration Level (Moisture retention)
      4. Textural Degeneration (Smoothness/Fine lines/Porosity)

      STEP 3: CLINICAL VERDICT
      Provide a concise 2-3 sentence "Clinical Verdict" explaining the state of their skin. Use an authoritative, clinical tone.

      STEP 4: RECOMMENDATIONS
      Recommend 1-2 relevant products from our actual catalog provided below.
      Catalog:
      ${productCatalog}

      RETURN THE DATA AS JSON:
      {
        "valid": boolean,
        "error": string | null,
        "metrics": {
          "sebum": number,
          "barrier": number,
          "hydration": number,
          "texture": number
        },
        "verdict": string,
        "recommendations": [ { "id": string, "reason": string } ]
      }
    `;

    // 4. Extract base64 data correctly
    const base64Data = image.split(",")[1] || image;

    // 5. Generate Content
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const responseText = result.response.text();
    const analysis = JSON.parse(responseText);
    
    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: "Neural matrix offline. Please try again later." }, { status: 500 });
  }
}
