export const state = () => ({
  pointList: [],
  point: "",
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
  openWinAddPointByIndex(state) {
    state.showWinAddPointByIndex = true;
  },
  removePoint(state, point) {
    let inx = state.point.index;
    state.pointList.splice(inx, 1, point);
    state.point = "";
    state.showWinUpdatePoint = false;
    state.flag = false;
  },
  cleanPoint(state) {
    state.pointList = [];
  },
  closeWin(state) {
    state.showWinUpdatePoint = false;
    state.showWinAddPointByIndex = false;
    state.point = "";
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
      pointX: point["pointX"],
      pointY: point["pointY"],
      radius: point["radius"],
      status: point["status"],
    };
    store.dispatch("checkValited", newPoint);
    if (store.state.flag) {
      if (store.state.pointList.length === 0 || newPoint.radius === "") {
        (newPoint.pointX = Number(newPoint.pointX.replace(",", "."))),
          (newPoint.pointY = Number(newPoint.pointY.replace(",", "."))),
          (newPoint.radius = 0);
        store.commit("addPoints", newPoint);
      } else {
        (newPoint.pointX = Number(newPoint.pointX.replace(",", "."))),
          (newPoint.pointY = Number(newPoint.pointY.replace(",", "."))),
          (newPoint.radius = Number(newPoint.radius.replace(",", ".")));
        store.commit("addPoints", newPoint);
      }
    }
  },
  removePointAct(store, point) {
    const newPoint = {
      pointX: point["pointX"],
      pointY: point["pointY"],
      radius: point["radius"],
      status: point["status"],
    };
    store.dispatch("checkValited", newPoint);
    if (store.state.flag) {
      if (
        store.state.pointList.length === 0 ||
        newPoint.radius === "" ||
        store.state.point.index === 0
      ) {
        (newPoint.pointX = Number(newPoint.pointX.replace(",", "."))),
          (newPoint.pointY = Number(newPoint.pointY.replace(",", "."))),
          (newPoint.radius = 0);
        store.commit("removePoint", newPoint);
      } else {
        (newPoint.pointX = Number(newPoint.pointX.replace(",", "."))),
          (newPoint.pointY = Number(newPoint.pointY.replace(",", "."))),
          (newPoint.radius = Number(newPoint.radius.replace(",", ".")));
        store.commit("removePoint", newPoint);
      }
    }
  },
  checkValited(store, point) {
    switch (true) {
      case point.status === "new":
        if (point.radius === "" || store.state.pointList.length === 0) {
          store.dispatch("checkValitedPoint", point);
        } else {
          store.dispatch("checkValitedPointWithRadius", point);
        }
        break;
      case point.status === "old":
        if (store.state.point.index === 0) {
          store.dispatch("checkValitedPoint", point);
        } else {
          store.dispatch("checkValitedPointWithRadius", point);
        }
    }
  },
  checkValitedPoint(store, data) {
    if (
      isNaN(Number(data.pointX.replace(",", "."))) ||
      isNaN(Number(data.pointY.replace(",", "."))) ||
      data.pointX === "" ||
      data.pointY === ""
    ) {
      alert("Введите цифры");
      store.commit("flagFalse");
      return;
    } else {
      store.commit("flagTrue");
      return;
    }
  },
  checkValitedPointWithRadius(store, data) {
    if (
      isNaN(Number(data.pointX.replace(",", "."))) ||
      isNaN(Number(data.pointY.replace(",", "."))) ||
      isNaN(Number(data.radius.replace(",", "."))) ||
      data.pointX === "" ||
      data.pointY === "" ||
      data.radius === ""
    ) {
      alert("Введите цифры");
      store.commit("flagFalse");
      return;
    } else {
      store.commit("flagTrue");
      return;
    }
  },
};
