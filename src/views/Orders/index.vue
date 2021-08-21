<template>
<div class="orders">
  <div class="left_block">
      <div class="title">Текущие заказы</div>
    <div class="form">
      <InputTextNumber
          text="# Заказа"
          placeholder="№"
          emit="orderNumber"
          @orderNumber="(value) => {this.orderIdNumber = value !== '' ? parseInt(value) : null}"
          :required="false"
          :width="150"
          type="number"
          :min="1"
      />
      <Select
          text="Хаб"
          id="hub"
          :values="hubs"
          :required="false"
          emit="hubNumber"
          @hubNumber="(value) => {this.hubNumber = value}"
          :width="150"
      />
      <Select
          text="Курьер"
          id="courier"
          :values="couriers"
          :required="false"
          emit="courierId"
          @courierId="(value) => {this.courierId = value}"
          :width="150"
      />
    </div>
    <div class="cards">
      <div class="card" v-for="order in ordersFiltered" :key="order.id">
        <div class="main_info">
          <div class="wrap">
            <div class="order_id">#{{order.id}}</div>
            <div class="tags">
              <div class="tag express" v-if="order.express_order">Срочный</div>
              <div class="tag hub" v-if="order.hub"><img src="../../assets/hub_img.svg" />#{{order.hub}}</div>
              <div class="tag goods" v-if="order.goods">{{order.goods}}</div>
              <div class="tag cost">{{order.cost}} ₽</div>
              <div class="tag status">{{order.status}}</div>
            </div>
          </div>
          <div class="wrap">
            <div class="waiting_time">{{getWaitingTime(order.waiting_time)}}</div>
            <div class="date">{{order.date}}</div>
            <div class="time">{{order.time}}</div>
            <button class="delete" @click="showAlert(order.id)"><img src="../../assets/cross_white.svg" /></button>
          </div>
        </div>
        <div class="block">
          <div>
            <div class="courier">
              <img src="../../assets/courier.svg" />
              <span class="name">#{{order.courier.id}} {{order.courier.name}}</span>
              <img :src="require(`../../assets/rating_star_${order.courier.rating}.svg`)" />
              <span class="rating">{{order.courier.rating}}</span>
            </div>
            <div class="point a">{{order.point_a}}</div>
            <div class="point b">{{order.point_b}}</div>
            <div class="extra_info">
                <span class="info entrance" v-if="order.entrance">Подъезд: <span class="bold">{{order.entrance}}</span></span>
                <span v-if="order.floor || order.flat || order.intercom">, </span>
                <span class="info floor" v-if="order.floor">Этаж: <span class="bold">{{order.floor}}</span></span>
                <span v-if="order.flat || order.intercom">, </span>
                <span class="info flat" v-if="order.flat">Кв / Офис: <span class="bold">{{order.flat}}</span></span>
                <span v-if="order.intercom">, </span>
                <span class="info intercom" v-if="order.intercom">Домофон: <span class="bold">{{order.intercom}}</span></span>
            </div>
            <div class="telephone">Тел.: <span class="bold">{{getFormattedTelephone(order.telephone)}}</span></div>
          </div>
          <div class="comment">{{order.comment}}</div>
        </div>
      </div>
      <div v-if="$store.getters.orders.length===0" class="empty">Заказов нет. Создайте новый!</div>
    </div>
  </div>
  <div class="right_block"></div>
  <Alert :text="`Подтвердите удаление заказа #${orderToDelete}`" v-if="alertVisibility" @result="deleteOrder" />
</div>
</template>

<script>
import InputTextNumber from "@/components/Inputs/TextNumber";
import Select from "@/components/Inputs/Select";
import Alert from "@/components/Alert";
export default {
  name: "Orders",
  components: {Select, InputTextNumber, Alert},
  data () {
    return {
      orderIdNumber: null,
      hubNumber: null,
      courierId: null,
      hubs: [{value: 3, text: 3}, {value: 4, text: 4}, {value: 7, text: 7}],
      couriers: [{value: 31, text: 'Александров Б.Ю.'}, {value: 9, text: 'Птичкин В.А.'},
        {value: 3, text: 'Собакин А.А.'},{value: 4, text: 'Макаронкина Е.К.'},{value: 8, text: 'Семенов Б.К.'}],
      alertVisibility: false,
      orderToDelete: null
    }
  },
  methods: {
    getWaitingTime(time) {
      let hours = Math.floor(time/60);
      let minutes = time - hours*60;
      let res;
      if (time) {
        res = '~';
        res += hours ? `${hours} ч ` : '';
        res += minutes && `${minutes} мин`;
      }
      else {
        res = '';
      }
      return res;
    },
    getFormattedTelephone(telephone) {
      return telephone.replace(/(\d{2})?(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5');
    },
    showAlert(id) {
      this.orderToDelete = id;
      this.alertVisibility = true;
    },
    deleteOrder(value) {
      this.alertVisibility = false;
      if (value) {
        this.$store.dispatch("deleteOrder", this.orderToDelete);
        // this.orders = this.orders.filter((el) => { return el.id !== this.orderToDelete });
      }
    }
  },
  computed: {
    ordersFiltered () {
      if (this.orderIdNumber == null && this.hubNumber == null && this.courierId == null) {
        return this.$store.getters.orders;
        // this.store.o
        // return this.orders;
      }
      else {
        let orders = this.$store.getters.orders;
        if (this.orderIdNumber !== null) {
          let id = parseInt(this.orderIdNumber);
          orders = orders.filter((el) => { return el.id.toString().indexOf(id)===0 });
        }
        if (this.hubNumber !== null) {
          let hub = parseInt(this.hubNumber);
          orders = orders.filter((el) => { return el.hub === hub });
        }
        if (this.courierId !== null) {
          let id = parseInt(this.courierId);
          orders = orders.filter((el) => { return el.courier.id === id });
        }
        return orders;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.orders {
  display: flex;
  .left_block {
    .title {
      font-size: 15px;
      font-family: SegoeUI Bold;
      margin-bottom: 32px;
    }
    .cards {
      overflow-y: auto;
      height: calc(100vh - 170px);
      width: calc(100% + 25px);
      .card {
        background: $white;
        border-radius: 3px;
        border: 1px solid $grey;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
        padding-top: 5px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 5px;
        box-sizing: border-box;
        margin-bottom: 15px;
        width: 550px;
        .main_info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          .wrap {
            display: flex;
            .order_id {
              font-family: SegoeUI Bold;
              margin-right: 10px;
            }
            .tags {
              display: flex;
              flex-wrap: wrap;
              .tag {
                margin-left: 5px;
                margin-bottom: 5px;
                font-size: 12px;
                background: rgba($grey, 0.5);
                height: 18px;
                padding-right: 5px;
                padding-left: 5px;
                padding-top: 1px;
                padding-bottom: 1px;
                border-radius: 4px;
                &.express {
                  background: $orange;
                  color: $white;
                }
                &.hub {
                  display: flex;
                  align-items: center;
                  img {
                    margin-right: 5px;
                  }
                }
              }
            }
            .waiting_time {
              color: $orange;
              font-size: 12px;
              margin-right: 10px;
            }
            .date {
              font-size: 12px;
              margin-right: 5px;
            }
            .time {
              font-size: 12px;
              margin-right: 20px;
            }
            .delete {
              background: $orange_light;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              &:hover {
                background: $orange;
              }
              &:active {
                margin-top: 1px;
              }
            }
          }
        }
        .block {
          display: flex;
          justify-content: space-between;
          .courier {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            .name {
              margin-left: 5px;
              margin-right: 5px;
            }
            .rating {
              color: $orange;
              font-size: 12px;
              margin-left: 5px;
            }
          }
          .point {
            position: relative;
            margin-left: 31px;
            margin-bottom: 7px;
            &:before {
              position: absolute;
              left: -31px;
              font-size: 12px;
              font-family: SegoeUI Bold;
              color: $orange;
              width: 17px;
              height: 17px;
              border: 2px solid $orange;
              border-radius: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            &.a:before {
              content: "А";
            }
            &.b:before {
              content: "Б";
            }
          }
          .extra_info {
            margin-bottom: 5px;
            .info {
              white-space: nowrap;
            }
          }
          .extra_info, .telephone {
            font-size: 12px;
          }
          .bold {
            font-family: SegoeUI Bold;
          }
          .comment {
            flex-shrink: 0;
            width: 250px;
            border: 1px solid $grey;
            border-radius: 3px;
            position: relative;
            box-sizing: border-box;
            padding: 5px;
            text-indent: 20px;
            font-size: 12px;
            margin-left: 10px;
            margin-right: 20px;
            &:before {
              content: "";
              position: absolute;
              top: 5px;
              left: 5px;
              background: url("../../assets/comment.svg");
              width: 15px;
              height: 15px;
            }
          }
        }
      }
      .empty {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        font-family: SegoeUI Bold;
      }
    }
    .form {
      display: flex;
      .input_text_number, .select {
        margin-right: 20px;
        margin-bottom: 10px;
      }
    }
  }
  .right_block {

  }
}
</style>
