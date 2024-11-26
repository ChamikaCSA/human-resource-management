import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LeaveFilterCard = ({
  fromDate,
  toDate,
  leaveStatus,
  leaveType,
  setFromDate,
  setToDate,
  setLeaveStatus,
  setLeaveType,
}: {
  fromDate: Date | null;
  toDate: Date | null;
  leaveStatus: string;
  leaveType: string;
  setFromDate: (date: Date | null) => void;
  setToDate: (date: Date | null) => void;
  setLeaveStatus: (status: string) => void;
  setLeaveType: (type: string) => void;
}) => (
  <Card className="mb-10 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-4">
      <h6 className="text-lg font-semibold">Filter Leaves</h6>
    </CardHeader>
    <CardContent className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300 rounded-md",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : <span>From Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <Calendar
                mode="single"
                selected={fromDate ?? undefined}
                onSelect={(date) => setFromDate(date ?? null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300 rounded-md",
                  !toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : <span>To Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <Calendar
                mode="single"
                selected={toDate ?? undefined}
                onSelect={(date) => setToDate(date ?? null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Select onValueChange={setLeaveStatus}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md">
              <SelectValue placeholder="Filter by Status">
                {leaveStatus === "all" ? "Filter by Status" : leaveStatus}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select onValueChange={setLeaveType}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md">
              <SelectValue placeholder="Filter by Leave Type">
                {leaveType === "all" ? "Filter by Leave Type" : leaveType}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LeaveFilterCard;
