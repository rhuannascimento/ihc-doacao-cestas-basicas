<template>
    <div class="d-flex justify-center" :style="{ position: 'fixed', bottom: '0', width: '100%' }">
        <v-card :style="{ borderRadius: '10px 10px 0px 0px' }" width="95%" height="60px" class="pa-4" color="secondary">
            <div class="d-flex justify-center ga-2">
                <div v-for="(option, index) in options" :key="index" class="d-flex ga-2">
                    <v-btn :color="this.path == option.path ? 'background':'fadedbackground'" @click="goToPath(option.path)" variant="text" >
                        <div class="d-flex ga-2">
                            <v-icon>{{ option.icon }}</v-icon>
                            <span>{{ option.label }}</span>
                        </div>
                    </v-btn>
                    <v-divider v-if="index + 1 != options.length" vertical></v-divider>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            path: '',
            options: [
                {
                    icon: 'mdi mdi-circle',
                    label: 'Circulo',
                    path: '/home'
                },
                {
                    icon: 'mdi mdi-circle',
                    label: 'Circulo',
                    path: '/login'
                }
            ]
        }
    },
    mounted(){
        this.path = this.$route.path;
    },
    methods:{
        goToPath(path){
            this.path = path;
            this.$router.push(path)
        }
    }
}
</script>

<style scoped></style>