
const TAX_RATES = [
    { min: 0, max: 24587, rate: 0.1, deductible: 0 },
    { min: 24588, max: 87424, rate: 0.15, deductible: 2458.70 },
    { min: 87425, max: 174848, rate: 0.2, deductible: 8777 },
    { min: 174849, max: 337000, rate: 0.25, deductible: 19245 },
    { min: 337001, max: Infinity, rate: 0.3, deductible: 46905 }
  ];

  const NHIF_RATES = [
    { min: 0, max: 5999, amount: 150 },
    { min: 6000, max: 7999, amount: 300 },
    { min: 8000, max: 11999, amount: 400 },
    { min: 12000, max: 14999, amount: 500 },
    { min: 15000, max: 19999, amount: 600 },
    { min: 20000, max: 24999, amount: 750 },
    { min: 25000, max: 29999, amount: 850 },
    { min: 30000, max: 34999, amount: 900 },
    { min: 35000, max: 39999, amount: 950 },
    { min: 40000, max: 44999, amount: 1000 },
    { min: 45000, max: 49999, amount: 1100 },
    { min: 50000, max: 59999, amount: 1200 },
    { min: 60000, max: 69999, amount: 1300 },
    { min: 70000, max: 79999, amount: 1400 },
    { min: 80000, max: 89999, amount: 1500 },
    { min: 90000, max: 99999, amount: 1600 },
    { min: 100000, max: Infinity, amount: 1700 }
  ];

  const NSSF_RATE = 0.06;


  function calculatePAYE(grossSalary) {
    let tax = 0;
    let taxableIncome = grossSalary;

    for (const rate of TAX_RATES) {
      if (taxableIncome <= 0) break;

      const taxableAmount = Math.min(rate.max - rate.min, taxableIncome);
      tax += taxableAmount * rate.rate - rate.deductible;
      taxableIncome -= taxableAmount;
    }

    return Math.max(0, tax);
  }


  function calculateNHIF(grossSalary) {
    for (const rate of NHIF_RATES) {
      if (grossSalary >= rate.min && grossSalary <= rate.max) {
        return rate.amount;
      }
    }

    return 0;
  }


  function calculateNSSF(grossSalary) {
    return grossSalary * NSSF_RATE;
  }


  function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const payee = calculatePAYE(grossSalary);
    const nhifDeductions = calculateNHIF(grossSalary);
    const nssfDeductions = calculateNSSF(grossSalary);
    const netSalary = grossSalary - payee - nhifDeductions - nssfDeductions;

    return {
      grossSalary,
      payee,
      nhifDeductions,
      nssfDeductions,
      netSalary
    };
  }



