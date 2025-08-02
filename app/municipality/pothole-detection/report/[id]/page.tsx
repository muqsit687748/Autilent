import PotholeDetectionReport from '@/components/PotholeDetectionReport';

export default function PotholeDetectionReportPage({ params }: { params: { id: string } }) {
  return <PotholeDetectionReport id={params.id} />;
} 