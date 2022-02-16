export const state = () => ({
    documents: [],
    list: [],
})

export const actions = {

    async loadDocuments({ commit }) {
        let documents = await this.$axios.$get('/api/documents/')

        commit('SET_DOCUMENTS', documents)
    },

    loadListDocuments({ commit }) {
        let list = this.$axios.$get('/api/documents/list/')

        commit('LIST_DOCUMENTS', list)
    },
    
}

export const mutations = {

    SET_DOCUMENTS(state, documents) {
        state.documents = documents
    },

    LIST_DOCUMENTS(state, list) {
        state.list = list
    },
}

export const getters = {

} 