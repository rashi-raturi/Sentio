const postgres = require('postgres')
const dotenv = require('dotenv')

dotenv.config()

const sql = postgres(process.env.DATABASE_URL, {
    ssl: 'require', 
    idle_timeout: 10, 
    max_lifetime: 60 * 30 
})

console.log('Connected to Supabase PostgreSQL')

module.exports = sql
