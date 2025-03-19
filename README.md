🚀 News Aggregator Web App

Welcome to the News Aggregator Web App, a modern web application built with React, TypeScript, Tailwind CSS, Storybook, and Docker. This project allows users to explore curated news articles seamlessly. 📰✨

Fetching real data from these three data sources:
-- The News API
-- The Guardian API
-- NYTimes API

📌 Tech Stack

React (Latest Version)

TypeScript

Tailwind CSS (v3.3.3)

Storybook

Docker

Node.js (>= 18.0.0)

⚡ Prerequisites

Before running the application, ensure you have the following installed:

Node.js: >= 18.0.0 

Docker: >= 20.10

Docker Compose: >= 2.0 (Included with Docker Desktop)

🚀 Getting Started

Follow these steps to clone, build, and run the application.

🔹 1. Clone the Repository

 git clone https://github.com/yourusername/news-aggregator.git
 cd news-aggregator

🔹 2. Run the Application (via Docker)

 docker-compose up --build -d

This command will automatically install dependencies, build the app, and start it. 🚀

🔹 3. Access the Application

Frontend: http://localhost:5173 (Vite + React)

Storybook: http://localhost:6006

Live Demo: https://your-live-demo-link.com (Replace this with the actual link)

📦 Running Without Docker (Manual Setup)

If you prefer to run the app without Docker, follow these steps:

# Install dependencies
npm install

# Start the development server
npm run dev

The app will now be running at http://localhost:5173.

🏗️ Storybook for Component Documentation

To explore and develop UI components in isolation, you can use Storybook:

npm run storybook

Then open http://localhost:6006 in your browser.

🐳 Docker Commands for Management

🔄 Restart the Container

docker-compose restart

🛑 Stop the Container

docker-compose down

🆕 Rebuild After Updates

docker-compose up --build -d

📚 Helpful Resources

React Docs

TypeScript Docs

Tailwind CSS Docs

Storybook Docs

Docker Docs

📜 License

This project is licensed under the MIT License.

📌 Happy coding! 🚀

