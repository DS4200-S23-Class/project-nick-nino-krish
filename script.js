// Define the data for your bar chart
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: 'Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: 'rgba(54, 162, 235, 0.5)', // Set the background color for the bars
    borderColor: 'rgba(54, 162, 235, 1)', // Set the border color for the bars
    borderWidth: 1 // Set the border width for the bars
  }]
};

// Create a new bar chart instance and pass in the data
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: data
});
