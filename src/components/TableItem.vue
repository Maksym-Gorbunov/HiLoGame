<template>
  <tr>
    <td>{{item.question}}</td>  
    <td>{{item.difficulty}}</td>  
    <td>{{item.answer}}</td>  
    <td>
      <button @click="edit()" type="button" class="btn btn-primary btn-sm">edit</button>  
      <button @click="deleteItem()" type="button" class="btn btn-danger btn-sm">delete</button>  
    </td>  
  </tr>
</template>


<script>

export default {
  name: "TableItem",
  props: ["item", "total"],
  components: {  },
  methods: {
    edit(){
      console.log('edit')
      console.log(this.item)
    },
    deleteItem(){
      console.log('delete')
      console.log(this.item)
    }
  },
  created() {
  }
};
</script>


<style scoped>

</style>


