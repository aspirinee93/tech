export const state = () => ({
  prog: '',
});

export const mutations = {
  createProgG71(state, objInfo) {
    state.prog = '';
    if (objInfo.numTool >= 10) {
      state.prog += `<div>T${objInfo.numTool}${objInfo.numTool};</div>`;
    } else {
      state.prog += `<div>T0${objInfo.numTool}0${objInfo.numTool};</div>`;
    }
    state.prog += `<div>G50 S2500;</div>`;
    state.prog += `<div>G96 S${objInfo.speed} M3;</div>`;
    state.prog += `<div>G00 X${
      objInfo.points[objInfo.points.length - 1].pointX + 5
    };</div>`;
    state.prog += `<div>Z${objInfo.points[0].pointY + 10} M8;</div>`;
    state.prog += `<div>G01 Z${objInfo.points[0].pointY + 2} F0.5;</div>`;
    state.prog += `<div>G71 U${objInfo.ap} R${objInfo.apUp};</div>`;
    state.prog += `<div>G71 P1 Q2 U${objInfo.allowanceX} W${objInfo.allowanceZ} F${objInfo.feed};</div>`;
    for (let i = 0; i < objInfo.points.length; i++) {
      if (i === 0) {
        state.prog += `<div>N1 G01 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY};</div>`;
      } else if (i === objInfo.points.length - 1) {
        state.prog += `<div>N2 G01 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY};</div>`;
      } else if (objInfo.points[i].radius > 0) {
        state.prog += `<div>G02 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY} R${objInfo.points[i].radius};</div>`;
      } else if (objInfo.points[i].radius < 0) {
        state.prog += `<div>G03 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY} R${objInfo.points[i].radius*-1};</div>`;
      } else {
        state.prog += `<div>G01 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY};</div>`;
      }
    }
    state.prog += `<div>G00 Z150 M9;</div>`;
    state.prog += `<div>M30;</div>`;
  },
  clearProg(state) {
    state.prog = '';
  },
};
