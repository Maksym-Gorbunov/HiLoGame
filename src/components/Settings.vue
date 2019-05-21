<template>
  <div class="table-responsive" id="my_table_box">
    <table id="my_table" class="table table-dark table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">question</th>
          <th scope="col">difficulty</th>
          <th scope="col">answer</th>
          <th scope="col">actions</th>
        </tr>
      </thead>
      <tbody v-for="item in this.data" v-bind:key="item.index">
        <TableItem v-bind:item="item" />
        <!-- <TableItem
          v-bind:item="item"
          v-on:table-click="$emit('table-click', item)"
          v-bind:play="play"
        /> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import TableItem from "./TableItem.vue";

export default {
  name: 'Settings',
  props: [],
  components: { TableItem },
  data(){
    return {
      data: []
    }
  },
  methods: {
    getAllDataFromApi(total, difficulty){
      console.log(111)
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
      var apiUrl = `http://localhost:3000/data/3/easy`
      var xhr = new XMLHttpRequest()
      let that = this
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText)
            
            that.sendData(data)
          }
          if (xhr.status == 500) {
            console.log("serverfel");
          }
        }
      }
      xhr.open("GET", apiUrl);
      xhr.responseType = "json";
      xhr.send();
    }
  },
  created(){
    this.getAllDataFromApi()
  }

}
</script>

<style>

</style>
