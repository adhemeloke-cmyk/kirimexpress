export interface RouteOption {
  id: string;
  name: string;
  origin: string;
  destination: string;
  description: string;
}

export const SHIPPING_ROUTES: RouteOption[] = [
  {
    id: 'ternate-sofifi',
    name: 'Ternate → Sofifi',
    origin: 'Ternate',
    destination: 'Sofifi',
    description: 'Pengiriman Lokal Maluku Utara',
  },
  {
    id: 'jakarta-ternate',
    name: 'Jakarta → Ternate',
    origin: 'Jakarta',
    destination: 'Ternate',
    description: 'Kargo Laut Antar Pulau',
  },
  {
    id: 'jakarta-sofifi',
    name: 'Jakarta → Sofifi',
    origin: 'Jakarta',
    destination: 'Sofifi',
    description: 'Kargo Laut Terusan Sofifi',
  },
];

export const TERNATE_SOFIFI_TABLE: { [kg: number]: number } = {
  1: 28000,
  2: 53000,
  3: 71000,
  4: 89000,
  5: 105000,
  6: 125000,
  7: 145000,
  8: 165000,
  9: 183000,
  10: 200000,
  11: 222000,
  12: 244000,
  13: 266000,
  14: 288000,
  15: 310000,
  16: 332000,
  17: 354000,
  18: 370000,
  19: 385000,
  20: 400000,
  21: 415000,
  22: 430000,
  23: 445000,
  24: 460000,
  25: 475000,
};

export const JAKARTA_TERNATE_TABLE: { [kg: number]: number } = {
  1: 20000,
  2: 40000,
  3: 60000,
  4: 80000,
  5: 100000,
  6: 120000,
  7: 140000,
  8: 160000,
  9: 180000,
  10: 200000,
  11: 220000,
  12: 240000,
  13: 260000,
  14: 280000,
  15: 300000,
  16: 320000,
  17: 340000,
};

export const JAKARTA_SOFIFI_TABLE: { [kg: number]: number } = {
  1: 35000,
  2: 53000,
  3: 71000,
  4: 89000,
  5: 105000,
  6: 125000,
  7: 145000,
  8: 165000,
  9: 183000,
  10: 200000,
  11: 222000,
  12: 244000,
  13: 266000,
  14: 288000,
  15: 310000,
  16: 332000,
  17: 354000,
  18: 370000,
  19: 385000,
  20: 400000,
  21: 415000,
  22: 430000,
  23: 445000,
  24: 460000,
  25: 475000,
};

export interface CalculationResult {
  routeId: string;
  routeName: string;
  weightInput: number;
  roundedKg: number;
  cost: number | null;
  isAskCS: boolean;
  label: string;
}

export function calculateShippingRate(routeId: string, weightKg: number): CalculationResult {
  const roundedKg = Math.max(1, Math.ceil(weightKg));

  if (routeId === 'ternate-sofifi') {
    if (weightKg > 25) {
      return {
        routeId,
        routeName: 'Ternate → Sofifi',
        weightInput: weightKg,
        roundedKg,
        cost: null,
        isAskCS: true,
        label: 'Lebih dari 25 kg: Tanya CS',
      };
    }
    const cost = TERNATE_SOFIFI_TABLE[roundedKg];
    if (cost !== undefined) {
      return {
        routeId,
        routeName: 'Ternate → Sofifi',
        weightInput: weightKg,
        roundedKg,
        cost,
        isAskCS: false,
        label: roundedKg <= 1 ? '≤ 1 kg (Tarif Minimum)' : `${roundedKg} kg`,
      };
    }
    return {
      routeId,
      routeName: 'Ternate → Sofifi',
      weightInput: weightKg,
      roundedKg,
      cost: null,
      isAskCS: true,
      label: 'Tanya CS',
    };
  }

  if (routeId === 'jakarta-ternate') {
    if (weightKg > 25) {
      return {
        routeId,
        routeName: 'Jakarta → Ternate',
        weightInput: weightKg,
        roundedKg,
        cost: null,
        isAskCS: true,
        label: 'Lebih dari 25 kg: Tanya CS',
      };
    }
    if (roundedKg <= 17) {
      const cost = JAKARTA_TERNATE_TABLE[roundedKg];
      return {
        routeId,
        routeName: 'Jakarta → Ternate',
        weightInput: weightKg,
        roundedKg,
        cost,
        isAskCS: false,
        label: roundedKg <= 1 ? '≤ 1 kg' : `${roundedKg} kg`,
      };
    }
    // 18-25 kg
    const cost = roundedKg * 20000;
    return {
      routeId,
      routeName: 'Jakarta → Ternate',
      weightInput: weightKg,
      roundedKg,
      cost,
      isAskCS: false,
      label: `${roundedKg} kg (Rp 20.000/kg)`,
    };
  }

  // default: jakarta-sofifi
  if (weightKg > 25) {
    return {
      routeId,
      routeName: 'Jakarta → Sofifi',
      weightInput: weightKg,
      roundedKg,
      cost: null,
      isAskCS: true,
      label: 'Lebih dari 25 kg: Tanya CS',
    };
  }

  const cost = JAKARTA_SOFIFI_TABLE[roundedKg];
  if (cost !== undefined) {
    return {
      routeId,
      routeName: 'Jakarta → Sofifi',
      weightInput: weightKg,
      roundedKg,
      cost,
      isAskCS: false,
      label: roundedKg <= 1 ? '≤ 1 kg' : `${roundedKg} kg`,
    };
  }

  return {
    routeId,
    routeName: 'Jakarta → Sofifi',
    weightInput: weightKg,
    roundedKg,
    cost: null,
    isAskCS: true,
    label: 'Tanya CS',
  };
}
