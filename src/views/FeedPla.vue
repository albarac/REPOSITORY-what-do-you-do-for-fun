<template>
    <div class="main-activity">
        <div class="row">
            <v-btn @click="goNewPost()" variant="tonal" color='#12a8da'> New Post </v-btn>
            <div id="search">
                <v-text-field id="search" prepend-icon="mdi-magnify" v-model="searchQuery" @input="getAct"></v-text-field>
            </div>
        </div>

        <div class="activity">
            <PostAct id="postAct" :key="card.id" v-bind:info="card" v-for="card in this.documents" />
        </div>
    </div>
</template>
  
<script>
import PostAct from "@/components/PostAct";
import { db } from "@/firebase";
export default {
    components: { PostAct },
    data() {
        return {
            searchQuery: "",
            documents: [],
        };
    },
    mounted() {
        this.getAct();
    },
    methods: {
        goNewPost() {
            this.$router.push({ name: "newpost" });
        },
        getAct() {
            this.documents = [];
            const collectionRef = db.collection("Posts");

            if (this.searchQuery === "") {
                collectionRef.where("category", "==", "Play").onSnapshot((querySnapshot) => {
                    this.documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    console.log("Activity documents: ", this.documents);
                });
            } else {
                db.collection("Posts")
                    .where("category", "==", "Play")
                    .where("tags", ">=", `#${this.searchQuery}`)
                    .where("tags", "<=", `#${this.searchQuery}` + "\uf8ff")
                    .onSnapshot((querySnapshot) => {
                        this.documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                        console.log("Play documents: ", this.documents);
                    });
            }
        },
    },
};
</script>
  
<style>
.activity {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
}

#postAct {
    margin: 10px;
}

#postAct:hover {
    cursor: pointer;
}

.row {
    align-items: center;
    margin-top: 10px;
    padding: 10px;
}

#search {
    margin-left: 20px;
    width: 300px;
}
</style>