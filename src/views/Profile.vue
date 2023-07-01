<template>
    <div class="profile">
        <h1>User profile</h1>
        <div id="rowProfile" class="row">
            <div class="col">
                <h1>Description</h1>
                <v-textarea solo name="input-7-4" outlined></v-textarea>
            </div>
            <div class="col">
                <h1>Hobbies</h1>
                <v-textarea solo name="input-7-4" outlined></v-textarea>
                <h1>Free time</h1>
                <v-textarea solo name="input-7-4" outlined></v-textarea>
            </div>
            <div class="col">
                <img id="profileImg"
                    src="https://www.nicepng.com/png/detail/806-8061298_jacques-mestre-generic-male-profile.png" alt="">
            </div>
        </div>


    </div>
</template>
<style lang="scss">
.profile {
    padding: 30px;
}

#rowProfile {
    margin-top: 20px;
    margin: auto;
}

#profileImg {
    height: 200px;
    width: 200px;
    border-radius: 50%;
}
</style>