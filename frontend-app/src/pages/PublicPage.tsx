import MapSection from "../views/PublicPage/MapSection";
import QuoteSection from "../views/PublicPage/QuoteSection";
import HeaderSection from "../views/PublicPage/HeaderSection";
import ChartSection from "../views/PublicPage/DeliveryChartSection";

const PublicPage: React.FC = () => {
  return (
    <>
      <HeaderSection />

      <ChartSection />

      <QuoteSection />

      <MapSection />
    </>
  );
};

export default PublicPage;
