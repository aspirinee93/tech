export const state = () => ({
  pointList: [],
  point: '',
  showWin: false,
})

export const mutations = {
  addPoints(state, point) {
    state.pointList.push(point)
  },
  deletePoint(state, index) {
    state.pointList.splice(index, 1)
    state.showWin = false
  },
  showRemoveWindow(state, index) {
    state.showWin = true
    state.point = {
      index,
      pointX: state.pointList[index].pointX,
      pointY: state.pointList[index].pointY,
      radius: state.pointList[index].radius,
    }
  },
  removePoint(state, point){
    let inx = state.point.index
    state.pointList.splice(inx, 1, point)
    state.point = ''
    state.showWin = false
  },
  cleanPoint(state){
    state.pointList = []
  },
  closeWin(state){
    state.showWin = false
  }
}


