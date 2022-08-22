const express=require("express")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())

const  connect=async()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect("mongodb://localhost:27017/movies",(err)=>{
            if(err)
            {
                console.error("Error connecting to Database",err)
                return reject(err)
            }
            console.log("SucessFully connected to Database");
            resolve()
        })
    })
    
}

const movieSchema=new mongoose.Schema({
    id:Number,
    title:String,
    rating:Number,
})



let movieModel
try {
    movieModel=new mongoose.model("movieCollection",movieSchema)
} catch (error) {
    
}


app.get("/",async(req,res)=>{
  const movies=await movieModel.find()
  res.send(movies)  
})

app.post("/",async(req,res)=>{
    const movie=await movieModel.create({
        id:req.body.id,
        title:req.body.title,
        rating:req.body.rating
    })
    res.send(movie)
})

app.patch("/",async(req,res)=>{
    const movie=await movieModel.findOneAndUpdate({title:req.body.title},{rating:req.body.rating})
    res.send(movie)
})

app.delete("/",async(req,res)=>{
    const movie=await movieModel.deleteOne({
        title:req.body.title
    }) 
    res.send(movie)
})





app.listen(3000,()=>{
    connect()
    console.log("welcome")
})