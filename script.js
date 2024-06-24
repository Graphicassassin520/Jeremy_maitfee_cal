document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading spinner
    document.getElementById('loading-spinner').style.display = 'block';

    // Hide buttons and results during calculation
    document.getElementById('print-button').style.display = 'none';
    document.getElementById('results').innerHTML = '';

    const currentFee = parseFloat(document.getElementById('currentFee').value);
    const additionalFees = parseFloat(document.getElementById('additionalFees').value);
    const increaseRate = parseFloat(document.getElementById('increaseRate').value) / 100;

    setTimeout(() => {
        const results = calculateFees(currentFee, additionalFees, increaseRate);

        let resultsHTML = `<div class="total-obligation"><span class="dollar-sign">$</span> Your Current 30 Year LEGAL OBLIGATION is $${results.totalObligation.toFixed(2)}</div>`;
        results.years.forEach((totalFee, year) => {
            resultsHTML += `<div class="result-year">Year ${year + 1}: $${totalFee.toFixed(2)}</div>`;
        });

        document.getElementById('results').innerHTML = resultsHTML;

        // Hide loading spinner and show buttons
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('print-button').style.display = 'block';
    }, 4000); // Delay for 4 seconds to simulate spinner duration
});

document.getElementById('print-button').addEventListener('click', function() {
    window.print();
});

function calculateFees(currentFee, additionalFees, increaseRate) {
    let totalObligation = 0;
    let years = [];

    for (let year = 0; year < 30; year++) {
        const annualIncrease = Math.pow(1 + increaseRate, year);
        const totalFee = (currentFee + additionalFees) * annualIncrease;
        totalObligation += totalFee;
        years.push(totalFee);
    }

    return { years, totalObligation };
}
