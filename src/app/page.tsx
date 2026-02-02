'use client';
import { useStore } from '@/lib/store';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import WorkTable from '@/components/WorkTable';
import { OtSummary, PayCalculator } from '@/components/Summary';
import WorkChart from '@/components/Chart';
import { Card } from '@/components/ui/Primitive';

export default function Home() {
  const { lang, data, monthIdx, year } = useStore();
  const dict = dictionaries[lang];

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 min-h-screen pb-12">
      {/* Print Header */}
      <div className="hidden print:block border-b border-slate-200 pb-2 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">WorkTime Analyzer - Monthly Report</h1>
          <p className="text-sm text-slate-600">
            {new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())}
          </p>
        </div>
      </div>

      <Header />

      <FileUploader />

      {data.length > 0 && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Report Summary Card */}
          <Card className="print-section">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm text-slate-500">{dict.reportMonthHeader}</div>
                <div className="text-xl font-semibold">
                  {monthIdx !== null && year ? new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-US', { month: 'long', year: 'numeric' }).format(new Date(year, monthIdx)) : '–'}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm text-slate-500">{dict.totalNetHoursHeader}</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(data.reduce((sum, d) => sum + d.netHours, 0))}
                  <span className="text-lg font-medium text-slate-600 ml-1">Hrs</span>
                </div>
              </div>
            </div>
          </Card>

          <OtSummary />

          <PayCalculator />

          <WorkTable />

          <WorkChart />

        </section>
      )}

      <footer className="text-center text-xs text-slate-400 mt-12 no-print">
        <p>{dict.footerText}</p>
        <p className="mt-1 opacity-60">Powered by Next.js & Firebase</p>
      </footer>
    </main>
  );
}
