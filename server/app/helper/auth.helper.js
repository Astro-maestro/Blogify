const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const hashPassword = async (password) => {
    try {
        const saltPassword = 10;
        const hashPassword = await bcrypt.hash(password, saltPassword)
        return hashPassword;
    } catch (error) {
        console.log(error);
    }

}

const createToken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "12h" });
        return token;
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
}

export const verifyToken = async (token) => {
    try {
        const isVerified = await jwt.verify(token, process.env.JWT_SECRET);
        return isVerified;
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
}

const comparePassword = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
};



module.exports={
    hashPassword,
    createToken,
    comparePassword
}