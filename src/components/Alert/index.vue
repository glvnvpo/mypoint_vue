<template>
<div class="alert">
  <div class="frame">
    {{text}}
    <div>
      <button @click="$emit('result', true)" class="yellow">Удалить</button>
      <button @click="$emit('result', false)" class="orange">Отмена</button>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    text: String
  }
}
</script>

<style scoped lang="scss">
.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($black2, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .frame {
    border: 1px solid $orange;
    border-radius: 3px;
    background: $white;
    padding: 10px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    div {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      button {
        border-radius: 3px;
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        background: none;
        &.yellow {
          border: 1px solid $yellow;
          color: $yellow;
          transition: all ease 0.3s;
          &:hover {
            background: $yellow;
            color: $white;
          }
        }
        &.orange {
          border: 1px solid $orange;
          color: $orange;
          transition: all ease 0.3s;
          &:hover {
            background: $orange;
            color: $white;
          }
        }
      }
      //display: flex;
    }
  }
}
</style>
