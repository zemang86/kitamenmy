import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Roblox Gaming Tournament",
  description:
    "Academic Achievement Reward — Roblox gaming tournament for students.",
};

const games = [
  {
    title: "TOWER OF HELL",
    format: "Individual speed runs",
    duration: "5-10 minutes per round",
    description:
      "Race-against-the-clock obstacle course with built-in leaderboards and timers.",
  },
  {
    title: "BEDWARS",
    format: "4v4 team battles",
    duration: "10-15 minutes per match",
    description:
      "Defend your bed while attacking opponents. Perfect for teamwork and strategy.",
  },
  {
    title: "HIDE & SEEK EXTREME",
    format: "Round-robin team rotations",
    duration: "5-10 minutes per round",
    description:
      "Classic hide-and-seek with environment transformation. Great for all skill levels.",
  },
  {
    title: "MURDER MYSTERY 2",
    format: "Points-based over multiple rounds",
    duration: "3-5 minutes per round",
    description:
      "Social deduction game with Innocent, Sheriff, and Murderer roles.",
  },
  {
    title: "DRESS TO IMPRESS",
    format: "Theme-based rounds with voting",
    duration: "5 minutes prep + 2 minutes judging",
    description: "Creative fashion competition with player voting system.",
  },
];

const eventInfo = [
  "Format: Online via Roblox",
  "Participants: 25-30 students",
  "Duration: 4 hours with breaks",
  "Cost: Free (reward event)",
  "Requirements: Roblox account + internet",
  "Supervision: Private servers with adults",
];

const faqs = [
  {
    q: "Is this free?",
    a: "Yes, this is your reward for academic improvement.",
  },
  {
    q: "What if child doesn't have Roblox?",
    a: "Free account creation at roblox.com",
  },
  {
    q: "Equipment needed?",
    a: "Computer/tablet + stable internet connection.",
  },
  {
    q: "Is it safe?",
    a: "Private servers with adult supervision throughout.",
  },
];

function GameCard({
  title,
  format,
  duration,
  description,
}: (typeof games)[number]) {
  return (
    <details className="border-2 border-black bg-white mb-2.5 group">
      <summary className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-[#f0f0f0] cursor-pointer font-mono list-none [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-bold uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown
          size={16}
          className="transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="p-4 border-t border-[#ddd] bg-white text-xs leading-snug">
        <p className="my-2">
          <strong>Format:</strong> {format}
        </p>
        <p className="my-2">
          <strong>Duration:</strong> {duration}
        </p>
        <p className="my-2">
          <strong>Description:</strong> {description}
        </p>
      </div>
    </details>
  );
}

export default function RobloxPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#333] p-5 font-mono leading-relaxed">
      <div className="max-w-[700px] mx-auto bg-white border-2 border-black shadow-[8px_8px_0px_#000]">
        {/* Header */}
        <div className="bg-black text-white p-8 text-center border-b-2 border-black">
          <h1 className="text-3xl font-bold mb-1 tracking-widest max-sm:text-2xl">
            ROBLOX TOURNAMENT
          </h1>
          <p className="text-sm uppercase tracking-wider">
            Academic Achievement Reward
          </p>
        </div>

        {/* Content */}
        <div className="p-8 max-sm:p-5">
          {/* Highlight Box */}
          <div className="bg-[#f0f0f0] border-2 border-black p-5 my-5 text-center">
            <h2 className="text-lg font-bold">
              CONGRATULATIONS ON IMPROVED RESULTS
            </h2>
            <p>
              Your promised reward tournament for the hard work during June
              tuition program.
            </p>
          </div>

          {/* Schedule */}
          <section className="my-6 border-b border-[#ddd] pb-5">
            <h3 className="text-base font-bold mb-4 uppercase tracking-wider">
              Tournament Schedule
            </h3>
            <div className="bg-[#f0f0f0] border-2 border-black p-5 text-center my-5">
              <h4 className="text-xl mb-2.5 font-bold">SEPTEMBER 18, 2025</h4>
              <p className="text-base">
                THURSDAY
                <br />
                09:00 - 13:00
              </p>
            </div>
          </section>

          {/* Games Lineup */}
          <section className="my-6 border-b border-[#ddd] pb-5">
            <h3 className="text-base font-bold mb-4 uppercase tracking-wider">
              Games Lineup
            </h3>
            {games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </section>

          {/* Event Info */}
          <section className="my-6 border-b border-[#ddd] pb-5">
            <h3 className="text-base font-bold mb-4 uppercase tracking-wider">
              Event Information
            </h3>
            <ul className="list-none p-0">
              {eventInfo.map((info) => (
                <li
                  key={info}
                  className="my-2 text-sm before:content-['→_'] before:font-bold"
                >
                  {info}
                </li>
              ))}
            </ul>
          </section>

          {/* Registration */}
          <div className="bg-[#f8f8f8] border border-black p-5 my-5">
            <h3 className="text-base font-bold mb-4 uppercase tracking-wider">
              Registration Process
            </h3>
            <ol className="ml-5 list-decimal">
              <li className="my-2 text-sm">
                Visit <strong>edventure.plus</strong> → Create parent account
              </li>
              <li className="my-2 text-sm">
                Add child&apos;s profile to platform and screenshot child
                profile created
              </li>
              <li className="my-2 text-sm">
                <a
                  href="https://tinyurl.com/AcademicAchievementReward"
                  className="inline-block bg-white text-black border-2 border-black px-8 py-3 font-mono font-semibold uppercase tracking-wider no-underline hover:bg-black hover:text-white transition-colors"
                >
                  Fill Up Tournament Register Form
                </a>
              </li>
              <li className="my-2 text-sm">
                Provide child&apos;s Roblox username in form (if no account yet,
                coordinate before tournament)
              </li>
              <li className="my-2 text-sm">
                Receive tournament Discord/communication details
              </li>
            </ol>
          </div>

          {/* Video */}
          <section className="my-6 border-b border-[#ddd] pb-5">
            <h3 className="text-base font-bold mb-4 uppercase tracking-wider">
              How to register at Edventure+
            </h3>
            <div className="text-center my-5">
              <video
                controls
                className="w-full max-w-[500px] border-2 border-black bg-black"
              >
                <source src="/roblox/edvideo.mp4" type="video/mp4" />
                <p className="p-5 bg-[#f0f0f0] border border-black">
                  Your browser does not support video playback.
                </p>
              </video>
            </div>
          </section>

          {/* CTA Buttons */}
          <div className="text-center my-8 flex flex-wrap justify-center gap-2.5 max-sm:flex-col">
            <a
              href="https://edventure.plus"
              className="inline-block bg-black text-white px-8 py-3 border-2 border-black font-mono font-semibold uppercase tracking-wider no-underline hover:bg-white hover:text-black transition-colors"
            >
              Visit Edventure.Plus
            </a>
            <a
              href="https://tinyurl.com/AcademicAchievementReward"
              className="inline-block bg-white text-black px-8 py-3 border-2 border-black font-mono font-semibold uppercase tracking-wider no-underline hover:bg-black hover:text-white transition-colors"
            >
              Register Form
            </a>
          </div>

          {/* FAQ */}
          <section className="my-6">
            <h3 className="text-base font-bold mb-4 uppercase tracking-wider">
              Quick FAQ
            </h3>
            {faqs.map((faq) => (
              <div key={faq.q}>
                <strong className="block mt-4">{faq.q}</strong>
                <p className="my-2.5 text-sm">{faq.a}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Footer */}
        <div className="bg-[#f0f0f0] border-t-2 border-black p-6 text-center">
          <p>
            <strong>EDVENTURE.PLUS PARTNERSHIP</strong>
          </p>
          <p>
            Tournament introduces our educational platform for Math & Science
            excellence.
          </p>
          <br />
          <p>Questions? Contact tournament organizer for details.</p>
        </div>
      </div>
    </div>
  );
}
