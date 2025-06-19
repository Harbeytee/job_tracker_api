import { Types } from "mongoose";
import { JobStatus, JobType } from "./enums";

export interface IJob {
  _id?: Types.ObjectId;
  createdBy: Types.ObjectId;
  role: string;
  company: string;
  status?: JobStatus;
  source?: string;
  appliedAt?: Date;
  notes?: string;
  type?: JobType;
  location?: string;
  resumeUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
