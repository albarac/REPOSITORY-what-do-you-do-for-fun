<template>
    <div class="main-activity">
        <div class="row">
            <v-btn @click="goNewPost" variant="tonal"> New Post </v-btn>
            <div id="search">
                <v-text-field id="search" prepend-icon="mdi-magnify"></v-text-field>
            </div>
        </div>

        <div class="activity">
            <PostAct id="postAct" :key="card.id" v-bind:info="card" v-for="card in this.documents" />

        </div>
    </div>
</template>
  
<script>
import PostAct from "@/components/PostAct";
import { db } from '@/firebase';

export default {
    components: { PostAct },
    data() {
        return {
            documents: []

        }
    },
    methods: {
        goNewPost() {
            this.$router.push({ name: "newpost" })
        },
        getAct() {
            const collectionRef = db.collection("Activity");
            collectionRef
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.documents.push(doc.data());
                    });
                })
                .catch((error) => {
                    console.error("Error fetching documents: ", error);
                });
            console.log("Activity documents: ", this.documents)
        }
    },
    mounted() {
        this.getAct();
    }
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
  