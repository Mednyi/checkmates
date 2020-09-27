'use strict';
export default class Component {
    constructor(data = {}, $css = undefined, $el = undefined) {
        this.data = data;
        this.$el = $el;
        this.$css = $css;
        this.methods = this.methods();
        Object.keys(this.methods).forEach(methodName => {
            this.methods[methodName]  = this.methods[methodName].bind(this);
        })
    }
    static use (plugin) {
        let pluginKey = Object.keys(plugin)[0];
        let pluginValue = plugin[pluginKey];
        this.prototype[pluginKey] = pluginValue;
    }
    methods () {return {}}
    template () {return `<div></div>`}
    destroy () {
        const oldLink = document.querySelector(`link[href="${this.$css}"]`);
        if (oldLink) oldLink.remove();
        if (this.$el) this.$el.remove();
        delete this;
    }
    onRender () {}
    render () {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.template();
        if (this.$el) {
            this.$el.innerHTML = wrapper.firstElementChild.innerHTML;
        } else {
            this.$el = wrapper.firstElementChild;
        }
        if (this.$css) {
            const oldLink = document.querySelector(`link[href="${this.$css}"]`);
            if (oldLink) oldLink.remove();
            const link = document.createElement('link');
            link.href = this.$css;
            link.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].append(link);
        }
        this.onRender();
        return this.$el;
    }
}
