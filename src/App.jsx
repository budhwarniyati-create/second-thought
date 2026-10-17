
import { useState } from 'react'
import { decisions as initialDecisions, DECISION_STATUS } from './data/decisions'
import './App.css'

function App() {
  const [decisionList, setDecisionList] = useState(() =>
    initialDecisions.map((item) => ({
      ...item,
      facts: [...item.facts],
      assumptions: [...item.assumptions],
      options: [...item.options],
    }))
  )
  const [selectedId, setSelectedId] = useState(
    initialDecisions[0]?.id ?? null
  )
  const [showForm, setShowForm] = useState(false)
  const [decisionInput, setDecisionInput] = useState('')
  const [showWorkspace, setShowWorkspace] = useState(false)
  const [newFact, setNewFact] = useState('')

  const selectedDecision = decisionList.find(
    (item) => item.id === selectedId
  )

  const handleCreateDecision = () => {
    const question = decisionInput.trim()
    if (!question) return

    const newDecision = {
      id: `decision-${Date.now()}`,
      question,
      status: DECISION_STATUS.CAPTURED,
      createdAt: new Date().toISOString(),
      facts: [],
      assumptions: [],
      options: [],
      prediction: null,
      outcome: null,
      review: null,
    }

    setDecisionList((current) => [newDecision, ...current])
    setSelectedId(newDecision.id)
    setDecisionInput('')
    setShowForm(false)
    setShowWorkspace(true)
  }

  const handleContinue = (id) => {
    setSelectedId(id)
    setDecisionList((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: DECISION_STATUS.ANALYZING }
          : item
      )
    )
    setShowWorkspace(true)
  }

  const handleAddFact = () => {
    const text = newFact.trim()
    if (!text || !selectedDecision) return

    const fact = {
      id: `fact-${Date.now()}`,
      text,
      source: 'user',
      createdAt: new Date().toISOString(),
    }

    setDecisionList((current) =>
      current.map((item) =>
        item.id === selectedId
          ? { ...item, facts: [...item.facts, fact] }
          : item
      )
    )
    setNewFact('')
  }

  return (
    <main className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <span>Second Thought</span>
        </div>
        <button className="new-button" onClick={() => setShowForm(true)}>
          + New decision
        </button>
      </nav>

      <section className="hero">
        <p className="eyebrow">DECISION INTELLIGENCE</p>
        <h1>
          Think clearly.
          <br />
          <span>Decide deliberately.</span>
        </h1>
        <p className="subtitle">
          A place to slow down, understand your reasoning,
          and learn from the decisions you make.
        </p>
        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          Start a decision →
        </button>
      </section>

      {showWorkspace && selectedDecision && (
        <section className="workspace">
          <div className="workspace-header">
            <p className="section-label">DECISION WORKSPACE</p>
            <h2>{selectedDecision.question}</h2>
            <p>
              Slow down. Separate what you know from what you're assuming.
            </p>
          </div>

          <div className="workspace-grid">
            <div className="workspace-card">
              <p className="card-label">FACTS</p>
              {selectedDecision.facts.map((fact) => (
                <div key={fact.id} className="evidence-item">
                  {fact.text}
                </div>
              ))}
              {selectedDecision.facts.length === 0 && (
                <p>No facts added yet.</p>
              )}
              <input
                className="evidence-input"
                value={newFact}
                onChange={(event) => setNewFact(event.target.value)}
                placeholder="Add something you know..."
              />
              <button
                className="secondary-button"
                onClick={handleAddFact}
                disabled={!newFact.trim()}
              >
                + Add fact
              </button>
            </div>

            <div className="workspace-card">
              <p className="card-label">ASSUMPTIONS</p>
              {selectedDecision.assumptions.map((item) => (
                <div key={item.id} className="evidence-item">
                  {item.text}
                </div>
              ))}
              {selectedDecision.assumptions.length === 0 && (
                <p>No assumptions recorded yet.</p>
              )}
            </div>

            <div className="workspace-card">
              <p className="card-label">OPTIONS</p>
              {selectedDecision.options.map((item) => (
                <div key={item.id} className="evidence-item">
                  {item.text}
                </div>
              ))}
              {selectedDecision.options.length === 0 && (
                <p>No options recorded yet.</p>
              )}
            </div>

            <div className="workspace-card">
              <p className="card-label">PREDICTION</p>
              {selectedDecision.prediction ? (
                <>
                  <div className="evidence-item">
                    {selectedDecision.prediction.expectedOutcome}
                  </div>
                  <p className="confidence">
                    Confidence: {selectedDecision.prediction.confidence}%
                  </p>
                </>
              ) : (
                <p>No prediction recorded yet.</p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="dashboard">
        <div className="section-heading">
          <div>
            <p className="section-label">YOUR SPACE</p>
            <h2>Decisions</h2>
          </div>
          <span className="empty-count">
            {decisionList.length} total
          </span>
        </div>

        {decisionList.length > 0 ? (
          decisionList.map((item) => (
            <div className="decision-card" key={item.id}>
              <div>
                <p className="card-label">DECISION</p>
                <h3>{item.question}</h3>
                <p className="card-status">
                  Step 1 of 6 · {item.status}
                </p>
              </div>
              <button
                className="open-button"
                onClick={() => handleContinue(item.id)}
              >
                Open →
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">?</div>
            <h3>Your decisions will live here.</h3>
            <p>
              Start with something you're genuinely unsure about.
              Separate what you know from what you assume.
            </p>
            <button
              className="secondary-button"
              onClick={() => setShowForm(true)}
            >
              Make your first decision
            </button>
          </div>
        )}
      </section>

      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <button
              className="close-button"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              ×
            </button>
            <p className="section-label">NEW DECISION</p>
            <h2>What are you deciding?</h2>
            <p className="modal-description">
              Describe the decision that's currently taking up space
              in your head.
            </p>
            <textarea
              autoFocus
              value={decisionInput}
              onChange={(event) => setDecisionInput(event.target.value)}
              placeholder="e.g. Should I take this internship?"
            />
            <button
              className="primary-button full-width"
              disabled={!decisionInput.trim()}
              onClick={handleCreateDecision}
            >
              Create decision →
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
