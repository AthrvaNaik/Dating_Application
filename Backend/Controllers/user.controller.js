import User from "../Models/User.models.js";
import cloudinary from '../Config/cloudinary.js'
import jwt from "jsonwebtoken";

// export const updateProfile = async (req, res) => {
//   try {
//     const { image, ...otherData } = req.body;
//     let updatedData = otherData;
//     if (image) {
//       if (image.startsWith("data:image")) {
//         try {
//           const uploadedResponse = await cloudinary.uploader.upload(image);
//           updatedData.image = uploadedResponse.secure_url;
//         } catch (error) {
//             console.log("Error uploading image", uploadError);
//             return res.status(400).json({ message: "Error uploading image" });
//         }
//       }
//     }
//     const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
//       new: true,
//     });
//     res.status(200).json({ user: updatedUser, updatedUser });
//   } catch (error) {
//     console.log("updateProfileController Error::", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    // Check if the request contains a valid user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access", success: false });
    }

    // Check if the body has data to update
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update", success: false });
    }

    const { image, ...otherData } = req.body;
    let updatedData = { ...otherData };

    // Handle image upload if provided
    if (image) {
      if (image.startsWith("data:image")) {
        try {
          const uploadedResponse = await cloudinary.uploader.upload(image, {
            folder: "profile_images", // Optional: Specify a folder in Cloudinary
          });
          updatedData.image = uploadedResponse.secure_url;
        } catch (uploadError) {
          console.error("Error uploading image", uploadError);
          return res.status(400).json({
            message: "Error uploading image",
            success: false,
          });
        }
      } else {
        return res.status(400).json({
          message: "Invalid image format",
          success: false,
        });
      }
    }

    // Update user data in the database
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("updateProfileController Error::", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
