import React, {FC} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
       /* title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },*/
    },
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

interface AdminChartProps {
    orders: any
}

const AdminChart:FC<AdminChartProps> = ({orders}) => {

    const statusArray = ['The order was created...',
        'In processing',
        'On the way',
        'Delivered']

    const [status1, status2, status3, status4] = statusArray


    const filtering = (value: string) => {
        return orders.filter((order: any) => order.orderStatus === value).length
    }




    const created = filtering(status1)
    const inProcessing = filtering(status2)
    const onTheWay = filtering(status3)
    const delivered = filtering(status4)

    const replacedStatusArray = [
        'Created',
        'In processing',
        'On the way',
        'Delivered'
    ]

    console.log(created)

    const data = {
        labels: replacedStatusArray,
        datasets: [
            {
                label: 'Order quantity',
                data: [created, inProcessing, onTheWay, delivered],
                backgroundColor: 'rgb(255, 99, 132)',
            },

        ],
    };

    return (
        <div className={`w-full max-w-[600px]`}>
            <div className={`p-1 shadow-md border border-slate-400 border-b-[3px] border-b-[#ad7140]`}>
                <h3>Orders</h3>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
};

export default AdminChart;