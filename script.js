// Define the data for your bar chart
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sales',
    data: [1200, 1500, 1000, 2000, 1700, 2200, 1900],
    backgroundColor: 'rgba(54, 162, 235, 0.5)', // Set the background color for the bars
    borderColor: 'rgba(54, 162, 235, 1)', // Set the border color for the bars
    borderWidth: 1 // Set the border width for the bars
  }]
};

// Define the options for your bar chart
const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true // Start the y-axis at zero
      }
    }]
  }
};

// Create a new bar chart instance and pass in the data and options
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});
