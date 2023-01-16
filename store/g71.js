export const state = () => ({
  prog: "",
  oldProg: "",
  tool: "",
  progG70: "",
});

export const mutations = {
  createProgG71(state, objInfo) {
    let flag = false;
    state.prog = "";
    state.tool = objInfo.numTool;
    if (objInfo.numTool >= 10) {
      state.prog += `<div>T${objInfo.numTool}${objInfo.numTool};</div>`;
    } else {
      state.prog += `<div>T0${objInfo.numTool}0${objInfo.numTool};</div>`;
    }
    state.prog += `<div>G50 S2500;</div>`;
    state.prog += `<div>G96 S${objInfo.speed} M3;</div>`;
    state.prog += `<div>G00 X${
      objInfo.points[objInfo.points.length - 1].y + 5
    };</div>`;
    state.prog += `<div>Z${objInfo.points[0].x + 10} M8;</div>`;
    state.prog += `<div>G01 Z${objInfo.points[0].x + 2} F0.5;</div>`;
    state.prog += `<div>G71 U${objInfo.ap} R${objInfo.apUp};</div>`;
    state.prog += `<div>G71 P1 Q2 U${objInfo.allowanceX} W${objInfo.allowanceZ} F${objInfo.feed};</div>`;

    for (let i = 0; i < objInfo.points.length; i++) {
      if (i === 0) {
        flag = true;
        state.prog += `<div>N1 G01 X${objInfo.points[i].y} Z${objInfo.points[i].x};</div>`;
      } else if (i === objInfo.points.length - 1) {
        if (objInfo.points[i].radius > 0) {
          flag = false;
          state.prog += `<div>N2 G02 X${objInfo.points[i].y} Z${objInfo.points[i].x} R${objInfo.points[i].radius};</div>`;
        } else if (objInfo.points[i].radius < 0) {
          flag = false;
          state.prog += `<div>N2 G03 X${objInfo.points[i].y} Z${objInfo.points[i].x} R${objInfo.points[i].radius};</div>`;
        } else {
          if (flag) {
            state.prog += `<div>N2 X${objInfo.points[i].y} Z${objInfo.points[i].x};</div>`;
          } else {
            state.prog += `<div>N2 G01 X${objInfo.points[i].y} Z${objInfo.points[i].x};</div>`;
          }
        }
      } else if (objInfo.points[i].radius > 0) {
        flag = false;
        state.prog += `<div>G02 X${objInfo.points[i].y} Z${objInfo.points[i].x} R${objInfo.points[i].radius};</div>`;
      } else if (objInfo.points[i].radius < 0) {
        flag = false;
        state.prog += `<div>G03 X${objInfo.points[i].y} Z${
          objInfo.points[i].x
        } R${objInfo.points[i].radius * -1};</div>`;
      } else {
        if (flag) {
          state.prog += `<div>X${objInfo.points[i].y} Z${objInfo.points[i].x};</div>`;
        } else {
          flag = true;
          state.prog += `<div>G01 X${objInfo.points[i].y} Z${objInfo.points[i].x};</div>`;
        }
      }
    }
    state.prog += `<div>G00 Z150 M9;</div>`;
    state.prog += `<div>M30;</div>`;
    state.oldProg = state.prog;
  },
  clearProg(state) {
    state.prog = "";
    state.oldProg = "";
  },
  createProgG70(state, objInfo) {
    state.prog = state.oldProg;
    state.progG70 = "";
    if (state.prog) {
      state.progG70 = "<p></p>";
      if (objInfo.numTool2 === state.tool) {
        state.progG70 += `<div>G96 S${objInfo.speed2} M3;</div>`;
        state.progG70 += `<div>G00 X${
          objInfo.points[objInfo.points.length - 1].y + 5
        };</div>`;
        state.progG70 += `<div>Z${objInfo.points[0].x + 10} M8;</div>`;
        state.progG70 += `<div>G01 Z${objInfo.points[0].x + 2} F0.5;</div>`;
        state.progG70 += `<div>G70 P1 Q2 F${objInfo.feed2};</div>`;
        state.progG70 += `<div>G00 Z150 M9;</div>`;
        state.progG70 += `<div>M30;</div>`;
        state.prog = state.prog.replace("M30;", "<div></div>");
        state.prog += state.progG70;
      } else {
        if (objInfo.numTool2 >= 10) {
          state.progG70 += `<div>T${objInfo.numTool2}${objInfo.numTool2};</div>`;
        } else {
          state.progG70 += `<div>T0${objInfo.numTool2}0${objInfo.numTool2};</div>`;
        }
        state.progG70 += `<div>G50 S2500;</div>`;
        state.progG70 += `<div>G96 S${objInfo.speed2} M3;</div>`;
        state.progG70 += `<div>G00 X${
          objInfo.points[objInfo.points.length - 1].y + 5
        };</div>`;
        state.progG70 += `<div>Z${objInfo.points[0].x + 10} M8;</div>`;
        state.progG70 += `<div>G01 Z${objInfo.points[0].x + 2} F0.5;</div>`;
        state.progG70 += `<div>G70 P1 Q2 F${objInfo.feed2};</div>`;
        state.progG70 += `<div>G00 Z150 M9;</div>`;
        state.progG70 += `<div>M30;</div>`;
        state.prog = state.prog.replace("M30;", "<div></div>");
        state.prog += state.progG70;
      }
    } else {
      alert("Необходима программа G71");
    }
  },
};
