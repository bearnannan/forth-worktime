'use client';

import { useStore } from '@/lib/store';
import { dictionaries } from '@/lib/dictionaries';
import { Card } from './ui/Primitive';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function WorkChart() {
    const { lang, data } = useStore();
    const dict = dictionaries[lang];

    const chartData = useMemo(() => {
        const workingDays = data.filter(d => d.netHours > 0);
        return {
            labels: workingDays.map(d => d.day),
            datasets: [
                {
                    label: dict.tableNetHours,
                    data: workingDays.map(d => d.netHours),
                    backgroundColor: 'rgba(79, 70, 229, 0.6)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [data, dict.tableNetHours]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: dict.chartTitle },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: dict.tableNetHours.split(' ')[0] }
            },
            x: { title: { display: true, text: dict.tableDate } }
        }
    };

    if (!data.length) return null;

    return (
        <Card className="no-print h-[350px]">
            <Bar options={options} data={chartData} />
        </Card>
    );
}
