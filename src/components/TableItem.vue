<template>
  <tr>
    <td>1</td>  
    <td>2</td>  
    <td>3</td>  
    <td>4</td>  


    <!--
    <td
      :class="{total: item.combination === 'total score',
                      sum: item.combination === 'sum' || item.combination === 'bonus'}"
    >{{ item.combination }}</td>

    <td
      :class="{total: item.combination === 'total score',
                      sum: item.combination === 'sum' || item.combination === 'bonus', 
                      used: item.used, 
                      clickable: item.clickable, 
                      possible: play && !item.used && item.combination!=='total score' && item.combination!=='sum' 
                        && item.combination!=='bonus',
                      selected: item.selected == true  }"
      v-bind="showPoings()"
      @click="$emit('table-click', item)"
      class="text_center"
    >{{ currentPoings }}</td>

    <td
      :class="{total: item.combination === 'total score',
                      sum: item.combination === 'sum' || item.combination === 'bonus',}"
      class="text_center"
    >{{item.poings}}/{{item.max}}</td>

    <td
      :class="{total: item.combination === 'total score',
                      sum: item.combination === 'sum' || item.combination === 'bonus'}"
      class="story_td"
    >
      <Story v-bind:story="item.story"/>
    </td>
    -->
  </tr>
</template>


<script>

export default {
  name: "TableItem",
  props: ["item"],
  components: {  },
  methods: {
  },
  created() {
  }
};
</script>


<style scoped>

</style>


