<template>
  <div class="popup">
    <div class="row">
      <div class="col">
        <v-card v-if="this.post.image != ''" id="postActpop" class="mx-auto" color="#484545" dark>
          <v-card-title>
            <img id="postImg" :src="this.post.userimage" />
            <span class="text-h6 font-weight-light">{{
              this.post.username
            }}</span>
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
            </v-list-item>
          </v-card-actions>
        </v-card>

        <v-card v-else id="postActpop2" class="mx-auto" color="#484545" dark>
          <v-card-title>
            <img id="postImg" :src="this.post.userimage" />
            <span class="text-h6 font-weight-light">{{
              this.post.username
            }}</span>
          </v-card-title>

          <v-card-text id="maintxt2" class="text-h5 font-weight-bold">
            {{ this.post.content }}
          </v-card-text>

          <v-card-actions class="mt-auto">
            <v-list-item class="grow">
              <v-list-item-content>
                <v-list-item-title>{{ this.post.tags }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>

      <div class="col">
        <div class="newcom" v-if="this.store.authenticated != false">
          <v-text-field v-model="comment" id="commentbox" label="Comment" variant="underlined"></v-text-field>
          <v-btn id="combtn" @click="postComment()" variant="tonal">Comment</v-btn>
        </div>

        <div class="column">
          <div :key="c.id" v-for="c in comments" class="combox">
            <img :src="c.userimage" id="comimg" />
            <div id="text" class="col">
              <p id="comtxt">{{ c.comment }}</p>
              <p id="usercom">Commented by : {{ c.username }}</p>
              <v-btn v-if="c.useremail == store.userEmail && store.authenticated != false" id="combtn"
                @click="deleteComment(c.id)" variant="tonal">Delete</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import { firebase, db } from "@/firebase";
import store from "../store";

export default {
  props: ["id"],
  data() {
    return {
      store,
      post: null,
      comment: "",
      comments: [],
    };
  },
  mounted() {
    this.getData();
    console.log(this.id);
    this.getComments();
  },
  methods: {
    async deleteComment(idcom) {
      const postDocumentRef = db.collection("Posts").doc(this.id);
      const commentDocumentRef = postDocumentRef
        .collection("Comments")
        .doc(idcom);

      try {
        await commentDocumentRef.delete();
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }

      postDocumentRef.collection("Comments").onSnapshot((snapshot) => {
        const updatedComments = [];
        snapshot.forEach((doc) => {
          updatedComments.push({ id: doc.id, ...doc.data() });
        });

        this.comments = updatedComments;
      });
    },
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
      console.log("post: ", this.post);
    },
    postComment() {
      db.collection("Posts")
        .doc(this.id)
        .collection("Comments")
        .add({
          username: this.store.userName,
          comment: this.comment,
          userimage: this.store.userImage,
          useremail: this.store.userEmail,
        })
        .then((result) => {
          this.comment = "";
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getComments() {
      db.collection("Posts")
        .doc(this.id)
        .collection("Comments")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              let comment = change.doc.data();
              comment.isNew = true;
              comment.id = change.doc.id;
              this.comments.unshift(comment);
            }
          });
        });
      console.log("Comments: ", this.comments);
    },
  },
};
</script>
  
<style>
#maintxt2 {
  max-height: 300px;
  overflow: auto;
  text-align: justify;
}

#maintxt {
  text-align: justify;
}

#combtn {
  margin-bottom: 10px;
}

#text {
  max-height: 100px;
  overflow: auto;
}

.column {
  max-height: 400px;
  overflow: auto;
}

#usercom {
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

#comtxt {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  max-width: 300px;
  word-wrap: break-word;
}

#comimg {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 20px;
}

.combox {
  display: flex;
  align-items: center;
  background-color: rgb(214, 220, 223);
  padding: 10px;
  border-radius: 5%;
  margin-bottom: 10px;
}

#mainimg {
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 20px;
}

#postActpop {
  width: 750px;
  height: 500px;
  display: flex;
  flex-direction: column;
}

#postActpop2 {
  width: 450px;
  height: 400px;
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