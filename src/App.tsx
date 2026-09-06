import React, { useState, useEffect } from 'react';
import { 
  CANDIDATE_SITES_DATA, 
  RED_ZONE_VERSIONS 
} from './data/delhiData';
import { SCENARIOS, DisasterScenario } from './data/scenariosData';
import { solveCapacityConstrainedAllocation } from './engine/matchingEngine';
import { ActiveTab, AiAssessmentBatchResponse, Settlement } from './types';
import { fetchAiRiskAssessments } from './services/aiAssessmentService';

// Layout Components
import { Header } from './components/layout/Header';
import { GuidedTour, TOUR_STEPS } from './components/layout/GuidedTour';

// Module Views
import { OverviewModule } from './components/modules/OverviewModule';
import { MultiHazardModule } from './components/modules/MultiHazardModule';
import { RedZoneModule } from './components/modules/RedZoneModule';
import { SettlementsModule } from './components/modules/SettlementsModule';
import { PriorityModule } from './components/modules/PriorityModule';
import { CandidateSitesModule } from './components/modules/CandidateSitesModule';
import { CarryingCapacityModule } from './components/modules/CarryingCapacityModule';
import { AllocationModule } from './components/modules/AllocationModule';
import { RecommendationsModule } from './components/modules/RecommendationsModule';
import { AuditMethodologyModule } from './components/modules/AuditMethodologyModule';

// Modals
import { OfficialReportModal } from './components/modals/OfficialReportModal';
import { DataIngestionModal } from './components/modals/DataIngestionModal';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [redZoneVersionKey, setRedZoneVersionKey] = useState<'v1.0-2024' | 'v2.0-2025'>('v2.0-2025');
  
  // Live Scenario & Dynamic Settlements State
  const [activeScenarioId, setActiveScenarioId] = useState<string>('baseline');
  const [settlements, setSettlements] = useState<Settlement[]>(
    () => JSON.parse(JSON.stringify(SCENARIOS['baseline'].settlements))
  );

  const [selectedSettlementId, setSelectedSettlementId] = useState<string | null>('SET-01');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>('SITE-01');
  
  // Guided Demo Mode state
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isIngestionModalOpen, setIsIngestionModalOpen] = useState<boolean>(false);

  // AI-Assisted Relocation Priority Engine state
  const [aiAssessment, setAiAssessment] = useState<AiAssessmentBatchResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(true);

  // Active Scenario Metadata
  const activeScenario: DisasterScenario = SCENARIOS[activeScenarioId] || {
    id: 'custom',
    name: 'Live Custom Feed Scenario',
    shortTitle: 'Custom Ingested Feed',
    badge: 'Live Data Ingestion',
    waterLevelMeters: 206.50,
    hathnikundDischargeCusecs: 210000,
    severity: 'Severe',
    incidentSummary: 'Active custom scenario with user-injected habitation data evaluated in real-time.',
    keyHydrologicalTriggers: ['Custom surveyed habitations added to live decision stream'],
    settlements
  };

  // Initial load of AI assessment
  useEffect(() => {
    let isMounted = true;
    fetchAiRiskAssessments(settlements)
      .then((res) => {
        if (isMounted) {
          setAiAssessment(res);
          setIsLoadingAi(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoadingAi(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Scenario Switching
  const handleSelectScenario = async (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    const sc = SCENARIOS[scenarioId];
    if (sc) {
      const newSettlements: Settlement[] = JSON.parse(JSON.stringify(sc.settlements));
      setSettlements(newSettlements);
      setSelectedSettlementId(newSettlements[0]?.id || null);

      // Auto-trigger Gemini AI evaluation on the new scenario!
      setIsLoadingAi(true);
      try {
        const res = await fetchAiRiskAssessments(newSettlements, true);
        setAiAssessment(res);
      } finally {
        setIsLoadingAi(false);
      }
    }
  };

  // Handle Ingestion of New Settlement
  const handleAddCustomSettlement = async (newSettlement: Settlement) => {
    const updated = [...settlements, newSettlement];
    setSettlements(updated);
    setSelectedSettlementId(newSettlement.id);
    setActiveScenarioId('custom');

    // Auto-trigger Gemini AI evaluation for the newly ingested data!
    setIsLoadingAi(true);
    try {
      const res = await fetchAiRiskAssessments(updated, true);
      setAiAssessment(res);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Handle Reset to Baseline
  const handleResetToBaseline = async () => {
    setActiveScenarioId('baseline');
    const baseline: Settlement[] = JSON.parse(JSON.stringify(SCENARIOS['baseline'].settlements));
    setSettlements(baseline);
    setSelectedSettlementId(baseline[0]?.id || null);

    setIsLoadingAi(true);
    try {
      const res = await fetchAiRiskAssessments(baseline, true);
      setAiAssessment(res);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleReassess = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetchAiRiskAssessments(settlements, true);
      setAiAssessment(res);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const activeRedZoneVersion = RED_ZONE_VERSIONS[redZoneVersionKey];
  
  // Matching solver dynamically recalculates whenever settlements state changes!
  const matchingResult = solveCapacityConstrainedAllocation(settlements, CANDIDATE_SITES_DATA);

  const handleToggleDemoMode = () => {
    if (isDemoMode) {
      setIsDemoMode(false);
    } else {
      setIsDemoMode(true);
      setDemoStep(1);
      setActiveTab(TOUR_STEPS[0].tab);
    }
  };

  const handleNextDemoStep = () => {
    if (demoStep < TOUR_STEPS.length) {
      const next = demoStep + 1;
      setDemoStep(next);
      setActiveTab(TOUR_STEPS[next - 1].tab);
    } else {
      setIsDemoMode(false);
    }
  };

  const handlePrevDemoStep = () => {
    if (demoStep > 1) {
      const prev = demoStep - 1;
      setDemoStep(prev);
      setActiveTab(TOUR_STEPS[prev - 1].tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Header with Scenario Controls */}
      <Header
        currentRedZoneVersion={activeRedZoneVersion}
        onToggleDemoMode={handleToggleDemoMode}
        isDemoMode={isDemoMode}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeScenario={activeScenario}
        onSelectScenario={handleSelectScenario}
        onOpenIngestionModal={() => setIsIngestionModalOpen(true)}
      />

      {/* 2. Guided Tour Stepper Banner (when demo mode active) */}
      {isDemoMode && (
        <GuidedTour
          currentStep={demoStep}
          totalSteps={TOUR_STEPS.length}
          onNextStep={handleNextDemoStep}
          onPrevStep={handlePrevDemoStep}
          onExitTour={() => setIsDemoMode(false)}
          onJumpToTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* 3. Main Operational Workspace (Full Width) */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto overflow-hidden">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50 w-full">
          {activeTab === 'overview' && (
            <OverviewModule
              settlements={settlements}
              candidateSites={CANDIDATE_SITES_DATA}
              activeRedZoneVersion={activeRedZoneVersion}
              assignments={matchingResult.assignments}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectSettlement={(id) => setSelectedSettlementId(id)}
              onSelectSite={(id) => setSelectedSiteId(id)}
              selectedSettlementId={selectedSettlementId}
              selectedSiteId={selectedSiteId}
            />
          )}

          {activeTab === 'hazard' && (
            <MultiHazardModule 
              settlements={settlements}
              activeScenario={activeScenario}
            />
          )}

          {activeTab === 'redzone' && (
            <RedZoneModule
              currentVersion={activeRedZoneVersion}
              onSelectVersion={(v) => setRedZoneVersionKey(v)}
            />
          )}

          {activeTab === 'settlements' && (
            <SettlementsModule
              settlements={settlements}
              selectedSettlementId={selectedSettlementId}
              onSelectSettlement={(id) => setSelectedSettlementId(id)}
            />
          )}

          {activeTab === 'priority' && (
            <PriorityModule
              settlements={settlements}
              aiAssessment={aiAssessment}
              isLoadingAi={isLoadingAi}
              onReassess={handleReassess}
            />
          )}

          {activeTab === 'candidates' && (
            <CandidateSitesModule
              candidateSites={CANDIDATE_SITES_DATA}
              selectedSiteId={selectedSiteId}
              onSelectSite={(id) => setSelectedSiteId(id)}
              onNavigateToCapacity={() => setActiveTab('capacity')}
            />
          )}

          {activeTab === 'capacity' && (
            <CarryingCapacityModule
              candidateSites={CANDIDATE_SITES_DATA}
              selectedSiteId={selectedSiteId}
              onSelectSite={(id) => setSelectedSiteId(id)}
            />
          )}

          {activeTab === 'allocation' && (
            <AllocationModule
              settlements={settlements}
              candidateSites={CANDIDATE_SITES_DATA}
              assignments={matchingResult.assignments}
              onSelectSettlement={(id) => setSelectedSettlementId(id)}
              onSelectSite={(id) => setSelectedSiteId(id)}
            />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsModule
              settlements={settlements}
              candidateSites={CANDIDATE_SITES_DATA}
              assignments={matchingResult.assignments}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {activeTab === 'audit' && (
            <AuditMethodologyModule />
          )}
        </main>
      </div>

      {/* 4. Live Data Ingestion & Disaster Scenario Modal */}
      <DataIngestionModal
        isOpen={isIngestionModalOpen}
        onClose={() => setIsIngestionModalOpen(false)}
        activeScenarioId={activeScenarioId}
        onSelectScenario={handleSelectScenario}
        onAddCustomSettlement={handleAddCustomSettlement}
        onResetToBaseline={handleResetToBaseline}
        activeSettlementsCount={settlements.length}
      />

      {/* 5. Official Report Export Modal */}
      <OfficialReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        settlements={settlements}
        candidateSites={CANDIDATE_SITES_DATA}
        assignments={matchingResult.assignments}
        redZoneVersion={activeRedZoneVersion}
      />
    </div>
  );
}

export default App;
