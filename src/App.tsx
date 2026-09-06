import React, { useState } from 'react';
import { 
  SETTLEMENTS_DATA, 
  CANDIDATE_SITES_DATA, 
  RED_ZONE_VERSIONS 
} from './data/wayanadData';
import { solveCapacityConstrainedAllocation } from './engine/matchingEngine';
import { ActiveTab } from './types';

// Layout Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
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

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [redZoneVersionKey, setRedZoneVersionKey] = useState<'v1.0-2025' | 'v2.0-2026'>('v2.0-2026');
  
  const [selectedSettlementId, setSelectedSettlementId] = useState<string | null>('SET-01');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>('SITE-01');
  
  // Guided Demo Mode state
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Official Report Modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const activeRedZoneVersion = RED_ZONE_VERSIONS[redZoneVersionKey];
  
  // Matching solver execution
  const matchingResult = solveCapacityConstrainedAllocation(SETTLEMENTS_DATA, CANDIDATE_SITES_DATA);

  const totalVulnerablePop = SETTLEMENTS_DATA.reduce((sum, s) => sum + s.population, 0);
  const totalSafeCapacityHH = CANDIDATE_SITES_DATA.reduce((sum, s) => sum + s.calculatedCapacity.netSafeAbsorptionCapacityHH, 0);
  const immediateCount = SETTLEMENTS_DATA.filter(s => s.priority === 'Immediate').length;

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
    <div className="min-h-screen bg-gov-darkest text-gov-text flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Header */}
      <Header
        currentRedZoneVersion={activeRedZoneVersion}
        onToggleDemoMode={handleToggleDemoMode}
        isDemoMode={isDemoMode}
        onOpenReportModal={() => setIsReportModalOpen(true)}
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

      {/* 3. Main Operational Workspace */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto overflow-hidden">
        {/* Left Sidebar Nav */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (isDemoMode) {
              const matchedStep = TOUR_STEPS.findIndex(s => s.tab === tab);
              if (matchedStep !== -1) setDemoStep(matchedStep + 1);
            }
          }}
          immediateCount={immediateCount}
          totalVulnerablePop={totalVulnerablePop}
          totalSafeCapacityHH={totalSafeCapacityHH}
        />

        {/* Central View Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gov-darkest">
          {activeTab === 'overview' && (
            <OverviewModule
              settlements={SETTLEMENTS_DATA}
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
            <MultiHazardModule />
          )}

          {activeTab === 'redzone' && (
            <RedZoneModule
              currentVersion={activeRedZoneVersion}
              onSelectVersion={(v) => setRedZoneVersionKey(v)}
            />
          )}

          {activeTab === 'settlements' && (
            <SettlementsModule
              settlements={SETTLEMENTS_DATA}
              selectedSettlementId={selectedSettlementId}
              onSelectSettlement={(id) => setSelectedSettlementId(id)}
            />
          )}

          {activeTab === 'priority' && (
            <PriorityModule
              settlements={SETTLEMENTS_DATA}
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
              settlements={SETTLEMENTS_DATA}
              candidateSites={CANDIDATE_SITES_DATA}
              assignments={matchingResult.assignments}
              onSelectSettlement={(id) => setSelectedSettlementId(id)}
              onSelectSite={(id) => setSelectedSiteId(id)}
            />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsModule
              settlements={SETTLEMENTS_DATA}
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

      {/* 4. Official Report Export Modal */}
      <OfficialReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        settlements={SETTLEMENTS_DATA}
        candidateSites={CANDIDATE_SITES_DATA}
        assignments={matchingResult.assignments}
        redZoneVersion={activeRedZoneVersion}
      />
    </div>
  );
}

export default App;
