const Listing = require("../models/listing");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req,res)=>{
    // console.log(req.user);
    // if(!req.isAuthenticated()){
    //     req.flash("error", "You must be logged in to create listing!");
    //     return res.redirect("/login");
    // }
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    console.log(listing);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }else{
        res.render("./listings/show.ejs", {listing});
    }
};

module.exports.createListing = async (req,res,next)=>{

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename);
 
    const listing = req.body.listing;
    // // console.log(listing);
    const newListing = new Listing(listing);

    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
   
};

module.exports.renderEditForm = async(req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_300");
    console.log(originalImageUrl);
    res.render("./listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid Data for listing");
    // }
    const {id} = req.params;
    // console.log(id);
    // const listing = req.body.listing;
    // console.log(listing);
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    const {id} = req.params;
    const delListing = await Listing.findByIdAndDelete(id);
    console.log(delListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
