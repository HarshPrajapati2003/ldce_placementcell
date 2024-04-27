import mongoose from "mongoose"

const connectDB=async()=>{
    try{
        const res = await mongoose.connect("mongodb://127.0.0.1:27017/ldce_placementcell")
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