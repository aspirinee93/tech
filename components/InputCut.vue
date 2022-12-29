<template>
  <div>
    <form class="form" @submit.prevent="createProgramm">
      <input
        v-model="numTool"
        type="text"
        placeholder="Укажите номер инструмента"
      />
      <input
        v-model="speed"
        type="text"
        placeholder="Укажите скорость резания, мм/мин"
      />
      <input v-model="feed" type="text" placeholder="Укажите подачу, мм/об" />
      <input
        v-model="ap"
        type="text"
        placeholder="Укажите глубину резания, мм"
      />
      <input
        v-model="apUp"
        type="text"
        placeholder="Укажите величину отскока, мм"
      />
      <input
        v-model="allowanceX"
        type="text"
        placeholder="Укажите припуск на диаметр, мм"
      />
      <input
        v-model="allowanceZ"
        type="text"
        placeholder="Укажите длину, мм"
      />
      <button type="submit">Составить программу</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numTool: '', //T
      speed: '', //S
      feed: '', //F
      ap: '', //U
      apUp: '', //R
      allowanceX: '', //U припуск по X
      allowanceZ: '', //W припуск по Z
    };
  },
  methods: {
    validInput(){
      const inputInCheck = [this.speed, this.feed, this.ap, this.apUp, this.allowanceX, this.allowanceZ]
      this.$store.commit('checkValid/validInput', inputInCheck)
      return this.$store.state.checkValid.flag
    },
    createProgramm() {
      if (this.validInput()) {
        const points = this.$store.state.points.pointList;
        const listCut = {
          numTool: this.numTool,
          speed: this.speed, 
          feed: this.feed, 
          ap: this.ap, 
          apUp:this.apUp, 
          allowanceX: this.allowanceX, 
          allowanceZ: this.allowanceZ, 
          points: points
          };
        this.$store.commit('g71/createProgG71', listCut);
      }
      this.numTool = ''
      this.speed = ''
      this.feed = ''
      this.ap = ''
      this.apUp = ''
      this.allowanceX = ''
      this.allowanceZ = ''
    },
  },
};
</script>

<style scoped>
.prog {
  display: flex;
  flex-direction: column;
}
</style>
