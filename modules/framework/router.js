'use strict';
export default class Router {
    constructor($el, routes = {}, basePath) {
        $el ? (this.$el = $el) : (this.$el = document.createElement('div'));
        this.routes = routes;
        if (basePath) {
            this.basePath = basePath
        } else {
            const path = window.location.pathname.split('/');
            path.pop();
            this.basePath = path.join('/');
        }
        this.push = this.push.bind(this);
        window.addEventListener('hashchange', this.push);
        this.render()
    }
    push(routeName) {
        let newPath;
        let newComponent;
        if (typeof routeName === 'object') {
            const currentPath = window.location.hash;
            let currentRoute;
            if (!currentPath) {
                currentRoute = Object.values(this.routes).find(comp => comp.path === '');
            } else {
                const hash = currentPath.split('/')[1];
                currentRoute = Object.values(this.routes).find(comp => comp.path === hash);
            }
            newComponent = new currentRoute.component(this.$el);
        } else {
            newPath = `${this.basePath}/#/${this.routes[routeName].path}`;
            history.pushState(null, null, newPath);
            newComponent = new this.routes[routeName].component(this.$el);
        }
        this.component.destroy();
        newComponent.render();
        this.component = newComponent;
    }
    render () {
        const currentPath = window.location.hash;
        let currentRoute;
        if (!currentPath) {
            const newPath = `${this.basePath}/#/`;
            history.pushState(null, null, newPath);
            currentRoute = Object.values(this.routes).find(comp => comp.path === '');
        } else {
            const hash = currentPath.split('/')[1];
            currentRoute = Object.values(this.routes).find(comp => comp.path === hash);
        }
        this.component = new currentRoute.component();
        this.$el = this.component.render();
        return this.$el;
    }
}
