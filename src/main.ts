import './style.css'
import { DashboardApp } from './components/DashboardApp'
import { Chart, registerables } from 'chart.js'

// Register Chart.js components
Chart.register(...registerables)

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
  new DashboardApp()
})
