/* eslint-env browser */
/* eslint-disable no-console */

'use strict';

class NavigationBar {
    constructor(route) {
        this.navBar = document.getElementById('nav-bar');
        this.titles = [];
        this.routes = [];

        const arr = Array.from(this.navBar.children);
        for (let i = 0; i < arr.length; i += 1) {
            this.titles.push(arr[i].innerHTML);
            this.routes.push(arr[i].href.split('#')[1]);
        }

        this.selectNavBtn(route);
    }

    selectNavBtn(route) {
        let newTitle = null;
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i] === route) {
                newTitle = this.titles[i];
            }
        }
        if (!newTitle && route === 'modify') {
            newTitle = 'Deploy';
        }

        const selectedNavBtn = document.getElementById('selected-nav');
        if (selectedNavBtn) selectedNavBtn.removeAttribute('id');

        const arr = Array.from(this.navBar.children);
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i].innerText === newTitle) {
                arr[i].id = 'selected-nav';
                arr[i].innerText = newTitle;
                this.disable();

                this.renderComplete = () => {
                    this.enable();
                    this.renderComplete = null;
                };
            }
        }
    }

    enable() {
        Array.from(this.navBar.children).forEach((child) => {
            child.classList.remove('nav-disabled');
        });
    }

    disable() {
        Array.from(this.navBar.children).forEach((child) => {
            child.classList.add('nav-disabled');
        });
    }
}

module.exports = class UiWorker {
    constructor(appId) {
        this.appId = appId;
        this.app = document.getElementById('app');
        this.curRoute = null;
        this.navBar = null;
    }

    startMoveToRoute(route) {
        this.curRoute = route;
        if (!this.navBar) this.navBar = new NavigationBar(this.curRoute);
        else this.navBar.selectNavBtn(this.curRoute);

        if (!this.app) {
            this.app = document.getElementById('app');
        }

        this.app.scrollIntoView({ behavior: 'smooth' });
    }

    completeMoveToRoute() {
        if (this.curRoute === 'api') this.app.classList.add('height-100perc');
        else this.app.classList.remove('height-100perc');
        this.navBar.enable();
    }

    static iterateHtmlCollection(collection, func) {
        console.log('iterateHtmlCollection, children: ', collection);
        for (let i = 0; i < collection.children.length; i++) {
            func(collection.children[i]);
        }
    }

    static store(key, value) {
        localStorage.setItem(key, value);
    }

    static getStore(key) {
        return localStorage.getItem(key);
    }
};
