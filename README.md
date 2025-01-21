# Job Application Tracker -- React Project

This Job Application Tracker application is a front-end project integrated with JSON-Server, designed to conveniently track a user's job application status. It includes the following features:

- Home Page: Displays job application cards with filters for sorting and searching.

- Job Detail Page: Provides detailed information about each job card, including a notes section for additional comments or updates.

- Add Application Page: Allows users to add new job applications with form validations.

## Start the app

Start the JSON server on localhost:3001 `json-server -H 0.0.0.0 --watch db.json -p 3001 -d 2000` 

Start the React frontend only: `cd client` `npm start` or from the root directory `npm run client`

Start the Node backend only: `npm run server`

Run both: `npm run dev`


## How It's Made

**Tech used:** React, Redux, Formik, JSON-Server, Bootstrap

**(1)** On the Home page, view all job applications as cards. 
Uses filters to narrow down your search (by Mode and/or type)           |  Alert modal pop up when no match results
:-------------------------:|:-------------------------:
![image](https://github.com/user-attachments/assets/08084ae6-77ee-4c63-bb69-a81aa02e23ee) |  ![image](https://github.com/user-attachments/assets/1fc85c71-1177-4f9f-9140-0ad608b37f3c)

**(2)** Click on a job card to navigate to its detail page, where you can view/add notes and other job-specific information.
<img width="821" alt="image" src="https://github.com/user-attachments/assets/94ebf692-0db5-4fc4-abed-522f63fce197" />

**(3)** Use the "Add Application" page to add a new job application. 
Fill out the form and submit, with form validations           |  Pop up modal for successful submision
:-------------------------:|:-------------------------:
![image](https://github.com/user-attachments/assets/3e4bd8dd-106b-4659-9509-b8706c6d3b4c) |  ![image](https://github.com/user-attachments/assets/3d31483a-078d-4d86-aa5e-d65ec55349a8)




## Optimizations

Data persistence using a full backend solution, update existing post/notes feature, user authentication for mulltiple users.

## Lessons Learned

Practiced knowledge for state management, form validation, JSON-Server integration, and writing reusable components. 

## My other applications

Feel free to check out my other applications:<br><br>
**NASA API Project:** https://zy-nasa-1022.web.app/ <br>
**Member Management Panel:** https://github.com/priscillayouziqian/Final-project-memberServicePanelApp <br>


