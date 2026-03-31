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

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthName = months[parseInt(data.month) - 1] || data.month;

  // Base cell styles matching the image exactly
  const cell = "border border-black px-1 py-[2px] text-[10.5px]";
  const boldCell = `${cell} font-bold`;
  const rightCell = `${cell} text-right`;
  const boldRightCell = `${boldCell} text-right`;

  return (
    <div
      ref={ref}
      className="bg-white text-black"
      style={{ width: "794px", fontFamily: "Arial, sans-serif", padding: "18px 20px" }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4px" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: "bold", fontSize: "12px", lineHeight: "1.3", margin: 0 }}>
            TaskUS India Private Limited
          </p>
          <p style={{ fontSize: "8.5px", lineHeight: "1.4", margin: "2px 0 0 0" }}>
            Reg.Office: 18th &amp; 19th floor, Tower-9, Gigaplex IT Park, MIDC, Plot No 1 I.T.5, Airoli Knowledge Park Road,
          </p>
          <p style={{ fontSize: "8.5px", lineHeight: "1.4", margin: 0 }}>
            TTC Industrial Area, Airoli, Navi Mumbai, Maharashtra – 400708, India
          </p>
          <p style={{ fontWeight: "bold", fontSize: "11px", marginTop: "5px", marginBottom: 0 }}>
            Pay Slip for the Month of {monthName} {data.year}
          </p>
        </div>
        <img src={taskusLogo} alt="TaskUs" style={{ height: "38px", marginLeft: "12px", marginTop: "2px" }} />
      </div>

      {/* ── Employee Details Table ── */}
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black", marginTop: "4px" }}>
        <tbody>
          {[
            [["EMPCODE", data.empCode], ["UAN NO", data.uanNo]],
            [["EMPNAME", data.empName], ["PF NO", data.pfNo]],
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
              <td className={cell} style={{ width: "25%" }}>{row[0][1]}</td>
              <td className={boldCell} style={{ width: "25%" }}>{row[1][0]}</td>
              <td className={cell} style={{ width: "25%" }}>{row[1][1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Earnings & Deductions Table ── */}
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black", marginTop: "-1px" }}>
        <thead>
          <tr>
            <td className={boldCell} style={{ width: "26%" }}>EARNINGS</td>
            <td className={boldRightCell} style={{ width: "10%" }}>MASTER</td>
            <td className={boldRightCell} style={{ width: "10%" }}>AMOUNT</td>
            <td className={boldRightCell} style={{ width: "10%" }}>YTD</td>
            <td className={boldCell} style={{ width: "22%" }}>DEDUCTIONS</td>
            <td className={boldRightCell} style={{ width: "11%" }}>AMOUNT</td>
            <td className={boldRightCell} style={{ width: "11%" }}>YTD</td>
          </tr>
        </thead>
        <tbody>
          {/* Row 1: Basic Pay / Provident Fund */}
          <tr>
            <td className={cell}>BASIC PAY</td>
            <td className={rightCell}>{fmt(data.basicPayMaster)}</td>
            <td className={rightCell}>{fmt(data.basicPay)}</td>
            <td className={rightCell}>{fmt(data.basicPayYtd)}</td>
            <td className={cell}>PROVIDENT FUND</td>
            <td className={rightCell}>{fmt(data.providentFund)}</td>
            <td className={rightCell}>{fmt(data.providentFundYtd)}</td>
          </tr>
          {/* Row 2: HRA / Labour Welfare Fund */}
          <tr>
            <td className={cell}>HOUSE RENT ALLOWANCE</td>
            <td className={rightCell}>{fmt(data.hraMaster)}</td>
            <td className={rightCell}>{fmt(data.hra)}</td>
            <td className={rightCell}>{fmt(data.hraYtd)}</td>
            <td className={cell}>LABOUR WELFARE FUND</td>
            <td className={rightCell}>{fmt(data.labourWelfareFund)}</td>
            <td className={rightCell}>{fmt(data.labourWelfareFundYtd)}</td>
          </tr>
          {/* Row 3: Bonus / Professional Tax */}
          <tr>
            <td className={cell}>BONUS</td>
            <td className={rightCell}>{fmt(data.bonusMaster)}</td>
            <td className={rightCell}>{fmt(data.bonus)}</td>
            <td className={rightCell}>{fmt(data.bonusYtd)}</td>
            <td className={cell}>PROFESSIONAL TAX</td>
            <td className={rightCell}>{fmt(data.professionalTax)}</td>
            <td className={rightCell}>{fmt(data.professionalTaxYtd)}</td>
          </tr>
          {/* Row 4: Other Allowances */}
          <tr>
            <td className={cell}>OTHER ALLOWANCES</td>
            <td className={rightCell}>{fmt(data.otherAllowancesMaster)}</td>
            <td className={rightCell}>{fmt(data.otherAllowances)}</td>
            <td className={rightCell}>{fmt(data.otherAllowancesYtd)}</td>
            <td className={cell}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 5: National Holiday Pay */}
          <tr>
            <td className={cell}>NATIONAL HOLIDAY PAY</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.nationalHolidayPay)}</td>
            <td className={rightCell}>{fmt(data.nationalHolidayPayYtd)}</td>
            <td className={cell}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 6: Public Holiday Pay */}
          <tr>
            <td className={cell}>PUBLIC HOLIDAY PAY</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.publicHolidayPay)}</td>
            <td className={rightCell}>{fmt(data.publicHolidayPayYtd)}</td>
            <td className={cell}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 7: Referral Bonus */}
          <tr>
            <td className={cell}>REFERRAL BONUS</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.referralBonus)}</td>
            <td className={rightCell}>{fmt(data.referralBonusYtd)}</td>
            <td className={cell}></td>
            <td className={rightCell}></td>
            <td className={rightCell}></td>
          </tr>
          {/* Row 8: Undertime and Tardiness Deduct */}
          <tr>
            <td className={cell}>UNDERTIME AND TARDINESS DEDUCT</td>
            <td className={rightCell}></td>
            <td className={rightCell}>{fmt(data.undertimeDeduct)}</td>
            <td className={rightCell}>{fmt(data.undertimeDeductYtd)}</td>
            <td className={cell}></td>
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

      {/* ── Net Transfer Table ── */}
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black", marginTop: "-1px" }}>
        <tbody>
          <tr>
            <td className={boldCell} colSpan={7} style={{ paddingTop: "3px", paddingBottom: "3px" }}>
              <span style={{ fontWeight: "bold" }}>NET TRANSFER</span>
              <span style={{ fontWeight: "normal" }}>&nbsp;&nbsp;: {fmt(String(netTransfer))}</span>
            </td>
          </tr>
          <tr>
            <td className={cell} colSpan={7} style={{ paddingTop: "3px", paddingBottom: "3px" }}>
              <span style={{ fontWeight: "bold" }}>IN WORDS</span>
              <span style={{ fontWeight: "normal" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.amountInWords}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: "8.5px", marginTop: "10px", fontStyle: "italic", textAlign: "center" }}>
        This is a computer generated document, hence no signature is required.
      </p>
    </div>
  );
});

PayslipPreview.displayName = "PayslipPreview";
export default PayslipPreview;