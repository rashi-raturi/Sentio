export function scheduleMeet() {
    const date = document.getElementById('meetingDate').value;
    const time = document.getElementById('meetingTime').value;
    if (date && time) {
        const dateTime = new Date(`${date}T${time}`);
        const endTime = new Date(dateTime.getTime() + 30 * 60000); // 30 minutes meeting

        const event = {
            'summary': 'Therapy Session - <%= patient.full_name %>',
            'description': 'Google Meet session with <%= patient.full_name %>.',
            'start': dateTime.toISOString(),
            'end': endTime.toISOString(),
            'attendees': [
                {'email': '<%= patient.contact_info.email %>'}
            ]
        };

        const eventDetails = encodeURIComponent(JSON.stringify(event));
        const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${event.summary}&dates=${dateTime.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${endTime.toISOString().replace(/-|:|\.\d\d\d/g, '')}&details=${event.description}&add=${event.attendees[0].email}`;

        window.open(calendarUrl, '_blank');
        $('#scheduleModal').modal('hide');
    } else {
        alert('Please select both date and time.');
    }
}

export function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

