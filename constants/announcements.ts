export type AnnouncementRecord = {
  slug: string;
  title: string;
  body: string[];
  date: string;
  image: string;
};

const rawAnnouncements: Record<string, AnnouncementRecord> = {
  "summer-2026-enrollment-opens": {
    slug: "summer-2026-enrollment-opens",
    title: "Summer Term Enrollment Opens",
    body: [
      "Enrollment for Summer 2026 starts on March 25. Please settle outstanding balances before proceeding.",
      "Students are advised to complete clearance requirements early to avoid delays during the enrollment period.",
      "For further assistance, visit the registrar's office or contact the academic services desk during office hours.",
    ],
    date: "March 16, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
  },
  "library-system-maintenance": {
    slug: "library-system-maintenance",
    title: "Library System Maintenance",
    body: [
      "Online library access will be unavailable on March 20 from 1:00 AM to 4:00 AM for scheduled upgrades.",
      "The maintenance window is intended to improve reliability, search performance, and digital resource access for students and faculty.",
      "Users are encouraged to download needed materials in advance before the temporary system downtime begins.",
    ],
    date: "March 16, 2026",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
  },
  "graduation-rehearsal-schedule": {
    slug: "graduation-rehearsal-schedule",
    title: "Graduation Rehearsal Schedule",
    body: [
      "Rehearsals for graduating students will be held on April 5 at the main auditorium. Attendance is mandatory.",
      "Participants should arrive early, wear the prescribed attire, and coordinate with their department representatives for final reminders.",
      "The rehearsal is meant to ensure proper flow, seating, and program timing ahead of the commencement exercises.",
    ],
    date: "March 15, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
  },
};

export const announcements = Object.fromEntries(
  Object.entries(rawAnnouncements).map(([slug, announcement]) => [
    slug,
    {
      ...announcement,
      summary: announcement.body[0],
    },
  ]),
) as Record<string, AnnouncementRecord & { summary: string }>;
