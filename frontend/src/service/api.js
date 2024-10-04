import axios from "axios"

const URL = "https://flipkart-clone-rose-sigma.vercel.app"
export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/signup`, data)
    } catch (error) {
        console.log("error while calling signup api", error)
    }
}
export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data)
    } catch (error) {
        console.log("error while calling login api", error)
        return error.response
    }
} 