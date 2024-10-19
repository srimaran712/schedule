const Express =require('express')
const app= Express()
//dOhuGOYtc8zeAlUL
//srimaran712
require('dotenv').config()

const Cors= require('cors')
const Bodyparser=require('body-parser')

const Mongoose= require('mongoose')
const Nodemailer =require('nodemailer')
//candidate schema
//schedule schema


app.use(Cors())

app.use(Bodyparser.json())

///connecting to a database 

Mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('database connected')
})

//creating a schedule schema

const scheduleSchema= Mongoose.Schema({
date:{type:Date,required:true},
timeslot:{type:String,required:true},
isBooked:{type:Boolean,default:false,required:true},
candidateId:{type:Mongoose.Schema.Types.ObjectId,ref:"candidates"}
})

const scheduleModel= Mongoose.model("schedule",scheduleSchema)

//creating a candidate schema

const candidateSchema= Mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    interviewDate:{type:Date},
    interviewSlot:{type:String}

})

//creating a model
const candidateModel= Mongoose.model("candidates",candidateSchema)

//I'm creating a post for candidaate and I'm getting details from frontend

app.post('/candidate',async(req,res)=>{
    const {username,email}=req.body

    if(!email){
        res.status(400).json({message:"not found enter details please"})
    }

   try{
    const candidate= new candidateModel({
        name:username,
        email:email
    })

    await candidate.save()
    //passing candidate id
   const result= await makeSlot(candidate._id)
    res.status(200).json({message:"candidate has created",result})
   } catch(error){
         res.status(400).json({message:'something went wrong'})
   }
})


//booking slot 

const makeSlot= async(candidateId)=>{

    const findSlot= await scheduleModel.findOne({isBooked:false}).sort('date')
    if(!findSlot){
        res.status(400).json({message:"no slot found"})
    }
    findSlot.isBooked=true;
    findSlot.candidateId=candidateId
    await findSlot.save()


    const findCandidate= await candidateModel.findById(candidateId)
    findCandidate.interViewDate=findSlot.date
    findCandidate.interViewTime=findSlot.timeslot
    await findCandidate.save()
}

//setting dates and slots

const settingDateSlot= async(startDate,endDate)=>{
    let currDate=new Date(startDate)

    while (currDate <= new Date(endDate)) {
        const slot1 = new scheduleModel({ date: currDate, timeslot: "10:00-11:00" });
        const slot2 = new scheduleModel({ date: currDate, timeslot: "11:00-12:00" });
        await slot1.save();
        await slot2.save();
currDate.setDate(currDate.getDate() + 1);
}


}

settingDateSlot("2024-10-20","2024-10-22")



//getting schedule here

app.get('/schedule',async(req,res)=>{
    try{
        const scheduleDetails= await scheduleModel.find().populate("candidateId")
        res.status(200).json({ schedules:scheduleDetails })
    }catch(error){
        res.status(400).json({message:"not found"})
    }
})

app.listen(process.env.PORT,()=>{
    console.log('server connected')
})

