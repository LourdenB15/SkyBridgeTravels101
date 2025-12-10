import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const hotels = [
  {
    name: "Cordova Reef Village Resort",
    description:
      "A beachfront resort offering stunning views of the Cebu Strait. Features a private beach, outdoor pool, and traditional Filipino hospitality. Perfect for families and couples seeking a tropical getaway.",
    address: "Poblacion, Cordova, Cebu",
    latitude: 10.2523,
    longitude: 123.9465,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Beach Access",
      "Restaurant",
      "Room Service",
      "Air Conditioning",
      "Parking",
    ],
    rooms: [
      {
        name: "Standard Beach View Room",
        description:
          "Comfortable room with a private balcony overlooking the beach. Features air conditioning, flat-screen TV, and en-suite bathroom.",
        maxGuests: 2,
        pricePerNight: 2500,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
        ],
      },
      {
        name: "Deluxe Family Suite",
        description:
          "Spacious suite with separate living area and two bedrooms. Ideal for families with stunning ocean views and premium amenities.",
        maxGuests: 5,
        pricePerNight: 4500,
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
        ],
      },
      {
        name: "Premium Beachfront Villa",
        description:
          "Exclusive villa with direct beach access, private terrace, and outdoor shower. Features a king-size bed and luxury bathroom.",
        maxGuests: 3,
        pricePerNight: 6500,
        images: [
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
        ],
      },
    ],
  },
  {
    name: "Cebu Strait Suites",
    description:
      "Modern boutique hotel in the heart of Cordova. Walking distance to local restaurants and markets. Offers contemporary rooms with all modern amenities and a rooftop lounge with panoramic views.",
    address: "Day-as, Cordova, Cebu",
    latitude: 10.2487,
    longitude: 123.9512,
    rating: 4.2,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Rooftop Lounge",
      "24-hour Front Desk",
      "Air Conditioning",
      "Laundry Service",
      "Airport Shuttle",
    ],
    rooms: [
      {
        name: "Cozy Single Room",
        description:
          "Perfect for solo travelers. Compact yet comfortable with modern furnishings and city views.",
        maxGuests: 1,
        pricePerNight: 1499,
        images: [
          "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800",
        ],
      },
      {
        name: "Superior Double Room",
        description:
          "Well-appointed room with queen-size bed, work desk, and rainfall shower. Great for couples or business travelers.",
        maxGuests: 2,
        pricePerNight: 2200,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
          "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800",
        ],
      },
    ],
  },
  {
    name: "Island Garden Resort & Spa",
    description:
      "Luxurious resort with lush tropical gardens and a world-class spa. Features multiple dining options, infinity pool, and wellness center. Experience ultimate relaxation in paradise.",
    address: "Catarman, Cordova, Cebu",
    latitude: 10.2612,
    longitude: 123.9389,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Spa & Wellness",
      "Infinity Pool",
      "Multiple Restaurants",
      "Fitness Center",
      "Garden",
      "Room Service",
      "Concierge",
      "Valet Parking",
    ],
    rooms: [
      {
        name: "Garden View Room",
        description:
          "Elegant room surrounded by tropical gardens. Features private terrace, premium bedding, and spa-inspired bathroom.",
        maxGuests: 2,
        pricePerNight: 5500,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
          "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
        ],
      },
      {
        name: "Spa Suite",
        description:
          "Luxurious suite with in-room jacuzzi and private spa amenities. King-size bed, living area, and garden terrace.",
        maxGuests: 2,
        pricePerNight: 8500,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
        ],
      },
      {
        name: "Presidential Suite",
        description:
          "Ultimate luxury with private pool, butler service, and panoramic views. Three bedrooms, full kitchen, and exclusive lounge access.",
        maxGuests: 6,
        pricePerNight: 15000,
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800",
        ],
      },
    ],
  },
  {
    name: "Seaside Inn Cordova",
    description:
      "Budget-friendly inn just steps from the sea. Clean, comfortable rooms with friendly staff. Perfect for backpackers and travelers looking for value without compromising on location.",
    address: "Gabi, Cordova, Cebu",
    latitude: 10.2445,
    longitude: 123.9578,
    rating: 3.8,
    images: [
      "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "24-hour Front Desk",
      "Shared Kitchen",
      "Tour Desk",
    ],
    rooms: [
      {
        name: "Economy Single",
        description:
          "Simple and clean room with single bed. Shared bathroom facilities. Great for budget travelers.",
        maxGuests: 1,
        pricePerNight: 800,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
        ],
      },
      {
        name: "Standard Twin Room",
        description:
          "Comfortable room with two single beds and private bathroom. Perfect for friends traveling together.",
        maxGuests: 2,
        pricePerNight: 1200,
        images: [
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800",
        ],
      },
      {
        name: "Family Room",
        description:
          "Spacious room with one double bed and two single beds. Private bathroom and small seating area.",
        maxGuests: 4,
        pricePerNight: 2000,
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        ],
      },
    ],
  },
  {
    name: "Sunset Bay Hotel",
    description:
      "Charming hotel known for its spectacular sunset views. Features an outdoor terrace restaurant, cocktail bar, and kayak rentals. A favorite among photographers and romantic getaways.",
    address: "Bangbang, Cordova, Cebu",
    latitude: 10.2556,
    longitude: 123.9423,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Restaurant & Bar",
      "Terrace",
      "Kayak Rentals",
      "Air Conditioning",
      "Free Parking",
      "Breakfast Included",
    ],
    rooms: [
      {
        name: "Sunset View Double",
        description:
          "Romantic room facing west for perfect sunset views. Features queen bed, balcony, and complimentary champagne.",
        maxGuests: 2,
        pricePerNight: 3200,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
        ],
      },
      {
        name: "Deluxe Bay View Suite",
        description:
          "Elegant suite with panoramic bay views. Living room, bedroom with king bed, and luxurious marble bathroom.",
        maxGuests: 3,
        pricePerNight: 4800,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
        ],
      },
    ],
  },
  {
    name: "Mactan Blue Waters Resort",
    description:
      "Contemporary resort with direct beach access and water sports facilities. Features modern architecture, multiple pools, and a dive center for underwater adventures.",
    address: "Punta Engaño, Lapu-Lapu City, Cebu",
    latitude: 10.2891,
    longitude: 124.0012,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Dive Center",
      "Beach Access",
      "Water Sports",
      "Restaurant",
      "Spa",
    ],
    rooms: [
      {
        name: "Ocean View Room",
        description:
          "Bright and airy room with stunning ocean views. Modern amenities and private balcony.",
        maxGuests: 2,
        pricePerNight: 3800,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        ],
      },
      {
        name: "Diver's Suite",
        description:
          "Special suite for diving enthusiasts with gear storage and rinse station. Includes dive package discounts.",
        maxGuests: 2,
        pricePerNight: 4500,
        images: [
          "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800",
        ],
      },
    ],
  },
  {
    name: "Heritage Cebu Hotel",
    description:
      "Historic boutique hotel showcasing Filipino colonial architecture. Located in a restored heritage building with antique furnishings and modern comforts.",
    address: "Poblacion, Cordova, Cebu",
    latitude: 10.2534,
    longitude: 123.9478,
    rating: 4.1,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Heritage Tours",
      "Restaurant",
      "Library",
      "Garden",
      "Air Conditioning",
    ],
    rooms: [
      {
        name: "Heritage Room",
        description:
          "Charming room with antique furniture and modern amenities. Captures the essence of old Cebu.",
        maxGuests: 2,
        pricePerNight: 2800,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
        ],
      },
      {
        name: "Colonial Suite",
        description:
          "Spacious suite featuring period furniture, four-poster bed, and vintage decor with modern conveniences.",
        maxGuests: 3,
        pricePerNight: 4200,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        ],
      },
    ],
  },
  {
    name: "Palm Beach Villas",
    description:
      "Exclusive villa resort with private beach and personalized service. Each villa comes with its own pool and dedicated staff.",
    address: "Catarman, Cordova, Cebu",
    latitude: 10.2598,
    longitude: 123.9401,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800",
    ],
    amenities: [
      "Private Pool",
      "Butler Service",
      "Private Beach",
      "In-Villa Dining",
      "Spa Services",
      "Airport Transfer",
      "Yacht Charter",
    ],
    rooms: [
      {
        name: "One Bedroom Villa",
        description:
          "Private villa with plunge pool, outdoor shower, and direct beach access. Ultimate privacy and luxury.",
        maxGuests: 2,
        pricePerNight: 12000,
        images: [
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
        ],
      },
      {
        name: "Two Bedroom Pool Villa",
        description:
          "Expansive villa with two bedrooms, private infinity pool, and panoramic ocean views.",
        maxGuests: 4,
        pricePerNight: 18000,
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
        ],
      },
    ],
  },
  {
    name: "Backpackers Haven Hostel",
    description:
      "Social hostel perfect for budget travelers. Features common areas, rooftop bar, and organized group activities.",
    address: "Day-as, Cordova, Cebu",
    latitude: 10.2476,
    longitude: 123.9523,
    rating: 4.0,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Rooftop Bar",
      "Shared Kitchen",
      "Lockers",
      "Tour Desk",
      "Laundry",
    ],
    rooms: [
      {
        name: "Dorm Bed (Mixed)",
        description:
          "Comfortable bunk in a 6-bed mixed dormitory. Includes personal locker and reading light.",
        maxGuests: 1,
        pricePerNight: 450,
        images: [
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        ],
      },
      {
        name: "Private Double Room",
        description:
          "Simple private room with double bed. Shared bathroom facilities.",
        maxGuests: 2,
        pricePerNight: 950,
        images: [
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800",
        ],
      },
    ],
  },
  {
    name: "Coral Cove Resort",
    description:
      "Family-friendly resort with kids club and shallow pool areas. Features nightly entertainment and buffet dining.",
    address: "Bangbang, Cordova, Cebu",
    latitude: 10.2567,
    longitude: 123.9445,
    rating: 4.2,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Kids Club",
      "Swimming Pool",
      "Playground",
      "Buffet Restaurant",
      "Entertainment",
      "Babysitting",
    ],
    rooms: [
      {
        name: "Family Garden Room",
        description:
          "Ground floor room with garden access. Perfect for families with young children.",
        maxGuests: 4,
        pricePerNight: 3200,
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        ],
      },
      {
        name: "Family Suite",
        description:
          "Two-room suite with connecting doors. Master bedroom and kids room with bunk beds.",
        maxGuests: 5,
        pricePerNight: 4800,
        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
        ],
      },
    ],
  },
  {
    name: "The Minimalist Hotel",
    description:
      "Modern design hotel with clean lines and sustainable practices. Eco-friendly amenities and farm-to-table restaurant.",
    address: "Gabi, Cordova, Cebu",
    latitude: 10.2456,
    longitude: 123.9567,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Eco-Friendly",
      "Organic Restaurant",
      "Yoga Studio",
      "Bicycle Rental",
      "Solar Powered",
    ],
    rooms: [
      {
        name: "Zen Single",
        description:
          "Minimalist room with essential comforts. Bamboo furnishings and natural materials.",
        maxGuests: 1,
        pricePerNight: 1800,
        images: [
          "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800",
        ],
      },
      {
        name: "Zen Double",
        description:
          "Peaceful double room with platform bed, meditation corner, and rain shower.",
        maxGuests: 2,
        pricePerNight: 2600,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        ],
      },
    ],
  },
  {
    name: "Marina Bay Suites",
    description:
      "Waterfront hotel overlooking the marina. Popular with yacht owners and sailing enthusiasts. Features dock access and nautical-themed decor.",
    address: "Pilipog, Cordova, Cebu",
    latitude: 10.2501,
    longitude: 123.9612,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Marina Access",
      "Seafood Restaurant",
      "Boat Tours",
      "Fishing Trips",
      "Bar",
    ],
    rooms: [
      {
        name: "Marina View Room",
        description:
          "Room overlooking the marina with yacht views. Nautical decor and premium bedding.",
        maxGuests: 2,
        pricePerNight: 2900,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        ],
      },
      {
        name: "Captain's Suite",
        description:
          "Spacious suite with ship wheel decor, wet bar, and panoramic marina views.",
        maxGuests: 3,
        pricePerNight: 4500,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
        ],
      },
    ],
  },
  {
    name: "Hilltop Retreat Cordova",
    description:
      "Tranquil hilltop property with stunning views of the island. Perfect for those seeking peace and natural beauty away from the beach crowds.",
    address: "Alegria, Cordova, Cebu",
    latitude: 10.2634,
    longitude: 123.9356,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Mountain Views",
      "Hiking Trails",
      "Restaurant",
      "Meditation Garden",
      "Telescope",
    ],
    rooms: [
      {
        name: "Hillside Room",
        description:
          "Cozy room with valley views and private balcony. Wake up to birdsong and fresh mountain air.",
        maxGuests: 2,
        pricePerNight: 2400,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
        ],
      },
      {
        name: "Panorama Suite",
        description:
          "Suite with floor-to-ceiling windows offering 180-degree views. Fireplace and soaking tub.",
        maxGuests: 2,
        pricePerNight: 3800,
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
        ],
      },
    ],
  },
  {
    name: "Serenity Wellness Resort",
    description:
      "Health and wellness focused resort offering detox programs, yoga retreats, and holistic treatments. All-inclusive wellness packages available.",
    address: "Buagsong, Cordova, Cebu",
    latitude: 10.2478,
    longitude: 123.9489,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Spa & Wellness",
      "Yoga Classes",
      "Meditation",
      "Healthy Cuisine",
      "Detox Programs",
      "Pool",
    ],
    rooms: [
      {
        name: "Wellness Room",
        description:
          "Room designed for relaxation with aromatherapy diffuser, yoga mat, and wellness minibar.",
        maxGuests: 2,
        pricePerNight: 4200,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        ],
      },
      {
        name: "Retreat Suite",
        description:
          "Spacious suite with private treatment room, meditation space, and outdoor soaking tub.",
        maxGuests: 2,
        pricePerNight: 6800,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
        ],
      },
    ],
  },
  {
    name: "Fisherman's Wharf Inn",
    description:
      "Rustic seaside inn with authentic fishing village atmosphere. Fresh catch served daily at the waterfront restaurant.",
    address: "Dapitan, Cordova, Cebu",
    latitude: 10.2412,
    longitude: 123.9534,
    rating: 3.9,
    images: [
      "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=800",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Seafood Restaurant",
      "Fishing Tours",
      "Boat Rental",
      "BBQ Area",
    ],
    rooms: [
      {
        name: "Fisherman's Cabin",
        description:
          "Rustic cabin with wooden decor and sea views. Simple comforts with authentic charm.",
        maxGuests: 2,
        pricePerNight: 1500,
        images: [
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800",
        ],
      },
      {
        name: "Seaside Cottage",
        description:
          "Small cottage steps from the water with kitchenette and outdoor seating area.",
        maxGuests: 3,
        pricePerNight: 2200,
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        ],
      },
    ],
  },
  {
    name: "Azure Sky Hotel",
    description:
      "Contemporary high-rise hotel with rooftop infinity pool and sky bar. Stunning views of both ocean and city skyline.",
    address: "Punta Engaño, Lapu-Lapu City, Cebu",
    latitude: 10.2912,
    longitude: 124.0045,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Rooftop Pool",
      "Sky Bar",
      "Fitness Center",
      "Business Center",
      "Concierge",
    ],
    rooms: [
      {
        name: "City View Room",
        description:
          "Modern room with floor-to-ceiling windows and city views. Smart TV and premium amenities.",
        maxGuests: 2,
        pricePerNight: 3500,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        ],
      },
      {
        name: "Sky Suite",
        description:
          "Corner suite on high floor with wrap-around views. Living area and luxury bathroom.",
        maxGuests: 3,
        pricePerNight: 5500,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
        ],
      },
    ],
  },
  {
    name: "Garden Oasis Resort",
    description:
      "Lush tropical resort set in expansive gardens. Features butterfly sanctuary, orchid house, and nature trails.",
    address: "Ibabao, Cordova, Cebu",
    latitude: 10.2589,
    longitude: 123.9423,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Tropical Gardens",
      "Butterfly Sanctuary",
      "Nature Trails",
      "Pool",
      "Restaurant",
    ],
    rooms: [
      {
        name: "Garden Bungalow",
        description:
          "Private bungalow surrounded by tropical plants. Outdoor shower and garden terrace.",
        maxGuests: 2,
        pricePerNight: 3200,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        ],
      },
      {
        name: "Treehouse Suite",
        description:
          "Elevated suite among the treetops. Unique accommodation with canopy views.",
        maxGuests: 2,
        pricePerNight: 4800,
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
        ],
      },
    ],
  },
  {
    name: "Business Bay Hotel",
    description:
      "Professional hotel catering to business travelers. Meeting rooms, fast WiFi, and convenient location near commercial areas.",
    address: "Mactan Economic Zone, Lapu-Lapu City, Cebu",
    latitude: 10.3012,
    longitude: 123.9856,
    rating: 4.0,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    ],
    amenities: [
      "High-Speed WiFi",
      "Business Center",
      "Meeting Rooms",
      "Airport Shuttle",
      "24-hour Room Service",
      "Gym",
    ],
    rooms: [
      {
        name: "Executive Room",
        description:
          "Well-equipped room with work desk, ergonomic chair, and complimentary pressing service.",
        maxGuests: 1,
        pricePerNight: 2800,
        images: [
          "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800",
        ],
      },
      {
        name: "Business Suite",
        description:
          "Suite with separate living and work areas. Includes meeting table for small gatherings.",
        maxGuests: 2,
        pricePerNight: 4200,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        ],
      },
    ],
  },
  {
    name: "Moonlight Beach Resort",
    description:
      "Romantic beachfront resort popular for honeymoons and special occasions. Candlelit dinners on the beach and couple's spa treatments.",
    address: "Babag, Lapu-Lapu City, Cebu",
    latitude: 10.2845,
    longitude: 123.9934,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Private Beach",
      "Couple's Spa",
      "Beach Dining",
      "Pool",
      "Champagne Service",
    ],
    rooms: [
      {
        name: "Honeymoon Suite",
        description:
          "Romantic suite with four-poster bed, rose petal turndown, and private jacuzzi.",
        maxGuests: 2,
        pricePerNight: 5500,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        ],
      },
      {
        name: "Beachfront Villa",
        description:
          "Private villa with direct beach access, outdoor bathtub, and sunset views.",
        maxGuests: 2,
        pricePerNight: 8500,
        images: [
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
        ],
      },
    ],
  },
  {
    name: "Tropical Palms Hotel",
    description:
      "Mid-range hotel with excellent value. Clean rooms, friendly staff, and convenient amenities for leisure travelers.",
    address: "Marigondon, Lapu-Lapu City, Cebu",
    latitude: 10.2756,
    longitude: 123.9789,
    rating: 4.1,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Restaurant",
      "Tour Desk",
      "Parking",
      "Air Conditioning",
    ],
    rooms: [
      {
        name: "Standard Room",
        description:
          "Comfortable room with all essential amenities. Great value for money.",
        maxGuests: 2,
        pricePerNight: 1800,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
        ],
      },
      {
        name: "Superior Room",
        description:
          "Larger room with pool view, sitting area, and upgraded bathroom.",
        maxGuests: 3,
        pricePerNight: 2500,
        images: [
          "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800",
        ],
      },
    ],
  },
  {
    name: "Diving Paradise Resort",
    description:
      "Dedicated diving resort with PADI certified dive center. Perfect for scuba enthusiasts with house reef and daily dive trips.",
    address: "Maribago, Lapu-Lapu City, Cebu",
    latitude: 10.2823,
    longitude: 123.9912,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
    ],
    amenities: [
      "Free WiFi",
      "PADI Dive Center",
      "Equipment Rental",
      "House Reef",
      "Dive Boat",
      "Camera Room",
      "Restaurant",
    ],
    rooms: [
      {
        name: "Diver's Room",
        description:
          "Room with gear storage and rinse facilities. Ground floor for easy equipment access.",
        maxGuests: 2,
        pricePerNight: 2800,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        ],
      },
      {
        name: "Underwater Photographer Suite",
        description:
          "Suite with dedicated camera table, charging stations, and extra storage for photo gear.",
        maxGuests: 2,
        pricePerNight: 4200,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
        ],
      },
    ],
  },
  {
    name: "Casa de Playa",
    description:
      "Spanish-inspired boutique hotel with Mediterranean architecture. Courtyard with fountain, tapas bar, and siesta-friendly atmosphere.",
    address: "Agus, Lapu-Lapu City, Cebu",
    latitude: 10.2934,
    longitude: 123.9867,
    rating: 4.2,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Courtyard",
      "Tapas Bar",
      "Pool",
      "Air Conditioning",
      "Room Service",
    ],
    rooms: [
      {
        name: "Casa Room",
        description:
          "Elegant room with terracotta tiles, wrought iron details, and courtyard views.",
        maxGuests: 2,
        pricePerNight: 2600,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
        ],
      },
      {
        name: "Hacienda Suite",
        description:
          "Spacious suite with living area, private balcony, and traditional Spanish decor.",
        maxGuests: 3,
        pricePerNight: 3800,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        ],
      },
    ],
  },
  {
    name: "Sunrise Beach Hotel",
    description:
      "East-facing beachfront hotel famous for spectacular sunrise views. Early morning yoga sessions and fresh breakfast buffet.",
    address: "Suba-Basbas, Lapu-Lapu City, Cebu",
    latitude: 10.2867,
    longitude: 124.0023,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Beach Access",
      "Yoga Classes",
      "Breakfast Included",
      "Pool",
      "Spa",
    ],
    rooms: [
      {
        name: "Sunrise Room",
        description:
          "Room with east-facing balcony perfect for watching the sunrise over the sea.",
        maxGuests: 2,
        pricePerNight: 3200,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        ],
      },
      {
        name: "Sunrise Suite",
        description:
          "Corner suite with wrap-around windows for panoramic sunrise views. Includes telescope.",
        maxGuests: 2,
        pricePerNight: 4800,
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
        ],
      },
    ],
  },
  {
    name: "Island Escape Boutique",
    description:
      "Intimate boutique hotel with only 10 rooms. Personalized service and attention to detail. Each room uniquely decorated.",
    address: "Buaya, Lapu-Lapu City, Cebu",
    latitude: 10.2789,
    longitude: 123.9945,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Personalized Service",
      "Restaurant",
      "Library",
      "Garden",
      "Bicycle Rental",
    ],
    rooms: [
      {
        name: "Artisan Room",
        description:
          "Uniquely decorated room featuring local artisan crafts and handmade furniture.",
        maxGuests: 2,
        pricePerNight: 3500,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
        ],
      },
      {
        name: "Artist's Loft",
        description:
          "Two-level loft with sleeping area above and lounge below. Original artwork throughout.",
        maxGuests: 2,
        pricePerNight: 4500,
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        ],
      },
    ],
  },
  {
    name: "Cebu Grand Resort",
    description:
      "Large-scale resort with extensive facilities including water park, multiple restaurants, and convention center.",
    address: "Pajo, Lapu-Lapu City, Cebu",
    latitude: 10.3045,
    longitude: 123.9734,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    amenities: [
      "Free WiFi",
      "Water Park",
      "Multiple Pools",
      "5 Restaurants",
      "Spa",
      "Fitness Center",
      "Kids Club",
      "Convention Center",
    ],
    rooms: [
      {
        name: "Deluxe Room",
        description:
          "Well-appointed room with resort views. Access to all resort facilities.",
        maxGuests: 2,
        pricePerNight: 4200,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        ],
      },
      {
        name: "Club Suite",
        description:
          "Premium suite with club lounge access, evening cocktails, and priority reservations.",
        maxGuests: 3,
        pricePerNight: 6500,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
        ],
      },
      {
        name: "Royal Suite",
        description:
          "Top-tier suite with butler service, private check-in, and exclusive amenities.",
        maxGuests: 4,
        pricePerNight: 12000,
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
        ],
      },
    ],
  },
];

async function main() {
  console.log("Starting database seed...");

  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();

  console.log("Cleared existing data");

  for (const hotelData of hotels) {
    const { rooms, ...hotel } = hotelData;

    const createdHotel = await prisma.hotel.create({
      data: hotel,
    });

    console.log(`Created hotel: ${createdHotel.name}`);

    for (const room of rooms) {
      await prisma.room.create({
        data: {
          ...room,
          hotelId: createdHotel.id,
        },
      });
    }

    console.log(`  Added ${rooms.length} rooms`);
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
