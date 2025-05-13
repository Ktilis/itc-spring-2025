import { BarChart } from '@mui/x-charts/BarChart';

export const Graph = ({ population }) => {
  if (!Array.isArray(population)) {
    return null;
  }

  // TODO: ...
  return (
    <BarChart
      height={600}
      dataset={population}
      xAxis={[{
        dataKey:'year', 
        tickPlacement:'middle', 
        tickLabelPlacement:'middle',
        valueFormatter: String,
      }]}
      series={[{
        dataKey:'value', 
        tickPlacement:'middle', 
        tickLabelPlacement:'middle'
      }]}
    />
  )
}
