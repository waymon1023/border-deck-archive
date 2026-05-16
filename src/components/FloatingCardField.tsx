import type { ArchiveCard } from "../data/cards";
import PlayingCard from "./PlayingCard";

type FloatingCardFieldProps = {
  cards: ArchiveCard[];
  awake: boolean;
  isOpen: boolean;
  onFocusCard: (card: ArchiveCard | null) => void;
  onSelect: (card: ArchiveCard) => void;
};

export default function FloatingCardField({
  awake,
  cards,
  isOpen,
  onFocusCard,
  onSelect,
}: FloatingCardFieldProps) {
  return (
    <div
      className={`card-field ${awake ? "is-awake" : ""} ${isOpen ? "is-open" : "is-sealed"}`}
      aria-label="完整 52 张扑克牌档案阵列"
    >
      <div className="field-haze" />
      <div className="field-vignette" aria-hidden="true" />
      <div className="orbit orbit-outer" aria-hidden="true" />
      <div className="orbit orbit-mid" aria-hidden="true" />
      <div className="orbit orbit-inner" aria-hidden="true" />
      {cards.map((card, index) => (
        <PlayingCard
          card={card}
          index={index}
          isDeckOpen={isOpen}
          key={card.id}
          onFocusCard={onFocusCard}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
