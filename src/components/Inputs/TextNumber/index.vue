<template>
  <div class="input_text_number" :style="`width:${width}px`">
    <div class="header_text" :class="required && 'required'">{{ this.text }}</div>
    <input
        :type="this.type"
        :name="this.name"
        :id="this.id"
        :placeholder="this.placeholder"
        :required="this.required"
        :autocomplete="this.type === 'text' ? this.autocomplete : false"
        v-model="input"
        :min="this.type === 'number' ? this.min : false"
        :max="this.type === 'number' ? this.max : false"
        :step="this.type === 'number' && this.step === 'any' ? this.step : false"
    />
  </div>
</template>

<script>
export default {
  name: "InputTextNumber",
  props: {
    type: {
      default: "text", //тип инпута: text, number, password
      type: String
    },
    text: {
      default: "", //текст над инпутом
      type: String,
      required: true
    },
    name: String, //название
    id: String, //id инпута
    placeholder: {
      default: "", //текст-подсказка внутри пустого инпута
      type: String,
      required: true
    },
    required: {
      default: true, //обязателен ли инпут для заполнения, "true" || "false, задавать через v-bind:required
      type: Boolean
    },
    defaultValue: {
      type: [String, Number]
    },
    autocomplete: {
      default: "on", // сохранение предыдущих введенных значений, off || on (только для input text)
      type: String
    },
    min: {
      default: null, //минимальное значения для input number
      type: Number
    },
    max: {
      default: null, //максимальное значения для input number
      type: Number
    },
    step: {
      default: "", //разрешение на ввод дробных чисел, any - ввод разрешен
      type: String
    },
    emit: {
      default: null, //название функции для передачи данных из child обратно в родительский компонент, если не нужен - null
      type: String,
      required: true
    },
    width: { //ширина input
      default: 250,
      type: Number
    }
  },
  data() {
    return {
      input: ""
    };
  },
  watch: {
    input: function(text) {
      if (this.emit) {
        this.$emit(this.emit, text);
      }
    }
  },
  mounted() {
    if (this.defaultValue !== undefined) {
      this.input = this.defaultValue;
    }
  }
}
</script>

<style scoped lang="scss">
.input_text_number {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  border: 1px solid red;
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
  input {

    margin-top: 5px;

    width: 100%;
    //font-family: Roboto;
    //font-size: 17px;
    //color: $white;
    //box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  }
}
input {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
