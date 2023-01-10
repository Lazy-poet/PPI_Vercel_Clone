import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
  filePath: string;
  onClose: any;
};

export default function PDFViewer({ filePath, onClose }: Props) {
  const [numPages, setNumPages] = useState(null);

  // @ts-ignore
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-[#000000aa] z-50 flex justify-center items-center">
      <div className="w-auto h-4/5 overflow-y-auto bg-white">
        <Document file={filePath} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(
            // @ts-ignore
            { length: numPages },
            (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            )
          )}
        </Document>
      </div>
      <div
        className="absolute right-10 top-10 text-white cursor-pointer"
        onClick={() => onClose()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      </div>
    </div>
  );
}
