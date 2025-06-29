import { JobStatus } from "./enums";

export type DefaultStats = {
  [key in JobStatus]: number;
};
