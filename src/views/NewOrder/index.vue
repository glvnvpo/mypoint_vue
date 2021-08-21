<template>
<div class="new_order">
  <div class="left_block">
    <div class="title">Добавление заказа</div>
    <form @submit.prevent="addNewOrder()">
      <InputTextNumber
          text="Адрес отправления"
          defaultValue="Якутск, улица Кулаковского, 20"
          placeholder="Якутск, ул. ..."
          emit="pointA"
          @pointA="(value) => {this.newOrder.point_a = value}"
          type="text"
          id="pointA"
      />
      <InputTextNumber
          text="ФИО клиента"
          placeholder="Введите ФИО клиента"
          emit="fio"
          @fio="(value) => {this.newOrder.fio = value}"
          type="text"
          id="fio"
          :required="false"
      />
      <InputTextNumber
          text="Телефон клиента"
          placeholder="+7 (___) ___-__-__"
          emit="telephone"
          @telephone="(value) => {this.newOrder.telephone = value}"
          type="tel"
          id="telephone"
          defaultValue="+79652223254"
      />
      <InputTextNumber
          text="Адрес доставки"
          placeholder="Якутск, ул. ..."
          defaultValue="Якутск, проспект Ленина, 28"
          emit="pointB"
          @pointB="(value) => {this.newOrder.point_b = value}"
          type="text"
          id="pointB"
      />
      <Select
          text="Курьер"
          id="courier"
          :values="couriers"
          emit="courierId"
          @courierId="(value) => {this.newOrder.courierId = parseInt(value)}"
      />
      <div class="container">
        <InputTextNumber
            text="Подъезд"
            emit="entrance"
            @entrance="(value) => {this.newOrder.entrance = parseInt(value)}"
            type="number"
            id="entrance"
            :min="1"
            :width="55"
            :required="false"
        />
        <InputTextNumber
            text="Этаж"
            emit="floor"
            @floor="(value) => {this.newOrder.floor = parseInt(value)}"
            type="number"
            id="floor"
            :width="55"
            :required="false"
        />
        <InputTextNumber
            text="Кв/Офис"
            emit="flat"
            @flat="(value) => {this.newOrder.flat = parseInt(value)}"
            type="number"
            id="flat"
            :min="0"
            :width="55"
            :required="false"
        />
        <InputTextNumber
            text="Домофон"
            emit="intercom"
            @intercom="(value) => {this.newOrder.intercom = parseInt(value)}"
            type="number"
            id="intercom"
            :min="0"
            :width="55"
            :required="false"
        />
      </div>
      <Select
          text="Вид товара"
          id="goods"
          :values="goods"
          emit="goodId"
          @goodId="(value) => {this.newOrder.goodId = parseInt(value)}"
      />
      <div class="wrap">
        <Select
            text="Способ оплаты"
            id="payment"
            :values="paymentMethods"
            emit="payment"
            @payment="(value) => {this.newOrder.status = parseInt(value)}"
            :width="120"
        />
        <InputTextNumber
            text="Стоимость"
            emit="cost"
            @cost="(value) => {this.newOrder.cost = parseInt(value)}"
            type="number"
            id="cost"
            :min="0"
            :width="120"
        />
      </div>
      <InputTextNumber
          text="Примечание"
          emit="comment"
          @comment="(value) => {this.newOrder.comment = value}"
          type="text"
          id="comment"
          :height="121"
          :required="false"
      />
      <div class="total"><span>Тариф: {{newOrder.cost ? newOrder.cost+50 : 0}} Р</span><button type="submit">Добавить</button></div>
    </form>
  </div>
  <div class="right_block">
    <yandex-map
        ref="map"
        :coords="[62.02, 129.73]"
        zoom="13"
        :controls="[]"
    >
    </yandex-map>
  </div>
</div>
</template>

<script>
import InputTextNumber from "@/components/Inputs/TextNumber";
import Select from "@/components/Inputs/Select";
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import {ORDERS} from "@/Permission";
export default {
  name: "NewOrder",
  components: {Select, InputTextNumber, yandexMap, ymapMarker},
  data() {
    return {
      newOrder: {
        id: null,
        courierId: null,
        point_a: null,
        point_b: null,
        entrance: null, //подъезд
        floor: null,
        flat: null,
        intercom: null, //домофон
        telephone: null,
        waiting_time: null, //время ожидания в минутах,
        date: null,
        time: null,
        hub: null,
        express_order: false, //cрочный заказ
        goodId: null,
        cost: null,
        status: null,
        comment: null,
        fio: null
      },
      emptyOrder: {
        id: null,
        courierId: null,
        point_a: null,
        point_b: null,
        entrance: null, //подъезд
        floor: null,
        flat: null,
        intercom: null, //домофон
        telephone: null,
        waiting_time: null, //время ожидания в минутах,
        date: null,
        time: null,
        hub: null,
        express_order: false, //cрочный заказ
        goodId: null,
        cost: null,
        status: null,
        comment: null,
        fio: null
      }
    }
  },
  computed: {
    couriers() {
      return this.$store.getters.couriers;
    },
    hubs() {
      return this.$store.getters.hubs;
    },
    goods() {
      return this.$store.getters.goods;
    },
    paymentMethods() {
      return this.$store.getters.paymentMethods;
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  methods: {
    addNewOrder() {
      this.newOrder.waiting_time = Math.floor(Math.random() * (30 - 10)) + 10;
      let now = new Date();
      let month = now.getMonth()+1;
      this.newOrder.date = now.getDate()+'.'+(month<10 ? '0'+month: month)+'.'+now.getFullYear();
      this.newOrder.time = now.getHours()+':'+ now.getMinutes();
      this.newOrder.hub = this.hubs[Math.floor(Math.random() * (this.hubs.length - 1)) + 1].value;
      this.newOrder.id = this.orders[0].id+1;
      this.$store.dispatch("addOrder", this.newOrder)
      this.newOrder = this.emptyOrder;
      this.$router.push({name: ORDERS});
    }
  }
}
</script>

<style scoped lang="scss">
.new_order {
  display: flex;
  .left_block {
    .title {
      font-size: 15px;
      font-family: SegoeUI Bold;
      margin-bottom: 32px;
    }
  form {
    display: grid;
    grid-template-columns: 250px 250px;
    grid-column-gap: 20px;
    align-items: start;
    .pointA {
      grid-column: 1/3;
    }
    .pointB, .courier {
      margin-bottom: 5px;
    }
    .container {
      grid-column: 1/3;
      display: flex;
      .entrance, .floor, .flat, .intercom {
        margin-right: 10px;
        font-size: 12px;
      }
    }
    #cost {
      height: 121px;
    }
    .comment {
      grid-column: 2/3;
      grid-row: 5/7;
    }
    .wrap {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }
    .total {
      grid-column: 2/3;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      span {
        font-size: 15px;
        font-family: SegoeUI Bold;
      }
      button {
        border-radius: 3px;
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        background: none;
        border: 1px solid $orange;
        color: $orange;
        transition: all ease 0.3s;
        &:hover {
          background: $orange;
          color: $white;
        }
      }
    }
  }
  }
  .right_block {
    margin-left: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ymap-container {
      width: 100%;
      height: calc(100% - 200px);
    }
  }
}
</style>
