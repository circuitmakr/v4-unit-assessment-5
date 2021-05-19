const bcrypt = require('bcryptjs')
module.exports={
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        console.log(req.body)
        const profilePic = `https://robohash.org/${username}`
        const [findUser] = await db.user.find_user_by_username([username]) 
        if(findUser){
          return res.status(409).send("username is already registered.")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [user] = await db.user.create_user([username, hash, profilePic])
        delete  user.password
        req.session.user = user[0]
        return res.status(200).send(req.session.user)
      },
      login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [user] = await db.user.find_user_by_username([username])
        if(!user){
          return res.status(401).send("User not found.")
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
          return res.status(403).send("Incorrect Password or username.")
        }
        delete user.password
        req.session.user = user
        return res.status(200).send(req.session.user)
      },
      getUser: async (req,res)=>{
        if (req.session.user){
            return res.status(200).send(req.session.user)
        }else{
            return res.status(401).send('Please login')
            }
      },
      logout: (req, res) => {
        req.session.destroy()
        return res.status(200)
      },
}