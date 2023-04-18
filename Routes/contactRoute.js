const express = require('express');
const router = express.Router();
const {getContacts,createContact, updateContact, deletetContact, getContact} = require('../controllers/contactControllers')

// router.route("/").get((req, res) => {
//     // res.send("hi hello")
//     res.status(200).json({message:"Get all contacts"});
//     //res.json({success: true}) send response as json format
// }) 
router.route("/").get(getContacts).post(createContact);;

router.route("/:id").get(getContact).put(updateContact).delete(deletetContact);


// router.route("/").get(getContacts);

// router.route("/:id").get(getContact);

// router.route("/").post(createContact);

// router.route("/:id").put(updateContact);
   
// router.route("/:id").delete(deletetContact);

module.exports = router;
