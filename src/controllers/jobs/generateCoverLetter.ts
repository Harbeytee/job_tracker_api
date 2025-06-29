import { Request, Response } from "express";
import { BadRequestError } from "../../utils/errors";
import getCoverLetterFromCv from "../../utils/coverLetterGenerator/getCoverLetterFromCv";
import { StatusCodes } from "http-status-codes";
import convertCovertLetterToDoc from "../../utils/coverLetterGenerator/convertCoverLetterToDoc";
import { coverLetterBodySchema } from "../../schemas/coverLetterSchema";

const generateCoverLetter = async (req: Request, res: Response) => {
  //for validating payload
  coverLetterBodySchema.parse(req.body);

  const letter = await getCoverLetterFromCv({ ...req.body });

  if (letter) {
    const downloadUrl = await convertCovertLetterToDoc(letter);

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Cover letter generated successfully",
      data: {
        letter,
        downloadUrl,
      },
    });
  } else {
    throw new BadRequestError("Unable to generate cover letter");
  }
};

export default generateCoverLetter;
