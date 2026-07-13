import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();
  const [dushanbeTime, setDushanbeTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Dushanbe",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setDushanbeTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback
        const now = new Date();
        setDushanbeTime(now.toTimeString().split(" ")[0]);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-border-light/40 dark:border-border-dark/40 py-10 mt-auto transition-colors duration-300 bg-bg-light dark:bg-bg-dark">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Availability Status Indicator */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-text-light/80 dark:text-text-dark/80">{t("footer.status")}</span>
        </div>

        {/* Real-time Dushanbe Clock */}
        <div className="flex flex-col items-center md:items-end font-mono text-xs text-text-light/60 dark:text-text-dark/60">
          <span>{t("footer.local_time")}</span>
          <span className="text-sm font-semibold text-accent mt-0.5" id="dushanbe-clock">
            {dushanbeTime || "00:00:00"} [GMT+5]
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right font-mono text-[10px] text-text-light/40 dark:text-text-dark/40">
          <p>© {new Date().getFullYear()} Muhammad. {t("footer.rights")}</p>
          <p className="mt-1 opacity-60">Sequential Epics · Verification Checkpoints</p>
        </div>
      </div>
    </footer>
  );
}
