<template>
  <div class="line-chart card">
    <h3 class="chart-title">{{ title }}</h3>
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <g :transform="`translate(${padding}, ${padding})`">
        <!-- X/Y axes lines -->
        <line :x1="0" :y1="innerHeight" :x2="innerWidth" :y2="innerHeight" stroke="rgba(255,255,255,0.12)" />
        <line x1="0" y1="0" :x2="0" :y2="innerHeight" stroke="rgba(255,255,255,0.06)" />

        <!-- Path -->
        <path :d="pathD" fill="none" :stroke="strokeColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />

        <!-- Points -->
        <g v-for="(pt, i) in data" :key="i">
          <circle
            :cx="xScale(i)"
            :cy="yScale(pt.y)"
            r="3.2"
            :fill="strokeColor"
            :stroke="'#0b1220'"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Point { x?: string | number; y: number }

const props = defineProps<{
  title?: string;
  data: Point[];
  width?: number;
  height?: number;
  strokeColor?: string;
  padding?: number;
}>();

const title = props.title ?? '';
const data: Point[] = props.data ?? [];
const width = props.width ?? 480;
const height = props.height ?? 220;
const padding = props.padding ?? 28;
const strokeColor = props.strokeColor ?? '#60a5fa';

const innerWidth = Math.max(10, width - padding * 2);
const innerHeight = Math.max(10, height - padding * 2);

// scales
function xScale(i: number) {
  if (data.length <= 1) return 0;
  return (i / (data.length - 1)) * innerWidth;
}

const maxY = Math.max(1, ...data.map(p => p.y));
function yScale(val: number) {
  // invert y for SVG coordinate system
  return innerHeight - (val / maxY) * innerHeight;
}

// build path
const pathD = data.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(pt.y)}`).join(' ');

// avoid false-positive unused warnings
void title
void data
void width
void height
void padding
void strokeColor
void innerWidth
void innerHeight
void maxY
void pathD
</script>

<style scoped>
.line-chart {
  padding: 10px;
}
.chart-title {
  color: #e6eef8;
  margin-bottom: 6px;
}
.card {
  background: #0b1220; /* dark card bg */
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.7);
  padding: 12px;
}
</style>
