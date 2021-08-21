<template>
  <div id="base_page">
    <Menu/>
    <router-view id="page" />
  </div>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "BasePage",
  components: {Menu}
};
</script>

<style scoped lang="scss">
#base_page {
  display: grid;
  grid-template-columns: 64px auto;
  width: calc(100% + (-1 * (100vw - 100%)));
  height: 100%;
  #page {
    border: 2px solid red;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 50px;
    margin-bottom: 20px;
  }
}
</style>
