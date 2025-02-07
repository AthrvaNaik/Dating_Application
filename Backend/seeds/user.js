import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../Models/User.models.js";
import dotenv from "dotenv";

dotenv.config();

const maleNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas"];
const femaleNames = [
	"Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
	"Nancy", "Lisa"
];

const genderPreferences = ["male", "female", "both"];
const bioDescriptors = [
	"Coffee addict", "Cat lover", "Dog person", "Foodie", "Gym rat", "Bookworm", "Movie buff", "Music lover",
	"Travel junkie", "Beach bum", "City slicker", "Outdoor enthusiast", "Netflix binger", "Yoga enthusiast",
	"Craft beer connoisseur", "Sushi fanatic", "Adventure seeker", "Night owl", "Early bird", "Aspiring chef"
];

// Function to generate a random bio
const generateBio = () => {
	const descriptors = bioDescriptors.sort(() => 0.5 - Math.random()).slice(0, 3);
	return descriptors.join(" | ");
};

// Function to get a random image from the folder
const getRandomImage = (gender) => {
	const imageCount = gender === "male" ? 10 : 12; // Change based on the number of images in each folder
	const randomIndex = Math.floor(Math.random() * imageCount) + 1;
	return `/images/${gender}/${randomIndex}.jpg`; // Path should match the public folder structure
};

// Function to generate a random user
const generateRandomUser = async (gender, index) => {
	const names = gender === "male" ? maleNames : femaleNames;
	const name = names[index];
	const age = Math.floor(Math.random() * (45 - 21 + 1) + 21);

	// Async password hashing for better security
	const hashedPassword = await bcrypt.hash("password123", 10);

	return {
		name,
		email: `${name.toLowerCase()}${age}@example.com`,
		password: hashedPassword,
		age,
		gender,
		genderPreference: genderPreferences[Math.floor(Math.random() * genderPreferences.length)],
		bio: generateBio(),
		image: getRandomImage(gender),
	};
};

// Function to seed the database
const seedUsers = async () => {
	try {
		console.log("Connecting to MongoDB...");
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		await User.deleteMany({});
		console.log("Existing users removed");

		// Generate users
		const maleUsers = await Promise.all(maleNames.map((_, i) => generateRandomUser("male", i)));
		const femaleUsers = await Promise.all(femaleNames.map((_, i) => generateRandomUser("female", i)));
		const allUsers = [...maleUsers, ...femaleUsers];

		console.log(`Generated ${allUsers.length} users`);
		await User.insertMany(allUsers);
		console.log("Users inserted into the database");

	} catch (error) {
		console.error("Error seeding database:", error.message);
	} finally {
		console.log("Disconnecting from MongoDB...");
		mongoose.disconnect();
	}
};

seedUsers();
