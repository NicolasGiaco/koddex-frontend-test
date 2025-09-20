import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { ProjectItemsService } from "../project-items/project-items.service"

const TOTAL_ITEMS = 12000
const START_DATE = new Date("2023-01-01")
const END_DATE = new Date("2024-12-31")

const FEATURE_TYPES = [
  "Authentication",
  "User Management",
  "Dashboard",
  "API Integration",
  "Payment System",
  "Search Functionality",
  "File Upload",
  "Real-time Chat",
  "Analytics",
  "Notifications",
  "Email System",
  "Admin Panel",
  "Mobile App",
  "SEO Optimization",
  "Performance Monitoring",
  "Security Enhancement",
  "Data Visualization",
  "Export/Import",
  "Multi-language",
  "Theme System",
]

const USER_STORY_TYPES = [
  "Login Flow",
  "Profile Management",
  "Data Entry",
  "Report Generation",
  "Settings Configuration",
  "Navigation Enhancement",
  "Form Validation",
  "Error Handling",
  "Loading States",
  "Accessibility",
  "Mobile Responsiveness",
  "Browser Compatibility",
  "Cache Implementation",
  "API Optimization",
  "Database Query",
  "Image Processing",
  "File Management",
  "User Experience",
  "Performance Improvement",
]

const TASK_TYPES = [
  "Code Review",
  "Unit Testing",
  "Integration Testing",
  "Documentation",
  "Bug Fix",
  "Refactoring",
  "Security Audit",
  "Performance Tuning",
  "Database Migration",
  "API Design",
  "UI/UX Design",
  "Component Development",
  "Service Implementation",
  "Deployment",
  "Monitoring Setup",
  "Code Splitting",
  "Bundle Optimization",
  "Image Optimization",
  "SEO Implementation",
  "Accessibility Fix",
]

const STATUSES = ["Backlog", "To Do", "In Progress", "In Review", "Testing", "Done", "Blocked", "On Hold"]

const PRIORITIES = ["Critical", "High", "Medium", "Low"]

const PERFORMANCE_IMPACTS = ["Critical", "High", "Medium", "Low", "None"]

const OPTIMIZATION_TYPES = [
  "Code Splitting",
  "Lazy Loading",
  "Image Optimization",
  "Bundle Size",
  "Server-Side Rendering",
  "Static Generation",
  "Caching Strategy",
  "Database Query",
  "API Response Time",
  "Memory Usage",
  "CPU Optimization",
  "Network Optimization",
  "Core Web Vitals",
  "SEO Performance",
  "Accessibility",
]

const FRAMEWORKS = ["Next.js", "NestJS", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"]

const TEAMS = [
  "Frontend Team",
  "Backend Team",
  "Full-Stack Team",
  "DevOps Team",
  "QA Team",
  "Design Team",
  "Product Team",
  "Security Team",
  "Performance Team",
]

// Fonction pour générer une date aléatoire
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Fonction pour calculer la date de fin basée sur la durée
function calculateEndDate(startDate: Date, type: string) {
  const start = new Date(startDate)
  let daysToAdd: number

  switch (type) {
    case "Feature":
      daysToAdd = Math.floor(Math.random() * 30) + 14
      break // 14-44 jours
    case "User Story":
      daysToAdd = Math.floor(Math.random() * 14) + 7
      break // 7-21 jours
    case "Task":
      daysToAdd = Math.floor(Math.random() * 7) + 1
      break // 1-8 jours
    case "Bug":
      daysToAdd = Math.floor(Math.random() * 3) + 1
      break // 1-4 jours
    case "Epic":
      daysToAdd = Math.floor(Math.random() * 60) + 30
      break // 30-90 jours
    default:
      daysToAdd = Math.floor(Math.random() * 7) + 3
      break // 3-10 jours
  }

  const endDate = new Date(start)
  endDate.setDate(start.getDate() + daysToAdd)
  return endDate
}

async function generateData() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const projectItemsService = app.get(ProjectItemsService)

  console.log("Génération de", TOTAL_ITEMS, "éléments...")

  for (let i = 1; i <= TOTAL_ITEMS; i++) {
  const itemType = i <= 800 ? "Feature" : i <= 3000 ? "User Story" : i <= 8000 ? "Task" : i <= 9500 ? "Bug" : "Epic"

  const startDate = randomDate(START_DATE, END_DATE)
  const endDate = calculateEndDate(startDate, itemType)

  let name: string, description: string

  switch (itemType) {
    case "Feature": {
      const featureType = FEATURE_TYPES[Math.floor(Math.random() * FEATURE_TYPES.length)]
      name = `${featureType} ${Math.floor(i / 100) + 1}.${i % 100}`
      description = `Implementation of ${featureType} with advanced performance optimization and security features`
      break
    }

    case "User Story": {
      const storyType = USER_STORY_TYPES[Math.floor(Math.random() * USER_STORY_TYPES.length)]
      name = `User Story: ${storyType} Enhancement`
      description = `As a user, I want to ${storyType.toLowerCase()} so that I can improve my workflow efficiency`
      break
    }

    case "Task": {
      const taskType = TASK_TYPES[Math.floor(Math.random() * TASK_TYPES.length)]
      name = `Task: ${taskType} - ${Math.floor(Math.random() * 1000) + 1}`
      description = `${taskType} implementation with focus on performance and best practices`
      break
    }

    case "Bug":
      name = `Bug Fix: Issue #${Math.floor(Math.random() * 9000) + 1000}`
      description = `Critical bug fix affecting ${Math.random() > 0.5 ? "performance" : "functionality"} in production environment`
      break

    case "Epic":
      name = `Epic: ${FEATURE_TYPES[Math.floor(Math.random() * FEATURE_TYPES.length)]} Platform`
      description = `Large-scale epic encompassing multiple features and performance improvements`
      break
  }

  // Métriques de performance avancées
  const performanceMetrics = {
    // Métriques Next.js
    bundle_size_kb: Math.floor(Math.random() * 500) + 10,
    first_contentful_paint_ms: Math.floor(Math.random() * 2000) + 500,
    largest_contentful_paint_ms: Math.floor(Math.random() * 3000) + 1000,
    cumulative_layout_shift: parseFloat((Math.random() * 0.3).toFixed(3)),
    first_input_delay_ms: Math.floor(Math.random() * 200) + 10,
    time_to_interactive_ms: Math.floor(Math.random() * 4000) + 1000,

    // Métriques NestJS
    api_response_time_ms: Math.floor(Math.random() * 500) + 50,
    memory_usage_mb: Math.floor(Math.random() * 200) + 50,
    cpu_usage_percent: Math.floor(Math.random() * 80) + 10,
    database_query_time_ms: Math.floor(Math.random() * 100) + 5,
    cache_hit_rate_percent: Math.floor(Math.random() * 40) + 60,

    // Métriques générales
    lighthouse_performance_score: Math.floor(Math.random() * 40) + 60,
    lighthouse_accessibility_score: Math.floor(Math.random() * 30) + 70,
    lighthouse_seo_score: Math.floor(Math.random() * 35) + 65,

    // Métriques de développement
    code_coverage_percent: Math.floor(Math.random() * 50) + 50,
    technical_debt_hours: Math.floor(Math.random() * 20) + 1,
    complexity_score: Math.floor(Math.random() * 8) + 1,
  }

  const item = {
    node_id: i,
    name: name,
    type: itemType,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
    description: description,
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
    assigned_team: TEAMS[Math.floor(Math.random() * TEAMS.length)],
    estimated_hours: Math.floor(Math.random() * 80) + 8,
    actual_hours: Math.floor(Math.random() * 100) + 5,
    story_points: Math.ceil(Math.random() * 13),
    framework: FRAMEWORKS[Math.floor(Math.random() * FRAMEWORKS.length)],
    performance_impact: PERFORMANCE_IMPACTS[Math.floor(Math.random() * PERFORMANCE_IMPACTS.length)],
    optimization_type: OPTIMIZATION_TYPES[Math.floor(Math.random() * OPTIMIZATION_TYPES.length)],
    requires_testing: Math.random() > 0.3 ? "Yes" : "No",
    has_dependencies: Math.random() > 0.6 ? "Yes" : "No",
    affects_seo: Math.random() > 0.7 ? "Yes" : "No",
    mobile_optimized: Math.random() > 0.4 ? "Yes" : "No",
    accessibility_compliant: Math.random() > 0.5 ? "Yes" : "No",
    ...performanceMetrics,
  }

    try {
      await projectItemsService.create(item)

      if (i % 1000 === 0) {
        console.log(`Généré et inséré ${i} éléments...`)
      }
    } catch (error) {
      console.error(`Erreur lors de l'insertion de l'élément ${i}:`, error)
    }
  }

  console.log("Génération terminée!")
  await app.close()
}

generateData().catch(console.error)
