import { Meeting } from "~types";

export function convertToAM_PM(dateString: string | null) {
  if (!dateString) {
    return "Invalid Date";
  }
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export function timeRemaining(dateString: string | null) {
  if (!dateString) {
    return "Invalid Date";
  }
  const eventDate = new Date(dateString);
  const currentDate = new Date();

  const diffInMilliseconds = eventDate.getTime() - currentDate.getTime();

  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  if (diffInDays === 0) {
    return "Tomorrow";
  }
  if (diffInDays === -1) {
    return "Today";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  }).format(eventDate);
}

export function getDayNamesFromNumbers(dayNumbers: string[]) {
  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  return dayNumbers.map((dayNumber) => days[Number(dayNumber)]);
}

export function getNextWeekDates(daysArray: string[], timeString: string) {
  const time = new Date(timeString);

  const nextWeekDates = daysArray.map((day) => {
    const today = new Date();
    const nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7 + Number(day)
    );

    // Append the time from the second argument
    nextWeek.setHours(
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds()
    );

    return nextWeek;
  });

  return nextWeekDates;
}

export function getRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return "just now";
  } else if (seconds < 3600) {
    return Math.floor(seconds / 60) + " minutes ago";
  } else if (seconds < 86400) {
    return Math.floor(seconds / 3600) + " hours ago";
  } else if (seconds < 2592000) {
    return Math.floor(seconds / 86400) + " days ago";
  } else if (seconds < 31536000) {
    return Math.floor(seconds / 2592000) + " months ago";
  } else {
    return Math.floor(seconds / 31536000) + " years ago";
  }
}
export function getPassedMeetingLinks(meetings: Meeting[]): string[] {
  const now = new Date();
  const passedMeetings = meetings.filter(
    (meeting) => new Date(meeting.meeting_time) < now
  );

  const groupedLinks: { [key: string]: Meeting[] } = {};
  passedMeetings.forEach((meeting) => {
    if (!groupedLinks[meeting.link]) {
      groupedLinks[meeting.link] = [];
    }
    groupedLinks[meeting.link].push(meeting);
  });

  const validLinks: string[] = [];
  for (const link in groupedLinks) {
    const allMeetingsWithLink = meetings.filter(
      (meeting) => meeting.link === link
    );
    const allPassed = allMeetingsWithLink.every(
      (meeting) => new Date(meeting.meeting_time) < now
    );
    if (allPassed) {
      validLinks.push(link);
    }
  }

  return validLinks;
}
