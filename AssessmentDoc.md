
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
    
## Code Review Checklist (Courtesy of Lucas Donald)

- Document all functions with comments, especially for complex solutions or problems
- Maintain consistent indentation throughout code
- Follow DRY (Don't Repeat Yourself) principles
- Keep line lengths reasonable and readable
- Separate code and data (JSON, JS)
- Maintain consistent file structure
- Keep documentation up to date (Readme, Comments)
- Declare variables with const or let (avoid var)
- Use strict equality operators (=== and !==)
- Keep functions small and focused
- Handle errors with try-catch blocks
- Use camelCase for variable and function names
- Use PascalCase for class names
- Use UPPERCASE for constants
- Use descriptive and meaningful names
  
## Testing and Debugging

### Increased Name Character Limit

![image](https://github.com/user-attachments/assets/2f9e537a-8b66-44ad-8023-947ca0ae456f)

![image](https://github.com/user-attachments/assets/f90cad21-295e-46bf-a783-6eb67c486363)



### Empty lists not updating

![image](https://github.com/user-attachments/assets/b6694d72-32c5-41cf-80ce-f276ee18f0ef)
![image](https://github.com/user-attachments/assets/752edcd5-6692-4850-b08b-3d11aada4099)

![image](https://github.com/user-attachments/assets/549f5d94-8464-47e5-a1b5-f233b3e6b036)

### Empty lists can't be edited

![image](https://github.com/user-attachments/assets/e442649b-794c-48a4-b2b2-968b52050dcc)

![image](https://github.com/user-attachments/assets/789d2915-cffa-4e40-a795-7dbcde7ede2a)


## List of Names

### Variables

- selectedNHN: Storing the users NHN input for later use
- notFound: A variable for tracking how many of the patients don't have the users NHN input
- FILE: A constant refrence to the file being read by the program for the patient registry
- registry: The array being used to import and read the .json file data

### Functions

- savePatientRegistry: Saves the data from the registry array to the .json file
- inputNHN: Takes a user input of a number and looks for it in the registry
- showDetailedList: Shows a list of items based on the type given when called
- userEditAllergies: Allows the user to add, remove or change an allergy on the patients registry
- userEditOperations: Allows the user to add, remove or change an operation on the patients registry
- userEditMedications: Allows the user to add, remove or change a medication on the patients registry
- addFirstEntry: Prompts the user to add a first item to the list given when called
- editPatientInfo: The main menu for navigating between editing menus
- deletePatient: Confirms with the user and then deletes the patient currently being viewed
- drawTable: Logs the main menu
- showPatientProfile: Draws the patient profile table

## Comment Screenshots

![image](https://github.com/user-attachments/assets/70bb5d69-7b8a-4434-8676-a2f828052e7e)
![image](https://github.com/user-attachments/assets/06517686-32a7-4d5b-a737-7499484ec91a)
![image](https://github.com/user-attachments/assets/e80cfa75-8439-475f-8a1e-f54396ad1c67)
