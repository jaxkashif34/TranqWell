import { Meeting, Reminders } from "~types";

export const arrangeMeetings = (meetings: Meeting[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

  const arrangedMeetings: { [key: string]: Meeting[] } = {};

  meetings.forEach((meeting) => {
    const meetingDate = new Date(meeting.meeting_time);
    meetingDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

    if (meetingDate.getTime() === today.getTime()) {
      if (!arrangedMeetings.Today) {
        arrangedMeetings.Today = [];
      }
      arrangedMeetings.Today.push(meeting);
    } else if (meetingDate.getTime() === tomorrow.getTime()) {
      if (!arrangedMeetings.Tomorrow) {
        arrangedMeetings.Tomorrow = [];
      }
      arrangedMeetings.Tomorrow.push(meeting);
    } else if (meetingDate.getTime() > tomorrow.getTime()) {
      const dateKey = meetingDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!arrangedMeetings[dateKey]) {
        arrangedMeetings[dateKey] = [];
      }
      arrangedMeetings[dateKey].push(meeting);
    }
  });
  return arrangedMeetings;
};

export const arrangeReminders = (reminders: Reminders[]) => {
  const today = new Date();
  // today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

  const arrangedReminders: { [key: string]: Reminders[] } = {};

  reminders.forEach((meeting) => {
    if (
      typeof meeting?.customers === "object" &&
      !Array.isArray(meeting?.customers)
    ) {
      return;
    }
    // Parse the date_time from the backend
    const meetingDate = new Date(meeting.date_time);
    meetingDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

    if (meetingDate.getTime() === today.getTime()) {
      if (!arrangedReminders.Today) {
        arrangedReminders.Today = [];
      }
      arrangedReminders.Today.push(meeting);
    } else if (meetingDate.getTime() === tomorrow.getTime()) {
      if (!arrangedReminders.Tomorrow) {
        arrangedReminders.Tomorrow = [];
      }
      arrangedReminders.Tomorrow.push(meeting);
    } else if (meetingDate.getTime() > tomorrow.getTime()) {
      const dateKey = meetingDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!arrangedReminders[dateKey]) {
        arrangedReminders[dateKey] = [];
      }
      arrangedReminders[dateKey].push(meeting);
    }
  });

  return arrangedReminders;
};
