export const DECISION_STATUS = {
  CAPTURED: "captured",
  ANALYZING: "analyzing",
  COMMITTED: "committed",
  AWAITING_OUTCOME: "awaiting_outcome",
  COMPLETED: "completed",
  REVIEWED: "reviewed",
}

export const decisions = [
  {
    id: "decision-001",
    question: "Should I take this internship?",
    status: DECISION_STATUS.CAPTURED,
    createdAt: new Date().toISOString(),

    facts: [
      {
        id: "fact-001",
        text: "The internship is paid.",
        source: "user",
        createdAt: new Date().toISOString(),
      },
    ],

    assumptions: [
      {
        id: "assumption-001",
        text: "I will enjoy the work.",
        source: "user",
        createdAt: new Date().toISOString(),
      },
    ],

    options: [
      {
        id: "option-001",
        text: "Take the internship",
      },
      {
        id: "option-002",
        text: "Decline the internship",
      },
    ],

    prediction: {
      expectedOutcome:
        "I think the internship will help me gain useful experience.",
      confidence: 70,
      createdAt: new Date().toISOString(),
    },

    outcome: null,
    review: null,
  },
]