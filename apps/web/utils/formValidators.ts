
export const validateSignUpForm = (password: string, confirmPassword: string, dob: Date | undefined): string | null => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  if (!dob) {
    return "Date of Birth is required";
  }

  return null;
};

export const validateLeaveForm = (formState: any): string | null => {
  const { startDate, endDate, startDayStartTime, startDayEndTime } = formState;
  if (!startDate || !endDate || !startDayStartTime || !startDayEndTime) {
    return "All date and time fields are required";
  }

  return null;
};

export const validatePostForm = (title: string, content: string): string | null => {
  if (!title || !content) {
    return "Title and content are required";
  }

  return null;
};