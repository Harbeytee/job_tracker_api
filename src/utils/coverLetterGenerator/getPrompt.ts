export default function getPrompt({
  cvText,
  jobTitle,
  company,
}: {
  cvText: string;
  jobTitle: string;
  company: string;
}) {
  const prompt = `
    You are a professional career assistant. Based on the following information, generate a tailored cover letter.
    
    CV:
        ${cvText}
    
        Job Title: ${jobTitle}
        Company: ${company}
    
        Instructions:
        - Make it concise (max 350 words)
        - Use a professional tone
        - Tailor it specifically to the job title and company
        - Include 1-2 key achievements from the CV that relate to the role
    
        Generate only the body of the cover letter (no formatting).
        `;
  return prompt;
}
