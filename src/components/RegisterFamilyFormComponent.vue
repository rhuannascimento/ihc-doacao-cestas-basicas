<template>
    <v-form @submit.prevent="registerFamily" v-model="isFormValid" class="d-flex flex-column ga-2">
        <v-text-field v-model="name" :rules="[formRules.required]" :disabled="registerLoading" bg-color="secondary"
            hide-details="auto" variant="solo" label="Nome" placeholder="Nome"></v-text-field>
        <v-text-field v-model="quantityOfPeople" type="number" :rules="[formRules.required]" :disabled="registerLoading"
            bg-color="secondary" hide-details="auto" variant="solo" label="Qtd. de pessoas"
            placeholder="Qtd. de pessoas"></v-text-field>
        <v-text-field v-model="address" :rules="[formRules.required]" :disabled="registerLoading" bg-color="secondary"
            hide-details="auto" variant="solo" label="Endereço" placeholder="Endereço"></v-text-field>
        <v-textarea v-model="observation" :disabled="registerLoading" bg-color="secondary" hide-details="auto"
            variant="solo" label="Observação" placeholder="Observação"></v-textarea>
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
            name: "",
            quantityOfPeople: 0,
            address: "",
            observation: "",
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
            this.name = "";
            this.quantityOfPeople = 0;
            this.address = "";
            this.observation = "";
        },
        async registerFamily() {
            this.registerLoading = true;
            let familyData = {
                name: this.name,
                quantityOfPeople: this.quantityOfPeople,
                address: this.address,
                observation: this.observation,
            }
            try {
                const docRef = await addDoc(collection(db, "family"), familyData);
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