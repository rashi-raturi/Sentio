let selectedPatientId = null
let selectedPatientEmail = null

export function openModal(id, name, email) {
    selectedPatientId = id
    selectedPatientEmail = email
    document.getElementById("patientName").textContent = "For: " + name
    document.getElementById("patientEmail").value = email
    $('#assessmentModal').modal('show')
}

export function closeModal() {
    $('#assessmentModal').modal('hide')
}

export async function sendAssessment(userId) {
    const assessmentName = document.getElementById("assessmentName").value
    const patientEmail = document.getElementById("patientEmail").value
    if (!assessmentName) {
    alert("Please enter an assessment name.")
    return
    }

    setTimeout(() => {
    document.getElementById("successMessage").style.display = "block"
    setTimeout(() => {
        closeModal()
        document.getElementById("successMessage").style.display = "none"
    }, 2000)
    }, 2000)

    const response = await fetch("/assessments/generate-assessment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assessment_name: assessmentName, patient_id: selectedPatientId, patient_email: patientEmail, patient_name: document.getElementById("patientName").textContent.split(": ")[1], user_id: userId })
    })

    const data = await response.json()
    if (!response.ok) {
    alert(data.message)
    }
}

export function filterPatients() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase()
    const patients = document.querySelectorAll("#patientList .list-group-item")

    patients.forEach(patient => {
        const name = patient.querySelector("span").textContent.toLowerCase()
        if (name.includes(searchTerm)) {
            patient.style.display = ""
        } else {
            patient.style.display = "none"
        }
    })
}

export function applyFilter() {
    const diagnosis = document.getElementById("diagnosisFilter").value.toLowerCase()
    const gender = document.getElementById("genderFilter").value.toLowerCase()
    const patients = document.querySelectorAll("#patientList .list-group-item")

    patients.forEach(patient => {
        const patientDiagnosis = patient.getAttribute("data-diagnosis").toLowerCase()
        const patientGender = patient.getAttribute("data-gender").toLowerCase()
        if ((diagnosis === "" || patientDiagnosis.includes(diagnosis)) && (gender === "" || patientGender === gender)) {
            patient.style.display = ""
        } else {
            patient.style.display = "none"
        }
    })

    $('#filterModal').modal('hide')
}

export function clearFilter() {
    document.getElementById("diagnosisFilter").value = ""
    document.getElementById("genderFilter").value = ""
    const patients = document.querySelectorAll("#patientList .list-group-item")
    patients.forEach(patient => {
        patient.style.display = ""
    })
    $('#filterModal').modal('hide')
}

export async function addPatient(userId) {
    const name = document.getElementById("patientNameInput").value
    const email = document.getElementById("patientEmailInput").value
    const phone = document.getElementById("patientPhoneInput").value
    const dateOfBirth = document.getElementById("patientDOBInput").value
    const contactInfo = { email, phone }
    const diagnosis = document.getElementById("patientDiagnosisInput").value
    const gender = document.getElementById("patientGenderInput").value

    if (!name || !email || !gender || !dateOfBirth || !phone) {
        alert("Please fill in all mandatory fields (Name, Email, Gender, Date of Birth, and Phone).")
        return
    }

    const response = await fetch("/patients/add-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ psychologist_id: userId, full_name: name, date_of_birth: dateOfBirth, gender, contact_info: contactInfo, diagnosis })
    })

    const data = await response.json()
    alert(data.message)
    $('#addPatientModal').modal('hide')
    location.reload()
}

export function calculateAge(dob) {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

export function showPatientDetails(name, email, phone, dob, gender, diagnosis) {
    document.getElementById("patientDetailName").textContent = name
    document.getElementById("patientDetailEmail").textContent = email
    document.getElementById("patientDetailPhone").textContent = phone
    document.getElementById("patientDetailDOB").textContent = dob
    document.getElementById("patientDetailAge").textContent = calculateAge(dob)
    document.getElementById("patientDetailGender").textContent = gender
    document.getElementById("patientDetailDiagnosis").textContent = diagnosis
    $('#patientDetailsModal').modal('show')
}