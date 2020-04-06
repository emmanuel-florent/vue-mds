<template>
<div>
  <div class="center-div"> 
    <MultiDateSelector :selected="example" @input="onInput"></MultiDateSelector>
  </div>
    <p>Debug:</p>
    <p  :key="m.getTime()" v-for="m of example">
        {{ m.toLocaleString() }}
    </p>
</div>
</template>

<script>
import MultiDateSelector from './MultiDateSelector';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    MultiDateSelector,
  },
  data: () => {
    return {
      example:[ new Date(Date.UTC(2020, 3, 1, 0, 0, 0))] 
    }
  },
  methods: {
    onInput(values) {
      this.example = values
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-div {
  display: inline-block;
  text-align: center;
}
</style>
