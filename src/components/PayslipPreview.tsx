import { forwardRef, useMemo } from "react";
import type { PayslipData } from "@/types/payslip";
import taskusLogo from "@/assets/taskus-logo.png";

const fmt = (v: string | number) => {
  const n = typeof v === "number" ? v : parseFloat(v);
  if (isNaN(n)) return typeof v === "string" ? (v || "0.00") : "0.00";
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const num = (v: string) => parseFloat(v) || 0;

interface Props { data: PayslipData }

const PayslipPreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const grossEarningsMaster = useMemo(() =>
    num(data.basicPayMaster) + num(data.hraMaster) + num(data.bonusMaster) + num(data.otherAllowancesMaster),
    [data.basicPayMaster, data.hraMaster, data.bonusMaster, data.otherAllowancesMaster]
  );

  const grossEarnings = useMemo(() =>
    num(data.basicPay) + num(data.hra) + num(data.bonus) + num(data.otherAllowances) +
    num(data.nationalHolidayPay) + num(data.publicHolidayPay) + num(data.referralBonus) + num(data.undertimeDeduct),
    [data.basicPay, data.hra, data.bonus, data.otherAllowances,
     data.nationalHolidayPay, data.publicHolidayPay, data.referralBonus, data.undertimeDeduct]
  );

  const grossEarningsYtd = useMemo(() =>
    num(data.basicPayYtd) + num(data.hraYtd) + num(data.bonusYtd) + num(data.otherAllowancesYtd) +
    num(data.nationalHolidayPayYtd) + num(data.publicHolidayPayYtd) + num(data.referralBonusYtd) + num(data.undertimeDeductYtd),
    [data.basicPayYtd, data.hraYtd, data.bonusYtd, data.otherAllowancesYtd,
     data.nationalHolidayPayYtd, data.publicHolidayPayYtd, data.referralBonusYtd, data.undertimeDeductYtd]
  );

  const grossDeduction = useMemo(() =>
    num(data.providentFund) + num(data.labourWelfareFund) + num(data.professionalTax),
    [data.providentFund, data.labourWelfareFund, data.professionalTax]
  );

  const grossDeductionYtd = useMemo(() =>
    num(data.providentFundYtd) + num(data.labourWelfareFundYtd) + num(data.professionalTaxYtd),
    [data.providentFundYtd, data.labourWelfareFundYtd, data.professionalTaxYtd]
  );

  const netTransfer = grossEarnings - grossDeduction;

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthName = months[parseInt(data.month) - 1] || data.month;

  // Base cell style matching docx
  const base: React.CSSProperties = {
    border: "1px solid black",
    padding: "1px 4px",
    fontSize: "9px",
    fontFamily: "Arial, sans-serif",
    verticalAlign: "middle",
    lineHeight: "1.4",
  };
  const bold: React.CSSProperties = { ...base, fontWeight: "bold" };
  const right: React.CSSProperties = { ...base, textAlign: "right" };
  const boldRight: React.CSSProperties = { ...base, fontWeight: "bold", textAlign: "right" };

  // Employee detail rows: [leftLabel, leftValue, rightLabel, rightValue]
  const empRows: [string, string, string, string][] = [
    ["EMPCODE",                       data.empCode,                    "UAN NO",                     data.uanNo],
    ["EMPNAME",                       data.empName,                    "PF NO",                      data.pfNo],
    ["DESIGNATION",                   data.designation,                "ESI NO",                     data.esiNo],
    ["DOJ",                           data.doj,                        "STD DAYS",                   data.stdDays],
    ["PAN",                           data.pan,                        "WRKDAYS",                    data.wrkDays],
    ["DEPARTMENT",                    data.department,                 "LOP DAYS",                   data.lopDays],
    ["LOCATION",                      data.location,                   "BANK NAME",                  data.bankName],
    ["PREVIOUS LOP DAYS",             data.previousLopDays,            "ACCOUNT NO",                 data.accountNo],
    ["ND HOURS",                      data.ndHours,                    "LOP REVERSAL DAYS",          data.lopReversalDays],
    ["UT HOURS",                      data.utHours,                    "OT HOURS",                   data.otHours],
    ["NATIONAL HOLIDAY PAY HOURS",    data.nationalHolidayPayHours,    "SUPPLIMENTARY PAY HOURS",    data.supplimentaryPayHours],
    ["PUBLIC HOLIDAY PAY HOURS",      data.publicHolidayPayHours,      "NEW JOINER ARREAR DAYS",     data.newJoinerArrearDays],
    ["PL ENCASHMENT DAYS",            data.plEncashmentDays,           "PREV OVERTIME PAY HOURS",    data.prevOvertimePayHours],
    ["PREV SUPPLIMENTARY PAY HOURS",  data.prevSupplimentaryPayHours,  "PREV UT AND TARDINESS DEDN", data.prevUtAndTardinessDedn],
    ["PREV PUBLIC HOLIDAY PAY HOURS", data.prevPublicHolidayPayHours,  "PREV UT AND TARDINESS REV HR", data.prevUtAndTardinessRevHr],
    ["PREV NATIONAL HOLIDAY PAY HOUR",data.prevNationalHolidayPayHour, "MANAGEMENT LEVEL",           data.managementLevel],
  ];

  return (
    <div
      ref={ref}
      style={{
        width: "794px",
        backgroundColor: "white",
        color: "black",
        fontFamily: "Arial, sans-serif",
        padding: "12px 14px",
        boxSizing: "border-box",
      }}
    >
      {/*
        ── EXACT DOCX TABLE STRUCTURE ──
        7 grid columns with these widths (EMU → %):
          col0: 1722120 → 22.12%
          col1: 1089660 → 14.00%  ← col1+col2 merged in most rows = 28.00%
          col2: 1089660 → 14.00%
          col3:  537845 →  6.91%  ← spacer / YTD in earnings
          col4: 1630680 → 20.95%
          col5: 1266825 → 16.27%
          col6:  459105 →  5.90%  ← last col (empty in emp rows)
        Total: 7796095
      */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: "22.12%" }} />
          <col style={{ width: "14.00%" }} />
          <col style={{ width: "14.00%" }} />
          <col style={{ width: "6.91%" }} />
          <col style={{ width: "20.95%" }} />
          <col style={{ width: "16.27%" }} />
          <col style={{ width: "5.90%" }} />
        </colgroup>
        <tbody>

          {/* ── ROW 0: Header span=7 ── */}
          <tr>
            <td colSpan={7} style={{ ...base, padding: "5px 8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "11px", lineHeight: "1.5" }}>
                    TaskUS India Private Limited
                  </div>
                  <div style={{ fontSize: "8px", lineHeight: "1.5" }}>
                    Reg.Office:18th &amp; 19th floor, Tower-9, Gigaplex IT Park, MIDC, Plot No 1 I.T.5,
                    Airoli Knowledge Park Road, TTC Industrial Area, Airoli, Navi Mumbai, Maharashtra – 400708, India
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: "10px", marginTop: "3px" }}>
                    Pay Slip for the Month of {monthName} {data.year}
                  </div>
                </div>
                <img
                  src={taskusLogo}
                  alt="TaskUs"
                  style={{ height: "38px", marginLeft: "12px", flexShrink: 0 }}
                />
              </div>
            </td>
          </tr>

          {/* ── ROWS 1-16: Employee details ──
               Actual cells: [span=1 label][span=2 value][span=1 empty][span=1 label][span=1 value][span=1 empty]
               = 6 actual cells covering 7 grid columns
          */}
          {empRows.map(([lbl1, val1, lbl2, val2], i) => (
            <tr key={i}>
              <td style={bold}>{lbl1}</td>
              <td colSpan={2} style={base}>{val1}</td>
              <td style={{ ...base, borderLeft: "1px solid black", borderRight: "1px solid black" }}></td>
              <td style={bold}>{lbl2}</td>
              <td style={base}>{val2}</td>
              <td style={base}></td>
            </tr>
          ))}

          {/* ── ROW 17: Earnings/Deductions header ──
               Actual: [EARNINGS][span=2 "\tMASTER\tAMOUNT"][YTD][DEDUCTIONS][AMOUNT][YTD]
               The merged cell has tab-separated MASTER and AMOUNT — rendered as two sub-columns
          */}
          <tr>
            <td style={bold}>EARNINGS</td>
            {/* span=2 cell with MASTER left-aligned and AMOUNT right-aligned via flex */}
            <td colSpan={2} style={{ ...bold, padding: "1px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                <span>MASTER</span>
                <span>AMOUNT</span>
              </div>
            </td>
            <td style={boldRight}>YTD</td>
            <td style={bold}>DEDUCTIONS</td>
            <td style={boldRight}>AMOUNT</td>
            <td style={boldRight}>YTD</td>
          </tr>

          {/* ── ROWS 18-21: Earnings with MASTER + AMOUNT in span=2 cell ──
               Actual: [label][span=2 "MASTER  AMOUNT"][YTD][deduction][amount][ytd]
          */}
          {/* Row 18: BASIC PAY / PROVIDENT FUND */}
          <tr>
            <td style={base}>BASIC PAY</td>
            <td colSpan={2} style={{ ...base, padding: "1px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                <span>{fmt(data.basicPayMaster)}</span>
                <span>{fmt(data.basicPay)}</span>
              </div>
            </td>
            <td style={right}>{fmt(data.basicPayYtd)}</td>
            <td style={base}>PROVIDENT FUND</td>
            <td style={right}>{fmt(data.providentFund)}</td>
            <td style={right}>{fmt(data.providentFundYtd)}</td>
          </tr>

          {/* Row 19: HOUSE RENT ALLOWANCE / LABOUR WELFARE FUND */}
          <tr>
            <td style={base}>HOUSE RENT ALLOWANCE</td>
            <td colSpan={2} style={{ ...base, padding: "1px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                <span>{fmt(data.hraMaster)}</span>
                <span>{fmt(data.hra)}</span>
              </div>
            </td>
            <td style={right}>{fmt(data.hraYtd)}</td>
            <td style={base}>LABOUR WELFARE FUND</td>
            <td style={right}>{fmt(data.labourWelfareFund)}</td>
            <td style={right}>{fmt(data.labourWelfareFundYtd)}</td>
          </tr>

          {/* Row 20: BONUS / PROFESSIONAL TAX */}
          <tr>
            <td style={base}>BONUS</td>
            <td colSpan={2} style={{ ...base, padding: "1px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                <span>{fmt(data.bonusMaster)}</span>
                <span>{fmt(data.bonus)}</span>
              </div>
            </td>
            <td style={right}>{fmt(data.bonusYtd)}</td>
            <td style={base}>PROFESSIONAL TAX</td>
            <td style={right}>{fmt(data.professionalTax)}</td>
            <td style={right}>{fmt(data.professionalTaxYtd)}</td>
          </tr>

          {/* Row 21: OTHER ALLOWANCES / empty deduction */}
          <tr>
            <td style={base}>OTHER ALLOWANCES</td>
            <td colSpan={2} style={{ ...base, padding: "1px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                <span>{fmt(data.otherAllowancesMaster)}</span>
                <span>{fmt(data.otherAllowances)}</span>
              </div>
            </td>
            <td style={right}>{fmt(data.otherAllowancesYtd)}</td>
            <td style={base}></td>
            <td style={base}></td>
            <td style={base}></td>
          </tr>

          {/* ── ROWS 22-25: Single value in span=2 cell (no MASTER) ── */}
          {/* Row 22: NATIONAL HOLIDAY PAY */}
          <tr>
            <td style={base}>NATIONAL HOLIDAY PAY</td>
            <td colSpan={2} style={right}>{fmt(data.nationalHolidayPay)}</td>
            <td style={right}>{fmt(data.nationalHolidayPayYtd)}</td>
            <td style={base}></td>
            <td style={base}></td>
            <td style={base}></td>
          </tr>

          {/* Row 23: PUBLIC HOLIDAY PAY */}
          <tr>
            <td style={base}>PUBLIC HOLIDAY PAY</td>
            <td colSpan={2} style={right}>{fmt(data.publicHolidayPay)}</td>
            <td style={right}>{fmt(data.publicHolidayPayYtd)}</td>
            <td style={base}></td>
            <td style={base}></td>
            <td style={base}></td>
          </tr>

          {/* Row 24: REFERRAL BONUS */}
          <tr>
            <td style={base}>REFERRAL BONUS</td>
            <td colSpan={2} style={right}>{fmt(data.referralBonus)}</td>
            <td style={right}>{fmt(data.referralBonusYtd)}</td>
            <td style={base}></td>
            <td style={base}></td>
            <td style={base}></td>
          </tr>

          {/* Row 25: UNDERTIME AND TARDINESS DEDUCT */}
          <tr>
            <td style={base}>UNDERTIME AND TARDINESS DEDUCT</td>
            <td colSpan={2} style={right}>{fmt(data.undertimeDeduct)}</td>
            <td style={right}>{fmt(data.undertimeDeductYtd)}</td>
            <td style={base}></td>
            <td style={base}></td>
            <td style={base}></td>
          </tr>

          {/* ── ROW 26: GROSS ──
               Actual: [span=2 "\tGROSS EARNINGS\t28,200.00"][32,926.00][189,424.00][GROSS DEDUCTION][1,965.00][13,494.00]
               span=2 covers col0+col1, then col2=AMOUNT, col3=YTD
          */}
          <tr>
            <td colSpan={2} style={{ ...bold, padding: "1px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                <span>GROSS EARNINGS</span>
                <span>{fmt(grossEarningsMaster)}</span>
              </div>
            </td>
            <td style={boldRight}>{fmt(grossEarnings)}</td>
            <td style={boldRight}>{fmt(grossEarningsYtd)}</td>
            <td style={bold}>GROSS DEDUCTION</td>
            <td style={boldRight}>{fmt(grossDeduction)}</td>
            <td style={boldRight}>{fmt(grossDeductionYtd)}</td>
          </tr>

          {/* ── ROW 27: NET TRANSFER span=7 ──
               "NET TRANSFER : 30,961.00\tIN WORDS\t: Rupees Thirty..."
               Both NET TRANSFER and IN WORDS on same row, tab-separated in docx
          */}
          <tr>
            <td colSpan={7} style={{ ...base, padding: "2px 6px" }}>
              <div style={{ display: "flex", gap: "40px" }}>
                <span>
                  <strong>NET TRANSFER</strong>
                  {" : "}
                  {fmt(netTransfer)}
                </span>
                <span>
                  <strong>IN WORDS</strong>
                  {"\t: "}
                  {data.amountInWords}
                </span>
              </div>
            </td>
          </tr>

        </tbody>
      </table>

      <p style={{
        fontSize: "8px",
        marginTop: "6px",
        fontStyle: "italic",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "black",
      }}>
        This is a computer generated document, hence no signature is required.
      </p>
    </div>
  );
});

PayslipPreview.displayName = "PayslipPreview";
export default PayslipPreview;