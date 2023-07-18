<template>
    <div class="profile">
        <h1>User profile</h1>
        <div class="box">
            <v-text-field id="namefield" outlined :disabled="this.fieldsDisabled" :value="this.store.userName">
            </v-text-field>
        </div>
        <div id="rowProfile" class="row">
            <div id="colid" class="col">
                <h1>Description</h1>
                <v-textarea id="descfield" :value="this.store.userDesc" solo name="input-7-4"
                    :disabled="this.fieldsDisabled" outlined></v-textarea>
                <v-btn v-if="this.fieldsDisabled == true" @click="editbtn" id="editbtn">
                    Edit
                </v-btn>
                <v-btn @click="save" id="editbtn" v-if="this.fieldsDisabled == false">Save</v-btn>
            </div>
            <div id="colid" class="col">
                <h1>Hobbies</h1>
                <v-textarea id="hobbiesfield" :value="this.store.userHobbies" solo name="input-7-4"
                    :disabled="this.fieldsDisabled" outlined></v-textarea>
                <h1>Free time</h1>
                <v-textarea id="timefield" :value="this.store.userFreeTime" solo name="input-7-4"
                    :disabled="this.fieldsDisabled" outlined></v-textarea>
            </div>
            <div id="colid" class="col">
                <img v-if="this.fieldsDisabled" id="profileImg" :src="this.userImage64data" alt="" />
                <v-file-input v-if="this.fieldsDisabled == false" label="Choose an image" variant="filled"
                    prepend-icon="mdi-camera"></v-file-input>
            </div>
        </div>
    </div>
</template>
  
<script>
import store from "../store";
import { firebase, db } from "../firebase";
export default {
    data() {
        return {
            store,
            fieldsDisabled: true,
            userImage64data: store.userImage,
        };
    },
    methods: {
        editbtn() {
            this.fieldsDisabled = false;
        },
        save() {
            this.fieldsDisabled = true;
            var newName = document.getElementById("namefield").value;
            var newDesc = document.getElementById("descfield").value;
            var newHobbies = document.getElementById("hobbiesfield").value;
            var newTime = document.getElementById("timefield").value;

            db.collection("Users")
                .doc(this.store.userEmail)
                .update({
                    description: newDesc,
                    freetime: newTime,
                    hobbies: newHobbies,
                    username: newName,
                })
                .then(result => {
                    console.log(result);
                    this.$router.push({ name: "home" });
                })
                .catch(e => {
                    console.error(e);
                });
        },

    },
};
</script>
  
  
<style lang="scss">
.profile {
    padding: 30px;
}

#profileImg {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    transform: translateX(100px);
}

.box {
    width: 200px;
    margin-top: 20px;
}

#editbtn {
    background-color: rgb(18, 168, 218);
}
</style>
  