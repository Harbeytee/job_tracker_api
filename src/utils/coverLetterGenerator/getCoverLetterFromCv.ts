import path from "path";
import config from "../../config/config";
import fetchFileBuffer from "./fetchFileBuffer";
import PdfParse from "pdf-parse";
import mammoth from "mammoth";
import getPrompt from "./getPrompt";
import { GoogleGenAI } from "@google/genai";

export default async function getCoverLetterFromCv(obj: {
  cvUrl: string;
  jobTitle: string;
  company: string;
}) {
  const { cvUrl, jobTitle, company } = obj;

  const fileBuffer = await fetchFileBuffer(cvUrl);
  const fileExt = path.extname(cvUrl).toLowerCase();

  let cvText = "";

  if (fileExt === ".pdf") {
    const pdfData = await PdfParse(fileBuffer);
    cvText = pdfData.text;
  } else if (fileExt === ".docx") {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    cvText = result.value;
  }

  const prompt = getPrompt({
    cvText,
    jobTitle,
    company,
  });

  const ai = new GoogleGenAI({ apiKey: config.google.geminiApiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", //"gemini-pro"
    contents: prompt,
  });

  const letter = response?.text?.trim();

  return letter;
}
