import React from "react";


export default function Download() {
    const handleDownload = () => {
        const resumeUrl = "/assets/YUVARAJ_FULLSTACK_DEVELOPER.pdf"; // Path relative to public folder
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = "YUVARAJ_FULLSTACK_DEVELOPER.pdf"; // Set custom file name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return   <button className="rounded-md border border-blue-200 bg-blue-600 p-2 text-1.5r text-white shadow-sm hover:bg-blue-700" onClick={handleDownload}>Download Resume</button>
       
}
