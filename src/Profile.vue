<template>
    <div class="profile">
        <h1>User profile</h1>
        <div class="box">
            <v-text-field id="namefield" outlined :disabled="fieldsDisabled" :value="store.userName"></v-text-field>
        </div>
        <div id="rowProfile" class="row">
            <div id="colid" class="col">
                <h1>Description</h1>
                <v-textarea id="descfield" :value="store.userDesc" solo name="input-7-4" :disabled="fieldsDisabled"
                    outlined></v-textarea>
                <v-btn v-if="fieldsDisabled" @click="editbtn" id="editbtn">Edit</v-btn>
                <v-btn @click="save" id="editbtn" v-else>Save</v-btn>
            </div>
            <div id="colid" class="col">
                <h1>Hobbies</h1>
                <v-textarea id="hobbiesfield" :value="store.userHobbies" solo name="input-7-4" :disabled="fieldsDisabled"
                    outlined></v-textarea>
                <h1>Free time</h1>
                <v-textarea id="timefield" :value="store.userFreeTime" solo name="input-7-4" :disabled="fieldsDisabled"
                    outlined></v-textarea>
            </div>
            <div id="colid" class="col">
                <img v-if="fieldsDisabled" id="profileImg" :src="userImage64data" alt="" />
                <v-file-input v-else label="Choose an image" variant="filled" prepend-icon="mdi-camera"
                    @change="(event) => this.changeImage(event)" accept="image/*"></v-file-input>
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
            userImage64data: null, // Initially set it to null
            file: null,
            imageUrl: '',
            newImageData: null
        };
    },
    created() {
        this.userImage64data = this.store.userImage; // Set the initial value
    },
    watch: {
        'store.userImage': function (newValue) {
            this.userImage64data = newValue; // Update the userImage64data when store.userImage changes
        },
    },
    methods: {

        async changeImage() {
            this.file = event.target.files[0];
            this.imageUrl = URL.createObjectURL(this.file);

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;
                console.log("New image data: ", base64Data)
                this.newImageData = base64Data;
                this.store.userImage = base64Data
            };
            reader.readAsDataURL(this.file);
        },

        editbtn() {
            this.fieldsDisabled = false;
        },
        save() {
            this.fieldsDisabled = true;
            var newName = document.getElementById("namefield").value;
            var newDesc = document.getElementById("descfield").value;
            var newHobbies = document.getElementById("hobbiesfield").value;
            var newTime = document.getElementById("timefield").value;
            var newImage = this.newImageData

            db.collection("Users")
                .doc(this.store.userEmail)
                .update({
                    description: newDesc,
                    freetime: newTime,
                    hobbies: newHobbies,
                    username: newName,
                    userimage: newImage
                })
                .then(result => {
                    console.log(result);
                    this.$router.push({ name: "home" });
                })
                .catch(e => {
                    console.error(e);
                });
            this.$router.push({ name: "home" })
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