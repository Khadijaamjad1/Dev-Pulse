# DevPulse

DevPulse is a web-based technology events platform designed to help developers and students discover upcoming tech events in Pakistan.

Users can explore events, submit their own events, track submitted events, and receive notifications about event approval or rejection. An admin can review submitted events and approve or reject them before they appear publicly.

## Features

- Browse upcoming technology events
- Search and explore events
- View detailed event information
- User authentication with Supabase
- Submit technology events
- View submitted events in "My Events"
- Receive notifications about event status
- Admin dashboard for event approval/rejection
- Only approved events are displayed publicly
- Responsive and modern user interface

## Technologies Used

- **Next.js** – React framework for the application
- **React** – Frontend user interface
- **TypeScript** – Main programming language
- **Tailwind CSS** – Styling and responsive design
- **Supabase** – Database and authentication
- **PostgreSQL** – Database used through Supabase
- **Git & GitHub** – Version control and project management

## How It Works

### Users

Users can:

1. Create an account or log in.
2. Browse upcoming technology events.
3. Submit their own events.
4. Track their submitted events through "My Events".
5. Receive notifications when an event is approved or rejected.

### Event Approval System

When a user submits an event, its status is initially set to `pending`.

The admin reviews the submitted event from the Admin Dashboard.

The admin can:

- Approve the event
- Reject the event

Only events with an `approved` status are displayed on the public Events page.

## Authentication

DevPulse uses **Supabase Authentication** for user login and session management.

Authenticated users can access features such as:

- My Events
- Notifications
- Event submission

The Admin Dashboard is restricted to the configured admin account.

## Database

DevPulse uses a Supabase PostgreSQL database.

The main `events` table stores information such as:

- Event title
- Description
- Date
- Location
- Category
- Status
- Creation information

A notifications system is also used to inform users about changes to their submitted events.

## Project Structure

```text
devpulse/
│
├── app/
│   ├── admin/
│   ├── create-event/
│   ├── events/
│   ├── login/
│   ├── my-events/
│   ├── notifications/
│   └── ...
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── EventCard.tsx
│   └── ...
│
├── lib/
│   └── supabase.ts
│
├── public/
│
├── package.json
├── README.md
└── ...