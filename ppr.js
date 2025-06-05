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
                drawTable()
            } else {
                notFound ++
            }
        })
        if(notFound === registry.length) {
            console.log("No patient found with NHN: ", patientID)
            inputNHN()
        }
    })
}

// Showing list
function showDetailedList() {

}

// Editing patient info
function editPatientInfo() {

}

// Deleting patient profile
function deletePatient() {

}

// Draw patient table
function drawTable() {
    console.clear()
    console.log("\nNHN       | Surname   | First Name | Date of birth | Sex | Allergies | Past Operations | Known Illnesses | Medications | Clinic ")
    console.log("----------|-----------|------------|---------------|-----|-----------|-----------------|-----------------|-------------|--------")
    registry.forEach(patient => {
        if(patient.NHN === selectedNHN) {
            // Setting true/false values for table
            if(patient.illnesses !== "null") {
                hasIllness = true
            } else {
                hasIllness = false
            }

            if(patient.allergies !== "null") {
                hasAllergies = true
            } else {
                hasAllergies = false
            }
            
            if(patient.meds !== "null") {
                hasMeds = true
            } else {
                hasMeds = false
            }

            if(patient.pastOps !== "null") {
                hasPastOps = true
            } else {
                hasPastOps = false
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
    rl.question("\n1. Edit\n2. Delete\n3. View allergies\n4. View past operations\n6. View medications\n7. View known illnesses\nb. Back to NHN\nq. Quit\n\n", selection => {
        switch(selection) {
            case "1":
                break
            case "2":
                break
            case "3":
                break
            case "4":
                break
            case "5":
                break
            case "6":
                break
            case "7":
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
                console.log("Please enter a valid option")
                drawTable()
        }
    })
}

inputNHN()