Mavericks Draft Hub

Welcome to the Mavericks Draft Hub! This web application provides a centralized analysis platform (with player profiles, statistic filters, and an AI chatbot) for the Dallas Mavericks front office (I'll pretend that they'll draft Flagg because of this). 

1. Features
- Interactive Big Board with real-time sorting and filtering
- Player Profiles with detailed stats and custom scouting reports
- Integrated AI Chatbot for draft-related Q&A
- Clean, responsive UI optimized for laptops, tablets, and phones

2. Overall Structure 
- Built with React and Vite
- Data-driven: All player data is loaded from a JSON file
- Uses Material UI for clean, modern components
- Live player rankings and customizable scouting reports

3. How to Use
- Clone the repository: git clone https://github.com/your-github-username/mavs-draft-hub.git
- Install dependencies: npm install
- Set up your OpenAI API key (required for the AI Chatbot): Create a .env file in the root of the project. Add your OpenAI API key: VITE_OPENAI_API_KEY=your-api-key-here
- Run the development server: npm run dev
- Access the app at http://localhost:5173.

4. Deployment
- Easily deployable to any site hosting service, such as Netlify, Vercel, or GitHub Pages.

5. Forewarning: The AI Chatbot is only accurate up to September 2021 due to OpenAI’s model limitations.
