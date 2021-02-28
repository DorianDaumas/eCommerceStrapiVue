<template>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="#333333" icons-and-text dark grow>
                    <v-tabs-slider color="#FFFFFF"></v-tabs-slider>
                    <v-tab >
                        <v-icon large>{{ tabs[0].account }}</v-icon>
                        <div class="caption py-1">{{ tabs[0].Connexion }}</div>
                    </v-tab>
                     <v-tab >
                        <v-icon large>{{ tabs[1].accountOutline }}</v-icon>
                        <div class="caption py-1">{{ tabs[1].Inscription }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" hint="8 characters minimum" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="4" xsm="11" align-end>
                                            <v-btn x-large block style="color:white;" :disabled="!valid" color="#333333" @click="validateConnexion"> Connexion </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="firstName" :rules="[rules.required]" label="Nom" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="lastName" :rules="[rules.required]" label="Prénom" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirmer votre mot de passe" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col  class="d-flex ml-auto" cols="12" sm="4" xsm="11">
                                            <v-btn x-large block style="color:white;" :disabled="!valid" color="#333333" @click="validateInscription">S'inscrire</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>    
</template>
<script>


export default {

    data() {
        return {
            dialog: true,
            tab: 0,
            tabs: [
                {Connexion:"Connexion", account:"mdi-account"},
                {Inscription:"Inscription", accountOutline:"mdi-account-outline"}
            ],
            valid: true,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            verify: "",
            loginPassword: "Test123456",
            loginEmail: "test@test.fr",
            loginEmailRules: [
            v => !!v || "Obligatoire",
            v => /.+@.+\..+/.test(v) || "E-mail doit être valid"
            ],
            emailRules: [
            v => !!v || "Obligatoire",
            v => /.+@.+\..+/.test(v) || "E-mail doit être valid"
            ],

            show1: false,
            rules: {
            required: value => !!value || "Obligatoire",
            min: v => (v && v.length >= 8) || "Min 8 characters"
            }
        }
    },

    computed: {
        passwordMatch() {
            return () => this.password === this.verify || "les mots de passe doivent être identiques";
        }
    },
    methods: {
        validateInscription() {
            let dataInscription = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                verify: this.verify
            }
            this.$store.dispatch('authentication/USER_INSCRIPTION', dataInscription)
        },
        validateConnexion() {
            let dataLogin = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            this.$store.dispatch('userAuthentication/USER_LOGIN', dataLogin)
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        }
    },
}
</script>
<style>
.v-overlay{
    z-index: 0!important;
}

</style>