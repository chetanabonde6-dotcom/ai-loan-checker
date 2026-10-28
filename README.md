# LoanAI — AI-Powered Loan Eligibility Platform

> A modern, glassmorphism-styled fintech web application powered by **Claude AI** and **Google Sheets** integration.

![LoanAI](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript-blue)
![AI](https://img.shields.io/badge/AI-Claude%20API-orange)

---

## 📄 Submission Documents

- **Final Capstone Report (PDF):** [Open or download the complete report](docs/LoanAI_Capstone_Report.pdf)
- **Google Drive Report:** [View the complete project report](https://drive.google.com/file/d/1OLow17mmeNkFq5cOSCpNLrNv4ixT9ciK/view?usp=sharing)
- **Main Financial Logic:** [js/script.js](js/script.js)
- **Google Sheets Backend:** [google-apps-script/Code.gs](google-apps-script/Code.gs)
- **Project Owner:** Chetana Bonde

---

## 🚀 Features

| Module | Description |
|--------|-------------|
| **Loan Eligibility Checker** | Rule-based AI validation — salary, credit score, EMI, age checks |
| **Credit Score Analyzer** | SVG gauge meter + band classification (Excellent / Good / Fair / Poor) |
| **EMI Calculator** | Reducing-balance formula + donut chart + yearly amortisation table |
| **AI Financial Advisor** | Claude-powered chat + smart fallback responses |
| **Google Sheets Storage** | Serverless data persistence via Apps Script |

---

## 📁 Project Structure

```
LoanAI/
├── index.html                  # Landing page
├── loan-eligibility.html       # Loan Eligibility Checker
├── credit-score.html           # Credit Score Analyzer
├── emi-calculator.html         # EMI Calculator
├── ai-tips.html                # AI Financial Advisor Chat
├── css/
│   └── style.css               # Global design system (glassmorphism)
├── js/
│   └── script.js               # Shared utilities (EMI formula, AI, Sheets)
└── google-apps-script/
    └── Code.gs                 # Google Apps Script for Sheets integration
```

---

## 🏗️ Eligibility Rules

```
Monthly Salary   > ₹30,000
Credit Score     > 700
Existing EMI     < ₹20,000/month
Applicant Age    ≥ 21 years

Eligible Amount  = Monthly Salary × 20  (if all rules pass)
```

## 📐 EMI Formula

```
EMI = [ P × R × (1+R)^N ] / [ (1+R)^N − 1 ]

P = Principal Loan Amount
R = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)
N = Loan Tenure in Months
```

---

## ⚙️ Setup & Configuration

### 1. Open Locally

Simply open `index.html` in any modern browser — no build step required!

```bash
# Option 1: Direct file open
start index.html

# Option 2: Local server (recommended)
npx serve .
# or
python -m http.server 3000
```

### 2. Claude AI Integration

1. Get your API key from [console.anthropic.com](https://console.anthropic.com)
2. Open the **AI Tips** page
3. Enter your key in the **Claude API Setup** panel
4. The key is saved in `localStorage` for future sessions

> **Demo Mode:** Works without an API key — smart pre-built responses cover all common financial questions.

### 3. Google Sheets Integration (Optional)

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Paste the contents of `google-apps-script/Code.gs`
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your sheet's ID
5. Deploy → **New Deployment** → **Web App**
6. Set access to **"Anyone"**
7. Copy the deployment URL
8. Paste in LoanAI → AI Tips page → Google Sheets Webhook URL

---

## 🎨 Design System

- **Framework:** Glassmorphism dark theme
- **Colors:** Blue (`#4f8ef7`), Cyan (`#00d4ff`), Green (`#00ff9d`), Gold (`#f5c842`)
- **Typography:** Inter + Space Grotesk (Google Fonts)
- **Animations:** Float cards, SVG gauge, donut charts, fade-in-up, counter animations
- **Layout:** CSS Grid + Flexbox, responsive breakpoints (480 / 768 / 1024px)

---

## 🌐 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit: LoanAI platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/LoanAI.git
git push -u origin main
# Enable GitHub Pages in repo Settings → Pages → Deploy from main branch
```

### Netlify (drag & drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `LoanAI` folder into the deploy zone
3. Your site is live instantly!

---

## 📊 Credit Score Classification

| Score Range | Band       | Loan Eligibility       | Expected Rate |
|-------------|-----------|------------------------|---------------|
| 750 – 900   | Excellent | Highly Eligible        | 7.5% – 8.5%  |
| 650 – 749   | Good      | Eligible               | 9% – 11%     |
| 550 – 649   | Fair      | Conditionally Eligible | 12% – 15%    |
| 300 – 549   | Poor      | Not Eligible           | 18%+         |

---

## 🛡️ Privacy

- No personal data is stored on any server by default
- API keys are stored only in browser `localStorage`
- Google Sheets integration is opt-in and user-controlled
- All calculations happen client-side in the browser

---

## 🤝 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI:** Anthropic Claude API (`claude-opus-4-5`)
- **Icons:** Font Awesome 6.5
- **Fonts:** Google Fonts (Inter, Space Grotesk)
- **Storage:** Google Apps Script + Google Sheets (serverless)
- **Hosting:** GitHub Pages / Netlify (static)

---

*Built as part of a BFSI AI Platform project — demonstrating how AI and lightweight web technologies can power intelligent financial tools without complex backend infrastructure.*
