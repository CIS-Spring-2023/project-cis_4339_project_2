import { defineStore } from 'pinia'


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
        async login(username, password) {
            try {
                const response = await userLogin(username, password);
                this.$patch({
                    LoggedIn: response.success,
                    name: response.name,
                    role: response.role,
                    loginErr: null

                })

                this.$router.push("/home");
            }

            catch(error) {
                console.log(error)
                this.$patch({
                    loginErr: error
                })
            }
        },

        logout() {
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



function userLogin(u, p) {
  if (u == "viewer" && p == "view") return Promise.resolve({success: true, name: 'Viewer', role: "read"});
  if (u == "editor" && p == "edit") return Promise.resolve({success: true, name: 'Editor', role: "write"});
  return Promise.reject(new Error("Invalid Credentials")); 
}