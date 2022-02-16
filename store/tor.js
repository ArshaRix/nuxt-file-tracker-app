export const state = () => ({
    torStateWa: [],
    torStateWr: [],
    torStateRp: [],
    torStateRm: [],
})

export const actions = {

    async loadStateWa({ commit }) {
        let document = await this.$axios.$get('/api/tor/state/wa')

        commit('STATE_WA', document)
    },

    async loadStateWr({ commit }) {
        let document = await this.$axios.$get('/api/tor/state/wr')

        commit('STATE_WR', document)
    },

    async loadStateRp({ commit }) {
        let document = await this.$axios.$get('/api/tor/state/rp')

        commit('STATE_RP', document)
    },

    async loadStateRm({ commit }) {
        let document = await this.$axios.$get('/api/tor/state/rm')

        commit('STATE_RM', document)
    },
}

export const mutations = {

    STATE_WA(state, document) {
        state.torStateWa = document
    },

    STATE_WR(state, document) {
        state.torStateWr = document
    },

    STATE_RP(state, document) {
        state.torStateRp = document
    },

    STATE_RM(state, document) {
        state.torStateRm = document
    },

}

export const getters = {

} 