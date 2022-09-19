const mongoose = require('mongoose')

const validFullName = function (names) {   //full name
    if ((typeof names == "String" && names.trim().length != 0 || names.match(/^[a-zA-Z ]+$/)))
        return true
    return false
}

const validName = function (name) {
    if (typeof name == "string" && name.trim().length != 0 && name.match(/^[a-z.]{2,10}$/i)) return true
    return false
}
const logo = function (link) {   //logo
    if (typeof link == "string" || link.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/+#-]*[\w@?^=%&amp;\/+#-])?/))
        return true
    return false
}

const dataValidation = function (data) {
    if (Object.keys(data).length != 0) return true
    return false
}



const mail = function (link) {
    if (typeof link == "string" && link.match(/^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/))
        return true
    return false
}


module.exports = { validName, logo, mail, validFullName, dataValidation }