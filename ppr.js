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
    console.log("\nNHN       | Surname   | First Name | Date of birth | Sex | Allergies | Past Operations | Clinics | Medications | Known Ilnesses")
    console.log("----------|-----------|------------|---------------|-----|-----------|-----------------|---------|-------------|---------------")
    registry.forEach(patient => {
        if(patient.NHN === selectedNHN) {
            let row =
                String(patient.NHN).padEnd(10) + "| " +
                patient.lastName.padEnd(10) + "| " +
                patient.firstName.padEnd(11) + "| " +
                patient.dateOfBirth.padEnd(14) + "| " +
                patient.sex.padEnd(4) + "| " +
                String(patient.allergies).padEnd(10) + "| " +
                String(patient.pastOps).padEnd(16) + "| " +
                String(patient.clinics).padEnd(8) + "| " +
                String(patient.meds).padEnd(12) + "| " +
                String(patient.illnesses).padEnd(10) + "\n"
            console.log(row)
            rl.close()
        }
    })
}

inputNHN()