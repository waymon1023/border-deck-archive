type HeroPanelProps = {
  onEnter: () => void;
};

export default function HeroPanel({ onEnter }: HeroPanelProps) {
  return (
    <section className="hero-panel" aria-labelledby="site-title">
      <p className="eyebrow">The Border Deck Archive</p>
      <h1 id="site-title">边界牌局档案馆</h1>
      <p className="subtitle">52张牌，52场游戏。每一次翻面，都是一次生还审判。</p>
      <button className="primary-action" type="button" onClick={onEnter}>
        进入牌阵
      </button>
    </section>
  );
}
