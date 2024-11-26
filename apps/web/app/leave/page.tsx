"use client";

import { useEffect, useState } from "react";
import {
  getLeaves,
  applyLeave,
  updateLeave,
  deleteLeave,
  getSubordinateLeaves,
  approveLeave,
  rejectLeave,
  getLeaveBalance,
} from "../../lib/leaves";
import { Leave } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveApplicationForm from "../../components/leave-application-form";
import LeaveFilterCard from "../../components/leave-filter-card";
import { LeaveList, SubordinateLeaveList } from "../../components/leave-list";
import { validateLeaveForm } from "@/utils/formValidators";

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
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [leaveBalance, setLeaveBalance] = useState(initialLeaveBalance);
  const [subordinateLeaves, setSubordinateLeaves] = useState<Leave[]>([]);
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [leaveStatus, setLeaveStatus] = useState("all");
  const [leaveType, setLeaveType] = useState("all");

  useEffect(() => {
    fetchLeaves();
    checkIfSupervisor();
    fetchLeaveBalance();
  }, [fromDate, toDate, leaveStatus, leaveType]);

  const fetchLeaveBalance = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const balance = await getLeaveBalance(userId);
      setLeaveBalance(balance);
    }
  };

  const fetchLeaves = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      const { leaves: fetchedLeaves, total } = await getLeaves(userId);
      const filteredLeaves = fetchedLeaves.filter(
        (leave) =>
          (!fromDate || new Date(leave.startDate) >= fromDate) &&
          (!toDate || new Date(leave.endDate) <= toDate) &&
          (leaveStatus === "all" || leave.status === leaveStatus) &&
          (leaveType === "all" || leave.leaveType === leaveType)
      );
      setLeaves(filteredLeaves);
      setTotalLeaves(filteredLeaves.length);
    }
    setLoading(false);
  };

  const fetchSubordinateLeaves = async (supervisorId: string) => {
    setLoading(true);
    const { leaves: fetchedLeaves } = await getSubordinateLeaves(supervisorId);
    const filteredLeaves = fetchedLeaves.filter(
      (leave) =>
        (!fromDate || new Date(leave.startDate) >= fromDate) &&
        (!toDate || new Date(leave.endDate) <= toDate) &&
        (leaveStatus === "all" || leave.status === leaveStatus) &&
        (leaveType === "all" || leave.leaveType === leaveType)
    );
    setSubordinateLeaves(filteredLeaves);
    setLoading(false);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const validationError = validateLeaveForm(formState);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      const {
        leaveType,
        startDate,
        startDayStartTime,
        startDayEndTime,
        endDate,
        endDayStartTime,
        endDayEndTime,
        comments,
      } = formState;
      if (!startDate || !endDate || !startDayStartTime || !startDayEndTime) {
        throw new Error("All date and time fields are required");
      }

      await applyLeave(
        leaveType,
        startDate.toISOString(),
        startDayStartTime,
        startDayEndTime,
        endDate.toISOString(),
        endDayStartTime ?? "",
        endDayEndTime ?? "",
        comments,
        userId
      );

      resetFormState();
      setIsApplyingLeave(false);
      fetchLeaves();
      fetchLeaveBalance();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const validationError = validateLeaveForm(editFormState);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (!editingLeave) throw new Error("No leave selected for editing");

      const {
        leaveType,
        startDate,
        startDayStartTime,
        startDayEndTime,
        endDate,
        endDayStartTime,
        endDayEndTime,
        comments,
      } = editFormState;
      if (!startDate || !endDate || !startDayStartTime || !startDayEndTime) {
        throw new Error("All date and time fields are required");
      }

      await updateLeave(
        editingLeave.id,
        leaveType,
        startDate.toISOString(),
        startDayStartTime,
        startDayEndTime,
        endDate.toISOString(),
        endDayStartTime ?? "",
        endDayEndTime ?? "",
        comments,
        editingLeave.status
      );

      setEditingLeave(null);
      setIsEditing(false);
      resetEditFormState();
      fetchLeaves();
      setActiveTab("list");
      fetchLeaveBalance();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDeleteLeave = async (id: string) => {
    try {
      await deleteLeave(id);
      fetchLeaves();
      fetchLeaveBalance();
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

  const checkIfSupervisor = async () => {
    const role = localStorage.getItem("userRole");
    const supervisorId = localStorage.getItem("userId");
    if (role === "Supervisor" && supervisorId) {
      setIsSupervisor(true);
      fetchSubordinateLeaves(supervisorId);
    }
  };

  const handleApproveLeave = async (id: string) => {
    try {
      await approveLeave(id);
      const supervisorId = localStorage.getItem("userId");
      if (supervisorId) {
        fetchSubordinateLeaves(supervisorId);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleRejectLeave = async (id: string) => {
    try {
      await rejectLeave(id);
      const supervisorId = localStorage.getItem("userId");
      if (supervisorId) {
        fetchSubordinateLeaves(supervisorId);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <Header />
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="apply" className="text-teal-600">
            Apply Leave
          </TabsTrigger>
          {isEditing && (
            <TabsTrigger value="edit" className="text-teal-600">
              Edit Leave
            </TabsTrigger>
          )}
          <TabsTrigger value="list" className="text-teal-600">
            Leave List
          </TabsTrigger>
          {isSupervisor && (
            <TabsTrigger value="manage" className="text-teal-600">
              Manage Requests
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent
          value="apply"
          className="p-4 bg-white rounded-b-md shadow-inner"
        >
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
        {isEditing && (
          <TabsContent
            value="edit"
            className="p-4 bg-white rounded-b-md shadow-inner"
          >
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
        <TabsContent value="list" className="p-4">
          <LeaveFilterCard
            fromDate={fromDate}
            toDate={toDate}
            leaveStatus={leaveStatus}
            leaveType={leaveType}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setLeaveStatus={(status) => {
              setLeaveStatus(status);
              fetchLeaves();
            }}
            setLeaveType={(type) => {
              setLeaveType(type);
              fetchLeaves();
            }}
          />
          <LeaveList
            leaves={leaves}
            loading={loading}
            startEditing={startEditing}
            handleDeleteLeave={handleDeleteLeave}
          />
        </TabsContent>
        {isSupervisor && (
          <TabsContent value="manage" className="p-4">
            <LeaveFilterCard
              fromDate={fromDate}
              toDate={toDate}
              leaveStatus={leaveStatus}
              leaveType={leaveType}
              setFromDate={setFromDate}
              setToDate={setToDate}
              setLeaveStatus={(status) => {
                setLeaveStatus(status);
                const supervisorId = localStorage.getItem("userId");
                if (supervisorId) {
                  fetchSubordinateLeaves(supervisorId);
                }
              }}
              setLeaveType={(type) => {
                setLeaveType(type);
                const supervisorId = localStorage.getItem("userId");
                if (supervisorId) {
                  fetchSubordinateLeaves(supervisorId);
                }
              }}
            />
            <SubordinateLeaveList
              leaves={subordinateLeaves}
              loading={loading}
              handleApproveLeave={handleApproveLeave}
              handleRejectLeave={handleRejectLeave}
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

const Footer = () => (
  <footer className="mt-10 text-center text-teal-500">
    &copy; {new Date().getFullYear()} TealHRM. All rights reserved.
  </footer>
);

export default LeavePage;
