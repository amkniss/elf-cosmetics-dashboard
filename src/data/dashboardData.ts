import { BrandData, CompetitiveData, ConsumerData, Opportunity } from '../types'

export const brandData: Record<string, BrandData> = {
  elf: { color: '#D65A8D' },
  nyx: { color: '#8884d8' },
  colourpop: { color: '#82ca9d' },
  glossier: { color: '#ffc658' }
}

export const competitiveData: CompetitiveData = {
  radar: {
    labels: ['Affordability', 'Trendiness', 'Ingredient Quality', 'Digital Presence', 'Shade Range'],
    datasets: [
      { 
        label: 'e.l.f.', 
        data: [9, 7, 6, 8, 7], 
        backgroundColor: 'rgba(214, 90, 141, 0.2)', 
        borderColor: brandData.elf.color, 
        borderWidth: 2, 
        pointBackgroundColor: brandData.elf.color 
      },
      { 
        label: 'NYX', 
        data: [8, 8, 6, 7, 9], 
        backgroundColor: 'rgba(136, 132, 216, 0.2)', 
        borderColor: brandData.nyx.color, 
        borderWidth: 2, 
        pointBackgroundColor: brandData.nyx.color 
      },
      { 
        label: 'Colourpop', 
        data: [9, 9, 5, 8, 8], 
        backgroundColor: 'rgba(130, 202, 157, 0.2)', 
        borderColor: brandData.colourpop.color, 
        borderWidth: 2, 
        pointBackgroundColor: brandData.colourpop.color 
      },
      { 
        label: 'Glossier', 
        data: [4, 6, 8, 6, 5], 
        backgroundColor: 'rgba(255, 198, 88, 0.2)', 
        borderColor: brandData.glossier.color, 
        borderWidth: 2, 
        pointBackgroundColor: brandData.glossier.color 
      }
    ]
  },
  bar: {
    social: { 
      labels: ['e.l.f.', 'NYX', 'Colourpop', 'Glossier'], 
      values: [8.5, 14.5, 13.0, 2.8], 
      title: 'Total Social Followers (Millions)' 
    },
    sentiment: { 
      labels: ['e.l.f.', 'NYX', 'Colourpop', 'Glossier'], 
      values: [88, 85, 90, 92], 
      title: 'Net Sentiment Score (/100)' 
    },
    price: { 
      labels: ['e.l.f.', 'NYX', 'Colourpop', 'Glossier'], 
      values: [100, 115, 95, 210], 
      title: 'Average Price Index (e.l.f. = 100)' 
    },
  }
}

export const consumerData: ConsumerData = {
  topics: [
    { text: 'Cruelty-Free', size: 5, category: 'ethics' },
    { text: 'Long-Lasting', size: 4, category: 'performance' },
    { text: 'Affordable Dupes', size: 5, category: 'value' },
    { text: 'Sensitive Skin', size: 3, category: 'ingredients' },
    { text: 'Ingredient Safety', size: 4, category: 'ingredients' },
    { text: 'Packaging', size: 2, category: 'sustainability' },
    { text: 'Shade Match', size: 4, category: 'product' },
    { text: 'Vegan', size: 3, category: 'ethics' },
    { text: 'Clean Beauty', size: 3, category: 'ingredients' },
    { text: 'Sustainability', size: 2, category: 'sustainability' }
  ],
  faqs: [
    { 
      q: "Is this product good for oily/sensitive skin?", 
      a: "High volume of questions indicates a need for clearer product labeling and filtering on the website. Consumers often feel unsure if affordable products will aggravate skin conditions.", 
      category: 'ingredients' 
    },
    { 
      q: "What's the best dupe for [Luxury Product]?", 
      a: "This is a primary driver of traffic and conversion for e.l.f. Consumers actively seek validation that e.l.f. products are comparable to high-end alternatives.", 
      category: 'value' 
    },
    { 
      q: "Are your products truly vegan and cruelty-free?", 
      a: "While e.l.f. is certified, consumers constantly seek reassurance. This is a core brand value that needs continuous and prominent communication.", 
      category: 'ethics' 
    },
    { 
      q: "How do I find my correct foundation/concealer shade online?", 
      a: "A major pain point across all brands. This highlights a significant opportunity for better digital tools like AI-powered shade finders or virtual try-ons.", 
      category: 'product' 
    },
    { 
      q: "Is the packaging recyclable/sustainable?", 
      a: "A growing concern, especially among Gen Z. Consumers are beginning to factor brand sustainability into their purchasing decisions, even at lower price points.", 
      category: 'sustainability' 
    },
    { 
      q: "Does this foundation oxidize or change color?", 
      a: "Consumers are wary of foundations that darken after application. Clear information and consistent formulas are key to building trust.", 
      category: 'performance' 
    },
    { 
      q: "What are the active ingredients in this primer?", 
      a: "An increasingly savvy consumer base wants to know about ingredients like niacinamide or hyaluronic acid, even in makeup products.", 
      category: 'ingredients' 
    }
  ]
}

export const opportunities: Opportunity[] = [
  { label: 'Skincare-Makeup Hybrids', x: 3, y: 8, r: 25, backgroundColor: brandData.elf.color },
  { label: 'AI Personalization Tools', x: 7, y: 7, r: 20, backgroundColor: brandData.nyx.color },
  { label: 'Refillable Packaging', x: 5, y: 5, r: 18, backgroundColor: brandData.colourpop.color },
  { label: 'Men\'s Concealer Line', x: 8, y: 3, r: 12, backgroundColor: brandData.glossier.color },
  { label: 'Clean Fragrance', x: 9, y: 4, r: 10, backgroundColor: '#a0aec0' }
]
