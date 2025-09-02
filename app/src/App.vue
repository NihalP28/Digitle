<template>
  <div class="game">
    <!-- Squares row -->
    <div class="squares">
      <div v-for="i in 4" :key="i" class="square">
        {{ input[i - 1] || "" }}
      </div>
    </div>

    <!-- Keypad -->
    <div class="keypad">
      <button v-for="n in 9" :key="n" @click="press(n)">
        {{ n }}
      </button>
      <button class="enter" @click="submitGuess">ENTER</button>
      <button @click="press(0)">0</button>
      <button class="back" @click="backspace">⌫</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const input = ref([]);

function press(n) {
  if (input.value.length < 4) {
    input.value.push(n);
  }
}

function backspace() {
  input.value.pop();
}

function submitGuess() {
  if (input.value.length === 4) {
    alert("You entered: " + input.value.join(""));
    input.value = []; // clear after submit
  }
}
</script>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #111; /* keep dark background */
}

.game {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #111;
  color: #eee;
  font-family: system-ui, sans-serif;
}

/* Squares row */
.squares {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
}
.square {
  width: 60px;
  height: 60px;
  border: 2px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: #1a1a1a;
  border-radius: 8px;
}

/* Keypad grid */
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 12px;
  justify-content: center;
}

.keypad button:active {
  background: #444;
}

.keypad button {
  width: 80px;
  height: 80px;
  background: #2b2b2b;
  border: 1px solid #555;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.2rem;   /* BIG numbers by default */
  font-weight: 900;
  line-height: 1;
  text-align: center;
}

/* ENTER */
.keypad button.enter {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0;
  white-space: nowrap;  /* prevent wrapping */
}

/* BACKSPACE */
.keypad button.back {
  font-size: 1.6rem;    /* slim icon size */
  font-weight: normal;
}
</style>