import { Buffer } from "buffer";
import pdfIcon from "../assets/pdficon.png"
function FileUploader({setFile}) {
  async function handleFileUploader(event) {
    const uploadedFile = await event.target.files[0].arrayBuffer();
    const file = {
        type: event.target.files[0].type,
        file: Buffer.from(uploadedFile).toString("base64"),
        imageUrl: event.target.files[0].type.includes("pdf") ? pdfIcon : URL.createObjectURL(event.target.files[0])
    }
    setFile(file);
  }
  return (
    <section>
      <h2>Get Started</h2>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileUploader}
      />
    </section>
  );
}

export default FileUploader;
