# DDMA Disaster Relocation Decision-Support Platform
### Smart India Hackathon (SIH 2026) — Problem Statement 26191
**Jurisdiction**: East Delhi & Trans-Yamuna Disaster Management Authority (DDMA), Government of NCT of Delhi  
**Reference Anchor**: University School of Automation and Robotics (USAR), GGSIPU East Delhi Campus, Surajmal Vihar / Karkardooma / Yamuna Floodplain Basin

---

## Executive Overview
The **DDMA Disaster Relocation Decision-Support Platform** is an enterprise-grade spatial optimization and planning engine designed for government disaster authorities. It resolves a systemic failure in post-disaster rehabilitation: *ad-hoc political relocation leading to secondary disasters or severe infrastructure oversubscription*.

Built strictly on deterministic multi-criteria decision mathematics, the platform executes an unbroken 8-step decision chain:
1. **Multi-Hazard Risk Assessment** (CWC Yamuna Floodplain 100-yr return levels, NDMA Seismic Zone IV, DDA Geotechnical Liquefaction, DJB Waterlogging).
2. **Permanent Unsuitability "Red Zone" Delineation** (Strict binary non-buildable exclusion zone based on NDMA criteria and Yamuna Morphological Buffer).
3. **Vulnerable Settlement Identification & Profiling** (Yamuna Khadar East, Garhi Mandu, Bela Estate, Usmanpur Dhall, Sonia Vihar).
4. **Composite Relocation Priority Scoring** (Weighted hazard exposure, socio-economic vulnerability, infrastructure deficits, evacuation impedance).
5. **Candidate Resettlement Site Screening** (Karkardooma Institutional Extension near USAR, Mandoli Planned Resettlement Enclave, Anand Vihar - Ghazipur Sector, Bakkarwala Sector).
6. **Multi-Dimensional Carrying Capacity Engine (Flagship Differentiator)**: Applies a strict mathematical **min-operator** across Water Supply (Delhi Jal Board), Road Access (PWD), Sanitation/STP, Power Grid (BSES Yamuna), Healthcare (beds), and Education (UDISE+ desks). Never takes an unweighted average of capacity.
7. **Population-to-Site Matching & Spatial Allocation Engine**: Constrained multi-objective integer programming allocating displaced households to safe destination sites while preserving community cohesion, livelihoods, and transport connectivity.
8. **Explainable Relocation Recommendation & Constitutional Audit Trail**: Full mathematical explainability report ready for Chief Secretary / DDMA Apex Council sign-off.

---

## Key Features
* **Light Government Portal UI Theme**: Built with official public-sector styling — clean slate/navy typography, high contrast, subtle borders, restrained status badging, zero dark-mode AI clutter.
* **100% Free OpenStreetMap Cartography**: Interactive Leaflet maps rendering with public OpenStreetMap tiles. **Zero API keys required, zero billing, zero watermarks**.
* **Interactive Scenario Simulator**: Dynamic sliders for Hazard Weighting, Vulnerability Weighting, School Buffer Multipliers, and Transport Connectivity Penalties with instant re-calculation.
* **Interactive Carrying Capacity Sensitivity Sliders**: Adjust water, road, school, healthcare, and power capacities per site and witness immediate safe capacity shifts and binding constraint re-evaluations.
* **Interactive Settlement Allocation Tool**: Test real-time household dispatch between candidate sites with live budget and transit metrics.
* **Full Audit Trail & Methodology Expositions**: Complete mathematical formulas (`Safe_Cap = min(C_water, C_road, C_power, C_health, C_edu)`), data source registers (CWC, Survey of India, DJB, PWD, UDISE+), and tamper-evident event logs.
* **Official Report Generation**: Exportable high-resolution Executive Briefing Dossier with stamp of authority, methodology justification, and resource budgets.

---

## Tech Stack
* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS (Custom Indian Government Public Sector Palette)
* **Icons**: Lucide React
* **Maps**: Leaflet + React-Leaflet with OpenStreetMap Free Vector-aligned Tiles
* **Charts**: Recharts Data Visualizations
* **State Management**: Pure deterministic state engines with reactive calculation pipelines

---

## Local Development Setup

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm (v9.0.0 or higher)

### Run Locally
```bash
# 1. Clone or navigate to the repository
cd sih-relocation-platform

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
The application will be live at: `http://localhost:5173`

### Production Build
```bash
npm run build
```
Bundles the optimized static assets into the `dist/` directory with zero type errors.

---

## Cloud Deployment Guide

### Option 1: Vercel (Recommended — 1-Click)
1. Push this repository to GitHub or GitLab.
2. In [Vercel Dashboard](https://vercel.com), click **Add New Project** and import this repository.
3. Keep default settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included `vercel.json` automatically handles Single Page Application client-side routing.
5. Click **Deploy**.

### Option 2: Netlify
1. Connect your repository in [Netlify Dashboard](https://app.netlify.com).
2. Configure build settings:
   - **Base directory**: `/`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. The included `netlify.toml` automatically handles 200 SPA rewrites.
4. Click **Deploy Site**.

### Option 3: Render (Static Site)
1. In [Render Dashboard](https://dashboard.render.com), select **New > Static Site**.
2. Connect your Git repository.
3. Set:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**, add:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
5. Deploy.

---

## Institutional Authority & Alignment
* **Smart India Hackathon 2026**: Problem Statement 26191
* **Implementing Nodal Agency**: Delhi Disaster Management Authority (DDMA) & Trans-Yamuna Development Board
* **Academic & Innovation Anchor**: University School of Automation and Robotics (USAR), GGSIPU East Delhi Campus, Surajmal Vihar, Delhi 110092
