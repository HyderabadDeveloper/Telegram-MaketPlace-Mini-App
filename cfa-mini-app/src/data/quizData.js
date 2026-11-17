export const CFA_QUIZ_QUESTIONS = [
  // --- ETHICS & PROFESSIONAL STANDARDS (8 Questions) ---
  {
    id: 1,
    topic: "Ethics & Professional Standards",
    difficulty: "Medium",
    question: "Under Standard I(B) Independence and Objectivity, which of the following actions regarding gifts from clients is MOST accurate?",
    options: [
      "A charterholder may accept gifts from clients if disclosed to their employer, provided the gift does not compromise independence.",
      "Gifts from clients are strictly prohibited under all circumstances regardless of value.",
      "Gifts from issuers may be accepted without employer disclosure if valued under $500."
    ],
    correctIndex: 0,
    explanation: "Standard I(B) permits accepting gifts from clients because client relationships differ from issuer relationships. However, members must disclose client gifts to their employer prior to acceptance if possible, or promptly after."
  },
  {
    id: 2,
    topic: "Ethics & Professional Standards",
    difficulty: "Hard",
    question: "An analyst discovers material nonpublic information (MNPI) regarding a pending acquisition during a conversation with an executive. Under Standard II(A), what should the analyst do?",
    options: [
      "Trade on the information immediately before public release.",
      "Refrain from trading or causing others to trade on the information until it is publicly disseminated.",
      "Publish a research report citing the rumor as an unconfirmed source."
    ],
    correctIndex: 1,
    explanation: "Standard II(A) Material Nonpublic Information strictly prohibits trading or inducing others to trade on material nonpublic information until it is officially disclosed to the market."
  },
  {
    id: 3,
    topic: "Ethics & Professional Standards",
    difficulty: "Medium",
    question: "According to the GIPS Standards, which of the following is required for firm compliance?",
    options: [
      "Firms must include all discretionary, fee-paying accounts in at least one composite.",
      "Firms must include non-discretionary accounts in composites to boost performance.",
      "Firms may choose to present gross-of-fees performance without declaring fee structures."
    ],
    correctIndex: 0,
    explanation: "GIPS requires that all actual, discretionary, fee-paying portfolios must be included in at least one composite to prevent cherry-picking top performance."
  },
  {
    id: 4,
    topic: "Ethics & Professional Standards",
    difficulty: "Easy",
    question: "Under Standard VI(B) Priority of Transactions, whose transactions must take precedence?",
    options: [
      "Client and employer transactions take priority over personal transactions.",
      "Personal transactions take priority over client transactions.",
      "Brokerage house proprietary trades take priority over client accounts."
    ],
    correctIndex: 0,
    explanation: "Standard VI(B) dictates that investment transactions for clients and employers must have priority over investment transactions in which a Member or Candidate is the beneficial owner."
  },
  {
    id: 5,
    topic: "Ethics & Professional Standards",
    difficulty: "Medium",
    question: "When referencing candidate status in the CFA Program, which statement is PERMISSIBLE under Standard VII(B)?",
    options: [
      "I passed Level I on my first attempt, demonstrating superior analytical abilities.",
      "I am a CFA Level II candidate having passed the Level I exam.",
      "I expect to receive my CFA charter next month because I passed all exams."
    ],
    correctIndex: 1,
    explanation: "Candidates may state that they are a candidate in the CFA Program and passed Level I. However, claiming superior ability or guaranteeing charter issuance violates Standard VII(B)."
  },
  {
    id: 6,
    topic: "Ethics & Professional Standards",
    difficulty: "Hard",
    question: "An analyst receives soft dollar research credits from a broker. Under Standard III(A) Loyalty, Prudence, and Care, soft dollars must be used to benefit:",
    options: [
      "The firm's executive management team.",
      "The firm's clients.",
      "The individual analyst who directed the trades."
    ],
    correctIndex: 1,
    explanation: "Soft dollar brokerage credits belong to the clients and must be used to purchase research and services that directly benefit the clients."
  },
  {
    id: 7,
    topic: "Ethics & Professional Standards",
    difficulty: "Medium",
    question: "Standard III(C) Suitability requires members to do which of the following before making an investment recommendation?",
    options: [
      "Guarantee a minimum annual return on equity.",
      "Make a reasonable inquiry into the client's financial situation, risk tolerance, and investment objectives.",
      "Always recommend high-yield debt to maximize current income."
    ],
    correctIndex: 1,
    explanation: "Suitability requires determining the client's financial constraints, objectives, and risk tolerance (creating an IPS) before making investment recommendations."
  },
  {
    id: 8,
    topic: "Ethics & Professional Standards",
    difficulty: "Easy",
    question: "If local law conflicts with the CFA Institute Code and Standards, which rule must a member follow?",
    options: [
      "Always follow local law regardless of strictness.",
      "Comply with the more strict law, rule, or regulation.",
      "Follow the CFA Standards only if local law is silent."
    ],
    correctIndex: 1,
    explanation: "Standard I(A) Knowledge of the Law specifies that members must comply with the more strict of local law, regulation, or the CFA Code and Standards."
  },

  // --- QUANTITATIVE METHODS (8 Questions) ---
  {
    id: 9,
    topic: "Quantitative Methods",
    difficulty: "Hard",
    question: "An investor deposits $10,000 into an account paying a nominal 8.0% annual rate compounded quarterly. What is the Effective Annual Rate (EAR)?",
    options: [
      "8.00%",
      "8.24%",
      "8.33%"
    ],
    correctIndex: 1,
    explanation: "EAR = (1 + r/m)^m - 1. Here r = 0.08, m = 4. EAR = (1 + 0.02)^4 - 1 = 1.082432 - 1 = 8.24%."
  },
  {
    id: 10,
    topic: "Quantitative Methods",
    difficulty: "Medium",
    question: "What is the Net Present Value (NPV) of a project requiring an initial outlay of $500 and generating cash flows of $300 at Year 1 and $350 at Year 2 at a discount rate of 10%?",
    options: [
      "-$37.60",
      "+$61.98",
      "+$150.00"
    ],
    correctIndex: 1,
    explanation: "NPV = -500 + 300 / 1.10 + 350 / (1.10)^2 = -500 + 272.73 + 289.26 = +$61.98."
  },
  {
    id: 11,
    topic: "Quantitative Methods",
    difficulty: "Medium",
    question: "A distribution with positive skewness is characterized by:",
    options: [
      "A long tail to the right and Mean > Median > Mode.",
      "A long tail to the left and Mode > Median > Mean.",
      "A symmetrical bell curve where Mean = Median = Mode."
    ],
    correctIndex: 0,
    explanation: "Right-skewed (positively skewed) distributions have extreme values in the right tail, pulling the Mean to the right of the Median and Mode (Mean > Median > Mode)."
  },
  {
    id: 12,
    topic: "Quantitative Methods",
    difficulty: "Hard",
    question: "If two events A and B are mutually exclusive, what is the probability that both A and B occur simultaneously, P(A ∩ B)?",
    options: [
      "P(A) × P(B)",
      "0.00",
      "1.00"
    ],
    correctIndex: 1,
    explanation: "By definition, mutually exclusive events cannot happen at the same time, so P(A ∩ B) = 0."
  },
  {
    id: 13,
    topic: "Quantitative Methods",
    difficulty: "Medium",
    question: "According to the Central Limit Theorem, the sampling distribution of the sample mean approaches what distribution as sample size increases?",
    options: [
      "Uniform distribution",
      "Normal distribution with variance σ²/n",
      "Binomial distribution"
    ],
    correctIndex: 1,
    explanation: "The Central Limit Theorem states that for large sample sizes (n ≥ 30), the sample mean is approximately normally distributed with mean μ and variance σ²/n."
  },
  {
    id: 14,
    topic: "Quantitative Methods",
    difficulty: "Easy",
    question: "Which Type of error occurs when a researcher rejects a true null hypothesis?",
    options: [
      "Type I Error",
      "Type II Error",
      "Standard Error"
    ],
    correctIndex: 0,
    explanation: "Type I Error is the rejection of a null hypothesis when it is actually true (false positive). Significance level α is the probability of a Type I error."
  },
  {
    id: 15,
    topic: "Quantitative Methods",
    difficulty: "Hard",
    question: "For a continuous uniform random variable defined on the interval [2, 10], what is the probability P(X > 6)?",
    options: [
      "0.25",
      "0.50",
      "0.75"
    ],
    correctIndex: 1,
    explanation: "The height of the uniform distribution = 1 / (10 - 2) = 1/8 = 0.125. P(X > 6) = (10 - 6) * 0.125 = 4 * 0.125 = 0.50."
  },
  {
    id: 16,
    topic: "Quantitative Methods",
    difficulty: "Medium",
    question: "What measure of dispersion calculates the average squared deviation from the mean?",
    options: [
      "Variance",
      "Standard Deviation",
      "Interquartile Range"
    ],
    correctIndex: 0,
    explanation: "Variance measures dispersion by averaging the squared differences between observed values and the mean."
  },

  // --- FINANCIAL STATEMENT ANALYSIS (8 Questions) ---
  {
    id: 17,
    topic: "Financial Statement Analysis",
    difficulty: "Medium",
    question: "Under IFRS, interest paid by a reporting firm can be classified under which cash flow activities?",
    options: [
      "Operating activities only.",
      "Financing activities only.",
      "Either Operating or Financing activities."
    ],
    correctIndex: 2,
    explanation: "Under IFRS, interest paid can be classified as either Operating or Financing cash flows, provided it is treated consistently. Under US GAAP, interest paid is strictly Operating."
  },
  {
    id: 18,
    topic: "Financial Statement Analysis",
    difficulty: "Hard",
    question: "During periods of rising inventory costs, which inventory valuation method yields the HIGHEST Net Income under US GAAP?",
    options: [
      "FIFO (First-In, First-Out)",
      "LIFO (Last-In, First-Out)",
      "Weighted Average Cost"
    ],
    correctIndex: 0,
    explanation: "In inflationary conditions, FIFO assigns older (cheaper) costs to COGS, resulting in lower COGS and higher Net Income compared to LIFO."
  },
  {
    id: 19,
    topic: "Financial Statement Analysis",
    difficulty: "Medium",
    question: "Which financial ratio measures a company's ability to cover short-term liabilities using only its most liquid assets?",
    options: [
      "Current Ratio",
      "Quick (Acid-Test) Ratio",
      "Debt-to-Equity Ratio"
    ],
    correctIndex: 1,
    explanation: "Quick Ratio = (Cash + Short-term Investments + Receivables) / Current Liabilities. It excludes less liquid inventory."
  },
  {
    id: 20,
    topic: "Financial Statement Analysis",
    difficulty: "Hard",
    question: "A company capitalizes an expenditure instead of expensing it immediately. In the first year, what is the impact on operating cash flow (CFO) and net income (NI)?",
    options: [
      "CFO is higher and NI is higher in Year 1.",
      "CFO is lower and NI is lower in Year 1.",
      "CFO is unchanged and NI is higher in Year 1."
    ],
    correctIndex: 0,
    explanation: "Capitalizing classifies the cash outflow as CFI instead of CFO (boosting CFO). Expensing is spread via depreciation over time, keeping Year 1 Net Income higher."
  },
  {
    id: 21,
    topic: "Financial Statement Analysis",
    difficulty: "Medium",
    question: "Deferred Tax Liabilities (DTLs) arise when:",
    options: [
      "Accounting income is greater than taxable income due to temporary differences.",
      "Taxable income is greater than accounting income due to permanent differences.",
      "Taxes payable exceed income tax expense on the balance sheet."
    ],
    correctIndex: 0,
    explanation: "DTLs occur when financial accounting income exceeds taxable income in the current period due to temporary differences (e.g., accelerated tax depreciation)."
  },
  {
    id: 22,
    topic: "Financial Statement Analysis",
    difficulty: "Easy",
    question: "On the balance sheet, owner's equity is calculated as:",
    options: [
      "Total Assets - Total Liabilities",
      "Total Revenue - Total Expenses",
      "Gross Profit - Operating Expenses"
    ],
    correctIndex: 0,
    explanation: "The fundamental accounting equation is Assets = Liabilities + Owner's Equity, which rearranges to Owner's Equity = Assets - Liabilities."
  },
  {
    id: 23,
    topic: "Financial Statement Analysis",
    difficulty: "Hard",
    question: "Under US GAAP, impairment losses on long-lived tangible assets held for use:",
    options: [
      "Can be reversed in subsequent periods if fair value recovers.",
      "Cannot be reversed in subsequent periods once recognized.",
      "Are recognized directly in Other Comprehensive Income (OCI)."
    ],
    correctIndex: 1,
    explanation: "US GAAP prohibits the reversal of impairment losses on long-lived assets held for use. (IFRS allows reversals under specific conditions)."
  },
  {
    id: 24,
    topic: "Financial Statement Analysis",
    difficulty: "Medium",
    question: "Which cash flow method adjusts Net Income for non-cash items and working capital changes?",
    options: [
      "Indirect Method",
      "Direct Method",
      "Revaluation Method"
    ],
    correctIndex: 0,
    explanation: "The indirect method starts with Net Income and adds/subtracts non-cash items (depreciation, gains/losses) and working capital balance changes to calculate CFO."
  },

  // --- EQUITY INVESTMENTS (8 Questions) ---
  {
    id: 25,
    topic: "Equity Investments",
    difficulty: "Hard",
    question: "In a 5-way DuPont model, Return on Equity (ROE) is decomposed into:",
    options: [
      "Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Financial Leverage",
      "Net Profit Margin × Asset Turnover × Debt-to-Equity Ratio",
      "Operating Margin × Quick Ratio × Inventory Turnover × Leverage"
    ],
    correctIndex: 0,
    explanation: "ROE = (NI / EBT) × (EBT / EBIT) × (EBIT / Revenue) × (Revenue / Total Assets) × (Total Assets / Equity)."
  },
  {
    id: 26,
    topic: "Equity Investments",
    difficulty: "Medium",
    question: "Under the Gordon Growth Dividend Discount Model (DDM), if the required rate of return (r) equals 10%, next year's dividend (D1) is $2.00, and constant dividend growth (g) is 5%, what is the intrinsic stock value?",
    options: [
      "$20.00",
      "$40.00",
      "$50.00"
    ],
    correctIndex: 1,
    explanation: "Formula: P0 = D1 / (r - g) = 2.00 / (0.10 - 0.05) = 2.00 / 0.05 = $40.00."
  },
  {
    id: 27,
    topic: "Equity Investments",
    difficulty: "Easy",
    question: "Which form of market efficiency asserts that stock prices fully reflect all past market trading data, including price and volume?",
    options: [
      "Weak-form Efficiency",
      "Semi-strong Form Efficiency",
      "Strong-form Efficiency"
    ],
    correctIndex: 0,
    explanation: "Weak-form EMH states that prices reflect all historical market data. Technical analysis cannot consistently generate abnormal returns under weak-form efficiency."
  },
  {
    id: 28,
    topic: "Equity Investments",
    difficulty: "Medium",
    question: "An order placed with a broker to buy a stock at or below a specified price is known as a:",
    options: [
      "Market order",
      "Limit buy order",
      "Stop loss buy order"
    ],
    correctIndex: 1,
    explanation: "A limit buy order specifies a maximum acceptable purchase price. The execution occurs only at or below the limit price."
  },
  {
    id: 29,
    topic: "Equity Investments",
    difficulty: "Hard",
    question: "Which equity valuation metric compares Enterprise Value (EV) to earnings before interest, tax, depreciation, and amortization?",
    options: [
      "P/E ratio",
      "EV/EBITDA multiple",
      "P/B ratio"
    ],
    correctIndex: 1,
    explanation: "EV/EBITDA is a capital-structure-neutral multiple useful for comparing companies with varying leverage and capital intensity."
  },
  {
    id: 30,
    topic: "Equity Investments",
    difficulty: "Medium",
    question: "Participating preference shares entitle the shareholder to:",
    options: [
      "Standard dividends plus additional dividends if company earnings exceed specified targets.",
      "Voting rights equal to common shareholders in annual director elections.",
      "Convert preference shares into corporate bonds upon maturity."
    ],
    correctIndex: 0,
    explanation: "Participating preference shares receive their fixed preferred dividend plus a share of remaining profits alongside common stockholders when profits exceed specified thresholds."
  },
  {
    id: 31,
    topic: "Equity Investments",
    difficulty: "Medium",
    question: "In Porter's Five Forces framework, industry profitability is constrained when:",
    options: [
      "Barriers to entry are high and supplier bargaining power is low.",
      "Threat of substitute products is high and rival competition is intense.",
      "Buyer bargaining power is weak."
    ],
    correctIndex: 1,
    explanation: "High substitute threats and intense rival competition erode pricing power and compress industry margins."
  },
  {
    id: 32,
    topic: "Equity Investments",
    difficulty: "Easy",
    question: "A price-weighted equity index gives higher weight to stocks with:",
    options: [
      "Higher total market capitalization",
      "Higher per-share earnings",
      "Higher per-share price"
    ],
    correctIndex: 2,
    explanation: "In a price-weighted index (such as the Dow Jones Industrial Average), weights are determined solely by price per share regardless of total firm market value."
  },

  // --- FIXED INCOME & DERIVATIVES (8 Questions) ---
  {
    id: 33,
    topic: "Fixed Income & Derivatives",
    difficulty: "Easy",
    question: "If market yields to maturity (YTM) increase, what happens to the price of an option-free fixed-rate bond?",
    options: [
      "The price increases proportionally.",
      "The price decreases due to the inverse yield-price relationship.",
      "The price remains constant."
    ],
    correctIndex: 1,
    explanation: "Bond prices and yields share an inverse fundamental relationship. Higher required yields reduce the present value of fixed future cash flows."
  },
  {
    id: 34,
    topic: "Fixed Income & Derivatives",
    difficulty: "Hard",
    question: "A 5-year annual coupon bond with Macaulay duration of 4.5 years has a YTM of 5.0%. What is its Modified Duration?",
    options: [
      "4.29 years",
      "4.50 years",
      "4.73 years"
    ],
    correctIndex: 0,
    explanation: "Modified Duration = Macaulay Duration / (1 + YTM) = 4.5 / 1.05 = 4.2857 ≈ 4.29 years."
  },
  {
    id: 35,
    topic: "Fixed Income & Derivatives",
    difficulty: "Medium",
    question: "Which credit rating tier designates investment-grade bonds under Moody's credit rating system?",
    options: [
      "Baa3 and above",
      "Ba1 and below",
      "Caa1 and below"
    ],
    correctIndex: 0,
    explanation: "Baa3 (Moody's) and BBB- (S&P/Fitch) mark the lowest investment-grade credit ratings. Ratings below this tier are non-investment grade (high yield / junk)."
  },
  {
    id: 36,
    topic: "Fixed Income & Derivatives",
    difficulty: "Medium",
    question: "A forward contract differs from a futures contract primarily because forward contracts are:",
    options: [
      "Standardized and traded on organized exchanges with daily mark-to-market.",
      "Customized, over-the-counter (OTC) agreements with private counterparty risk.",
      "Regulated contracts requiring maintenance margin accounts."
    ],
    correctIndex: 1,
    explanation: "Forwards are customized OTC contracts negotiated privately between two parties, exposing both to counterparty credit risk. Futures are exchange-traded and standardized."
  },
  {
    id: 37,
    topic: "Fixed Income & Derivatives",
    difficulty: "Hard",
    question: "The owner of a European put option exercises their right to sell the underlying asset:",
    options: [
      "At any time up to and including the expiration date.",
      "Only on the expiration date.",
      "Only if the spot price is higher than the strike price."
    ],
    correctIndex: 1,
    explanation: "European options can only be exercised on the expiration date itself (unlike American options, which can be exercised on any business day up to expiration)."
  },
  {
    id: 38,
    topic: "Fixed Income & Derivatives",
    difficulty: "Medium",
    question: "Reinvestment risk for a fixed-rate bond is GREATEST when:",
    options: [
      "Coupons are high and holding period is long.",
      "Coupons are zero (zero-coupon bond) and held to maturity.",
      "Interest rates rise immediately after purchase."
    ],
    correctIndex: 0,
    explanation: "Reinvestment risk arises from reinvesting interim coupon payments. Higher coupon rates and longer holding horizons increase exposure to lower future interest rates."
  },
  {
    id: 39,
    topic: "Fixed Income & Derivatives",
    difficulty: "Easy",
    question: "A bond trading at a price ABOVE its par value is selling at a:",
    options: [
      "Discount",
      "Par value",
      "Premium"
    ],
    correctIndex: 2,
    explanation: "When market price > par value, the bond trades at a premium (because its coupon rate is higher than current market yields)."
  },
  {
    id: 40,
    topic: "Fixed Income & Derivatives",
    difficulty: "Hard",
    question: "In a plain vanilla interest rate swap, the fixed-rate payer agrees to:",
    options: [
      "Pay a fixed interest rate and receive a floating reference rate (e.g. SOFR).",
      "Pay a floating reference rate and receive a fixed interest rate.",
      "Exchange principal balances in two foreign currencies at initiation."
    ],
    correctIndex: 0,
    explanation: "The fixed-rate payer in a swap pays periodic fixed-rate payments based on a notional principal and receives periodic floating-rate cash flows."
  }
];

export const TOPICS_LIST = [
  { id: "all", name: "All Topics (Mixed Mock)", icon: "Layers", desc: "Full exam mixture of all 5 topics" },
  { id: "Ethics & Professional Standards", name: "Ethics & Professional Standards", icon: "ShieldCheck", desc: "Code of Ethics, Standards I-VII, GIPS" },
  { id: "Quantitative Methods", name: "Quantitative Methods", icon: "Calculator", desc: "TVM, Statistics, Probability, Hypothesis Testing" },
  { id: "Financial Statement Analysis", name: "Financial Statement Analysis", icon: "FileText", desc: "Income Statements, Balance Sheets, Cash Flows" },
  { id: "Equity Investments", name: "Equity Investments", icon: "TrendingUp", desc: "Valuation, DDM, DuPont, Market Structure" },
  { id: "Fixed Income & Derivatives", name: "Fixed Income & Derivatives", icon: "PieChart", desc: "Bond Pricing, Duration, Swaps & Options" }
];

export function getFilteredQuestions(topicId, count) {
  let list = CFA_QUIZ_QUESTIONS;
  if (topicId && topicId !== "all") {
    list = CFA_QUIZ_QUESTIONS.filter(q => q.topic === topicId);
  }
  
  // Shuffle or take first count questions
  const sliced = [...list].slice(0, count);
  return sliced;
}
