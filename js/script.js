// Load data from CSV
Plotly.d3.csv("superheroes.csv", function(data) {
	// Filter data based on initial filters
	var filteredData = filterData(data, "All", "All");

	// Create trace for scatter plot
	var traceScatter = {
		x: filteredData.map(d => +d.Height),
		y: filteredData.map(d => +d.Weight),
		mode: "markers",
		marker: {
			size: filteredData.map(d => +d.Weight),
			color: filteredData.map(d => d.Gender === "Male" ? "blue" : "pink")
		},
		type: "scatter"
	};

	// Create trace for bar chart
	var traceBar = {
		x: ["Male", "Female"],
		y: [
			filteredData.filter(d => d.Gender === "Male").length,
			filteredData.filter(d => d.Gender === "Female").length
		],
		marker: {
			color: ["blue", "pink"]
		},
		type: "bar"
	};

	// Set layout for dashboard
	var layout = {
		grid: {
			rows: 1,
			columns: 2
		},
		template: {
			layout: {
				margin: {
					t: 20,
					b: 20,
					r: 20,
					l: 20
				}
			}
		},
		xaxis: {
			title: "Height (cm)"
		},
		yaxis: {
			title: "Weight (kg)"
		}
	};

	// Create dashboard with initial traces and layout
	Plotly.newPlot("plot", [traceScatter, traceBar], layout);

	// Add event listeners for filters
	document.getElementById("publisher").addEventListener("change", updateDashboard);
	document.getElementById("alignment").addEventListener("change", updateDashboard);

	// Update dashboard function
	function updateDashboard() {
		// Get selected values for filters
		var publisher = document.getElementById("publisher").value;
		var alignment = document.getElementById("alignment").value;

		// Filter data based on selected filters
		filteredData = filterData(data, publisher, alignment);

		// Update scatter plot trace
		Plotly.update("plot", {
			x: [filteredData.map(d => +d.Height)],
			y: [filteredData.map(d => +d.Weight)],
			marker: {
				size: filteredData.map(d => +d.Weight),
				color: filteredData.map(d => d.Gender === "Male" ? "blue" : "pink")
			}
		}, { 
			selector: ".scatter"
		});

		// Update bar chart trace
		Plotly.update("plot", {
			y: [
				filteredData.filter(d => d.Gender === "Male").length,
				filteredData.filter(d => d.Gender === "Female").length
			]
		}, { 
			selector: ".bar"
		});
	}

	// Filter data function
	function filterData(data, publisher, alignment) {
		// Filter based on publisher
		if (publisher !== "All") {
			data = data.filter(d => d.Publisher === publisher);
		}

		// Filter based on alignment
		if (alignment !== "All") {
			data = data.filter(d => d.Alignment === alignment);
		}

		return data;
	}
});
