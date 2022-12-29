export const state = () => ({
  prog: ''
})

export const mutations = {
  createProgG71(state, objInfo) {
    state.prog = ''
    if (objInfo.numTool >= 10) {
      state.prog += `<p>T${objInfo.numTool}${objInfo.numTool};</p>`
    } else {
      state.prog += `<p>T0${objInfo.numTool}0${objInfo.numTool};</p>`
    }
    state.prog += `<p>G50 S2500;</p>`
    state.prog += `<p>G96 S${objInfo.speed} M3;</p>`
    state.prog += `<p>G00 X${objInfo.points[objInfo.points.length-1].pointX+5};</p>`
    state.prog += `<p>Z${objInfo.points[0].pointY+10} M8;</p>`
    state.prog += `<p>G01 Z${objInfo.points[0].pointY+2} F0.5;</p>`
    state.prog += `<p>G71 U${objInfo.ap} R${objInfo.apUp};</p>`
    state.prog += `<p>G71 P1 Q2 U${objInfo.allowanceX} W${objInfo.allowanceZ} F${objInfo.feed};</p>`
    for(let i = 0; i < objInfo.points.length; i++){
      if(i===0){
        state.prog += `<p>N1 G01 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY};`
      } else if (i === objInfo.points.length-1) {
        state.prog += `<p>N2 G01 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY};`
      } else {
        state.prog += `<p>G01 X${objInfo.points[i].pointX} Z${objInfo.points[i].pointY};`
      }
    }
    state.prog += `<p>G00 Z150 M9;</p>`
    state.prog += `<p>M30;</p>`
  }
}