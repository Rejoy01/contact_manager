//@desc Get all contacts
//@route GET /api/contacts
//@access public

const Contacts = require("../models/contactModel")
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contacts.find({user_id : req.user.id});
    res.status(200).json({contacts})
});

//@desc Create New contacts
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async(req, res) => {
    console.log("the request body is : ",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    } 
    const contact = await Contacts.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json({contact})
});
//@desc Update contact
//@route POST /api/contacts/:id
//@access public

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        request.status(404);
        throw new Error("Contact not Found")
    }
    const updateContact = await Contacts.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({updateContact});
});
//@desc get contact
//@route POST /api/contacts
//@access public

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//@desc delete contact
//@route DELETE /api/contacts
//@access public
const deletetContact = asyncHandler(async(req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    await Contacts.deleteOne()
    res.status(200).json(contact);
});


module.exports = {getContact,createContact,updateContact,deletetContact,getContacts};