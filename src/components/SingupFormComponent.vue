<template>
    <v-card color="primary" class="pa-4" width="285" height="fit-content">
        <v-form @submit.prevent="tryLogin" v-model="isFormValid" class="d-flex flex-column ga-2">
            <v-text-field v-model="username" :rules="[formRules.required]" :disabled="loginLoading" bg-color="secondary"
                hide-details="auto" variant="solo" label="Usuário" placeholder="Usuário"></v-text-field>
            <v-text-field v-model="password"
                :rules="[formRules.required, formRules.minLengthRule, formRules.specialCharRule]"
                :type="passwordFieldType" :disabled="loginLoading" bg-color="secondary" hide-details="auto"
                variant="solo" label="Senha" placeholder="Senha">
                <template v-slot:append-inner>
                    <v-btn variant="text" size="sm">
                        <v-icon color="primary" size="25" @click="togglePasswordVisibility"
                            :style="{ textShadow: '1px 1px 1px #0003' }">{{ isPasswordVisible ? 'mdi- mdi-eye-closed' :
                                'mid mdi-eye' }}</v-icon>
                    </v-btn>
                </template>
            </v-text-field>
            <v-snackbar location-strategy="connected" target="parent" :offset="25" v-model="loginAdvertisement" :timeout="4000" :color="loginAdvertisementColor"
                close-on-content-click timer>{{ loginAdvertisementText }}</v-snackbar>
            <v-btn :disabled="!isFormValid" :loading="loginLoading" class="mt-2" type="submit" block>Entrar</v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    name: 'SingupForm',
    data() {
        return {
            username: "",
            password: "",
            passwordFieldType: "password",
            loginAdvertisementText: "",
            loginAdvertisementColor: "",
            isPasswordVisible: false,
            isFormValid: false,
            loginLoading: false,
            loginAdvertisement: false,
            formRules: {
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
        tryLogin() {
            this.loginLoading = true;

            setTimeout(() => {
                if (this.username == "rhuannascimento" && this.password == "Rhuan%%2024") {
                    this.$router.push('/home')
                } else {
                    this.loginAdvertisement = true;
                    this.loginAdvertisementText = "Usuário e/ou senha incorretos!";
                    this.loginAdvertisementColor = "warning";
                }
                this.loginLoading = false;
            }, 2000);
        }
    }
}
</script>

<style scoped></style>