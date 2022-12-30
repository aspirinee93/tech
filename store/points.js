export const state = () => ({
  pointList: [],
  point: '',
  showWinUpdatePoint: false,
  showWinAddPointByIndex: false,
  flag: false,
});

export const mutations = {
  addPoints(state, point) {
    state.pointList.push(point);
    state.flag = false;
  },
  addPointsByIndex(state, pointWithIndex) {
    state.pointList.splice(pointWithIndex.index, 0, pointWithIndex.point);
  },
  deletePoint(state, index) {
    state.pointList.splice(index, 1);
    state.showWinUpdatePoint = false;
  },
  showRemoveWindow(state, index) {
    state.showWinUpdatePoint = true;
    state.point = {
      index,
      pointX: state.pointList[index].pointX,
      pointY: state.pointList[index].pointY,
      radius: state.pointList[index].radius,
    };
  },
  removePoint(state, point) {
    let inx = state.point.index;
    state.pointList.splice(inx, 1, point);
    state.point = '';
    state.showWinUpdatePoint = false;
  },
  cleanPoint(state) {
    state.pointList = [];
  },
  closeWin(state) {
    state.showWinUpdatePoint = false;
  },
  closeWinAddPoint(state) {
    state.showWinAddPointByIndex = false;
  },
  flagTrue(state) {
    state.flag = true;
  },
  flagFalse(state) {
    state.flag = false;
  },
};

export const actions = {
  addPointAct(store, point) {
    const newPoint = {
      pointX: point['pointX'],
      pointY: point['pointY'],
      radius: point['radius'],
      status: point['status']
    };
    store.dispatch('checkValited', newPoint)
    if (store.state.flag) {
      store.commit('addPoints', newPoint);
    } else {
      alert('Введены невалидные данные');
    }
  },
  checkValited(store, point) {
    switch (true){
      case point.status === 'new':
        if(point.radius === '' || store.state.pointList.length === 0){
          if(
            isNaN(Number(point.pointX.replace(',', '.'))) || 
            isNaN(Number(point.pointY.replace(',', '.'))) ||
            point.pointX === '' ||
            point.pointY === ''
            ){
              alert('Введите цыфры')
              return
          } else {
            store.commit('flagTrue')
            return
          }
        } else {
          if(isNaN(Number(point.pointX.replace(',', '.'))) || point.pointX === ''){

          } else {

          }
        }
    }
  },
};
