<template>
    <v-card color="primary" class="pa-4" width="285" height="fit-content">
        <v-form @submit.prevent="trySingup" v-model="isFormValid" class="d-flex flex-column ga-2">
            <v-text-field v-model="email" :rules="[formRules.required, formRules.emailRule]" :disabled="singupLoading"
                bg-color="secondary" hide-details="auto" variant="solo" label="E-mail"
                placeholder="E-mail"></v-text-field>
            <v-text-field v-model="password"
                :rules="[formRules.required, formRules.minLengthRule, formRules.specialCharRule]"
                :type="passwordFieldType" :disabled="singupLoading" bg-color="secondary" hide-details="auto"
                variant="solo" label="Senha" placeholder="Senha">
                <template v-slot:append-inner>
                    <v-btn variant="text" size="sm">
                        <v-icon color="primary" size="25" @click="togglePasswordVisibility"
                            :style="{ textShadow: '1px 1px 1px #0003' }">{{ isPasswordVisible ? 'mdi- mdi-eye-closed' :
                                'mid mdi-eye' }}</v-icon>
                    </v-btn>
                </template>
            </v-text-field>
            <v-snackbar location-strategy="connected" target="parent" :offset="25" v-model="singupAdvertisement"
                :timeout="4000" :color="singupAdvertisementColor" close-on-content-click timer>{{
                    singupAdvertisementText }}</v-snackbar>
            <v-btn :disabled="!isFormValid" :loading="singupLoading" class="mt-2" type="submit" block>Registrar</v-btn>
            <RouterLink to="/login" class="text-center">
                <span class="text-caption text-background">Entrar com uma conta existente!</span>
            </RouterLink>
        </v-form>
    </v-card>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/plugins/firebase';

export default {
    name: 'SingupForm',
    data() {
        return {
            email: "",
            password: "",
            passwordFieldType: "password",
            singupAdvertisementText: "",
            singupAdvertisementColor: "",
            isPasswordVisible: false,
            isFormValid: false,
            singupLoading: false,
            singupAdvertisement: false,
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
        async trySingup() {
            this.singupLoading = true;

            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push('/login')
            } catch (error) {
                this.singupAdvertisement = true;
                this.singupAdvertisementText = 'Erro ao registrar: ' + error.message;
                this.singupAdvertisementColor = "warning";
                this.singupLoading = false;
            }

        }
    }
}
</script>

<style scoped></style>