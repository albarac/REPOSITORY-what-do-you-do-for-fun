<template>
  <div class="d-flex align-center flex-column">
    <v-row>
      <v-col cols="3">
      </v-col>
      <v-col cols="8">
        <v-card id='loginBox' class="pa-4" outlined tile width="400" title="Log in"
          subtitle="Use this form to log in to the page.">
          <v-form @submit.prevent>
            <v-text-field v-model="email" type="email" label="Enter email">
            </v-text-field>
            <v-text-field v-model="password" type="password" label="Enter password">
            </v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn @click="login">Log in</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert id="alertLoginBox" dismissible type="error" v-model="this.showError"> {{
          errorMsg }} </v-alert>
      </v-col>
      <v-col cols="3">

      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import { firebase } from '@/firebase';
import store from '../store'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      store,
      showError: false,
      errorMsg: '',
    };
  },
  mounted() {
    console.log(this.store.authenticated)
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('Uspješna prijava');
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
#loginBox {
  margin-top: 120px;
}

#alertLoginBox {
  margin-top: 20px;
}
</style>