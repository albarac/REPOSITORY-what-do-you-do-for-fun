<template>
    <nav>
        <v-toolbar id="toolbar">
            <v-toolbar-title id="titleID" @click="pushHome">
                <span>What do you do for fun?</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn id="loginBtn" @click="pushLogin" v-if="this.store.authenticated == false">
                Log in
            </v-btn>
            <v-btn id="logoutBtn" @click="logout" v-if="this.store.authenticated == true">
                Log out
            </v-btn>
            <v-btn id="registerBtn" @click="pushRegister" v-if="this.store.authenticated == false">
                Register
            </v-btn>
            <v-btn id="profileBtn" @click="pushProfile" v-if="this.store.authenticated == true">
                {{ this.store.userName }}
            </v-btn>
            <v-app-bar-nav-icon @click="hamburger = !hamburger" class="hidden-md-and-up"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-navigation-drawer v-model="hamburger" app temporary class="blue">
            <p>this is a hamburger</p>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { firebase } from '@/firebase';
import store from '../store'

export default {
    data() {
        return {
            hamburger: false,
            store
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut();
            this.store.authenticated = false;
            this.$router.push({ name: "login" })
            console.log(this.authenticated)
        },
        pushLogin() {
            this.$router.push({ name: "login" })
        },
        pushRegister() {
            this.$router.push({ name: "signup" })
        },
        pushProfile() {
            this.$router.push({ name: "profile" })
        },
        pushHome() {
            this.$router.push({ name: "home" })
        },
    }


}

</script>
<style lang="scss">
#toolbar {
    background-color: rgb(72, 69, 69);
    color: whitesmoke;
}

#loginBtn {
    margin-left: 10px;
    background-color: rgb(18, 168, 218);
}

#logoutBtn {
    background-color: rgb(18, 168, 218);
}

#registerBtn {
    margin-left: 10px;
    background-color: rgb(18, 168, 218);
}

#profileBtn {
    margin-left: 10px;
    background-color: rgb(18, 168, 218);
}

#titleID:hover {
    cursor: pointer;
}
</style>
