const router = require('express').Router()
const pool = require('../../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../utils/jwtGenerator')
const validInfo = require('../../middleware/validInfo')
const authorization = require('../../middleware/authorization')
const nodemailer = require("nodemailer");
const {cloudinary} = require('../../utils/cloudinary')

// register
router.post('/register', validInfo, async (req, res) => {
  try {

    const {firstName, lastName, email, password, role} = req.body
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

    if(user.rows.length !== 0) {
      return res.status(401).send("User already exists")
    }

    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)

    let newUser = await pool.query("INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING *", [firstName, lastName, email, bcryptPassword, role]);

    const token = jwtGenerator(newUser.rows[0].user_id, )
    res.json({token})
    
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// login
router.post("/login", validInfo, async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
    if(user.rows.length === 0) {
      return res.status(401).json("Invalid email or password")
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
    if(!validPassword) {
      return res.status(401).json("Invalid email or password")
    }
    const token = jwtGenerator(user.rows[0].user_id)
    res.json({token})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("server error")
  }
})

router.get('/', authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT user_first_name, user_last_name, user_email, user_role FROM users WHERE user_id = $1", [req.user])
    res.json({userFirstName: user.rows[0].user_first_name, userLastName: user.rows[0].user_last_name, userEmail: user.rows[0].user_email, userRole: user.rows[0].user_role, userID: req.user})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("server error")
  }
    
})

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("server error")
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const userJobsDeleted = await pool.quert("DELETE FROM jobs WHERE user_id = $1", [id])
    const userFavJobsDeleted = await pool.quert("DELETE FROM favorite_jobs WHERE user_id = $1", [id])
    const userDeleted = await pool.query("DELETE FROM users WHERE user_id = $1;", [id])
    // make sure all jobs associated with deleted user are deleted as well
    res.json(userDeleted)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("server error")
  }
})

// update user password
router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params

    const password = await pool.query("SELECT user_password FROM users WHERE user_id = $1", [id])
    const validPassword = await bcrypt.compare(req.body.currentPassword, password.rows[0].user_password)
    if(!validPassword) {
      return res.status(401).json("Invalid current password")
    }
    // salt for new password
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const newBcryptPassword = await bcrypt.hash(req.body.newPassword, salt)

    const updateUserPassword = await pool.query("UPDATE users SET user_password = $1 WHERE user_id = $2;", [newBcryptPassword, id])

    res.json(updateUserPassword)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.post('/forgot-password', async (req, res) => {
  try {

    const email = await pool.query('SELECT * FROM users WHERE user_email = $1', [req.body.email])
    
    // if(email.rows.length !== 0) {

      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'spadejacob@gmail.com',
          pass: ''
        }
      });

      let info = await transporter.sendMail({
        from: 'spadejacob@gmail.com', // sender address
        to: 'spade.jacob@yahoo.com, spadejacob105@gmail.com',
        subject: "Password Reset", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Click here to reset password</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // }

    res.send('working')

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// store the user profile image
router.post('/profile-image/:id', async (req, res) => {
  try {
    const userProfileImg = await pool.query('UPDATE users SET user_profile_image = $1 WHERE user_id = $2;', [req.files, req.params.id])
    res.json({userProfileImg})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// get stored user resume
router.get('/get-user-resume', async (req, res) => {
  try {
    const {resources} = await cloudinary.search
      .expression('folder:job_board_resumes')
      .max_results(1)
      .execute()
    const publicIds = resources.map((resume) => resume.public_id)
    res.send(publicIds)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// store the user resume
router.post('/upload-resume', async (req, res) => {
  try {
    const resumeString = req.body.data
    const uploadedResponse = await cloudinary.uploader.upload(resumeString, {upload_preset: 'job_board_resumes'})
    res.json({msg: 'Resume has been saved'})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// get the user profile picture
router.get('/get-profile-pic', async (req, res) => {
  try {
    const {resources} = await cloudinary.search
      .expression('folder:job_board_resumes')
      .max_results(1)
      .execute()
    const publicIds = resources.map((resume) => resume.public_id)
    res.send(publicIds)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// store the user profile picture
router.post('/upload-profile-pic', async (req, res) => {
  try {
    const profilePicString = req.body.data
    const uploadedResponse = await cloudinary.uploader.upload(profilePicString, {upload_preset: 'job_board_profile_pictures'})
    res.json({msg: 'Profile pic has been saved'})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// get user theme
router.get('/user-theme', async (req, res) => {
  try {
    const userTheme = await pool.query('SELECT user_theme FROM users WHERE user_id = $1;', [req.query.user_id])
    console.log('user id for theme: ', req.query.user_id)
    console.log('user theme: ', userTheme.rows[0].user_theme)
    res.json({userTheme: userTheme.rows[0].user_theme})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// update user theme
router.post('/user-theme', async (req, res) => {
  try {
    const updateUserTheme = await pool.query('UPDATE users SET user_theme = $1 WHERE user_id = $2;', [req.body.themeData, req.body.user_id])
    const userTheme = await pool.query('SELECT user_theme FROM users WHERE user_id = $1;', [req.body.user_id])
    res.json({userTheme: userTheme.rows[0].user_theme})
  } catch (error) {
    console.error('user theme update: ', error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router;