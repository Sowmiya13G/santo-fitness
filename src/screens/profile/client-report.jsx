import { useEffect, useState } from "react";
import { GradientIcon } from "@/components/gradient-icon";
import ScreenHeader from "@/components/screen-header";
import { getUserReport } from "@/features/user/user-api";
import { BiSolidFilePdf } from "react-icons/bi";
import { format } from "date-fns";

const ClientReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getUserReport();
        if (res?.status === 200 && Array.isArray(res.reports)) {
          setReports(res.reports);
        } else {
          setReports([]);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="h-full w-screen bg-white space-y-6 px-4 py-5">
      <ScreenHeader title="Reports" isBack />

      {loading ? (
        <p className="text-center text-gray-500 text-base font-medium">
          Loading reports...
        </p>
      ) : reports.length === 0 ? (
        <p className="text-center text-gray-500 text-base font-medium">
          No reports found 📄
        </p>
      ) : (
        <div className="space-y-6 w-full">
          {reports.map((report, index) => (
            <div key={report._id} className="space-y-3">
              <p className="text-sm text-icon">
                Created on:{" "}
                {format(new Date(report.createdAt), "dd MMM yyyy, hh:mm a")}
              </p>

              {report.attachments.map((url, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => openInNewTab(url)}
                    className="flex w-full space-x-4 items-center bg-field_primary p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <GradientIcon Icon={BiSolidFilePdf} />
                    <p className="text-base font-medium text-gradient truncate">
                      {"SFC Report" + " " + (index + 1)}
                    </p>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientReport;
