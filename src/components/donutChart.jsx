import { Card } from 'antd';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Direct", "Affiliate", "Sponsored", "E-mail"],
  datasets: [
    {
      label: "Total Sales",
      data: [300.56, 135.18, 154.02, 48.96],
      backgroundColor: ["#C6C7F8", "#BAEDBD", "#95A4FC", "#B1E3FF"],
      borderWidth: 0,
      borderRadius: 0, 
      cutout: "60%",    
      spacing: 0,       
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hide default legend
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((context.parsed / total) * 100).toFixed(1);
          return `${percentage}%`;
        }
      }
    },
    drawCircles: {
      id: 'drawCircles',
      afterUpdate(chart) {
        const arcs = chart.getDatasetMeta(0).data;
        arcs.forEach((arc) => {
          arc.round = {
            x: (chart.chartArea.left + chart.chartArea.right) / 2,
            y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
            radius: (arc.outerRadius + arc.innerRadius) / 2,
            thickness: (arc.outerRadius - arc.innerRadius) / 2,
            backgroundColor: arc.options.backgroundColor,
          };
        });
      },
      afterDraw: (chart) => {
        const { ctx } = chart;
        chart.getDatasetMeta(0).data.forEach((arc) => {
          const endAngle = Math.PI / 2 - arc.endAngle;
          const startAngle = Math.PI / 2 - arc.startAngle;
          
          ctx.save();
          ctx.translate(arc.round.x, arc.round.y);
          ctx.fillStyle = arc.options.backgroundColor;
          
          // Draw circle at end angle
          ctx.beginPath();
          ctx.arc(
            arc.round.radius * Math.sin(endAngle),
            arc.round.radius * Math.cos(endAngle),
            arc.round.thickness,
            0,
            2 * Math.PI,
          );
          ctx.closePath();
          ctx.fill();
          
          // Draw circle at start angle
          ctx.beginPath();
          ctx.arc(
            arc.round.radius * Math.sin(startAngle),
            arc.round.radius * Math.cos(startAngle),
            arc.round.thickness,
            0,
            2 * Math.PI,
          );
          ctx.closePath();
          ctx.fill();
          
          ctx.restore();
        });
      },
    }
  },
  elements: {
    arc: {
      borderWidth: 0,
      borderRadius: 0, // Remove default borderRadius
      borderSkipped: false,
    }
  }
};

export default function SalesDonutChart() {
  const { colors } = useTheme();
  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const percentage = ((data.datasets[0].data[0] / total) * 100).toFixed(1);

  return (
    <Card className="rounded-xl min-w-[200px] h-full" style={{ backgroundColor: colors.cardBackgroundSecondary }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>Total Sales</h3>

      <div className="relative flex justify-center">
        <div className='w-[120px] h-[120px]'>
          <Doughnut data={data} options={options} />
        </div>

      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        {data.labels.map((label, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></span>
              <span style={{ color: colors.text }}>{label}</span>
            </div>
            <span className="font-medium" style={{ color: colors.text }}>
              ${data.datasets[0].data[index].toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

