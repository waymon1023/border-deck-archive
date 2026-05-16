import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisclaimerFooter from "../components/DisclaimerFooter";
import FloatingCardField from "../components/FloatingCardField";
import HeroPanel from "../components/HeroPanel";
import { cards, type ArchiveCard } from "../data/cards";

const archiveLines: Record<string, string> = {
  "spade-k": "终点可见，身体不可达。",
  "heart-k": "他知道你在骗他。",
  "diamond-k": "答案正确，不代表你有资格活。",
  "club-k": "胜利不是完整的胜利。",
};

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState("");
  const [deckOpened, setDeckOpened] = useState(() => location.state?.deckOpened === true);
  const [activeCard, setActiveCard] = useState<ArchiveCard | null>(null);

  const handleSelect = (card: ArchiveCard) => {
    if (card.unlocked) {
      navigate(`/cards/${card.id}`);
      return;
    }

    setActiveCard(card);
    setNotice(`${card.suitSymbol}${card.rank} 档案未解封`);
    window.setTimeout(() => setNotice(""), 1800);
  };

  const handleEnter = () => {
    setDeckOpened(true);
    navigate(".", { replace: true, state: { deckOpened: true } });
  };

  return (
    <main className={deckOpened ? "home-page deck-open" : "home-page deck-sealed"}>
      <FloatingCardField
        awake={deckOpened}
        cards={cards}
        isOpen={deckOpened}
        onFocusCard={setActiveCard}
        onSelect={handleSelect}
      />
      <HeroPanel activeCard={activeCard} isDeckOpen={deckOpened} onEnter={handleEnter} />
      {deckOpened && <ArchiveCore activeCard={activeCard} />}
      <div className={`unlock-toast ${notice ? "show" : ""}`} role="status" aria-live="polite">
        {notice}
      </div>
      <DisclaimerFooter />
    </main>
  );
}

function ArchiveCore({ activeCard }: { activeCard: ArchiveCard | null }) {
  if (!activeCard) {
    return (
      <section className="archive-core" aria-live="polite">
        <span className="core-corner core-corner-tl" />
        <span className="core-corner core-corner-tr" />
        <span className="core-corner core-corner-bl" />
        <span className="core-corner core-corner-br" />
        <p className="core-kicker">ARCHIVE CORE</p>
        <div className="core-mark" aria-hidden="true">BDA</div>
        <strong>52 ARCHIVES DETECTED</strong>
        <strong>4 TERMINAL ARCHIVES UNSEALED</strong>
        <span>选择一张牌局档案</span>
      </section>
    );
  }

  return (
    <section className={`archive-core ${activeCard.unlocked ? "is-unsealed" : "is-locked"}`} aria-live="polite">
      <span className="core-corner core-corner-tl" />
      <span className="core-corner core-corner-tr" />
      <span className="core-corner core-corner-bl" />
      <span className="core-corner core-corner-br" />
      <p className="core-kicker">ARCHIVE {activeCard.suitSymbol}{activeCard.rank}</p>
      <div className="core-mark" aria-hidden="true">{activeCard.suitSymbol}</div>
      {activeCard.unlocked ? (
        <>
          <h2>{activeCard.title}</h2>
          <strong>UNSEALED</strong>
          <span>{archiveLines[activeCard.id]}</span>
          <em>点击进入档案</em>
        </>
      ) : (
        <>
          <h2>LOCKED</h2>
          <strong>档案未解封</strong>
          <span>该牌局档案已收录，尚未开放访问。</span>
        </>
      )}
    </section>
  );
}
