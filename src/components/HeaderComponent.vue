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
        <div class="d-flex align-center ga-2 px-4">
            <v-btn v-if="role == 'admin'" @click="toggleCreateFamilyView" :style="{backgroundColor: '#F2E8C6'}" elevation="1" size="small" max-width="1px">
                <div :style="{position: 'relative'}">
                    <v-icon size="25" color="background">{{ this.$route.path == '/create-family' ? 'mdi mdi-arrow-left':'mdi mdi-human-male-male-child'}}</v-icon>
                    <v-icon v-if="this.$route.path != '/create-family'"size="10" color="background" :style="{position: 'absolute', right: '-2px', bottom: '0px', backgroundColor: '#F2E8C6', borderRadius: '50%'}">mdi mdi-plus</v-icon>
                </div>
            </v-btn>
            <v-btn v-else @click="toggleDonateBasket" :style="{backgroundColor: '#F2E8C6'}" elevation="1" size="small" max-width="1px">
                    <v-icon size="25" color="background">{{ this.$route.path == '/donate-basket' ? 'mdi mdi-arrow-left':'mdi mdi-basket-plus-outline'}}</v-icon>
            </v-btn>
            <v-img :width="40" cover class="cursor-pointer" :style="{ borderRadius: '50%', boxShadow: '1px 1px 1px #000' }"
                src="https://raw.githubusercontent.com/rhuannascimento/ihc-doacao-cestas-basicas/refs/heads/main/src/assets/images/user_iamge.webp">
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
    data(){
        return{
            role: null
        }
    },
    beforeMount(){
        this.role = localStorage.getItem('role');
    },
    methods: {
        toggleCreateFamilyView(){
            if(this.$route.path != '/create-family'){
                this.$router.push('/create-family')  
            }else{
                this.$router.push('/family')  
            }
        },
        toggleDonateBasket(){
            if(this.$route.path != '/donate-basket'){
                this.$router.push('/donate-basket')  
            }else{
                this.$router.push('/donate-progress')  
            }
        },
        logOut(){
            localStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped></style>