const User = require("../model/user_schema");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json({error: err});
    }
}

const createUser = async (req, res) => {
    console.log(req.body);
    const userData = new User({
        ...req.body
    })

    try {
        const result = await userData.save();
        res.json(result);
    } catch (err) {
        res.json({error: err})
    }
    
}

const getUserByRollNo = async (req, res) => {

    try {
        const user = await User.findOne({userId: req.params.userId});
        if(user == null) {
            // return res.writeHead(404, { 'Content-Type' : "application/json"})
            // .end(JSON.stringify({message: "No records found"}));
            return res.status(404).json({message: "No records found"});
            
        }
        res.json(user);
    } catch (err) {
        res.json({error: err});
    }
}

const updateUserByRollNo = async (req, res) => {

    try {

        const user = await User.findOne({userId: req.params.userId});
        if(user == null) {
            return res.status(404).json({message: "No records found"});
            
        }

        if(req.body.userId !== undefined) {
            user.userId = req.body.userId;
        }

        if(req.body.name !== undefined) {
            user.name = req.body.name;
        }

        if(req.body.email !== undefined) {
            user.email = req.body.email;
        }

        if(req.body.phone !== undefined) {
            user.phone = req.body.phone;
        }

        const result = await User.findOneAndUpdate({userId: req.params.userId}, user);
        res.json(result);

    } catch (err) {
        res.json({error: err});
    }
}

const deleteUserByUserId = async (req, res) => {

    try {
    const user = await User.findOne({userId: req.params.userId});
        if(user == null) {
            return res.status(404).json({message: "No records found"});
            
        }

        const result = await User.deleteOne({userId: req.params.userId});

        if(result.deletedCount == 1) {
            res.json({message: "User record deleted successfully", ...result});
        } else {
           res.json({message: "User record not deleted", ...result})
        }
        
    } catch (err) {
        res.json({error : err});
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserByRollNo,
    updateUserByRollNo,
    deleteUserByUserId
}

