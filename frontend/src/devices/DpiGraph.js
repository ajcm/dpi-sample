import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import Button from '@material-ui/core/Button';

const _data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
    },
  ],
}

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

const VerticalBar = () => {

  const [data, setData] = React.useState();

  const updateData = () => {
    setData(_data)

  }



  return (
    <>
      <Bar data={data} options={options} />
      <Button onClick={updateData} > XX</Button>
    </>
  )
}

export default VerticalBar
