/**
 * LoanAI — Global JavaScript Utilities
 * Shared across all pages
 */

// ── Global Config (override with your keys) ──────────────────
window.CLAUDE_API_KEY = localStorage.getItem('loanai_claude_key') || '';
window.SHEETS_URL     = localStorage.getItem('loanai_sheets_url') || '';

// ── Currency Formatter ────────────────────────────────────────
function formatINR(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

// ── Reducing-Balance EMI Formula ─────────────────────────────
function calculateEMI(principal, annualRatePct, tenureMonths) {
  const P = principal;
  const R = annualRatePct / 12 / 100;
  const N = tenureMonths;
  if (R === 0) return P / N;
  return (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
}

// ── Loan Eligibility Rules ────────────────────────────────────
function checkLoanEligibility(salary, creditScore, existingEMI, age) {
  return {
    salaryPass:    salary > 30000,
    scorePass:     creditScore > 700,
    emiPass:       existingEMI < 20000,
    agePass:       age >= 21,
    get allPass()  { return this.salaryPass && this.scorePass && this.emiPass && this.agePass; },
    get amount()   { return this.allPass ? salary * 20 : 0; }
  };
}

// ── Credit Band Classifier ────────────────────────────────────
function getCreditBand(score) {
  if (score >= 750) return { band: 'Excellent', color: 'var(--clr-accent)',   tagClass: 'tag-cyan'    };
  if (score >= 650) return { band: 'Good',      color: 'var(--clr-success)',  tagClass: 'tag-success' };
  if (score >= 550) return { band: 'Fair',      color: 'var(--clr-warning)',  tagClass: 'tag-warning' };
  return              { band: 'Poor',      color: 'var(--clr-danger)',   tagClass: 'tag-danger'  };
}

// ── Risk Level ────────────────────────────────────────────────
function getRiskLevel(creditScore) {
  if (creditScore >= 750) return { level: 'Low',    color: 'var(--clr-success)' };
  if (creditScore >= 650) return { level: 'Medium', color: 'var(--clr-warning)' };
  return                         { level: 'High',   color: 'var(--clr-danger)'  };
}

// ── Google Sheets Integration ─────────────────────────────────
async function saveToGoogleSheets(data) {
  const url = window.SHEETS_URL;
  if (!url) return false;
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, timestamp: new Date().toISOString() })
    });
    return true;
  } catch { return false; }
}

// ── Claude AI Call ────────────────────────────────────────────
async function callClaude(prompt, maxTokens = 300) {
  const key = window.CLAUDE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch { return null; }
}

// ── Form Validation Helper ────────────────────────────────────
function validateField(value, type) {
  switch (type) {
    case 'name':    return value.trim().length >= 2;
    case 'salary':  return value > 0;
    case 'score':   return value >= 300 && value <= 900;
    case 'age':     return value >= 18 && value <= 80;
    case 'emi':     return value >= 0;
    case 'amount':  return value >= 10000;
    case 'rate':    return value > 0 && value <= 30;
    case 'tenure':  return value >= 1;
    default: return true;
  }
}

// ── Animate Number Counter ────────────────────────────────────
function animateCounter(element, target, duration = 1500, prefix = '', suffix = '') {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = prefix + target.toLocaleString('en-IN') + suffix;
      clearInterval(timer);
      return;
    }
    element.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
  }, 16);
}

// ── Intersection Observer for Animations ─────────────────────
function observeFadeIn(selector = '.fade-in-up') {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// ── Init on DOM Load ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  observeFadeIn();

  // Sync API key globally
  const savedKey = localStorage.getItem('loanai_claude_key');
  if (savedKey) window.CLAUDE_API_KEY = savedKey;

  const savedSheets = localStorage.getItem('loanai_sheets_url');
  if (savedSheets) window.SHEETS_URL = savedSheets;
});
