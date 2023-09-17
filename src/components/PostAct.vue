<template>
  <v-card id="postAct" class="mx-auto" color="#484545" dark>
    <v-card-title>
      <img id="postImg" :src="info.userimage" />
      <span class="text-h6 font-weight-light">{{ info.username }}</span>
    </v-card-title>

    <v-card-text @click="goPopup" id="cardtext" class="text-h5 font-weight-bold">
      {{ info.content }}
    </v-card-text>

    <v-card-actions class="mt-auto">
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title>{{ info.tags }}</v-list-item-title>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <img v-if="this.info.image != ''" src="../assets/camera.png" id="camera" />
          <img v-if="this.info.email == this.store.userEmail &&
            this.store.authenticated
            " @click="deletePost" src="../assets/bin.png" id="bin" />
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
  
<script>
import store from "../store";
import { firebase, db } from '@/firebase';
export default {
  data() {
    return {
      store,
    };
  },
  props: ["info"],
  methods: {
    goPopup() {
      this.$router.push({ path: `popup/${this.info.id}` });
    },
    deletePost() {
      const docRef = db.collection("Posts").doc(this.info.id);

      docRef
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>
  
<style>
#cardtext {
  overflow: hidden;
  max-height: 150px;
}

#camera {
  height: 40px;
  width: 40px;
}

#bin {
  height: 30px;
  width: 30px;
  margin-left: 10px;
}

#postAct {
  width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
}

#postImg {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
  