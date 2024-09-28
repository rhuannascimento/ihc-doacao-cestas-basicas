<template>
    <v-form @submit.prevent="registerDonate" v-model="isFormValid" class="d-flex flex-column ga-2">
        <v-autocomplete v-model="size" :items="sizes" :rules="[formRules.required]" :disabled="registerLoading" bg-color="secondary"
            hide-details="auto" variant="solo" label="Tamanho da cesta" placeholder="Tamanho da cesta"></v-autocomplete>
        <v-autocomplete v-model="paymentMethod" :items="methods" :rules="[formRules.required]" :disabled="registerLoading"
            bg-color="secondary" hide-details="auto" variant="solo" label="Método de pagamento"
            placeholder="Método de pagamento"></v-autocomplete>
        <v-snackbar location-strategy="connected" target="parent" :offset="25" v-model="registerAdvertisement"
            :timeout="4000" :color="registerAdvertisementColor" close-on-content-click timer>{{
                registerAdvertisementText }}</v-snackbar>
        <v-btn :disabled="!isFormValid" :loading="registerLoading" class="mt-2" type="submit" block>Registrar</v-btn>

    </v-form>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();
export default {
    data() {
        return {
            sizes: ['Pequeno', 'Médio', 'Grande'],
            methods: ['Pix', 'Cartão de crédito'],
            size: null,
            paymentMethod: null,
            registerAdvertisementText: "",
            registerAdvertisementColor: "",
            registerAdvertisement: false,
            formRules: {
                required: value => !!value || "O campo é obrigatório",
            },
            registerLoading: false,
            isFormValid: false
        }
    },
    methods: {
        clearFiled(){
            this.size = null;
            this.paymentMethod = null;
        },
        async registerDonate() {
            this.registerLoading = true;
                let userId = localStorage.getItem('userId');
            let donateData = {
                size: this.size,
                status: "Procurando fámilia",
                date: (new Date()).toISOString(),
                deliveryDate: '',
                userId: userId
            }
            try {
                const docRef = await addDoc(collection(db, "donates"), donateData);
                this.registerAdvertisement = true;
                this.registerAdvertisementText = "Sucesso!";
                this.registerAdvertisementColor = "success";
                this.clearFiled();
                this.registerLoading = false;
            } catch (error) {
                this.registerAdvertisement = true;
                this.registerAdvertisementText = 'Erro ao registrar: ' + error.message;
                this.registerAdvertisementColor = "warning";
                this.registerLoading = false;
            }
        }
    }
}
</script>

<style scoped></style>