<template>
    <div class="popup">
        <div class="row">
            <div class="col">
                <v-card id="postAct" class="mx-auto" color="#484545" dark>
                    <v-card-title>
                        <img id="postImg" :src="this.post.userimage" />
                        <span class="text-h6 font-weight-light">{{ this.post.username }}</span>
                    </v-card-title>


                    <v-card-text id="maintxt" class="text-h5 font-weight-bold" style="max-height: 100px; overflow: auto">
                        {{ this.post.content }}
                    </v-card-text>


                    <v-img id="mainimg" :src="this.post.image" height="200px"></v-img>



                    <v-card-actions class="mt-auto">
                        <v-list-item class="grow">
                            <v-list-item-content>
                                <v-list-item-title>{{ this.post.tags }}</v-list-item-title>
                            </v-list-item-content>
                            <v-row align="center" justify="end">
                                <v-icon class="mr-1">mdi-heart</v-icon>
                                <span class="subheading mr-2">256</span>
                            </v-row>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </div>

            <div class="col">
                <p>nesto</p>
            </div>
        </div>
    </div>
</template>
  
  
<script>
import { firebase, db } from '@/firebase';

export default {
    props: ["id"],
    data() {
        return {
            post: null,
        }
    },
    mounted() {
        this.getData();
        console.log(this.id)
    },
    methods: {
        async getData() {
            try {
                const doc = await db.collection("Posts").doc(this.id).get();
                if (doc.exists) {
                    this.post = doc.data();
                    this.post.id = doc.id;
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
            console.log("post: ", this.post)
        }
    }

};
</script>
  
<style>
#mainimg {
    margin-left: 40px;
    margin-right: 40px;
}

#postAct {
    width: 850px;
    height: 500px;
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
  </template>