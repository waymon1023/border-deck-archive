import type { CSSProperties } from "react";
import type { ArchiveCard } from "../data/cards";

type PlayingCardProps = {
  card: ArchiveCard;
  index: number;
  onSelect: (card: ArchiveCard) => void;
};

const suitTone = {
  spade: "cool",
  heart: "red",
  diamond: "blue",
  club: "green",
} as const;

const featuredPositions: Record<string, { x: number; y: number; rotate: number }> = {
  "spade-k": { x: 23, y: 30, rotate: -12 },
  "heart-k": { x: 74, y: 27, rotate: 14 },
  "diamond-k": { x: 28, y: 70, rotate: 11 },
  "club-k": { x: 77, y: 68, rotate: -15 },
};

export default function PlayingCard({ card, index, onSelect }: PlayingCardProps) {
  const depth = index % 3;
  const row = Math.floor(index / 13);
  const col = index % 13;
  const focusOffset = card.unlocked ? 0 : ((index * 17) % 34) - 17;
  const featured = featuredPositions[card.id];
  const x = featured?.x ?? 6 + col * 7.15 + (row % 2) * 2 + focusOffset * 0.08;
  const y = featured?.y ?? 12 + row * 18 + ((index * 11) % 9);
  const rotate = featured?.rotate ?? ((index * 29) % 54) - 27;
  const delay = `${(index % 17) * -0.7}s`;
  const duration = `${17 + (index % 11) * 1.8 + depth * 4}s`;

  return (
    <button
      className={[
        "playing-card",
        `depth-${depth}`,
        `tone-${suitTone[card.suit]}`,
        card.unlocked ? "is-unlocked" : "is-locked",
      ].join(" ")}
      style={
        {
          "--x": `${x}%`,
          "--y": `${y}%`,
          "--rotate": `${rotate}deg`,
          "--delay": delay,
          "--duration": duration,
        } as CSSProperties
      }
      type="button"
      aria-label={`${card.suitSymbol}${card.rank} ${card.unlocked ? card.title : "档案未解锁"}`}
      onClick={() => onSelect(card)}
    >
      <span className="card-inner">
        <span className="card-face card-back" aria-hidden="true">
          <span className="back-grid" />
          <span className="back-sigil">BD</span>
          <span className="back-mark">{card.suitSymbol}</span>
          <span className="back-wear" />
        </span>
        <span className="card-face card-front">
          <span className="corner top">
            <span>{card.rank}</span>
            <span>{card.suitSymbol}</span>
          </span>
          <span className="center-suit">{card.suitSymbol}</span>
          <span className="corner bottom">
            <span>{card.rank}</span>
            <span>{card.suitSymbol}</span>
          </span>
          {card.unlocked && <span className="card-title">{card.title}</span>}
        </span>
      </span>
    </button>
  );
}
