<template>
    <v-card id="postAct" class="mx-auto" color="#484545" dark @click="goPopup">
        <v-card-title>
            <img id="postImg" :src="info.userimage">
            <span class="text-h6 font-weight-light">{{ info.username }}</span>
        </v-card-title>

        <v-card-text class="text-h5 font-weight-bold" style="height: 150px; overflow: hidden;">
            {{ info.content }}
        </v-card-text>

        <v-card-actions class="mt-auto">
            <v-list-item class="grow">
                <v-list-item-content>
                    <v-list-item-title>{{ info.tags }}</v-list-item-title>
                </v-list-item-content>
                <v-row align="center" justify="end">
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">256</span>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>
  
<script>
export default {
    props: ["info"],
    methods: {
        goPopup() {
            this.$router.push({ path: `popup/${this.info.id}` })
        }
    }
};
</script>
  
<style>
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
  