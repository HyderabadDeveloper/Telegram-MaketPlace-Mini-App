export const CFA_QUIZ_QUESTIONS = [
  {
    id: 1,
    topic: "Ethics & Professional Standards",
    difficulty: "Medium",
    question: "Under the CFA Institute Standards of Professional Conduct, which of the following actions by a charterholder regarding corporate gifts is MOST accurate?",
    options: [
      "A charterholder may accept gifts from clients if disclose to their employer, provided the gift does not compromise independence.",
      "Gifts from clients are strictly prohibited under all circumstances regardless of value.",
      "Gifts from issuers may be accepted without employer disclosure as long as the value is under $500."
    ],
    correctIndex: 0,
    explanation: "Standard I(B) Independence and Objectivity permits accepting gifts from clients because client relationships differ from issuer relationships. However, members must disclose client gifts to their employer prior to acceptance if possible, or promptly after."
  },
  {
    id: 2,
    topic: "Quantitative Methods",
    difficulty: "Hard",
    question: "An investor deposits $10,000 into a bank account offering a nominal annual rate of 8.0% compounded quarterly. What is the Effective Annual Rate (EAR)?",
    options: [
      "8.00%",
      "8.24%",
      "8.33%"
    ],
    correctIndex: 1,
    explanation: "Formula: EAR = (1 + r/m)^m - 1. Here r = 0.08 and m = 4. EAR = (1 + 0.08/4)^4 - 1 = (1.02)^4 - 1 = 1.082432 - 1 = 8.24%."
  },
  {
    id: 3,
    topic: "Financial Statement Analysis",
    difficulty: "Medium",
    question: "Under IFRS, interest paid by a company during the fiscal year can be classified as which of the following cash flow activities?",
    options: [
      "Operating activities only.",
      "Financing activities only.",
      "Either Operating activities or Financing activities."
    ],
    correctIndex: 2,
    explanation: "Under IFRS, interest paid can be classified as either Operating or Financing activities (flexibility allowed provided it is consistently applied). Under US GAAP, interest paid must be classified as an Operating activity."
  },
  {
    id: 4,
    topic: "Equity Investments",
    difficulty: "Hard",
    question: "According to the DuPont 5-way analysis, Return on Equity (ROE) is decomposed into which combination of financial ratios?",
    options: [
      "Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Financial Leverage",
      "Net Profit Margin × Asset Turnover × Debt-to-Equity Ratio",
      "Operating Margin × Quick Ratio × Inventory Turnover × Leverage × Return on Assets"
    ],
    correctIndex: 0,
    explanation: "The 5-way DuPont model decomposes ROE = (NI / EBT) × (EBT / EBIT) × (EBIT / Revenue) × (Revenue / Total Assets) × (Total Assets / Equity), representing Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Financial Leverage."
  },
  {
    id: 5,
    topic: "Fixed Income",
    difficulty: "Easy",
    question: "If the market yield to maturity (YTM) of an option-free fixed-coupon bond increases, what happens to the bond's market price?",
    options: [
      "The price increases proportionally with the yield change.",
      "The price decreases due to the inverse relationship between yields and bond prices.",
      "The price remains unchanged unless the credit rating is revised."
    ],
    correctIndex: 1,
    explanation: "Bond prices and market yields have an inverse fundamental relationship. When interest rates or required yields increase, the present value of future cash flows drops, causing the bond price to fall."
  }
];

export const TOPIC_MASTERY_DATA = [
  { name: "Ethical & Professional Standards", count: "12/15 Solved", mastery: "85%", icon: "ShieldCheck" },
  { name: "Quantitative Methods", count: "8/10 Solved", mastery: "80%", icon: "Calculator" },
  { name: "Financial Statement Analysis", count: "10/14 Solved", mastery: "71%", icon: "FileText" },
  { name: "Equity Investments", count: "6/8 Solved", mastery: "75%", icon: "TrendingUp" },
  { name: "Fixed Income", count: "5/8 Solved", mastery: "68%", icon: "PieChart" }
];
