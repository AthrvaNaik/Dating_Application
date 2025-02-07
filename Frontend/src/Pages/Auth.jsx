import { useState } from "react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

const Auth = () => {
  const [isLogin,setIsLogin] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8">
          {isLogin ? "Login to Swipe" : "Create a Swipe account"}
        </h2>
        <div className="bg-white shadow-xl rounded-lg p-8">
          {isLogin ? <Login /> : <Signup />}

          <div className="mt-8 text-center">
            <p className="text-small text-gray-600">
              {isLogin?"New to Swipe?":"Already have an account?"}{" "}
            </p>
            <button
              onClick={()=>setIsLogin((prevIsLogin)=>!prevIsLogin)}
              className="mt-2 text-red-600 font-medium transition-colors duration-300 hover:text-red-900"
            >
              {isLogin ? "Create an account" : "Sign in to your account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
