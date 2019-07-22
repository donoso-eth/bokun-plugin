export const defs = {
  $id: 'http://example.com/schemas/defs.json',
  type: 'object',
  definitions: {
    int: { type: 'integer' },
    str: { type: 'string' },

    PluginParameterDataType: {
      type: 'string',
      enum: [
        'LONG',
        'DOUBLE',
        'BOOLEAN',
        'STRING'
      ]
    },

    PluginCapability: {
      type: 'string',
      enum: [
        'SUPPORTS_PRICING',
        'SUPPORTS_RESERVATIONS',
        'SUPPORTS_AVAILABILITY'
      ]
    },

    BookingType: {
      type: 'string',
      enum: [
        'DATE',
        'DATE_AND_TIME',
        'PASS'
      ]
    },

    ProductCategory: {
      type: 'string',
      enum: [
        'ACCOMMODATION',
        'ACTIVITIES',
        'CAR_RENTALS',
        'TRANSPORT'
      ]
    },

    TicketSupport: {
      type: 'string',
      enum: [
        'TICKET_PER_PERSON',
        'TICKET_PER_BOOKING',
        'TICKETS_NOT_REQUIRED'
      ]
    },

    TicketType: {
      type: 'string',
      enum: [
        'BINARY',
        'QR_CODE',
        'DATA_MATRIX'
      ]
    },

    MeetingType: {
      type: 'string',
      enum: [
        'MEET_ON_LOCATION',
        'MEET_ON_LOCATION_OR_PICK_UP',
        'PICK_UP'
      ]
    },

    ContactField: {
      type: 'string',
      enum: [
        'GENDER',
        'TITLE',
        'FIRST_NAME',
        'LAST_NAME',
        'EMAIL',
        'PHONE',
        'LANGUAGE',
        'NATIONALITY',
        'COUNTRY',
        'ORGANIZATION',
        'ADDRESS',
        'POST_CODE',
        'PASSPORT_NUMBER',
        'PASSPORT_EXPIRY'
      ]
    },

    PluginConfigurationParameter: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        type: {
          $ref: 'defs.json#/definitions/PluginParameterDataType'
        },
        required: {
          type: 'boolean',
          default: false
        }
      }
    },

    PluginConfigurationParameterValue: {
      type: 'object',
      required: [
        'name',
        'value'
      ],
      properties: {
        name: {
          type: 'string'
        },
        value: {
          type: 'string'
        }
      }
    },

    PluginDefinition: {
      type: 'object',
      required: [
        'name',
        'capabilities',
        'parameters'
      ],
      properties: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        capabilities: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginCapability'
          }
        },
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameter'
          }
        }
      }
    },

    SearchProductRequest: {
      type: 'object',
      required: [
        'parameters'
      ],
      properties: {
        productName: {
          type: 'string'
        },
        country: {
          type: 'string'
        },
        city: {
          type: 'string'
        },
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        }
      }
    },

    SearchProductResponse: {
      type: 'array',
          items: {
            $ref: 'defs.json#/definitions/BasicProductInfo'
          }
    },

    GetProductByIdRequest: {
      type: 'object',
      required: [
        'externalId',
        'parameters'
      ],
      properties: {
        externalId: {
          type: 'string'
        },
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        }
      }
    },

    BasicProductInfo: {
      type: 'object',
      required: [
        'id',
        'name'
      ],
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        pricingCategories: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PricingCategory'
          }
        },
        cities: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        countries: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    },

    PricingCategory: {
      type: 'object',
      required: [
        'id',
        'label'
      ],
      properties: {
        id: {
          type: 'string'
        },
        label: {
          type: 'string'
        },
        minAge: {
          type: 'integer'
        },
        maxAge: {
          type: 'integer'
        }
      }
    },

    Rate: {
      type: 'object',
      required: [
        'id',
        'label'
      ],
      properties: {
        id: {
          type: 'string'
        },
        label: {
          type: 'string'
        }
      }
    },

    Duration: {
      type: 'object',
      required: [
        'minutes',
        'hours',
        'days',
        'weeks'
      ],
      properties: {
        minutes: {
          type: 'integer'
          ,
          default: 0
        },
        hours: {
          type: 'integer'
          ,
          default: 0
        },
        days: {
          type: 'integer'
          ,
          default: 0
        },
        weeks: {
          type: 'integer'
          ,
          default: 0
        }
      }
    },

    OpeningHoursTimeInterval: {
      type: 'object',
      required: [
        'openFrom',
        'openForHours',
        'openForMinutes'
      ],
      properties: {
        openFrom: {
          type: 'string'
        },
        openForHours: {
          type: 'integer'

        },
        openForMinutes: {
          type: 'integer'

        },
        duration: {
          $ref: 'defs.json#/definitions/Duration'
        }
      }
    },

    OpeningHoursWeekday: {
      type: 'object',
      required: [
        'open24Hours'
      ],
      properties: {
        open24Hours: {
          type: 'boolean'
        },
        timeIntervals: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/OpeningHoursTimeInterval'
          }
        }
      }
    },

    OpeningHours: {
      type: 'object',
      required: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ],
      properties: {
        monday: {
          $ref: 'defs.json#/definitions/OpeningHoursWeekday'
        },
        tuesday: {
          $ref: 'defs.json#/definitions/OpeningHoursWeekday'
        },
        wednesday: {
          $ref: 'defs.json#/definitions/OpeningHoursWeekday'
        },
        thursday: {
          $ref: 'defs.json#/definitions/OpeningHoursWeekday'
        },
        friday: {
          $ref: 'defs.json#/definitions/OpeningHoursWeekday'
        },
        saturday: {
          $ref: 'defs.json#/definitions/OpeningHoursWeekday'
        },
        sunday: {
          $ref: 'defs.json#/definitions/OpeningHoursWeekday'
        }
      }
    },

    SeasonalOpeningHours: {
      type: 'object',
      required: [
        'startMonth',
        'startDay',
        'endMonth',
        'endDay',
        'openingHours'
      ],
      properties: {
        startMonth: {
          type: 'integer'

        },
        startDay: {
          type: 'integer'

        },
        endMonth: {
          type: 'integer'

        },
        endDay: {
          type: 'integer'

        },
        openingHours: {
          $ref: 'defs.json#/definitions/OpeningHours'
        }
      }
    },

    SeasonalOpeningHourSet: {
      type: 'object',
      required: [
        'seasonalOpeningHours'
      ],
      properties: {
        seasonalOpeningHours: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/SeasonalOpeningHours'
          }
        }
      }
    },

    GeoPoint: {
      type: 'object',
      required: [
        'latitude',
        'longitude'
      ],
      properties: {
        latitude: {
          type: 'number'
        },
        longitude: {
          type: 'number'
        }
      }
    },

    UnLocode: {
      type: 'object',
      required: [
        'country',
        'city'
      ],
      properties: {
        country: {
          type: 'string'
        },
        city: {
          type: 'string'
        }
      }
    },

    Address: {
      type: 'object',
      properties: {
        addressLine1: {
          type: 'string'
        },
        addressLine2: {
          type: 'string'
        },
        addressLine3: {
          type: 'string'
        },
        city: {
          type: 'string'
        },
        state: {
          type: 'string'
        },
        postalCode: {
          type: 'string'
        },
        countryCode: {
          type: 'string'
        },
        geoPoint: {
          $ref: 'defs.json#/definitions/GeoPoint'
        },
        unLocode: {
          $ref: 'defs.json#/definitions/UnLocode'
        }
      }
    },

    PickupDropoffPlace: {
      type: 'object',
      required: [
        'title',
        'address'
      ],
      properties: {
        title: {
          type: 'string'
        },
        address: {
          $ref: 'defs.json#/definitions/Address'
        }
      }
    },

    Time: {
      type: 'object',
      required: [
        'hour',
        'minute'
      ],
      properties: {
        hour: {
          type: 'integer'

        },
        minute: {
          type: 'integer'

        }
      }
    },

    Extra: {
      type: 'object',
      required: [
        'id',
        'title',
        'optional'
      ],
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        optional: {
          type: 'boolean'
        },
        maxPerBooking: {
          type: 'integer'

        },
        limitByPax: {
          type: 'boolean'
        },
        increasesCapacity: {
          type: 'boolean'
        }
      }
    },

    ProductDescription: {
      type: 'object',
      required: [
        'id',
        'name',
        'pricingCategories',
        'rates',
        'bookingType',
        'dropoffAvailable',
        'productCategory',
        'ticketSupport',
        'meetingType'
      ],
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        pricingCategories: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PricingCategory'
          }
        },
        rates: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/Rate'
          }
        },
        allYearOpeningHours: {
          $ref: 'defs.json#/definitions/OpeningHours'
        },
        seasonalOpeningHours: {
          $ref: 'defs.json#/definitions/SeasonalOpeningHourSet'
        },
        bookingType: {
          $ref: 'defs.json#/definitions/BookingType'
        },
        customPickupPlaceAllowed: {
          type: 'boolean'
        },
        pickupMinutesBefore: {
          type: 'integer'

        },
        pickupPlaces: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PickupDropoffPlace'
          }
        },
        dropoffAvailable: {
          type: 'boolean'
        },
        customDropoffPlaceAllowed: {
          type: 'boolean'
        },
        dropoffPlaces: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PickupDropoffPlace'
          }
        },
        productCategory: {
          $ref: 'defs.json#/definitions/ProductCategory'
        },
        ticketSupport: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/TicketSupport'
          }
        },
        countries: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        cities: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        startTimes: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/Time'
          }
        },
        ticketType: {
          $ref: 'defs.json#/definitions/TicketType'
        },
        meetingType: {
          $ref: 'defs.json#/definitions/MeetingType'
        },
        enforcedLeadPassengerFields: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/ContactField'
          }
        },
        enforcedTravellerFields: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/ContactField'
          }
        },
        extras: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/Extra'
          }
        }
      }
    },

    DateYMD: {
      type: 'object',
      required: [
        'year',
        'month',
        'day'
      ],
      properties: {
        year: {
          type: 'integer'

        },
        month: {
          type: 'integer'

        },
        day: {
          type: 'integer'

        }
      }
    },

    DatePeriod: {
      type: 'object',
      required: [
        'from',
        'to'
      ],
      properties: {
        from: {
          $ref: 'defs.json#/definitions/DateYMD'
        },
        to: {
          $ref: 'defs.json#/definitions/DateYMD'
        }
      }
    },

    Price: {
      type: 'object',
      required: [
        'currency',
        'amount'
      ],
      properties: {
        currency: {
          type: 'string'
        },
        amount: {
          type: 'string'
        }
      }
    },

    ProductsAvailabilityRequest: {
      type: 'object',
      required: [
        'parameters',
        'range',
        'requiredCapacity',
        'externalProductIds'
      ],
      properties: {
        range: {
          $ref: 'defs.json#/definitions/DatePeriod'
        },
        requiredCapacity: {
          type: 'integer'
        },
        externalProductIds: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        }
      }
    },

    GetAvailableResponse: {
      type: 'array',
      items: {
        $ref: 'defs.json#/definitions/ProductsAvailabilityResponse'
      }
    },

    ProductsAvailabilityResponse: {
      type: 'object',
      required: [
        'productId',
        'actualCheckDone'
      ],
      properties: {
        productId: {
          type: 'string'
        },
        actualCheckDone: {
          type: 'boolean'
        }
      }
    },

    PricingCategoryWithPrice: {
      type: 'object',
      required: [
        'pricingCategoryId',
        'price'
      ],
      properties: {
        pricingCategoryId: {
          type: 'string'
        },
        price: {
          $ref: 'defs.json#/definitions/Price'
        }
      }
    },

    PricePerPerson: {
      type: 'object',
      required: [
        'pricingCategoryWithPrice'
      ],
      properties: {
        pricingCategoryWithPrice: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PricingCategoryWithPrice'
          }
        }
      }
    },

    PricePerBooking: {
      type: 'object',
      required: [
        'price'
      ],
      properties: {
        price: {
          $ref: 'defs.json#/definitions/Price'
        }
      }
    },

    RateWithPrice: {
      type: 'object',
      required: [
        'rateId'
      ],
      properties: {
        rateId: {
          type: 'string'
        },
        pricePerPerson: {
          $ref: 'defs.json#/definitions/PricePerPerson'
        },
        pricePerBooking: {
          $ref: 'defs.json#/definitions/PricePerBooking'
        }
      }
    },

    ProductAvailabilityRequest: {
      type: 'object',
      required: [
        'parameters',
        'range',
        'productId'
      ],
      properties: {
        range: {
          $ref: 'defs.json#/definitions/DatePeriod'
        },
        productId: {
          type: 'string'
        },
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        }
      }
    },

    ProductAvailabilityWithRatesResponse: {
      type: 'object',
      required: [
        'capacity',
        'date',
        'time',
        'rates'
      ],
      properties: {
        capacity: {
          type: 'integer'

        },
        date: {
          $ref: 'defs.json#/definitions/DateYMD'
        },
        time: {
          $ref: 'defs.json#/definitions/Time'
        },
        pickupTime: {
          $ref: 'defs.json#/definitions/Time'
        },
        rates: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/RateWithPrice'
          }
        }
      }
    },

    Title: {
      type: 'string',
      enum: [
        'MRS',
        'MISS',
        'MR'
      ]
    },

    Gender: {
      type: 'string',
      enum: [
        'MALE',
        'FEMALE'
      ]
    },

    Contact: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        title: {
          $ref: 'defs.json#/definitions/Title'
        },
        email: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        language: {
          type: 'string'
        },
        nationality: {
          type: 'string'
        },
        country: {
          type: 'string'
        },
        gender: {
          $ref: 'defs.json#/definitions/Gender'
        },
        address: {
          type: 'string'
        },
        postCode: {
          type: 'string'
        },
        organization: {
          type: 'string'
        },
        passportNumber: {
          type: 'string'
        },
        passportExpiry: {
          $ref: 'defs.json#/definitions/DateYMD'
        }
      }
    },

    Passenger: {
      type: 'object',
      required: [
        'contact'
      ],
      properties: {
        pricingCategoryId: {
          type: 'string'
        },
        contact: {
          $ref: 'defs.json#/definitions/Contact'
        },
        pricePerPassenger: {
          $ref: 'defs.json#/definitions/Price'
        }
      }
    },

    ExtraPricingType: {
      type: 'string',
      enum: [
        'PER_PERSON',
        'PER_BOOKING'
      ]
    },

    ExtraBooking: {
      type: 'object',
      required: [
        'extraId',
        'amount',
        'pricingType'
      ],
      properties: {
        extraId: {
          type: 'string'
        },
        amount: {
          type: 'integer'

        },
        pricingType: {
          $ref: 'defs.json#/definitions/ExtraPricingType'
        }
      }
    },

    SalesSegment: {
      type: 'string',
      enum: [
        'DIRECT_ONLINE',
        'DIRECT_OFFLINE',
        'AGENT_AREA',
        'MARKETPLACE',
        'OTA'
      ]
    },

    BookingSourceBookingChannel: {
      type: 'object',
      required: [
        'id',
        'title'
      ],
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        systemType: {
          type: 'string'
        }
      }
    },

    BookingSourceExtranetUser: {
      type: 'object',
      required: [
        'email',
        'fullName'
      ],
      properties: {
        email: {
          type: 'string'
        },
        fullName: {
          type: 'string'
        }
      }
    },

    BookingSourceBookingAgent: {
      type: 'object',
      required: [
        'id',
        'title'
      ],
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        companyRegistrationNumber: {
          type: 'string'
        }
      }
    },

    BookingSourceMarketplaceVendor: {
      type: 'object',
      required: [
        'id',
        'title'
      ],
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        companyRegistrationNumber: {
          type: 'string'
        },
        contractResellerId: {
          type: 'string'
        }
      }
    },

    BookingSource: {
      type: 'object',
      required: [
        'segment',
        'bookingChannel'
      ],
      properties: {
        segment: {
          $ref: 'defs.json#/definitions/SalesSegment'
        },
        bookingChannel: {
          $ref: 'defs.json#/definitions/BookingSourceBookingChannel'
        },
        extranetUser: {
          $ref: 'defs.json#/definitions/BookingSourceExtranetUser'
        },
        bookingAgent: {
          $ref: 'defs.json#/definitions/BookingSourceBookingAgent'
        },
        marketplaceVendor: {
          $ref: 'defs.json#/definitions/BookingSourceMarketplaceVendor'
        }
      }
    },

    Reservation: {
      type: 'object',
      required: [
        'rateId',
        'passengers'
      ],
      properties: {
        rateId: {
          type: 'string'
        },
        passengers: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/Passenger'
          }
        },
        pricePerBooking: {
          $ref: 'defs.json#/definitions/Price'
        },
        extraBooking: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/ExtraBooking'
          }
        }
      }
    },

    ReservationData: {
      type: 'object',
      required: [
        'productId',
        'date',
        'reservations',
        'platformId',
        'bookingSource'
      ],
      properties: {
        productId: {
          type: 'string'
        },
        customerContact: {
          $ref: 'defs.json#/definitions/Contact'
        },
        notes: {
          type: 'string'
        },
        date: {
          $ref: 'defs.json#/definitions/DateYMD'
        },
        time: {
          $ref: 'defs.json#/definitions/Time'
        },
        pickupRequired: {
          type: 'boolean'
        },
        customPickupPlace: {
          type: 'string'
        },
        predefinedPickupPlace: {
          $ref: 'defs.json#/definitions/PickupDropoffPlace'
        },
        dropoffRequired: {
          type: 'boolean'
        },
        customDropoffPlace: {
          type: 'string'
        },
        predefinedDropoffPlace: {
          $ref: 'defs.json#/definitions/PickupDropoffPlace'
        },
        reservations: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/Reservation'
          }
        },
        platformId: {
          type: 'string'
        },
        bookingSource: {
          $ref: 'defs.json#/definitions/BookingSource'
        },
        externalSaleId: {
          type: 'string'
        },
        agentCode: {
          type: 'string'
        }
      }
    },

    ReservationRequest: {
      type: 'object',
      required: [
        'reservationData',
        'parameters'
      ],
      properties: {
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        },
        reservationData: {
          $ref: 'defs.json#/definitions/ReservationData'
        }
      }
    },

    SuccessfulReservation: {
      type: 'object',
      required: [
        'reservationConfirmationCode'
      ],
      properties: {
        reservationConfirmationCode: {
          type: 'string'
        }
      }
    },

    FailedReservation: {
      type: 'object',
      required: [
        'reservationError'
      ],
      properties: {
        reservationError: {
          type: 'string'
        }
      }
    },

    ReservationResponse: {
      type: 'object',
      properties: {
        successfulReservation: {
          $ref: 'defs.json#/definitions/SuccessfulReservation'
        },
        failedReservation: {
          $ref: 'defs.json#/definitions/FailedReservation'
        }
      }
    },

    ConfirmationData: {
      type: 'object',
      required: [
        'ticketSupport'
      ],
      properties: {
        ticketSupport: {
          $ref: 'defs.json#/definitions/TicketSupport'
        }
      }
    },

    ConfirmBookingRequest: {
      type: 'object',
      required: [
        'parameters',
        'reservationConfirmationCode',
        'reservationData',
        'confirmationData'
      ],
      properties: {
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        },
        reservationConfirmationCode: {
          type: 'string'
        },
        reservationData: {
          $ref: 'defs.json#/definitions/ReservationData'
        },
        confirmationData: {
          $ref: 'defs.json#/definitions/ConfirmationData'
        }
      }
    },

    BinaryTicket: {
      type: 'object',
      required: [
        'ticketContent'
      ],
      properties: {
        ticketContent: {
          type: 'string',
          description: 'representation of ticket in bytes, Base64 encoded'
        }
      }
    },

    QrTicket: {
      type: 'object',
      required: [
        'ticketBarcode'
      ],
      properties: {
        ticketBarcode: {
          type: 'string'
        },
        offlineCode: {
          type: 'string'
        }
      }
    },

    DataMatrixTicket: {
      type: 'object',
      required: [
        'ticketBarcode'
      ],
      properties: {
        ticketBarcode: {
          type: 'string'
        },
        offlineCode: {
          type: 'string'
        }
      }
    },

    Ticket: {
      type: 'object',
      properties: {
        binaryTicket: {
          $ref: 'defs.json#/definitions/BinaryTicket'
        },
        qrTicket: {
          $ref: 'defs.json#/definitions/QrTicket'
        },
        dataMatrixTicket: {
          $ref: 'defs.json#/definitions/DataMatrixTicket'
        }
      }
    },

    TicketPerPricingCategory: {
      type: 'object',
      required: [
        'ticket'
      ],
      properties: {
        pricingCategory: {
          type: 'string'
        },
        ticket: {
          $ref: 'defs.json#/definitions/Ticket'
        }
      }
    },

    TicketsPerPricingCategory: {
      type: 'object',
      required: [
        'ticketPerPricingCategory'
      ],
      properties: {
        ticketPerPricingCategory: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/TicketPerPricingCategory'
          }
        }
      }
    },

    SuccessfulBooking: {
      type: 'object',
      required: [
        'bookingConfirmationCode'
      ],
      properties: {
        bookingConfirmationCode: {
          type: 'string'
        },
        ticketsPerPassenger: {
          $ref: 'defs.json#/definitions/TicketsPerPricingCategory'
        },
        bookingTicket: {
          $ref: 'defs.json#/definitions/Ticket'
        }
      }
    },

    FailedBooking: {
      type: 'object',
      required: [
        'bookingError'
      ],
      properties: {
        bookingError: {
          type: 'string'
        }
      }
    },

    ConfirmBookingResponse: {
      type: 'object',
      properties: {
        successfulBooking: {
          $ref: 'defs.json#/definitions/SuccessfulBooking'
        },
        failedBooking: {
          $ref: 'defs.json#/definitions/FailedBooking'
        }
      }
    },

    CreateConfirmBookingRequest: {
      type: 'object',
      required: [
        'parameters',
        'reservationData',
        'confirmationData'
      ],
      properties: {
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        },
        reservationData: {
          $ref: 'defs.json#/definitions/ReservationData'
        },
        confirmationData: {
          $ref: 'defs.json#/definitions/ConfirmationData'
        }
      }
    },

    CancelBookingRequest: {
      type: 'object',
      required: [
        'parameters',
        'bookingConfirmationCode'
      ],
      properties: {
        parameters: {
          type: 'array',
          items: {
            $ref: 'defs.json#/definitions/PluginConfigurationParameterValue'
          }
        },
        bookingConfirmationCode: {
          type: 'string'
        },
        agentCode: {
          type: 'string'
        }
      }
    },

    SuccessfulCancellation: {
      type: 'object',
      properties: {
      }
    },

    FailedCancellation: {
      type: 'object',
      required: [
        'cancellationError'
      ],
      properties: {
        cancellationError: {
          type: 'string'
        }
      }
    },

    CancelBookingResponse: {
      type: 'object',
      properties: {
        successfulCancellation: {
          $ref: 'defs.json#/definitions/SuccessfulCancellation'
        },
        failedCancellation: {
          $ref: 'defs.json#/definitions/FailedCancellation'
        }
      }
    }
  }
};
