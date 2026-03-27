export type PostRecord = {
  slug: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  body: string[];
};

export const posts: Record<string, PostRecord> = {
  "daad-hosts-info-session-at-gwc-for-international-academic-exchange": {
    slug: "daad-hosts-info-session-at-gwc-for-international-academic-exchange",
    title: "DAAD Hosts Info Session at GWC for International Academic Exchange",
    category: "GWC IN THE GLOBAL ARENA",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Providing students, faculty, and staff with insights and opportunities from partners across the globe.",
    body: [
      "Golden West Colleges welcomed delegates and speakers for an information session focused on international academic exchange pathways. The program introduced students and faculty members to overseas scholarship opportunities, institutional linkages, and application requirements.",
      "The session highlighted how academic exchange can strengthen research collaboration, cultural understanding, and student readiness for global learning environments. Participants were also briefed on documentation, eligibility, and possible partner institutions.",
      "Campus leaders emphasized that international exposure remains part of the college's long-term academic direction, especially for programs that benefit from collaborative study, faculty mobility, and cross-border knowledge sharing.",
    ],
  },
  "student-delegates-join-asean-youth-forum": {
    slug: "student-delegates-join-asean-youth-forum",
    title: "Student Delegates Join ASEAN Youth Forum",
    category: "GWC IN THE GLOBAL ARENA",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Student representatives joined a regional forum centered on leadership, collaboration, and youth participation.",
    body: [
      "Student delegates represented the college in a regional youth forum that gathered participants from across Southeast Asia. The event focused on leadership, civic participation, and cross-cultural dialogue.",
      "Delegates joined workshops and discussion sessions that explored student-led initiatives, community impact, and regional partnerships among higher education institutions.",
      "The experience gave the delegation a platform to share campus perspectives while building connections with student leaders from other institutions.",
    ],
  },
  "new-research-hub-opens-for-engineering-cohort": {
    slug: "new-research-hub-opens-for-engineering-cohort",
    title: "New Research Hub Opens for Engineering Cohort",
    category: "GWC IN THE GLOBAL ARENA",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    summary:
      "A new research space was introduced to support collaboration, project work, and technical study.",
    body: [
      "A new research hub has opened to give students a stronger environment for collaborative projects, technical consultation, and guided study sessions.",
      "The space is intended to support capstone work, prototype development, and interdisciplinary research activity among student groups and faculty mentors.",
      "Administrators noted that the initiative is part of a broader plan to improve academic support spaces and expand access to research-centered learning.",
    ],
  },
  "student-council-launches-campus-wide-service-drive": {
    slug: "student-council-launches-campus-wide-service-drive",
    title: "Student Council Launches Campus-Wide Service Drive",
    category: "GWC IN THE COMMUNITY",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Student life, organizations, and collaboration spaces that keep the GWC family connected.",
    body: [
      "The student council launched a campus-wide service drive that encourages participation from student organizations, faculty advisers, and volunteers across different departments.",
      "The initiative focuses on coordinated outreach, donation collection, and service-oriented activities designed to strengthen community engagement within and beyond the campus.",
      "Organizers described the drive as part of an ongoing effort to build a more active culture of student leadership and shared responsibility.",
    ],
  },
  "plastic-free-advocacy": {
    slug: "plastic-free-advocacy",
    title: "PLASTIC FREE ADVOCACY",
    category: "PERSPECTIVES + OPINIONS",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    summary:
      "A perspective on zero-waste plastic management and campus environmental responsibility.",
    body: [
      "As the Field of Study Head for Professional Education, my advocacy in life is all about zero-waste plastic management in general. As the former pioneering adviser of the Science Educators Guild under the Institute of Teacher Education, we started shaping a long-term plastic-free advocacy within the college community.",
      "The initiative calls for practical campus habits, stronger awareness, and a collective commitment to reducing waste in learning spaces, events, and student-led activities.",
      "Advocacy becomes more meaningful when it is lived daily. The long-term goal is to help make responsible waste management a visible part of campus culture and institutional practice.",
    ],
  },
};

export const landingSections = [
  {
    key: "global-arena",
    title: "GWC IN THE GLOBAL ARENA",
    subtitle: posts["daad-hosts-info-session-at-gwc-for-international-academic-exchange"].summary,
    headline: posts["daad-hosts-info-session-at-gwc-for-international-academic-exchange"].title,
    variant: "landing-white",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    postSlug:
      "daad-hosts-info-session-at-gwc-for-international-academic-exchange",
    relatedSlugs: [
      "student-delegates-join-asean-youth-forum",
      "new-research-hub-opens-for-engineering-cohort",
    ],
  },
  {
    key: "community",
    title: "GWC IN THE COMMUNITY",
    subtitle: posts["student-council-launches-campus-wide-service-drive"].summary,
    headline: posts["student-council-launches-campus-wide-service-drive"].title,
    variant: "landing-gray",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    postSlug: "student-council-launches-campus-wide-service-drive",
    relatedSlugs: [
      "student-delegates-join-asean-youth-forum",
      "new-research-hub-opens-for-engineering-cohort",
    ],
  },
  {
    key: "events",
    title: "EVENTS",
    subtitle: "Schedules, registration, and on-campus happenings.",
    variant: "landing-white",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "perspective",
    title: "Perspective",
    subtitle: "Voices, opinions, and stories from the GWC family.",
    variant: "landing-blue",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    postSlug: "plastic-free-advocacy",
  },
  {
    key: "careers",
    title: "Careers",
    subtitle: "Opportunities, internships, and pathways after GWC.",
    variant: "landing-white",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
] as const;
