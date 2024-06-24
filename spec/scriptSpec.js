describe("calculateFees", function() {
    it("should calculate the fees correctly for a 0% increase rate", function() {
        const currentFee = 1000;
        const additionalFees = 500;
        const increaseRate = 0;

        const result = calculateFees(currentFee, additionalFees, increaseRate);

        expect(result.totalObligation).toBeCloseTo(45000, 2);
        expect(result.years[0]).toBeCloseTo(1500, 2);
        expect(result.years[29]).toBeCloseTo(1500, 2);
    });

    it("should calculate the fees correctly for a 5% increase rate", function() {
        const currentFee = 1000;
        const additionalFees = 500;
        const increaseRate = 0.05;

        const result = calculateFees(currentFee, additionalFees, increaseRate);

        expect(result.totalObligation).toBeGreaterThan(99000);
        expect(result.years[0]).toBeCloseTo(1500, 2);
        expect(result.years[29]).toBeGreaterThan(6000);
    });
});
