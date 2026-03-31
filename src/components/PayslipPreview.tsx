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

  // Column widths matching docx proportions (total ~7796095 units → 754px usable)
  // Col0: 22.1%, Col1+2: 28.0% (merged value), Col3: 6.9% (spacer), Col4: 20.9%, Col5+6: 22.1% (merged value)
  const S: React.CSSProperties = { borderCollapse: "collapse", width: "100%" };
  const td = (extra?: React.CSSProperties): React.CSSProperties => ({
    border: "1px solid black",
    padding: "2px 4px",
    fontSize: "9.5px",
    fontFamily: "Arial, sans-serif",
    verticalAlign: "middle",
    ...extra,
  });
  const tdBold = (extra?: React.CSSProperties): React.CSSProperties => td({ fontWeight: "bold", ...extra });
  const tdRight = (extra?: React.CSSProperties): React.CSSProperties => td({ textAlign: "right", ...extra });
  const tdBoldRight = (extra?: React.CSSProperties): React.CSSProperties => td({ fontWeight: "bold", textAlign: "right", ...extra });

  const empRows: [string, string, string, string][] = [
    ["EMPCODE",                      data.empCode,                   "UAN NO",                    data.uanNo],
    ["EMPNAME",                      data.empName,                   "PF NO",                     data.pfNo],
    ["DESIGNATION",                  data.designation,               "ESI NO",                    data.esiNo],
    ["DOJ",                          data.doj,                       "STD DAYS",                  data.stdDays],
    ["PAN",                          data.pan,                       "WRKDAYS",                   data.wrkDays],
    ["DEPARTMENT",                   data.department,                "LOP DAYS",                  data.lopDays],
    ["LOCATION",                     data.location,                  "BANK NAME",                 data.bankName],
    ["PREVIOUS LOP DAYS",            data.previousLopDays,           "ACCOUNT NO",                data.accountNo],
    ["ND HOURS",                     data.ndHours,                   "LOP REVERSAL DAYS",         data.lopReversalDays],
    ["UT HOURS",                     data.utHours,                   "OT HOURS",                  data.otHours],
    ["NATIONAL HOLIDAY PAY HOURS",   data.nationalHolidayPayHours,   "SUPPLIMENTARY PAY HOURS",   data.supplimentaryPayHours],
    ["PUBLIC HOLIDAY PAY HOURS",     data.publicHolidayPayHours,     "NEW JOINER ARREAR DAYS",    data.newJoinerArrearDays],
    ["PL ENCASHMENT DAYS",           data.plEncashmentDays,          "PREV OVERTIME PAY HOURS",   data.prevOvertimePayHours],
    ["PREV SUPPLIMENTARY PAY HOURS", data.prevSupplimentaryPayHours, "PREV UT AND TARDINESS DEDN",data.prevUtAndTardinessDedn],
    ["PREV PUBLIC HOLIDAY PAY HOURS",data.prevPublicHolidayPayHours, "PREV UT AND TARDINESS REV HR", data.prevUtAndTardinessRevHr],
    ["PREV NATIONAL HOLIDAY PAY HOUR",data.prevNationalHolidayPayHour,"MANAGEMENT LEVEL",         data.managementLevel],
  ];

  return (
    <div
      ref={ref}
      style={{
        width: "794px",
        backgroundColor: "white",
        color: "black",
        fontFamily: "Arial, sans-serif",
        padding: "16px 18px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Single outer table matching docx structure ── */}
      <table style={{ ...S, marginBottom: "0" }}>
        <colgroup>
          {/* Col0: label-left 22.1% */}
          <col style={{ width: "22.1%" }} />
          {/* Col1: value-left part1 14% */}
          <col style={{ width: "14%" }} />
          {/* Col2: value-left part2 14% */}
          <col style={{ width: "14%" }} />
          {/* Col3: spacer 6.9% */}
          <col style={{ width: "6.9%" }} />
          {/* Col4: label-right 20.9% */}
          <col style={{ width: "20.9%" }} />
          {/* Col5: value-right part1 13.1% */}
          <col style={{ width: "13.1%" }} />
          {/* Col6: value-right part2 9% */}
          <col style={{ width: "9%" }} />
        </colgroup>
        <tbody>

          {/* ── HEADER ROW: merged all 7 cols ── */}
          <tr>
            <td colSpan={7} style={td({ padding: "6px 8px", border: "1px solid black" })}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "12px", lineHeight: "1.4" }}>
                    TaskUS India Private Limited
                  </div>
                  <div style={{ fontSize: "8.5px", lineHeight: "1.5", marginTop: "1px" }}>
                    Reg.Office: 18th &amp; 19th floor, Tower-9, Gigaplex IT Park, MIDC, Plot No 1 I.T.5, Airoli Knowledge Park Road,
                    TTC Industrial Area, Airoli, Navi Mumbai, Maharashtra – 400708, India
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: "11px", marginTop: "5px" }}>
                    Pay Slip for the Month of {monthName} {data.year}
                  </div>
                </div>
                <img
                  src={taskusLogo}
                  alt="TaskUs"
                  style={{ height: "40px", marginLeft: "16px", marginTop: "2px", flexShrink: 0 }}
                />
              </div>
            </td>
          </tr>

          {/* ── EMPLOYEE DETAIL ROWS ── */}
          {empRows.map(([lbl1, val1, lbl2, val2], i) => (
            <tr key={i}>
              {/* Label left */}
              <td style={tdBold({ whiteSpace: "nowrap" })}>{lbl1}</td>
              {/* Value left: spans col1+col2 */}
              <td colSpan={2} style={td()}>{val1}</td>
              {/* Spacer col3 */}
              <td style={td({ borderLeft: "none", borderRight: "none" })}></td>
              {/* Label right */}
              <td style={tdBold({ whiteSpace: "nowrap" })}>{lbl2}</td>
              {/* Value right: spans col5+col6 */}
              <td colSpan={2} style={td()}>{val2}</td>
            </tr>
          ))}

          {/* ── EARNINGS & DEDUCTIONS HEADER ── */}
          <tr>
            <td style={tdBold()}>EARNINGS</td>
            <td style={tdBoldRight()}>MASTER</td>
            <td style={tdBoldRight()}>AMOUNT</td>
            <td style={tdBoldRight()}>YTD</td>
            <td style={tdBold()}>DEDUCTIONS</td>
            <td style={tdBoldRight()}>AMOUNT</td>
            <td style={tdBoldRight()}>YTD</td>
          </tr>

          {/* ── Row 1: Basic Pay / Provident Fund ── */}
          <tr>
            <td style={td()}>BASIC PAY</td>
            <td style={tdRight()}>{fmt(data.basicPayMaster)}</td>
            <td style={tdRight()}>{fmt(data.basicPay)}</td>
            <td style={tdRight()}>{fmt(data.basicPayYtd)}</td>
            <td style={td()}>PROVIDENT FUND</td>
            <td style={tdRight()}>{fmt(data.providentFund)}</td>
            <td style={tdRight()}>{fmt(data.providentFundYtd)}</td>
          </tr>

          {/* ── Row 2: HRA / Labour Welfare Fund ── */}
          <tr>
            <td style={td()}>HOUSE RENT ALLOWANCE</td>
            <td style={tdRight()}>{fmt(data.hraMaster)}</td>
            <td style={tdRight()}>{fmt(data.hra)}</td>
            <td style={tdRight()}>{fmt(data.hraYtd)}</td>
            <td style={td()}>LABOUR WELFARE FUND</td>
            <td style={tdRight()}>{fmt(data.labourWelfareFund)}</td>
            <td style={tdRight()}>{fmt(data.labourWelfareFundYtd)}</td>
          </tr>

          {/* ── Row 3: Bonus / Professional Tax ── */}
          <tr>
            <td style={td()}>BONUS</td>
            <td style={tdRight()}>{fmt(data.bonusMaster)}</td>
            <td style={tdRight()}>{fmt(data.bonus)}</td>
            <td style={tdRight()}>{fmt(data.bonusYtd)}</td>
            <td style={td()}>PROFESSIONAL TAX</td>
            <td style={tdRight()}>{fmt(data.professionalTax)}</td>
            <td style={tdRight()}>{fmt(data.professionalTaxYtd)}</td>
          </tr>

          {/* ── Row 4: Other Allowances ── */}
          <tr>
            <td style={td()}>OTHER ALLOWANCES</td>
            <td style={tdRight()}>{fmt(data.otherAllowancesMaster)}</td>
            <td style={tdRight()}>{fmt(data.otherAllowances)}</td>
            <td style={tdRight()}>{fmt(data.otherAllowancesYtd)}</td>
            <td style={td()}></td>
            <td style={tdRight()}></td>
            <td style={tdRight()}></td>
          </tr>

          {/* ── Row 5: National Holiday Pay ── */}
          <tr>
            <td style={td()}>NATIONAL HOLIDAY PAY</td>
            <td style={tdRight()}></td>
            <td style={tdRight()}>{fmt(data.nationalHolidayPay)}</td>
            <td style={tdRight()}>{fmt(data.nationalHolidayPayYtd)}</td>
            <td style={td()}></td>
            <td style={tdRight()}></td>
            <td style={tdRight()}></td>
          </tr>

          {/* ── Row 6: Public Holiday Pay ── */}
          <tr>
            <td style={td()}>PUBLIC HOLIDAY PAY</td>
            <td style={tdRight()}></td>
            <td style={tdRight()}>{fmt(data.publicHolidayPay)}</td>
            <td style={tdRight()}>{fmt(data.publicHolidayPayYtd)}</td>
            <td style={td()}></td>
            <td style={tdRight()}></td>
            <td style={tdRight()}></td>
          </tr>

          {/* ── Row 7: Referral Bonus ── */}
          <tr>
            <td style={td()}>REFERRAL BONUS</td>
            <td style={tdRight()}></td>
            <td style={tdRight()}>{fmt(data.referralBonus)}</td>
            <td style={tdRight()}>{fmt(data.referralBonusYtd)}</td>
            <td style={td()}></td>
            <td style={tdRight()}></td>
            <td style={tdRight()}></td>
          </tr>

          {/* ── Row 8: Undertime and Tardiness Deduct ── */}
          <tr>
            <td style={td()}>UNDERTIME AND TARDINESS DEDUCT</td>
            <td style={tdRight()}></td>
            <td style={tdRight()}>{fmt(data.undertimeDeduct)}</td>
            <td style={tdRight()}>{fmt(data.undertimeDeductYtd)}</td>
            <td style={td()}></td>
            <td style={tdRight()}></td>
            <td style={tdRight()}></td>
          </tr>

          {/* ── GROSS ROW ── */}
          {/* Matches docx: "GROSS EARNINGS  28,200.00" spans col0+col1, then AMOUNT in col2, YTD in col3 */}
          <tr>
            <td style={tdBold()}>GROSS EARNINGS</td>
            <td style={tdBoldRight()}>{fmt(String(grossEarningsMaster))}</td>
            <td style={tdBoldRight()}>{fmt(String(grossEarnings))}</td>
            <td style={tdBoldRight()}>{fmt(String(grossEarningsYtd))}</td>
            <td style={tdBold()}>GROSS DEDUCTION</td>
            <td style={tdBoldRight()}>{fmt(String(grossDeduction))}</td>
            <td style={tdBoldRight()}>{fmt(String(grossDeductionYtd))}</td>
          </tr>

          {/* ── NET TRANSFER ROW ── */}
          <tr>
            <td colSpan={7} style={td({ padding: "3px 6px" })}>
              <span style={{ fontWeight: "bold", fontSize: "10px" }}>NET TRANSFER</span>
              <span style={{ fontSize: "10px" }}>&nbsp;&nbsp;: {fmt(String(netTransfer))}</span>
            </td>
          </tr>

          {/* ── IN WORDS ROW ── */}
          <tr>
            <td colSpan={7} style={td({ padding: "3px 6px" })}>
              <span style={{ fontWeight: "bold", fontSize: "10px" }}>IN WORDS</span>
              <span style={{ fontSize: "10px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.amountInWords}</span>
            </td>
          </tr>

        </tbody>
      </table>

      <p style={{ fontSize: "8.5px", marginTop: "8px", fontStyle: "italic", textAlign: "center", margin: "8px 0 0 0" }}>
        This is a computer generated document, hence no signature is required.
      </p>
    </div>
  );
});

PayslipPreview.displayName = "PayslipPreview";
export default PayslipPreview;