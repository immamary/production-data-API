<template>
  <div class="container">
    <div class="header">
      <input type="file" @change="upload" ref="myFiles" />
      <input type="button" value="Plot Chart" id="plot-chart" />
      <hr />
    </div>
    <div class="content">
      <div class="treeview">
        <ul></ul>
      </div>
      <div class="chart">
        <svg width="900" height="600"></svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProcessExcelData } from "@/utils/readExcel";
import {
  columnHeaderMappings,
  productionDataAPI,
} from "@/businessLogic/productionData";

@Component({
  components: {},
})
export default class App extends Vue {
  private async upload(e: InputEvent) {
    const file = e.target!.files[0];
    const buffer = await file.arrayBuffer();
    ProcessExcelData(buffer);

    const mapping: columnHeaderMappings = {
      "Drainage Point": "UNIQUEID",
      Date: "",
      Oil: "",
      CHP: "",
      THP: "",
      Gas: "",
      Sand: "",
      Water: "",
      "Water Injected": "",
      "Production Days": "",
      "Production Type": "",
      "Gas Injected": "",
      "Bean Size": "",
    };

    const result = productionDataAPI.readSheet(buffer, mapping);
    console.log(productionDataAPI.getColumnHeaders());
  }
}
</script>

<style>
.content {
  display: flex;
  height: calc(100vh - 55px);
}
.treeview {
  flex-basis: 250px;
  background: rgb(233, 230, 230);
}
.chart {
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
