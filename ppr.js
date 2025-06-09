// NOTE - Any repetitive functions or code lines have not been explained multiple times

// Importing Readline and FileSystem modules
const readline = require('readline')
const fs = require('fs')

// Readline setup
const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
})

// Loading .json file
const FILE = 'MOCK_DATA.json'                                             // Define a .json file to read patient data from

let registry = []                                                                       // Declares a blank array to put the read patient data in

if (fs.existsSync(FILE)) {                                                        // Check if the .json file exists
    try {
        registry = JSON.parse(fs.readFileSync(FILE, 'utf8'))    // Read the .json file
    } catch {                                                                              //  If something goes wrong
        registry = []                                                                     // Make the registry variable blank
    }
}

// Global variables
let selectedNHN                                                                     // Storing the users NHN input for later use
let currentPatientAllergies                                                    // Storing the json files data in a global variable for future use
let currentPatientIllness                                                        // "
let currentPatientMedications                                               // "
let currentPatientOperations                                                 // "

// Saving to .json file
function savePatientRegistry() {
    fs.writeFileSync(FILE, JSON.stringify(registry, null, 2))   // Write array data into the .json file
}

// NHN input
function inputNHN() {
    let notFound = 0                                                                          // Declaring a variable that increases as each patient is checked for the input NHN number
    rl.question("Enter Patient NHN:", patientID => {                        // Asking user for NHN to search
        registry.forEach(patient => {                                                  // For each entry in the array
            if(patient.NHN == patientID) {                                             // If the entries NHN variable is the same as the users input
                selectedNHN = patient.NHN                                           // Set the global NHN to the user input
                console.clear()
                drawTable()                                                                     // Show the table for the selected NHN
            } else {                                                                                 // If an entry doesn't have a matching NHN
                notFound ++                                                                    // Increase the variable by one
            }
        })
        if(notFound === registry.length) {                                          // If the NHN check reaches the end of the registry and a match still hasn't been found
            console.clear()
            console.log("No patient found with NHN: ", patientID)   // Tell the user that their input can't be found
            inputNHN()                                                                        // Reprompt the user for input
        }
    })
}

// Showing list
function showDetailedList(type) {                                                                   // Takes in a list type when the function is called and shows the corresponding list if it can be found
    switch(type) {
        case "allergies":
            if(currentPatientAllergies != null) {                                                     // If the current list if not empty
                console.clear()
                drawTable()
                console.log("Allergies: \n-", currentPatientAllergies.join("\n- "))    // Show a list of the allergies in the patients information
            } else {                                                                                                 // Otherwise
                console.clear()
                drawTable()
                console.log("No allergies to display")                                            // Tell the user there is no list to display
            }
            break
        case "operations":
            if(currentPatientOperations != null) {
                console.clear()
                drawTable()
                console.log("Operations: \n-", currentPatientOperations.join("\n- "))
            } else {
                console.clear()
                drawTable()
                console.log("No operations to display")
            }
            break
        case "medications":
            if(currentPatientMedications != null) {
                console.clear()
                drawTable()
                console.log("Medications: \n-", currentPatientMedications.join("\n- "))
            } else {
                console.clear()
                drawTable()
                console.log("No medications to display")
            }
            break
        case "illnesses":
            if(currentPatientIllness != null) {
                console.clear()
                drawTable()
                console.log("Illnesses: \n-", currentPatientIllness.join("\n- "))
            } else {
                console.clear()
                drawTable()
                console.log("No illnesses to display")
            }
            break
        default:
            console.log("No such item in registry.")                                             // If the list type is somehow incorrect, tell the user that no list can be displayed
            drawTable()                                                                                          // Reload the table
    }
}

// Data editing for allergies
function userEditAllergies() {
    console.clear()

    // List the patients allergies
    console.log("Allergies:\n-", currentPatientAllergies.join("\n- "))

    rl.question("\n1. Add\n2. Delete\n3. Change\nb. Back\nq. Quit\nWhat would you like to do: ", choice => {    // Ask the user how they want to edit the data
        switch(choice) {
            case "1":                                                                                                                                                       // If the user chooses "1. Add"
                rl.question("Allergy to add: ", input => {                                                                                                 // Ask them what they want to add
                    registry.forEach((patient) => {                                                                                                            // Find the patient in the registry
                        if(patient.NHN === selectedNHN) {
                            patient.allergies.push(input)                                                                                                      // Add the users input to the allergies list of the patient
                            savePatientRegistry()                                                                                                                 // Save the array to the registry
                            console.clear()
                            drawTable()
                            console.log(`${input} successfully added`)                                                                               // Tell the user their input was added successfully
                        }
                    })
                })
                break
            case "2":                                                                                                                                                      // If the user chooses "2. Delete"
                rl.question("Allergy to delete: ", input => {                                                                                             // Ask the user for the name of the allergy they want to delete
                    registry.forEach((patient) => {                                                                                                            // Find the patient in the registry
                        if(patient.NHN === selectedNHN) {
                            if(patient.allergies.includes(input)) {                                                                                         // If the patient has the input allergy
                                patient.allergies.splice(patient.allergies.indexOf(input), 1)                                                  //  Delete it from the array
                                if(patient.allergies.length <= 0) {                                                                                            // Checks if the array has become empty
                                    patient.allergies = null                                                                                                        // If it is, set the value to null instead
                                }
                                savePatientRegistry()                                                                                                             // Save the data to the registry
                                console.clear()
                                drawTable()
                                console.log(`${input} successfully removed`)                                                                       // Tell the user the allergy was successfully removed
                            } else {                                                                                                                                         // If the allergy couldn't be found
                                console.clear()
                                editPatientInfo()                                                                                                                      // Take the user back to the edit item selection menu
                                console.log("Allergy not found")                                                                                            // Let the user know their input couldn't be found
                            }
                        }
                    })
                })
                break
            case "3":                                                                                                                                                      // If the user chooses "3. Change"
                rl.question("Allergy to change: ", input => {                                                                                           // Ask them for the name of the allergy they want to change
                    registry.forEach((patient) => {                                                                                                            // Find the patient in the registry
                        if(patient.NHN === selectedNHN) {
                            if(patient.allergies.includes(input)) {                                                                                         // If the patient has the users input in the allergies
                                rl.question("Change allergy to: ", changeTo => {                                                                    // Ask them what they want to change the allergy to
                                    patient.allergies.splice(patient.allergies.indexOf(input), 1, changeTo)                             // Change the allergy to the users input
                                    savePatientRegistry()                                                                                                         // Save the data to the registry
                                    console.clear()
                                    drawTable()
                                console.log(`${input} successfully changed to ${changeTo}`)                                             // Let the user know their selected allergy has been changed
                                })
                            } else {                                                                                                                                        // If the allergy can't be found
                                console.clear()
                                editPatientInfo()                                                                                                                      // Take the user back to the edit item selection menu
                                console.log("Allergy not found")                                                                                            // Tell the user their input couldn't be found
                            }
                        }
                    })
                })
                break
            case "b":                                                                                                                                                       // If the user chooses "b. Back"
                console.clear()
                editPatientInfo()                                                                                                                                       // Take them back to the edit item selection menu
                break
            case "q":                                                                                                                                                       // If the user chooses "q. Quit"
                console.clear()
                console.log("Goodbye!")                                                                                                                          // Close the application
                rl.close()
                break
            default:                                                                                                                                                         // If the user's input is not one of the valid options
                console.clear()
                userEditAllergies()                                                                                                                                   // Re-prompt the user for their choice
                console.log("Please select a valid option")                                                                                            // Tell the user their input was invalid 
        }
    })
}

// Data editing for Operations
function userEditOperations() {
    console.clear()

    // Display list of patient operations
    console.log("Past Operations:\n-", currentPatientOperations.join("\n- "))

    rl.question("\n1. Add\n2. Delete\n3. Change\nb. Back\nq. Quit\nWhat would you like to do: ", choice => {
        switch(choice) {
            case "1":
                rl.question("Operation to add: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            patient.pastOps.push(input)
                            savePatientRegistry()
                            console.clear()
                            drawTable()
                            console.log(`${input} successfully added`)
                        }
                    })
                })
                break
            case "2":
                rl.question("Operation to delete: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.pastOps.includes(input)) {
                                patient.pastOps.splice(patient.pastOps.indexOf(input), 1)
                                if(patient.pastOps.length <= 0) {
                                    patient.pastOps = null
                                }
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`${input} successfully removed`)
                            } else {
                                console.clear()
                                userEditAllergies()
                                console.log("Operation not found")
                            }
                        }
                    })
                })
                break
            case "3":
                rl.question("Operation to change: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.pastOps.includes(input)) {
                                rl.question("Change operation to: ", changeTo => {
                                    patient.pastOps.splice(patient.pastOps.indexOf(input), 1, changeTo)
                                    savePatientRegistry()
                                    console.clear()
                                    drawTable()
                                    console.log(`${input} successfully changed to ${changeTo}`)
                                })
                            } else {
                                console.clear()
                                userEditAllergies()
                                console.log("Operation not found")
                            }
                        }
                    })
                })
                break
            case "b":
                console.clear()
                editPatientInfo()
                break
            case "q":
                console.clear()
                console.log("Goodbye!")
                rl.close()
                break
            default:
                console.clear()
                userEditOperations() 
                console.log("Please select a valid option")
        }
    })
}

// Data editing for illness
function userEditIllnesses() {
    console.clear()

    // List the patients known illnesses
    console.log("Known illnesses:\n-", currentPatientIllness.join("\n- "))

    rl.question("\n1. Add\n2. Delete\n3. Change\nb. Back\nq. Quit\nWhat would you like to do: ", choice => {
        switch(choice) {
            case "1":
                rl.question("Illness to add: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            patient.illnesses.push(input)
                            savePatientRegistry()
                            console.clear()
                            drawTable()
                            console.log(`${input} successfully added`)
                        }
                    })
                })
                break
            case "2":
                rl.question("Illness to delete: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.illnesses.includes(input)) {
                                patient.illnesses.splice(patient.illnesses.indexOf(input), 1)
                                if(patient.illnesses.length <= 0) {
                                    patient.illnesses = null
                                }
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`${input} successfully removed`)
                            } else {
                                console.clear()
                                userEditIllnesses()
                                console.log("Illness not found")
                            }
                        }
                    })
                })
                break
            case "3":
                rl.question("Illness to change: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.illnesses.includes(input)) {
                                rl.question("Change illness to: ", changeTo => {
                                    patient.illnesses.splice(patient.illnesses.indexOf(input), 1, changeTo)
                                    savePatientRegistry()
                                    console.clear()
                                    drawTable()
                                    console.log(`${input} successfully changed to ${changeTo}`)
                                })
                            } else {
                                console.clear()
                                userEditIllnesses()
                                console.log("Illness not found")
                            }
                        }
                    })
                })
                break
            case "b":
                console.clear()
                editPatientInfo()
                break
            case "q":
                console.clear()
                console.log("Goodbye!")
                rl.close()
                break
            default:
                console.clear()
                userEditIllnesses()
                console.log("Please select a valid option")
        }
    })
}

// Data editing for Operations
function userEditMedications() {
    console.clear()

    // List patient medication
    console.log("Medications:\n-", currentPatientMedications.join("\n- "))

    rl.question("\n1. Add\n2. Delete\n3. Change\nb. Back\nq. Quit\nWhat would you like to do: ", choice => {
        switch(choice) {
            case "1":
                rl.question("Medication to add: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            patient.meds.push(input)
                            savePatientRegistry()
                            console.clear()
                            drawTable()
                            console.log(`${input} successfully added`)
                        }
                    })
                })
                break
            case "2":
                rl.question("Medication to delete: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.meds.includes(input)) {
                                patient.meds.splice(patient.meds.indexOf(input), 1)
                                if(patient.meds.length <= 0) {
                                    patient.meds = null
                                }
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`${input} successfully removed`)
                            } else {
                                console.clear()
                                editPatientInfo()
                                console.log("Medication not found")
                            }
                        }
                    })
                })
                break
            case "3":
                rl.question("Medication to change: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.meds.includes(input)) {
                                rl.question("Change medication to: ", changeTo => {
                                    patient.meds.splice(patient.meds.indexOf(input), 1, changeTo)
                                    savePatientRegistry()
                                    console.clear()
                                    drawTable()
                                    console.log(`${input} successfully changed to ${changeTo}`)
                                })
                            } else {
                                console.clear()
                                editPatientInfo()
                                console.log("Medication not found")
                            }
                        }
                    })
                })
                break
            case "b":
                console.clear()
                editPatientInfo()
                break
            case "q":
                console.clear()
                console.log("Goodbye!")
                rl.close()
                break
            default:
                console.clear()
                userEditMedications()
                console.log("Please select a valid option")
        }
    })
}

// Adding an entry to an empty list
function addFirstEntry(type) {
    switch(type) {
        case "allergy": 
            rl.question("Allergy to add: ", input => {
                registry.forEach((patient) => {
                    if(patient.NHN === selectedNHN) {
                        patient.allergies = [input]
                        savePatientRegistry()
                        console.clear()
                        drawTable()
                        console.log(`${input} successfully added`)
                    }
                })
            })
            break

        case "operation": 
            rl.question("Operation to add: ", input => {
                registry.forEach((patient) => {
                    if(patient.NHN === selectedNHN) {
                        patient.pastOps = [input]
                        savePatientRegistry()
                        console.clear()
                        drawTable()
                        console.log(`${input} successfully added`)
                    }
                })
            })
            break

        case "meds": 
            rl.question("Medication to add: ", input => {
                registry.forEach((patient) => {
                    if(patient.NHN === selectedNHN) {
                        patient.med = [input]
                        savePatientRegistry()
                        console.clear()
                        drawTable()
                        console.log(`${input} successfully added`)
                    }
                })
            })
            break

        case "illness": 
            rl.question("Illness to add: ", input => {
                registry.forEach((patient) => {
                    if(patient.NHN === selectedNHN) {
                        patient.illnesses = [input]
                        savePatientRegistry()
                        console.clear()
                        drawTable()
                        console.log(`${input} successfully added`)
                    }
                })
            })
            break
        
        default:
            console.clear()
            editPatientInfo()
            console.log("No valid data type found")
    }
}

// Editing patient info menu
function editPatientInfo() {
    console.clear()
    showPatientProfile()                                                                                                            // Display the patient information table

    // Prompt the user for the information to edit
    rl.question("\nInformation to edit:\n1. First Name\n2. Surname\n3. Allergies\n4. Past Operations\n5. Known Illnesses\n6. Medications\n7. Clinic\nb. Back to profile\nq. Quit\n", choice => {
        switch(choice) {
            case "1":                                                                                                                                                                           
                registry.forEach((patient) => {                                                                               // Find the patient in the registry
                    if(patient.NHN === selectedNHN) {
                        rl.question("Change first name to: ", changeTo => {                                     // Ask the user what they want to change the name to
                                patient.firstName = changeTo                                                               // Change the old name to the new name
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`First name successfully changed to ${changeTo}`)   // Tell the user the name was successfully changed
                        })
                    }
                })
                break
            case "2":
                registry.forEach((patient) => {                                                                                 // Find the patient in the registry
                    if(patient.NHN === selectedNHN) {
                        rl.question("Change surname to: ", changeTo => {                                          // Ask the user what they want to change the surname to
                                patient.lastName = changeTo                                                                   // Change the old surname to the new name
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`Surname successfully changed to ${changeTo}`)          // Tell the user the surname was successfully updated
                        })
                    }
                })
                break
            case "3":
                if(currentPatientAllergies != null) {                                                                           // If the list is not empty
                    userEditAllergies()                                                                                                 // Go to the edit page
                } else {                                                                                                                        // Otherwise
                    addFirstEntry("allergy")                                                                                        // Go to the first entry page
                }
                break
            case "4":
                if(currentPatientOperations != null) {
                    userEditOperations()
                } else {
                    addFirstEntry("operation")
                }
                break
            case "5":
                if(currentPatientIllness !== null) {
                    userEditIllnesses()
                } else {
                    addFirstEntry("illness")
                }
                break
            case "6":
                if(currentPatientMedications !== null) {
                    userEditMedications()
                } else {
                    addFirstEntry("meds")
                }
                break
            case "7":
                registry.forEach((patient) => {                                                                             // Find the patient in the registry
                    if(patient.NHN === selectedNHN) {
                        rl.question("Change clinic to: ", changeTo => {                                           // Ask the user what they want to change the clinic name to
                                patient.clinic = changeTo                                                                    // Change the old clinic to the new clinic
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`Clinic successfully changed to ${changeTo}`)          // Tell the user that the clinic was renamed successfully
                        })
                    }
                })
                break
            case "b":
                console.clear()
                drawTable()                                                                                                          // Take the user back to the table page
                break
            case "q":
                console.clear()
                console.log("Goodbye!")                                                                                       // Close the application
                rl.close()
                break
            default:
                console.clear()
                editPatientInfo()                                                                                                    // Re-prompt the user form input
                console.log("Please enter a valid option")                                                          // Tell the user that their input was invalid
        }
    })
}

// Deleting patient profile
function deletePatient() {
    console.clear()
    console.log("Are you sure you want to delete patient: ", selectedNHN)               // Confirms that the user really wanted to delete the patient
    rl.question("'y' to confirm (any other key to cancel): ", choice => {                        // Require "y" to be input to delete, otherwise, takes the user back to the table page
        if(choice === "y") {                                                                                                // If the user confirms their decision
            registry.forEach((patient, idx) => {                                                                  // Find the patient in the registry
                if(patient.NHN === selectedNHN) {
                    registry.splice(idx, 1)                                                                               // Remove the patient
                    savePatientRegistry()                                                                             // Save the changes to the registry
                    console.clear()
                    console.log("Patient Successfully Deleted")                                         // Let the user know the deletion was successful
                    inputNHN()                                                                                              // Take the user back to the NHN input screen
                }
            })
        } else {                                                                                                                 // If anything other than "y" is input
            drawTable()                                                                                                     // Take the user back to the table view
            console.log("Failed to delete patient")                                                          // Tell the user the deletion failed
        }
    })
}

// Patient table screen
function drawTable() {
    showPatientProfile()                                    // Draw the patient information table

    // Ask the user what they want to do
    rl.question("\n1. Edit\n2. Delete Patient\n3. View allergies\n4. View past operations\n5. View known illnesses\n6. View medications\nb. Back to NHN\nq. Quit\n\n", selection => {
        switch(selection) {
            case "1":                                                // If the user chooses "1. Edit", take them to the edit page
                editPatientInfo()
                break
            case "2":                                                // If the user chooses "2. Delete", take them to the deletion page
                deletePatient()
                break
            case "3":                                                // If the user chooses "3. View allergies", take them to the allergy list page
                showDetailedList("allergies")
                break
            case "4":                                                // If the user chooses "4. View past operations", take them to the allergy list page
                showDetailedList("operations")
                break
            case "5":                                                // If the user chooses "5. View known illnesses", take them to the allergy list page
                showDetailedList("illnesses")
                break
            case "6":                                                // If the user chooses "6. View medications", take them to the allergy list page
                showDetailedList("medications")
                break
            case "b":
                console.clear()
                inputNHN()
                break
            case "q":
                console.clear()
                console.log("Goodbye!")
                rl.close()
                break
            default:
                console.clear()
                drawTable()
                console.log("Please enter a valid option")
        }
    })
}

// Drawing patient table
function showPatientProfile() {
    console.log("--- Patient Registry System ---")                                                                                                                                                                          // App title
    console.log("\nNHN       | Surname         | First Name      | Date of birth | Sex | Allergies | Past Operations | Known Illnesses | Medications | Clinic ")                 // Headings
    console.log("----------|-----------------|-----------------|---------------|-----|-----------|-----------------|-----------------|-------------|--------") // Seperaters
    registry.forEach(patient => {
        if(patient.NHN === selectedNHN) {

            // Setting true/false values for allergy, operation, illnesses and medication entries on table
            if(patient.illnesses !== null) {
                hasIllness = true
                currentPatientIllness = patient.illnesses
            } else {
                hasIllness = false
                currentPatientIllness = null
            }

            if(patient.allergies !== null) {
                hasAllergies = true
                currentPatientAllergies = patient.allergies
            } else {
                hasAllergies = false
                currentPatientAllergies = null
            }
            
            if(patient.meds !== null) {
                hasMeds = true
                currentPatientMedications = patient.meds
            } else {
                hasMeds = false
                currentPatientMedications = null
            }

            if(patient.pastOps !== null) {
                hasPastOps = true
                currentPatientOperations = patient.pastOps
            } else {
                hasPastOps = false
                currentPatientOperations = null
            }

            // Draw the table
            let row =
                String(patient.NHN).padEnd(10) + "| " +
                patient.lastName.padEnd(16) + "| " +
                patient.firstName.padEnd(16) + "| " +
                patient.dateOfBirth.padEnd(14) + "| " +
                patient.sex.padEnd(4) + "| " +
                String(hasAllergies).padEnd(10) + "| " +
                String(hasPastOps).padEnd(16) + "| " +
                String(hasIllness).padEnd(16) + "| " +
                String(hasMeds).padEnd(12) + "| " +
                patient.clinic + "\n"
            console.log(row)
        }
    })
}

inputNHN()
