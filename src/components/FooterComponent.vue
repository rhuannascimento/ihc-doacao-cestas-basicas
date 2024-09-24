<template>
    <div class="d-flex justify-center" :style="{ position: 'fixed', bottom: '0', width: '100%' }">
        <v-card :style="{ borderRadius: '10px 10px 0px 0px' }" width="95%" height="60px" class="pa-4" color="secondary">
            <v-btn-toggle v-model="path" divided>
                <v-btn v-for="option in options" :key="option">
                    <div class="d-flex ga-2">
                        <v-icon>{{ option.icon }}</v-icon>
                        <span>{{ option.label }}</span>
                    </div>
                </v-btn>
            </v-btn-toggle>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return: {
            path: '',
            options: [
                {
                    icon: 'mdi mdi-circle',
                    label: 'Circulo',
                    path: ''
                }
            ]
        }
    },
    mounted(){
        this.path = this.$route.path;
    }
}
</script>

<style scoped></style>