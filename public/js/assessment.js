export function submission() {
    document.querySelector('#dynamic-form').addEventListener('submit', function(event) {
    event.preventDefault()
    const formData = new FormData(this)
    const responses = []

    formData.forEach((value, key) => {
        const labelEl = document.querySelector(`label[for="${key}"]`)
        const questionLabel = labelEl ? labelEl.innerText : ''
        responses.push({ question: questionLabel, answer: value })
        })
    })

    const assessmentId = document.getElementById('assessment-id').value
    fetch(`/assessments/submit/${assessmentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            assessment_id: assessmentId,
            responses
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}