<template>
    <div class="newpost">
        <div class="row">
            <div class="col"></div>
            <div class="col">
                <v-select v-model="category" id="select" label="Select category"
                    :items="['Activity', 'Arts', 'Collecting', 'Making', 'Play']"></v-select>
                <v-textarea v-model="content" id="text" clearable label="Label" variant="solo-inverted"></v-textarea>
                <v-file-input id="img" label="Choose an image" variant="filled" prepend-icon="mdi-camera"
                    @change="(event) => this.addImage(event)" accept="image/*"></v-file-input>
                <v-text-field v-model="tags" id="hash" label="Hashtags" variant="underlined"></v-text-field>
                <v-btn @click="post()" variant="tonal">Post</v-btn>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>
  
<script>
import { firebase, db } from "@/firebase";
import store from "../store";
export default {
    data() {
        return {
            store,
            category: "",
            content: "",
            image: "",
            tags: "",
            file: null,
            imageUrl: '',
        };
    },
    methods: {
        addImage() {
            this.file = event.target.files[0];
            this.imageUrl = URL.createObjectURL(this.file);

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;
                console.log("New image data: ", base64Data)
                this.image = base64Data;
            };
            reader.readAsDataURL(this.file);
        },
        post() {
            let id = this.store.userEmail;
            db.collection(this.category)
                .doc()
                .set({
                    category: this.category,
                    content: this.content,
                    tags: this.tags,
                    image: this.image,
                    userimage: this.store.userImage,
                    username: this.store.userName,
                    email: this.store.userEmail,
                })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            console.log("Uspješna objava");
            this.$router.push({ name: "home" });
        },
    },
};
</script>
  
<style>
#select {
    margin-bottom: 20px;
}

#text {
    margin-bottom: 20px;
}

#img {
    margin-bottom: 20px;
}

#hash {
    margin-bottom: 20px;
}
</style>