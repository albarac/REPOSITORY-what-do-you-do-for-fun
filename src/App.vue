<template>
  <v-app>
    <Navbar />
    <v-main class="mx-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { firebase, db } from '@/firebase';
import store from './store'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },

  data() {
    return store;
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User is logged in with email " + user.email);
        this.authenticated = true;
        console.log(this.authenticated)
        this.userEmail = user.email;
        db.collection("Users")
          .doc(user.email)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.userName = doc.data().username;
              this.userHobbies = doc.data().hobbies;
              this.userDesc = doc.data().description;
              this.userFreeTime = doc.data().freetime;
              this.userImage = doc.data().userimage;
              console.log("Document data:", doc.data());
            } else {
              console.log("No such document!");
            }
          });
      }
    })
  }
};
</script>
