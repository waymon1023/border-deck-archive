import type { ArchiveCard } from "../data/cards";
import PlayingCard from "./PlayingCard";

type FloatingCardFieldProps = {
  cards: ArchiveCard[];
  awake: boolean;
  onSelect: (card: ArchiveCard) => void;
};

export default function FloatingCardField({ awake, cards, onSelect }: FloatingCardFieldProps) {
  return (
    <div className={`card-field ${awake ? "is-awake" : ""}`} aria-label="完整 52 张扑克牌档案阵列">
      <div className="field-haze" />
      {cards.map((card, index) => (
        <PlayingCard card={card} index={index} key={card.id} onSelect={onSelect} />
      ))}
    </div>
  );
}
