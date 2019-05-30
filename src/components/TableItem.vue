<template>
  <tr :class="{editable: this.editable == true}" :id="item._id">
    <!-- <td :id="{{item.question}}"></td>   -->
    <td>{{this.tableIndex.index+1}}</td>
    <td :contenteditable="this.editable">{{item.question}}</td>
    <td :contenteditable="this.editable">{{item.difficulty}}</td>
    <td :contenteditable="this.editable">{{item.answer}}</td>
    <td>
      <button @click="edit()" type="button" class="btn btn-primary btn-sm my_btn table_btn">
        <i class="far fa-edit"></i> edit
      </button>
      <button @click="deleteItem()" type="button" class="btn btn-danger btn-sm my_btn table_btn">
        <i class="far fa-trash-alt"></i> delete
      </button>
    </td>
  </tr>
</template>


<script>
export default {
  name: "TableItem",
  props: ["item", "total", "tableIndex"],
  components: {},
  data() {
    return {
      editable: false,
      clickedItem: ""
    };
  },
  methods: {
    edit() {
      if (!this.editable) {
        this.editable = true;
        $("tr").addClass("disabled");
        $("header").addClass("disabledHeader");
        var row = $("#" + this.item._id);
        row.removeClass("disabled");
        var tr, tr_answer, tr_question, tr_difficulty;
        tr = document.getElementById(this.item._id);
        tr.childNodes[4].childNodes[1].classList.add("disabled");
        tr_question = tr.childNodes[1].innerText;
        tr_difficulty = tr.childNodes[2].innerHTML;
        tr_answer = tr.childNodes[3].innerText;
        console.log(tr_answer);
      } else {
        this.editable = false;
        $("tr").removeClass("disabled");
        $("header").removeClass("disabledHeader");
        let new_tr = document.getElementById(this.item._id);
        new_tr.childNodes[4].childNodes[1].classList.remove("disabled");
        let new_question = new_tr.childNodes[1].innerText;
        let new_difficulty = new_tr.childNodes[2].innerHTML;
        let new_answer = new_tr.childNodes[3].innerText;
        this.item.question = new_question;
        this.item.difficulty = new_difficulty;
        if($.isNumeric( new_answer )){
          this.item.answer = parseInt(new_answer);
          this.updateItem(this.item);
        }
      }
    },
    getAllDataFromApi() {
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var apiUrl = `http://localhost:3000/data`;
      var xhr = new XMLHttpRequest();
      let that = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            that.$store.commit("setData", data);
          }
          if (xhr.status == 500) {
            console.log("serverfel");
          }
        }
      };
      xhr.open("GET", apiUrl);
      xhr.responseType = "json";
      xhr.send();
    },
    updateItem(item) {
      var url = "http://localhost:3000/update/";
      var json = JSON.stringify(item);
      var xhr = new XMLHttpRequest();
      let that = this;
      xhr.open("PUT", url + item._id, true);
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == "200") {
          that.getAllDataFromApi();
        }
      };
      xhr.send(json);
    },
    deleteItem() {
      this.$store.commit("deleteDataItem", this.item);
      this.deleteQuestionFromDB(this.item._id);
    },
    deleteQuestionFromDB(id) {
      var url = "http://localhost:3000/delete/";
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", url + id, true);
      xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == "200") {
        }
      };
      xhr.send(null);
    }
  },
  created() {},
  mounted() {}
};
</script>


<style scoped>
.editable {
  border: 2px solid yellow;
}
.disabled {
  pointer-events: none;
  opacity: 0.3;
}
.table_btn{
  min-width: 5rem;
}

</style>


