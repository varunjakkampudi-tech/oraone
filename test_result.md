#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  OraOne homepage conversion makeover (homepage rewrite + Security page + Pricing clarity).
  Specific asks:
  1. Hero rewrite — "Never Miss A Lead. Never Miss A Sale." / "AI Voice, Chat and WhatsApp Agents that answer, qualify and convert customers 24/7."
  2. Trust & Social Proof section (no fake logos, no fake testimonials) — platform metrics + trust pillars.
  3. Live Product Demo on homepage (Voice / Chat / WhatsApp tabs).
  4. Pricing clarity — Free during Beta · From $29/mo after launch · Enterprise SLA.
  5. New /security page (GDPR, India DPDP, AES-256, TLS 1.3, RBAC, audit logs, retention, sub-processor transparency, SOC 2 in-progress).
  6. Homepage section re-order: Hero → Trust → Demo → Features → Industries → Case Studies → Pricing → FAQ → CTA.
  7. Smoke-test all pages and refresh desktop screenshots in /app/test_reports/screenshots/desktop/.

frontend:
  - task: "Hero rewrite — Never Miss A Lead. Never Miss A Sale."
    implemented: true
    working: true
    file: "frontend/src/pages/marketing/Home.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "New headline + sub copy + Start Free / Book Demo CTAs + 3 agent cards + 'Free during Beta · No credit card' trust line. Visual verification via desktop screenshot done. data-testid hooks: hero-cta-primary, hero-cta-secondary."

  - task: "Trust & Social Proof section (no fake logos / no fake testimonials)"
    implemented: true
    working: true
    file: "frontend/src/pages/marketing/Home.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Replaces old Stats + Testimonials. 3 platform metrics with explicit 'Platform Metric' / 'Beta Metric' labels (10,000+ Conversations Automated, 500+ Businesses Exploring OraOne, 95% Faster Response Times). 4 trust pillars (24/7 AI Availability, 99.9% Uptime, Multi-Channel Support, Enterprise-Grade Security). Security CTA strip linking to /security. data-testid: home-trust-section, home-trust-metric, home-trust-pillar."

  - task: "Live Product Demo on homepage (Voice / Chat / WhatsApp tabs)"
    implemented: true
    working: true
    file: "frontend/src/pages/marketing/Home.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Tabbed embed of existing ProductLiveDemos (VoiceAgentDemo / ChatAgentDemo / WhatsAppAgentDemo) with AnimatePresence transitions. All 3 tabs manually clicked and verified to render correct content. data-testid: home-demo-section, home-demo-tab-voice|chat|whatsapp."

  - task: "Pricing — Free during Beta · From $29/mo after launch · Enterprise SLA"
    implemented: true
    working: true
    file: "frontend/src/pages/marketing/Pricing.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Beta banner above cards. All 3 tiers show $0 / during Beta hero price + post-beta line (Starter $29/mo, Growth Pricing TBD, Enterprise Custom · Contact Sales). Enterprise card now lists SLA options (uptime + response), SSO + RBAC + Audit logs, Dedicated CSM. Trust strip + Pricing FAQ retained. data-testid: pricing-card-{starter|growth|enterprise}, pricing-{slug}-cta."

  - task: "New /security page"
    implemented: true
    working: true
    file: "frontend/src/pages/marketing/Security.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Full page created with hero + Trust Center vault visual, 6 security control cards (AES-256 at rest, TLS 1.3 in transit, RBAC, Audit Logs, Data Retention Controls, Secure Cloud Infrastructure), 6 compliance items with honest status badges (GDPR Active, India DPDP Active, SOC 2 Type II In Progress, ISO 27001 Planned, HIPAA On Request, PCI-DSS N/A), 6 engineering practices, 6 data-subject rights (GDPR/DPDP), sub-processor transparency table (AWS, MongoDB Atlas, Twilio, Meta WhatsApp, Resend/SES, Sentry), procurement CTA to security@oraone.ai. Route registered in App.js (lazy). Linked from Footer Resources column + bottom legal strip. data-testid: security-contact-cta."

  - task: "Homepage section re-order (Hero → Trust → Demo → Features → Industries → Case Studies → Pricing → FAQ → CTA)"
    implemented: true
    working: true
    file: "frontend/src/pages/marketing/Home.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Sections reordered. Removed inflated old stats bar (10,000+ Businesses Served / 50M+ Conversations), removed fake testimonial section (Suresh Khanna / Anjali Iyer etc.) per 'no fake testimonials' guideline. Added new Case Studies snippet (3 anonymised industry metric cards) and Pricing snippet (3 tier preview + 'Free during Beta · From $29/mo' positioning)."

  - task: "Footer — Security link in Resources column + bottom legal strip"
    implemented: true
    working: true
    file: "frontend/src/components/marketing/Footer.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Added 'Security & Trust' link to Resources column and 'Security' link to the bottom legal strip."

  - task: "Smoke-test all 35 routes + refresh desktop screenshots"
    implemented: true
    working: true
    file: "scripts/capture_all_pages.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Updated capture script — BASE now reads REACT_APP_BACKEND_URL from /app/frontend/.env (no hardcoded URL), added /security route, added --desktop-only flag. Ran script: 35/35 routes captured OK with 0 failures at 1440x900. Auth pre-seed via /api/auth/login worked so /app/* + /onboarding/* show authenticated content (verified dashboard-overview shows KPIs/leaderboard/live activity, onboarding-agent shows step 1 selection). Summary written to /app/test_reports/screenshots/summary.json. Screenshots written to /app/test_reports/screenshots/desktop/<slug>.png."

metadata:
  created_by: "main_agent"
  version: "1.1"
  test_sequence: 1
  run_ui: true

test_plan:
  current_focus:
    - "Hero rewrite — Never Miss A Lead. Never Miss A Sale."
    - "Trust & Social Proof section (no fake logos / no fake testimonials)"
    - "Live Product Demo on homepage (Voice / Chat / WhatsApp tabs)"
    - "Pricing — Free during Beta · From $29/mo after launch · Enterprise SLA"
    - "New /security page"
    - "Homepage section re-order (Hero → Trust → Demo → Features → Industries → Case Studies → Pricing → FAQ → CTA)"
    - "Smoke-test all 35 routes + refresh desktop screenshots"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: |
      Homepage conversion makeover completed in one iteration. All 7 frontend tasks marked working: hero rewrite, trust & social proof, live product demo tabs, pricing clarity, /security page, section re-order, footer security link.

      One trap encountered & resolved: there are TWO testIds modules in the codebase — /app/frontend/src/constants/testIds.js (file, live) and /app/frontend/src/constants/testIds/ (folder, dormant). The file shadows the folder. Initial testId updates to the folder had no effect — fixed by updating the file. All new home-* testIds are now in the bundle and verified.

      Smoke test: 35/35 routes captured cleanly at 1440x900. Auth pre-seed working for /app/* and /onboarding/* routes. Key new pages spot-verified with AI image analysis — home shows correct hero + demo + pricing + Beta positioning; security page shows hero + controls + compliance + sub-processor table; dashboard-overview shows authenticated content. No console errors observed.

      No backend changes in this round — backend testing not needed.