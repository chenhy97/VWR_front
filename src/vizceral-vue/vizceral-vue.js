'use strict';

import VizceralVue from './VizceralVue';

export default {
    install: function (Vue, parameters) {

        parameters = parameters || {};

        let ready = false;

        function init(params, root) {
            ready = true;
        }

        Vue.mixin({
            created: function () {
                if (!ready && this === this.$root) {
                    init(this.$options.vizceralVue, this.$root);
                }
            },
            components: {
                'vizceral-vue': VizceralVue
            }
        });
    }
}