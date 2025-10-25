<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import BarChart from '@/components/ui/diagrams/BarChart.vue'
import DonutChart from '@/components/ui/diagrams/DonutChart.vue'

// Sample data - replace with your Appwrite data
const stats = ref([
  {
    title: 'Total Exams',
    value: '24',
    change: '+12.5%',
    description: 'from last semester'
  },
  {
    title: 'Upcoming',
    value: '8',
    change: '+4',
    description: 'this month'
  },
  {
    title: 'Average Score',
    value: '87.3%',
    change: '+5.2%',
    description: 'from last period'
  },
  {
    title: 'Study Hours',
    value: '142',
    change: '+23h',
    description: 'this week'
  }
])

const upcomingExams = ref([
  {
    id: 1,
    subject: 'Mathematics',
    date: 'Oct 28, 2025',
    type: 'Midterm',
    status: 'upcoming'
  },
  {
    id: 2,
    subject: 'Physics',
    date: 'Oct 30, 2025',
    type: 'Quiz',
    status: 'upcoming'
  },
  {
    id: 3,
    subject: 'Computer Science',
    date: 'Nov 2, 2025',
    type: 'Final',
    status: 'upcoming'
  }
])

const recentScores = ref([
  { subject: 'Biology', score: 92, date: 'Oct 20' },
  { subject: 'Chemistry', score: 88, date: 'Oct 18' },
  { subject: 'History', score: 95, date: 'Oct 15' },
  { subject: 'English', score: 91, date: 'Oct 12' }
])

// Derived data for diagrams
const barData = computed(() => recentScores.value.map(s => ({ label: s.subject, value: s.score })))

// Example donut: distribution of exam types (counts)
const donutData = computed(() => {
  const counts: Record<string, number> = {}
  for (const e of upcomingExams.value) {
    counts[e.type] = (counts[e.type] ?? 0) + 1
  }
  return Object.entries(counts).map(([label, value]) => ({ label, value }))
})

// New: sample time series for line chart (study hours over days)
const studyHours = ref([
  { x: 'Mon', y: 2 },
  { x: 'Tue', y: 4 },
  { x: 'Wed', y: 3 },
  { x: 'Thu', y: 6 },
  { x: 'Fri', y: 5 },
  { x: 'Sat', y: 1 },
  { x: 'Sun', y: 0 }
])

const getStatusColor = (status: string) => {
  return status === 'upcoming' ? 'bg-primary' : 'bg-secondary'
}

// Reference vars to quiet static analysis false-positives
void stats
void upcomingExams
void recentScores
void barData
void donutData
void studyHours
</script>

<template>
  <div class="min-h-screen bg-background p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Exam Dashboard</h1>
          <p class="text-muted-foreground">Track your exams and performance</p>
        </div>
        <Button class="bg-primary hover:bg-primary/90">
          <span class="mr-2">+</span>
          Add Exam
        </Button>
      </div>

      <!-- Stats Grid -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card v-for="stat in stats" :key="stat.title">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <p class="text-xs text-muted-foreground">
              <span class="text-primary font-medium">{{ stat.change }}</span>
              {{ stat.description }}
            </p>
          </CardContent>
        </Card>
      </div>

      <div class="grid gap-6 lg:grid-cols-7">
        <!-- Upcoming Exams -->
        <Card class="lg:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>You have {{ upcomingExams.length }} exams scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                  v-for="exam in upcomingExams"
                  :key="exam.id"
                  class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                <div class="flex items-center gap-4">
                  <Avatar class="h-10 w-10">
                    <AvatarFallback class="bg-primary/10 text-primary font-semibold">
                      {{ exam.subject.substring(0, 2).toUpperCase() }}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="font-semibold">{{ exam.subject }}</p>
                    <p class="text-sm text-muted-foreground">{{ exam.date }}</p>
                  </div>
                </div>
                <Badge :class="getStatusColor(exam.status)" class="text-white">
                  {{ exam.type }}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Recent Scores -->
        <Card class="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Scores</CardTitle>
            <CardDescription>Your latest exam results</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                  v-for="score in recentScores"
                  :key="score.subject"
                  class="flex items-center justify-between"
              >
                <div>
                  <p class="font-medium">{{ score.subject }}</p>
                  <p class="text-xs text-muted-foreground">{{ score.date }}</p>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold text-primary">{{ score.score }}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Diagrams (3-column) -->
      <div class="grid gap-6 md:grid-cols-3">
        <div>
          <BarChart :data="barData" title="Recent Scores" :width="440" :height="220" />
        </div>
        <div>
          <DonutChart :data="donutData" title="Upcoming Exam Types" centerLabel="Types" />
        </div>
        <div>

        </div>
      </div>

      <!-- Quick Actions -->
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your exam schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" class="border-primary text-primary hover:bg-primary hover:text-white">
              View Calendar
            </Button>
            <Button variant="outline">Study Materials</Button>
            <Button variant="outline">Performance Analytics</Button>
            <Button variant="outline">Set Reminders</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
