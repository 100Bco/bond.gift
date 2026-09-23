import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { CatalogDetailPage, CollectionPage, SignaturePage } from '@/pages/CollectionPages';
import { ProcessPage } from '@/pages/ProcessPage';
import { ServiceDetailPage, ServiceHubPage } from '@/pages/ServicePages';
import { ProjectDetailPage, ProjectsPage } from '@/pages/ProjectPages';
import { CapabilitiesPage, CapabilityDetailPage } from '@/pages/CapabilityPages';
import { InsightDetailPage, InsightsPage } from '@/pages/InsightPages';
import { CareersPage, ContactPage, DocumentsPage, FaqPage, LegalPage, NotFoundPage } from '@/pages/UtilityPages';
import { KitDocumentPage, KitGate } from '@/pages/KitPages';

const queryClient = new QueryClient();

/* Sitemap và URL giữ nguyên như phiên bản trước; chỉ thay giao diện của từng route. */
function Router() {
  const [location] = useLocation();
  const isKitHost = window.location.hostname === 'kit.bond.vn';
  if (isKitHost && location === '/') return <KitGate />;
  if (isKitHost && location !== '/') return <KitDocumentPage />;
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/ve-bond" component={AboutPage} />
        <Route path="/bo-suu-tap" component={CollectionPage} />
        <Route path="/bo-suu-tap/signature" component={SignaturePage} />
        <Route path="/bo-suu-tap/:slug" component={CatalogDetailPage} />
        <Route path="/quy-trinh" component={ProcessPage} />
        <Route path="/qua-tang" component={() => <ServiceHubPage type="gift" />} />
        <Route path="/qua-tang/:slug" component={() => <ServiceDetailPage kind="gift" />} />
        <Route path="/bao-bi" component={() => <ServiceHubPage type="packaging" />} />
        <Route path="/bao-bi/:slug" component={() => <ServiceDetailPage kind="packaging" />} />
        <Route path="/vat-pham" component={() => <ServiceHubPage type="merchandise" />} />
        <Route path="/vat-pham/:slug" component={() => <ServiceDetailPage kind="merchandise" />} />
        <Route path="/du-an" component={ProjectsPage} />
        <Route path="/du-an/:slug" component={ProjectDetailPage} />
        <Route path="/nang-luc" component={CapabilitiesPage} />
        <Route path="/nang-luc/:slug" component={CapabilityDetailPage} />
        <Route path="/goc-nhin" component={InsightsPage} />
        <Route path="/goc-nhin/:slug" component={InsightDetailPage} />
        <Route path="/lien-he" component={ContactPage} />
        <Route path="/tai-lieu" component={DocumentsPage} />
        <Route path="/cau-hoi-thuong-gap" component={FaqPage} />
        <Route path="/tuyen-dung" component={CareersPage} />
        <Route path="/chinh-sach-bao-mat" component={() => <LegalPage kind="privacy" />} />
        <Route path="/dieu-khoan" component={() => <LegalPage kind="terms" />} />
        <Route path="/kit" component={KitGate} />
        <Route path="/kit/ho-so-nang-luc" component={KitDocumentPage} />
        <Route path="/kit/bang-gia" component={KitDocumentPage} />
        <Route path="/kit/bo-suu-tap-day-du" component={KitDocumentPage} />
        <Route path="/kit/mau-hop-dong" component={KitDocumentPage} />
        <Route path="/kit/tai-lieu-ban-hang" component={KitDocumentPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
