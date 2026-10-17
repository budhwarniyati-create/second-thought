# Second Thought

### Think clearly. Decide deliberately.

Second Thought is an early-stage decision-intelligence project exploring how software can help people reason through difficult choices, make their assumptions visible, and learn from the outcomes of their decisions.

Instead of rushing toward an answer, the idea is to create a workspace for thinking more carefully.

## The idea

Important decisions often involve a mixture of facts, assumptions, personal values, uncertainties, and predictions. When these get mixed together, it becomes harder to understand why a decision feels right—or what information is still missing.

Second Thought explores a more structured approach to decision-making.

## Current prototype

The current interface includes:

- **Decision dashboard** — view and open individual decisions.
- **Decision capture** — create a decision by describing the question you're facing.
- **Facts workspace** — record facts associated with a particular decision.
- **Reasoning structure** — organise the workspace around facts, assumptions, options, and predictions.
- **Decision states** — represent stages such as captured and analysing.
- **Rule-based reasoning logic** — an initial JavaScript module that selects a suggested conversational move based on the available decision information.

## How it works

The project is being developed around a simple principle:

1. Capture the decision.
2. Separate known information from assumptions.
3. Identify options and unknowns.
4. Consider possible outcomes.
5. Make a deliberate choice.
6. Review the outcome and learn from the experience.

This is the intended direction of the project, not a claim that every stage is already implemented.

## Built with

- React
- JavaScript
- Vite
- CSS

## Current status

**Stage:** Early prototype

The interface supports creating multiple decisions, opening them independently, and adding facts to a selected decision. The production build and lint checks pass.

Current limitations:

- Newly created decisions are held in application state and are not yet saved persistently.
- Assumptions, options, and predictions are displayed but are not yet fully editable through the interface.
- The rule-based reasoning module is an initial foundation and is not yet integrated into the main interface.
- Outcome tracking and retrospective learning remain future work.

## Roadmap

- [ ] Add persistent decision storage.
- [ ] Allow users to edit assumptions and options.
- [ ] Add prediction creation and confidence tracking.
- [ ] Connect the reasoning engine to the interface.
- [ ] Support outcome reviews.
- [ ] Explore ways to identify patterns in past decisions.
- [ ] Add automated tests for core decision logic.

## Why I'm building it

I'm interested in the intersection of computer science, human reasoning, and useful product design. Second Thought is an experiment in turning that interest into a practical tool—one that helps people understand not only what they decide, but how they arrived there.

This project is a work in progress, and its architecture and features will evolve through implementation, testing, and reflection.

---

*An ongoing experiment in thinking better, one decision at a time.*