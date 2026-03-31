
## Salary Slip Generator — TaskUS Format

### What We're Building
A salary slip generator that exactly replicates the TaskUS payslip format from the reference image, with all fields editable (prefilled with sample data), live preview, and PDF download.

### Pages & Layout
**Single page app** with two sections side by side (on desktop):
- **Left: Form Panel** — All editable fields grouped into sections (Employee Info, Hours/Days, Earnings, Deductions)
- **Right: Preview Panel** — Live preview matching the exact TaskUS payslip layout from the reference image

### Key Features
1. **Exact format replication** — Table-based layout matching the reference: company header with logo, employee details grid, hours/days section, earnings & deductions table, gross totals, net transfer, and amount in words
2. **All fields editable** with prefilled sample data from the reference (EMPCODE: 3330637, etc.)
3. **Company details hardcoded** — TaskUS India Private Limited, registered office address, TaskUs logo embedded
4. **Live preview** updates as user types
5. **Download as PDF** button using html2canvas + jsPDF
6. **Auto-calculation** — Gross Earnings, Gross Deduction, and Net Transfer compute automatically from individual amounts

### Prefilled Sample Data
- Employee: Aniket subhash Yadav, EMPCODE 3330637, PAN AMSPY4500B
- Earnings: Basic Pay ₹14,500, HRA ₹5,800, Bonus ₹2,900, Other Allowances ₹3,181, etc.
- Deductions: PF ₹1,740, Labour Welfare Fund ₹25, Professional Tax ₹200
- All the hours/days fields (STD Days: 31, WRKDAYS: 29, LOP Days: 2, etc.)

### Design
- Clean white background with black borders matching the original document style
- Monospaced/tabular number alignment for amounts
- Print-friendly layout
