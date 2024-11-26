import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LeaveApplicationForm = ({
  handleApplyLeave,
  error,
  formState,
  setFormState,
  isEditing,
  leaveBalance,
}: any) => {
  const [duration, setDuration] = useState("");
  const [partialDays, setPartialDays] = useState("");
  const [startDayDuration, setStartDayDuration] = useState("");
  const [endDayDuration, setEndDayDuration] = useState("");

  const isSameDay = formState.startDate && formState.endDate && formState.startDate.toDateString() === formState.endDate.toDateString();

  useEffect(() => {
    if (duration === "halfDayMorning") {
      setFormState((prevState: any) => ({
        ...prevState,
        startDayStartTime: "09:00",
        startDayEndTime: "13:00",
        ...(isSameDay ? {} : { endDayStartTime: "09:00", endDayEndTime: "13:00" })
      }));
    } else if (duration === "halfDayAfternoon") {
      setFormState((prevState: any) => ({
        ...prevState,
        startDayStartTime: "13:00",
        startDayEndTime: "17:00",
        ...(isSameDay ? {} : { endDayStartTime: "13:00", endDayEndTime: "17:00" })
      }));
    } else if (duration !== "specifyTime") {
      setFormState((prevState: any) => ({
        ...prevState,
        startDayStartTime: "09:00",
        startDayEndTime: "17:00",
        ...(isSameDay ? {} : { endDayStartTime: "09:00", endDayEndTime: "17:00" })
      }));
    }
  }, [duration, isSameDay]);

  const renderTimeInputs = (startTime: string, endTime: string) => (
    <div className="flex space-x-4">
      <Input
        type="time"
        value={startTime}
        onChange={(e) => setFormState((prevState: any) => ({ ...prevState, startDayStartTime: e.target.value }))}
        required
        className="w-full"
      />
      <Input
        type="time"
        value={endTime}
        onChange={(e) => setFormState((prevState: any) => ({ ...prevState, startDayEndTime: e.target.value }))}
        required
        className="w-full"
      />
    </div>
  );

  const renderDurationSelect = (value: string, onChange: (value: string) => void) => (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full border border-gray-300 rounded-md">
        <SelectValue placeholder="Select Duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="fullDay">Full Day</SelectItem>
        <SelectItem value="halfDayMorning">Half Day - Morning</SelectItem>
        <SelectItem value="halfDayAfternoon">Half Day - Afternoon</SelectItem>
        <SelectItem value="specifyTime">Specify Time</SelectItem>
      </SelectContent>
    </Select>
  );

  const getLeaveBalance = () => {
    if (formState.leaveType === "Medical") {
      return leaveBalance.medical.toFixed(2);
    } else if (formState.leaveType === "Casual") {
      return leaveBalance.casual.toFixed(2);
    } else {
      return "0.00";
    }
  };

  return (
    <Card
      id="apply-leave-card"
      className="mb-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden border border-gray-200"
    >
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-4">
        <h6 className="text-lg font-semibold">{isEditing ? "Edit Leave" : "Apply for Leave"}</h6>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleApplyLeave} className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-grow space-y-4">
              <Select onValueChange={(value) => setFormState((prevState: any) => ({ ...prevState, leaveType: value }))} value={formState.leaveType}>
                <SelectTrigger className="w-full border border-gray-300 rounded-md">
                  <SelectValue placeholder="Select Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border border-gray-300 rounded-md",
                        !formState.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formState.startDate ? format(formState.startDate, "PPP") : <span>Start Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4">
                    <Calendar
                      mode="single"
                      selected={formState.startDate}
                      onSelect={(date) => setFormState((prevState: any) => ({ ...prevState, startDate: date ?? undefined }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border border-gray-300 rounded-md",
                        !formState.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formState.endDate ? format(formState.endDate, "PPP") : <span>End Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4">
                    <Calendar
                      mode="single"
                      selected={formState.endDate}
                      onSelect={(date) => setFormState((prevState: any) => ({ ...prevState, endDate: date ?? undefined }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {formState.startDate && formState.endDate && (
                isSameDay ? (
                  <>
                    {renderDurationSelect(duration, setDuration)}
                    {duration === "Specify Time" && renderTimeInputs(formState.startDayStartTime || "", formState.startDayEndTime || "")}
                  </>
                ) : (
                  <>
                    <Select onValueChange={setPartialDays} value={partialDays}>
                      <SelectTrigger className="w-full border border-gray-300 rounded-md">
                        <SelectValue placeholder="Select Partial Days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Days">All Days</SelectItem>
                        <SelectItem value="Start Day Only">Start Day Only</SelectItem>
                        <SelectItem value="End Day Only">End Day Only</SelectItem>
                        <SelectItem value="Start and End Day Only">Start and End Day Only</SelectItem>
                      </SelectContent>
                    </Select>
                    {partialDays === "All Days" && (
                      <>
                        {renderDurationSelect(duration, setDuration)}
                        {duration === "Specify Time" && renderTimeInputs(formState.startDayStartTime || "", formState.endDayEndTime || "")}
                      </>
                    )}
                    {partialDays === "Start Day Only" && (
                      <>
                        {renderDurationSelect(startDayDuration, setStartDayDuration)}
                        {startDayDuration === "Specify Time" && renderTimeInputs(formState.startDayStartTime || "", formState.startDayEndTime || "")}
                      </>
                    )}
                    {partialDays === "End Day Only" && (
                      <>
                        {renderDurationSelect(endDayDuration, setEndDayDuration)}
                        {endDayDuration === "Specify Time" && renderTimeInputs(formState.endDayStartTime || "", formState.endDayEndTime || "")}
                      </>
                    )}
                    {partialDays === "Start and End Day Only" && (
                      <>
                        {renderDurationSelect(startDayDuration, setStartDayDuration)}
                        {startDayDuration === "Specify Time" && renderTimeInputs(formState.startDayStartTime || "", formState.startDayEndTime || "")}
                        {renderDurationSelect(endDayDuration, setEndDayDuration)}
                        {endDayDuration === "Specify Time" && renderTimeInputs(formState.endDayStartTime || "", formState.endDayEndTime || "")}
                      </>
                    )}
                  </>
                )
              )}
              <Textarea
                placeholder="Comments"
                value={formState.comments}
                onChange={(e) => setFormState((prevState: any) => ({ ...prevState, comments: e.target.value }))}
                required
                className="w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="ml-4 text-teal-700 font-semibold">
              <p className="text-teal-700 font-semibold">Leave Balance:</p>
              <p>{getLeaveBalance()} Day(s)</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="default"
              color="primary"
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              {isEditing ? "Update" : "Apply"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeaveApplicationForm;