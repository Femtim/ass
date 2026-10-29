const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const uploadImage =  () => {
  cloudinary.uploader
  .upload("image.png")
  .then(result=>console.log(result))
    .catch(error=>console.error(error));
};

module.exports = { uploadImage };