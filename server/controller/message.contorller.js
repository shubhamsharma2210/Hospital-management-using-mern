import Message from "../model/messageSchema.model.js"
import {catchAsyncError} from '../middleware/catchAsyncError.middleware.js'
export const sendMessage = catchAsyncError(async(req, res) => {
    const {firstName, lastName, email, phone, message} = req.body
    if(!firstName || !lastName || !email || !phone || !message){
        return res.status(500).json({
            success: false,
            message: "please fill Full Form"
        })
    }
    try {
        await Message.create({firstName, lastName, email, phone, message})
        res.status(200).json({
            success:true,
            message: "Message send successfull"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong in message controller"
        })
        console.log("something went wrong in message controller",error)
    }
})

// get all message

export const getAllMessage = async(req,res) => {
    const message = await Message.find()
    res.status(200).json({
        success:true,
        message,
            })
} 