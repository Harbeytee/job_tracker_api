import { model, models, Schema } from "mongoose";

const JobSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 100,
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "accepted", "rejected", "ghosted"],
      default: "applied",
    },
    source: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    location: {
      type: String,
      required: false,
    },
    resumeUrl: {
      type: String,
      validate: {
        validator: function (url: string) {
          return !url || /^https?:\/\/.+/i.test(url);
        },
        message: "resumeUrl must be a valid URL",
      },
    },
  },
  { timestamps: true }
);

const Job = models.Job || model("Job", JobSchema);
export default Job;
