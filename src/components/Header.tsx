'use client';
import { useStore } from '@/lib/store';
import { dictionaries } from '@/lib/dictionaries';
import { Button } from './ui/Primitive';
import { Printer } from 'lucide-react';
import ExportButton from './ExportButton';

export default function Header() {
    const { lang, setLang, data, busy } = useStore();
    const dict = dictionaries[lang];

    const handlePrint = () => {
        window.print();
    };

    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print mb-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">{dict.appTitle}</h1>
                <p className="text-slate-500 mt-1">{dict.appSubtitle}</p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-end sm:items-center gap-3">
                {/* Actions (Only visible if data loaded) */}
                {!busy && data.length > 0 && (
                    <div className="flex gap-2">
                        <ExportButton />
                        <Button onClick={handlePrint}>
                            <Printer className="w-5 h-5" />
                            {dict.printButton}
                        </Button>
                    </div>
                )}

                {/* Language Switcher */}
                <div className="flex items-center space-x-2 bg-white/50 p-1 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setLang('th')}
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${lang === 'th' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        TH
                    </button>
                    <button
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        EN
                    </button>
                </div>
            </div>
        </header>
    );
}
