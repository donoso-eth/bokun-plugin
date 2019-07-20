



//// AQUI EMPEZAMOS

export interface PluginDefinition {

  name: string;
  description?: string;
  capabilities: Array<PluginCapability>;
  parameters: Array<PluginConfigurationParameter>;
}

export enum  PluginCapability {
  Pricing = 'SUPPORTS_PRICING',
  Reservation = 'SUPPORTS_RESERVATIONS',
  Availability = 'SUPPORTS_AVAILABILITY'
}

export interface PluginConfigurationParameter {
  name: string;
  type: PluginParameterDataType;
  required: boolean;
}

export interface PluginConfigurationParameterValue {
  name: string;
  value: string;
}

export enum PluginParameterDataType {
  Long = 'LONG',
  Double = 'DOUBLE',
  Boolean = 'BOOLEAN',
  String = 'STRING'
}

export interface SearchProductRequest {

  productName?: string;
  country?: string;
  city?: string;
  parameters: Array<PluginConfigurationParameterValue>;
}

export interface GetProductByIDRequest {
  externalId: string;
  parameters: Array<PluginConfigurationParameterValue>;
}

export interface ProductsAvailabilityRequest {
  range: DatePeriod;
  requiredCapacity: number;
  externalProductIds: Array<string>;
  parameters: Array<PluginConfigurationParameterValue>;
}

export interface ProductAvailabilityRequest {
  range: DatePeriod;
  productId: string;
  parameters: Array<PluginConfigurationParameterValue>;
}

export interface ReservationRequest {
  parameters: Array<PluginConfigurationParameterValue>;
  reservationData: ReservationData;
}

export interface ConfirmBookingRequest {
  parameters: Array<PluginConfigurationParameterValue>;
  reservationConfirmationCode: string;
  reservationData: ReservationData;
  confirmationData: ConfirmationData;
}

export interface CancelBookingRequest {

  parameters: Array<PluginConfigurationParameterValue>;
  bookingConfirmationCode: string;
  agentCode?: string;
}

export interface CancelBookingResponse {
  successfulCancellation?: SuccessfulCancellation;
  failedCancellation?: FailedCancellation;
}

export interface FailedCancellation {
  cancellationError: string;
}

export interface ConfirmationData {
  ticketSupport: TicketSupport;
}

export interface ConfirmBookingResponse {
  successfulBooking?: SuccessfulBooking;
  failedBooking?: FailedBooking;
}
export interface SuccessfulBooking {
  bookingConfirmationCode: string;
  ticketsPerPassenger?: TicketsPerPricingCategory;
  bookingTicket?: Ticket;
}

export interface FailedBooking {
  bookingError: string;
}
export interface Ticket {
  binaryTicket?: BinaryTicket;
  qrTicket?: QrTicket;
  dataMatrixTicket?: DataMatrixTicketProperties;
}
export interface QrTicket {
  ticketBarcode: string;
  offlineCode: string;
}

export interface DataMatrixTicketProperties {
  ticketBarcode: string;
  offlineCode: string;
}
export interface TicketPerPricingCategory {
  pricingCategory?: string;
  ticket: Ticket;
}

export interface TicketsPerPricingCategory {
  ticketPerPricingCategory: Array<TicketPerPricingCategory>;
}

export interface BasicProductInfo {
  id: string;
  name: string;
  description: string;
  pricingCategories: Array<PricingCategory>;
  cities: Array<string>;
  countries: Array<string>;
}

export interface PricingCategory {
  id: string;
  label: string;
  minAge?: string;
  maxAge?: string;
}

export interface ProductDescription {
  id: string;
  name: string;
  description?: string;
  pricingCategories: Array<PricingCategory>;
  rates: Array<Rate>;
  allYearOpeningHours?: OpeningHours;
  seasonalOpeningHours?: SeasonalOpeningHourSet;
  bookingType: BookingType;
  customPickupPlaceAllowed?: boolean;
  pickupMinutesBefore?: number;
  pickupPlaces?: Array<PickupDropoffPlace>;
  dropoffAvailable: boolean;
  customDropoffPlaceAllowed?: boolean;
  dropoffPlaces?: Array<PickupDropoffPlace>;
  productCategory: ProductCategory;
  ticketSupport: Array<TicketSupport>;
  countries?: Array<string>;
  cities?: Array<string>;
  startTimes?: Array<Time>;
  ticketType?: TicketType;
  meetingType: MeetingType;
  enforcedLeadPassengerFields?: Array<ContactField>;
  enforcedTravellerFields?: Array<ContactField>;
  extras?: Array<Extra>;
}

export interface ProductsAvailabilityResponse {
  productId: string;
  actualCheckDone: boolean;
}

export interface ProductAvailabilityWithRatesResponse {
  capacity: number;
  date: DateYMD;
  time: Time;
  pickupTime?: Time;
  rates: Array<RateWithPrice>;
}

export interface ReservationResponse {
  successfulReservation?: SuccessfulReservation;
  failedReservation?: FailedReservation;
}

export interface SuccessfulReservation {
  reservationConfirmationCode: string;
}
export interface FailedReservation {
  reservationError: string;
}

export interface RateWithPrice {
  rateId: string;
  pricePerPerson?: PricePerPerson;
  pricePerBooking?: PricePerBooking;
}

export interface PricePerBooking {
  price: Price;
}

export interface PricePerPerson {
  pricingCategoryWithPrice: Array<PricingCategoryWithPrice>;
}

export interface PricingCategoryWithPrice {
  pricingCategoryId: string;
  price: Price;
}
export interface Price {
  currency: string;
  amount: string;
}

export enum  ProductCategory  {
    Accomodation = 'ACCOMMODATION',
    Activities = 'ACTIVITIES',
    CarRentals = 'CAR_RENTALS',
    Transport = 'TRANSPORT'
}

export interface Rate {
  id: string;
  label: string;
}

export interface OpeningHours {
  monday: OpeningHoursWeekday;
  tuesday: OpeningHoursWeekday;
  wednesday: OpeningHoursWeekday;
  thursday: OpeningHoursWeekday;
  friday: OpeningHoursWeekday;
  saturday: OpeningHoursWeekday;
  sunday: OpeningHoursWeekday;
}

export interface OpeningHoursWeekday {
  open24Hours: string;
  timeIntervals: Array<OpeningHoursTimeInterval>;
}

export interface OpeningHoursTimeInterval {
  openFrom: string;
  openForHours: number;
  openForMinutes: number;
  duration?: Duration;
}

export interface Duration {
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
}

export interface SeasonalOpeningHourSet {
  seasonalOpeningHours: Array<SeasonalOpeningHours>;
}

export interface SeasonalOpeningHours {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  openingHours: string;
}

export interface Contact {
  firstName?: string;
  lastName?: string;
  title?: Title;
  email?: string;
  phone?: string;
  language?: string;
  nationality?: string;
  country?: string;
  gender?: Gender;
  address?: string;
  postCode?: string;
  organization?: string;
  passportNumber?: string;
  passportExpiry?: DateYMD;
}

export enum BookingType {
  Date= 'DATE',
  DateTime = 'DATE_AND_TIME',
  Pass = 'PASS'
}

export enum TicketSupport {
   PerPerson =  'TICKET_PER_PERSON',
   PerBooking = 'TICKET_PER_BOOKING',
   NotREeuired = 'TICKETS_NOT_REQUIRED'
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  geoPoint: GeoPoint;
  unLocode: UnLocode;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface UnLocode {
  country: string;
  city: string;
}

export interface PickupDropoffPlace {
  title: string;
  address: Address;
}

export interface Time {
  hour: number;
  minute: number;
}

export enum TicketType  {
  Binary =  'BINARY',
  QR_Code =   'QR_CODE',
  DataMatrix =  'DATA_MATRIX'
}

export enum  MeetingType  {
  MeetLocation =   'MEET_ON_LOCATION',
  MeetLocationorPick =   'MEET_ON_LOCATION_OR_PICK_UP',
  PickUp  =  'PICK_UP'
}

export enum ContactField {

   Gender =  'GENDER',
   Title =  'TITLE',
   FirstName=  'FIRST_NAME',
   LastName =  'LAST_NAME',
   Email =  'EMAIL',
   Phone =  'PHONE',
   Languaje = 'LANGUAGE',
   Nationality =  'NATIONALITY',
   Country =  'COUNTRY',
   Organization =  'ORGANIZATION',
   Address=  'ADDRESS',
   PostCode = 'POST_CODE',
   PassportNumer=  'PASSPORT_NUMBER',
   PassportExppiry =  'PASSPORT_EXPIRY'

}

export enum  Title  {
    Mrs = 'MRS',
    Miss = 'MISS',
    Mr = 'MR'

}

export enum Gender {
   Male =  'MALE',
    Female = 'FEMALE'

}

export enum ExtraPricingType {
 PerPerson =  'PER_PERSON',
  PerBooking =   'PER_BOOKING'
}

export interface DateYMD {
  year: number;
  month: number;
  day: number;
}
export interface DatePeriod {
  from: DateYMD;
  to: DateYMD;
}

export interface ExtraBooking {
  extraId: string;
  amount: number;
  pricingType: ExtraPricingType;
}

export interface Reservation {
  rateId: string;
  passengers: Array<Passenger>;
  pricePerBooking?: Price;
  extraBooking?: Array<ExtraBooking>;
}

export interface ReservationData {
  productId: string;
  customerContact?: Contact;
  notes?: string;
  date: DateYMD;
  time?: Time;
  pickupRequired?: boolean;
  customPickupPlace?: string;
  predefinedPickupPlace?: PickupDropoffPlace;
  dropoffRequired?: boolean;
  customDropoffPlace?: string;
  predefinedDropoffPlace?: PickupDropoffPlace;
  reservations: Array<Reservation>;
  platformId: string;
  bookingSource: BookingSource;
  externalSaleId?: string;
  agentCode?: string;
}

export interface Passenger {
  pricingCategoryId?: string;
  contact: string;
  pricePerPassenger?: Price;
}

export interface BinaryTicket {
  ticketContent: string;
}

export interface BookingSourceBookingAgent {
  id: string;
  title: string;
  companyRegistrationNumber?: string;
}

export interface BookingSourceMarketplaceVendor {
  id: string;
  title: string;
  companyRegistrationNumber?: string;
  contractResellerId?: string;
}

export interface BookingSourceBookingChannel {
  id: string;
  title: string;
  systemType?: string;
}

export interface BookingSourceExtranetUser {
  email: string;
  fullName: string;
}

export interface BookingSource {
  segment: string;
  bookingChannel: BookingSourceBookingChannel;
  extranetUser?: BookingSourceExtranetUser;
  bookingAgent?: BookingSourceBookingAgent;
  marketplaceVendor?: BookingSourceMarketplaceVendor;
}


export interface Extra {
  id: string;
  title: string;
  description?: string;
  optional: boolean;
  maxPerBooking?: number;
  limitByPax?: boolean;
  increasesCapacity?: boolean;
}


///// AQUI ACABAMOS

export interface SuccessfulCancellation {
   type: string;
 }







