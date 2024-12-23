import React, { useState,useEffect } from "react";
import { Button } from "@mui/material";
import { IoMdEye, IoMdDownload } from "react-icons/io";
import { FaLink, FaFilePdf } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import ViewPdf from "./ViewPdf";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./style.css";
import dynamic from 'next/dynamic';

// Import the pdfjs-dist dynamically with next/dynamic and disable SSR
const viewPdf = dynamic(() => import("./ViewPdf"), { ssr: false });
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";
const CoursePYQS = ({ pyqs }) => {
  const links = pyqs.filter((item) => item.type === "link");
  const pdfs = pyqs.filter((item) => item.type === "pdf");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedPdf, setSelectedPdf] = useState(null); // State to track the selected PDF
   useEffect(() => {
     // Set the worker source on the client-side only
     pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
   }, []);
  const handleViewPdf = (pdf) => {
    setSelectedPdf(pdf);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  return (
    <div className="w-full px-2 pt-5 pb-8 sm:pt-8 sm:pb-12 sm:px-5 lg:px-10 xl:px-16">
      <div className="space-y-4">
        <p className="text-2xl sm:text-4xl font-bold">Previous Year Papers</p>
        {links.length === 0 && pdfs.length === 0 && (
          <p className="text-sm sm:text-[16px] font-medium text-center">
            - No papers available.
          </p>
        )}
        {links.length > 0 && (
          <div className="space-y-4">
            <p className="font-semibold text-lg sm:text-xl">Links:</p>
            <div className="space-y-4">
              {links.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center space-x-4 border p-2 rounded-md"
                >
                  <FaLink className="text-blue-500  max-sm:!hidden" size={20} />
                  <div className="flex-1">
                    <p className="text-xs sm:text-[16px]">{item.title}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="max-sm:!hidden"
                      onClick={() => handleOpenLink(item.url)}
                    >
                      View
                    </Button>
                    <IoMdEye
                      className="!text-blue-500  sm:!hidden"
                      size={24}
                      onClick={() => handleOpenLink(item.url)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {pdfs.length > 0 && (
          <div className="space-y-4">
            <p className="font-semibold text-lg sm:text-xl">Pdfs:</p>
            <div className="space-y-4">
              {pdfs.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center space-x-4 border  p-2 rounded-md"
                >
                  <FaFilePdf className="text-red-500 max-sm:!hidden" size={24} />
                  <div className="flex-1">
                    <p className="text-xs sm:text-[16px]">{item.title}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="max-sm:!hidden"
                      onClick={() => handleViewPdf(item)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      className="max-sm:!hidden"
                      onClick={() => handleDownload(item.url)}
                    >
                      Download
                    </Button>
                    <IoMdEye
                      className="text-blue-500 cursor-pointer sm:!hidden"
                      size={24}
                      onClick={() => handleViewPdf(item)}
                    />
                    <IoMdDownload
                      className="text-red-500 cursor-pointer sm:!hidden"
                      size={24}
                      onClick={() => handleDownload(item.url)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Modal for viewing PDF */}
      <Modal open={isModalOpen} className="z-100">
        <Box
          sx={{
            ...style,
            width: "97vw",
            "@media (max-width: 1024px)": {
              width: "97vw",
            },
            "@media (max-width: 768px)": {
              width: "97vw",
              maxHeight: "95vh",
            },
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={closeModal}
            sx={{
              position: "fixed", // Change to 'fixed' for sticky behavior
              top: 8,
              right: 8,
              zIndex: 1000, // Ensure the button stays above other content
            }}
          >
            X
          </Button>

          <div className="modal-content">
            <ViewPdf pdf={selectedPdf} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CoursePYQS;
