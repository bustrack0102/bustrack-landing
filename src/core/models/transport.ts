export interface RouteItem {
  id: string;
  code: string;
  name: string;
  origin: string;
  destination: string;
  company: string;
  transportType: 'Autobús Urbano' | 'Combi / Urvan' | 'Suburbano';
  fareGeneralMxn: number;
  fareStudentMxn: number;
  frequencyMinutes: number;
  firstDeparture: string;
  lastDeparture: string;
  estimatedDurationMin: number;
  occupancyLevel: 'Baja' | 'Moderada' | 'Alta';
  stops: string[];
}

export const OFFICIAL_ROUTES_CATALOG: RouteItem[] = [
  {
    id: 'ruta-uttt-01',
    code: 'R-01',
    name: 'Tula Centro ↔ Universidad Tecnológica (UTTT)',
    origin: 'Plaza del Nacionalismo, Tula Centro',
    destination: 'Campus Central UTTT (El Carmen)',
    company: 'Autotransportes Valle del Mezquital (AVM)',
    transportType: 'Autobús Urbano',
    fareGeneralMxn: 14,
    fareStudentMxn: 10,
    frequencyMinutes: 12,
    firstDeparture: '05:45',
    lastDeparture: '21:30',
    estimatedDurationMin: 22,
    occupancyLevel: 'Moderada',
    stops: [
      'Plaza del Nacionalismo (Tula)',
      'Blvd. Tula-Iturbe',
      'Jorobas - Crucero El Llano',
      'Colonia El Alvarado',
      'Acceso Principal UTTT',
    ],
  },
  {
    id: 'ruta-tepeji-02',
    code: 'R-02',
    name: 'Tepeji del Río ↔ Campus UTTT Directo',
    origin: 'Jardín Municipal, Tepeji del Río',
    destination: 'Campus Central UTTT (El Carmen)',
    company: 'Transportes Unidos Tula-Tepeji',
    transportType: 'Suburbano',
    fareGeneralMxn: 20,
    fareStudentMxn: 15,
    frequencyMinutes: 20,
    firstDeparture: '06:00',
    lastDeparture: '21:00',
    estimatedDurationMin: 35,
    occupancyLevel: 'Baja',
    stops: [
      'Jardín Municipal Tepeji',
      'Parque Industrial Tepeji',
      'Cañada de Madero',
      'Santa María Quelites',
      'Campus Central UTTT',
    ],
  },
  {
    id: 'ruta-tlahuelilpan-03',
    code: 'R-03',
    name: 'Tlahuelilpan ↔ Tula Hospital Regional',
    origin: 'Centro de Tlahuelilpan',
    destination: 'Hospital Regional Tula-Tepeji',
    company: 'Colectivos Región Tula S.A.',
    transportType: 'Combi / Urvan',
    fareGeneralMxn: 16,
    fareStudentMxn: 12,
    frequencyMinutes: 15,
    firstDeparture: '06:15',
    lastDeparture: '20:45',
    estimatedDurationMin: 28,
    occupancyLevel: 'Moderada',
    stops: [
      'Centro Tlahuelilpan',
      'Tezontepec Crucero',
      'Tlaxcoapan Centro',
      'Zona Arqueológica Tula',
      'Hospital Regional Tula-Tepeji',
    ],
  },
  {
    id: 'ruta-atitalaquia-04',
    code: 'R-04',
    name: 'Atitalaquia ↔ Refinería / UTTT',
    origin: 'Plaza Principal Atitalaquia',
    destination: 'Campus Central UTTT',
    company: 'Autotransportes Valle del Mezquital (AVM)',
    transportType: 'Autobús Urbano',
    fareGeneralMxn: 15,
    fareStudentMxn: 11,
    frequencyMinutes: 18,
    firstDeparture: '05:50',
    lastDeparture: '21:15',
    estimatedDurationMin: 25,
    occupancyLevel: 'Alta',
    stops: [
      'Plaza Principal Atitalaquia',
      'Parque Industrial Atitalaquia',
      'Refinería Miguel Hidalgo (Puerta 1)',
      'El Llano 2da Sección',
      'Campus Central UTTT',
    ],
  },
];
