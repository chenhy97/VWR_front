<template>
    <div class="vizceral-container">
        <div class="service-traffic-map" >
            <vizceral-vue
                :traffic="traffic"
                :view="view"
                :objectToHighlight="objectToHighlight"
                :filters="filters"
                :match="searchTerm"
                :modes="modes"
                :allowDraggingOfNodes="allowDraggingOfNodes"
                :showLabels="showLabels"                
                @onViewChanged="viewChanged"
                @onViewUpdated="viewUpdated"
                @onObjectHighlighted="objectHighlighted"
                @onNodeContextSizeChanged="nodeContextSizeChanged"
                @onMatchesFound="matchesFound"
                @onObjectHovered="objectHovered">
            </vizceral-vue>
        </div>
    </div>
</template>

<script>
import TWEEN from "tween";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import http from "axios";
export default {
  props: {
    region: {
      type: String,
      default: undefined
    }
  },
  watch: {
    region(val, oldVal) {
      if (val !== oldVal) {
        this.setViewFromRoute();
      }
    }
  },
  mounted() {
    console.log("mounted");
    this.beginSampleData();
    this.setViewFromRoute();
  },
  computed: {
    ...mapGetters({
      allowDraggingOfNodes: 'allowDraggingOfNodes',
      showLabels: 'showLabels'
    }),
    ...mapState({
      traffic: state => state.traffic,
      view: state => state.view,
      objectToHighlight: state => state.objectToHighlight,
      filters: state => state.filters,
      searchTerm: state => state.searchTerm,
      modes: state => state.modes,
    }),
    viewIsSameAsRoute() {
      return this.view && this.view[0] === this.region;
    }
  },
  methods: {
    ...mapMutations({
      setTraffic: 'setTraffic',
      setView: 'setView',
      setObjectToHighlight: 'setObjectToHighlight'
    }),
    setViewFromRoute() {
      if (!this.viewIsSameAsRoute) {
        // console.log("setViewFromRoute", this.region);
        this.setView([this.region]);
      }
    },
    setRouteFromView() {
      if (!this.viewIsSameAsRoute) {
        const regionRoute = this.view ? this.view[0] : undefined;
        // console.log('setRouteFromView', regionRoute)
        if (regionRoute){
          this.$router.push({ name: 'region', params: { region: regionRoute } });
        }
        else {
          this.$router.push({ name: 'default' });
        }
      }
    },
    viewChanged(data) {
      console.log("viewChanged:", data);
      this.setView(data.view);
      this.setRouteFromView();
    },
    viewUpdated() {
      // console.log("viewUpdated");
    },
    objectHighlighted(highlightedObject) {
      console.log("objectHighlighted:", highlightedObject);
      this.setObjectToHighlight(highlightedObject);
    },
    nodeContextSizeChanged(dimensions) {
      // console.log("nodeContextSizeChanged:");
    },
    matchesFound(matches) {
      // console.log("matchesFound:", matches);
    },
    objectHovered(hoveredObject) {
      // console.log("objectHovered");
    },
    beginSampleData() {
      console.log("beginSampleData");
      let self = this;
      self.setTraffic({ nodes: [], connections: [] });
      http.get("/static/sample_data.json").then(result => {
        self.traffic.clientUpdateTime = Date.now();
        console.log(result)
        self.updateData(result.data);
      });
    },
    updateData(newTraffic) {

      // const regionUpdateStatus = _.map(
      //   _.filter(newTraffic.nodes, n => n.name !== "INTERNET"),
      //   node => {
      //     const updated = node.updated;
      //     return { region: node.name, updated: updated };
      //   }
      // );
      // const lastUpdatedTime = _.max(_.map(regionUpdateStatus, "updated"));

      this.setTraffic(newTraffic);

      //   this.setState({
      //     regionUpdateStatus: regionUpdateStatus,
      //     timeOffset: newTraffic.clientUpdateTime - newTraffic.serverUpdateTime,
      //     lastUpdatedTime: lastUpdatedTime,
      //     trafficData: newTraffic
      //   });
    }
  }
};
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);
</script>
<style>
.vizceral-container{
  height: 100%;
  position: relative;
}
.service-traffic-map{
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
}
.viz-box-body{
  height: 500px;
  width: 100%;
}
</style>