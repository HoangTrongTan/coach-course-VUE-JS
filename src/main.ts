import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// all this module will have been merge to one, so need import when want use it, Let's use defineAsyncComponent.
// using defineAsyncComponent to identify asynchronous component and actually loaded when needed.
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from './components/ui/BaseButton.vue';
import BaseBage from './components/ui/BaseBage.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
// import BaseDialog from './components/ui/BaseDialog.vue';
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'))

const app = createApp(App);
app.use(store);
app.use(router);

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-bage', BaseBage)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount("#app");
