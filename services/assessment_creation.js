const { GoogleGenerativeAI } = require("@google/generative-ai");
const redis = require('../config/redis')
require('dotenv').config()

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    systemInstruction: `You are an expert medical AI trained in clinical psychology and diagnostic assessments. Your task is to generate a structured clinical questionnaire in JSON format based on the given assessment name.

**Instructions:**  
- The questionnaire should be relevant to the specified assessment.  
- Include a diverse set of **questions** that evaluate the psychological condition.  
- Each question should have an appropriate **response type** (e.g., multiple-choice, scale, text).  
- Ensure medical accuracy and adherence to standard psychological practices.  
- Return the response **strictly in valid JSON format**.

**Input:**  
Assessment Name: "{assessment_name}"

**Output Format:**  
\`\`\`json
{
    "assessment_name": "{assessment_name}",
    "description": "A brief explanation of the purpose of this questionnaire.",
    "questions": [
        {
            "id": 1,
            "question": "Write the first question here.",
            "type": "multiple_choice",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
        },
        {
            "id": 2,
            "question": "Write the third question here.",
            "type": "text",
            "placeholder": "Describe your feelings about..."
        }
    ]
}
\`\`\`
`
})

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: "text/plain",
}

const create_assessment = async (assessment_name) => {
    const cacheKey = `assessment:${assessment_name}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
        return JSON.parse(cachedData)
    }

    const chatSession = model.startChat({ generationConfig })

    const result = await chatSession.sendMessage(`${assessment_name}`)
    const responseText = result.response.text()
    const jsonResponse = responseText.substring(responseText.indexOf('{'), responseText.lastIndexOf('}') + 1)
    const assessmentData = JSON.parse(jsonResponse)

    await redis.set(cacheKey, JSON.stringify(assessmentData), 'EX', 3600) 

    return assessmentData
}

module.exports = create_assessment