


const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')
const { validName, validFullName, dataValidation, logo } = require('../util/validator')


const createCollege = async (req, res) => {
    try {
        const reqBody = req.body;

        const { name, fullName, logoLink } = reqBody;

        if (!dataValidation(reqBody))
            return res.status(400).send({ status: false, msg: "please provide some data " })

        if (!name)
            return res.status(400).send({ status: false, msg: "name is not present " })

        if (!validName(name))
            return res.status(400).send({ status: false, msg: "name not valid" })

        const college = await collegeModel.findOne({ name: name })

        if (college)
            return res.status(400).send({ status: false, msg: "name already exist" })

        if (!validFullName(fullName))
            return res.status(400).send({ status: false, msg: "Fullname not valid" })

        if (!fullName)
            return res.status(400).send({ status: false, msg: "name is not present " })

        //if(fullName) {return res.status(400).send({status: false, msg:"College name already exist"})}

        if (!logo(logoLink))
            return res.status(400).send({ status: false, msg: "this url link not valid" })

        if (!logoLink)
            return res.status(400).send({ status: false, msg: "link is required" })

        const saveData = await collegeModel.create(reqBody)
        return res.status(201).send({ status: true, data: saveData })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}



//------------------------------------------------------------------------------------------------------------
const collegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!collegeName) 
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid details in Query" });
        
        const collegeDetails = await collegeModel.findOne({ name: collegeName })
        if (!collegeDetails)
            return res.status(404).send({ status: false, msg: "College doesn't exist" })
        
        let interns = await internModel.find({ collegeId: collegeDetails._id }).select({ name: 1, email: 1, mobile: 1 })

        let data = { name: collegeDetails.name, fullName: collegeDetails.fullName, logoLink: collegeDetails.logoLink, int: interns }

        res.status(200).send({ status: true, data: data })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}


module.exports = { createCollege, collegeDetails }