"use client";

import { useEffect, useState } from "react";
import { getLeaves, applyLeave, updateLeave, deleteLeave } from "../../lib/leaves";
import { Leave } from "./types";
import { PaginationWrapper } from "../../components/pagination-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveApplicationForm from "../../components/leave-application-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

const initialFormState = {
  leaveType: "",
  startDate: null as Date | null,
  startDayStartTime: undefined as string | undefined,
  startDayEndTime: undefined as string | undefined,
  endDate: null as Date | null,
  endDayStartTime: undefined as string | undefined,
  endDayEndTime: undefined as string | undefined,
  comments: "",
};

const initialLeaveBalance = { medical: 6, casual: 6 };

const LeavePage = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [formState, setFormState] = useState(initialFormState);
  const [editFormState, setEditFormState] = useState(initialFormState);
  const [error, setError] = useState("");
  const [isApplyingLeave, setIsApplyingLeave] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [leaveBalance, setLeaveBalance] = useState(initialLeaveBalance);

  useEffect(() => {
    fetchLeaves();
  }, [page]);

  useEffect(() => {
    calculateLeaveBalance();
  }, [leaves]);

  const fetchLeaves = async () => {
    setLoading(true);
    const { leaves: fetchedLeaves, total } = await getLeaves(page, limit);
    setLeaves(fetchedLeaves);
    setTotalLeaves(total);
    setLoading(false);
  };

  const calculateLeaveBalance = () => {
    const medicalLeavesTaken = calculateLeavesTaken("Medical");
    const casualLeavesTaken = calculateLeavesTaken("Casual");
    setLeaveBalance({
      medical: initialLeaveBalance.medical - medicalLeavesTaken,
      casual: initialLeaveBalance.casual - casualLeavesTaken,
    });
  };

  const calculateLeavesTaken = (type: string) => {
    return leaves.filter(leave => leave.leaveType === type).reduce((acc, leave) => acc + calculateLeaveDays(leave), 0);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      const { leaveType, startDate, startDayStartTime, startDayEndTime, endDate, endDayStartTime, endDayEndTime, comments } = formState;
      if (!startDate || !endDate || !startDayStartTime || !startDayEndTime) {
        throw new Error("All date and time fields are required");
      }

      await applyLeave(leaveType, startDate.toISOString(), startDayStartTime, startDayEndTime, endDate.toISOString(), endDayStartTime ?? "", endDayEndTime ?? "", comments, userId);

      resetFormState();
      setIsApplyingLeave(false);
      fetchLeaves();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      if (!editingLeave) throw new Error("No leave selected for editing");

      const { leaveType, startDate, startDayStartTime, startDayEndTime, endDate, endDayStartTime, endDayEndTime, comments } = editFormState;
      if (!startDate || !endDate || !startDayStartTime || !startDayEndTime) {
        throw new Error("All date and time fields are required");
      }

      await updateLeave(editingLeave.id, leaveType, startDate.toISOString(), startDayStartTime, startDayEndTime, endDate.toISOString(), endDayStartTime ?? "", endDayEndTime ?? "", comments, editingLeave.status);

      setEditingLeave(null);
      setIsEditing(false);
      resetEditFormState();
      fetchLeaves();
      setActiveTab("list");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDeleteLeave = async (id: string) => {
    try {
      await deleteLeave(id);
      fetchLeaves();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const startEditing = (leave: Leave) => {
    setEditingLeave(leave);
    setEditFormState({
      leaveType: leave.leaveType,
      startDate: new Date(leave.startDate),
      startDayStartTime: leave.startDateStartTime,
      startDayEndTime: leave.startDateEndTime,
      endDate: new Date(leave.endDate),
      endDayStartTime: leave.endDateStartTime,
      endDayEndTime: leave.endDateEndTime,
      comments: leave.comments,
    });
    setIsEditing(true);
    setActiveTab("edit");
  };

  const handleTabChange = (value: string) => {
    if (value !== "edit") {
      setEditingLeave(null);
      setIsEditing(false);
    }
    setActiveTab(value);
  };

  const resetFormState = () => {
    setFormState(initialFormState);
  };

  const resetEditFormState = () => {
    setEditFormState(initialFormState);
  };

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <Header />
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="apply" className="text-teal-600">Apply Leave</TabsTrigger>
          <TabsTrigger value="list" className="text-teal-600">Leave List</TabsTrigger>
          {isEditing && <TabsTrigger value="edit" className="text-teal-600">Edit Leave</TabsTrigger>}
        </TabsList>
        <TabsContent value="apply" className="p-4 bg-white rounded-b-md shadow-inner">
          <LeaveApplicationForm
            handleApplyLeave={handleFormSubmit}
            error={error}
            formState={formState}
            setFormState={setFormState}
            isApplyingLeave={isApplyingLeave}
            setIsApplyingLeave={setIsApplyingLeave}
            isEditing={false}
            leaveBalance={leaveBalance}
          />
        </TabsContent>
        <TabsContent value="list" className="p-4">
          <LeaveList
            leaves={leaves}
            loading={loading}
            startEditing={startEditing}
            handleDeleteLeave={handleDeleteLeave}
          />
          <PaginationWrapper
            page={page}
            setPage={setPage}
            totalItems={totalLeaves}
            limit={limit}
          />
        </TabsContent>
        {isEditing && (
          <TabsContent value="edit" className="p-4 bg-white rounded-b-md shadow-inner">
            <LeaveApplicationForm
              handleApplyLeave={handleEditFormSubmit}
              error={error}
              formState={editFormState}
              setFormState={setEditFormState}
              isApplyingLeave={isApplyingLeave}
              setIsApplyingLeave={setIsApplyingLeave}
              isEditing={true}
              leaveBalance={leaveBalance}
            />
          </TabsContent>
        )}
      </Tabs>
      <Footer />
    </div>
  );
};

const Header = () => (
  <div className="flex justify-between items-center mb-6">
    <h4 className="text-2xl font-bold text-teal-700">Leave</h4>
  </div>
);

const LeaveList = ({ leaves, loading, startEditing, handleDeleteLeave }: { leaves: Leave[], loading: boolean, startEditing: (leave: Leave) => void, handleDeleteLeave: (id: string) => void }) => (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHeader className="bg-teal-50">
        <TableRow>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Leave Type</TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Start Date & Time</TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">End Date & Time</TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Number of Days</TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Status</TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Comments</TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">Loading...</TableCell>
          </TableRow>
        ) : (
          leaves.map((leave) => (
            <TableRow key={leave.id} className="hover:bg-teal-50 transition-colors duration-200">
              <TableCell className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{formatDateTime(leave.startDate, leave.startDateStartTime)}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {leave.startDate === leave.endDate ? formatDateTime(leave.startDate, leave.startDateEndTime) : formatDateTime(leave.endDate, leave.endDateEndTime)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{calculateLeaveDays(leave).toFixed(2)}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{leave.status}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{leave.comments}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => startEditing(leave)} className="text-teal-600 hover:text-teal-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteLeave(leave.id)} className="text-orange-600 hover:text-orange-800 ml-2">
                  <Trash className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

const Footer = () => (
  <footer className="mt-10 text-center text-teal-500">
    &copy; {new Date().getFullYear()} TealHRM. All rights reserved.
  </footer>
);

const formatDateTime = (date: string, time: string) => `${new Date(date).toLocaleDateString()} ${time}`;

const calculateLeaveDays = (leave: Leave) => {
  const startDate = new Date(leave.startDate);
  const endDate = new Date(leave.endDate);
  if (startDate.toDateString() === endDate.toDateString()) {
    const startDateDuration = parseFloat(leave.startDateEndTime) - parseFloat(leave.startDateStartTime);
    return startDateDuration / 8;
  }
  const totalDays = Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  const startDateDuration = parseFloat(leave.startDateEndTime) - parseFloat(leave.startDateStartTime);
  const endDateDuration = parseFloat(leave.endDateEndTime) - parseFloat(leave.endDateStartTime);
  const totalDuration = startDateDuration + endDateDuration;
  return totalDays - 2 + totalDuration / 8;
};

export default LeavePage;
