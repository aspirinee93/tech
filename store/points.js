export const state = () => ({
  pointList: [],
  point: '',
  showWinUpdatePoint: false,
  showWinAddPointByIndex: false,
})

export const mutations = {
  addPoints(state, point) {
    state.pointList.push(point)
  },
  addPointsByIndex(state, pointWithIndex) {
    state.pointList.splice(pointWithIndex.index, 0, pointWithIndex.point)
  },
  deletePoint(state, index) {
    state.pointList.splice(index, 1)
    state.showWinUpdatePoint = false
  },
  showRemoveWindow(state, index) {
    state.showWinUpdatePoint = true
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
    state.showWinUpdatePoint = false
  },
  cleanPoint(state){
    state.pointList = []
  },
  closeWin(state){
    state.showWinUpdatePoint = false
  },
  closeWinAddPoint(state){
    state.showWinAddPointByIndex = false
  }
}


