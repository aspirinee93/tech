<template>
  <div class='app'>

    <div class='app__input__cut'>
      <InputCutG71 />
      <ProgramPrint />
    </div>

    <div class='app__graf'>
      graf
    </div>

    <div class='app__point'>
      <div class='app__point__add'>
        <div>
          <div v-if="!$store.state.points.showWinAddPointByIndex">
            <AddPoints />
            <br />
          </div>
          <div v-if="$store.state.points.showWinUpdatePoint">
            <RemovePoint />
          </div>
          <div v-if="$store.state.points.showWinAddPointByIndex">
            <AddPointByIndex />
          </div>
          <div v-if="$store.state.points.showUpdateToRadiusWindow">
            <UpdateToRadius />
          </div>
        </div>
      </div>

      <div class='app__point__list'>
        <ListPoints />
      </div>
    </div>
  </div>
</template>

<script>
import UpdateToRadius from '../../components/UpdateToRadius.vue';

export default {
    components: { UpdateToRadius }
}
</script>

<style>
.app {
  display: flex;
  padding: 10px;
  gap: 10px
}

.app__input__cut {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 100vh;
  flex: 1
}

.app__graf {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 100vh;
  flex: 2
}

.app__point {
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 1;
  gap: 5px;
}

.app__point__add {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  flex: 1
}

.app__point__list {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  flex: 3;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.btn__clean {
  width: 100%;
  margin-top: 5px;
}
</style>
