<template>
  <div class="d-flex align-center flex-column">
    <v-col cols="3">
    </v-col>
    <v-col cols="4">
      <v-card id="signupBox" class="pa-4" outlined tile width="400" title="Sign up"
        subtitle="Use this form to sign up to the page.">
        <v-form @submit.prevent>
          <v-text-field v-model="email" type="email" label="Enter email">
          </v-text-field>
          <v-text-field v-model="password" type="password" label="Enter password">
          </v-text-field>
          <v-text-field v-model="passwordRepeat" type="password" label="Repeat password">
          </v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn @click="signup">Sign up</v-btn>
        </v-card-actions>
      </v-card>
      <v-alert id="alertBox" dismissible type="error" v-if="this.showError" transition="scale-transition"> {{
        errorMsg }} </v-alert>
    </v-col>
    <v-col cols="3">
    </v-col>
  </div>
</template>
   
<v-card class="pa-4 mx-2 mt-1" outlined tile> ovo mi je moj dugi error</v-card>

  
<script>
import { firebase, db } from '@/firebase';
import image from '../assets/profileimage.png'
export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      showError: false,
      errorMsg: '',
      proPic64: '',
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    async getImage() {
      fetch(image)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = reader.result;
            console.log(base64Data)
            this.proPic64 = base64Data;
            // Use the base64Data as needed
          };
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          console.error('Error loading image:', error);
        });
    },
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          let id = this.email;
          db.collection("Users")
            .doc(id)
            .set({
              username: this.email,
              description: '',
              hobbies: '',
              freetime: '',
              userimage: this.proPic64,
            })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
          console.log('Uspješna registracija');
          this.$router.push({ name: "home" })
        })
        .catch(error => {
          console.error('Došlo je do greške', error);
          this.showError = true;
          this.errorMsg = this.formatErrorMsg(error.message);
        });
    },
    formatErrorMsg(error) {
      const regex = /^Firebase: (.+?)\s\(.+?\)\.$/;
      return error.match(regex)[1];
    }
  },
};
</script>
<style lang="scss">
#signupBox {
  margin-top: 120px;
}

#alertBox {
  margin-top: 20px;
  width: 400px;
}
</style>