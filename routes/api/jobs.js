const router = require('express').Router()
const pool = require('../../db')

// post job
router.post('/post-job', async (req, res) => {
  try {

    const {jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, benefits, description} = req.body

    console.log('here is the req body for post job: ', req.body)

    const job = await pool.query("INSERT INTO jobs(job_title, company_name, work_address, city, _state, zip, job_location, job_type, salary, benefits, _description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;", [jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, benefits, description])

    res.json(job.rows[0])
    
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// GET all jobs
router.get('/', async (req, res) => {
  try {
    let jobs = await pool.query('SELECT * FROM jobs');
    res.json(jobs.rows)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router;