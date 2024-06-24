document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Hide the calculator container and show the overlay
    document.getElementById('calculator-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'flex';

    setTimeout(() => {
        const company = document.getElementById('company').value;
        const currentFee = parseFloat(document.getElementById('currentFee').value);
        const additionalFees = parseFloat(document.getElementById('additionalFees').value);
        const increaseRate = parseFloat(document.getElementById('increaseRate').value) / 100;
        const results = calculateFees(currentFee, additionalFees, increaseRate);

        let totalObligationFormatted = results.totalObligation.toLocaleString();

        let resultsHTML = `<div class="total-obligation">Your 30 year Legal Obligation with ${company} is <span class="amount">$${totalObligationFormatted}</span></div>`;
        document.getElementById('results').innerHTML = resultsHTML;

        // Show results and hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('loading-text').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('done-button').style.display = 'block';

        document.getElementById('done-button').addEventListener('click', function() {
            // Reset form and results
            document.getElementById('calculator-form').reset();
            document.getElementById('results').innerHTML = '';
            document.getElementById('results').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('calculator-container').style.display = 'block';
        });
    }, 4000); // Delay for 4 seconds to simulate spinner duration
});

function calculateFees(currentFee, additionalFees, increaseRate) {
    let totalObligation = 0;

    for (let year = 0; year < 30; year++) {
        const annualIncrease = Math.pow(1 + increaseRate, year);
        const totalFee = (currentFee + additionalFees) * annualIncrease;
        totalObligation += totalFee;
    }

    return { totalObligation };
}
