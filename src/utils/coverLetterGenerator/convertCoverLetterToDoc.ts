import { UploadApiResponse } from "cloudinary";
import { randomUUID } from "crypto";
import { Document, Packer, Paragraph } from "docx";
import cloudinary from "../../config/cloudinary";
import { BadRequestError } from "../errors";
import { Readable } from "stream";
import agenda from "../../config/agenda";

export default async function convertCoverLetterToDoc(letter: string) {
  const uniqueId = randomUUID();
  const doc = new Document({
    sections: [
      {
        children: letter.split("\n\n").map((p) => new Paragraph(p)),
      },
    ],
  });

  //  Convert to buffer
  const buffer: Buffer = await Packer.toBuffer(doc);

  // Convert buffer to stream and upload to Cloudinary using upload_stream
  const uploadResult: UploadApiResponse = await new Promise(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "cover_letters",
          public_id: `cover_letter_${uniqueId}.docx`,
          type: "upload",
        },
        (error, result) => {
          if (error || !result) {
            return reject(
              new BadRequestError("Unable to generate cover letter")
            );
          }

          resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    }
  );

  const { public_id, secure_url } = uploadResult;

  // Schedule deletion 24 hours later
  await agenda.schedule("in 24 hours", "delete cloudinary file", { public_id });

  return secure_url;
}
