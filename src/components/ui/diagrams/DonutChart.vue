<template>
  <div class="donut-chart card">
    <h3 class="chart-title">{{ title }}</h3>
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <g transform="translate(50,50)">
        <template v-for="(d, i) in normalized" :key="i">
          <path
            :d="describeArc(0, 0, radius, d.startAngle, d.endAngle)"
            :fill="colors[i % colors.length]"
          />
        </template>
        <circle :r="innerRadius" fill="#0b1220" />
        <text x="0" y="4" text-anchor="middle" class="donut-center">{{ centerLabel }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Segment { label: string; value: number }

const props = defineProps<{
  title?: string;
  data: Segment[];
  size?: number;
  colors?: string[];
  centerLabel?: string;
}>();

const title = props.title ?? '';
const data: Segment[] = props.data ?? [];
const size = props.size ?? 160;
const radius = 40;
const innerRadius = 22;
const colors = props.colors ?? ['#60a5fa', '#3b82f6', '#f97316', '#f59e0b'];

const total = Math.max(1, data.reduce((s: number, it: Segment) => s + it.value, 0));

// create segments with start/end angles
let acc = 0;
const normalized = data.map((seg: Segment) => {
  const start = acc / total * 360;
  acc += seg.value;
  const end = acc / total * 360;
  return { ...seg, startAngle: start, endAngle: end };
});

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: cx + (r * Math.cos(angleInRadians)),
    y: cy + (r * Math.sin(angleInRadians))
  };
}

function describeArc(x: number, y: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, r, endAngle);
  const end = polarToCartesian(x, y, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [`M ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${x} ${y}`].join(' ');
  return d;
}

const centerLabel = props.centerLabel ?? '';

// avoid false-positive unused warnings
void title
void data
void size
void radius
void innerRadius
void colors
void total
void normalized
void centerLabel
</script>

<style scoped>
.donut-chart {
  padding: 12px;
}
.chart-title {
  color: #e6eef8;
  margin-bottom: 6px;
}
.donut-center {
  font-size: 10px;
  fill: #e6eef8;
}
.card {
  background: #0b1220; /* dark card bg */
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.7);
  padding: 12px;
}
</style>
