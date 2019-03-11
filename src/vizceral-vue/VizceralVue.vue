<template>
    <div class="vizceral">
        <canvas ref="vizCanvas"></canvas>
        <div class="vizceral-notice"></div>
    </div>
</template>

<script>
import VizceralGraph from "vizceral";
export default {
  data() {
    return {
      vizceral: null
    };
  },
  watch: {
    styles(val, oldVal) {
      // console.log('styles')
      if (val !== oldVal) {
        this.updateStyles(val);
      }
    },
    view(val, oldVal) {
      // console.log('view')
      if (val !== oldVal) {
        this.setView();
      }
    },
    objectToHighlight(val, oldVal) {
      // console.log('objectToHighlight')
      if (val !== oldVal) {
        this.setView();
      }
    },
    filters(val, oldVal) {
      // console.log('filters')
      if (val !== oldVal) {
        this.vizceral.setFilters(val);
      }
    },
    allowDraggingOfNodes(val, oldVal) {
      // console.log('alloDraggingOfNodes')
      if (val !== oldVal) {
        this.setOptions();
      }
    },
    showLabels(val, oldVal) {
      // console.log('showLabels')
      if (val !== oldVal) {
        this.setOptions();
      }
    },
    modes(val, oldVal) {
      if (val !== oldVal) {
        this.vizceral.setModes(val);
      }
    },
    definitions(val, oldVal) {
      // console.log('definitions')
      if (val !== oldVal) {
        this.vizceral.updateDefinitions(val);
      }
    },
    match(val, oldVal) {
      // console.log('match')
      if (val !== oldVal) {
        this.vizceral.findNodes(val);
      }
    },
    traffic(val, oldVal) {
      // console.log('traffic')
      val.updated = val.updated || Date.now();
      if (!oldVal.nodes || val.updated > (oldVal.updated || 0)) {
        this.vizceral.updateData(val);
      }
    }
  },
  mounted() {

    if (this.vizceral) return;

    this.vizceral = new VizceralGraph(
      this.$refs.vizCanvas,
      this.targetFramerate
    );

    this.vizceral.on("viewChanged", this.viewChanged);
    this.vizceral.on("objectHighlighted", this.objectHighlighted);
    this.vizceral.on("objectHovered", this.objectHovered);
    this.vizceral.on("nodeUpdated", this.nodeUpdated);
    this.vizceral.on("nodeContextSizeChanged", this.nodeContextSizeChanged);
    this.vizceral.on("matchesFound", this.matchesFound);
    this.vizceral.on("viewUpdated", this.viewUpdated);

    this.updateStyles(this.styles);
    this.setOptions();

    const propsData = this.$options.propsData;

    if (propsData.filters) {
      this.vizceral.setFilters(this.filters);
    }

    if (propsData.definitions) {
      this.vizceral.updateDefinitions(this.definitions);
    }

    // Finish the current call stack before updating the view.
    // If data was passed directly without any asynchronous
    // calls to retrieve the data, the initially loaded graph would not
    // animate properly.
    setTimeout(() => {
      this.setView();
      this.vizceral.updateData(this.traffic);
      const perfNow = getPerformanceNow();
      this.vizceral.animate(perfNow === null ? 0 : perfNow);
      this.vizceral.updateBoundingRectCache();
    }, 0);
  },
  beforeDestroyed() {
    delete this.vizceral;
  },
  methods: {
    viewChanged(data) {
      this.$emit("onViewChanged", data);
    },
    objectHighlighted(highlightedObject) {
      this.$emit("onObjectHighlighted", highlightedObject);
    },
    objectHovered(hoveredObject) {
      this.$emit("onObjectHovered", hoveredObject);
    },
    nodeUpdated() {
      this.$emit("onNodeUpdated");
    },
    nodeContextSizeChanged(dimensions) {
      this.$emit("onNodeContextSizeChanged", dimensions);
    },
    matchesFound(matches) {
      this.$emit("onMatchesFound", matches);
    },
    viewUpdated() {
      this.$emit("onViewUpdated");
    },
    updateStyles(styles) {
      const styleNames = this.vizceral.getStyles();
      const customStyles = styleNames.reduce((result, styleName) => {
        result[styleName] = styles ? styles[styleName] : null || result[styleName];
        return result;
      }, {});
      this.vizceral.updateStyles(customStyles);
    },
    setOptions() {
      this.vizceral.setOptions({
        allowDraggingOfNodes: this.allowDraggingOfNodes,
        showLabels: this.showLabels
      });
    },
    setView() {
      this.vizceral.setView(this.view, this.objectToHighlight);
    }
  },
  props: {
    definitions: {
      type: Object,
      default: null
    },
    filters: {
      type: Array,
      default: () => []
    },
    match: {
      type: String,
      default: ""
    },
    objectToHighlight: {
      type: Object,
      default: null
    },
    showLabels: {
      type: Boolean,
      default: true
    },
    allowDraggingOfNodes: {
      type: Boolean,
      default: false
    },
    modes: {
      type: Object,
      default: null
    },
    styles: {
      type: Object,
      default: null
    },
    traffic: {
      type: Object,
      default: null
    },
    view: {
      type: Array,
      default: () => []
    },
    targetFramerate: {
      type: Number,
      default: null
    }
  }
};

const getPerformanceNow = () => {
  const g = window;
  if (g != null) {
    const perf = g.performance;
    if (perf != null) {
      try {
        const perfNow = perf.now();
        if (typeof perfNow === "number") {
          return perfNow;
        }
      } catch (e) {
        // do nothing
      }
    }
  }
  return null;
};
</script>

<style scoped>
.vizceral {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.vizceral .vizceral-notice {
  display: block;
  position: absolute;
  padding: 0 3px;
  width: 200px;
  background-color: black;
  border-left: 2px solid grey;
  font-size: 11px;
  color: grey;
}
.vizceral .vizceral-notice ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.vizceral .vizceral-notice > ul > li {
  line-height: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.vizceral .vizceral-notice .subtitle {
  font-weight: 900;
}
</style>