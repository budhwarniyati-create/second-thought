export const COUNSELOR_MODES = {
  FRIEND: "friend",
  COUNSELOR: "counselor",
  RESEARCHER: "researcher",
  COACH: "coach",
  ANALYST: "analyst",
}

export const COUNSELOR_MOVES = {
  LISTEN: "listen",
  CLARIFY: "clarify",
  ASK: "ask",
  REFLECT: "reflect",
  CHALLENGE: "challenge",
  INFORM: "inform",
  RESEARCH: "research",
  COMPARE: "compare",
  MOTIVATE: "motivate",
  RECOMMEND: "recommend",
  SUMMARIZE: "summarize",
}

export function createDecisionState(question = "") {
  return {
    question,

    context: "",

    facts: [],
    assumptions: [],
    options: [],

    values: [],
    constraints: [],
    concerns: [],

    unknowns: [],
    contradictions: [],

    predictions: [],

    chosenOption: null,
    outcome: null,
    review: null,
  }
}

export function chooseNextMove(state) {
  if (!state.question) {
    return {
      mode: COUNSELOR_MODES.FRIEND,
      move: COUNSELOR_MOVES.ASK,
      goal: "Understand what the user is trying to decide.",
    }
  }

  if (state.options.length === 0) {
    return {
      mode: COUNSELOR_MODES.COUNSELOR,
      move: COUNSELOR_MOVES.CLARIFY,
      goal: "Understand what options the user is considering.",
    }
  }

  if (state.values.length === 0) {
    return {
      mode: COUNSELOR_MODES.COUNSELOR,
      move: COUNSELOR_MOVES.ASK,
      goal: "Understand what matters most to the user.",
    }
  }

  if (state.assumptions.length > 0 && state.unknowns.length > 0) {
    return {
      mode: COUNSELOR_MODES.ANALYST,
      move: COUNSELOR_MOVES.REFLECT,
      goal: "Help the user distinguish assumptions from unknown information.",
    }
  }

  if (state.predictions.length === 0) {
    return {
      mode: COUNSELOR_MODES.COUNSELOR,
      move: COUNSELOR_MOVES.ASK,
      goal: "Help the user think about what they expect will happen.",
    }
  }

  return {
    mode: COUNSELOR_MODES.COUNSELOR,
    move: COUNSELOR_MOVES.SUMMARIZE,
    goal: "Summarize the decision and help the user decide whether they are ready to commit.",
  }
}