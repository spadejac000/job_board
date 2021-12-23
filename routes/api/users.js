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

    // newUser.save();
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
    res.json(user.rows[0])
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

module.exports = router;