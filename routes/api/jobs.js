const router = require('express').Router()
const pool = require('../../db')
const {cloudinary} = require('../../utils/cloudinary')

// post job
router.post('/post-job', async (req, res) => {
  try {

    const {jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, healthInsurance, paidTimeOff, dentalInsurance, four01K, visionInsurance, description, userID, testJob} = req.body

    const job = await pool.query("INSERT INTO jobs(job_title, company_name, work_address, city, _state, zip, job_location, job_type, salary, _description, user_id, test_job, date_posted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp) RETURNING *;", [jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, description, userID, testJob])

    const benefits = await pool.query("INSERT INTO benefits(health_insurance, paid_time_off, dental_insurance, four_zero_one_k, vision_insurance) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [healthInsurance, paidTimeOff, dentalInsurance, four01K, visionInsurance])

    await pool.query("UPDATE jobs SET benefits_id = $1 WHERE job_id = $2", [benefits.rows[0].benefits_id, job.rows[0].job_id])

    res.json({job: job.rows[0], benefits: benefits.rows[0]})
    
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// GET paginated jobs
router.get('/', async (req, res) => {
  try {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1

    let theJobs = await pool.query('SELECT * FROM jobs');
    let totalJobs = theJobs.rows.length

    let count = await (await pool.query('SELECT * FROM jobs WHERE (job_title ILIKE $1 OR company_name ILIKE $1) AND (city ILIKE $2 OR _state ILIKE $2 OR zip ILIKE $2) AND CASE WHEN $3 = 1 THEN date_posted > current_date - 1 WHEN $3 = 3 THEN date_posted > current_date - 3 WHEN $3 = 7 THEN date_posted > current_date - 7 WHEN $3 = 14 THEN date_posted > current_date - 14 ELSE true END AND CASE WHEN $4 = $5 THEN job_location = $5 WHEN $4 = $6 THEN job_location = $6 WHEN $4 = $7 THEN job_location = $7 ELSE true END;',
    [
      `%${req.query.whatKeyword}%`, 
      `%${req.query.whereKeyword}%`,
      `${req.query.dateFilter}`, 
      `${req.query.jobLocationFilter}`, 
      'In office',
      'Remote',
      'Hybrid'
    ])).rows.length

    console.log('count: ', count)

    let jobs = await (await pool.query('SELECT * FROM jobs WHERE (job_title ILIKE $1 OR company_name ILIKE $1) AND (city ILIKE $2 OR _state ILIKE $2 OR zip ILIKE $2) AND CASE WHEN $3 = 1 THEN date_posted > current_date - 1 WHEN $3 = 3 THEN date_posted > current_date - 3 WHEN $3 = 7 THEN date_posted > current_date - 7 WHEN $3 = 14 THEN date_posted > current_date - 14 ELSE true END AND CASE WHEN $4 = $5 THEN job_location = $5 WHEN $4 = $6 THEN job_location = $6 WHEN $4 = $7 THEN job_location = $7 ELSE true END ORDER BY CASE WHEN $8 = 1 THEN date_posted END ASC, CASE WHEN $8 = 2 THEN date_posted END DESC LIMIT $9 OFFSET $10;',
      [
        `%${req.query.whatKeyword}%`,
        `%${req.query.whereKeyword}%`,
        `${req.query.dateFilter}`,
        `${req.query.jobLocationFilter}`,
        'In office',
        'Remote',
        'Hybrid',
        `${req.query.sort}`,
        pageSize,
        (pageSize * (page - 1))
      ])).rows

    res.json({jobs, page, pages: Math.ceil(count / pageSize), totalJobs, count})

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// GET all logged in user jobs
router.get('/current-user-jobs', async (req, res) => {
  try {
    let currentUserJobs = await pool.query("SELECT * FROM jobs WHERE user_id = $1;", [req.query.user_id]);
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

router.delete('/all-user-jobs/:id', async (req, res) => {
  try {
    const deleteAllJobs = await pool.query("DELETE FROM jobs WHERE user_id = $1", [req.params.id])
    res.json('All of your posted jobs were deleted')
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.put('/', async (req, res) => {
  try {
    const {jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, healthInsurance, paidTimeOff, dentalInsurance, four01K, visionInsurance, description, job_id} = req.body

    let updatedJob = await pool.query("UPDATE jobs SET job_title = $1, work_address = $2, city = $3, _state = $4, zip = $5, job_location = $6, job_type = $7, salary = $8, _description = $9, company_name = $10 WHERE job_id = $11;", [jobTitle, address, city, state, zip, jobLocation, jobType, salary, description, companyName, job_id])
    res.json(updatedJob.rows)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.post('/favorites', async (req, res) => {
  try {
    const {jobID, userID} = req.body

    // check first to see if job is already in favorites list
    const job = await pool.query("SELECT * FROM favorite_jobs WHERE job_id = $1;", [jobID])
    if(job.rows.length > 0) {
      res.send('favorite job already exists')
    } else {
      const newFavJob = await pool.query("INSERT INTO favorite_jobs(user_id, job_id) VALUES($1, $2);", [userID, jobID])
      res.send('works')
    }
    
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.get('/favorites', async (req, res) => {
  try {
    let favoriteUserJobs = await pool.query("SELECT * FROM favorite_jobs WHERE user_id = $1;", [req.query.user_id]);
    let favorites = []

    for(let i = 0; i < favoriteUserJobs.rows.length; i++) {
      let job = await pool.query("SELECT * FROM jobs WHERE job_id = $1;", [favoriteUserJobs.rows[i].job_id])
      favorites.push(job.rows[0])
    }
    
    res.json(favorites)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.delete('/favorites/:id', async (req, res) => {
  try {

    let deletedJob = await pool.query("DELETE FROM favorite_jobs WHERE user_id = $1 AND job_id = $2;", [req.query.user_id, req.params.id])
    
    res.send('favorite job deleted')
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// job application end point
router.post('/upload-application', async (req, res) => {
  try {
    if(!req.body.resume) {
      return res.status(400).json({msg: 'Upload resume'})
    }
  
    const {name, email, phone, location, jobID, userID} = req.body
  
    
    const resumeString = req.body.resume
    console.log('upload application: ', resumeString)
    const uploadedResponse = await cloudinary.uploader.upload(resumeString, {upload_preset: 'job_board_resumes'})

    console.log('uploaded response here boy: ', uploadedResponse)

    const application = await pool.query("INSERT INTO applications (applicant_name, applicant_email, applicant_phone, applicant_location, applicant_resume_url, job_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;", [name, email, phone, location, uploadedResponse.secure_url, jobID, userID])

    res.send('Application Completed')
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// get applicants of selected job
router.get('/applicants', async (req, res) => {
  try {
    let applicantsList = await pool.query("SELECT * FROM applications WHERE job_id = $1;", [req.query.jobID]);
    
    res.json(applicantsList.rows)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router;