import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
    state: {
        orders: [
            {
                id: 21900,
                courier: {
                    id: 31,
                    name: 'Александров Б.Ю.',
                    rating: 4
                },
                point_a: 'ул. Ленская, 16',
                point_b: 'ул. Вавилова, 2/1',
                entrance: 5, //подъезд
                floor: 7,
                flat: 105,
                intercom: 105, //домофон
                telephone: '+70000000099',
                waiting_time: 27, //время ожидания в минутах,
                date: '10.10.2020',
                time: '10:39',
                hub: 3,
                express_order: false, //cрочный заказ
                goods: 'Цветы',
                cost: 600,
                status: 'Оплачен',
                comment: 'Вход со двора'
            },
            {
                id: 21899,
                courier: {
                    id: 9,
                    name: 'Птичкин В.А.',
                    rating: 4
                },
                point_a: 'ул. Иванова, 17',
                point_b: 'ул. Лесная, 1',
                entrance: null, //подъезд
                floor: null,
                flat: null,
                intercom: null, //домофон
                telephone: '+70000000091',
                waiting_time: 15, //время ожидания в минутах,
                date: '10.10.2020',
                time: '10:01',
                hub: null,
                express_order: true, //cрочный заказ
                goods: 'Продукты',
                cost: 200,
                status: 'Наличными',
                comment: 'Вход со двора'
            },
            {
                id: 21898,
                courier: {
                    id: 3,
                    name: 'Собакин А.А.',
                    rating: 5
                },
                point_a: 'ул. Пушкина, 1',
                point_b: 'ул. Андропова, 10',
                entrance: null, //подъезд
                floor: 2,
                flat: 104,
                intercom: null, //домофон
                telephone: '+70000000748',
                waiting_time: 12, //время ожидания в минутах,
                date: '10.10.2020',
                time: '09:58',
                hub: 7,
                express_order: false, //cрочный заказ
                goods: 'Другое',
                cost: 200,
                status: 'Наличными',
                comment: 'Пропускной режим. Вход через КПП 3'
            },
            {
                id: 21897,
                courier: {
                    id: 4,
                    name: 'Макаронкина Е.К.',
                    rating: 5
                },
                point_a: 'ул. Полянка, 5',
                point_b: 'ул. Тургенева, 7',
                entrance: 3, //подъезд
                floor: 7,
                flat: 220,
                intercom: 220, //домофон
                telephone: '+70000007832',
                waiting_time: 3, //время ожидания в минутах,
                date: '10.10.2020',
                time: '09:51',
                hub: 7,
                express_order: false, //cрочный заказ
                goods: 'Одежда',
                cost: 200,
                status: 'Наличными',
                comment: 'Вход со двора'
            },
            {
                id: 21896,
                courier: {
                    id: 8,
                    name: 'Семенов Б.К.',
                    rating: 3
                },
                point_a: 'ул. Спасская, 2',
                point_b: 'ул. Короленко, 28',
                entrance: 2, //подъезд
                floor: 4,
                flat: 14,
                intercom: 14, //домофон
                telephone: '+70000004444',
                waiting_time: 2, //время ожидания в минутах,
                date: '10.10.2020',
                time: '09:48',
                hub: 4,
                express_order: false, //cрочный заказ
                goods: 'Одежда',
                cost: 400,
                status: 'Оплачен',
                comment: 'Вход со двора'
            }
        ],
    },
    actions: {
        addOrder({commit}, order) {
            commit('ADD_ORDER', order)
        },
        deleteOrder({commit}, id) {
            commit('DELETE_ORDER', id)
        }
    },
    mutations: {
        ADD_ORDER(state, order) {
            state.push(order);
        },
        DELETE_ORDER(state, id) {
            state.orders = state.orders.filter((el) => { return el.id !== id });
            // this.orders = this.orders.filter((el) => { return el.id !== this.orderToDelete });
        }
    },
    getters: {
        orders(state) {
            return state.orders;
        }
    }

})
