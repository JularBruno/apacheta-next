"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import HistoryTable from '@/app/ui/dashboard/history-table';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {
    
    const data = {
        datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 bg-white">
            <div className='h-60 p-4 w-full flex justify-center align-middle text-center items-center'>
                <Doughnut data={data} />
            </div>

            <div className='text-black'>
                <HistoryTable/>
            </div>
        </div>
    );
} 