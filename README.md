# ChildHopeFoundation

A modern, full-stack web application for the Parikrama Foundation, focused on empowering underprivileged children through education, healthcare, and community support.

## Features

- **Donation Platform:** Secure, multi-option donation form with 80G tax receipt support.
- **Volunteer & Internship Applications:** Online forms for volunteers and interns with real-time feedback.
- **Programs & Events:** Dynamic listing of programs, events, and media coverage.
- **Team & About:** Meet the team, learn about the mission, vision, and values.
- **Accessibility:** High-contrast, accessible UI with responsive design.
- **Admin/Server:** Node.js/Express backend with API endpoints for donations, programs, events, and more.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** (Add your DB, e.g., PostgreSQL, SQLite, etc.)
- **API:** RESTful endpoints
- **State Management:** React Query

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd ChildHopeFoundation
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App

#### Development
- Start the backend server:
  ```sh
  npm run server
  ```
- Start the frontend (Vite):
  ```sh
  npm run dev
  ```
- The app will be available at `http://localhost:5173` (or as shown in your terminal).

#### Production
- Build the frontend:
  ```sh
  npm run build
  ```
- Serve the production build:
  ```sh
  npm run preview
  ```

## Project Structure

```
ChildHopeFoundation/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── App.tsx
│   └── index.html
├── server/
│   ├── db.ts
│   ├── index.ts
│   ├── routes.ts
│   └── storage.ts
├── shared/
│   └── schema.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── ...
```

## Environment Variables

Create a `.env` file in the root for server-side configuration (e.g., database URL, API keys).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**ChildHopeFoundation** – Empowering children, transforming communities.
