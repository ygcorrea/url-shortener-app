<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card max-width="600" class="elevation-12">
            <v-toolbar dark color="primaryDark">
              <v-toolbar-title>Cadastro</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" class="mt-6">
                <v-text-field
                  v-model="email"
                  solo
                  outlined
                  dense
                  prepend-icon="mdi-account"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  solo
                  id="password"
                  outlined
                  dense
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row
                no-gutters
                align="center"
                justify="center"
                class="d-flex flex-column"
              >
                <v-btn
                  width="auto"
                  min-width="200"
                  class="ma-2 primaryDark"
                  large
                  color="primary"
                  @click="onRegisterClick"
                  >Cadastrar</v-btn
                >
                <router-link to="/login" class="text-decoration-none ma-4">
                  Já possuo cadastro
                </router-link>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="text-center">
      <v-snackbar color="accent" top right v-model="snackbar" multi-line>
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      email: null,
      password: null,
      snackbar: false,
      text: "",
    };
  },
  methods: {
    onRegisterClick() {
      const registerBody = {
        url: "http://localhost:8000/auth/register",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          email: this.email,
          password: this.password,
        },
      };
      axios(registerBody)
        .then(() => {
          this.snackbar = true;
          this.text = "Cadastro realizado com sucesso";
        })
        .catch((error) => {
          this.snackbar = true;
          this.text = "Algo de errado ocorreu com seu cadastro.";
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>