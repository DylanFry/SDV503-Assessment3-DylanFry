// Importing Readline and FileSystem
const readline = require('readline')
const fs = require('fs')

// Readline setup
const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
})

// Loading .json file
const FILE = 'MOCK_DATA.json'
let registry = []
if (fs.existsSync(FILE)) {
    try {
        registry = JSON.parse(fs.readFileSync(FILE, 'utf8'))
    } catch {
        registry = []
    }
}

// Global variables
let selectedNHN
let currentPatientAllergies
let currentPatientIllness
let currentPatientMedications
let currentPatientOperations

// Saving to .json file
function savePatientRegistry() {
    fs.writeFileSync(FILE, JSON.stringify(registry, null, 2))
}

// NHN input
function inputNHN() {
    let notFound = 0
    rl.question("Enter Patient NHN:", patientID => {
        registry.forEach(patient => {
            if(patient.NHN == patientID) {
                selectedNHN = patient.NHN 
                console.clear()
                drawTable()
            } else {
                notFound ++
            }
        })
        if(notFound === registry.length) {
            console.clear()
            console.log("No patient found with NHN: ", patientID)
            inputNHN()
        }
    })
}

// Showing list
function showDetailedList(type) {
    switch(type) {
        case "allergies":
            if(currentPatientAllergies != null) {
                console.clear()
                drawTable()
                console.log("Allergies: \n", currentPatientAllergies.join("\n"))
            } else {
                console.clear()
                drawTable()
                console.log("No allergies to display")
            }
            break
        case "operations":
            if(currentPatientOperations != null) {
                console.clear()
                drawTable()
                console.log("Operations: \n", currentPatientOperations.join("\n"))
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
                console.log("Medications: \n", currentPatientMedications.join("\n"))
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
                console.log("Illnesses: \n", currentPatientIllness.join("\n"))
            } else {
                console.clear()
                drawTable()
                console.log("No illnesses to display")
            }
            break
        default:
            console.log("No such item in registry.")
            drawTable()
    }
}

// Data editing for allergies
function userEditAllergies() {
    console.clear()
    console.log(currentPatientAllergies.join("\n"))
    rl.question("\n1. Add\n2. Delete\n3. Change\nb. Back\nq. Quit\nWhat would you like to do: ", choice => {
        switch(choice) {
            case "1":
                rl.question("Allergy to add: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            patient.allergies.push(input)
                            savePatientRegistry()
                            console.clear()
                            drawTable()
                            console.log(`${input} successfully added`)
                        }
                    })
                })
                break
            case "2":
                rl.question("Allergy to delete: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.allergies.includes(input)) {
                                patient.allergies.splice(patient.allergies.indexOf(input), 1)
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`${input} successfully removed`)
                            } else {
                                console.clear()
                                editPatientInfo()
                                console.log("Allergy not found")
                            }
                        }
                    })
                })
                break
            case "3":
                rl.question("Allergy to change: ", input => {
                    registry.forEach((patient) => {
                        if(patient.NHN === selectedNHN) {
                            if(patient.allergies.includes(input)) {
                                rl.question("Change allergy to: ", changeTo => {
                                    patient.allergies.splice(patient.allergies.indexOf(input), 1, changeTo)
                                    savePatientRegistry()
                                    console.clear()
                                    drawTable()
                                    console.log(`${input} successfully changed to ${changeTo}`)
                                })
                            } else {
                                console.clear()
                                editPatientInfo()
                                console.log("Allergy not found")
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
                userEdit()
                console.log("Please select a valid option")
        }
    })
}

// Data editing for Operations
function userEditOperations() {
    console.clear()
    console.log(currentPatientOperations.join("\n"))
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
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`${input} successfully removed`)
                            } else {
                                console.clear()
                                editPatientInfo()
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
                                editPatientInfo()
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
                userEdit()
                console.log("Please select a valid option")
        }
    })
}

// Data editing for illness
function userEditIllnesses() {
    console.clear()
    console.log(currentPatientIllness.join("\n"))
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
                                savePatientRegistry()
                                console.clear()
                                drawTable()
                                console.log(`${input} successfully removed`)
                            } else {
                                console.clear()
                                editPatientInfo()
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
                                editPatientInfo()
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
                userEdit()
                console.log("Please select a valid option")
        }
    })
}

// Data editing for Operations
function userEditMedications() {
    console.clear()
    console.log(currentPatientMedications.join("\n"))
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
                userEdit()
                console.log("Please select a valid option")
        }
    })
}

// Editing patient info menu
function editPatientInfo() {
    console.clear()
    showPatientProfile()
    rl.question("\nInformation to edit:\n1. First Name\n2. Surname\n3. Allergies\n4. Past Operations\n5. Known Illnesses\n6. Medications\n7. Clinic\nb. Back to profile\nq. Quit\n", choice => {
        switch(choice) {
            case "1":
                registry.forEach((patient) => {
                    if(patient.NHN === selectedNHN) {
                        rl.question("Change first name to: ", changeTo => {
                                patient.firstName = changeTo
                                    savePatientRegistry()
                                    console.clear()
                                    drawTable()
                                    console.log(`First name successfully changed to ${changeTo}`)
                        })
                    }
                })
                break
            case "2":
                registry.forEach((patient) => {
                    if(patient.NHN === selectedNHN) {
                        rl.question("Change surname to: ", changeTo => {
                                patient.lastName = changeTo
                                    savePatientRegistry()
                                    console.clear()
                                    drawTable()
                                    console.log(`Surname successfully changed to ${changeTo}`)
                        })
                    }
                })
                break
            case "3":
                console.log(currentPatientAllergies.join("\n"))
                userEditAllergies()
                break
            case "4":
                console.log(currentPatientOperations.join("\n"))
                userEditOperations()
                break
            case "5":
                userEditIllnesses()
                break
            case "6":
                userEditMedications()
                break
            case "7":
                registry.forEach((patient) => {
                    if(patient.NHN === selectedNHN) {
                        rl.question("Change clinic to: ", changeTo => {
                                patient.clinic = changeTo
                                    savePatientRegistry()
                                    console.clear()
                                    drawTable()
                                    console.log(`Clinic successfully changed to ${changeTo}`)
                        })
                    }
                })
                break
            case "b":
                console.clear()
                drawTable()
                break
            case "q":
                console.clear()
                console.log("Goodbye!")
                rl.close()
                break
            default:
                console.clear()
                editPatientInfo()
                console.log("Please enter a valid option")
        }
    })
}

// Deleting patient profile
function deletePatient() {
    console.clear()
    console.log("Are you sure you want to delete patient: ", selectedNHN)
    rl.question("'y' to confirm", choice => {
        if(choice === "y") {
            registry.forEach((patient, idx) => {
                if(patient.NHN === selectedNHN) {
                    registry.splice(idx, 1)
                    savePatientRegistry()
                    console.clear()
                    console.log("Patient Successfully Deleted")
                    inputNHN()
                }
            })
        } else {
            drawTable()
            console.log("Failed to delete patient")
        }
    })
}

// Draw patient table
function drawTable() {
    showPatientProfile()
    rl.question("\n1. Edit\n2. Delete\n3. View allergies\n4. View past operations\n5. View known illnesses\n6. View medications\nb. Back to NHN\nq. Quit\n\n", selection => {
        switch(selection) {
            case "1":
                editPatientInfo()
                break
            case "2":
                deletePatient()
                break
            case "3":
                showDetailedList("allergies")
                break
            case "4":
                showDetailedList("operations")
                break
            case "5":
                showDetailedList("illnesses")
                break
            case "6":
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

function showPatientProfile() {
    console.log("\nNHN       | Surname   | First Name | Date of birth | Sex | Allergies | Past Operations | Known Illnesses | Medications | Clinic ")
    console.log("----------|-----------|------------|---------------|-----|-----------|-----------------|-----------------|-------------|--------")
    registry.forEach(patient => {
        if(patient.NHN === selectedNHN) {
            // Setting true/false values for table
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

            let row =
                String(patient.NHN).padEnd(10) + "| " +
                patient.lastName.padEnd(10) + "| " +
                patient.firstName.padEnd(11) + "| " +
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

