<template>
  <div class="bar-chart card">
    <h3 class="chart-title">{{ title }}</h3>
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <g v-for="(d, i) in data" :key="i">
        <rect
          :x="i * barGap"
          :y="height - padding - (d.value / maxValue) * (height - padding * 2)"
          :width="barWidth"
          :height="(d.value / maxValue) * (height - padding * 2)"
          :fill="barColor"
          rx="4"
        />
        <text
          :x="i * barGap + barWidth / 2"
          :y="height - padding + 14"
          text-anchor="middle"
          class="bar-label"
        >
          {{ d.label }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface DataPoint {
  label: string;
  value: number;
}

const props = defineProps<{
  title?: string;
  data: DataPoint[];
  width?: number;
  height?: number;
  barColor?: string;
  padding?: number;
}>();

const title = props.title ?? '';
const data: DataPoint[] = props.data ?? [];
const width = props.width ?? 400;
const height = props.height ?? 220;
const padding = props.padding ?? 36;
const barColor = props.barColor ?? '#60a5fa'; // lighter blue for dark bg

const barGap = Math.max((width - padding * 2) / Math.max(1, data.length), 40);
const barWidth = Math.max(18, barGap * 0.7);
const maxValue = Math.max(1, ...data.map((d: DataPoint) => d.value));

// Avoid false-positive "unused" warnings from some static analyzers (template uses these)
void title
void data
void width
void height
void padding
void barColor
void barGap
void barWidth
void maxValue
</script>

<style scoped>
.bar-chart {
  padding: 12px;
}
.chart-title {
  color: #e6eef8;
  margin-bottom: 6px;
}
.bar-label {
  font-size: 12px;
  fill: #cbd5e1; /* light label color for dark bg */
}
.card {
  background: #0b1220; /* dark card bg */
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.7);
  padding: 12px;
}
</style>
