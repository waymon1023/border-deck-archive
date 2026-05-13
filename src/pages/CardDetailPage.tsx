import { Link, Navigate, useParams } from "react-router-dom";
import DisclaimerFooter from "../components/DisclaimerFooter";
import { getCardById, type CardSection } from "../data/cards";

function isEncryptedSection(section: CardSection) {
  return section.title.includes("私人提示");
}

function isFinalSection(section: CardSection) {
  return section.title.includes("最终反噬") || section.title.includes("K 级残忍点");
}

export default function CardDetailPage() {
  const { id } = useParams();
  const card = getCardById(id);

  if (!card) {
    return <Navigate to="/" replace />;
  }

  if (!card.unlocked) {
    return (
      <main className="detail-page locked-detail">
        <Link className="back-link" to="/">
          返回牌阵
        </Link>
        <section className="locked-panel">
          <p className="eyebrow">{card.suitName} {card.rank}</p>
          <h1>档案未解锁</h1>
          <p>这张牌已经收录在牌阵中，但完整游戏档案将在后续阶段开放。</p>
        </section>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link className="back-link" to="/">
        返回牌阵
      </Link>

      <section className={`detail-hero detail-${card.suit}`}>
        <div className="detail-card-face" aria-hidden="true">
          <span className="detail-card-corner">
            <strong>{card.rank}</strong>
            <em>{card.suitSymbol}</em>
          </span>
          <span className="detail-card-suit">{card.suitSymbol}</span>
          <span className="detail-card-seal">终极档案</span>
        </div>
        <div className="detail-hero-copy">
          <p className="eyebrow">{card.suitSymbol}{card.rank} / 终极档案</p>
          <h1>{card.title}</h1>
          <p className="detail-summary">{card.summary}</p>
        </div>
      </section>

      <section className="detail-grid">
        <div className="visual-placeholder">
          <div className="scanline" />
          <p>危险游戏档案</p>
          <span>影像记录未接入</span>
        </div>

        <dl className="info-panel">
          <div>
            <dt>人数</dt>
            <dd>{card.players}</dd>
          </div>
          <div>
            <dt>场地</dt>
            <dd>{card.location}</dd>
          </div>
          <div>
            <dt>时长</dt>
            <dd>{card.duration}</dd>
          </div>
          <div>
            <dt>通关人数</dt>
            <dd>{card.clearLimit}</dd>
          </div>
          <div>
            <dt>通关条件</dt>
            <dd>{card.clearCondition}</dd>
          </div>
        </dl>
      </section>

      <section className="archive-sections">
        {card.sections?.map((section) =>
          isEncryptedSection(section) ? (
            <details className="archive-section encrypted-section" key={section.title}>
              <summary>
                <span>{section.title}（已加密）</span>
                <em>点击查看</em>
              </summary>
              {section.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </details>
          ) : (
            <article
              className={`archive-section ${isFinalSection(section) ? "final-section" : ""}`}
              key={section.title}
            >
              <h2>{section.title}</h2>
              {section.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ),
        )}
      </section>

      <details className="prompt-panel">
        <summary>隐藏附录</summary>
        <p>{card.imagePrompt}</p>
      </details>

      <DisclaimerFooter />
    </main>
  );
}
