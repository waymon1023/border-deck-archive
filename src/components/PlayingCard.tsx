import { useState, type CSSProperties } from "react";
import type { ArchiveCard } from "../data/cards";

type PlayingCardProps = {
  card: ArchiveCard;
  index: number;
  isDeckOpen: boolean;
  onFocusCard: (card: ArchiveCard | null) => void;
  onSelect: (card: ArchiveCard) => void;
};

const suitTone = {
  spade: "cool",
  heart: "red",
  diamond: "blue",
  club: "green",
} as const;

const rankOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const orbitPositions = [
  { x: 50, y: 8, rotate: -4 },
  { x: 62, y: 10, rotate: 8 },
  { x: 74, y: 16, rotate: 18 },
  { x: 84, y: 28, rotate: 24 },
  { x: 90, y: 42, rotate: 14 },
  { x: 90, y: 58, rotate: -12 },
  { x: 84, y: 72, rotate: -24 },
  { x: 74, y: 84, rotate: -18 },
  { x: 62, y: 90, rotate: -8 },
  { x: 50, y: 92, rotate: 5 },
  { x: 38, y: 90, rotate: 12 },
  { x: 26, y: 84, rotate: 20 },
  { x: 16, y: 72, rotate: 25 },
  { x: 10, y: 58, rotate: 14 },
  { x: 10, y: 42, rotate: -10 },
  { x: 16, y: 28, rotate: -22 },
  { x: 26, y: 16, rotate: -18 },
  { x: 38, y: 10, rotate: -9 },
];

export default function PlayingCard({
  card,
  index,
  isDeckOpen,
  onFocusCard,
  onSelect,
}: PlayingCardProps) {
  const [isFront, setIsFront] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const depth = index % 3;
  const orbit = orbitPositions[index % orbitPositions.length];
  const ring = Math.floor(index / orbitPositions.length);
  const ringPush = ring * 3.2;
  const jitter = card.unlocked ? 0 : ((index * 17) % 13) - 6;
  const rankIndex = rankOrder.indexOf(card.rank);
  const arc = Math.sin((rankIndex / 12) * Math.PI);
  const x = orbit.x + Math.sign(orbit.x - 50) * ringPush + jitter * 0.22;
  const y = orbit.y + Math.sign(orbit.y - 50) * ringPush + jitter * 0.16;
  const rotate = orbit.rotate + ((index * 7) % 10) - 5;
  const openPosition = (() => {
    if (card.suit === "spade") {
      return { x: 20 + rankIndex * 5, y: 31 - arc * 3.5, rotate: -12 + rankIndex * 2 };
    }
    if (card.suit === "heart") {
      return { x: 73 + arc * 3.5, y: 28 + rankIndex * 3.7, rotate: 8 + rankIndex };
    }
    if (card.suit === "diamond") {
      return { x: 80 - rankIndex * 5, y: 69 + arc * 3.5, rotate: 12 - rankIndex * 2 };
    }
    return { x: 27 - arc * 3.5, y: 72 - rankIndex * 3.7, rotate: -8 - rankIndex };
  })();
  const delay = `${(index % 17) * -0.7}s`;
  const duration = `${24 + (index % 11) * 1.8 + depth * 5}s`;

  const handleActivate = () => {
    setIsHovering(true);
    setIsFront(true);
    onFocusCard(isDeckOpen ? card : null);
  };

  const handleDeactivate = () => {
    setIsHovering(false);
    setIsFront(false);
    onFocusCard(null);
  };

  return (
    <button
      className={[
        "playing-card",
        `depth-${depth}`,
        `tone-${suitTone[card.suit]}`,
        card.unlocked ? "is-unlocked" : "is-locked",
        isDeckOpen ? "is-in-deck" : "is-ghost",
        isFront ? "is-front" : "",
        isHovering ? "is-hovering" : "",
      ].join(" ")}
      style={
        {
          "--x": `${x}%`,
          "--y": `${y}%`,
          "--rotate": `${rotate}deg`,
          "--open-x": `${openPosition.x}%`,
          "--open-y": `${openPosition.y}%`,
          "--open-rotate": `${openPosition.rotate}deg`,
          "--delay": delay,
          "--duration": duration,
        } as CSSProperties
      }
      type="button"
      aria-label={`${card.suitSymbol}${card.rank} ${card.unlocked ? card.title : "档案未解锁"}`}
      onClick={() => onSelect(card)}
      onBlur={handleDeactivate}
      onFocus={handleActivate}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
    >
      <span className="card-inner">
        <span className="card-face card-back" aria-hidden="true">
          <span className="back-grid" />
          <span className="back-orbit" />
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
          {card.unlocked && <span className="archive-card-title">{card.title}</span>}
        </span>
      </span>
      <span className="archive-index-label">
        <strong>
          {card.suitSymbol}
          {card.rank}
        </strong>
        <em>{card.unlocked ? card.title : isHovering ? "档案未解封" : "LOCKED"}</em>
        {card.unlocked && <small>UNSEALED</small>}
      </span>
    </button>
  );
}
