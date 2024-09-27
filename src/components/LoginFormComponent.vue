<template>
    <v-card color="primary" class="pa-4" width="285" height="fit-content">
        <v-form @submit.prevent="tryLogin" v-model="isFormValid" class="d-flex flex-column ga-2">
            <v-text-field v-model="email" :rules="[formRules.required, formRules.emailRule]" :disabled="loginLoading"
                bg-color="secondary" hide-details="auto" variant="solo" label="E-mail" flat
                placeholder="E-mail"></v-text-field>
            <v-text-field v-model="password"
                :rules="[formRules.required, formRules.minLengthRule, formRules.specialCharRule]"
                :type="passwordFieldType" :disabled="loginLoading" bg-color="secondary" hide-details="auto"
                variant="solo" label="Senha" placeholder="Senha" flat>
                <template v-slot:append-inner>
                    <v-btn variant="text" size="sm">
                        <v-icon color="primary" size="25" @click="togglePasswordVisibility"
                            :style="{ textShadow: '1px 1px 1px #0003' }">{{ isPasswordVisible ? 'mdi- mdi-eye-closed' :
                                'mid mdi-eye' }}</v-icon>
                    </v-btn>
                </template>
            </v-text-field>
            <v-snackbar location-strategy="connected" target="parent" :offset="25" v-model="loginAdvertisement"
                :timeout="4000" :color="loginAdvertisementColor" close-on-content-click timer>{{ loginAdvertisementText
                }}</v-snackbar>
            <v-btn :disabled="!isFormValid" :loading="loginLoading" class="mt-2" type="submit" block flat>Entrar</v-btn>
            <RouterLink to="/singup" class="text-center">
                <span class="text-caption text-background">Me registrar</span>
            </RouterLink>
        </v-form>
    </v-card>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/plugins/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
const db = getFirestore();
export default {
    name: 'LoginForm',
    data() {
        return {
            email: "",
            password: "",
            passwordFieldType: "password",
            loginAdvertisementText: "",
            loginAdvertisementColor: "",
            isPasswordVisible: false,
            isFormValid: false,
            loginLoading: false,
            loginAdvertisement: false,
            formRules: {
                emailRule: value => {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailPattern.test(value) || 'Email inválido';
                },
                required: value => !!value || "O campo é obrigatório",
                minLengthRule: value => value.length >= 8 || 'A senha deve ter mais de 8 caracteres',
                specialCharRule: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'A senha deve conter um caractere especial',
            }
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
            if (this.isPasswordVisible) {
                this.passwordFieldType = "text";
            } else {
                this.passwordFieldType = "password";
            }
        },
        async tryLogin() {
            this.loginLoading = true;
            let user;
            try {
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
                user = userCredential.user;
                localStorage.setItem('userId', user.uid);
                localStorage.setItem('token', user.accessToken);
            } catch (error) {
                this.loginAdvertisement = true;
                this.loginAdvertisementText = 'Erro de login: ' + error.message;
                this.loginAdvertisementColor = "warning";
                this.loginLoading = false;
                return
            }

            try{
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const role = docSnap.data().role;

                    if (role == 'admin') {
                        localStorage.setItem('role', role)
                    }
                }
            }catch(error){
                this.loginAdvertisement = true;
                this.loginAdvertisementText = 'Erro de login: ' + error.message;
                this.loginAdvertisementColor = "warning";
            }
            
            if(localStorage.getItem('role')){
                this.$router.push('/family'); 
            }else{
                this.$router.push('/donate-progress'); 
            }
        }
    }
}
</script>

<style scoped></style>