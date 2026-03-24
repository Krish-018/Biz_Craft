// src/Pages/Tools/data/toolsData.js - ENHANCED VERSION

export const availableTools = [
  // FINANCIAL TOOLS (7 tools)
  {
    id: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    category: 'finance',
    description: 'Calculate profit margins, markup, and optimal pricing',
    longDescription: `Master your pricing strategy with our comprehensive profit margin calculator. Understand the difference between markup and margin, calculate your ideal selling price, and ensure profitable sales every time.

    **Key Benefits:**
    - Never underprice your products again
    - Understand true profitability of each product
    - Make data-driven pricing decisions
    - Compare different pricing scenarios instantly`,
    icon: 'DollarSign',
    color: 'green',
    popular: true,
    featured: true,
    version: '2.3.0',
    author: 'BizCraft Finance Team',
    authorAvatar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-15',
    size: '1.8 MB',
    rating: 4.9,
    users: 15234,
    downloads: 45678,
    price: 'Free',
    tags: ['profit', 'margin', 'pricing', 'finance', 'calculator'],
    features: [
      'Gross profit calculation (Revenue - COGS)',
      'Net profit calculation after all expenses',
      'Markup vs margin conversion',
      'Break-even analysis',
      'Bulk product upload for mass calculation',
      'Price optimization suggestions',
      'Competitor price comparison',
      'Export calculations to CSV/PDF'
    ],
    requirements: [
      'Product cost price',
      'Desired profit margin or selling price',
      'Basic business information'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '2 min',
      steps: [
        'Enter your product cost price',
        'Enter your desired selling price or margin',
        'Click calculate to see your profit',
        'Save calculations for future reference',
        'Export results for your records'
      ]
    },
    whatsNew: [
      'Bulk product calculator for CSV upload',
      'Export to Excel format',
      'Price optimization recommendations',
      'Historical calculation tracking'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Enter Your Cost',
          description: 'Start by entering the cost price of your product. This includes manufacturing, shipping, and any other direct costs.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        },
        {
          title: 'Set Your Price',
          description: 'Enter either your selling price or desired margin percentage. The calculator will automatically compute the other value.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Review Results',
          description: 'See your gross profit, net profit, and margin percentage instantly. Compare different pricing scenarios side by side.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'cash-flow-forecaster',
    name: 'Cash Flow Forecaster',
    category: 'finance',
    description: 'Predict future cash flow up to 12 months ahead',
    longDescription: `Never run out of cash again. Our cash flow forecaster helps you predict your business's financial future with stunning accuracy. Identify potential shortfalls before they happen and make informed decisions about investments and expenses.

    **Key Benefits:**
    - 12-month rolling cash flow forecast
    - Identify cash gaps before they become crises
    - Plan for seasonal fluctuations
    - Make confident investment decisions`,
    icon: 'TrendingUp',
    color: 'teal',
    popular: true,
    featured: true,
    version: '2.1.0',
    author: 'BizCraft Finance Team',
    authorAvatar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-14',
    size: '2.2 MB',
    rating: 4.8,
    users: 8765,
    downloads: 23456,
    price: 'Free',
    tags: ['cashflow', 'forecast', 'finance', 'planning'],
    features: [
      '12-month cash flow projections',
      'Income and expense forecasting',
      'What-if scenario planning',
      'Cash gap identification alerts',
      'Seasonal trend analysis',
      'Visual charts and graphs',
      'Export forecasts to Excel/PDF',
      'Share forecasts with stakeholders'
    ],
    requirements: [
      'Historical income data (optional)',
      'Regular expense categories',
      'Expected future income sources'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '10 min',
      steps: [
        'Enter your monthly income sources',
        'Add your regular expenses',
        'Review the 12-month forecast',
        'Adjust variables to test scenarios',
        'Save and share your forecast'
      ]
    },
    whatsNew: [
      'AI-powered forecasting suggestions',
      'Integration with bank accounts',
      'Mobile-optimized charts',
      'Export to QuickBooks format'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Add Income Sources',
          description: 'Start by adding all your income streams - sales, services, investments, etc. You can add them monthly or annually.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Enter Expenses',
          description: 'Add all your regular expenses: rent, salaries, utilities, marketing, etc. The tool will automatically calculate totals.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Run Scenarios',
          description: 'Use the "What-If" feature to test different scenarios - what if sales increase 20%? What if you hire two more people?',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    category: 'finance',
    description: 'Calculate loan EMIs, interest, and repayment schedules',
    longDescription: `Make informed borrowing decisions with our comprehensive loan EMI calculator. See exactly how much you'll pay over the life of any loan and compare different loan options side by side.

    **Key Benefits:**
    - Know your exact monthly payment
    - See total interest payable over loan term
    - Compare different loan offers instantly
    - Understand impact of prepayments`,
    icon: 'CreditCard',
    color: 'blue',
    popular: true,
    featured: false,
    version: '1.9.0',
    author: 'BizCraft Finance Team',
    authorAvatar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-10',
    size: '1.5 MB',
    rating: 4.7,
    users: 12345,
    downloads: 34567,
    price: 'Free',
    tags: ['loan', 'emi', 'finance', 'calculator', 'interest'],
    features: [
      'EMI calculation for any loan amount',
      'Amortization schedule generator',
      'Total interest calculation',
      'Prepayment impact analysis',
      'Loan comparison tool',
      'Interest rate vs. tenure analysis',
      'PDF report generation',
      'Share loan comparisons'
    ],
    requirements: [
      'Loan amount',
      'Interest rate',
      'Loan tenure'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '1 min',
      steps: [
        'Enter loan amount',
        'Enter interest rate',
        'Select loan tenure',
        'View EMI and total interest',
        'Generate amortization schedule'
      ]
    },
    whatsNew: [
      'Loan comparison side-by-side',
      'PDF amortization schedules',
      'Mobile-friendly interface',
      'Save calculations to dashboard'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Enter Loan Details',
          description: 'Input the loan amount, interest rate, and tenure. The calculator instantly shows your monthly EMI.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        },
        {
          title: 'View Amortization',
          description: 'See a complete breakdown of principal vs. interest for each payment over the entire loan term.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Compare Loans',
          description: 'Use the comparison tool to evaluate up to 3 different loan offers side by side.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit-crop'
        }
      ]
    }
  },
  {
    id: 'break-even-analyzer',
    name: 'Break-Even Analyzer',
    category: 'finance',
    description: 'Find your break-even point and profitability threshold',
    longDescription: `Know exactly how much you need to sell to start making a profit. Our break-even analyzer helps you understand your cost structure and set realistic sales targets.

    **Key Benefits:**
    - Know your minimum sales target
    - Understand fixed vs. variable costs
    - Make pricing decisions with confidence
    - Plan for profitability`,
    icon: 'Target',
    color: 'purple',
    popular: true,
    featured: false,
    version: '1.5.0',
    author: 'BizCraft Finance Team',
    authorAvatar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-08',
    size: '1.3 MB',
    rating: 4.6,
    users: 6543,
    downloads: 18765,
    price: 'Free',
    tags: ['breakeven', 'profit', 'cost', 'analysis'],
    features: [
      'Break-even point in units',
      'Break-even point in revenue',
      'Fixed vs. variable cost analysis',
      'Contribution margin calculation',
      'What-if scenario modeling',
      'Profit volume chart',
      'Multiple product break-even',
      'Export analysis reports'
    ],
    requirements: [
      'Fixed costs',
      'Variable cost per unit',
      'Selling price per unit'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '3 min',
      steps: [
        'Enter your fixed costs',
        'Enter variable cost per unit',
        'Enter selling price per unit',
        'View break-even point',
        'Test different scenarios'
      ]
    },
    whatsNew: [
      'Multi-product break-even analysis',
      'Interactive profit volume chart',
      'Scenario comparison',
      'Export to Excel'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Enter Your Costs',
          description: 'Input all fixed costs (rent, salaries) and variable costs per unit (materials, labor).',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Set Your Price',
          description: 'Enter your selling price per unit. The tool calculates contribution margin automatically.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Analyze Results',
          description: 'See your break-even point and understand how changes in costs or price affect profitability.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'tax-estimator',
    name: 'Business Tax Estimator',
    category: 'finance',
    description: 'Estimate business taxes and plan for tax season',
    longDescription: `Never be surprised by tax season again. Our business tax estimator helps you forecast your tax liability, identify deductions, and plan ahead for payments.

    **Key Benefits:**
    - Estimate quarterly tax payments
    - Identify potential deductions
    - Avoid underpayment penalties
    - Plan for tax season year-round`,
    icon: 'FileText',
    color: 'orange',
    popular: true,
    featured: false,
    version: '2.0.0',
    author: 'BizCraft Tax Team',
    authorAvatar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-05',
    size: '2.1 MB',
    rating: 4.5,
    users: 4321,
    downloads: 12345,
    price: 'Free',
    tags: ['tax', 'finance', 'estimator', 'deductions'],
    features: [
      'Income tax estimation',
      'Deduction finder',
      'Quarterly payment calculator',
      'Tax bracket analysis',
      'Business structure comparison',
      'Estimated tax savings',
      'Deadline reminders',
      'Export tax reports'
    ],
    requirements: [
      'Estimated annual revenue',
      'Business expenses',
      'Business structure'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '5 min',
      steps: [
        'Enter your business structure',
        'Input estimated revenue',
        'Add business expenses',
        'Review tax estimate',
        'Save for tax planning'
      ]
    },
    whatsNew: [
      'Deduction recommendation engine',
      'State tax calculator',
      'Integration with accounting software',
      'Quarterly payment planner'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Business Details',
          description: 'Select your business type (LLC, S-Corp, Sole Proprietor) and enter basic information.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Financial Information',
          description: 'Enter your expected revenue and expenses. The more accurate, the better your estimate.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Review and Plan',
          description: 'See your estimated tax liability and get recommendations for quarterly payments and deductions.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'finance',
    description: 'Calculate return on investment for any business decision',
    longDescription: `Make data-driven investment decisions with our comprehensive ROI calculator. Evaluate marketing campaigns, equipment purchases, hiring decisions, and more.

    **Key Benefits:**
    - Compare investment opportunities
    - Calculate payback period
    - Understand true returns
    - Justify business decisions with data`,
    icon: 'TrendingUp',
    color: 'emerald',
    popular: true,
    featured: true,
    version: '1.8.0',
    author: 'BizCraft Analytics Team',
    authorAvatar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-12',
    size: '1.6 MB',
    rating: 4.8,
    users: 9876,
    downloads: 28765,
    price: 'Free',
    tags: ['roi', 'investment', 'finance', 'analysis'],
    features: [
      'ROI percentage calculation',
      'Payback period analysis',
      'Net present value (NPV)',
      'Internal rate of return (IRR)',
      'Investment comparison tool',
      'Multi-year projections',
      'Risk assessment',
      'Visual ROI charts'
    ],
    requirements: [
      'Initial investment amount',
      'Expected returns',
      'Time period'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '2 min',
      steps: [
        'Enter investment amount',
        'Enter expected returns',
        'Select time period',
        'View ROI and payback period',
        'Compare multiple investments'
      ]
    },
    whatsNew: [
      'NPV and IRR calculations',
      'Risk-adjusted ROI',
      'Investment comparison dashboard',
      'Export investment reports'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Investment Details',
          description: 'Enter the initial cost of your investment - whether it\'s marketing spend, equipment, or hiring.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Expected Returns',
          description: 'Input the expected returns over time. The calculator handles both one-time and recurring returns.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Analyze Results',
          description: 'See comprehensive ROI analysis including payback period, NPV, and IRR to make informed decisions.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    category: 'finance',
    description: 'Create professional invoices in seconds',
    longDescription: `Get paid faster with professional, customizable invoices. Our invoice generator helps you create, send, and track invoices all in one place.

    **Key Benefits:**
    - Create invoices in under 60 seconds
    - Professional templates that impress clients
    - Track payments and send reminders
    - Get paid faster with online payments`,
    icon: 'FileText',
    color: 'red',
    popular: true,
    featured: true,
    version: '3.2.0',
    author: 'BizCraft Finance Team',
    authorAvatar: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-15',
    size: '2.8 MB',
    rating: 4.9,
    users: 23456,
    downloads: 67890,
    price: 'Free',
    tags: ['invoice', 'billing', 'payment', 'finance'],
    features: [
      'Professional invoice templates',
      'Recurring invoices',
      'Payment tracking',
      'Automatic payment reminders',
      'Multi-currency support',
      'Tax calculation',
      'Client management',
      'Revenue reports',
      'Export to PDF/Excel',
      'Email directly to clients'
    ],
    requirements: [
      'Client details',
      'Products/services sold',
      'Your business information'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '3 min',
      steps: [
        'Enter your business details',
        'Add client information',
        'Add products/services',
        'Preview and customize',
        'Send invoice to client'
      ]
    },
    whatsNew: [
      'Online payment integration',
      'Recurring invoice automation',
      'Client payment portal',
      'Expense tracking integration'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Business Setup',
          description: 'Add your company logo, contact information, and preferred invoice numbering system.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Create Invoice',
          description: 'Select a client, add line items with quantities and prices, and let the tool calculate totals automatically.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Send and Track',
          description: 'Email the invoice directly, track when it\'s viewed, and send automatic payment reminders.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },

  // BUSINESS PLANNING TOOLS (5 tools)
  {
    id: 'business-plan-generator',
    name: 'Business Plan Generator',
    category: 'planning',
    description: 'Create professional business plans with AI assistance',
    longDescription: `Stop staring at a blank page. Our AI-powered business plan generator helps you create comprehensive, professional business plans in hours, not weeks.

    **Key Benefits:**
    - Save weeks of work
    - Professional formatting
    - Investor-ready documents
    - Step-by-step guidance`,
    icon: 'FileText',
    color: 'indigo',
    popular: true,
    featured: true,
    version: '2.5.0',
    author: 'BizCraft Strategy Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-13',
    size: '3.2 MB',
    rating: 4.8,
    users: 8765,
    downloads: 23456,
    price: 'Free',
    tags: ['business plan', 'planning', 'strategy', 'startup'],
    features: [
      'Executive summary generator',
      'Company description',
      'Market analysis section',
      'Organization structure',
      'Product line description',
      'Marketing strategy',
      'Financial projections',
      'Funding request templates',
      'Export to Word/PDF',
      'Share with investors'
    ],
    requirements: [
      'Basic business idea',
      'Target market understanding',
      'Revenue model'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '20 min',
      steps: [
        'Answer questions about your business',
        'Fill in market research',
        'Add financial projections',
        'Review and customize',
        'Export your business plan'
      ]
    },
    whatsNew: [
      'AI-powered content suggestions',
      'Industry-specific templates',
      'Financial projection wizard',
      'Investor pitch deck integration'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Business Basics',
          description: 'Start by answering simple questions about your business idea, target market, and goals.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Market Research',
          description: 'Our tool guides you through market analysis, competitor research, and customer identification.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Financial Projections',
          description: 'Use our financial wizard to create realistic revenue forecasts, expense projections, and cash flow statements.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'swot-analyzer',
    name: 'SWOT Analysis Tool',
    category: 'planning',
    description: 'Analyze strengths, weaknesses, opportunities, and threats',
    longDescription: `Make better strategic decisions with comprehensive SWOT analysis. Understand your business position and identify opportunities for growth.

    **Key Benefits:**
    - Identify competitive advantages
    - Spot market opportunities
    - Mitigate business risks
    - Strategic planning made easy`,
    icon: 'Target',
    color: 'purple',
    popular: true,
    featured: false,
    version: '1.6.0',
    author: 'BizCraft Strategy Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-10',
    size: '1.4 MB',
    rating: 4.7,
    users: 5432,
    downloads: 15432,
    price: 'Free',
    tags: ['swot', 'analysis', 'strategy', 'planning'],
    features: [
      'Interactive SWOT matrix',
      'Strength identification',
      'Weakness analysis',
      'Opportunity discovery',
      'Threat assessment',
      'Strategy generation',
      'Export SWOT diagrams',
      'Share with team'
    ],
    requirements: [
      'Understanding of your business',
      'Market awareness',
      'Competitor knowledge'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '5 min',
      steps: [
        'Add your strengths',
        'List your weaknesses',
        'Identify opportunities',
        'Assess threats',
        'Generate strategies'
      ]
    },
    whatsNew: [
      'Collaborative SWOT with team',
      'Strategy recommendations',
      'Export to presentation format',
      'Competitor comparison'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Internal Analysis',
          description: 'Start by listing your business strengths and weaknesses - be honest and thorough.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'External Analysis',
          description: 'Identify opportunities in your market and potential threats from competitors or market changes.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Generate Strategies',
          description: 'The tool automatically suggests strategies based on your SWOT analysis, like using strengths to pursue opportunities.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    category: 'planning',
    description: 'Track and analyze your competitors',
    longDescription: `Stay ahead of the competition with comprehensive competitor analysis. Track their moves, analyze their strategies, and find your competitive edge.

    **Key Benefits:**
    - Understand competitor strategies
    - Identify market gaps
    - Benchmark your performance
    - Make data-driven decisions`,
    icon: 'Users',
    color: 'blue',
    popular: true,
    featured: false,
    version: '1.4.0',
    author: 'BizCraft Research Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-08',
    size: '1.7 MB',
    rating: 4.6,
    users: 4321,
    downloads: 12345,
    price: 'Free',
    tags: ['competitor', 'analysis', 'market', 'research'],
    features: [
      'Competitor tracking',
      'SWOT comparison',
      'Pricing analysis',
      'Product feature comparison',
      'Market share estimation',
      'Social media monitoring',
      'Competitive positioning map',
      'Strategy recommendations'
    ],
    requirements: [
      'List of competitors',
      'Basic market knowledge',
      'Competitor information sources'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '10 min',
      steps: [
        'Add competitors to track',
        'Enter competitor information',
        'Compare features and pricing',
        'Analyze market position',
        'Get strategy recommendations'
      ]
    },
    whatsNew: [
      'Automated competitor monitoring',
      'Price change alerts',
      'Social media tracking',
      'Share of voice analysis'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Add Competitors',
          description: 'Start by listing your main competitors. You can add their websites, social media, and basic information.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Compare Features',
          description: 'Use our comparison matrix to analyze competitor products, pricing, and marketing strategies.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Strategic Insights',
          description: 'Get actionable insights about market gaps, competitor weaknesses, and opportunities for differentiation.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'market-sizing',
    name: 'Market Sizing Calculator',
    category: 'planning',
    description: 'Calculate total addressable market (TAM, SAM, SOM)',
    longDescription: `Know exactly how big your opportunity is. Our market sizing calculator helps you estimate total addressable market, serviceable available market, and serviceable obtainable market.

    **Key Benefits:**
    - Attract investors with market data
    - Set realistic growth targets
    - Prioritize market segments
    - Make informed expansion decisions`,
    icon: 'Globe',
    color: 'green',
    popular: true,
    featured: false,
    version: '1.3.0',
    author: 'BizCraft Research Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-05',
    size: '1.2 MB',
    rating: 4.5,
    users: 3210,
    downloads: 9876,
    price: 'Free',
    tags: ['market', 'tam', 'sam', 'som', 'analysis'],
    features: [
      'TAM (Total Addressable Market)',
      'SAM (Serviceable Available Market)',
      'SOM (Serviceable Obtainable Market)',
      'Top-down market sizing',
      'Bottom-up market sizing',
      'Growth projections',
      'Market share estimation',
      'Export market reports'
    ],
    requirements: [
      'Industry information',
      'Target customer definition',
      'Pricing information',
      'Market research data'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '8 min',
      steps: [
        'Define your market',
        'Enter market size data',
        'Set your target segments',
        'Calculate TAM/SAM/SOM',
        'Generate market report'
      ]
    },
    whatsNew: [
      'Industry data integration',
      'Growth rate projections',
      'Interactive market maps',
      'Investor-ready reports'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Define Your Market',
          description: 'Start by defining your market - geography, customer segments, and product categories.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Calculate TAM',
          description: 'Use top-down (industry reports) or bottom-up (customer count × price) methods to calculate total market size.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Refine to SAM/SOM',
          description: 'Narrow down to your serviceable market and realistic obtainable share based on your capabilities.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'pricing-strategy',
    name: 'Pricing Strategy Tool',
    category: 'planning',
    description: 'Find the optimal price for your products',
    longDescription: `Stop guessing at prices. Our pricing strategy tool helps you find the sweet spot that maximizes profit while remaining competitive.

    **Key Benefits:**
    - Maximize profitability
    - Stay competitive
    - Understand price elasticity
    - Test pricing scenarios`,
    icon: 'Tag',
    color: 'orange',
    popular: true,
    featured: true,
    version: '1.7.0',
    author: 'BizCraft Strategy Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-12',
    size: '1.5 MB',
    rating: 4.7,
    users: 6543,
    downloads: 18765,
    price: 'Free',
    tags: ['pricing', 'strategy', 'profit', 'optimization'],
    features: [
      'Cost-plus pricing',
      'Value-based pricing',
      'Competitor-based pricing',
      'Dynamic pricing calculator',
      'Price elasticity analysis',
      'Profit optimization',
      'Scenario testing',
      'Price recommendations'
    ],
    requirements: [
      'Product costs',
      'Competitor prices',
      'Target margin',
      'Customer value perception'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '5 min',
      steps: [
        'Enter product costs',
        'Add competitor prices',
        'Select pricing strategy',
        'Review recommendations',
        'Test price scenarios'
      ]
    },
    whatsNew: [
      'Dynamic pricing suggestions',
      'Elasticity calculator',
      'Bulk product pricing',
      'Profit impact analysis'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Cost Analysis',
          description: 'Enter all costs associated with your product - materials, labor, overhead, and desired profit margin.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Competitor Research',
          description: 'Add competitor pricing information. The tool will analyze market positioning and pricing strategies.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Optimize Price',
          description: 'Test different price points and see the impact on profit, market share, and competitiveness.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },

  // OPERATIONS TOOLS (4 tools)
  {
    id: 'inventory-optimizer',
    name: 'Inventory Optimizer',
    category: 'operations',
    description: 'Optimize stock levels and reduce carrying costs',
    longDescription: `Never have too much or too little inventory again. Our inventory optimizer helps you find the perfect balance between stockouts and overstock.

    **Key Benefits:**
    - Reduce carrying costs by 20-30%
    - Prevent stockouts
    - Optimize reorder points
    - Improve cash flow`,
    icon: 'Package',
    color: 'blue',
    popular: true,
    featured: true,
    version: '2.2.0',
    author: 'BizCraft Operations Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-14',
    size: '2.1 MB',
    rating: 4.8,
    users: 9876,
    downloads: 27654,
    price: 'Free',
    tags: ['inventory', 'stock', 'optimization', 'operations'],
    features: [
      'EOQ (Economic Order Quantity)',
      'Reorder point calculation',
      'Safety stock optimization',
      'ABC analysis',
      'Inventory turnover ratio',
      'Carrying cost calculator',
      'Stockout risk assessment',
      'Reorder recommendations'
    ],
    requirements: [
      'Product demand data',
      'Lead times',
      'Ordering costs',
      'Holding costs'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1566576912329-d58f64c447e4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553413077-190dd305871a?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '10 min',
      steps: [
        'Add your products',
        'Enter demand history',
        'Input supplier lead times',
        'Set costs',
        'Get optimization recommendations'
      ]
    },
    whatsNew: [
      'AI-powered demand forecasting',
      'Multi-warehouse optimization',
      'Seasonal inventory planning',
      'Supplier performance tracking'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Product Setup',
          description: 'Add your products with current stock levels, costs, and historical sales data.',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop'
        },
        {
          title: 'Supplier Information',
          description: 'Enter lead times, minimum order quantities, and costs for each supplier.',
          image: 'https://images.unsplash.com/photo-1566576912329-d58f64c447e4?w=400&h=300&fit=crop'
        },
        {
          title: 'Optimize Inventory',
          description: 'Get recommendations for optimal reorder points, quantities, and safety stock levels.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871a?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'supplier-scorecard',
    name: 'Supplier Scorecard',
    category: 'operations',
    description: 'Evaluate and compare supplier performance',
    longDescription: `Make data-driven supplier decisions with comprehensive supplier scorecards. Track quality, delivery, pricing, and more.

    **Key Benefits:**
    - Identify best-performing suppliers
    - Negotiate better terms
    - Reduce supply chain risk
    - Improve supplier relationships`,
    icon: 'Building2',
    color: 'purple',
    popular: true,
    featured: true,
    version: '1.9.0',
    author: 'BizCraft Operations Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-11',
    size: '1.8 MB',
    rating: 4.7,
    users: 5432,
    downloads: 16543,
    price: 'Free',
    tags: ['supplier', 'scorecard', 'procurement', 'operations'],
    features: [
      'Quality performance tracking',
      'On-time delivery metrics',
      'Pricing competitiveness',
      'Communication rating',
      'Responsiveness score',
      'Custom scorecard templates',
      'Supplier comparison',
      'Performance trends'
    ],
    requirements: [
      'Supplier list',
      'Order history',
      'Quality data',
      'Delivery records'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '8 min',
      steps: [
        'Add suppliers to track',
        'Set evaluation criteria',
        'Enter performance data',
        'Generate scorecards',
        'Compare suppliers'
      ]
    },
    whatsNew: [
      'Automated data collection',
      'Supplier benchmarking',
      'Risk scoring',
      'Improvement recommendations'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Supplier Setup',
          description: 'Add all your suppliers and basic information like contact details, categories, and contracts.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Define Metrics',
          description: 'Choose which metrics matter most - quality, delivery, price, communication, etc. Weight them by importance.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Track Performance',
          description: 'Regularly update supplier performance. The tool automatically calculates scores and shows trends.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'lead-time-calculator',
    name: 'Lead Time Calculator',
    category: 'operations',
    description: 'Calculate and optimize order-to-delivery times',
    longDescription: `Understand and improve your order fulfillment process. Track lead times from order placement to delivery and identify bottlenecks.

    **Key Benefits:**
    - Identify process bottlenecks
    - Improve customer satisfaction
    - Optimize inventory planning
    - Set accurate delivery promises`,
    icon: 'Clock',
    color: 'orange',
    popular: true,
    featured: false,
    version: '1.3.0',
    author: 'BizCraft Operations Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-07',
    size: '1.2 MB',
    rating: 4.5,
    users: 3210,
    downloads: 9876,
    price: 'Free',
    tags: ['lead time', 'operations', 'fulfillment', 'logistics'],
    features: [
      'Order processing time',
      'Manufacturing lead time',
      'Shipping time tracking',
      'Supplier lead time',
      'Bottleneck identification',
      'Lead time trends',
      'Predictive lead times',
      'Improvement recommendations'
    ],
    requirements: [
      'Order timestamps',
      'Process steps',
      'Supplier information'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '5 min',
      steps: [
        'Define process stages',
        'Enter time data',
        'Analyze bottlenecks',
        'Get improvement suggestions',
        'Track progress'
      ]
    },
    whatsNew: [
      'Automated data collection',
      'Bottleneck alerts',
      'Industry benchmarks',
      'Optimization recommendations'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Map Your Process',
          description: 'Define each step in your order-to-delivery process - from order receipt to final delivery.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Enter Times',
          description: 'Input actual times for each stage. The calculator shows total lead time and identifies bottlenecks.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Optimize',
          description: 'Get recommendations for reducing lead times in each stage and track improvements over time.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'quality-control',
    name: 'Quality Control Tracker',
    category: 'operations',
    description: 'Track and improve product quality',
    longDescription: `Never compromise on quality. Track defects, monitor trends, and continuously improve your product quality with our comprehensive quality control tool.

    **Key Benefits:**
    - Reduce defect rates
    - Improve customer satisfaction
    - Identify root causes
    - Track improvement over time`,
    icon: 'CheckCircle',
    color: 'green',
    popular: true,
    featured: false,
    version: '1.5.0',
    author: 'BizCraft Operations Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-06',
    size: '1.4 MB',
    rating: 4.6,
    users: 4321,
    downloads: 12345,
    price: 'Free',
    tags: ['quality', 'control', 'defects', 'operations'],
    features: [
      'Defect tracking',
      'Quality metrics dashboard',
      'Root cause analysis',
      'Trend identification',
      'Supplier quality tracking',
      'Inspection checklists',
      'Quality scorecards',
      'Improvement tracking'
    ],
    requirements: [
      'Product specifications',
      'Inspection data',
      'Defect records'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '7 min',
      steps: [
        'Set quality parameters',
        'Create inspection checklists',
        'Record inspection results',
        'Track defects',
        'Analyze trends'
      ]
    },
    whatsNew: [
      'Automated defect tracking',
      'Root cause analysis AI',
      'Supplier quality integration',
      'Improvement project tracking'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Setup Quality Parameters',
          description: 'Define what good quality means for your products - specifications, tolerances, and acceptance criteria.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Track Defects',
          description: 'Record any defects found during inspection. Categorize by type, severity, and cause.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Analyze and Improve',
          description: 'View quality trends, identify recurring issues, and track the impact of improvement initiatives.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },

  // HR TOOLS (4 tools)
  {
    id: 'employee-cost',
    name: 'Employee Cost Calculator',
    category: 'hr',
    description: 'Calculate true cost of employees',
    longDescription: `Know the real cost of your team. Our employee cost calculator factors in salary, benefits, taxes, and overhead to give you the true picture.

    **Key Benefits:**
    - Budget accurately for hiring
    - Understand fully loaded costs
    - Compare full-time vs. contract
    - Make informed hiring decisions`,
    icon: 'Users',
    color: 'blue',
    popular: true,
    featured: true,
    version: '1.6.0',
    author: 'BizCraft HR Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-13',
    size: '1.3 MB',
    rating: 4.7,
    users: 6543,
    downloads: 18765,
    price: 'Free',
    tags: ['hr', 'employee', 'cost', 'hiring'],
    features: [
      'Base salary calculation',
      'Benefits cost estimation',
      'Payroll tax calculator',
      'Training cost tracking',
      'Overhead allocation',
      'Fully loaded cost',
      'Contractor comparison',
      'Hiring budget planner'
    ],
    requirements: [
      'Salary information',
      'Benefits details',
      'Tax rates',
      'Overhead costs'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '4 min',
      steps: [
        'Enter salary details',
        'Add benefits information',
        'Input tax rates',
        'Include overhead',
        'Get total cost'
      ]
    },
    whatsNew: [
      'Multi-country tax support',
      'Benefits comparison',
      'Cost projection tool',
      'Export to payroll systems'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Salary Input',
          description: 'Enter base salary and any bonuses or commissions for the position.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Benefits & Taxes',
          description: 'Add health insurance, retirement contributions, and applicable payroll taxes.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Review Total Cost',
          description: 'See the fully loaded cost of the employee and compare different hiring scenarios.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'productivity-tracker',
    name: 'Productivity Tracker',
    category: 'hr',
    description: 'Track team productivity and performance',
    longDescription: `Measure and improve team productivity with comprehensive tracking and analytics. Set goals, track progress, and celebrate achievements.

    **Key Benefits:**
    - Identify top performers
    - Set realistic goals
    - Improve team output
    - Data-driven performance reviews`,
    icon: 'TrendingUp',
    color: 'purple',
    popular: true,
    featured: false,
    version: '1.4.0',
    author: 'BizCraft HR Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-10',
    size: '1.6 MB',
    rating: 4.5,
    users: 4321,
    downloads: 12345,
    price: 'Free',
    tags: ['productivity', 'hr', 'performance', 'tracking'],
    features: [
      'Task completion tracking',
      'Time tracking',
      'Goal setting',
      'Performance metrics',
      'Team dashboards',
      'Individual reports',
      'Productivity trends',
      'Improvement recommendations'
    ],
    requirements: [
      'Team member list',
      'Task/project data',
      'Time tracking data'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: false,
      time: '6 min',
      steps: [
        'Add team members',
        'Define productivity metrics',
        'Set goals',
        'Track activities',
        'Review performance'
      ]
    },
    whatsNew: [
      'AI productivity insights',
      'Team benchmarking',
      'Goal tracking dashboard',
      'Automated reports'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Setup Team',
          description: 'Add team members and define their roles, responsibilities, and key performance indicators.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Track Activities',
          description: 'Log tasks, projects, and time spent. The tool automatically calculates productivity metrics.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Analyze Performance',
          description: 'View individual and team productivity trends, identify areas for improvement, and track progress.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'shift-scheduler',
    name: 'Shift Scheduler',
    category: 'hr',
    description: 'Create and manage employee schedules',
    longDescription: `Never struggle with scheduling again. Create optimal shift schedules that balance business needs with employee preferences.

    **Key Benefits:**
    - Reduce scheduling time by 80%
    - Avoid overtime costs
    - Improve employee satisfaction
    - Ensure adequate coverage`,
    icon: 'Calendar',
    color: 'orange',
    popular: true,
    featured: true,
    version: '1.8.0',
    author: 'BizCraft HR Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-09',
    size: '1.9 MB',
    rating: 4.6,
    users: 5432,
    downloads: 16543,
    price: 'Free',
    tags: ['schedule', 'shifts', 'hr', 'planning'],
    features: [
      'Shift creation',
      'Employee availability',
      'Schedule optimization',
      'Overtime tracking',
      'Shift swapping',
      'Calendar integration',
      'Notifications',
      'Schedule reports'
    ],
    requirements: [
      'Employee list',
      'Shift requirements',
      'Employee availability'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '5 min',
      steps: [
        'Add employees',
        'Set shift requirements',
        'Input availability',
        'Generate schedule',
        'Publish and notify'
      ]
    },
    whatsNew: [
      'Auto-scheduling AI',
      'Shift swap requests',
      'Mobile app integration',
      'Payroll integration'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Employee Setup',
          description: 'Add employees and their availability preferences. Include skills and shift preferences.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit-crop'
        },
        {
          title: 'Define Requirements',
          description: 'Set how many employees you need for each shift and any special skill requirements.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Generate Schedule',
          description: 'Let the tool create an optimized schedule, then review, adjust, and publish to your team.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  {
    id: 'leave-tracker',
    name: 'Leave Tracker',
    category: 'hr',
    description: 'Track employee leave and time off',
    longDescription: `Simplify leave management with automated tracking, accrual calculations, and easy request workflows.

    **Key Benefits:**
    - Automated leave accruals
    - Easy request approval
    - Avoid scheduling conflicts
    - Stay compliant with policies`,
    icon: 'Calendar',
    color: 'green',
    popular: true,
    featured: false,
    version: '1.4.0',
    author: 'BizCraft HR Team',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    lastUpdated: '2024-03-05',
    size: '1.3 MB',
    rating: 4.5,
    users: 3210,
    downloads: 9876,
    price: 'Free',
    tags: ['leave', 'timeoff', 'hr', 'tracking'],
    features: [
      'Leave types (vacation, sick, etc.)',
      'Accrual tracking',
      'Request workflow',
      'Calendar view',
      'Balance alerts',
      'Policy enforcement',
      'Leave reports',
      'Team calendar'
    ],
    requirements: [
      'Employee list',
      'Leave policies',
      'Accrual rules'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop'
    ],
    setup: {
      easy: true,
      time: '4 min',
      steps: [
        'Set leave policies',
        'Configure accruals',
        'Add employees',
        'Process requests',
        'Track balances'
      ]
    },
    whatsNew: [
      'Mobile leave requests',
      'Calendar sync',
      'Policy automation',
      'Leave analytics'
    ],
    tutorial: {
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Policy Setup',
          description: 'Define leave types, accrual rates, and carryover rules based on your company policy.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        },
        {
          title: 'Manage Requests',
          description: 'Employees can submit requests. Managers get notifications and can approve or deny with one click.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
        },
        {
          title: 'Track Balances',
          description: 'Always know who\'s available with real-time leave balances and team calendar views.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
        }
      ]
    }
  }
];

// Categories with updated counts
export const toolCategories = [
  { id: 'all', name: 'All Tools', count: availableTools.length },
  { id: 'finance', name: 'Finance', count: availableTools.filter(t => t.category === 'finance').length },
  { id: 'planning', name: 'Business Planning', count: availableTools.filter(t => t.category === 'planning').length },
  { id: 'operations', name: 'Operations', count: availableTools.filter(t => t.category === 'operations').length },
  { id: 'hr', name: 'Human Resources', count: availableTools.filter(t => t.category === 'hr').length }
];