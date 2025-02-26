# Sentio

Sentio is a web application designed to assist psychologists by automating tasks and facilitating AI-assisted diagnosis. It enables psychologists to generate patient assessments dynamically, send them via links, and receive results efficiently. Additionally, it thoroughly analyzes patient-filled assessments and generates detailed reports. Sentio also incorporates the History of Present Illness(HOPI) in psychology/psychiatry questionnaire to enhance diagnostic accuracy.

## Features

- **User Authentication**: Secure login and signup functionality for psychologist.
- **Patient Management**: View, add, update, and delete patient records.
- **Assessment Generation**: AI-generated dynamic assessments based on psychologist input.
- **Assessment Submission**: Patients can fill assessments via a generated link.
- **Results Processing**: Psychologists receive patient responses for further analysis.
- **Email Notifications**: Notifications sent to patients with assessment links.

## Tech Stack

- **Backend**: Node.js (Express.js), PostgreSQL (Supabase), Redis (Upstash)
- **Frontend**: EJS, Bootstrap, JavaScript
- **AI Integration**: Google Generative AI API
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Caching**: Redis
- **Email Service**: Nodemailer

## Directory Structure

```
├── app.js
├── config/
│   ├── db.js
│   └── redis.js
├── controllers/
│   ├── assessments.js
│   ├── auth.js
│   ├── information.js
│   └── patient.js
├── middlewares/
│   ├── authcheck.js
│   └── authentication.js
├── public/
│   ├── css/
│   ├── js/
├── routes/
│   ├── assessments.js
│   ├── auth.js
│   ├── information.js
│   └── patients.js
├── services/
│   ├── assessment_analysis.js
│   ├── assessment_creation.js
│   └── email.js
├── views/
│   ├── assessment.ejs
│   ├── home.ejs
│   ├── patient.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── signup.ejs
├── package.json
├── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL database (Supabase)
- Redis (Upstash recommended)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/sentio.git
   cd sentio
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following variables:
   ```ini
   DATABASE_URL=your_supabase_postgres_url
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   UPSTASH_REDIS_URL=your_redis_url
   ```
4. Start the server:
   ```sh
   npm start
   ```
5. Open the app at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - User login

### Patients
- `POST /patients/add-patient` - Add a new patient
- `GET /patients/` - Get all patients
- `PUT /patients/:id` - Update patient details
- `DELETE /patients/:id` - Delete a patient
- `GET /patients/details/:id` - Get a single patient's details

### Assessments
- `POST /assessments/generate` - Generate an assessment
- `POST /assessments/submit/:id` - Submit assessment responses

### HOPI & Reports
- `GET /information/:id/hopi` - View HOPI form for a patient
- `POST /information/:id/hopi` - Fill HOPI form for a patient
- `PUT /information/:id/hopi` - Update HOPI form for a patient
- `GET /information/:id/report` - View AI-generated report for a patient

## Future Steps

- **Enhance AI capabilities**: Improve assessment generation and analysis with more advanced AI models.
- **Data visualization**: Implement charts and reports for better insights.
- **User roles and permissions**: Introduce different access levels for psychologists and assistants.
- **Mobile support**: Optimize the UI for mobile devices.
- **Integration with EHR systems**: Connect with electronic health records for seamless data management.
- **Expand AI Chatbot Features**: Enable conversational AI to provide therapy suggestions, track patient progress, and offer mental health resources.
- **Multilingual Support**: Implement language options for better accessibility.
- **HIPAA Compliance**: Ensure data privacy and security meet medical industry standards.


---

_Developed for the Girl Hackathon 2025 - Medicine Track_ 🚀
