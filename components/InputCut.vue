<template>
  <div>
    <form class="form__input" @submit.prevent="createProgramm">
      Номер инструмента
      <input
        v-model="numTool"
        class="input__field"
        type="text"
        placeholder="Укажите номер инструмента"
      />
      Скорость резания, мм/мин
      <input
        v-model="speed"
        class="input__field"
        type="text"
        placeholder="Укажите скорость резания, мм/мин"
      />
      Подача, мм/об
      <input
        v-model="feed"
        class="input__field"
        type="text"
        placeholder="Укажите подачу, мм/об"
      />
      Глубина резания, мм
      <input
        v-model="ap"
        class="input__field"
        type="text"
        placeholder="Укажите глубину резания, мм"
      />
      Величина отскока, мм
      <input
        v-model="apUp"
        class="input__field"
        type="text"
        placeholder="Укажите величину отскока, мм"
      />
      Чистовой припуск на диаметр, мм
      <input
        v-model="allowanceX"
        class="input__field"
        type="text"
        placeholder="Укажите припуск на диаметр, мм"
      />
      Чистовой припуск на длину, мм
      <input
        v-model="allowanceZ"
        class="input__field"
        type="text"
        placeholder="Укажите припуск на длину, мм"
      />

      <div class="input__field" v-if="!$store.state.g71.prog">
        <button class="input__field" type="submit">Составить программу</button>
      </div>
      <div class="input__field" v-else>
        <button class="input__field" type="submit">Обновить программу</button>
      </div>
    </form>
    <div>
      <button class="input__field" @click="cleanProgAndInput" type="submit">
        Очистить
      </button>
    </div>
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
    validInput() {
      if(this.$store.state.points.pointList.length > 1){
        const inputInCheck = [
        this.speed,
        this.feed,
        this.ap,
        this.apUp,
        this.allowanceX,
        this.allowanceZ,
      ];
      this.$store.commit('checkValid/validInput', inputInCheck);
      return this.$store.state.checkValid.flag;
      } else {
        alert('Добавте хотя-бы две точки!')
      }
    },
    createProgramm() {
      if (this.validInput()) {
        const points = this.$store.state.points.pointList;
        const listCut = {
          numTool: Math.ceil(Math.abs(Number(this.numTool.replace(',', '.')))),
          speed: Math.abs(Number(this.speed.replace(',', '.'))),
          feed: Math.abs(Number(this.feed.replace(',', '.'))),
          ap: Math.abs(Number(this.ap.replace(',', '.'))),
          apUp: Math.abs(Number(this.apUp.replace(',', '.'))),
          allowanceX: Number(this.allowanceX.replace(',', '.')),
          allowanceZ: Number(this.allowanceZ.replace(',', '.')),
          points: points,
        };
        this.$store.commit('g71/createProgG71', listCut);
      }
    },
    cleanProgAndInput() {
      this.$store.commit('g71/clearProg');
      this.numTool = '';
      this.speed = '';
      this.feed = '';
      this.ap = '';
      this.apUp = '';
      this.allowanceX = '';
      this.allowanceZ = '';
    },
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
}
</style>
