import { useState } from "react";

/** Simple answers; bug 5 pairs each click with the *next* row’s answer (misplaced). */
const CHAT_TOPICS = [
  {
    id: "save",
    q: "How do I save a vehicle?",
    a: "Tap the heart on a card.",
  },
  {
    id: "price",
    q: "How is pricing calculated?",
    a: "Per hour, plus tax at checkout.",
  },
  {
    id: "charge",
    q: "Where can I charge?",
    a: "Open Charging in the menu.",
  },
  {
    id: "cancel",
    q: "Can I cancel a booking?",
    a: "Yes, from your trips list.",
  },
  {
    id: "pay",
    q: "What payment methods work?",
    a: "Card and UPI in this demo.",
  },
  {
    id: "insurance",
    q: "Is insurance included?",
    a: "Basic cover is included.",
  },
  {
    id: "support",
    q: "How do I contact support?",
    a: "Use this help chat.",
  },
  {
    id: "area",
    q: "What areas do you serve?",
    a: "Bengaluru metro area.",
  },
];

export function HelpChat() {
  const [loadingId, setLoadingId] = useState(null);
  const [banner, setBanner] = useState(null);

  function onPick(topic) {
    setLoadingId(topic.id);
    setBanner(null);

    const idx = CHAT_TOPICS.findIndex((t) => t.id === topic.id);
    const wrongIdx = (idx + 1) % CHAT_TOPICS.length;
    const misplacedAnswer = CHAT_TOPICS[wrongIdx].a;

    // bug 5: loading + instant “submitted” together; answer is wrong (next question’s reply)
    setBanner(`Submitted! You got an answer: ${misplacedAnswer}`);
    window.setTimeout(() => {
      setLoadingId(null);
    }, 2200);
  }

  return (
    <div className="help-chat">
      <h2 className="help-chat-title">Chat with support</h2>
      <p className="help-chat-hint">Tap a question to send it to our team.</p>
      <ul className="help-chat-topics">
        {CHAT_TOPICS.map((topic) => (
          <li key={topic.id}>
            <button
              type="button"
              className="help-chat-topic-btn"
              disabled={loadingId === topic.id}
              onClick={() => onPick(topic)}
            >
              {topic.q}
            </button>
          </li>
        ))}
      </ul>
      {loadingId ? (
        <div className="help-chat-loading" aria-live="polite">
          <span className="help-chat-spinner" aria-hidden />
          Sending your question…
        </div>
      ) : null}
      {banner ? (
        <div className="help-chat-banner" role="status">
          {banner}
        </div>
      ) : null}
    </div>
  );
}
