const { isValid } = require("./validator");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "deepseek/deepseek-v4-flash:free";

const extractJson = (content) => {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
};

const cleanString = (value, fallback = "") =>
  typeof value === "string" ? value.trim() : fallback;

const generateProductContent = async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ msg: "AI API key is not configured" });
    }

    const {
      productName,
      category,
      price,
      isFreeDelivery,
      description,
      productImage,
    } = req.body;

    if (!isValid(productName)) {
      return res.status(400).json({ msg: "Product name is required" });
    }

    if (!isValid(category)) {
      return res.status(400).json({ msg: "Category is required" });
    }

    const prompt = {
      productName: cleanString(productName),
      category: cleanString(category).toLowerCase(),
      price: price === "" || price === undefined ? null : Number(price),
      isFreeDelivery: Boolean(isFreeDelivery),
      existingNotes: cleanString(description),
      hasImage: Boolean(cleanString(productImage)),
    };

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:4000",
        "X-Title": "E-Commerce Product Admin",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        temperature: 0.5,
        messages: [
          {
            role: "system",
            content:
              "You write concise e-commerce product listing copy. Return only valid JSON with keys description, shortSummary, seoTitle, seoDescription, and tags. tags must be an array of 5 short strings.",
          },
          {
            role: "user",
            content: `Create product content for this listing:\n${JSON.stringify(
              prompt,
              null,
              2
            )}`,
          },
        ],
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({
        msg: result?.error?.message || "AI content generation failed",
        code: result?.error?.code,
      });
    }

    const content = result?.choices?.[0]?.message?.content;
    const generated = content ? extractJson(content) : null;

    if (!generated?.description) {
      return res.status(502).json({ msg: "AI returned an invalid response" });
    }

    return res.status(200).json({
      msg: "AI product content generated",
      content: {
        description: cleanString(generated.description),
        shortSummary: cleanString(generated.shortSummary),
        seoTitle: cleanString(generated.seoTitle),
        seoDescription: cleanString(generated.seoDescription),
        tags: Array.isArray(generated.tags)
          ? generated.tags.map((tag) => cleanString(tag)).filter(Boolean).slice(0, 5)
          : [],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message || "Server Error" });
  }
};

module.exports = {
  generateProductContent,
};
