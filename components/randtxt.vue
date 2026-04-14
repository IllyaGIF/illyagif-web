<script setup lang="ts">
const quotes = [
  "Сегодня я поел",
  "Лучше Звоните Солу",
  "Слово не воробей, насрет убей",
  "Can't Stop",
  "Побег из шоушенка",
  "Ватт = Вольти умножить на Ампери",
  "о май гад",
  "Я помылся",
  "В чом сила - в ньютанах",
  "Я бы хотел тело из стали",
  "У меня пиксель 6a",
  'Я илья',
  "Запомните, а то забудете",
  "В чом сила - в ньютанах",
];

const currentQuote = ref('');

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote.value = quotes[randomIndex] as string;
});
</script>

<template>
  <div class="quote-container">
      <p v-if="currentQuote" :key="currentQuote" class="text-md text-neutral-500">
        «{{ currentQuote }}»
      </p>
  </div>
</template>