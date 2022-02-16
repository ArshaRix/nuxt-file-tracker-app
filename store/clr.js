export const state = () => ({
    clrStateWa: [],
    clrStateWr: [],
    clrStateRp: [],
    clrStateRm: [],
})

export const actions = {

    async loadStateWa({ commit }) {
        let document = await this.$axios.$get('/api/clr/state/wa')

        commit('STATE_WA', document)
    },

    async loadStateWr({ commit }) {
        let document = await this.$axios.$get('/api/clr/state/wr')

        commit('STATE_WR', document)
    },

    async loadStateRp({ commit }) {
        let document = await this.$axios.$get('/api/clr/state/rp')

        commit('STATE_RP', document)
    },

    async loadStateRm({ commit }) {
        let document = await this.$axios.$get('/api/clr/state/rm')

        commit('STATE_RM', document)
    },
}

export const mutations = {

    STATE_WA(state, document) {
        state.clrStateWa = document
    },

    STATE_WR(state, document) {
        state.clrStateWr = document
    },

    STATE_RP(state, document) {
        state.clrStateRp = document
    },

    STATE_RM(state, document) {
        state.clrStateRm = document
    },

}

export const getters = {

} 