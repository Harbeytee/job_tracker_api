import axios from "axios";

const fetchFileBuffer = async (url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
};

export default fetchFileBuffer;
