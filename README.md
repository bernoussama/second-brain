# 2ndBrain

2ndBrain is a project aimed at creating a personal knowledge management tool, inspired by Supermemory. It allows users to capture web activity through a browser extension, store it, and query it using a Retrieval Augmented Generation (RAG) system. Each user will have their own isolated knowledge base.

## Core Features

*   **Web Extension:** Captures snapshots of web activity (full pages or selected text).
*   **Categorized Captures:** Users can categorize captures into "Things/Solutions Tried and Worked" and "Things/Solutions Not Tried".
*   **RAG-based Q&A:** A chat interface in the extension allows users to ask questions and get answers from their personal knowledge base.
*   **Context Menu Integration:** Easy capture initiation directly from the browser's context menu.
*   **User-Specific RAGs:** Each user's data and RAG are isolated.

## Technology Stack

*   **Web Extension:** [WXT](https://wxt.dev/) framework with [React 19](https://react.dev/)
*   **Backend:** [Hono](https://hono.dev/) running on [Cloudflare Workers](https://workers.cloudflare.com/)
*   **Database & Vector Store:** [Cloudflare Hyperdrive](https://developers.cloudflare.com/hyperdrive/) (PostgreSQL)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **AI:** [Vercel AI SDK](https://sdk.vercel.ai/) paired with Google's [Gemini API](https://ai.google.dev/models/gemini)
*   **Authentication:** [AuthKit](https://authkit.com/) 

## Project Tracking

Project tasks and progress are tracked privately.

## Getting Started

Detailed setup and development instructions will be added here as the project progresses.

### Prerequisites

*   Node.js (version TBD)
*   pnpm package manager
*   Cloudflare Account & Wrangler CLI
*   Access to Gemini API

### Backend Setup

```bash
# Coming soon
```

### Extension Setup

```bash
# Coming soon
```

## License

This project is licensed under the [AGPL License](https://www.gnu.org/licenses/agpl-3.0.html). 