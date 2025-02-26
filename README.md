# Sentio

Sentio is a web application designed to assist psychologists by automating tasks and facilitating AI-assisted diagnosis. It enables psychologists to generate patient assessments dynamically, send them via links or QR codes, and receive results efficiently.

## Features

- **User Authentication**: Secure login and signup functionality.
- **Patient Management**: View, add, update, and delete patient records.
- **Assessment Generation**: AI-generated dynamic assessments based on psychologist input.
- **Assessment Submission**: Patients can fill assessments via a generated link.
- **Results Processing**: Psychologists receive patient responses for further analysis.
- **Email Notifications**: Notifications sent to patients with assessment links.

## Tech Stack

- **Backend**: Node.js (Express.js), PostgreSQL (Supabase), Sequelize ORM, Redis (Upstash)
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

## License

This project is licensed under the MIT License.

---

_Developed for the Girl Hackathon 2025 - Medicine Track_ 🚀
