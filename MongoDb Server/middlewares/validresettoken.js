const { isValidObjectId } = require("mongoose");
const ResetToken = require("../model/resetToken");
const User = require("../model/userSchema");

exports.isResetTokenValid = async (req, res, next) => {
    const {token, id} = req.query;

    if(!token || !id) return res.status(400).send({success: false, error: "Invalid request!"})

    if(!isValidObjectId) return res.status(400).send({success: false, error: "Invalid user!"})

    const user = await User.findById(id)
    if(!user) return res.status(400).send({success: false, error: "User not found!"})

    const resetToken = await ResetToken.findOne({owner: user._id})
    if(!resetToken) return res.status(400).send({success: false, error: "Session Expired!"})

    const isValid = await resetToken.compareToken(token)
    if(!isValid) return res.status(400).send({success: false, error: "Reset token is not valid!"})

    req.user = user
    next();
}