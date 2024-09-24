<template>
    <Header />
    <v-main>
        <v-sheet color="primary" :style="{ borderRadius: '10px 10px 0px 0px', height: '100%', width: '100%' }">
        </v-sheet>
        <Footer />
    </v-main>
</template>

<script>
import Footer from "@/components/FooterComponent.vue"
import Header from "@/components/HeaderComponent.vue"

export default {
    name: 'HomeView',
    components:{
        Footer,
        Header
    }
}
</script>

<style scoped></style>