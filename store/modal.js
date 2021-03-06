export const state = () => ({
    toggle: false
})

export const mutations = {

    TOGGLE (state) {
        state.toggle = !state.toggle
    },

}

export const actions = {

    toggle ({ commit, dispatch }) {
        commit('TOGGLE')
    },
}

export const getters = {
    toggle: state => state.toggle,
}