const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = (req, res, next) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ success: false, message: 'No image file provided' });
  }

  const file = req.files.image;

  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) {
      console.error('Cloudinary upload error:', err);
      return res.status(500).json({ success: false, message: 'Failed to upload image to Cloudinary', error: err.message });
    }

    // Store the image URL on the request object
    req.cloudinaryUrl = result.secure_url;
    next();
  });
};
