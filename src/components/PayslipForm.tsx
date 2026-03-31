import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PayslipData } from "@/types/payslip";

interface Props {
  data: PayslipData;
  onChange: (data: PayslipData) => void;
}

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-1">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-8 text-sm" />
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="font-semibold text-sm border-b border-border pb-1">{title}</h3>
    <div className="grid grid-cols-2 gap-3">{children}</div>
  </div>
);

const PayslipForm = ({ data, onChange }: Props) => {
  const set = (key: keyof PayslipData) => (v: string) => onChange({ ...data, [key]: v });

  return (
    <div className="space-y-6 p-4 overflow-auto max-h-[calc(100vh-80px)]">
      <Section title="Pay Period">
        <Field label="Month (1-12)" value={data.month} onChange={set("month")} />
        <Field label="Year" value={data.year} onChange={set("year")} />
      </Section>

      <Section title="Employee Information">
        <Field label="EMP CODE" value={data.empCode} onChange={set("empCode")} />
        <Field label="EMP NAME" value={data.empName} onChange={set("empName")} />
        <Field label="Designation" value={data.designation} onChange={set("designation")} />
        <Field label="DOJ" value={data.doj} onChange={set("doj")} />
        <Field label="PAN" value={data.pan} onChange={set("pan")} />
        <Field label="Department" value={data.department} onChange={set("department")} />
        <Field label="Location" value={data.location} onChange={set("location")} />
        <Field label="UAN NO" value={data.uanNo} onChange={set("uanNo")} />
        <Field label="PF NO" value={data.pfNo} onChange={set("pfNo")} />
        <Field label="ESI NO" value={data.esiNo} onChange={set("esiNo")} />
        <Field label="Bank Name" value={data.bankName} onChange={set("bankName")} />
        <Field label="Account No" value={data.accountNo} onChange={set("accountNo")} />
      </Section>

      <Section title="Days & Hours">
        <Field label="STD Days" value={data.stdDays} onChange={set("stdDays")} />
        <Field label="WRK Days" value={data.wrkDays} onChange={set("wrkDays")} />
        <Field label="LOP Days" value={data.lopDays} onChange={set("lopDays")} />
        <Field label="Previous LOP Days" value={data.previousLopDays} onChange={set("previousLopDays")} />
        <Field label="LOP Reversal Days" value={data.lopReversalDays} onChange={set("lopReversalDays")} />
        <Field label="ND Hours" value={data.ndHours} onChange={set("ndHours")} />
        <Field label="UT Hours" value={data.utHours} onChange={set("utHours")} />
        <Field label="OT Hours" value={data.otHours} onChange={set("otHours")} />
        <Field label="National Holiday Pay Hours" value={data.nationalHolidayPayHours} onChange={set("nationalHolidayPayHours")} />
        <Field label="Supplimentary Pay Hours" value={data.supplimentaryPayHours} onChange={set("supplimentaryPayHours")} />
        <Field label="Public Holiday Pay Hours" value={data.publicHolidayPayHours} onChange={set("publicHolidayPayHours")} />
        <Field label="New Joiner Arrear Days" value={data.newJoinerArrearDays} onChange={set("newJoinerArrearDays")} />
        <Field label="PL Encashment Days" value={data.plEncashmentDays} onChange={set("plEncashmentDays")} />
        <Field label="Prev Overtime Pay Hours" value={data.prevOvertimePayHours} onChange={set("prevOvertimePayHours")} />
        <Field label="Prev Supplimentary Pay Hours" value={data.prevSupplimentaryPayHours} onChange={set("prevSupplimentaryPayHours")} />
        <Field label="Prev UT and Tardiness Dedn" value={data.prevUtAndTardinessDedn} onChange={set("prevUtAndTardinessDedn")} />
        <Field label="Prev Public Holiday Pay Hours" value={data.prevPublicHolidayPayHours} onChange={set("prevPublicHolidayPayHours")} />
        <Field label="Prev UT and Tardiness Rev Hr" value={data.prevUtAndTardinessRevHr} onChange={set("prevUtAndTardinessRevHr")} />
        <Field label="Prev National Holiday Pay Hour" value={data.prevNationalHolidayPayHour} onChange={set("prevNationalHolidayPayHour")} />
        <Field label="Management Level" value={data.managementLevel} onChange={set("managementLevel")} />
      </Section>

      <Section title="Earnings">
        <Field label="Basic Pay (Master)" value={data.basicPayMaster} onChange={set("basicPayMaster")} />
        <Field label="Basic Pay" value={data.basicPay} onChange={set("basicPay")} />
        <Field label="Basic Pay YTD" value={data.basicPayYtd} onChange={set("basicPayYtd")} />
        <Field label="HRA (Master)" value={data.hraMaster} onChange={set("hraMaster")} />
        <Field label="HRA" value={data.hra} onChange={set("hra")} />
        <Field label="HRA YTD" value={data.hraYtd} onChange={set("hraYtd")} />
        <Field label="Bonus (Master)" value={data.bonusMaster} onChange={set("bonusMaster")} />
        <Field label="Bonus" value={data.bonus} onChange={set("bonus")} />
        <Field label="Bonus YTD" value={data.bonusYtd} onChange={set("bonusYtd")} />
        <Field label="Other Allowances (Master)" value={data.otherAllowancesMaster} onChange={set("otherAllowancesMaster")} />
        <Field label="Other Allowances" value={data.otherAllowances} onChange={set("otherAllowances")} />
        <Field label="Other Allowances YTD" value={data.otherAllowancesYtd} onChange={set("otherAllowancesYtd")} />
        <Field label="National Holiday Pay" value={data.nationalHolidayPay} onChange={set("nationalHolidayPay")} />
        <Field label="National Holiday Pay YTD" value={data.nationalHolidayPayYtd} onChange={set("nationalHolidayPayYtd")} />
        <Field label="Public Holiday Pay" value={data.publicHolidayPay} onChange={set("publicHolidayPay")} />
        <Field label="Public Holiday Pay YTD" value={data.publicHolidayPayYtd} onChange={set("publicHolidayPayYtd")} />
        <Field label="Referral Bonus" value={data.referralBonus} onChange={set("referralBonus")} />
        <Field label="Referral Bonus YTD" value={data.referralBonusYtd} onChange={set("referralBonusYtd")} />
        <Field label="Undertime & Tardiness Deduct" value={data.undertimeDeduct} onChange={set("undertimeDeduct")} />
        <Field label="Undertime & Tardiness YTD" value={data.undertimeDeductYtd} onChange={set("undertimeDeductYtd")} />
      </Section>

      <Section title="Deductions">
        <Field label="Provident Fund" value={data.providentFund} onChange={set("providentFund")} />
        <Field label="Provident Fund YTD" value={data.providentFundYtd} onChange={set("providentFundYtd")} />
        <Field label="Labour Welfare Fund" value={data.labourWelfareFund} onChange={set("labourWelfareFund")} />
        <Field label="Labour Welfare Fund YTD" value={data.labourWelfareFundYtd} onChange={set("labourWelfareFundYtd")} />
        <Field label="Professional Tax" value={data.professionalTax} onChange={set("professionalTax")} />
        <Field label="Professional Tax YTD" value={data.professionalTaxYtd} onChange={set("professionalTaxYtd")} />
      </Section>

      <Section title="Amount In Words">
        <div className="col-span-2">
          <Field label="Amount In Words (auto-calculated or override)" value={data.amountInWords} onChange={set("amountInWords")} />
        </div>
      </Section>
    </div>
  );
};

export default PayslipForm;
