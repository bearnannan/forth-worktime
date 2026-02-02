'use client';
import { useStore } from '@/lib/store';
import { dictionaries } from '@/lib/dictionaries';
import { Card } from './ui/Primitive';
import { useMemo } from 'react';

export function OtSummary() {
    const { lang, data, otInputs } = useStore();
    const dict = dictionaries[lang];

    const totals = useMemo(() => {
        const t = { o10: 0, o15: 0, o20: 0, o30: 0 };
        Object.values(otInputs).forEach(day => {
            t.o10 += day.o10 || 0;
            t.o15 += day.o15 || 0;
            t.o20 += day.o20 || 0;
            t.o30 += day.o30 || 0;
        });
        return t;
    }, [otInputs]);

    if (!data.length) return null;

    return (
        <Card className="print-section">
            <h3 className="font-semibold mb-3">{dict.otSummaryTitle}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {(['o10', 'o15', 'o20', 'o30'] as const).map(k => (
                    <div key={k} className="rounded-xl border border-slate-200 p-3">
                        <div className="text-xs text-slate-500">OT {k.substring(1).replace(/(\d)(\d)/, '$1.$2')}</div>
                        <div className="text-2xl font-bold tabular-nums">
                            {totals[k].toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export function PayCalculator() {
    const { lang, data, otInputs, pay, setPay } = useStore();
    const dict = dictionaries[lang];

    const totals = useMemo(() => {
        const t = { o10: 0, o15: 0, o20: 0, o30: 0 };
        Object.values(otInputs).forEach(day => {
            t.o10 += day.o10 || 0;
            t.o15 += day.o15 || 0;
            t.o20 += day.o20 || 0;
            t.o30 += day.o30 || 0;
        });
        return t;
    }, [otInputs]);

    const effectiveRate = pay.baseHours > 0 ? pay.monthlySalary / pay.baseHours : 0;
    const payout = {
        p10: totals.o10 * 1.0 * effectiveRate,
        p15: totals.o15 * 1.5 * effectiveRate,
        p20: totals.o20 * 2.0 * effectiveRate,
        p30: totals.o30 * 3.0 * effectiveRate,
    };
    const totalPay = Object.values(payout).reduce((a, b) => a + b, 0);

    if (!data.length) return null;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

    return (
        <Card className="print-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Inputs */}
                <div>
                    <h3 className="font-semibold mb-3">{dict.payCalcTitle}</h3>
                    <div className="space-y-4">
                        <label className="block text-sm">
                            <span>{dict.monthlySalaryLabel}</span>
                            <input
                                type="number"
                                value={pay.monthlySalary || ''}
                                placeholder="30000"
                                onChange={(e) => setPay({ monthlySalary: parseFloat(e.target.value) || 0 })}
                                className="mt-1 w-full rounded-md border border-slate-300 p-2 text-right outline-none focus:ring-2 focus:ring-violet-500/50"
                            />
                        </label>
                        <label className="block text-sm">
                            <span>{dict.baseHoursLabel}</span>
                            <input
                                type="number"
                                value={pay.baseHours}
                                onChange={(e) => setPay({ baseHours: Math.max(1, parseFloat(e.target.value) || 1) })}
                                className="mt-1 w-full rounded-md border border-slate-300 p-2 text-right outline-none focus:ring-2 focus:ring-violet-500/50"
                            />
                        </label>
                        <div className="text-sm text-slate-600 pt-2">
                            <span>{dict.effectiveRateLabel}</span>
                            <div className="text-xl font-semibold text-indigo-700">฿ {formatCurrency(effectiveRate)}</div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div>
                    <h3 className="font-semibold mb-3">{dict.otPayoutTitle}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(payout).map(([k, val]) => (
                            <div key={k} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                <div className="text-xs text-slate-500">OT {k.substring(1).replace(/(\d)(\d)/, '$1.$2')}</div>
                                <div className="text-lg font-bold">฿ {formatCurrency(val)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-right">
                        <div className="text-sm text-slate-600">{dict.totalOtPayLabel}</div>
                        <div className="text-2xl font-bold text-emerald-600">฿ {formatCurrency(totalPay)}</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
