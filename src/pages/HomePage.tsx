import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisclaimerFooter from "../components/DisclaimerFooter";
import FloatingCardField from "../components/FloatingCardField";
import HeroPanel from "../components/HeroPanel";
import { cards, type ArchiveCard } from "../data/cards";

export default function HomePage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const [awake, setAwake] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  const handleSelect = (card: ArchiveCard) => {
    if (card.unlocked) {
      navigate(`/cards/${card.id}`);
      return;
    }

    setNotice(`${card.suitSymbol}${card.rank} 档案未解锁`);
    window.setTimeout(() => setNotice(""), 1800);
  };

  const handleEnter = () => {
    setAwake(true);
    window.setTimeout(() => setAwake(false), 1400);
    fieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="home-page">
      <div ref={fieldRef}>
        <FloatingCardField awake={awake} cards={cards} onSelect={handleSelect} />
      </div>
      <HeroPanel onEnter={handleEnter} />
      <div className={`unlock-toast ${notice ? "show" : ""}`} role="status" aria-live="polite">
        {notice}
      </div>
      <DisclaimerFooter />
    </main>
  );
}
