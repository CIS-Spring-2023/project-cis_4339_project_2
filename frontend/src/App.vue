<script>
import axios from 'axios'
import { loggedInUser } from './store/LoggedIn'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',

  setup() {
    // Will use the login store to conditonally render the navigation
    const user = loggedInUser();
    return { user };
  },

  data() {
    return {
      orgName: 'Community Platform'
    }
  },
  created() {
    axios.get(`${apiURL}/org/`).then((res) => {
      this.orgName = res.data.name
    })
  }
}

</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            
              <li>
                <router-link to="/home">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >dashboard</span>
                  Dashboard
                </router-link>
              </li>
              <div v-if="user.LoggedIn"> <!-- Only rendering nav items beyond the dashboard if the user is logged in -->
              <li>
                <router-link to="/findclient">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >search</span
                  >
                  Find Client
                </router-link>
              </li>
              <li>
                <router-link to="/findevents">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >search</span
                  >
                  Find Event
                </router-link>
              </li>
              <li>
                <router-link to="/findservices">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >search</span
                  >
                  Find Services
                </router-link>
              </li>
              <span v-if="user.role == 'write'" >
                <li>
                  <router-link to="/intakeform">
                    <span
                      style="position: relative; top: 6px"
                      class="material-icons"
                      >people</span
                    >

                    Client Intake Form
                  </router-link>
                </li>
                <li>
                  <router-link to="/eventform">
                    <span
                      style="position: relative; top: 6px"
                      class="material-icons"
                      >event</span
                    >
                    Create Event
                  </router-link>
                </li>
                <li>
                  <router-link to="/createServices">
                    <span
                      style="position: relative; top: 6px"
                      class="material-icons"
                      >event</span
                    >
                    Create Services
                  </router-link>
                </li>
              </span>
              <li>
                <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >
                    person
                  </span>
                  <a href="">
                    <span @click="user.logout()">Log Out</span>
                  </a>
              </li>
            </div>
            <li v-if="!user.LoggedIn"> <!-- Showing the login button if user is not logged in otherwise shows the logout button -->
              <router-link to="/">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >person</span
                  >
                  Log In
                </router-link>
              
            </li>


          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
