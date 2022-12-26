<template>
  <div class='app'>

    <div class='app__input__cut'>
     <InputCut />
     <ProgramPrint />
    </div>

    <div class='app__graf'>
     graf
    </div>

    <div class='app__point'>
      <div class='app__point__add'>
        <AddPoints />
      </div>
      <div class='app__point__list'>
       <ListPoints />
      </div>
    </div>
  </div>
</template>

<script>
import InputCut from '../components/InputCut.vue';

export default { components: { InputCut } }
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
</style>
