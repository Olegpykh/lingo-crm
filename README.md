# Lingo CRM

A portfolio project: a CRM app for managing English-language students, lesson schedules, and account settings. Built with Next.js, TypeScript, and MUI. The app's UI is in German.



## About

A CRM concept aimed at freelance language teachers, letting them track students' progress, payment status, attendance, and their weekly lesson schedule in one place.

## Features

- **Dashboard** — key metrics at a glance: student count, average attendance, pending payments, lessons scheduled this week, plus upcoming lessons and CEFR level distribution (A1–C2)
- **Student management** — searchable, level-filterable overview with a detail page per student (contact info, progress, notes, their lessons)
- **Drag & drop schedule** — move lessons between time slots via drag & drop (using `@dnd-kit`), with a weekly grid or list view
- **Settings** — profile editing with photo upload, light/dark mode, accent color picker, notification toggles
- **Persistent state** — all changes survive page reloads (Zustand + `localStorage`)
- **Responsive design** — from a full desktop dashboard down to a mobile view with a collapsible navigation drawer

## Tech Stack

| Area | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI Library | [MUI (Material UI)](https://mui.com/) |
| State Management | [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware |
| Drag & Drop | [@dnd-kit](https://dndkit.com/) |
| Validation | [Zod](https://zod.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

## Project Structure

```
app/                  # Next.js App Router — pages and layouts
components/           # Reusable UI components
components/settings/  # Settings page sections
entities/             # Domain types (Student, Lesson, User) and related logic
store/                # Zustand store, split into slices
data/                 # Mock data for students and the schedule
lib/                  # Shared utilities (colors, validation)
```

## Running Locally

```bash
git clone https://github.com/Olegpykh/lingo-crm.git
cd lingo-crm
npm install
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).


## Roadmap

- [ ] Form for adding new students
- [ ] Supabase integration (real database instead of mock data)
- [ ] Authentication

## Author

**Oleg Pykhonin** — Frontend Developer, Berlin
[GitHub](https://github.com/Olegpykh)
