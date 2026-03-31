import { forwardRef, useMemo } from "react";
import type { PayslipData } from "@/types/payslip";
import taskusLogo from "@/assets/taskus-logo.png";

const fmt = (v: string) => {
  const n = parseFloat(v);
  if (isNaN(n)) return v || "0.00";
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const sum = (...vals: string[]) => vals.reduce((a, v) => a + (parseFloat(v) || 0), 0);

interface Props { data: PayslipData }

const PayslipPreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const grossEarningsMaster = useMemo(() => sum(
    data.basicPayMaster, data.hraMaster, data.bonusMaster, data.otherAllowancesMaster
  ), [data.basicPayMaster, data.hraMaster, data.bonusMaster, data.otherAllowancesMaster]);

  const grossEarnings = useMemo(() => sum(
    data.basicPay, data.hra, data.bonus, data.otherAllowances,
    data.nationalHolidayPay, data.publicHolidayPay, data.referralBonus, data.undertimeDeduct
  ), [data.basicPay, data.hra, data.bonus, data.otherAllowances,
    data.nationalHolidayPay, data.publicHolidayPay, data.referralBonus, data.undertimeDeduct]);

  const grossEarningsYtd = useMemo(() => sum(
    data.basicPayYtd, data.hraYtd, data.bonusYtd, data.otherAllowancesYtd,
    data.nationalHolidayPayYtd, data.publicHolidayPayYtd, data.referralBonusYtd, data.undertimeDeductYtd
  ), [data.basicPayYtd, data.hraYtd, data.bonusYtd, data.otherAllowancesYtd,
    data.nationalHolidayPayYtd, data.publicHolidayPayYtd, data.referralBonusYtd, data.undertimeDeductYtd]);

  const grossDeduction = useMemo(() => sum(
    data.providentFund, data.labourWelfareFund, data.professionalTax
  ), [data.providentFund, data.labourWelfareFund, data.professionalTax]);

  const grossDeductionYtd = useMemo(() => sum(
    data.providentFundYtd, data.labourWelfareFundYtd, data.professionalTaxYtd
  ), [data.providentFundYtd, data.labourWelfareFundYtd, data.professionalTaxYtd]);

  const netTransfer = grossEarnings - grossDeduction;

  const cellStyle = "border border-black px-2 py-1 text-[11px]";
  const boldCell = `${cellStyle} font-bold`;
  const rightCell = `${cellStyle} text-right`;
  const boldRightCell = `${boldCell} text-right`;

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthName = months[parseInt(data.month) - 1] || data.month;

  return (
    <div ref={ref} className="bg-white text-black p-6" style={{ width: "794px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1">
          <p className="font-bold text-[12px] leading-tight">TaskUS India Private Limited</p>
          <p className="text-[9px] leading-tight">
            Reg. Office: 18th & 19th floor, Tower-9, Gigaplex IT Park, MIDC, Plot No 1 I.T.5, Airoli Knowledge Park Road,
            TTC Industrial Area, Airoli, Navi Mumbai, Maharashtra – 400708, India
          </p>
          <p className="font-bold text-[11px] mt-1">Pay Slip for the Month of {monthName} {data.year}</p>
        </div>
        <img src={taskusLogo} alt="TaskUs" className="h-10 ml-4" />
      </div>

      {/* Employee Details + Hours/Days */}
      <table className="w-full border-collapse border border-black mt-2">
        <tbody>
          {[
            [["EMPCODE", data.empCode], ["UAN NO", data.uanNo]],
            [["EMP NAME", data.empName], ["PF NO", data.pfNo]],
            [["DESIGNATION", data.designation], ["ESI NO", data.esiNo]],
            [["DOJ", data.doj], ["STD DAYS", data.stdDays]],
            [["PAN", data.pan], ["WRKDAYS", data.wrkDays]],
            [["DEPARTMENT", data.department], ["LOP DAYS", data.lopDays]],
            [["LOCATION", data.location], ["BANK NAME", data.bankName]],
            [["PREVIOUS LOP DAYS", data.previousLopDays], ["ACCOUNT NO", data.accountNo]],
            [["ND HOURS", data.ndHours], ["LOP REVERSAL DAYS", data.lopReversalDays]],
            [["UT HOURS", data.utHours], ["OT HOURS", data.otHours]],
            [["NATIONAL HOLIDAY PAY HOURS", data.nationalHolidayPayHours], ["SUPPLIMENTARY PAY HOURS", data.supplimentaryPayHours]],
            [["PUBLIC HOLIDAY PAY HOURS", data.publicHolidayPayHours], ["NEW JOINER ARREAR DAYS", data.newJoinerArrearDays]],
            [["PL ENCASHMENT DAYS", data.plEncashmentDays], ["PREV OVERTIME PAY HOURS", data.prevOvertimePayHours]],
            [["PREV SUPPLIMENTARY PAY HOURS", data.prevSupplimentaryPayHours], ["PREV UT AND TARDINESS DEDN", data.prevUtAndTardinessDedn]],
            [["PREV PUBLIC HOLIDAY PAY HOURS", data.prevPublicHolidayPayHours], ["PREV UT AND TARDINESS REV HR", data.prevUtAndTardinessRevHr]],
            [["PREV NATIONAL HOLIDAY PAY HOUR", data.prevNationalHolidayPayHour], ["MANAGEMENT LEVEL", data.managementLevel]],
          ].map((row, i) => (
            <tr key={i}>
              <td className={boldCell} style={{ width: "25%" }}>{row[0][0]}</td>
              <td className={cellStyle} style={{ width: "25%" }}>{row[0][1]}</td>
              <td className={boldCell} style={{ width: "25%" }}>{row[1][0]}</td>
              <td className={cellStyle} style={{ width: "25%" }}>{row[1][1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Earnings & Deductions */}
      <table className="w-full border-collapse border border-black mt-0">
        <thead>
          <tr>
            <td className={boldCell} style={{ width: "22%" }}>EARNINGS</td>
            <td className={boldRightCell} style={{ width: "13%" }}>MASTER AMOUNT</td>
            <td className={boldRightCell} style={{ width: "13%" }}></td>
            <td className={boldRightCell} style={{ width: "13%" }}>YTD</td>
            <td className={boldCell} style={{ width: "18%" }}>DEDUCTIONS</td>
            <td className={boldRightCell} style={{ width: "11%" }}>AMOUNT</td>
            <td className={boldRightCell} style={{ width: "10%" }}>YTD</td>
          </tr>
        </thead>
        <tbody>
          {/* Row 1: Basic Pay / PF */}
          <tr>
            <td className={cellStyle}>BASIC PAY</td>
            <td className={rightCell}>{fmt(data.basicPayMaster)}</td>
            <td className={rightCell}>{fmt(data.basicPay)}</td>
            <td className={rightCell}>{fmt(data.basicPayYtd)}</td>
            <td className={cellStyle}>PROVIDENT FUND</td>
            <td className={rightCell}>{fmt(data.providentFund)}</td>
            <td className={rightCell}>{fmt(data.providentFundYtd)}</td>
          </tr>
          {/* Row 2: HRA / LWF */}
          <tr>
            <td className={cellStyle}>HOUSE RENT ALLOWANCE</td>
            <td className={rightCell}>{fmt(data.hraMaster)}</td>
            <td className={rightCell}>{fmt(data.hra)}</td>
            <td className={rightCell}>{fmt(data.hraYtd)}</td>
            <td className={cellStyle}>LABOUR WELFARE FUND</td>
            <td className={rightCell}>{fmt(data.labourWelfareFund)}</td>
            <td className={rightCell}>{fmt(data.labourWelfareFundYtd)}</td>
          </tr>
          {/* Row 3: Bonus / PT */}
          <tr>
            <td className={cellStyle}>BONUS</td>
            <td className={rightCell}>{fmt(data.bonusMaster)}</td>
            <td className={rightCell}>{fmt(data.bonus)}</td>
            <td className={rightCell}>{fmt(data.bonusYtd)}</td>
            <td className={cellStyle}>PROFESSIONAL TAX</td>
            <td className={rightCell}>{fmt(data.professionalTax)}</td>
            <td className={rightCell}>{fmt(data.professionalTaxYtd)}</td>
          </tr>
          {/* Row 4: Other Allowances */}
          <tr>
            <td className={cellStyle}>OTHER ALLOWANCES</td>
            <td className={rightCell}>{fmt(data.otherAllowancesMaster)}</td>
            <td className={rightCell}>{fmt(data.otherAllowances)}</td>
            <td className={rightCell}>{fmt(data.otherAllowancesYtd)}</td>
            <td className={cellStyle}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 5: National Holiday Pay */}
          <tr>
            <td className={cellStyle}>NATIONAL HOLIDAY PAY</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.nationalHolidayPay)}</td>
            <td className={rightCell}>{fmt(data.nationalHolidayPayYtd)}</td>
            <td className={cellStyle}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 6: Public Holiday Pay */}
          <tr>
            <td className={cellStyle}>PUBLIC HOLIDAY PAY</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.publicHolidayPay)}</td>
            <td className={rightCell}>{fmt(data.publicHolidayPayYtd)}</td>
            <td className={cellStyle}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 7: Referral Bonus */}
          <tr>
            <td className={cellStyle}>REFERRAL BONUS</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.referralBonus)}</td>
            <td className={rightCell}>{fmt(data.referralBonusYtd)}</td>
            <td className={cellStyle}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 8: Undertime Deduct */}
          <tr>
            <td className={cellStyle}>UNDERTIME AND TARDINESS DEDUCT</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.undertimeDeduct)}</td>
            <td className={rightCell}>{fmt(data.undertimeDeductYtd)}</td>
            <td className={cellStyle}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Gross Row */}
          <tr>
            <td className={boldCell}>GROSS EARNINGS</td>
            <td className={boldRightCell}>{fmt(String(grossEarningsMaster))}</td>
            <td className={boldRightCell}>{fmt(String(grossEarnings))}</td>
            <td className={boldRightCell}>{fmt(String(grossEarningsYtd))}</td>
            <td className={boldCell}>GROSS DEDUCTION</td>
            <td className={boldRightCell}>{fmt(String(grossDeduction))}</td>
            <td className={boldRightCell}>{fmt(String(grossDeductionYtd))}</td>
          </tr>
        </tbody>
      </table>

      {/* Net Transfer */}
      <table className="w-full border-collapse border border-black mt-0">
        <tbody>
          <tr>
            <td className={`${boldCell}`} colSpan={7}>
              NET TRANSFER: {fmt(String(netTransfer))}
            </td>
          </tr>
          <tr>
            <td className={`${boldCell}`} colSpan={7}>
              IN WORDS: {data.amountInWords}
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-[9px] mt-3 italic text-center">
        This is a computer generated document, hence no signature is required.
      </p>
    </div>
  );
});

PayslipPreview.displayName = "PayslipPreview";
export default PayslipPreview;
