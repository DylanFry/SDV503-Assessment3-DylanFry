// Importing Readline and FileSystem
const readline = require('readline')
const fs = require('fs')
const { use } = require('react')

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

// Ask user what to do to data
function userEdit() {
    rl.question("\n1. Add\n2. Delete\n3. Change\nb. Back\nq. Quit\nWhat would you like to do: ", choice => {
        switch(choice) {
            case "1":
                return "add"
            case "2":
                return "del"
            case "3":
                return "change"
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

// Editing patient info
function editPatientInfo() {
    showPatientProfile()
    rl.question("\nInformation to edit:\n1. First Name\n2. Surname\n3. Allergies\n4. Past Operations\n5. Known Illnesses\n6. Medications\n7. Clinic\nb. Back to profile\nq. Quit", choice => {
        switch(choice) {
            case "1":
                break
            case "2":
                break
            case "3":
                userEdit()
                break
            case "4":
                userEdit()
                break
            case "5":
                userEdit()
                break
            case "6":
                userEdit()
                break
            case "7":
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

