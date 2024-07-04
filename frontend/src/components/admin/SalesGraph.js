import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../App.css';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Componente que representa o gráfico de vendas
const SalesGraph = () => {
    // Dados a serem exibidos no gráfico
    const data = {
        labels: ["01/12", "02/12", "03/12", "04/12", "05/12", "06/12", "07/12", "08/12", "09/12", "10/12", "11/12", "12/12"],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: ["blue", "blue"],
                data: [55, 49, 44, 24, 15, 40, 20, 60, 36, 73, 15, 17],
                barThickness: 20,
                borderWidth: 1,
                borderRadius: 15,
                marginLeft: 5,
                marginRight: 5,
                CategoryPercentage: 0.5,
                
            },
            {
                label: 'Profit',
                backgroundColor: ["green", "green"],
                data: [50, 45, 40, 22, 10, 30, 21, 73, 63, 83, 31, 28],
                barThickness: 20,
                borderWidth: 1,
                borderRadius: 15,
                marginLeft: 5,
                marginRight: 5,
                CategoryPercentage: 0.5,

            }
        ]
    };

    // Opções de configuração do gráfico
    const options = {
        plugins: {
            legend: {
                display: true,
                font: {
                    size: 30,
                },
                
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Oculta a grid no eixo x
                },
            },
            y: {
                grid: {
                    display: false, // Oculta a grid no eixo y

                }
            }
        }
    };

    // Renderização do componente
    return (
        <div className='shadow' style={{ width: "100%", maxWidth: "900px", margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default SalesGraph;
