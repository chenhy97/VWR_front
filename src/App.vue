<template>
    <div id="app" class="container">
        <router-view></router-view>
    </div>
</template>

<script>
    import { TrafficFlow } from '@/components';
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
    export default {
        components: {
            'traffic-flow': TrafficFlow
        }
    }
</script>
html,body<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
  height: 100%;
  position: relative;
}
</style>