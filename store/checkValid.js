export const state = () => ({
  flag: false
})

export const mutations = {
  validPoints(state, point) {
    if (
      isNaN(Number(point[0])) ||
      isNaN(Number(point[1])) ||
      point[0] === '' ||
      point[1] === ''
      ) {
          alert('Введите числа');
          state.flag = false
        } else {
          state.flag = true
        }
  }
}