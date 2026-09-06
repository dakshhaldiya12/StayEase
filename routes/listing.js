const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
// const {listingSchema} = require("../schema.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
// const upload = multer({dest: "uploads/"});
const upload = multer({storage}); 


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
// .post(upload.single('listing[image]'), (req,res)=>{
//     // res.send(req.body);
//     res.send(req.file);
// })

//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


//index route
// router.get("/", wrapAsync(listingController.index));

//show route
// router.get("/:id", wrapAsync(listingController.showListing));

//create route
// router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//update route
// router.put("/:id",isLoggedIn, validateListing, wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;