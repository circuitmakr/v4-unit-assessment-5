const bcrypt = require('bcryptjs')
module.exports={
    register: async (req, res) => {
        const db = req.app.get('db')
        const {userName, password} = req.body
        console.log(req.body)
        //const profilePic = `https://robohash.or/${userName}`
        const [check_userName] = await db.user.find_user_by_username(userName)
        if(check_userName){
          return res.status(409).send("Username is already registered.")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user = await db.auth.create_user(userName, hash)
        delete user.user_password
        req.session.user = user
        return res.status(200).send(req.session.user)
      },
      login: async (req, res) => {
        const db = req.app.get('db')
        const {userName, password} = req.body
        const [user] = await db.auth.check_userName(userName)
        if(!user){
          return res.status(401).send("User not found.")
        }
        const isAuthenticated = bcrypt.compareSync(password, user.user_password)
        if(!isAuthenticated){
          return res.status(403).send("Incorrect Password or Username.")
        }
        delete user.user_password
        req.session.user = user
        return res.status(200).send(req.session.user)
      },
      getUser: (req, res) => {
        if(!req.session.user){
          return res.status(401).send("User not found.")
        }
        return res.status(200).send(req.session.user)
      },
      logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
      },
}