import type { ArchiveCard } from "../data/cards";

type HeroPanelProps = {
  activeCard: ArchiveCard | null;
  isDeckOpen: boolean;
  onEnter: () => void;
};

export default function HeroPanel({ activeCard, isDeckOpen, onEnter }: HeroPanelProps) {
  const status = isDeckOpen ? "SELECT A CARD ARCHIVE" : "SEALED ARCHIVE GATE";

  return (
    <section className={`hero-panel ${isDeckOpen ? "is-open" : "is-sealed"}`} aria-labelledby="site-title">
      <div className="access-frame" aria-hidden="true" />
      <p className="system-kicker">THE BORDER DECK ARCHIVE</p>
      <div className="sealed-card" aria-hidden="true">
        <span className="seal-line seal-line-a" />
        <span className="seal-line seal-line-b" />
        <span className="archive-emblem">
          <span className="emblem-ring" />
          <span className="emblem-calibration" />
          <span className="emblem-core">BDA</span>
          <span className="emblem-caption">边界</span>
        </span>
      </div>
      <h1 id="site-title">边界牌局档案馆</h1>
      <p className="subtitle">52张牌，52场游戏。每一次翻面，都是一次生还审判。</p>
      <p className={`system-status ${activeCard || isDeckOpen ? "is-alert" : ""}`} aria-live="polite">
        {status}
        {isDeckOpen && !activeCard && (
          <span>52 ARCHIVES DETECTED / 4 UNSEALED</span>
        )}
      </p>
      {!isDeckOpen && (
        <button className="primary-action" type="button" onClick={onEnter}>
          ENTER THE DECK
        </button>
      )}
    </section>
  );
}
