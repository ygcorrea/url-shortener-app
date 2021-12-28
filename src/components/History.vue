<template>
  <v-card max-width="600" class="ma-0 pa-0">
    <v-toolbar color="primaryDark" dark>
      <v-toolbar-title>Histórico de links</v-toolbar-title>
    </v-toolbar>

    <v-list subheader>
      <v-list-item v-for="(link, i) in allLinks" :key="i">
        <v-list-item-content>
          {{ link.shorturl }}
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn icon @click="deleteLink(i)">
            <v-icon class="primaryDark--text">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["allLinks"],
  name: "History",
  methods: {
    deleteLink(i) {
      const data = this.allLinks[i].id;
      this.$emit("onClickDelete", { id: data });
    },
  },
};
</script>