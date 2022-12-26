<template>
  <div>
    <form class="form" @submit.prevent="createProgramm">
      <input v-model="speed" type="text" placeholder="Укажите скорость резания, мм/мин" />
      <input v-model="feed" type="text" placeholder="Укажите подачу, мм/об" />
      <input v-model="ap" type="text" placeholder="Укажите глубину резания, мм" />
      <button type="submit">Составть программу</button>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      speed: '',
      feed: '',
      ap: '',
    }
  },
  methods: {
    createProgramm(){
      const points = this.$store.state.points.pointList
      const listCut = [this.speed, this.feed, this.ap, points]
      this.$store.commit('g71/createProgG71', listCut)
      console.log(this.$store.state.g71.prog)
    }
  }
}
</script>

<style scoped>
.prog {
  display: flex;
  flex-direction: column;
}
</style>