import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Dropdown from 'primevue/dropdown';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("Menu", Menu);
    nuxtApp.vueApp.component("Dropdown", Dropdown);
    
    //other components that you need
});