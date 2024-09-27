<template>
    <div v-if="loadingDonates" class="d-flex align-center justify-center" :style="{ width: '100%', height: '80vh' }">
        <v-progress-circular indeterminate :size="44" :width="5"></v-progress-circular>
    </div>
    <div v-else class="d-flex flex-column ga-2">
        <v-card v-for="donate in donates" :key="donate" color="secondary"
            class="d-flex align-center justify-space-evenly pa-2">
            <v-card class="pa-2" :color="donate.status != 'Entregue' ? 'info' : 'success'" @click="sendBasket">
                <v-icon color="primary">{{ donate.status != "Entregue" ? 'mdi mdi-heart-search' : 'mdi mdi-package-check'
                    }}</v-icon>
            </v-card>
            <v-divider vertical></v-divider>
            <div class="d-flex flex-column">
                <span class="text-caption">Status</span>
                <span class="text-caption font-weight-bold">{{ donate.status }}</span>
            </div>
            <v-divider vertical></v-divider>
            <div class="d-flex flex-column">
                <span class="text-caption">{{ donate.status != "Entregue" ? 'Doado em' : 'Entregue em' }}</span>
                <span class="text-caption font-weight-bold">{{ donate.status != "Entregue" ? new
                    Date(donate.date).toLocaleDateString() : new Date(donate.deliveryDate).toLocaleDateString()
                    }}</span>
            </div>
            <v-divider vertical></v-divider>
            <div class="d-flex flex-column">
                <span class="text-caption">Tamanho</span>
                <span class="text-caption font-weight-bold">{{ donate.size }}</span>
            </div>
        </v-card>
    </div>
    <v-snackbar location-strategy="connected" target="parent" :offset="25" v-model="donateAdvertisement" :timeout="4000"
        :color="donateAdvertisementColor" close-on-content-click timer>{{
            donateAdvertisementText }}</v-snackbar>
</template>

<script>
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
const db = getFirestore();
export default {
    data() {
        return {
            donates: [],
            loadingDonates: true,
            donateAdvertisement: false,
            donateAdvertisementText: "",
            donateAdvertisementColor: ""
        }
    },
    mounted() {
        this.getDonates();
    },
    methods: {
        sendBasket() {

        },
        async getDonates() {
            this.loadingDonates = true;
            try {
                let userId = localStorage.getItem('userId');
                const q = query(collection(db, "donates"), where("userId", "==", userId));

                const querySnapshot = await getDocs(q);
                this.donates = [];
                querySnapshot.forEach((doc) => {
                    this.donates.push(doc.data());
                });
                this.loadingDonates = false;
            } catch (error) {
                this.donateAdvertisement = true;
                this.donateAdvertisementText = 'Erro ao registrar: ' + error.message;
                this.donateAdvertisementColor = "warning";
                this.loadingDonates = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>