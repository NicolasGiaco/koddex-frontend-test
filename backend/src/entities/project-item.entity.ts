import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("project_items")
export class ProjectItem {
  @PrimaryGeneratedColumn()
  node_id: number

  @Column()
  name: string

  @Column()
  type: string

  @Column()
  status: string

  @Column()
  priority: string

  @Column("text")
  description: string

  @Column({ type: "date" })
  start_date: string

  @Column({ type: "date" })
  end_date: string

  @Column()
  assigned_team: string

  @Column()
  estimated_hours: number

  @Column()
  actual_hours: number

  @Column()
  story_points: number

  @Column()
  framework: string

  @Column()
  performance_impact: string

  @Column()
  optimization_type: string

  @Column()
  requires_testing: string

  @Column()
  has_dependencies: string

  @Column()
  affects_seo: string

  @Column()
  mobile_optimized: string

  @Column()
  accessibility_compliant: string

  @Column()
  bundle_size_kb: number

  @Column()
  first_contentful_paint_ms: number

  @Column()
  largest_contentful_paint_ms: number

  @Column("decimal", { precision: 5, scale: 3 })
  cumulative_layout_shift: number

  @Column()
  first_input_delay_ms: number

  @Column()
  time_to_interactive_ms: number

  @Column()
  api_response_time_ms: number

  @Column()
  memory_usage_mb: number

  @Column()
  cpu_usage_percent: number

  @Column()
  database_query_time_ms: number

  @Column()
  cache_hit_rate_percent: number

  @Column()
  lighthouse_performance_score: number

  @Column()
  lighthouse_accessibility_score: number

  @Column()
  lighthouse_seo_score: number

  @Column()
  code_coverage_percent: number

  @Column()
  technical_debt_hours: number

  @Column()
  complexity_score: number
}
