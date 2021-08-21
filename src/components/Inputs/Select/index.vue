<template>
  <div class="select" :style="`width:${width}px`">
      <span
          class="header_text" :class="required && 'required'"
      >{{ this.text }}</span
      >
    <select v-model="input" :id="this.id">
      <option :value="null"></option>
      <option
          v-for="(item, index) in this.values"
          :key="index"
          :value="item.value"
      >{{ item.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Select",
  data() {
    return {
      input: null
    };
  },
  props: {
    text: {
      default: "", //текст над инпутом
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    required: {
      default: true, //обязателен ли инпут для заполнения, "true" || "false, задавать через v-bind:required
      type: Boolean
    },
    values: {
      type: Array,
      required: true
    },
    emit: {
      default: null, //название функции для передачи данных из child обратно в родительский компонент, если не нужен - null
      type: String,
      required: true
    },
    defaultValue: {
      type: String,
      default: null
    },
    width: { //ширина input
      default: 250,
      type: Number
    }
  },
  watch: {
    input: function(value) {
      if (this.emit) {
        this.$emit(this.emit, value);
      }
    },
    defaultValue: function(value) {
      this.input = value;
    }
  },
  mounted() {
    this.input = this.defaultValue ? this.defaultValue : null;
  }
}
</script>

<style scoped lang="scss">
.select {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border: 1px solid red;
  position: relative;
  &:after {
    content: url("../../../assets/arrow_orange.svg");
    position: absolute;
    bottom: 5px;
    right: 10px;
  }
  .header_text {
    max-width: calc(100% - 18px);
    //box-sizing: border-box;
    position: relative;
    border: 1px solid goldenrod;
    &.required {
      &:after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background: $orange;
        position: absolute;
        right: -13px;
        bottom: 4px;
      }
    }
  }
  select {
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
  }
}
</style>
