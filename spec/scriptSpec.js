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

    it("should return 0 total obligation when all fees are 0", function() {
        const currentFee = 0;
        const additionalFees = 0;
        const increaseRate = 0;

        const result = calculateFees(currentFee, additionalFees, increaseRate);

        expect(result.totalObligation).toBe(0);
        expect(result.years.every(year => year === 0)).toBe(true);
    });

    it("should handle negative values gracefully", function() {
        const currentFee = -1000;
        const additionalFees = 500;
        const increaseRate = 0.05;

        const result = calculateFees(currentFee, additionalFees, increaseRate);

        expect(result.totalObligation).toBeLessThan(0);
        expect(result.years[0]).toBeCloseTo(-500, 2);
    });

    it("should calculate fees correctly when increase rate is at maximum boundary", function() {
        const currentFee = 1000;
        const additionalFees = 500;
        const increaseRate = 1; // 100% increase rate

        const result = calculateFees(currentFee, additionalFees, increaseRate);

        expect(result.totalObligation).toBeGreaterThan(300000); // Arbitrary high number due to 100% increase each year
        expect(result.years[1]).toBeCloseTo(3000, 2);
        expect(result.years[29]).toBeGreaterThan(500000);
    });
});
