Frontend README (Angular)
Course Archive - Frontend (Angular)
Overview
This is the frontend of the Course Archive application, specifically designed for IBA students. It allows users to explore and interact with various courses, view course details, and download relevant course materials such as course outlines.

Prerequisites
Before running the project, ensure that you have the following installed:

Node.js (version 12.x or higher)
Angular CLI (if not already installed)
1. Install Node.js
Download and install Node.js from here. Make sure npm (Node Package Manager) is installed along with it.

2. Install Angular CLI
If you haven’t installed Angular CLI globally, you can do so by running:

bash
Copy code
npm install -g @angular/cli
3. Setup the Project
Clone the repository:

bash
Copy code
git clone <repository-url>
cd frontend
Install dependencies:

bash
Copy code
npm install
4. Running the Application
To start the Angular frontend, run:

bash
Copy code
ng serve
This will start the development server, and you can view the app by navigating to http://localhost:4200 in your browser.

Folder Structure
src/app/: Contains all the components and services for the frontend.
src/assets/: Stores assets like images, styles, etc.
src/environments/: Contains environment configuration for development and production builds.
Troubleshooting
If you encounter issues with missing dependencies, try deleting the node_modules/ folder and run npm install again.
Make sure to configure the backend URL in your environment files (src/environments/environment.ts) if the frontend is not connecting correctly.
