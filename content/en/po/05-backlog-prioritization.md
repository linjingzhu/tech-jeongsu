# Backlogs, Priorities, and Requirements

A backlog is not an idea repository.

> It is **a prioritized, contextualized list of work candidates to consider in the near future to achieve the current product goal**.

## Basic Structure of a Backlog Item

```text
Title
Problem / Background
User
Goal
Scope
Out of Scope
Workflow
Acceptance Criteria
Risk
Dependencies
Evidence
```

## Judging Priorities

No single formula makes the decision automatically.

The following dimensions are usually considered together.

| Dimension | Question |
|---|---|
| Value | Is the user/business value substantial? |
| Reach | How many people will it affect? |
| Frequency | How often will it be used? |
| Urgency | Will delaying it cause a loss? |
| Risk | Are the technical or product risks significant? |
| Effort | How much will implementation cost? |
| Confidence | How reliable is the evidence? |
| Strategic Fit | Does it match the product direction? |

## A Simple Scoring Example

```text
Priority
≈ Value × Reach × Confidence
  ─────────────────────────
          Effort
```

A score is a tool for structuring discussion, not the answer.

## Must / Should / Could

Classifications such as MoSCoW can also be used.

- Must: The goal cannot be achieved without it
- Should: Important, but alternatives exist
- Could: If capacity allows
- Won't now: Not doing it at this time

The last category is the most important.

> Backlog management includes **decisions about what not to do**.

## Acceptance Criteria

Describe observable results rather than implementation methods.

Poor example:

> Add a QPushButton.

Good example:

> When the user selects a Preset, the Camera FOV and Transform are restored together.

## Backlog Refinement

Check regularly.

```text
Does it connect to the goal?
↓
Is the problem still valid?
↓
Is the scope too large?
↓
Are there dependencies?
↓
Is acceptance clearly defined?
↓
Is the priority still right?
```

A growing backlog is not an achievement. **Removing unnecessary items and making choices clearer** is also the PO's job.
