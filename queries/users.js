const db = require('../db/dbConfig')
const bcrypt = require('bcryptjs')

const createUser = async (user) => {
    try {
        const { username, email, password_hash } = user
        const salt = 10 // the higher the number, the more scrambled it will be 
        const hash = await bcrypt.hash(password_hash, salt) // hashing a pw, using a func called hash, uses salt to scramble
        const newUser = await db.one("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hash]) 
        return newUser
    }   catch (err) {
        return err
    }
}

const getUsers = async () => {
    try {
        const users = await db.any("SELECT * FROM users")
        return users
    } catch (err) {
        return err
    }
}


const logInUser = async (user) => {
    try {
        const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", user.username)
        // console.log(loggedInUser)
        if(!loggedInUser){
            return false
        }

        const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)

        if(!passwordMatch){
            return false
        }
        return loggedInUser
    } catch (err) {
        return err
    }
}


module.exports = { createUser, getUsers, logInUser }