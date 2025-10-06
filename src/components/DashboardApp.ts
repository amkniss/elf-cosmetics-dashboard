import { Chart } from 'chart.js'
import { brandData, competitiveData, consumerData, opportunities } from '../data/dashboardData'

export class DashboardApp {
  private barChart: Chart | null = null

  constructor() {
    this.initializeCharts()
    this.setupEventListeners()
    this.setupNavigation()
  }

  private initializeCharts(): void {
    this.createMarketShareChart()
    this.createCompetitorRadarChart()
    this.createCompetitorBarChart('social')
    this.createWordCloud()
    this.createFAQAccordion()
    this.createOpportunityBubbleChart()
  }

  private createMarketShareChart(): void {
    const ctx = document.getElementById('marketShareChart') as HTMLCanvasElement
    if (!ctx) return

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['e.l.f.', 'NYX', 'Colourpop', 'Glossier', 'Others'],
        datasets: [{
          data: [9.5, 8.2, 7.5, 4.1, 70.7],
          backgroundColor: [
            brandData.elf.color, 
            brandData.nyx.color, 
            brandData.colourpop.color, 
            brandData.glossier.color, 
            '#E7E5E4'
          ],
          borderWidth: 2,
          borderColor: '#FAFAF9'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    })
  }

  private createCompetitorRadarChart(): void {
    const ctx = document.getElementById('competitorRadarChart') as HTMLCanvasElement
    if (!ctx) return

    new Chart(ctx, {
      type: 'radar',
      data: competitiveData.radar,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: '#D6D3D1' },
            grid: { color: '#E7E5E4' },
            pointLabels: { font: { size: 12 } },
            ticks: { display: false, stepSize: 2 }
          }
        },
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    })
  }

  private createCompetitorBarChart(metric: keyof typeof competitiveData.bar): void {
    const ctx = document.getElementById('competitorBarChart') as HTMLCanvasElement
    if (!ctx) return

    const data = competitiveData.bar[metric]
    
    if (this.barChart) {
      this.barChart.data.datasets[0].data = data.values
      this.barChart.options.plugins!.title!.text = data.title
      this.barChart.update()
    } else {
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: [
              brandData.elf.color, 
              brandData.nyx.color, 
              brandData.colourpop.color, 
              brandData.glossier.color
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: { grid: { color: '#E7E5E4' } },
            y: { grid: { display: false } }
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: data.title,
              padding: { bottom: 10 }
            }
          }
        }
      })
    }
  }

  private createWordCloud(): void {
    const container = document.getElementById('word-cloud')
    if (!container) return

    const fontSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl']
    
    consumerData.topics
      .sort((a, b) => a.text.localeCompare(b.text))
      .forEach(topic => {
        const tag = document.createElement('span')
        tag.textContent = topic.text
        tag.className = `word-cloud-tag p-2 rounded-md bg-stone-200 cursor-pointer hover:bg-pink-100 ${fontSizes[topic.size - 1]}`
        tag.dataset.category = topic.category
        container.appendChild(tag)
      })
  }

  private createFAQAccordion(): void {
    const container = document.getElementById('faq-accordion')
    if (!container) return

    this.renderFAQs(consumerData.faqs)
  }

  private renderFAQs(faqsToRender: typeof consumerData.faqs): void {
    const container = document.getElementById('faq-accordion')
    if (!container) return

    container.innerHTML = ''
    
    if (faqsToRender.length === 0) {
      container.innerHTML = '<p class="text-stone-500 text-center">No questions found for this topic.</p>'
      return
    }

    faqsToRender.forEach(faq => {
      const div = document.createElement('div')
      div.className = 'stone-card rounded-lg overflow-hidden'
      div.innerHTML = `
        <button class="w-full text-left p-4 font-semibold flex justify-between items-center hover:bg-stone-100 faq-question">
          <span>${faq.q}</span>
          <span class="transform transition-transform duration-300 faq-icon text-xl font-light">+</span>
        </button>
        <div class="p-4 bg-white border-t border-stone-200 hidden faq-answer text-sm text-stone-600">
          <p>${faq.a}</p>
        </div>
      `
      container.appendChild(div)
    })
  }

  private createOpportunityBubbleChart(): void {
    const ctx = document.getElementById('opportunityBubbleChart') as HTMLCanvasElement
    if (!ctx) return

    new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: opportunities.map(opp => ({
          label: opp.label,
          data: [{ x: opp.x, y: opp.y, r: opp.r }],
          backgroundColor: opp.backgroundColor
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { 
            title: { display: true, text: 'Development Effort (1-10)' }, 
            grid: { color: '#E7E5E4' } 
          },
          y: { 
            title: { display: true, text: 'Potential Market Impact (1-10)' }, 
            grid: { color: '#E7E5E4' } 
          }
        },
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    })
  }

  private setupEventListeners(): void {
    // Metric buttons
    document.querySelectorAll('.metric-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement
        document.querySelectorAll('.metric-button').forEach(btn => btn.classList.remove('active-btn'))
        target.classList.add('active-btn')
        this.createCompetitorBarChart(target.dataset.metric as keyof typeof competitiveData.bar)
      })
    })

    // Word cloud filtering
    const wordCloudContainer = document.getElementById('word-cloud')
    const clearFilterBtn = document.getElementById('clear-filter-btn')

    wordCloudContainer?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('word-cloud-tag')) {
        const category = target.dataset.category
        const isActive = target.classList.contains('active')

        wordCloudContainer.querySelectorAll('.word-cloud-tag').forEach(tag => 
          tag.classList.remove('active')
        )

        if (isActive) {
          this.renderFAQs(consumerData.faqs)
          clearFilterBtn?.classList.add('hidden')
        } else {
          target.classList.add('active')
          const filteredFaqs = consumerData.faqs.filter(faq => faq.category === category)
          this.renderFAQs(filteredFaqs)
          clearFilterBtn?.classList.remove('hidden')
        }
      }
    })

    // Clear filter button
    clearFilterBtn?.addEventListener('click', () => {
      wordCloudContainer?.querySelectorAll('.word-cloud-tag').forEach(tag => 
        tag.classList.remove('active')
      )
      this.renderFAQs(consumerData.faqs)
      clearFilterBtn.classList.add('hidden')
    })

    // FAQ accordion
    document.getElementById('faq-accordion')?.addEventListener('click', (e) => {
      const question = (e.target as HTMLElement).closest('.faq-question')
      if (!question) return

      const answer = question.nextElementSibling as HTMLElement
      const icon = question.querySelector('.faq-icon') as HTMLElement
      const isCurrentlyOpen = !answer.classList.contains('hidden')

      // Close all other FAQs
      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'))
      document.querySelectorAll('.faq-icon').forEach(ic => ic.textContent = '+')

      if (!isCurrentlyOpen) {
        answer.classList.remove('hidden')
        icon.textContent = '−'
      }
    })

    // Metric cards navigation
    document.querySelectorAll('.metric-card').forEach(card => {
      card.addEventListener('click', () => {
        const targetId = card.getAttribute('data-scroll-to')
        if (targetId) {
          document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })

    // Recommendation toggles
    document.querySelectorAll('.recommendation-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling as HTMLElement
        const isOpen = button.classList.contains('open')

        if (isOpen) {
          content.classList.add('hidden')
          button.classList.remove('open')
        } else {
          content.classList.remove('hidden')
          button.classList.add('open')
        }
      })
    })

    // Mobile navigation
    const mobileNav = document.getElementById('mobile-nav') as HTMLSelectElement
    mobileNav?.addEventListener('change', () => {
      const targetId = mobileNav.value
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  private setupNavigation(): void {
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.nav-link')
    const mobileNav = document.getElementById('mobile-nav') as HTMLSelectElement

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
          })
          if (document.activeElement !== mobileNav) {
            mobileNav.value = `#${id}`
          }
        }
      })
    }, { rootMargin: '-50% 0px -50% 0px' })

    sections.forEach(section => observer.observe(section))
  }
}
