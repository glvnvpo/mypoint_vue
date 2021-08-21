import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
    state: {
        orders: [
            {
                id: 21900,
                courierId: 31,
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
                goodId: 1,
                cost: 600,
                status: 3,
                comment: 'Вход со двора',
                fio: null
            },
            {
                id: 21899,
                courierId: 9,
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
                goodId: 2,
                cost: 200,
                status: 1,
                comment: 'Вход со двора',
                fio: null
            },
            {
                id: 21898,
                courierId: 3,
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
                goodId: 3,
                cost: 200,
                status: 1,
                comment: 'Пропускной режим. Вход через КПП 3',
                fio: null
            },
            {
                id: 21897,
                courierId: 4,
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
                goodId: 4,
                cost: 200,
                status: 1,
                comment: 'Вход со двора',
                fio: null
            },
            {
                id: 21896,
                courierId: 8,
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
                goodId: 4,
                cost: 400,
                status: 3,
                comment: 'Вход со двора',
                fio: null
            }
        ],
        hubs: [{value: 3, text: 3}, {value: 4, text: 4}, {value: 7, text: 7}],
        couriers: [{id: 31, value: 31, text: 'Александров Б.Ю.', rating: 4},
            {id: 9, value: 9, text: 'Птичкин В.А.', rating: 4},
            {id: 3, value: 3, text: 'Собакин А.А.', rating: 5},
            {id: 4, value: 4, text: 'Макаронкина Е.К.', rating: 5},
            {id: 8, value: 8, text: 'Семенов Б.К.', rating: 3}],
        goods: [{id: 1, value: 1, text: 'Цветы'},
            {id: 2, value: 2, text: 'Продукты'},
            {id: 3, value: 3, text: 'Другое'},
            {id: 4, value: 4, text: 'Одежда'}],
        paymentMethods: [
            {id: 1, value: 1, text: 'Наличными'},
            {id: 2, value: 2, text: 'Карта'},
            {id: 3, value: 3, text: 'Оплачен'}
        ]
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
            state.orders.unshift(order);
        },
        DELETE_ORDER(state, id) {
            state.orders = state.orders.filter((el) => { return el.id !== id });
        }
    },
    getters: {
        orders(state) {
            return state.orders;
        },
        couriers(state) {
            return state.couriers;
        },
        hubs(state) {
            return state.hubs;
        },
        goods(state) {
            return state.goods;
        },
        paymentMethods(state) {
            return state.paymentMethods;
        }
    }

})
