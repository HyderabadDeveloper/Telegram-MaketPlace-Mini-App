export const LEARN_MODULES = [
  {
    id: "ethics",
    title: "Ethical & Professional Standards",
    icon: "ShieldCheck",
    concepts: [
      {
        id: "c1",
        title: "Code of Ethics vs. Standards of Professional Conduct",
        summary: "The Code establishes high-level aspirational principles; the Standards govern specific professional conduct.",
        details: "Members and candidates must adhere to 6 fundamental ethical principles in the Code and 7 detailed Standards (I through VII). Compliance is mandatory for all charterholders worldwide."
      },
      {
        id: "c2",
        title: "Standard I(A): Knowledge of the Law",
        summary: "Always comply with the stricter of local law or CFA Standards.",
        details: "Members must understand applicable laws, rules, and regulations in all jurisdictions where they conduct business. In the event of a conflict, members must obey the more strict rule."
      },
      {
        id: "c3",
        title: "Standard I(B): Independence and Objectivity",
        summary: "Maintain independence from external influences, gifts, and soft dollars.",
        details: "Members must exercise reasonable care and independent professional judgment. Gifts from clients must be disclosed to employers; gifts from issuers are strictly restricted."
      },
      {
        id: "c4",
        title: "Standard II(A): Material Nonpublic Information (MNPI)",
        summary: "Trading on MNPI is strictly prohibited; Mosaic Theory is permitted.",
        details: "Material information is anything that would move stock prices. Members may combine non-material public information with non-material nonpublic information to reach an investment conclusion under the Mosaic Theory."
      },
      {
        id: "c5",
        title: "Standard III(A): Loyalty, Prudence, and Care",
        summary: "Duty owed strictly to clients above personal or employer interests.",
        details: "Members must act for the benefit of clients and place clients' interests before their employer's or their own personal interests. Fiduciary duty requires prudence and utmost care."
      },
      {
        id: "c6",
        title: "Standard III(C): Suitability",
        summary: "Develop and update an Investment Policy Statement (IPS) before investing.",
        details: "Before recommending trades or taking investment action, members must gather client objectives, risk tolerance, time horizon, tax status, and liquidity constraints in an IPS."
      },
      {
        id: "c7",
        title: "Standard IV(A): Loyalty to Employer",
        summary: "Refrain from competing against employer while employed.",
        details: "Members must not deprive their employer of the benefit of their skills, divulge confidential information, or cause harm to their employer unless permitted by law or agreement."
      },
      {
        id: "c8",
        title: "Standard VI(B): Priority of Transactions",
        summary: "Client trades > Employer trades > Personal trades.",
        details: "Investment transactions for clients and employers must take priority over transactions in which a candidate or charterholder is the beneficial owner."
      },
      {
        id: "c9",
        title: "Standard VII(B): Reference to CFA Institute",
        summary: "Accurate representation of candidate status and designation.",
        details: "Candidates may state they are enrolled in the CFA Program or passed exams, but cannot claim superior performance, guarantee charter dates, or use the CFA logo improperly."
      },
      {
        id: "c10",
        title: "GIPS Standards (Global Investment Performance Standards)",
        summary: "Ethical standards for fair representation and full disclosure of performance.",
        details: "GIPS requires firms to include all actual, discretionary, fee-paying accounts in at least one composite to prevent cherry-picking top-performing accounts."
      }
    ],
    formulas: [
      {
        id: "f1",
        title: "Composite Asset-Weighted Return",
        formula: "R_c = \\sum_{i=1}^n w_i R_i",
        variables: "w_i = Portfolio weight by asset value, R_i = Portfolio return",
        note: "Mandatory under GIPS for aggregate composite calculation."
      },
      {
        id: "f2",
        title: "Time-Weighted Rate of Return (TWRR)",
        formula: "R_{TWRR} = \\left[ \\prod_{t=1}^k (1 + R_t) \\right] - 1",
        variables: "R_t = Sub-period return between external cash flow events",
        note: "Required by GIPS because it eliminates the distorting effect of external cash inflows/outflows."
      },
      {
        id: "f3",
        title: "Gross-of-Fees Composite Performance",
        formula: "R_{gross} = R_{portfolio} + Trading\\ Expenses\\ Adjustments",
        variables: "Measures pure investment management returns prior to management fees.",
        note: "GIPS permits presenting gross or net performance with clear fee schedule disclosures."
      },
      {
        id: "f4",
        title: "Net-of-Fees Performance Return",
        formula: "R_{net} = R_{gross} - Investment\\ Management\\ Fees",
        variables: "Reflects actual client returns after deducting management fees.",
        note: "Must be accompanied by fee disclosure under GIPS principles."
      },
      {
        id: "f5",
        title: "Soft Dollar Allocation Ratio",
        formula: "Soft\\ Dollar\\ % = \\frac{\\text{Commission Allocated to Research}}{\\text{Total Brokerage Commissions Paid}}",
        variables: "Monitors allocation of client brokerage credits.",
        note: "Must directly benefit client accounts."
      },
      {
        id: "f6",
        title: "GIPS Standard Deviation (3-Year Annualized)",
        formula: "\\sigma_a = \\sqrt{12 \\times \\frac{\\sum (R_{m} - \\bar{R}_m)^2}{36 - 1}}",
        variables: "R_m = Monthly composite return, \\bar{R}_m = Mean monthly return",
        note: "Required dispersion metric presented for 36-month rolling periods."
      },
      {
        id: "f7",
        title: "Trade Allocation Priority Metric",
        formula: "Allocated\\ Shares = Total\\ Order \\times \\frac{Client\\ Account\\ Size}{\\sum Client\\ Account\\ Sizes}",
        variables: "Pro-rata allocation formula for block trades.",
        note: "Ensures fair trade execution across all client accounts."
      },
      {
        id: "f8",
        title: "Personal Trading Blackout Window",
        formula: "Execution\\ Delay \\ge 3\\ \\text{Business Days Post Client Order}",
        variables: "Restricts personal trades before or during client execution.",
        note: "Enforces Standard VI(B) Priority of Transactions."
      },
      {
        id: "f9",
        title: "High-Water Mark Performance Benchmark",
        formula: "Incentive\\ Fee = \\max\\left(0, (V_t - HWM) \\times Fee\\%\\right)",
        variables: "V_t = Current Portfolio Value, HWM = Historical Peak Value",
        note: "Protects clients from paying fees on recovered losses."
      },
      {
        id: "f10",
        title: "Composite Dispersion Index (Equal-Weighted)",
        formula: "Dispersion = \\sqrt{\\frac{\\sum (R_i - \\bar{R}_c)^2}{N - 1}}",
        variables: "R_i = Individual portfolio return, \\bar{R}_c = Mean composite return",
        note: "Discloses internal variance among portfolios within a GIPS composite."
      }
    ]
  },
  {
    id: "quants",
    title: "Quantitative Methods",
    icon: "Calculator",
    concepts: [
      {
        id: "c11",
        title: "Time Value of Money (TVM)",
        summary: "A dollar received today is worth more than a dollar received in the future.",
        details: "TVM accounts for interest earning potential and inflation. Used to value capital projects, bonds, stocks, and compounding cash flow streams."
      },
      {
        id: "c12",
        title: "Effective Annual Rate (EAR)",
        summary: "The actual annual interest rate earned when compounding occurs more than once per year.",
        details: "Compounding frequency (monthly, quarterly, daily) increases the effective rate relative to the stated nominal rate."
      },
      {
        id: "c13",
        title: "Annuity Ordinary vs. Annuity Due",
        summary: "Ordinary annuity pays at end of period; Annuity due pays at beginning of period.",
        details: "Annuity Due cash flows are discounted for one fewer period, yielding a higher present value: PV(Due) = PV(Ordinary) × (1 + r)."
      },
      {
        id: "c14",
        title: "NPV Decision Rule",
        summary: "Accept all independent projects with NPV > 0.",
        details: "NPV represents the net dollar value added to firm equity. Discount rate reflects the opportunity cost of capital."
      },
      {
        id: "c15",
        title: "Skewness & Tail Risk",
        summary: "Positive skewness has a long right tail (Mean > Median > Mode).",
        details: "Financial asset returns often display negative skewness (frequent small gains, rare extreme losses) and fat tails (leptokurtosis)."
      },
      {
        id: "c16",
        title: "Central Limit Theorem (CLT)",
        summary: "Sample mean distribution approaches normal as sample size n ≥ 30.",
        details: "Regardless of the population distribution shape, the sampling distribution of the sample mean becomes normally distributed with mean μ and variance σ²/n."
      },
      {
        id: "c17",
        title: "Hypothesis Testing (Type I vs. Type II Errors)",
        summary: "Type I = False Positive (Reject true H0); Type II = False Negative (Fail to reject false H0).",
        details: "Significance level α represents the probability of a Type I error. Power of a test equals 1 - β (probability of correctly rejecting a false null)."
      },
      {
        id: "c18",
        title: "P-Value Rule",
        summary: "Reject H0 if P-value ≤ Significance Level α.",
        details: "The p-value is the smallest significance level at which the null hypothesis can be rejected based on sample evidence."
      },
      {
        id: "c19",
        title: "Simple Linear Regression & R²",
        summary: "R² measures the proportion of variance in Y explained by X.",
        details: "Linear regression fits Y = b0 + b1(X) + e. Coefficient of determination R² ranges from 0 to 1 (or 0% to 100%)."
      },
      {
        id: "c20",
        title: "Sharpe Ratio & Risk-Adjusted Return",
        summary: "Excess return per unit of total risk (standard deviation).",
        details: "Used to evaluate portfolio performance relative to risk-free assets. Higher Sharpe ratio indicates superior risk-adjusted return."
      }
    ],
    formulas: [
      {
        id: "f11",
        title: "Effective Annual Rate (EAR)",
        formula: "EAR = \\left(1 + \\frac{r}{m}\\right)^m - 1",
        variables: "r = Stated nominal annual rate, m = Compounding periods per year",
        note: "Continuous compounding limit: EAR = e^r - 1."
      },
      {
        id: "f12",
        title: "Future Value of Single Sum",
        formula: "FV_n = PV \\times (1 + r)^n",
        variables: "PV = Present value, r = Interest rate per period, n = Number of periods",
        note: "Base formula for exponential compounding."
      },
      {
        id: "f13",
        title: "Present Value of Perpetuity",
        formula: "PV = \\frac{PMT}{r}",
        variables: "PMT = Periodic constant payment, r = Discount rate",
        note: "Used for preferred stock valuation with constant dividend."
      },
      {
        id: "f14",
        title: "Net Present Value (NPV)",
        formula: "NPV = \\sum_{t=1}^n \\frac{CF_t}{(1 + r)^t} - Outlay",
        variables: "CF_t = Cash flow at period t, r = Required discount rate",
        note: "Directly measures added dollar wealth."
      },
      {
        id: "f15",
        title: "Sample Variance",
        formula: "s^2 = \\frac{\\sum_{i=1}^n (X_i - \\bar{X})^2}{n - 1}",
        variables: "X_i = Observed value, \\bar{X} = Sample mean, n = Sample size",
        note: "Uses (n - 1) degrees of freedom for an unbiased estimate."
      },
      {
        id: "f16",
        title: "Standard Error of Sample Mean",
        formula: "SE_{\\bar{x}} = \\frac{s}{\\sqrt{n}}",
        variables: "s = Sample standard deviation, n = Sample size",
        note: "Measures variability of sample mean around population mean."
      },
      {
        id: "f17",
        title: "Z-Score Normalization",
        formula: "Z = \\frac{X - \\mu}{\\sigma}",
        variables: "X = Value, \\mu = Population mean, \\sigma = Population standard deviation",
        note: "Converts any normal distribution to standard normal N(0,1)."
      },
      {
        id: "f18",
        title: "Sharpe Ratio",
        formula: "Sharpe = \\frac{R_p - R_f}{\\sigma_p}",
        variables: "R_p = Portfolio return, R_f = Risk-free rate, \\sigma_p = Portfolio std dev",
        note: "Evaluates risk-adjusted performance using total risk."
      },
      {
        id: "f19",
        title: "Coefficient of Variation (CV)",
        formula: "CV = \\frac{s}{\\bar{X}}",
        variables: "s = Standard deviation, \\bar{X} = Mean return",
        note: "Measures risk per unit of return (lower is better)."
      },
      {
        id: "f20",
        title: "Simple Linear Regression Slope",
        formula: "b_1 = \\frac{Cov(X, Y)}{Var(X)} = r_{xy} \\times \\frac{s_y}{s_x}",
        variables: "r_{xy} = Correlation coefficient, s_y = Std dev of Y, s_x = Std dev of X",
        note: "Calculates sensitivity of dependent variable Y to independent variable X."
      }
    ]
  },
  {
    id: "fsa",
    title: "Financial Statement Analysis",
    icon: "FileText",
    concepts: [
      {
        id: "c21",
        title: "Primary Statements Interconnection",
        summary: "Balance sheet, Income statement, and Cash flow statement tie together.",
        details: "Net Income flows into Retained Earnings on the Balance Sheet and serves as the starting point for CFO under the indirect method."
      },
      {
        id: "c22",
        title: "Revenue Recognition Standards (IFRS 15 / ASC 606)",
        summary: "Recognize revenue when control of goods/services is transferred to client.",
        details: "5-Step Model: Identify contract, identify performance obligations, determine transaction price, allocate price, recognize revenue upon satisfaction."
      },
      {
        id: "c23",
        title: "FIFO vs. LIFO Inventory Impact",
        summary: "During inflation, FIFO yields higher net income and assets; LIFO yields lower tax expense.",
        details: "FIFO assigns older cheaper costs to COGS, boosting profits. LIFO is permitted under US GAAP but prohibited under IFRS."
      },
      {
        id: "c24",
        title: "Capitalizing vs. Expensing Costs",
        summary: "Capitalizing boosts initial Net Income and OCF; Expensing reduces current period earnings.",
        details: "Capitalizing classifies cash outflow as CFI instead of CFO. Costs providing future economic benefits beyond 1 year should be capitalized."
      },
      {
        id: "c25",
        title: "Depreciation & Impairment Rules",
        summary: "Accelerated depreciation lowers initial taxable income; impairment write-downs cannot be reversed under US GAAP.",
        details: "IFRS permits impairment reversals for non-goodwill assets if recoverable value recovers. US GAAP strictly prohibits impairment reversals."
      },
      {
        id: "c26",
        title: "Deferred Tax Liabilities (DTL) & Assets (DTA)",
        summary: "DTL arises when Financial Income > Taxable Income due to temporary timing differences.",
        details: "DTLs reflect future tax payments due to accelerated tax depreciation vs straight-line financial reporting."
      },
      {
        id: "c27",
        title: "Lease Accounting (IFRS 16 / US GAAP)",
        summary: "Lessee records Right-of-Use (ROU) Asset and Lease Liability on Balance Sheet.",
        details: "Eliminates off-balance-sheet operating lease leverage. Financial leases recognize interest expense and depreciation separately."
      },
      {
        id: "c28",
        title: "Direct vs. Indirect Cash Flow Method",
        summary: "Direct reports gross receipts/payments; Indirect adjusts Net Income for non-cash items.",
        details: "US GAAP and IFRS encourage the Direct method, but most companies use Indirect due to accounting system convenience."
      },
      {
        id: "c29",
        title: "Quality of Financial Reporting",
        summary: "High quality reporting is transparent, conservative, and sustainable.",
        details: "Aggressive revenue recognition, channel stuffing, or capitalizing operating costs degrade earnings quality."
      },
      {
        id: "c30",
        title: "Financial Ratio Framework",
        summary: "Categorized into Liquidity, Solvency, Activity, and Profitability ratios.",
        details: "Enables comparison across time (trend analysis) and across industry competitors (cross-sectional analysis)."
      }
    ],
    formulas: [
      {
        id: "f21",
        title: "Current Ratio",
        formula: "Current\\ Ratio = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}",
        variables: "Measures ability to pay short-term obligations within 1 year.",
        note: "Higher ratio indicates higher liquidity buffer."
      },
      {
        id: "f22",
        title: "Quick (Acid-Test) Ratio",
        formula: "Quick\\ Ratio = \\frac{\\text{Cash} + \\text{Marketable Securities} + \\text{Receivables}}{\\text{Current Liabilities}}",
        variables: "Excludes less liquid inventory from current assets.",
        note: "Stricter test of short-term solvency."
      },
      {
        id: "f23",
        title: "Inventory Turnover Ratio",
        formula: "Inventory\\ Turnover = \\frac{\\text{COGS}}{\\text{Average Inventory}}",
        variables: "Days Inventory Outstanding (DIO) = 365 / Inventory Turnover",
        note: "Measures efficiency of inventory management."
      },
      {
        id: "f24",
        title: "Days Sales Outstanding (DSO)",
        formula: "DSO = \\frac{365 \\times \\text{Average Accounts Receivable}}{\\text{Total Credit Sales}}",
        variables: "Measures average collection period for sales.",
        note: "Lower DSO reflects faster customer collections."
      },
      {
        id: "f25",
        title: "Debt-to-Equity Ratio (D/E)",
        formula: "D/E = \\frac{\\text{Total Debt}}{\\text{Total Shareholder Equity}}",
        variables: "Total Debt = Short-term Interest Debt + Long-term Debt",
        note: "Solvency leverage ratio."
      },
      {
        id: "f26",
        title: "Interest Coverage Ratio",
        formula: "Interest\\ Coverage = \\frac{\\text{EBIT}}{\\text{Interest Expense}}",
        variables: "EBIT = Operating Income",
        note: "Higher coverage indicates stronger capacity to service debt."
      },
      {
        id: "f27",
        title: "Gross Profit Margin",
        formula: "Gross\\ Margin\\% = \\frac{\\text{Revenue} - \\text{COGS}}{\\text{Revenue}} \\times 100",
        variables: "Measures basic pricing power and manufacturing efficiency.",
        note: "First tier of profitability analysis."
      },
      {
        id: "f28",
        title: "Free Cash Flow to Firm (FCFF)",
        formula: "FCFF = CFO + \\text{Interest}(1 - T) - CapEx",
        variables: "CFO = Operating Cash Flow, T = Marginal Tax Rate, CapEx = Capital Expenditures",
        note: "Cash available to all capital suppliers (debt and equity)."
      },
      {
        id: "f29",
        title: "Free Cash Flow to Equity (FCFE)",
        formula: "FCFE = CFO - CapEx + \\text{Net Borrowing}",
        variables: "Net Borrowing = Debt Issued - Debt Repaid",
        note: "Cash flow available specifically to equity holders."
      },
      {
        id: "f30",
        title: "Cash Conversion Cycle (CCC)",
        formula: "CCC = DIO + DSO - DPO",
        variables: "DIO = Days Inventory, DSO = Days Sales, DPO = Days Payable Outstanding",
        note: "Net length of time cash is tied up in operating operations."
      }
    ]
  },
  {
    id: "equity",
    title: "Equity Investments",
    icon: "TrendingUp",
    concepts: [
      {
        id: "c31",
        title: "Market Orders vs. Limit Orders",
        summary: "Market orders guarantee execution speed; Limit orders guarantee execution price.",
        details: "Market orders execute immediately at current bid/ask prices. Limit orders execute only at or better than the specified price."
      },
      {
        id: "c32",
        title: "Efficient Market Hypothesis (EMH)",
        summary: "Weak = Past prices; Semi-strong = All public info; Strong = All public & private info.",
        details: "Under semi-strong EMH, fundamental analysis cannot earn abnormal returns because all public information is priced in instantly."
      },
      {
        id: "c33",
        title: "Gordon Growth Dividend Discount Model",
        summary: "Values stock based on constant growing future dividends: P0 = D1 / (r - g).",
        details: "Requires required return r > dividend growth rate g. Assumes infinite horizon and stable payout policy."
      },
      {
        id: "c34",
        title: "DuPont 3-Way & 5-Way Analysis",
        summary: "Decomposes Return on Equity (ROE) into operating efficiency, asset efficiency, and leverage.",
        details: "5-Way ROE = Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Financial Leverage."
      },
      {
        id: "c35",
        title: "Price Multiples Valuation (P/E, P/B, EV/EBITDA)",
        summary: "Relative valuation comparing company metrics to peers or market averages.",
        details: "EV/EBITDA is capital-structure-neutral, ideal for comparing firms with different leverage levels."
      },
      {
        id: "c36",
        title: "Porter's Five Forces Framework",
        summary: "Analyzes industry structure and long-term profitability drivers.",
        details: "Five Forces: Threat of entry, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and rivalry among competitors."
      },
      {
        id: "c37",
        title: "Index Weighting Methods",
        summary: "Price-weighted (DJIA), Cap-weighted (S&P 500), Equal-weighted.",
        details: "Price-weighted index gives higher weight to higher stock price per share. Market-cap weighted gives higher weight to larger market valuation firms."
      },
      {
        id: "c38",
        title: "Asset-Based Valuation",
        summary: "Valuing equity as Total Asset Market Value minus Liabilities.",
        details: "Best suited for companies with heavy tangible assets (real estate, natural resources) or liquidation scenarios."
      },
      {
        id: "c39",
        title: "Preferred Stock Characteristics",
        summary: "Hybrid security with fixed dividends and priority over common stock in liquidation.",
        details: "Cumulative preferred stock requires unpaid dividends (dividends in arrears) to be paid before common stock receives dividends."
      },
      {
        id: "c40",
        title: "Behavioral Finance Biases",
        summary: "Cognitive errors (information processing) and Emotional biases.",
        details: "Examples: Anchoring bias, loss aversion (prospect theory), availability bias, and overconfidence."
      }
    ],
    formulas: [
      {
        id: "f31",
        title: "Gordon Growth Model Intrinsic Value",
        formula: "P_0 = \\frac{D_1}{r - g} = \\frac{D_0 (1 + g)}{r - g}",
        variables: "P_0 = Current stock price, D_1 = Next year dividend, r = Required return, g = Growth rate",
        note: "Requires constant growth rate g < r."
      },
      {
        id: "f32",
        title: "Sustainable Growth Rate (g)",
        formula: "g = b \\times ROE = (1 - \\text{Dividend Payout Ratio}) \\times ROE",
        variables: "b = Earnings retention rate, ROE = Return on Equity",
        note: "Internal rate firm can grow without issuing new equity."
      },
      {
        id: "f33",
        title: "3-Way DuPont ROE Formula",
        formula: "ROE = \\frac{\\text{Net Income}}{\\text{Revenue}} \\times \\frac{\\text{Revenue}}{\\text{Total Assets}} \\times \\frac{\\text{Total Assets}}{\\text{Equity}}",
        variables: "ROE = Net Profit Margin × Asset Turnover × Financial Leverage",
        note: "Identifies driver of return on equity."
      },
      {
        id: "f34",
        title: "5-Way DuPont ROE Formula",
        formula: "ROE = \\frac{NI}{EBT} \\times \\frac{EBT}{EBIT} \\times \\frac{EBIT}{Sales} \\times \\frac{Sales}{Assets} \\times \\frac{Assets}{Equity}",
        variables: "Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Leverage",
        note: "Isolates interest and tax effects on profit margin."
      },
      {
        id: "f35",
        title: "Capital Asset Pricing Model (CAPM)",
        formula: "E(R_i) = R_f + \\beta_i \\left[ E(R_m) - R_f \\right]",
        variables: "R_f = Risk-free rate, \\beta_i = Systematic risk beta, E(R_m) = Expected market return",
        note: "Calculates required rate of return for equity asset."
      },
      {
        id: "f36",
        title: "Enterprise Value (EV)",
        formula: "EV = \\text{Market Cap} + \\text{Total Debt} + \\text{Preferred Equity} - \\text{Cash \\& Equivalents}",
        variables: "Measures total takeover cost of firm operations.",
        note: "Used in EV/EBITDA multiples."
      },
      {
        id: "f37",
        title: "Price-to-Earnings (P/E) Ratio",
        formula: "P/E = \\frac{\\text{Current Market Price per Share}}{\\text{Earnings per Share (EPS)}}",
        variables: "Trailing P/E uses last 12M EPS; Forward P/E uses next 12M projected EPS.",
        note: "Most popular relative valuation metric."
      },
      {
        id: "f38",
        title: "Price-to-Book (P/B) Ratio",
        formula: "P/B = \\frac{\\text{Price per Share}}{\\text{Book Value per Share}} = \\frac{\\text{Market Cap}}{\\text{Total Equity}}",
        variables: "Measures market value relative to accounting net asset value.",
        note: "Commonly used for financial institutions."
      },
      {
        id: "f39",
        title: "Equity Risk Premium (ERP)",
        formula: "ERP = E(R_m) - R_f",
        variables: "Expected return of market index minus risk-free government bond yield.",
        note: "Compensation required for holding risky market equity."
      },
      {
        id: "f40",
        title: "Justified Forward P/E Ratio",
        formula: "P_0 / E_1 = \\frac{1 - b}{r - g}",
        variables: "(1 - b) = Dividend payout ratio, r = Required return, g = Growth rate",
        note: "Derived from the Gordon Growth Model."
      }
    ]
  },
  {
    id: "fixedincome",
    title: "Fixed Income & Derivatives",
    icon: "PieChart",
    concepts: [
      {
        id: "c41",
        title: "Inverse Relationship of Bond Prices and Yields",
        summary: "When market yield (YTM) rises, bond price falls; when YTM falls, bond price rises.",
        details: "Fixed coupon payments become less attractive when market interest rates rise, requiring lower prices to match prevailing yields."
      },
      {
        id: "c42",
        title: "Macaulay Duration vs. Modified Duration",
        summary: "Macaulay measures weighted average cash flow timing; Modified measures price sensitivity to yield.",
        details: "Modified Duration = Macaulay Duration / (1 + YTM/m). Represents percentage price change per 1% change in YTM."
      },
      {
        id: "c43",
        title: "Convexity Adjustment",
        summary: "Accounting for curvature in price-yield relationship for large rate moves.",
        details: "Duration alone underestimates price increases when yields fall and overestimates price drops when yields rise. Convexity corrects this."
      },
      {
        id: "c44",
        title: "Yield Curve Shapes",
        summary: "Normal (Upward sloping), Inverted (Downward sloping), Flat, Humped.",
        details: "Inverted yield curve (short-term yields > long-term yields) historically precedes economic recessions."
      },
      {
        id: "c45",
        title: "Credit Risk & Rating Tiers",
        summary: "Investment Grade (BBB-/Baa3 and higher) vs High Yield / Junk (BB+/Ba1 and lower).",
        details: "Credit risk includes default risk, credit spread risk, and downgrade risk."
      },
      {
        id: "c46",
        title: "Embedded Bond Options (Callable vs. Putable)",
        summary: "Callable benefits issuer (caps price upside); Putable benefits bondholder (floors price downside).",
        details: "Callable bond price = Option-free bond price - Call option value. Putable bond price = Option-free bond price + Put option value."
      },
      {
        id: "c47",
        title: "Forwards vs. Futures Contracts",
        summary: "Forwards are customized OTC; Futures are exchange-traded with daily mark-to-market.",
        details: "Futures margin accounts (Initial & Maintenance margin) virtually eliminate counterparty default risk."
      },
      {
        id: "c48",
        title: "Option Moneyness (In / At / Out of the Money)",
        summary: "Call is ITM if Spot Price > Strike; Put is ITM if Strike > Spot Price.",
        details: "Option Value = Intrinsic Value + Time Value. Intrinsic value cannot be negative."
      },
      {
        id: "c49",
        title: "Interest Rate Swaps (Plain Vanilla)",
        summary: "Exchange fixed-rate payments for floating-rate payments based on notional principal.",
        details: "Fixed payer benefits when interest rates rise; Floating payer benefits when interest rates fall."
      },
      {
        id: "c50",
        title: "Securitization & ABS Tranching",
        summary: "Pooling loans into Asset-Backed Securities with Senior/Subordinated credit tranches.",
        details: "Subordinated (equity/first-loss) tranches absorb default losses first to protect Senior investment-grade tranches."
      }
    ],
    formulas: [
      {
        id: "f41",
        title: "Zero-Coupon Bond Price Formula",
        formula: "P = \\frac{FV}{(1 + r)^n}",
        variables: "P = Bond price, FV = Face value, r = Period discount rate, n = Periods",
        note: "Simple present value formula without coupon streams."
      },
      {
        id: "f42",
        title: "Modified Duration Formula",
        formula: "ModDur = \\frac{Macaulay\\ Duration}{1 + \\frac{YTM}{m}}",
        variables: "YTM = Annual yield to maturity, m = Annual compounding frequency",
        note: "Direct measure of percentage price sensitivity."
      },
      {
        id: "f43",
        title: "Bond Percentage Price Change with Duration & Convexity",
        formula: "\\% \\Delta P \\approx -ModDur \\times \\Delta YTM + \\frac{1}{2} Convexity \\times (\\Delta YTM)^2",
        variables: "\\Delta YTM = Yield change in decimal format",
        note: "Combines 1st and 2nd order Taylor expansion terms."
      },
      {
        id: "f44",
        title: "Current Yield of Bond",
        formula: "Current\\ Yield = \\frac{\\text{Annual Coupon Payment}}{\\text{Current Market Price}} \\times 100",
        variables: "Measures income yield relative to purchase price.",
        note: "Does not account for capital gain/loss to maturity."
      },
      {
        id: "f45",
        title: "Call Option Payoff (Buyer)",
        formula: "Payoff_{Call} = \\max(0, S_T - X)",
        variables: "S_T = Spot price at expiration, X = Strike price",
        note: "Profit = Payoff - Initial Call Premium Paid."
      },
      {
        id: "f46",
        title: "Put Option Payoff (Buyer)",
        formula: "Payoff_{Put} = \\max(0, X - S_T)",
        variables: "S_T = Spot price at expiration, X = Strike price",
        note: "Profit = Payoff - Initial Put Premium Paid."
      },
      {
        id: "f47",
        title: "Put-Call Parity Relationship",
        formula: "C + \\frac{X}{(1 + r)^T} = P + S_0",
        variables: "C = European call price, P = European put price, S_0 = Current stock price, X = Strike price",
        note: "Fiduciary Call = Protective Put."
      },
      {
        id: "f48",
        title: "Value of Forward Contract at Expiration",
        formula: "V_T = S_T - F_0(T)",
        variables: "S_T = Spot price at expiry, F_0(T) = Forward price agreed at initiation",
        note: "Zero value at contract initiation t = 0."
      },
      {
        id: "f49",
        title: "Approximate Convexity Formula",
        formula: "Convexity = \\frac{P_- + P_+ - 2P_0}{P_0 \\times (\\Delta YTM)^2}",
        variables: "P_- = Price if yield drops, P_+ = Price if yield rises, P_0 = Initial price",
        note: "Estimates price curvature numerically."
      },
      {
        id: "f50",
        title: "Full (Dirty) Price of Bond",
        formula: "Full\\ Price = Clean\\ Price + Accrued\\ Interest",
        variables: "Accrued Interest = Coupon × (Days Since Last Coupon / Total Days in Coupon Period)",
        note: "Actual settlement price paid by buyer."
      }
    ]
  }
];
