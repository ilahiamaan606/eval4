const mongoose=require("mongoose");

const searchSchema=mongoose.Schema({
    city:{
        type:String,
        required:true,
    }
})

const SearchModel=mongoose.model("search",searchSchema);

module.exports={
    SearchModel
}