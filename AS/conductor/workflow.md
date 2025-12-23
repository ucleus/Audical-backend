# Workflow

This document outlines the workflow for the project.

## Development Workflow

1.  **Phase-Based Development:**
    -   Work is organized into Phases (milestones).
    -   Each Phase consists of a set of Tasks.
    -   At the end of each Phase, a verification step is required.

2.  **Task-Based Execution:**
    -   Implement one task at a time.
    -   Run tests after each task to ensure stability.
    -   Commit changes after each task.

3.  **Testing Strategy:**
    -   Write tests for new features and bug fixes.
    -   Ensure all tests pass before completing a task.
    -   Required Code Coverage: >80%

4.  **Version Control:**
    -   Use descriptive commit messages.
    -   Commit changes frequently (at least once per task).
    -   Use `git notes` to summarize the changes made for each task.

## Phase Completion Verification and Checkpointing Protocol

At the end of each Phase, perform the following verification steps:

1.  **Manual Verification:**
    -   Manually verify that the features implemented in the phase work as expected.
    -   Check for any regressions or side effects.

2.  **Code Review:**
    -   Review the code changes made in the phase.
    -   Ensure adherence to the project's code style guides.

3.  **Checkpointing:**
    -   Create a git tag for the completed phase (e.g., `phase-1-complete`).
    -   Push the tag to the remote repository.

## Documentation

-   Keep the `conductor/` directory up-to-date.
-   Update `product.md` and `tech-stack.md` as the project evolves.
-   Document any architectural decisions in `conductor/architecture.md` (create if needed).
