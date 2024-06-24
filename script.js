document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Hide the calculator container and show the overlay
    document.getElementById('calculator-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'flex';

    // Ensure the spinner and text are visible
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('loading-text').style.display = 'block';

    setTimeout(() => {
        const company = document.getElementById('company').value;
        const currentFee = parseFloat(document.getElementById('currentFee').value);
        const additionalFees = parseFloat(document.getElementById('additionalFees').value);
        const increaseRate = parseFloat(document.getElementById('increaseRate').value) / 100;
        const results = calculateFees(currentFee, additionalFees, increaseRate);

        let totalObligationFormatted = results.totalObligation.toLocaleString();

        let resultsHTML = `<div class="total-obligation">Your 30 year Legal Obligation with ${company} is <span class="amount">$${totalObligationFormatted}</span></div>`;
        
        resultsHTML += `<div class="breakdown-container"><table class="breakdown-table"><tbody>`;
        for (let i = 0; i < 15; i++) {
            resultsHTML += `<tr>
                <td>Year ${i + 1}: $${results.years[i].toLocaleString()}</td>
                <td>Year ${i + 16}: $${results.years[i + 15].toLocaleString()}</td>
            </tr>`;
        }
        resultsHTML += `</tbody></table></div>`;

        document.getElementById('results').innerHTML = resultsHTML;

        // Show results and hide loading spinner and text
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('loading-text').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('done-button').style.display = 'block';
    }, 4000); // Delay for 4 seconds to simulate spinner duration
});

document.getElementById('done-button').addEventListener('click', function() {
    // Reset form and results
    document.getElementById('calculator-form').reset();
    document.getElementById('results').innerHTML = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('done-button').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('calculator-container').style.display = 'block';
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
