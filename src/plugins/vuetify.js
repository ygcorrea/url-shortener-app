import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#006196',
                primaryDark: '#2f2e41',
                secondary: '#ff6600',
                accent: '#8c9eff',
                error: '#b71c1c',
                bgColor: '#f2f2f2',
                success: '#109922'
            },
            dark: {
                primary: '#006196',

            },
        },
    },
});
