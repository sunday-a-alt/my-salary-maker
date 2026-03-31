export interface PayslipData {
  // Employee Info
  empCode: string;
  empName: string;
  designation: string;
  doj: string;
  pan: string;
  department: string;
  location: string;

  // Right column info
  uanNo: string;
  pfNo: string;
  esiNo: string;
  bankName: string;
  accountNo: string;

  // Hours/Days
  stdDays: string;
  wrkDays: string;
  lopDays: string;
  previousLopDays: string;
  lopReversalDays: string;
  ndHours: string;
  utHours: string;
  otHours: string;
  nationalHolidayPayHours: string;
  supplimentaryPayHours: string;
  publicHolidayPayHours: string;
  newJoinerArrearDays: string;
  plEncashmentDays: string;
  prevOvertimePayHours: string;
  prevSupplimentaryPayHours: string;
  prevUtAndTardinessDedn: string;
  prevPublicHolidayPayHours: string;
  prevUtAndTardinessRevHr: string;
  prevNationalHolidayPayHour: string;
  managementLevel: string;

  // Month/Year
  month: string;
  year: string;

  // Earnings
  basicPayMaster: string;
  basicPay: string;
  basicPayYtd: string;
  hraMaster: string;
  hra: string;
  hraYtd: string;
  bonusMaster: string;
  bonus: string;
  bonusYtd: string;
  otherAllowancesMaster: string;
  otherAllowances: string;
  otherAllowancesYtd: string;
  nationalHolidayPay: string;
  nationalHolidayPayYtd: string;
  publicHolidayPay: string;
  publicHolidayPayYtd: string;
  referralBonus: string;
  referralBonusYtd: string;
  undertimeDeduct: string;
  undertimeDeductYtd: string;

  // Deductions
  providentFund: string;
  providentFundYtd: string;
  labourWelfareFund: string;
  labourWelfareFundYtd: string;
  professionalTax: string;
  professionalTaxYtd: string;

  // Net
  amountInWords: string;
}
