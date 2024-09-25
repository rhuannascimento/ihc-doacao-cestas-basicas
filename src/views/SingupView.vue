<template>
    <div class="d-flex flex-column justify-center align-center ga-2" :style="{height: `100%`}">
        <div class="d-flex ga-2 align-end">
            <v-icon color="primary" size="55" :style="{textShadow: `1px 1px 1px #0005`}">mdi mdi-basket-outline</v-icon>
            <span class="text-primary text-h4">Easy Donation</span>
        </div>
        <SingupForm />
    </div>
</template>

<script>
import SingupForm from "@/components/SingupFormComponent.vue"

export default {
    name: 'SingupView',
    components:{
        SingupForm
    }
}
</script>

<style scoped>

</style>