import React,{forwardRef,useImperativeHandle} from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import Button from '@material-ui/core/Button';



const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const VerticalBar = forwardRef((props, ref) => {

  const [showGraph, setShowGraph] = React.useState(false);
  const [data, setData] = React.useState();

  useImperativeHandle(ref, () => {
    return {
      updateData: (data) =>   setData(data),
      setShowGraph: (show) =>   setShowGraph(show),

  }});


  return (
    <>
    { showGraph ? 
      <Bar data={data} options={options} />
      : ''
    }
    </>
  )
})

export default VerticalBar
