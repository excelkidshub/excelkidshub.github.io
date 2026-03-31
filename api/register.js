export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFyRzQ1FRe1Vnj6NViY8tlYQQtZRLphQkgbeLHZRz_gyRDJCn2O-QXWTJCeEvAvNPMDQ/exec";

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

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