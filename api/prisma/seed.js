const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
