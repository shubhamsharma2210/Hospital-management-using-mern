import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain At least 3 character"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain At least 3 character"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide A Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain Excat 10 digits"],
        maxLength: [10, "Phone number must contain Excat 10 digits"]
    },
    message: {
        type: String,
        required: true,
        minLength: [5, "message must contain at least 5 character"]
    }
})

 const Message = mongoose.model("message", messageSchema)
 export default  Message