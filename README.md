---

# Dating Application  

A full-stack dating application with authentication, real-time messaging, profile management, and a smart matching system.  

## ✨ Features  

- 🔐 **Secure Authentication with JWT**  
- 🛡️ **Protected Routes for Users**  
- 👤 **User Profiles with Image Upload**  
- 🔄 **Swipe Left/Right to Like or Pass**  
- 💬 **Instant Messaging with Real-Time Updates**  
- 🔔 **Live Notifications for Matches & Messages**  
- 🤝 **Smart Matching Algorithm**  
- 📱 **Fully Responsive Design**  
  

---  

## 🛠 Setup & Installation  

### 1️⃣ Clone the Repository  
```bash  
git clone https://github.com/AthrvaNaik/Dating_Application
cd Dating_Application
```  

### 2️⃣ Install Dependencies  
```bash  
npm install  
```  

### 3️⃣ Configure Environment Variables  
Create a `.env` file and add the following:  
```env  
PORT=5000  
MONGO_URI=<your_mongo_uri>  
JWT_SECRET=<your_strong_secret>  
NODE_ENV=development  
CLIENT_URL=http://localhost:5173  
CLOUDINARY_API_KEY=<your_cloudinary_api_key>  
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>  
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>  
```  

### 4️⃣ Start the Development Server  
```bash  
npm run dev  
```  

---  

## 🚀 Deployment  

Set `NODE_ENV=production` and build the app:  
```bash  
npm run build  
```  

### Start the Production Server  
```bash  
npm run start  
```  

---  

