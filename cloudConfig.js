const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ //backend ko cloudinary ke sath connect karne ke liye
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'stayease_DEV', 
    allowedFormats: ["png", "jpeg", "jpg"],
  },
});

module.exports = {
    cloudinary,
    storage,
}