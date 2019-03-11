'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        traffic: {
            nodes: [],
            connections: []
        },
        view: undefined,
        objectToHighlight: undefined,
        filters: [],
        searchTerm: "",
        modes: undefined,
        displayOptions: {
            allowDraggingOfNodes: true,
            showLabels: true
        }
    },
    getters: {
        allowDraggingOfNodes: state => state.displayOptions.allowDraggingOfNodes,
        showLabels: state => state.displayOptions.showLabels
    },
    actions: {

    },
    mutations: {
        setTraffic: (state, traffic) => {
            state.traffic = traffic;
        },
        setView: (state, view) => {
            state.view = view;
        },
        setObjectToHighlight: (state, objectToHighlight) => {
            state.objectToHighlight = objectToHighlight;
        }
    }
});