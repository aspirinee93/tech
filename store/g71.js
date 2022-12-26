export const state = () => ({
  prog: ''
})

export const mutations = {
  createProgG71(state, value) {
    state.prog = `
      <p>Скорость ${value[0]}</p>
      <p>Подача ${value[1]}</p>
      <p>Глубина ${value[2]}</p>`
    for(let i = 0; i < value[3].length; i++){
      state.prog += `
      <p>Точка${i+1}: X=${value[3][i].pointX} Y=${value[3][i].pointY}</p>`
    }
  }
}