<template>
<div class="menu">
  <img class="logo" :src="require('@/assets/logo_mini.svg')" />
  <router-link class="nav" v-for="(item, index) in menuItems" :key="index" :to="item.path" custom>
    <img v-if="item.path===$route.path" :src="require('@/assets/'+item.icon_active)" />
    <img v-else :src="require('@/assets/'+item.icon)" />
  </router-link>
</div>
</template>

<script>
import {PATH_NEW_ORDER, PATH_ORDERS} from "@/Permission";

export default {
  name: "Menu",
  data() {
    return {
      menuItems: [
        {
          icon: 'new_order_btn.svg',
          icon_active: 'new_order_btn_active.svg',
          path: PATH_NEW_ORDER
        },
        {
          icon: 'orders_btn.svg',
          icon_active: 'orders_btn_active.svg',
          path: PATH_ORDERS
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  align-content: center;
  background: $black2;
  width: 64px;
  padding: 16px;
  box-sizing: border-box;
  .logo {
    width: 32px;
    height: 32px;
  }
  .nav {
    margin-top: 43px;
    display: flex;
    justify-content: center;
  }
}
</style>
