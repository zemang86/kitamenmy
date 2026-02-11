// ---------------------------------------------------------------------------
// KL Tower "Gaming in the Sky" 2026 -- Timeline / Programme Data
// ---------------------------------------------------------------------------

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface TimelineDay {
  id: string;
  label: string;
  items: TimelineItem[];
}

export interface TimelineFormat {
  id: string;
  label: string;
  days: TimelineDay[];
}

// ---- 2 Days 1 Night --------------------------------------------------------

const FORMAT_2D1N: TimelineFormat = {
  id: "2d1n",
  label: "2 Days 1 Night",
  days: [
    {
      id: "2d1n-1",
      label: "Day 1 \u2014 Launch & Competition",
      items: [
        {
          time: "09:00 \u2013 10:00",
          title: "Grand Opening Ceremony",
          description:
            "VIP speeches, LED countdown, cultural performances, and official event launch.",
        },
        {
          time: "10:00 \u2013 12:00",
          title: "Hackathon Kickoff + Open Tournament Registration",
          description:
            "Hackathon problem statement reveal. Walk-in registration opens for community tournaments (MLBB, HOK, PUBG Mobile, EA FC 26, eFootball).",
        },
        {
          time: "10:00 \u2013 20:00",
          title: "Tech Expo & LAN Party Open",
          description:
            "Exhibition halls, VR/AR demos, 100+ gaming PCs live, casual tournaments all day.",
        },
        {
          time: "11:00 \u2013 15:00",
          title: "Open Tournaments \u2014 EA FC 26 & eFootball",
          description:
            "Community football gaming showdowns on the side stage. Swiss/bracket format, open entry. Livestreamed with casters.",
        },
        {
          time: "12:00 \u2013 16:00",
          title: "MLBB Invitational \u2014 Group Stage & Semis",
          description:
            "International invitational on main stage \u2014 MY, PH, ID teams compete. Full talent desk with casters and analysts.",
        },
        {
          time: "15:00 \u2013 19:00",
          title: "Open Tournaments \u2014 PUBG Mobile & MLBB Community",
          description:
            "Public PUBG Mobile and MLBB community brackets on side stage. Livestream with shoutcasters rotating per title.",
        },
        {
          time: "16:30 \u2013 20:00",
          title: "HOK Invitational \u2014 Group Stage & Semis",
          description:
            "Honor of Kings invitational matches on main stage with live commentary and analysis desk.",
        },
      ],
    },
    {
      id: "2d1n-night",
      label: "Night \u2014 Gaming After Dark",
      items: [
        {
          time: "20:00 \u2013 22:00",
          title: "Content Creator Night + HOK Community Open",
          description:
            "Meet & greet with gaming influencers, live streaming collabs, and fan activities. HOK community bracket runs on side stage.",
        },
        {
          time: "22:00 \u2013 02:00",
          title: "LAN Party After Dark",
          description:
            "Overnight LAN gaming, retro corner, casual showmatches, and DJ set under the tower lights.",
        },
        {
          time: "Overnight",
          title: "Hackathon Overnight Sprint",
          description:
            "Teams build through the night. Mentors on standby. Fuel station with snacks and coffee.",
        },
      ],
    },
    {
      id: "2d1n-2",
      label: "Day 2 \u2014 Finals & Closing",
      items: [
        {
          time: "09:00 \u2013 11:00",
          title: "Hackathon Demo Day",
          description:
            "Final presentations, judging panel, and hackathon prize ceremony.",
        },
        {
          time: "09:00 \u2013 12:00",
          title: "Open Tournament Finals \u2014 EA FC 26, eFootball & PUBG Mobile",
          description:
            "Community finals on side stage with livestream. Winner ceremonies between matches. Full caster coverage.",
        },
        {
          time: "10:00 \u2013 16:00",
          title: "Tech Expo \u2014 Day 2",
          description:
            "Continued exhibition, product launches, and last-chance demos.",
        },
        {
          time: "12:00 \u2013 14:30",
          title: "MLBB Invitational Grand Finals + Community Finals",
          description:
            "Invitational championship on main stage. Community MLBB finals on side stage right after. Full broadcast with talent.",
        },
        {
          time: "15:00 \u2013 17:00",
          title: "HOK Invitational Grand Finals + Community Finals",
          description:
            "HOK championship decider on main stage. Community HOK finals follow. International broadcast coverage.",
        },
        {
          time: "17:30 \u2013 18:30",
          title: "Awards Ceremony",
          description:
            "All prize distributions \u2014 invitational, community tournaments, hackathon, MVP awards, and special recognitions.",
        },
        {
          time: "19:00 \u2013 21:00",
          title: "Closing Ceremony & After-Party",
          description:
            "Highlight reel screening, closing speeches, and networking mixer.",
        },
      ],
    },
  ],
};

// ---- 3-Day Festival --------------------------------------------------------

const FORMAT_3DAY: TimelineFormat = {
  id: "3day",
  label: "3-Day Festival",
  days: [
    {
      id: "3d-1",
      label: "Day 1 \u2014 Opening",
      items: [
        {
          time: "09:00 \u2013 10:00",
          title: "Grand Opening Ceremony",
          description:
            "VIP speeches, LED countdown, cultural performances, and official event launch.",
        },
        {
          time: "10:00 \u2013 12:00",
          title: "Hackathon Kickoff + Open Tournament Registration",
          description:
            "Hackathon begins. Walk-in registration for community tournaments across all 5 titles.",
        },
        {
          time: "10:00 \u2013 18:00",
          title: "Tech Expo Opens",
          description:
            "Exhibition halls open with VR/AR demos, product showcases, and tech talks.",
        },
        {
          time: "12:00 \u2013 22:00",
          title: "LAN Party \u2014 Open Gaming",
          description:
            "100+ PCs live, casual play and free gaming sessions throughout the day.",
        },
        {
          time: "12:00 \u2013 16:00",
          title: "Open Tournaments \u2014 EA FC 26 & eFootball",
          description:
            "Community football gaming on side stage. Swiss/bracket format, open entry. Casters and livestream.",
        },
        {
          time: "14:00 \u2013 20:00",
          title: "MLBB Invitational Group Stage",
          description:
            "International invitational on main stage \u2014 MY, PH, ID teams compete. Full talent desk.",
        },
        {
          time: "16:00 \u2013 20:00",
          title: "Open Tournaments \u2014 PUBG Mobile Group Stage",
          description:
            "Community PUBG Mobile brackets on side stage with shoutcasters and livestream.",
        },
      ],
    },
    {
      id: "3d-2",
      label: "Day 2 \u2014 Competition",
      items: [
        {
          time: "09:00 \u2013 12:00",
          title: "HOK Invitational Group Stage",
          description:
            "Honor of Kings invitational group matches on main stage with live commentary and analysis desk.",
        },
        {
          time: "10:00 \u2013 14:00",
          title: "Open Tournaments \u2014 MLBB & HOK Community Brackets",
          description:
            "Community MLBB and HOK brackets on side stage. Livestreamed with rotating caster pairs per title.",
        },
        {
          time: "10:00 \u2013 18:00",
          title: "Tech Expo \u2014 Day 2",
          description:
            "Continued exhibition, keynote sessions, and product launch events.",
        },
        {
          time: "All Day",
          title: "Hackathon Continues",
          description:
            "Teams build prototypes. Mentor check-ins and mid-point presentations.",
        },
        {
          time: "14:00 \u2013 18:00",
          title: "MLBB Invitational Semifinals + PUBG Mobile Semis",
          description:
            "Invitational semis on main stage. PUBG Mobile community semis on side stage. Full broadcast.",
        },
        {
          time: "19:00 \u2013 21:00",
          title: "Content Creator Sessions",
          description:
            "Meet & greet with gaming influencers, live streaming collabs, and fan activities.",
        },
      ],
    },
    {
      id: "3d-3",
      label: "Day 3 \u2014 Finals",
      items: [
        {
          time: "09:00 \u2013 11:00",
          title: "Hackathon Demo Day",
          description:
            "Final presentations, judging panel, and hackathon prize ceremony.",
        },
        {
          time: "09:00 \u2013 12:00",
          title: "Open Tournament Finals \u2014 EA FC 26, eFootball & PUBG Mobile",
          description:
            "Community finals on side stage with livestream and casters. Winner ceremonies between matches.",
        },
        {
          time: "12:00 \u2013 15:00",
          title: "MLBB Grand Finals + Community MLBB Finals",
          description:
            "Invitational championship on main stage. Community MLBB grand finals on side stage. Full broadcast with talent.",
        },
        {
          time: "15:30 \u2013 18:00",
          title: "HOK Grand Finals + Community HOK Finals",
          description:
            "HOK invitational championship on main stage. Community HOK finals follow. International broadcast.",
        },
        {
          time: "18:30 \u2013 19:30",
          title: "Awards Ceremony",
          description:
            "All prize distributions \u2014 invitational, community tournaments (5 titles), hackathon, MVP awards.",
        },
        {
          time: "20:00 \u2013 22:00",
          title: "Closing Ceremony & After-Party",
          description:
            "Highlight reel screening, closing speeches, DJ set, and networking mixer.",
        },
      ],
    },
  ],
};

// ---- Export ----------------------------------------------------------------

export const TIMELINE_FORMATS: TimelineFormat[] = [FORMAT_2D1N, FORMAT_3DAY];
