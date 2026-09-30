# Collaboration, Meetings, and Deliverables

One important PO skill is **reducing information while retaining decisions**.

## Key Collaborators

| Collaborator | What the PO Mainly Aligns |
|---|---|
| Users | Problems, context, and pain points |
| Designer | Workflows and UX quality |
| Engineer | Scope, constraints, and technical risk |
| QA | Acceptance and regression |
| Product Manager | Strategy and goals |
| Project Manager | Schedule and dependencies |
| Sales/CS | Customer requests and their frequency |
| Leadership | Outcomes relative to investment |

## The Purpose of a Good Meeting

Use meetings primarily for **decisions and alignment**, rather than information sharing.

```text
Before the meeting
- Questions
- Required decisions
- Materials

During the meeting
- Facts
- Opinions
- Options
- Decision

After the meeting
- Decision
- Owner
- Next Action
```

## Documents a PO Commonly Creates

### Product Brief

- Problem
- User
- Goal
- Why Now
- Success Metric
- Scope

### Feature Spec

- Background
- Workflow
- UI / Behavior
- Rules
- Edge Cases
- Acceptance Criteria

### Decision Log

```md
Decision:
Treat Imported Camera Animation as a Camera Shot.

Reason:
Consistent with the existing Timeline mental model.

Rejected:
Creating a separate Animation Object.

Impact:
Review required for Import, Timeline, and Save/Load.

Revisit if:
Users repeatedly report that they cannot tell a Camera Shot from an Animation.
```

### Release Scope

```text
Included
Excluded
Known Limitation
Risk
Verification
```

## Characteristics of Good Documentation

- Focus on user behavior rather than describing implementation steps
- Give each document one responsibility
- Separate decisions from their reasons
- Mark open questions
- Keep only the current state
- Use diagrams when they communicate faster

## Communication Between PO and Engineer

For a PO, instead of:

> "Implement it this way."

Prefer:

> "When users select B in state A, they expect result C. Let's decide the internal implementation together based on the constraints."

A PO should make the **Product Behavior Contract** clear without taking over technical decisions.
