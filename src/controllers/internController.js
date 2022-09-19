const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const { mail, dataValidation, validFullName } = require('../util/validator');

// ----------------------------------------createCollege----------------------------------------
const createIntern = async (req, res) => {
    try {
        const reqBody = req.body
        let { name, email, mobile, collegeName } = reqBody


        if (!dataValidation(reqBody))
            return res.status(400).send({ status: false, msg: "Please provide some data" })

        if (!name)
            return res.status(400).send({ status: false, msg: "please provide the name" })

        if (!validFullName(name))
            return res.status(400).send({ status: false, msg: "Please enter a valid name " })

        const dublicate = await internModel.find()
        if (!email)
            return res.status(400).send({ status: false, msg: "please provide the email" })

        if (!mail(email)) { return res.status(400).send({ status: false, msg: "Please enter a valid email " }) }

        for (let i = 0; i < dublicate.length; i++) {
            if (dublicate[i].email == email) {
                return res.status(400).send({ status: false, msg: "email already registered" })
            }
        }

        // if (!mobile) { return res.status(400).send({ status: false, msg: "mobile already exist" }) }
        if ((!(/^[ 0-9 ]{10,10}$/).test(mobile)))
            return res.status(400).send({ status: false, msg: "Please provide valid number" });
        
        mobile = mobile.toString().trim()

        for (let i = 0; i < dublicate.length; i++) {
            if (dublicate[i].mobile == mobile) {
                return res.status(400).send({ status: false, msg: "mobile already registered" })
            }
        }

        const collegeNames = await collegeModel.findOne({ $or: [{ name: collegeName }, { fullName: collegeName }] })
        if (!collegeNames) { return res.status(400).send({ status: false, msg: "College not found" }) }

        const Id = collegeNames._id
        reqBody.collegeId = Id

        const saveData = await internModel.create(reqBody);
        res.status(201).send({ status: true, data: saveData });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};

module.exports = { createIntern }