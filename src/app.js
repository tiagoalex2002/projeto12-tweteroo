import express from "express"
import cors from "cors"

const app= express()
app.use(cors())
app.use(express.json())

let messages=[]
let users=[]
let usernames=[]
let avatars=[]


app.post("/sign-up", (req,res) => {
    const {username, avatar} = req.body;
    const user= {
        username: username,
        avatar: avatar
    }
    usernames.push(username)
    users.push(user)
    res.send("Ok")
})

app.post("/tweets", (req,res) => {
    const {username, tweet} = req.body;
    if(!usernames.includes(username)){
        res.send("UNAUTHORIZED")
    }
    else{
        const message= {
            username: username,
            tweet: tweet
        }
        messages.push(message)
        const a= users.find((tuites)=> tuites.username === username)
        avatars.push(a.avatar)
        console.log(avatars)
        res.send("Ok")
    }
    
})

app.get('/tweets', (req,res)=> {
    if (messages.length >= 10){
        let tweets=[]
        let i=1
        while (i <= 10){
            let us= messages[messages.length-i].username
            let tw=messages[messages.length-i].tweet
            let av=avatars[avatars.length-i]
            const t= {username: us, avatar: av, tweet: tw}
            tweets.push(t)
            i++;
        }
        console.log(tweets)
        res.status(200).json(tweets)
    }
    else if(messages.length < 10 && messages.length >0){
        let tweets=[]
        let i=0
        while(i<messages.length){
            let av=avatars[avatars.length-(1+i)]
            const t= {username : messages[i].username, avatar:av, tweet: messages[i].tweet}
            tweets.push(t)
            i++
        }
        console.log(tweets)
        res.status(200).json(tweets)
    }
    else{
        let tweets=[]
        res.send(tweets)
    }
})

app.listen(5000, ()=> console.log("Servidor rodando"))

