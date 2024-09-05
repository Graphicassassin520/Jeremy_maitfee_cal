document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear any previous error messages
    clearErrorMessages();

    const company = document.getElementById('company').value.trim();
    const currentFee = parseFloat(document.getElementById('currentFee').value);
    const additionalFees = parseFloat(document.getElementById('additionalFees').value);
    const increaseRate = parseFloat(document.getElementById('increaseRate').value) / 100;

    // Validate inputs
    if (!company) {
        displayErrorMessage('company', 'Ownership field cannot be empty.');
        return;
    }

    if (isNaN(currentFee) || currentFee < 0) {
        displayErrorMessage('currentFee', 'Please enter a valid non-negative number for the current annual maintenance fee.');
        return;
    }

    if (isNaN(additionalFees) || additionalFees < 0) {
        displayErrorMessage('additionalFees', 'Please enter a valid non-negative number for additional annual fees.');
        return;
    }

    if (isNaN(increaseRate) || increaseRate < 0 || increaseRate > 1) {
        displayErrorMessage('increaseRate', 'Please select a valid annual percentage increase between 0 and 10.');
        return;
    }

    // Hide the calculator container and show the overlay
    document.getElementById('calculator-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'flex';

    // Ensure the spinner and text are visible
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('loading-text').style.display = 'block';

    setTimeout(() => {
        const results = calculateFees(currentFee, additionalFees, increaseRate);

        let totalObligationFormatted = results.totalObligation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        let resultsHTML = `<div class="total-obligation">Your 30-year Legal Obligation with ${company} is <span class="amount">$${totalObligationFormatted}</span></div>`;
        
        resultsHTML += `<div class="breakdown-container"><table class="breakdown-table"><tbody>`;
        for (let i = 0; i < 15; i++) {
            resultsHTML += `<tr>
                <td>Year ${i + 1}: $${results.years[i].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>Year ${i + 16}: $${results.years[i + 15].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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

// Helper function to calculate fees
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

// Helper function to display error messages
function displayErrorMessage(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    inputElement.parentElement.appendChild(errorElement);
}

// Helper function to clear error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => errorMessage.remove());
}

// Real-time input validation
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
        clearErrorMessages();

        // Validate inputs dynamically
        if (input.id === 'currentFee' && (isNaN(input.value) || input.value < 0)) {
            displayErrorMessage('currentFee', 'Please enter a valid non-negative number for the current annual maintenance fee.');
        }

        if (input.id === 'additionalFees' && (isNaN(input.value) || input.value < 0)) {
            displayErrorMessage('additionalFees', 'Please enter a valid non-negative number for additional annual fees.');
        }

        if (input.id === 'increaseRate' && (input.value < 0 || input.value > 10)) {
            displayErrorMessage('increaseRate', 'Please select a valid annual percentage increase between 0 and 10.');
        }
    });
});
