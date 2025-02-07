import {create} from "zustand";
import { axiosInstance } from "../Lib/axios";
import { toast} from "react-hot-toast";
import {getSocket} from "../socket/socket.client";
import {useAuthStore} from "./useAuthStore";

export const useMessageStore = create((set) => ({
    messages:[],
    loading:true,

    sendMessage: async (receiverId,content) => {
        try {
            set(state=>({
                messages:[...state.messages,{sender:useAuthStore.getState().authUser._id,content}]
            }))
            const res = await axiosInstance.post(`/messages/send`,{receiverId,content});
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            console.log("sendMessageZustandError::",error);
        }
    },

    getMessages: async (userId) => {
        try {

            set({loading:true});
            const res = await axiosInstance.get(`/messages/conversation/${userId}`);
            set({messages:res.data.messages});
        } catch (error) {
            console.log("getMessageZustandError::",error);
        }finally{
            set({loading:false})
        }
    },

    subscribeToMessages: async () => {
        const socket = getSocket();
        socket.on("newMessage", ({message}) => {
            set(state=>({messages:[...state.messages,message]}))
        })
    },

    unSubscribeFromMessages: async () => {
        const socket = getSocket();
        socket.off("newMessage");
    },
}))