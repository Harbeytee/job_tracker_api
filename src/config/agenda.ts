import Agenda, { Job } from "agenda";
import cloudinary from "./cloudinary";
import config from "./config";

//this config is for deleting the cover letters from cloudinary
const agenda = new Agenda({
  db: { address: config.mongoUri as string, collection: "agendaJobs" },
});

// Define the job to delete the Cloudinary file
agenda.define("delete cloudinary file", async (job: Job) => {
  const { public_id } = job.attrs.data;
  console.log(`Deleting Cloudinary file: ${public_id}`);

  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "raw",
    });
    console.log("Delete result:", result);
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
});

export default agenda;
