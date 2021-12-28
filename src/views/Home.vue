<template>
  <div class="home">
    <div>
      <v-app-bar
        src="https://user-images.githubusercontent.com/58710976/147158410-67a62a8b-eeec-41d9-a78c-1409a3fc2c41.png"
        dark
        height="120"
        app
      >
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="toggle = !toggle"
        ></v-app-bar-nav-icon>
        <h2 class="hidden-sm-and-down" v-if="isLogged">
          Olá, {{ currentUserId.email }}
        </h2>
        <v-spacer></v-spacer>
        <v-btn
          to="/login"
          v-if="!isLogged"
          class="secondary hidden-sm-and-down"
        >
          <span class="pa-6">Login</span>
        </v-btn>
        <v-btn @click="logout" v-if="isLogged" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
        disable-resize-watcher
        v-model="toggle"
        bottom
        color="bgColor"
        dark
        app
      >
        <v-list class="list-menu" nav>
          <v-list-item>
            <v-btn color="secondary" text to="/login" v-if="!isLogged">
              Fazer Login
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn color="secondary" text to="/register" v-if="!isLogged">
              Me cadastrar
            </v-btn>
            <v-btn
              @click="logout"
              color="secondary"
              text
              to="/login"
              v-if="isLogged"
            >
              Logout
            </v-btn>
          </v-list-item>
          <v-btn @click="toggle = false" rounded icon outlined light
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-container class="primary">
      <section class="main-container">
        <div class="url-box">
          <v-row justify="center" class="col-12 mt-5">
            <span class="font-weight-bold headline white--text"
              >Encurtador de Url</span
            >
          </v-row>
          <v-col cols="12" sm="6" md="8">
            <v-text-field
              v-model="urlInput"
              label="Cole ou escreva seu link aqui ..."
              solo
            ></v-text-field>
          </v-col>
          <v-btn
            @click="getShortLink"
            :x-small="$vuetify.breakpoint.smAndDown"
            dark
            class="primaryDark button pa-6 mb-7"
            >Encurtar</v-btn
          >
        </div>
        <div v-if="showGeneratedLink" class="generated-link">
          <p class="bgColor mt-1" ref="generatedLink">
            {{ shortUrl }}
          </p>
          <v-btn
            v-if="isCopied"
            x-large
            text
            class="mb-3 success"
            @click="copyLink"
            ><v-icon class="bgColor--text" size="35">mdi-check</v-icon></v-btn
          >
          <v-btn v-else x-large text class="mb-3" @click="copyLink">
            <v-icon class="bgColor--text" size="35"> mdi-content-copy </v-icon>
          </v-btn>
        </div>
      </section>
    </v-container>
    <v-container class="bgColor history-section">
      <v-col class="align-center" cols="6" sm="6" md="4" v-if="!isLogged">
        <p class="mt-10">
          Encurtador de URL da Speedio é uma ferramenta poderosa para encurtar
          links. Use o nosso Encurtador de Link para diminuir uma URL longa e
          gerar um link curto. Se quiser ter acesso à todos os links que você
          encurtou e gerencia-los, crie sua conta agora no link abaixo e tenha
          acesso.
        </p>
        <v-btn
          :x-small="$vuetify.breakpoint.smAndDown"
          dark
          class="secondary button pa-6 mb-7"
          >Criar conta</v-btn
        >
      </v-col>
      <v-col cols="12" md="6" v-else>
        <History @onClickDelete="deleteLink" :allLinks="listOfUrls" />
      </v-col>
      <img class="hidden-sm-and-down" src="@/assets/link-short.svg" />
    </v-container>
    <v-dialog></v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    History: () => import("../components/History.vue"),
  },
  data() {
    return {
      showGeneratedLink: false,
      toggle: false,
      urlInput: "",
      shortUrl: null,
      isCopied: false,
      listOfUrls: [],
    };
  },
  methods: {
    logout() {
      this.$store.commit("setIfUserIsLogged", false);
      this.$store.commit("getUserInfo", undefined);
      this.$router.push("/login");
    },
    getShortLink() {
      const requisition = {
        url: "https://is.gd/create.php?format=json&url=" + this.urlInput,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      axios(requisition).then((response) => {
        this.shortUrl = response.data.shorturl;
        this.showGeneratedLink = true;
        this.saveUrlOnDB();
      });
    },
    saveUrlOnDB() {
      let userID = "";

      const { currentUser } = this.$store.state;

      if (currentUser) {
        userID = currentUser.id;
      }

      const saveBody = {
        url: `http://localhost:3000/urls?user.id=${userID}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          shorturl: this.shortUrl,
          user_id: userID,
        },
      };
      axios(saveBody)
        .then(() => {
          this.getAllLinksByUserId();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.shortUrl);
        this.isCopied = true;
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    getAllLinksByUserId() {
      let id = this.$store.state.currentUser.id;
      axios
        .get(`http://localhost:3000/urls?user.id=${id}`)
        .then((allLinks) => {
          this.listOfUrls = allLinks.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteLink(data) {
      const receivedID = data.id;
      axios
        .delete(`http://localhost:3000/urls/${receivedID}`)
        .then(() => {
          const itemIndex = this.listOfUrls.findIndex((p) => p.id === data.id);
          this.listOfUrls.splice(itemIndex, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getAllLinksByUserId();
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.currentUser,
      isLogged: (state) => state.isUserLogged,
    }),
  },
};
</script>
<style lang="scss" scoped>
.button {
  max-width: 250px;
  width: 100%;
}
.main-container {
  min-height: 40vh;
  background: #006196;
  margin-top: 120px;
  .url-box {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    @media (min-width: 960px) {
      padding: 90px 20px 10px 20px;
    }
  }
  .generated-link {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      border: 1px solid;
      border-radius: 5px;
      width: 900px;
    }
  }
}
img {
  width: 450px;
  height: 500px;
  @media (max-width: 1300px) {
    width: 250px;
    height: 300px;
  }
}
.history-section {
  display: flex;
  justify-content: center;
  gap: 40px;
  p {
    min-width: 100%;
    text-align: start;
    line-height: 28px;
    color: #161616;
  }
}
.v-overlay {
  z-index: 6 !important;
}
.align-center {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>