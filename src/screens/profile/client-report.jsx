import { BiSolidFilePdf } from "react-icons/bi";
import { GradientIcon } from "@/components/gradient-icon";
import ScreenHeader from "@/components/screen-header";

const samplePDFs = [
  {
    title: "Client Overview Report",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    filename: "Client_Overview_Report.pdf",
  },
  {
    title: "Monthly Financial Report",
    url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
    filename: "Monthly_Financial_Report.pdf",
  },
  {
    title: "Annual Summary Report",
    url: "https://www.orimi.com/pdf-test.pdf",
    filename: "Annual_Summary_Report.pdf",
  },
];

const handleDownloadAndOpen = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = filename;
    downloadLink.click();

    window.open(blobUrl, "_blank");
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
  } catch (error) {
    console.error("Failed to download/open PDF:", error);
  }
};

const openInNewTab = (url) => {
  window.open(url, "_blank");
};

const ClientReport = () => {
  return (
    <div className="h-full w-screen bg-white space-y-6 px-4 py-5">
      <ScreenHeader title="Reports" isBack />

      <div className="space-y-4 w-full">
        {samplePDFs.map((pdf, index) => (
          <button
            key={index}
            className="flex w-full space-x-4 items-center bg-feild_primay p-4 rounded-xl shadow-sm hover:shadow-md transition"
            // onClick={() => handleDownloadAndOpen(pdf.url, pdf.filename)}
            onClick={() => openInNewTab(pdf.url)}
          >
            <GradientIcon Icon={BiSolidFilePdf} />
            <p className="text-base font-medium text-gradient">{pdf.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClientReport;
