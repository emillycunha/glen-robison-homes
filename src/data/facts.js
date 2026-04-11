// New Braunfels relocation facts, verified via Perplexity 2026-04-11

export const facts = {
  population: {
    current: '128,874',
    year: 2026,
    growthSince2020: '40.56%',
    metro: '2.813 million (San Antonio–New Braunfels metro, 2025)',
    sources: [
      { label: 'U.S. Census', url: 'https://www.census.gov/quickfacts/fact/table/newbraunfelscitytexas/PST045224' },
      { label: 'World Population Review', url: 'https://worldpopulationreview.com/us-cities/texas/new-braunfels' },
      { label: 'FRED', url: 'https://fred.stlouisfed.org/series/SATPOP' },
    ],
  },
  housing: {
    medianRealtor: '$394,000',
    medianZillow: '$307,000',
    daysOnMarket: 108,
    sources: [
      { label: 'Realtor.com', url: 'https://www.realtor.com/local/market/texas/comal-county/new-braunfels' },
      { label: 'Zillow', url: 'https://www.zillow.com/home-values/39966/new-braunfels-tx/' },
    ],
  },
  costOfLiving: {
    index: 107,
    vsNational: '1.1x national average',
    medianIncome: '$88,257',
    sources: [
      { label: 'HomeSnacks', url: 'https://www.homesnacks.com/tx/new-braunfels-cost-of-living/' },
    ],
  },
  taxes: {
    stateIncomeTax: '0%',
    salesTax: '6.25% state + local (max 8.25%)',
    cityRate: '1.0% New Braunfels city',
    sources: [
      { label: 'AARP Texas Tax Guide', url: 'https://www.aarp.org/states/texas/state-taxes-guide/' },
      { label: 'City of New Braunfels', url: 'https://www.newbraunfels.gov/CivicAlerts.asp?AID=2216&ARC=4585' },
    ],
  },
  schools: {
    comalISD: { grade: 'A', schools: 35, source: 'https://www.niche.com/k12/d/comal-independent-school-district-tx/' },
    newBraunfelsISD: { source: 'https://www.greatschools.org/texas/new-braunfels/new-braunfels-independent-school-district/' },
  },
  employers: [
    'CHRISTUS Santa Rosa',
    'City of New Braunfels',
    'Comal County',
    'Comal ISD',
    'New Braunfels ISD',
    'New Braunfels Utilities',
    'HD Supply',
    'Hunter Industries',
    'IBEX Global',
    'Resolute Health Hospital',
  ],
  employerSources: [
    { label: 'NB Chamber', url: 'https://www.nbchamber.com/economic-development/major-employers' },
  ],
  climate: {
    annualHigh: '79°F',
    annualLow: '56°F',
    precipitation: '33.97 inches',
    precipDays: 75,
    sources: [
      { label: 'U.S. Climate Data', url: 'https://www.usclimatedata.com/climate/new-braunfels/texas/united-states/ustx0950' },
    ],
  },
  distance: {
    austinAirport: '~52 miles, ~53 minutes',
    sources: [
      { label: 'Rome2Rio', url: 'https://www.rome2rio.com/s/New-Braunfels/Austin-Airport-AUS' },
    ],
  },
  thingsToDo: [
    { name: 'Schlitterbahn Waterpark', detail: '65 acres on the Comal River, Texas\'s largest waterpark' },
    { name: 'Comal River', detail: 'Tubing, swimming, river walks' },
    { name: 'Guadalupe River', detail: 'Tubing, fishing, kayaking' },
    { name: 'Gruene Hall', detail: 'Built in 1878, Texas\'s oldest continually operating dance hall' },
    { name: 'Canyon Lake', detail: 'Boating, fishing, lakeside dining' },
    { name: 'Hill Country wineries', detail: 'Multiple vineyards within 30 miles' },
  ],
  propertyTaxRates: {
    year: '2025-26',
    comalCounty: '$0.305015 per $100',
    comalCountyLateralRoad: '$0.0360 per $100',
    cityNewBraunfels: '$0.408936 per $100',
    comalISD: '$1.0748 per $100',
    nbisd: '$1.0377 per $100',
    typicalEffective: '~1.79% (in-city)',
    homesteadExemption: '$140,000 state-mandated school district homestead (2026)',
    seniorExemption: 'Additional $60K on school taxes for 65+ (total $200K school exemption), plus local options',
    protestDeadline: 'May 15 or within 30 days of Notice of Appraised Value',
    sources: [
      { label: 'Comal County 2025 Tax Rates', url: 'https://www.comalcounty.gov/DocumentCenter/View/4073/2025-Tax-Rates-for-all-Taxing-Units-PDF' },
      { label: 'City of New Braunfels Taxes', url: 'https://www.newbraunfels.gov/2470/Taxes' },
      { label: 'Comal ISD Tax Rate', url: 'https://www.comalisd.org/apps/pages/financial_transparency/current-tax-rate' },
      { label: 'Texas Comptroller Exemptions', url: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/' },
      { label: 'Comal Appraisal District', url: 'https://comalad.org/exemptions/' },
      { label: 'Tax Estimator', url: 'https://property.co.comal.tx.us/TaxEstimator' },
    ],
  },
  schoolsDetail: {
    comalTopElementary: ['Timberwood Park', 'Bill Brown', 'Hoffmann Lane', 'Clear Spring', 'Freiheit'],
    nbisdTopElementary: ['Voss Farms', 'Carl Schurz', 'County Line', 'Klein Road', 'Walnut Springs'],
    luxuryHighSchools: 'Vintage Oaks, Copper Ridge, River Chase and Riverforest typically feed Comal ISD high schools (Canyon, Smithson Valley, Canyon Lake, or Davenport). Central New Braunfels feeds NBISD.',
    openEnrollment: 'Comal ISD offers "High Schools of Choice" by application (Hill Country College Prep, Memorial Early College). NBISD is zone-based. Texas allows inter-district transfers when approved.',
    privateOptions: 'New Braunfels Christian Academy (K-12), Sts. Peter and Paul, John Paul II Catholic High, Living Rock Academy. Tuition typically $6,265-$13,900/year.',
    lookupSources: [
      { label: 'Comal ISD Attendance Zones', url: 'https://www.comalisd.org/apps/pages/elementary-attendance-zones' },
      { label: 'Comal County GIS', url: 'https://cceo.co.comal.tx.us/arcgispor/home/item.html?id=96a493340a5f4bdf899aed8873ab271f' },
    ],
  },
  bestBuyingSeason: {
    months: 'March through May',
    note: 'Widest buyer pool, best time to find inventory before summer competition',
    sources: [
      { label: 'Sunrise Realty Group', url: 'https://sunriserealtygroup.net/blog/best-time-to-sell-in-new-braunfels' },
    ],
  },
};
