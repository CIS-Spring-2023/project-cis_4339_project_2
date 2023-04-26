import { defineStore } from 'pinia'  // Using Pinia state management to handle login activities
import axios from 'axios';

const apiURL = import.meta.env.VITE_ROOT_API

export const loggedInUser = defineStore ({
    id: 'loggedInUser',

    state: () => {
        return {
            name: "",
            role: "",
            LoggedIn: false,
            loginErr: null
        }
    },

    actions: {  
        async login(username, password) { // Login function checks for proper credentials
            try {
                console.log(apiURL)
                const response = await axios.get(`${apiURL}/users/login/${username}/${password}`); // The arguments are passed to the login route
                console.log(response)
                if (response.data == "Invalid Credentials") {
                    this.$patch({
                        loginErr: response.data
                    })
                }
                else {
                this.$patch({
                    LoggedIn: true,
                    name: response.data.username,
                    role: response.data.role,
                    loginErr: null

                })
                this.$router.push("/home"); // if successful, push to the dashboard

                }
            }

            catch(error) {
                console.log(error)
                this.$patch({
                    loginErr: error  // Otherwise, set the error for display
                })
            }
        },

        logout() {  // Simple logout function resets everything and pushes to login page
            this.$patch({
                name: "",
                role: "",
                LoggedIn: false,
                loginErr: null

            });

            this.$router.push("/")
        }
    }
});


/*
function userLogin(u, p) { // Promise-based login function checks entered credentials for validity
  if (u == "viewer" && p == "view") return Promise.resolve({success: true, name: 'Viewer', role: "read"});
  if (u == "editor" && p == "edit") return Promise.resolve({success: true, name: 'Editor', role: "write"});
  return Promise.reject(new Error("Invalid Credentials")); 
}

*/