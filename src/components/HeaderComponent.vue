<template>
    <v-app-bar color="transparent" elevation="0" :absolute="true">
        <template v-slot:prepend>
            <div class="d-flex ga-1 align-end" :style="{ maxWidth: '120px' }">
                <v-icon color="primary" size="40" :style="{ textShadow: `1px 1px 1px #0005` }">mdi
                    mdi-basket-outline</v-icon>
                <span class="text-primary text-wrap"
                    :style="{ lineHeight: '20px', fontSize: '12pt', fontWeight: '600' }">Easy Donation</span>
            </div>
        </template>
        <div class="px-4">
            <v-img :width="40" cover class="cursor-pointer" :style="{ borderRadius: '50%', boxShadow: '1px 1px 1px #000' }"
                src="https://raw.githubusercontent.com/rhuannascimento/ihc-doacao-cestas-basicas/refs/heads/main/src/assets/images/eu_mesmo_lindao.jpg">
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item @click="logOut()" prepend-icon="mdi mdi-logout">
                            <v-list-item-title>Sair</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-img>
        </div>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logOut(){
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped></style>