import { Link, Navigate, useParams } from "react-router-dom";
import DisclaimerFooter from "../components/DisclaimerFooter";
import { getCardById, type ArchiveCard, type CardSection } from "../data/cards";

function isEncryptedSection(section: CardSection) {
  return section.title.includes("私人提示");
}

function isFinalSection(section: CardSection) {
  return section.title.includes("最终反噬") || section.title.includes("K 级残忍点");
}

const atmosphericLines: Record<string, string> = {
  "spade-k": "终点可见，身体不可达。",
  "heart-k": "他知道你在骗他。",
  "diamond-k": "答案正确，不代表你有资格活。",
  "club-k": "胜利不是完整的胜利。",
};

const sectionTitles: Record<string, string> = {
  场地: "场地",
  初始规则: "核心规则",
  核心规则: "核心规则",
  救援惩罚: "关键机制",
  私人提示: "隐藏规则",
  记忆揭露: "关键机制",
  答案污染: "关键机制",
  最终规则: "终局验证",
  最终反噬: "K级残忍点",
  分工效率: "核心规则",
  超频核心: "关键机制",
  "K 级残忍点": "K级残忍点",
};

function getAtmosphericLine(card: ArchiveCard) {
  return atmosphericLines[card.id] ?? card.summary ?? "";
}

function getSectionTitle(section: CardSection) {
  return sectionTitles[section.title] ?? section.title;
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
          <p className="eyebrow">
            {card.suitName} {card.rank}
          </p>
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
        <div className="detail-hero-copy">
          <p className="archive-badge">ARCHIVE: {card.suitSymbol}{card.rank}</p>
          <h1>{card.title}</h1>
          <p className="detail-summary">{getAtmosphericLine(card)}</p>
        </div>
        <div className="visual-record" aria-label={`${card.title} 影像记录未接入`}>
          <span className="record-corner top-left" />
          <span className="record-corner top-right" />
          <span className="record-corner bottom-left" />
          <span className="record-corner bottom-right" />
          <div className="record-grid" />
          <div className="record-status">
            <strong>VISUAL RECORD</strong>
            <span>NOT CONNECTED</span>
          </div>
        </div>
      </section>

      <section className="archive-metrics" aria-label="档案参数">
        <div>
          <span>PLAYERS</span>
          <strong>{card.players}</strong>
        </div>
        <div>
          <span>LOCATION</span>
          <strong>{card.location}</strong>
        </div>
        <div>
          <span>DURATION</span>
          <strong>{card.duration}</strong>
        </div>
        <div>
          <span>CLEAR LIMIT</span>
          <strong>{card.clearLimit}</strong>
        </div>
        <div>
          <span>CLEAR CONDITION</span>
          <strong>{card.clearCondition}</strong>
        </div>
      </section>

      <section className="archive-sections">
        {card.sections?.map((section, index) =>
          isEncryptedSection(section) ? (
            <details className="archive-section encrypted-section" key={section.title}>
              <summary>
                <span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {getSectionTitle(section)}
                </span>
                <em>ENCRYPTED / 点击解锁</em>
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
              <h2>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {getSectionTitle(section)}
              </h2>
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
