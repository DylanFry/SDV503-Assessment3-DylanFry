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

// Saving to .json file
function savePatientRegistry() {
    fs.writeFileSync(FILE, JSON.stringify(registry, null, 2))
}

// NHN input
function inputNHN() {
    rl.question("Enter Patient NHN:", patientID => {
        registry.forEach(patient, idx => {
            if(patient.NHN === patientID) {
                console.log("OO")
            } else {
                console.log("MMM")
            }
        })
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

}

console.log(registry)
inputNHN()