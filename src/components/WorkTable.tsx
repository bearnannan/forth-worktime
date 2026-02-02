'use client';
import { useStore } from '@/lib/store';
import { dictionaries } from '@/lib/dictionaries';
import { Card } from './ui/Primitive';

export default function WorkTable() {
    const { lang, data, otInputs, setOT } = useStore();
    const dict = dictionaries[lang];

    if (!data.length) return null;

    const locale = lang === 'th' ? 'th-TH' : 'en-US';
    const numberFormat = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const shortDayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short' });

    const getStatusBadge = (status: string) => {
        if (status === 'Weekend') return <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">{dict.statusWeekend}</span>;
        if (status === 'Holiday') return <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-rose-100 text-rose-700">{dict.statusHoliday}</span>;
        return <span className="text-slate-400">–</span>;
    };

    return (
        <Card className="print-section">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 print:bg-slate-100">
                        <tr>
                            <th className="px-3 py-2 text-left font-semibold text-slate-600 whitespace-nowrap">{dict.tableDate}</th>
                            <th className="px-3 py-2 text-left font-semibold text-slate-600 whitespace-nowrap">{dict.tableInOut}</th>
                            <th className="px-3 py-2 text-right font-semibold text-slate-600">{dict.tableNetHours}</th>
                            {['OT 1.0', 'OT 1.5', 'OT 2.0', 'OT 3.0'].map(h => (
                                <th key={h} className="px-3 py-2 text-center font-semibold text-slate-600">{h}</th>
                            ))}
                            <th className="px-3 py-2 text-center font-semibold text-slate-600">{dict.tableStatus}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {data.map((d) => {
                            const ot = otInputs[d.day] || {};
                            // Parse date for day name (DD.MM.YYYY)
                            const dateObj = new Date(d.date.split('.').reverse().join('-'));

                            return (
                                <tr key={d.date} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {d.date.substring(0, 5)}
                                        <span className="text-slate-500 ml-1.5">({shortDayFormat.format(dateObj)})</span>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">{d.inOut}</td>
                                    <td className={`px-3 py-2 text-right font-semibold ${d.netHours > 0 ? 'text-slate-800' : 'text-slate-400'}`}>
                                        {numberFormat.format(d.netHours)}
                                    </td>
                                    {(['o10', 'o15', 'o20', 'o30'] as const).map((rate) => (
                                        <td key={rate} className="px-1 sm:px-3 py-1 text-center">
                                            <input
                                                type="number"
                                                min="0" max="24" step="0.25"
                                                value={ot[rate] || ''}
                                                placeholder="0.00"
                                                onChange={(e) => {
                                                    let val = parseFloat(e.target.value);
                                                    if (isNaN(val)) val = 0;
                                                    setOT(d.day, rate, val);
                                                }}
                                                className="w-16 sm:w-20 rounded-md border border-slate-300 p-1.5 text-right outline-none focus:ring-2 focus:ring-violet-500/50 transition-shadow text-sm"
                                            />
                                        </td>
                                    ))}
                                    <td className="px-3 py-2 text-center">{getStatusBadge(d.status)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
