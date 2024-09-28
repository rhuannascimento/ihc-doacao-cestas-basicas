<template>
    <div v-if="loadingFamilys" class="d-flex align-center justify-center" :style="{ width: '100%', height: '80vh' }">
        <v-progress-circular indeterminate :size="44" :width="5"></v-progress-circular>
    </div>
    <div v-else-if="familys.length == 0" class="d-flex align-center justify-center"
        :style="{ width: '100%', height: '80vh' }">
        <span>Não foi encontrado nenhum item</span>
    </div>
    <div v-else class="d-flex flex-column ga-2">
        <v-card v-for="family in familys" :key="family" color="secondary"
            class="d-flex align-center justify-space-evenly pa-2">
            <div class="d-flex flex-column">
                <span class="text-caption">Nome</span>
                <span class="text-caption font-weight-bold">{{ family.data().name }}</span>
                <v-divider></v-divider>
                <span class="text-caption">Qtd. de pessoas</span>
                <span class="text-caption font-weight-bold">{{ family.data().quantityOfPeople }}</span>
            </div>
            <v-divider vertical></v-divider>
            <div class="d-flex flex-column">
                <span class="text-caption">Doação anterior</span>
                <span class="text-caption font-weight-bold">{{ new Date(family.data().lastDonation).toLocaleDateString()
                    }}</span>
                <v-divider></v-divider>
                <span class="text-caption">Observação</span>
                <span class="text-caption font-weight-bold">{{ family.data().observation }}</span>
            </div>
            <v-divider vertical></v-divider>
            <div class="d-flex flex-column align-center ga-2">
                <v-card :disabled="baskets.length == 0" class="pa-2" :color="baskets.length ? 'success' : 'grey'"
                    @click="sendBasket(family)">
                    <v-progress-circular v-if="loadingBaskets" indeterminate></v-progress-circular>
                    <v-icon v-else color="primary">mdi mdi-basket-plus-outline</v-icon>
                </v-card>
                <v-card class="pa-2" color="error" @click="deletFamily(family)">
                    <v-icon color="primary">mdi mdi-delete</v-icon>
                </v-card>
            </div>
        </v-card>
    </div>
    <v-snackbar location-strategy="connected" target="parent" :offset="25" v-model="familyAdvertisement" :timeout="4000"
        :color="familyAdvertisementColor" close-on-content-click timer>{{
            familyAdvertisementText }}</v-snackbar>
</template>

<script>
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
const db = getFirestore();
export default {
    data() {
        return {
            familys: [],
            baskets: [],
            loadingBaskets: true,
            loadingFamilys: true,
            familyAdvertisement: false,
            familyAdvertisementText: "",
            familyAdvertisementColor: ""
        }
    },
    mounted() {
        this.getBaskets();
        this.getFamilys();
    },
    methods: {
        async deletFamily(family) {
            try {
                const docRef = doc(db, "family", family.id);
                await deleteDoc(docRef);
                this.familyAdvertisement = true;
                this.familyAdvertisementText = "Familia deletada!";
                this.familyAdvertisementColor = "warning";
                this.getFamilys();
            } catch (e) {
                console.error("Erro ao deletar documento: ", e);
            }
        },
        async sendBasket(family) {
            let newFamilyData = { ...family.data() };
            newFamilyData.lastDonation = (new Date()).toISOString();
            try {
                const docRef = doc(db, "family", family.id);
                await updateDoc(docRef, newFamilyData);
            } catch (error) {
                this.familyAdvertisement = true;
                this.familyAdvertisementText = 'Erro ao registrar: ' + error.message;
                this.familyAdvertisementColor = "warning";
                this.loadingFamilys = false;
            }

            let newBasketData = { ...this.baskets[0].data() };
            newBasketData.deliveryDate = (new Date()).toISOString();
            newBasketData.status = "Entregue";
            try {
                const docRef = doc(db, "donates", this.baskets[0].id);
                await updateDoc(docRef, newBasketData);
                this.baskets.shift();
                this.familyAdvertisement = true;
                this.familyAdvertisementText = "Cesta doada com sucesso!";
                this.familyAdvertisementColor = "success";
                this.getBaskets();
            } catch (error) {
                this.familyAdvertisement = true;
                this.familyAdvertisementText = 'Erro ao registrar: ' + error.message;
                this.familyAdvertisementColor = "warning";
                this.loadingFamilys = false;
            }

        },
        async getBaskets() {
            try {
                this.loadingBaskets = true;
                let q = query(collection(db, "donates"), where("status", "!=", "Entregue"));

                const querySnapshot = await getDocs(q);
                this.baskets = [];
                querySnapshot.forEach((doc) => {
                    this.baskets.push(doc);
                });
                this.loadingBaskets = false;
            } catch (error) {
                this.familyAdvertisement = true;
                this.familyAdvertisementText = 'Erro ao registrar: ' + error.message;
                this.familyAdvertisementColor = "warning";
                this.loadingFamilys = false;
            }
        },
        async getFamilys() {
            this.loadingFamilys = true;
            try {
                const querySnapshot = await getDocs(collection(db, "family"));
                this.familys = [];
                querySnapshot.forEach((doc) => {
                    this.familys.push(doc);
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