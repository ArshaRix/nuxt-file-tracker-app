export const state = () => ({
    gmcStateWa: [],
    gmcStateWr: [],
    gmcStateRp: [],
    gmcStateRm: [],
})

export const actions = {

    async loadStateWa({ commit }) {
        let document = await this.$axios.$get('/api/gmc/state/wa')

        commit('STATE_WA', document)
    },

    async loadStateWr({ commit }) {
        let document = await this.$axios.$get('/api/gmc/state/wr')

        commit('STATE_WR', document)
    },

    async loadStateRp({ commit }) {
        let document = await this.$axios.$get('/api/gmc/state/rp')

        commit('STATE_RP', document)
    },

    async loadStateRm({ commit }) {
        let document = await this.$axios.$get('/api/gmc/state/rm')

        commit('STATE_RM', document)
    },
}

export const mutations = {

    STATE_WA(state, document) {
        state.gmcStateWa = document
    },

    STATE_WR(state, document) {
        state.gmcStateWr = document
    },

    STATE_RP(state, document) {
        state.gmcStateRp = document
    },

    STATE_RM(state, document) {
        state.gmcStateRm = document
    },

}

export const getters = {

} 