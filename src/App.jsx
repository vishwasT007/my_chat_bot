import { useState } from "react";
import Header from "./components/Header";
import FileUploader from "./components/FileUploader";
import Summary from "./components/Summary";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  return (
    <>
      <main className="container">
        <Header />

        {!uploadedFile ? <FileUploader setFile={setUploadedFile} /> : <Summary file={uploadedFile} />}

       
      </main>
    </>
  );
}

export default App;
