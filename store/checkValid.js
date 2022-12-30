export const state = () => ({
  flag: false
})

export const mutations = {
  validInput(state, input){
    for(let i of input){
      if (isNaN(Number(i.replace(',', '.'))) || i === ''){
        alert('Введите числа');
        state.flag = false
        return
      } else {
        state.flag = true
      }
    }
  },
  // test(state, points){
  //   alert(points)
  // }
}