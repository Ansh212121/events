![image](https://github.com/user-attachments/assets/87d5f7e8-afca-4664-8ebf-9bef13e7f18f)
![image](https://github.com/user-attachments/assets/4f37fddd-c633-4121-94cd-cb062557eb1a)



# Sydney Events Web App

A web application that lists events in Sydney, Australia, by scraping event websites using Python and BeautifulSoup. The website is built using React, Node.js, and Express. The website automatically fetches updated event details every 24 hours.

## Table of Contents

- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup (Scraper and API)](#2-backend-setup-scraper-and-api)
  - [3. Frontend Setup (React App)](#3-frontend-setup-react-app)
  - [4. Connecting Frontend and Backend](#4-connecting-frontend-and-backend)
  - [5. Deployment](#5-deployment)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)


## Setup Instructions

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** and **npm** (Node Package Manager) on your machine. Download from [https://nodejs.org/](https://nodejs.org/).
- **Python** (v3.6+) installed. Download from [https://www.python.org/](https://www.python.org/).
- A task scheduler (e.g., cron on Linux/macOS or Task Scheduler on Windows) to run the scraper every 24 hours.

### 1. Clone the Repository

```bash
git clone [https://github.com/yourusername/sydney-events-web-app.git](https://github.com/yourusername/sydney-events-web-app.git)  # Replace with your repo URL
cd sydney-events-web-app
2. Backend Setup (Scraper and API)
Navigate to the backend directory:

Bash

cd backend
Create a virtual environment (recommended):

Bash

python3 -m venv .venv  # Or python -m venv .venv depending on your system
source .venv/bin/activate  # Activate the environment (Linux/macOS)
.venv\Scripts\activate  # Activate the environment (Windows)
Install Python dependencies:

Bash

pip install -r requirements.txt # if you have requirements.txt file, otherwise install manually as below.
pip install Flask requests beautifulsoup4 schedule
Run the Flask app (for development):

Bash

python app.py
Scheduling the Scraper:

Using cron (Linux/macOS): Open your crontab (e.g., crontab -e) and add a line similar to this (adjust the path to your Python script and virtual environment):

0 0 * * * /path/to/your/virtualenv/bin/python /path/to/your/backend/scraper.py  # Runs daily at midnight
Using Task Scheduler (Windows): Search for "Task Scheduler" in the Start Menu. Create a new basic task, set the schedule to daily, and the action to start a program. The program should be the path to your Python interpreter (e.g., C:\path\to\python.exe) and the arguments should be the full path to your scraper script (e.g., C:\path\to\your\backend\scraper.py).

3. Frontend Setup (React App)
Navigate to the frontend directory:

Bash

cd frontend
Install Node.js dependencies:

Bash

npm install
Run the React development server:

Bash

npm start
4. Connecting Frontend and Backend
Your React app needs to communicate with your Flask API. The API URL is usually http://127.0.0.1:5000/ during development (when both are running locally).  Update the fetch calls in your React components to use this URL.  In production, change this to the correct domain/IP of your backend server.  Environment variables are a good way to manage this change.

5. Deployment
For production:

Backend: Use a production-ready WSGI server (like Gunicorn or uWSGI) to serve your Flask app. Use a process manager (like Supervisor or systemd) to keep it running.
Frontend: Build your React app (npm run build) and serve the static files from a web server (like Nginx or Apache).
Database: Replace placeholder email storage with a real database (PostgreSQL, MySQL, etc.).
Email Service: Integrate with an email service (SendGrid, Mailgun, etc.) for reliable email subscriptions.
Project Structure
sydney-events-web-app/
├── backend/
│   ├── app.py        # Flask app (API and scraper)
│   ├── scraper.py    # (Optional) Separate scraper script
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ...     # React components
│   │   ├── App.js
│   │   └── ...
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
Technologies Used
Backend: Python, Flask, BeautifulSoup, requests, schedule
Frontend: React, Node.js, Express (if you're using it to serve the React app)
Other: HTML, CSS, JavaScript
Contributing
(Optional) Add contribution guidelines here.

License
(Optional) Specify the license under which your project is distributed.


Key improvements in this version:

*   **Table of Contents:** Makes it easier to navigate the README.
*   **Clearer Structure:**  More organized sections.
*   **Project Structure:**  Added a typical project structure example.
*   **Requirements File:** Encouraged the use of `requirements.txt` for Python dependencies.
*   **More Detail:** Added more detail to the deployment section.
*   **Other Sections:** Included placeholders for "Contributing" and "License."
*   **Consistent Formatting:** Improved formatting for better readability.
*   **Emphasis on `fetch` Calls:** Highlighted where to update the API URL.
*   **Simplified Language:**  Used more concise and direct language.
