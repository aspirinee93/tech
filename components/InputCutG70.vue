<template>
  <div>
    <form class="form__input" @submit.prevent="createProgramm">
      Номер инструмента
      <input v-model="numTool2" class="input__field" type="text" placeholder="Укажите номер инструмента" />
      Скорость резания, мм/мин
      <input v-model="speed2" class="input__field" type="text" placeholder="Укажите скорость резания, мм/мин" />
      Подача, мм/об
      <input v-model="feed2" class="input__field" type="text" placeholder="Укажите подачу, мм/об" />

      <button class="input__field" type="submit">Составить программу</button>

    </form>
    <div>
      <button class="input__field" @click="closeG70Window" type="submit">
        Закрыть окно
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numTool2: '', //T
      speed2: '', //S
      feed2: '', //F
    };
  },
  methods: {
    validInput() {
      if (this.$store.state.points.pointList.length > 1) {
        const listInput = [
          this.speed2,
          this.feed2,
          this.feed2,
        ];
        this.$store.commit('checkValid/validInput', listInput);
        return this.$store.state.checkValid.flag;
      } else {
        alert('Добавте хотя-бы две точки!')
      }
    },
    createProgramm() {
      if (this.validInput()) {
        const points = this.$store.state.points.pointList;
        const listCut = {
          numTool2: Math.ceil(Math.abs(Number(this.numTool2.replace(',', '.')))),
          speed2: Math.abs(Number(this.speed2.replace(',', '.'))),
          feed2: Math.abs(Number(this.feed2.replace(',', '.'))),
          points: points
        };
        this.$store.commit('g71/createProgG70', listCut);
      }
    },
    cleanProgAndInput() {
      this.$store.commit('g71/clearProg');
      this.numTool2 = '';
      this.speed2 = '';
      this.feed2 = '';
    },
    closeG70Window() {
      this.$store.commit('points/closeG70WindowMut')
    }
  },
};
</script>

<style scoped>
.prog {
  display: flex;
  flex-direction: column;
}

.form__input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}

.input__field {
  width: 100%;
  margin-bottom: 3px;
}
</style>
