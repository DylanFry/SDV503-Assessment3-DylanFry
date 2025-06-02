# Assessment 3
---
## The Problem
The local District Health Board wants a new Patient Health Record Managment System to store, manage and give access to a patient's health information such as their medical history, diagnoses, medications, and test results. 
## Project Goals
This project aims to create that desired system in a timely and well-developed manner using the agile extreme programming (XP) software development methodology.
## Scope
This project entails the planning, design, and development of a proof of concept for the system using JavaScipt and the terminal through Node.JS. The project will then be completed by creating user documentation.
## Tracking Progress
Agile XP project managment tracks progress through short, weekly iterations that are reviewed before the next iteration begins. For this project, at the end of each iteration (Each Monday), I will review where I am in my timeline, and if I need to adjust the amount of work I am doing or add any new points I can do so.
## How Issues Will Be Addressed
If an issue arises that does not need to be fixed immediately, it will be added to the backlog to be addressed in a future sprint. If the issue is to severe to leave, any other work will be postponed to foxus on fixing the issue.
## How Communication Will Be Handled
Communication on this project will be handled by using GitHub's built in tools to share and get feedback on the work that is being done.
## What Does The Program Do
The program will allow patients to view their profile information such as medical history, name, age, and profile picture. They can also update their contact details if any are incorrect.
## Functional Requirements
The program will, at a minimum, need the ability to:
* View a patient's information including:
  * Full name
  * NHN
  * Date of Birth
  * Sex
  * Allergies
  * Past Operations
  * Known Illnesses
  * Clinic/s
  * Medications
* Edit the information
* Delete any patient from the registry

Since this project is using XP project management, these functions would need to be completed before I can consider functions such as a patient AND staff view
## Measuring Success
The success of this project will be measured by how closly to the goals laid out in the situation mentioned in the **The Problem** by the completion date of the project.
## Summary
To summarise, the program I will create through this project will be a patient profile registry using the command line as it's input and output. This is being created to address the issue put forward by the local District Health Board of needing a new patient managment system.
## Why should it be approved?
This program should be approved as it meets the requirements set forth by the Health Board without having unnecessary functions which would make it more difficult to use and harder to maitain.
## Workflow Diagram
![PPR Diagram V1 drawio](https://github.com/user-attachments/assets/88c083f2-1e8c-4631-8af0-dda5e2b92c2e)
This diagram shows:
- The process begins by having the user input a patient's National Health Number (NHN)
- It then checks if it it can find that NHN is in the database:
  - If it is, then the information attached to that number will be displayed in a table
  - If not, a message telling the user that the NHN doesn't exist will display and the NHN entry screen will be re-displayed
- Once the table has been displayed, the user will then have the option to do one of the following options:
  1. View a detailed allergy list
  2. View a detailed past operations list
  3. View a detailed clinics list
  4. View a detailed known illnesses list
  5. View taken medicine list
  6. Edit the information attached to the NHN
  7. Delete the patient
  8. Go back to the NHN entering screen
- If the user wants to view a detailed view, the program will check that the list exists to look at (i.e. there are 1 or more options)
  - If the list does exist, it will be shown to the user. At this point, the user can return to the table view
  - Otherwise, the user will be prompted with a message that no list can be displayed and taken back to the table
- If the use wants to edit the information, they will be given a list of the information points which can be edited (e.g. Name, Allergies, etc.)
  - Once the user has selected the point to edit, they will be asked what they wish to change it to. The information will then be changed and a confirmation message will tell them what information has been changed and what to
  - At any point in this process, the user can go back to the previous page
- If the user wishes to delete the patient profile, they will prompted with a comfirmation window
  - If the user inputs "y", the profile will be deleted from the database and the user will be redirected to the NHN input page
