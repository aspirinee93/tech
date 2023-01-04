export const state = () => ({
  pointList: [],
  point: "",
  showWinUpdatePoint: false,
  showWinAddPointByIndex: false,
  showUpdateToRadiusWindow: false,
  flag: false,
});

export const mutations = {
  updatePointToRadius(state, newListPoints) {
    state.pointList = newListPoints;
    state.showUpdateToRadiusWindow = false;
  },
  addPoints(state, point) {
    state.pointList.push(point);
    state.flag = false;
  },
  addPointsByIndex(state, pointWithIndex) {
    state.pointList.splice(pointWithIndex.addIndex - 1, 0, pointWithIndex);
  },
  deletePoint(state, index) {
    state.pointList.splice(index, 1);
    state.showWinUpdatePoint = false;
  },
  openUpdateToRadiusWindow(state, index) {
    state.point = "";
    state.showWinUpdatePoint = false;
    state.showUpdateToRadiusWindow = true;
    state.point = {
      index,
      pointX: state.pointList[index].pointX,
      pointY: state.pointList[index].pointY,
      radius: state.pointList[index].radius,
    };
  },
  showRemoveWindow(state, index) {
    state.point = "";
    state.showWinAddPointByIndex = false;
    state.showUpdateToRadiusWindow = false;
    state.showWinUpdatePoint = true;
    state.point = {
      index,
      pointX: state.pointList[index].pointX,
      pointY: state.pointList[index].pointY,
      radius: state.pointList[index].radius,
    };
  },
  openWinAddPointByIndex(state) {
    state.showWinUpdatePoint = false;
    state.showUpdateToRadiusWindow = false;
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
    state.showUpdateToRadiusWindow = false;
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
  updatePointToRadiusAct(store, radius) {
    const newLP = [...store.state.pointList];
    const INDX = store.state.point.index;
    const R = radius;
    const PI = Math.PI;
    const KINUNGLE = ((180 / PI) * 100) / 100;
    const KOUTUNGLE = ((PI / 180) * 100) / 100;

    const point1 = {
      pointX: Math.ceil((newLP[INDX - 1].pointX/2)*100)/100,
      pointY: newLP[INDX - 1].pointY,
      radius: newLP[INDX - 1].radius,
    };
    const point2 = {
      pointX: Math.ceil((newLP[INDX].pointX/2)*100)/100,
      pointY: newLP[INDX].pointY,
      radius: newLP[INDX].radius,
    };
    const point3 = {
      pointX: Math.ceil((newLP[INDX + 1].pointX/2)*100)/100,
      pointY: newLP[INDX + 1].pointY,
      radius: newLP[INDX + 1].radius,
    };

    let deltaX1 = Math.ceil(Math.abs(point2.pointX - point1.pointX)*100)/100;
    //console.log(`deltaX1 - ${deltaX1}`)
    let deltaZ1 = Math.ceil(Math.abs(point2.pointY - point1.pointY)*100)/100;
    //console.log(`deltaZ1 - ${deltaZ1}`)
    let deltaX2 = Math.ceil(Math.abs(point3.pointX - point2.pointX)*100)/100;
    //console.log(`deltaX2 - ${deltaX2}`)
    let deltaZ2 = Math.ceil(Math.abs(point3.pointY - point2.pointY)*100)/100;
    //console.log(`deltaZ2 - ${deltaZ2}`)

    let alfaX;
    let alfaZ;
    if (deltaX1 === 0) {
      alfaX = 0;
      //console.log(`alfaX - ${alfaX}`)
    } else if (deltaZ1 === 0) {
      alfaX = 90;
      //console.log(`alfaX - ${alfaX}`)
    } else {
      alfaX = Math.ceil((Math.atan(deltaX1 / deltaZ1) * KINUNGLE)*100)/100;
      //console.log(`alfaX - ${alfaX}`)
    }
    if (deltaZ2 === 0) {
      alfaZ = 0;
      //console.log(`alfaZ - ${alfaZ}`)
    } else if (deltaX2 === 0) {
      alfaZ = 90;
      //console.log(`alfaZ - ${alfaZ}`)
    } else {
      alfaZ = Math.ceil((Math.atan(deltaZ2 / deltaX2) * KINUNGLE)*100)/100;
      //console.log(`alfaZ - ${alfaZ}`)
    }

    let DIRRAD;
    let beta = alfaX + alfaZ + 90;
    //console.log(`beta - ${beta}`)
    if (beta > 180) {
      DIRRAD = -1;
      //console.log(`DIRRAD - ${DIRRAD}`)
    } else {
      DIRRAD = 1;
      //console.log(`DIRRAD - ${DIRRAD}`)
    }

    let zeta = Math.abs(beta/2 - alfaX - alfaZ)
    //console.log(`zeta - ${zeta}`)
    let tanZeta = Math.floor((Math.tan(zeta * KOUTUNGLE))*10000)/10000
    //console.log(`tanZeta - ${tanZeta}`)
    let sinX = Math.floor((Math.sin(alfaX * KOUTUNGLE))*10000)/10000
    //console.log(`sinX - ${sinX}`)
    let cosX = Math.floor((Math.cos(alfaX * KOUTUNGLE))*10000)/10000
    //console.log(`cosX - ${cosX}`)
    let cosZ = Math.floor((Math.cos(alfaZ * KOUTUNGLE))*10000)/10000
    //console.log(`cosZ - ${cosZ}`)
    let sinZ = Math.floor((Math.sin(alfaZ * KOUTUNGLE))*10000)/10000
    //console.log(`sinZ - ${sinZ}`)

    let newDeltaZ1 = Math.floor(R*tanZeta*cosX*100)/100
    //console.log(`newDeltaZ1 - ${newDeltaZ1}`)
    let newDeltaX1 = Math.floor(R*tanZeta*sinX*100)/100
    //console.log(`newDeltaX1 - ${newDeltaX1}`)
    let newDeltaX2 = Math.floor(R*tanZeta*cosZ*100)/100
    //console.log(`newDeltaX2 - ${newDeltaX2}`)
    let newDeltaZ2 = Math.floor(R*tanZeta*sinZ*100)/100
    //console.log(`newDeltaZ2 - ${newDeltaZ2}`)

    let newPointX1 = Math.ceil((point2.pointX-newDeltaX1)*100)/100
    //console.log(`newPointX1 - ${newPointX1}`)
    let newPointZ1 = Math.ceil((point2.pointY+newDeltaZ1)*100)/100
    //console.log(`newPointZ1 - ${newPointZ1}`)
    let newPointX2 = Math.ceil((point2.pointX+newDeltaX2)*100)/100
    //console.log(`${point2.pointX} + ${newDeltaX2} = newPointX2 - ${newPointX2}`)
    let newPointZ2 = Math.ceil((point2.pointY-newDeltaZ2)*100)/100
    //console.log(`newPointZ2 - ${newPointZ2}`)

    newLP.splice(INDX, 1, {
      pointX: newPointX1*2, 
      pointY: newPointZ1,
      radius: 0
    })
    newLP.splice(INDX+1, 0, {
      pointX: newPointX2*2, 
      pointY: newPointZ2,
      radius: R * DIRRAD
    })

    store.commit("updatePointToRadius", newLP);
  },
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
  addPointByIndexAct(store, data) {
    if (isNaN(Number(data.addIndex)) || data.addIndex === "") {
      alert("Введите корректный индекс");
    } else {
      Number(data.addIndex) <= 0
        ? (data.addIndex = 1)
        : (data.addIndex = Math.ceil(Math.abs(Number(data.addIndex))));
    }
    switch (true) {
      case data.addIndex > store.state.pointList.length:
        store.dispatch("addPointAct", data);
        break;
      case data.addIndex === 1:
        data.radius = 0;
        store.dispatch("checkValitedPoint", data);
        if (store.state.flag) {
          store.commit("addPointsByIndex", data);
        }
        break;
      case data.addIndex <= store.state.pointList.length:
        if (data.radius === "") {
          data.radius = 0;
          store.dispatch("checkValitedPoint", data);
          if (store.state.flag) {
            store.commit("addPointsByIndex", data);
          }
        } else {
          store.dispatch("checkValitedPointWithRadius", data);
          if (store.state.flag) {
            store.commit("addPointsByIndex", data);
          }
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
    alert(JSON.stringify(data));
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
