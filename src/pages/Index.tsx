import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import PayslipForm from "@/components/PayslipForm";
import PayslipPreview from "@/components/PayslipPreview";
import type { PayslipData } from "@/types/payslip";
import { numberToWords } from "@/utils/numberToWords";
import { Download } from "lucide-react";

const defaultData: PayslipData = {
  month: "12",
  year: "2025",
  empCode: "3330637",
  empName: "Aniket subhash Yadav",
  designation: "Teammate",
  doj: "29/05/2025",
  pan: "AMSPY4500B",
  department: "BPO Services",
  location: "Mumbai",
  uanNo: "101507963044",
  pfNo: "MPIND1985739000/0043592",
  esiNo: "",
  bankName: "HSBC Bank",
  accountNo: "011414190006",
  stdDays: "31.00",
  wrkDays: "29.00",
  lopDays: "2.00",
  previousLopDays: "0.0000",
  lopReversalDays: "0.0000",
  ndHours: "0.00",
  utHours: "0.00",
  otHours: "0.00",
  nationalHolidayPayHours: "0.00",
  supplimentaryPayHours: "0.00",
  publicHolidayPayHours: "0.00",
  newJoinerArrearDays: "0.00",
  plEncashmentDays: "0.00",
  prevOvertimePayHours: "0.00",
  prevSupplimentaryPayHours: "0.00",
  prevUtAndTardinessDedn: "-3.87",
  prevPublicHolidayPayHours: "0.00",
  prevUtAndTardinessRevHr: "0.00",
  prevNationalHolidayPayHour: "0.00",
  managementLevel: "0.00",
  basicPayMaster: "15500.00",
  basicPay: "14500.00",
  basicPayYtd: "100366.00",
  hraMaster: "6200.00",
  hra: "5800.00",
  hraYtd: "40146.00",
  bonusMaster: "3100.00",
  bonus: "2900.00",
  bonusYtd: "20074.00",
  otherAllowancesMaster: "3400.00",
  otherAllowances: "3181.00",
  otherAllowancesYtd: "22016.00",
  nationalHolidayPay: "0.00",
  nationalHolidayPayYtd: "1819.00",
  publicHolidayPay: "0.00",
  publicHolidayPayYtd: "910.00",
  referralBonus: "7000.00",
  referralBonusYtd: "7000.00",
  undertimeDeduct: "-455.00",
  undertimeDeductYtd: "-2907.00",
  providentFund: "1740.00",
  providentFundYtd: "12044.00",
  labourWelfareFund: "25.00",
  labourWelfareFundYtd: "50.00",
  professionalTax: "200.00",
  professionalTaxYtd: "1400.00",
  amountInWords: "",
};

const Index = () => {
  const [data, setData] = useState<PayslipData>(defaultData);
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-calculate amount in words
  const netAmount = useMemo(() => {
    const grossEarnings = [data.basicPay, data.hra, data.bonus, data.otherAllowances,
      data.nationalHolidayPay, data.publicHolidayPay, data.referralBonus, data.undertimeDeduct]
      .reduce((a, v) => a + (parseFloat(v) || 0), 0);
    const grossDeduction = [data.providentFund, data.labourWelfareFund, data.professionalTax]
      .reduce((a, v) => a + (parseFloat(v) || 0), 0);
    return grossEarnings - grossDeduction;
  }, [data.basicPay, data.hra, data.bonus, data.otherAllowances,
    data.nationalHolidayPay, data.publicHolidayPay, data.referralBonus, data.undertimeDeduct,
    data.providentFund, data.labourWelfareFund, data.professionalTax]);

  const dataWithWords = useMemo(() => ({
    ...data,
    amountInWords: numberToWords(netAmount),
  }), [data, netAmount]);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`payslip_${data.empName.replace(/\s+/g, "_")}_${data.month}_${data.year}.pdf`);
  }, [data.empName, data.month, data.year]);

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-lg font-bold text-foreground">Salary Slip Generator</h1>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 p-4">
        {/* Form */}
        <div className="lg:w-[420px] shrink-0 bg-background rounded-lg border border-border">
          <PayslipForm data={data} onChange={setData} />
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto bg-background rounded-lg border border-border p-4">
          <div className="overflow-auto">
            <PayslipPreview ref={previewRef} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
