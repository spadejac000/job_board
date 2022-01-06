const router = require('express').Router()
const pool = require('../../db')

// post job
router.post('/post-job', async (req, res) => {
  try {

    const {jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, healthInsurance, paidTimeOff, dentalInsurance, four01K, visionInsurance, description, userID} = req.body

    const job = await pool.query("INSERT INTO jobs(job_title, company_name, work_address, city, _state, zip, job_location, job_type, salary, _description, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;", [jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, description, userID])

    const benefits = await pool.query("INSERT INTO benefits(health_insurance, paid_time_off, dental_insurance, four_zero_one_k, vision_insurance) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [healthInsurance, paidTimeOff, dentalInsurance, four01K, visionInsurance])

    await pool.query("UPDATE jobs SET benefits_id = $1 WHERE job_id = $2", [benefits.rows[0].benefits_id, job.rows[0].job_id])

    res.json({job: job.rows[0], benefits: benefits.rows[0]})
    
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

// GET all logged in user jobs
router.get('/current-user-jobs', async (req, res) => {
  try {
    let currentUserJobs = await pool.query("SELECT * FROM jobs WHERE user_id = $1;", [req.query.user_id]);
    console.log('here are the current user jobs on the backend: ', currentUserJobs.rows)
    res.json(currentUserJobs.rows)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params

    const benefitsID = await pool.query("SELECT benefits_id FROM jobs WHERE  job_id = $1", [id])
    const deleteJob = await pool.query("DELETE FROM jobs WHERE job_id = $1", [id])
    const deleteBenefits = await pool.query("DELETE FROM benefits WHERE benefits_id = $1", [benefitsID.rows[0].benefits_id])
    res.json('Job was deleted')
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router;