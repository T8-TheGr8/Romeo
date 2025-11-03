# R.O.M.E.O. — Running Overview, Metrics & Evaluation Organizer

A full-stack running analytics platform that lets users upload GPX files, view their training history, track weekly mileage, generate stats (pace, distance, time), and visualize performance over time. 

Currently being used as my personal running log, possible future development will entail user logins so each user can view their own personal training log. 

---

## Purpose

ROMEO is a personal training tracker built as a portfolio project to demonstrate skills in:

- Full-stack development (React+Vite, Node.js, Express, MongoDB)
- REST API design & backend data modeling
- Frontend architecture using React, custom hooks, context, etc
- Parsing & visualizing GPS route data from `.gpx` files (downloadable from strava)
- UI/UX design with reusable components & modals, ensuring a smooth development process 
- Gain experience with ***AI-assisted development*** to simulate a real development workflow.


---

## Features

- Upload GPX files or manually add a run  
- Auto-calculates distance, pace, duration, (and route from GPX uploads)
- Dashboard with:
  - Most recent run automatically on display
  - Weekly stats: accumulative mileage, number of runs, avg pace, longest run distance  
  - Editable and removable runs - options to clear from local storage and database storage  
- Interactive route map (Leaflet + React Leaflet)
- Ability to filter past runs to show oldest first, newest first, fastest pace, etc. 
- Chart past mileage, accumulated weekly (under development)

***Dev Features***

- Custom hooks like `useWeeklyStats()`  
- MongoDB persistence + Express REST API  
- Modular React architecture using component-based design
- Mobile-responsive UI with CSS
- Emphasis on reusability and consistency throughout the project 
    - Clearly and effectively organized file structure 
    - Code has been refactored numerous times to implement helper functions as necessary 

---

## Tech Stack

**Frontend**
- React + Vite  
- React Router for page navigation  
- Context API and custom hooks for state management  
- Leaflet.js (interactive maps & GPX running route display)  
- Custom CSS styling stemming from a consistent color palette
- Reusable UI components (cards, modals, inputs)

**Backend**
- Node.js + Express.js (REST API)  
- MongoDB + Mongoose for database & data modeling  
- dotenv for environment configuration

**File Handling & Parsing**
- GPX/XML parsing using `xml2js` and the browser's `DOMParser`  
- Conversion of GPX data into route coordinates, distance, duration, and elevation  
    - (Plans to use elevation soon)
- File-to-run data transformation including date, pace, and notes

**Core Architecture & Utilities**
- Unique IDs with `crypto.randomUUID()`  
- Modular project structure (`/context`, `/hooks`, `/features`, `/utils`)  
- Custom hooks like `useWeeklyStats`, `useUploadForm`, `useRunContext`  
- Responsive layout and theme system using CSS variables (`--accent`, `--surface` `--bg`)  
- Reusable modal system used for renaming runs and viewing the README

---

## API Example (Express + MongoDB)
```js
// GET /api/runs
router.get("/", async (req, res) => {
  try {
    const runs = await Run.find().sort({ date: -1 });
    res.json(runs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch runs", error: err.message });
  }
});

// POST /api/runs
router.post("/", async (req, res) => {
  try {
    const newRun = new Run(req.body);
    const savedRun = await newRun.save();
    res.status(201).json(savedRun);
  } catch (err) {
    res.status(400).json({ message: "Failed to save run", error: err.message });
  }
});

// DELETE /api/runs/:id
router.delete("/:id", async (req, res) => {
  const { password } = req.body;

  if (!password || password !== process.env.DELETE_PASSWORD) {
    return res.status.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const deleted = await Run.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Run not found" });
    res.json({ message: "Run deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete run", error: err.message });
  }
});
```
