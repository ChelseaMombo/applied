# Applied

A job-application tracker built with React, TypeScript and Vite. It keeps a list of the jobs you have applied for, shows how far each one has got, and points out the ones that have gone quiet: anything still at "applied" more than 14 days after you sent it gets a "Needs a nudge" marker.

![Applied running in the browser](docs/screenshot.png)

## What it does

- Add, view, edit the stage and notes of, and delete job applications
- Search by company or job title, and filter by stage (the two work together)
- Stage counts across the top, always worked out from the list and never stored
- Loading, error, empty and "no matches" states
- Light and dark theme, remembered between visits
- Works at phone width, with keyboard-accessible forms and labelled fields

## Tools used

- **React 19 + TypeScript + Vite**: the app, with a `Stage` union type for the five stages
- **React Router**: four routes (list, one job, add form, 404) with a shared layout
- **Tailwind CSS v4 + shadcn/ui**: styling and accessible base components
- **React Hook Form**: the add form, with a rule and message on every field
- **Context**: the theme provider and `useTheme` hook
- **Vitest + React Testing Library**: unit tests for the 14-day rule and stage counts, and a form test
- **localStorage**: data is saved in the browser behind an async API file, so a real database could replace it by changing one file

## How to run it

```bash
git clone https://github.com/ChelseaMombo/applied.git
cd applied
npm install
npm run dev
```

Then open http://localhost:5173. To run the tests: `npm test -- --run`.

## Profiler note

Typing in the search box re-rendered the page, the filter bar, the stage counts and every card, even though the counts did not change, because a parent re-render re-renders its children by default; at this size it is fast enough that I did not optimise it.

## What I would do next

- Replace the data hook with TanStack Query and delete the hand-written loading and error code
- Move the form rules into a Zod schema
- Put a real backend behind the API file, with sign-in
- Add optimistic stage changes
- Add a Playwright test and GitHub Actions CI

## Not done yet

The stretch goals above are not built.