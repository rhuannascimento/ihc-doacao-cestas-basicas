<template>
    <v-app-bar color="transparent" elevation="0" :absolute="true">
        <template v-slot:prepend>
            <div class="d-flex ga-2 align-center" :style="{ maxWidth: '120px' }">
                <v-icon color="primary" size="55" :style="{ textShadow: `1px 1px 1px #0005` }">mdi
                    mdi-basket-outline</v-icon>
                <span class="text-primary text-wrap"
                    :style="{ lineHeight: '20px', fontSize: '15pt', fontWeight: 'bold' }">Easy Donation</span>
            </div>
        </template>
        <div>
            <v-img :width="300" aspect-ratio="16/9" cover
                src=""></v-img>
        </div>
    </v-app-bar>
    <v-main>
        <v-sheet color="secondary"
            :style="{ borderRadius: '10px 10px 10px 10px', height: '100%', width: '100%' }"></v-sheet>
    </v-main>
</template>

<script>
export default {
    name: 'HomeView',

}
</script>

<style scoped></style>