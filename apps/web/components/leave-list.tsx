import { Check, X, Edit, Trash, CalendarX } from "lucide-react";
import LeaveTable from "./leave-table";
import { Leave } from "../app/leave/types";
import { formatDateTime, calculateLeaveDays } from "../utils/dateHelpers";
const LeaveList = ({
  leaves,
  loading,
  startEditing,
  handleDeleteLeave,
}: {
  leaves: Leave[];
  loading: boolean;
  startEditing: (leave: Leave) => void;
  handleDeleteLeave: (id: string) => void;
}) => {
  const headers = [
    "Leave Type",
    "Start Date & Time",
    "End Date & Time",
    "Number of Days",
    "Status",
    "Comments",
    "Actions",
  ];

  const rows = leaves.map((leave) => [
    leave.leaveType,
    formatDateTime(leave.startDate, leave.startDateStartTime),
    leave.startDate === leave.endDate
      ? formatDateTime(leave.startDate, leave.startDateEndTime)
      : formatDateTime(leave.endDate, leave.endDateEndTime),
    calculateLeaveDays(leave).toFixed(2),
    leave.status,
    leave.comments,
    <>
      <button
        onClick={() => startEditing(leave)}
        className="text-teal-600 hover:text-teal-800"
      >
        <Edit className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleDeleteLeave(leave.id)}
        className="text-orange-600 hover:text-orange-800 ml-2"
      >
        <Trash className="w-5 h-5" />
      </button>
    </>,
  ]);

  return (
    <div>
      {leaves.length === 0 && !loading ? (
        <div className="text-center text-gray-500 py-10">
          <CalendarX className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg">No leaves found</p>
          <p className="text-sm">Try adjusting your filters or apply for a new leave.</p>
        </div>
      ) : (
        <LeaveTable headers={headers} rows={rows} loading={loading} />
      )}
    </div>
  );
};

const SubordinateLeaveList = ({
  leaves,
  loading,
  handleApproveLeave,
  handleRejectLeave,
}: {
  leaves: Leave[];
  loading: boolean;
  handleApproveLeave: (id: string) => void;
  handleRejectLeave: (id: string) => void;
}) => {
  const headers = [
    "Name",
    "Leave Type",
    "Start Date & Time",
    "End Date & Time",
    "Number of Days",
    "Status",
    "Comments",
    "Actions",
  ];

  const rows = leaves.map((leave) => [
    leave.userName,
    leave.leaveType,
    formatDateTime(leave.startDate, leave.startDateStartTime),
    leave.startDate === leave.endDate
      ? formatDateTime(leave.startDate, leave.startDateEndTime)
      : formatDateTime(leave.endDate, leave.endDateEndTime),
    calculateLeaveDays(leave).toFixed(2),
    leave.status,
    leave.comments,
    <>
      <button
        onClick={() => handleApproveLeave(leave.id)}
        className="text-teal-600 hover:text-teal-800"
      >
        <Check className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleRejectLeave(leave.id)}
        className="text-orange-600 hover:text-orange-800 ml-2"
      >
        <X className="w-6 h-6" />
      </button>
    </>,
  ]);

  return (
    <div>
      {leaves.length === 0 && !loading ? (
        <div className="text-center text-gray-500 py-10">
          <CalendarX className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg">No leaves found</p>
          <p className="text-sm">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <LeaveTable headers={headers} rows={rows} loading={loading} />
      )}
    </div>
  );
};

export { LeaveList, SubordinateLeaveList };