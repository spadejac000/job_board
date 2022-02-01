const router = require('express').Router()
const pool = require('../../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../utils/jwtGenerator')
const validInfo = require('../../middleware/vaildInfo')
const authorization = require('../../middleware/authorization')

// register
router.post('/register', validInfo, async (req, res) => {
  try {

    const {firstName, lastName, email, password} = req.body
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

    if(user.rows.length !== 0) {
      return res.status(401).send("User already exists")
    }

    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)

    let newUser = await pool.query("INSERT INTO users (user_first_name, user_last_name, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *", [firstName, lastName, email, bcryptPassword]);

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
    const user = await pool.query("SELECT user_first_name FROM users WHERE user_id = $1", [req.user])
    let userName = user.rows[0]
    res.json({userName: user.rows[0], userID: req.user})
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

module.exports = router;