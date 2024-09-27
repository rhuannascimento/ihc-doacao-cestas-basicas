<template>
    <div v-if="loadingFamilys" class="d-flex align-center justify-center" :style="{ width: '100%', height: '80vh' }">
        <v-progress-circular indeterminate :size="44" :width="5"></v-progress-circular>
    </div>
    <div v-else-if="donates.length == 0" class="d-flex align-center justify-center" :style="{ width: '100%', height: '80vh' }">
        <span>Não foi encontrado nemnhum item</span>
    </div>
    <div v-else class="d-flex flex-column ga-2">
        <v-card v-for="family in familys" :key="family" color="secondary" class="d-flex align-center justify-space-evenly pa-2">
            <div class="d-flex flex-column">
                <span class="text-caption">Nome</span>
                <span class="text-caption font-weight-bold">{{ family.name }}</span>
                <v-divider></v-divider>
                <span class="text-caption">Qtd. de pessoas</span>
                <span class="text-caption font-weight-bold">{{ family.quantityOfPeople }}</span>
            </div>
            <v-divider vertical></v-divider>
            <div class="d-flex flex-column">
                <span class="text-caption">Doação anterior</span>
                <span class="text-caption font-weight-bold">{{ family.lastDonation }}</span>
                <v-divider></v-divider>
                <span class="text-caption">Observação</span>
                <span class="text-caption font-weight-bold">{{ family.observation }}</span>
            </div>
            <v-divider vertical></v-divider>
            <v-card class="pa-2" color="success" @click="sendBasket">
                <v-icon color="primary">mdi mdi-basket-plus-outline</v-icon>
            </v-card>
        </v-card>
    </div>
    <v-snackbar location-strategy="connected" target="parent" :offset="25" v-model="familyAdvertisement" :timeout="4000"
        :color="familyAdvertisementColor" close-on-content-click timer>{{
            familyAdvertisementText }}</v-snackbar>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore();
export default {
    data() {
        return {
            familys: [],
            loadingFamilys: true,
            familyAdvertisement: false,
            familyAdvertisementText: "",
            familyAdvertisementColor: ""
        }
    },
    mounted() {
        this.getFamilys();
    },
    methods: {
        sendBasket() {

        },
        async getFamilys() {
            this.loadingFamilys = true;
            try {
                const querySnapshot = await getDocs(collection(db, "family"));
                this.familys = [];
                querySnapshot.forEach((doc) => {
                    this.familys.push(doc.data());
                });
                this.loadingFamilys = false;
            } catch (error) {
                this.familyAdvertisement = true;
                this.familyAdvertisementText = 'Erro ao registrar: ' + error.message;
                this.familyAdvertisementColor = "warning";
                this.loadingFamilys = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>