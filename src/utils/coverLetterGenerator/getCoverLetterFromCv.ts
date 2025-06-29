import OpenAI from "openai";
import path from "path";
import config from "../../config/config";
import fetchFileBuffer from "./fetchFileBuffer";
import PdfParse from "pdf-parse";
import mammoth from "mammoth";
import { BadRequestError } from "../errors";
import getPrompt from "./getPrompt";

export default async function getCoverLetterFromCv(obj: {
  cvUrl: string;
  jobTitle: string;
  company: string;
}) {
  const { cvUrl, jobTitle, company } = obj;
  const openai = new OpenAI({
    apiKey: config.openAi.apiKey,
  });

  const fileBuffer = await fetchFileBuffer(cvUrl);
  const fileExt = path.extname(cvUrl).toLowerCase();

  let cvText = "";

  if (fileExt === ".pdf") {
    const pdfData = await PdfParse(fileBuffer);
    cvText = pdfData.text;
  } else if (fileExt === ".docx") {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    cvText = result.value;
  } else {
    throw new BadRequestError(
      "Unsupported file type. Only PDF and DOCX are allowed."
    );
  }

  const prompt = getPrompt({
    cvText,
    jobTitle,
    company,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const letter = response?.choices?.[0].message?.content?.trim();
  return letter;
}
