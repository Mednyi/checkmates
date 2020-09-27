'use strict';
import Router from './framework/router.js'
import Component from './framework/component.js'
import Header from "./Header.js";
import Landing from "./Landing.js";
import Auth from "./Auth.js";
import Footer from "./Footer.js";
const router = new Router(undefined, {
    landing: {
        path: '',
        component: Landing
    },
    auth: {
        path: 'auth',
        component: Auth
    }
});
Component.use({$router: router});
export default class App extends Component {
    onRender() {
        this.$el.append(this.components.header.render());
        this.$el.append(router.$el);
        this.$el.append(this.components.footer.render());
    }
    components = {
        header: new Header(),
        footer: new Footer()
    }
}
const app = new App({}, './assets/css/main.scss', document.body);
app.render();
