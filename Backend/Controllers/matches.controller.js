import User from "../Models/User.models.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;
    const currentUser = await User.findById(req.user.id);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();

      if (likedUser.likes.includes(currentUser.id)) {
        currentUser.matches.push(likedUserId);
        likedUser.matches.push(currentUser.id);

        await Promise.all([currentUser.save(), likedUser.save()]);

        const connectedUsers = getConnectedUsers();
        const likedUserSocketId = connectedUsers.get(likedUserId);
        const io = getIO();

        if (likedUserSocketId) {
          io.to(likedUserSocketId).emit("newMatch", {
            _id: currentUser._id,
            name: currentUser.name,
            image: currentUser.image,
          });
        }

        const currentSocketId = connectedUsers.get(currentUser._id.toString());
        if (currentSocketId) {
          io.to(currentSocketId).emit("newMatch", {
            _id: likedUser._id,
            name: likedUser.name,
            image: likedUser.image,
          });
        }
      }
    }

    res.status(200).json({ user: currentUser, success: true });
  } catch (error) {
    console.log("swipeRightController error::", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const swipeLeft = async (req, res) => {
  try {
    const { dislikedUserId } = req.params;
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
      await currentUser.save();
    }

    res.status(200).json({ user: currentUser, success: true });
  } catch (error) {
    console.log("swipeLeftController error::", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "matches",
      "name image"
    );
    res.status(200).json({ matches: user.matches, success: true });
  } catch (error) {
    console.log("getMatchesController error::", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getUserProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser.id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        {
          genderPreference: { $in: [currentUser.gender, "both"] },
        },
      ],
    });
    res.status(200).json({ users, success: true });
  } catch (error) {
    console.log("getUserProfilesController error::", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
