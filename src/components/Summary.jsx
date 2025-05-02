import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function Summary({ file }) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");

  async function getSummary() {
    setStatus("loading");

    if (!file || !file.file || !file.type) {
      setStatus("error");
      setSummary("Invalid file format.");
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      });

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            text: `Summarize the document in one short paragraph (less than 130 words),
            Use just plain text with no markdowns or html tags`,
          },
          {
            inlineData: {
              mimeType: file.type,
              data: file.file, // already base64-encoded
            },
          },
        ],
      });

      const got_summary = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (got_summary) {
        setSummary(got_summary);
        setStatus("success");
      } else {
        console.error(
          "Summary not found. Check `parts`:",
          result.candidates?.[0]?.content
        );
        setSummary("No summary was generated.");
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      console.error("Error generating summary:", err);
      setSummary("An error occurred while summarizing.");
    }
  }

  useEffect(() => {
    if (status === "idle") {
      getSummary();
    }
  }, [status]);

  return (
    <section className="summary">
      <img src={file.imageUrl} alt="Preview Image" />
      <h1>Here is the Summary</h1>
      {status === "loading" && <Loader />}
      {status === "success" && <p>{summary}</p>}
      {status === "error" && <p>Could not generate summary</p>}
    </section>
  );
}

export default Summary;
