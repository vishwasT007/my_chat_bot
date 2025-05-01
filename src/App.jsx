import { useState } from "react";
import Header from "./components/Header";
import FileUploader from "./components/FileUploader";
import Summary from "./components/Summary";
import Chat from "./components/Chat";
function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  return (
    <>
      <main className="container">
        <Header />

        {!uploadedFile ? (
          <FileUploader setFile={setUploadedFile} />
        ) : (
          <>
            <Summary file={uploadedFile} />
            <Chat />
          </>
        )}
      </main>
    </>
  );
}

export default App;
