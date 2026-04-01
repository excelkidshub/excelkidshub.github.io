export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const GOOGLE_SCRIPT_URL =
      process.env.GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycbz-mcfyCnIOdIrHW4cDaowoYDbXosOeNPvNtjn9lkqa8yCZRBnCqH3ACCrWSmW3OH5rxw/exec";

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    let payload;

    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }

    if (!response.ok) {
      return res.status(response.status).json(
        payload && typeof payload === "object"
          ? payload
          : {
              success: false,
              message: text || "Unable to save admission",
            }
      );
    }

    if (payload && typeof payload === "object") {
      return res.status(200).json(payload);
    }

    return res.status(200).json({
      success: true,
      message: text,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
