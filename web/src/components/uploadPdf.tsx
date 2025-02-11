import React, { useEffect, useState } from "react";
import { Upload, Download, FileText } from "lucide-react";

const MAX_FILE_SIZE_MB = 8;
const UPLOAD_PDF_URL = "http://localhost:8080/api/public/v1/file-upload/pdf";

const UploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // this is working
    const test = "http://localhost:8080/api/public/test";
    fetch(test)
      .then((response) => console.log("GET TEST", response))
      .catch((error) => console.error(error));

    const post_test = "http://localhost:8080/api/public/test";
    fetch(post_test, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "value",
      }),
    })
      .then((response) => console.log("POST TEST", response))
      .catch((error) => console.error(error));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        event.target.value = "";
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
        event.target.value = "";
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch(UPLOAD_PDF_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setResponse(blob);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (response) {
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "response.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Upload PDF
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="pdf-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Select PDF file
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="pdf-upload"
                className="flex flex-col items-center justify-center w-full transition duration-300 ease-in-out border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-12 h-12 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF (MAX. {MAX_FILE_SIZE_MB}MB)
                  </p>
                </div>
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {file && (
            <p className="text-sm text-gray-600">Selected file: {file.name}</p>
          )}
          <button
            onClick={handleUpload}
            className={`w-full flex items-center justify-center px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out ${
              isUploading || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
            }`}
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <>
                <Upload className="w-5 h-5 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Upload PDF
              </>
            )}
          </button>
        </div>
        {response && (
          <div className="mt-6">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center w-full px-4 py-2 text-white transition duration-300 ease-in-out bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadComponent;
