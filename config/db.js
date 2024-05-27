import mongoose from "mongoose"

const connectDB=async()=>{
    try{
        const res = await mongoose.connect(process.env.MONGO_URI);
        if(res){
            console.log("Connection Successfully")
        }
        else{
            console.log("Connection Unsuccessful")
        }
    }catch(err){
        console.log(err)
    }
    
}
export default connectDB