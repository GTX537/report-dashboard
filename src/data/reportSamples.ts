export interface SummaryReportRow {
  key: string
  size: string
  operatorD: number
  operatorN: number
  operatorS: number
  operatorNP: number
  operatorTotal: number
  leaderD: number
  leaderN: number
  leaderS: number
  leaderNP: number
  leaderTotal: number
  qcD: number
  qcN: number
  qcS: number
  qcNP: number
  qcTotal: number
  warehouseD: number
  warehouseN: number
  warehouseS: number
  warehouseNP: number
  warehouseTotal: number
  staffD: number
  staffN: number
  staffS: number
  staffNP: number
  staffTotal: number
  sumTotal: number
}

export const summaryReportRows: SummaryReportRow[] = [
  {
    key: 'small',
    size: 'Small',
    operatorD: 3,
    operatorN: 15,
    operatorS: 18,
    operatorNP: 0,
    operatorTotal: 36,
    leaderD: 5,
    leaderN: 2,
    leaderS: 0,
    leaderNP: 0,
    leaderTotal: 7,
    qcD: 1,
    qcN: 0,
    qcS: 1,
    qcNP: 0,
    qcTotal: 2,
    warehouseD: 0,
    warehouseN: 2,
    warehouseS: 0,
    warehouseNP: 0,
    warehouseTotal: 2,
    staffD: 3,
    staffN: 1,
    staffS: 0,
    staffNP: 0,
    staffTotal: 4,
    sumTotal: 51,
  },
  {
    key: 'medium',
    size: 'Medium',
    operatorD: 5,
    operatorN: 17,
    operatorS: 23,
    operatorNP: 1,
    operatorTotal: 46,
    leaderD: 4,
    leaderN: 1,
    leaderS: 0,
    leaderNP: 0,
    leaderTotal: 5,
    qcD: 2,
    qcN: 1,
    qcS: 0,
    qcNP: 0,
    qcTotal: 3,
    warehouseD: 1,
    warehouseN: 1,
    warehouseS: 0,
    warehouseNP: 0,
    warehouseTotal: 2,
    staffD: 6,
    staffN: 3,
    staffS: 0,
    staffNP: 0,
    staffTotal: 9,
    sumTotal: 65,
  },
  {
    key: 'large',
    size: 'Large',
    operatorD: 9,
    operatorN: 20,
    operatorS: 29,
    operatorNP: 0,
    operatorTotal: 58,
    leaderD: 6,
    leaderN: 0,
    leaderS: 1,
    leaderNP: 0,
    leaderTotal: 7,
    qcD: 0,
    qcN: 1,
    qcS: 1,
    qcNP: 0,
    qcTotal: 2,
    warehouseD: 4,
    warehouseN: 2,
    warehouseS: 0,
    warehouseNP: 0,
    warehouseTotal: 6,
    staffD: 8,
    staffN: 2,
    staffS: 0,
    staffNP: 0,
    staffTotal: 10,
    sumTotal: 83,
  },
  {
    key: 'extra',
    size: 'EXTRA 36',
    operatorD: 2,
    operatorN: 4,
    operatorS: 8,
    operatorNP: 0,
    operatorTotal: 14,
    leaderD: 1,
    leaderN: 0,
    leaderS: 0,
    leaderNP: 0,
    leaderTotal: 1,
    qcD: 0,
    qcN: 0,
    qcS: 0,
    qcNP: 0,
    qcTotal: 0,
    warehouseD: 0,
    warehouseN: 1,
    warehouseS: 0,
    warehouseNP: 0,
    warehouseTotal: 1,
    staffD: 0,
    staffN: 0,
    staffS: 0,
    staffNP: 0,
    staffTotal: 0,
    sumTotal: 16,
  },
]

export interface DetailReportRow {
  key: number
  document: string
  hrDate: string
  empId: string
  empType: string
  factory: string
  plant: string
  costCode: string
  costCenter: string
  department: string
  location: string
  name: string
  requester: string
  reqExt: string
  requestDate: string
  status: string
  lastUpdate: string
  uniformType: string
  uniformSize: string
  shoe: string
  slipper: string
  qty: number
}

export const detailReportRows: DetailReportRow[] = [
  {
    key: 1,
    document: '251000314',
    hrDate: '01/10/2025',
    empId: '86037969',
    empType: 'DET06',
    factory: 'QUALITY IMAGING',
    plant: 'CPTH1',
    costCode: 'S241AD12',
    costCenter: 'CP QA/ QC/ RMO',
    department: 'QA/QC RMO',
    location: 'Wellgrow',
    name: 'CHADANUD CHAIWANGYEN',
    requester: 'QA/QC/RMO',
    reqExt: '+132-6087',
    requestDate: '01/10/2025 15:10',
    status: 'Final',
    lastUpdate: '01/10/2025 18:20',
    uniformType: 'Q/C',
    uniformSize: 'XXL',
    shoe: '35',
    slipper: '0',
    qty: 2,
  },
  {
    key: 2,
    document: '251000331',
    hrDate: '01/10/2025',
    empId: '86496659',
    empType: 'DET06',
    factory: 'PLANT 6 ADMINISTRATION',
    plant: 'DET05',
    costCode: 'SG2414D12',
    costCenter: 'DET OSH',
    department: 'PRODUCTION',
    location: 'Bangpoo',
    name: 'NUTTAYA SWAPHONSAKUN',
    requester: 'DET OSH',
    reqExt: '+132-5917',
    requestDate: '01/10/2025 15:05',
    status: 'Final',
    lastUpdate: '01/10/2025 18:19',
    uniformType: 'S/F',
    uniformSize: 'S',
    shoe: '40',
    slipper: '0',
    qty: 2,
  },
  {
    key: 3,
    document: '251000323',
    hrDate: '26/10/2022',
    empId: '86383994',
    empType: 'DET06',
    factory: 'EMI',
    plant: 'DET06',
    costCode: 'S2314020',
    costCenter: 'TMPBU Products_LCS',
    department: 'PRODUCTION',
    location: 'Wellgrow',
    name: 'ANCHALEE KANKAWE',
    requester: 'PRODUCTION',
    reqExt: '133-3522',
    requestDate: '01/10/2025 15:05',
    status: 'Final',
    lastUpdate: '01/10/2025 18:20',
    uniformType: 'O/P',
    uniformSize: 'EXTRA 36',
    shoe: '0',
    slipper: '0',
    qty: 2,
  },
]

export interface CostcenterSummaryRow {
  key: number
  item: string
  plant: string
  factory: string
  department: string
  costCode: string
  costCenter: string
  requester: string
  uniformPerson: number
  uniformPrice: number
  slipperPerson: number
  slipperPrice: number
  shoePerson: number
  shoePrice: number
  total: number
}

export const costcenterSummaryRows: CostcenterSummaryRow[] = [
  {
    key: 1,
    item: 'COOLING FAN',
    plant: 'DET06',
    factory: 'PROJECT/NPI',
    department: 'DET06',
    costCode: 'S241AD07',
    costCenter: 'NPI FAN',
    requester: '2',
    uniformPerson: 2,
    uniformPrice: 1540,
    slipperPerson: 0,
    slipperPrice: 0,
    shoePerson: 1,
    shoePrice: 230,
    total: 1770,
  },
  {
    key: 2,
    item: 'QUALITY MNG7',
    plant: 'DET07',
    factory: 'QA/QC/RMO',
    department: 'DET07',
    costCode: 'S24145HP',
    costCenter: 'QA-HP-Prevention',
    requester: '1',
    uniformPerson: 1,
    uniformPrice: 770,
    slipperPerson: 0,
    slipperPrice: 0,
    shoePerson: 0,
    shoePrice: 0,
    total: 770,
  },
]

export interface CostcenterDetailRow {
  key: number
  category: string
  amount: number
  remark: string
}

export const costcenterDetailRows: CostcenterDetailRow[] = [
  { key: 1, category: 'Uniform Expense', amount: 2310, remark: 'Delta Employee — 2 sets' },
  { key: 2, category: 'Slipper Expense', amount: 230, remark: 'Full Year Employee — 2 sets' },
  { key: 3, category: 'Shoe Expense', amount: 0, remark: 'Sub-contract — 2 sets' },
]

export interface CostcenterPriceRow {
  key: number
  type: string
  price: number
  reason: string
}

export const costcenterPriceRows: CostcenterPriceRow[] = [
  { key: 1, type: 'Uniform', price: 770, reason: '1 person = 2 sets' },
  { key: 2, type: 'Slipper', price: 115, reason: '1 person = 2 sets' },
  { key: 3, type: 'Shoe', price: 135, reason: '1 person = 2 sets' },
]

export interface FactorySummaryRow {
  key: string
  factory: string
  slipperRequest: number
  shoeRequest: number
  uniformRequest: number
  totalRequest: number
  slipperExpense: number
  shoeExpense: number
  uniformExpense: number
  totalExpense: number
}

export const factorySummaryRows: FactorySummaryRow[] = [
  {
    key: 'cpt1',
    factory: 'CPTH1',
    slipperRequest: 5,
    shoeRequest: 0,
    uniformRequest: 9,
    totalRequest: 14,
    slipperExpense: 575,
    shoeExpense: 0,
    uniformExpense: 6930,
    totalExpense: 7505,
  },
  {
    key: 'det15',
    factory: 'DET15',
    slipperRequest: 0,
    shoeRequest: 0,
    uniformRequest: 0,
    totalRequest: 0,
    slipperExpense: 0,
    shoeExpense: 0,
    uniformExpense: 0,
    totalExpense: 0,
  },
  {
    key: 'det06',
    factory: 'DET06',
    slipperRequest: 90,
    shoeRequest: 2,
    uniformRequest: 110,
    totalRequest: 202,
    slipperExpense: 10350,
    shoeExpense: 270,
    uniformExpense: 84370,
    totalExpense: 94990,
  },
  {
    key: 'total',
    factory: 'Total',
    slipperRequest: 118,
    shoeRequest: 2,
    uniformRequest: 164,
    totalRequest: 284,
    slipperExpense: 13570,
    shoeExpense: 270,
    uniformExpense: 126280,
    totalExpense: 140120,
  },
]
