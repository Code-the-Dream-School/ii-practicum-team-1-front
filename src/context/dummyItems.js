const dummyItems = [
  {
    item_id: 1,
    title: "Vintage Book Collection",
    description: "A curated collection of antique books",
    category: "Books",
    status: "available",
    location: "CA",
    zip: "06477",
    photo: "https://images.unsplash.com/photo-1490633874781-1c63cc424610",
    username: "user1",
    can_deliver: true
  },
  {
    item_id: 2,
    title: "Art Magazines Stack",
    description: "A stack of collectible art magazines",
    category: "Toys",
    status: "available",
    zip: "06461",
    photos: ["https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg"],
    username: "user2",
    canDeliver: true
  },
  {
    item_id: 3,
    title: "Minimalist Wardrobe",
    description: "A capsule wardrobe collection",
    category: "Furniture",
    status: "available",
    location: "TX",
    zip: "06460",
    photo: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg",
    username: "user3"
  },
  {
    item_id: 4,
    title: "Wooden Montessori Toys",
    description: "Set of educational wooden toys",
    category: "Toys",
    status: "available",
    location: "CT",
    zip: "33101",
    photos: ["https://images.unsplash.com/photo-1615996001375-c7ef13294436", "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg", "https://images.pexels.com/photos/4473402/pexels-photo-4473402.jpeg", "https://images.unsplash.com/photo-1490633874781-1c63cc424610", "https://images.unsplash.com/photo-1582515073490-39981397c445"],
    username: "user1"
  },
  {
    item_id: 5,
    title: "Organic Cotton Onesies",
    description: "Bundle of organic baby onesies",
    category: "Kids",
    status: "available",
    location: "GA",
    zip: "60601",
    photos: ["https://images.pexels.com/photos/4473402/pexels-photo-4473402.jpeg", "https://images.unsplash.com/photo-1618220179428-22790b461013"],
    username: "user2"
  },
  {
    item_id: 6,
    title: "Mid-Century Sofa",
    description: "Vintage mid-century modern sofa",
    category: "Furniture",
    status: "available",
    location: "IL",
    zip: "75201",
    photos: ["https://images.unsplash.com/photo-1618220179428-22790b461013"],
    username: "user3"
  },
  {
    item_id: 7,
    title: "Bohemian Wall Tapestry",
    description: "Handmade bohemian wall tapestry",
    category: "Home",
    status: "available",
    zip:"30301",
    location: "PA",
    photos: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
username: "user1"
  },
  {
    item_id: 8,
    title: "Copper Cookware Set",
    description: "High-end copper cookware set",
    category: "Decor",
    status: "available",
    location: "OH",
    photos: ["https://images.unsplash.com/photo-1582515073490-39981397c445"],
    username: "user2"
  },
  {
    item_id: 9,
    title: "Mid-Century Sofa",
    description: "Vintage mid-century modern sofa",
    category: "Garden",
    status: "available",
    location: "IL",
    photos: ["https://images.unsplash.com/photo-1618220179428-22790b461013"],
    username: "user1"
  },
  {
    item_id: 10,
    title: "Bohemian Wall Tapestry",
    description: "Handmade bohemian wall tapestry",
    category: "Decor",
    status: "available",
    location: "PA",
    photos: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
    username: "user3"
  },
  {
    item_id: 11,
    title: "Copper Cookware Set",
    description: "High-end copper cookware set",
    category: "Art Supplies",
    status: "available",
    location: "OH",
    photos: ["https://images.unsplash.com/photo-1582515073490-39981397c445"],
    username: "user1"
  },
  {
    item_id: 12,
    title: "Smart Coffee Maker",
    description: "Modern smart coffee maker",
    category: "Appliances",
    status: "available",
    location: "MI",
    photos: ["https://images.pexels.com/photos/4492126/pexels-photo-4492126.jpeg"],
    username: "user2"
  },
  {
    item_id: 13,
    title: "Vintage Camera Collection",
    description: "Antique camera collection with various models",
    category: "Electronics",
    status: "available",
    location: "NJ",
    photos: ["https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg"],
    username: "user1"
  },
  {
    item_id: 14,
    title: "Acrylic Paint Set",
    description: "Professional-grade acrylic paint set",
    category: "Storage",
    status: "available",
    location: "WA",
    photos: ["https://images.unsplash.com/photo-1612178537253-bccd437b730e"],
    username: "user3"
  },
  {
    item_id: 15,
    title: "Calligraphy Kit",
    description: "Complete calligraphy kit for beginners",
    category: "Tools",
    status: "available",
    location: "MA",
    photos: ["https://images.pexels.com/photos/6344238/pexels-photo-6344238.jpeg"],
    username: "user2"
  },
  {
    item_id: 16,
    title: "Board Game Collection",
    description: "Diverse collection of board games for all ages",
    category: "Tools",
    status: "available",
    location: "CO",
    photos: ["https://images.unsplash.com/photo-1617469767053-d3b523a0b982"],
    username: "user1"
  },
  {
    item_id: 17,
    title: "Model Train Setup",
    description: "Elaborate model train setup with scenery",
    category: "Clothing",
    status: "available",
    location: "OR",
    photos: ["https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg"],
    username: "user2"
  },
  {
    item_id: 18,
    title: "Road Bike",
    description: "High-performance road bike",
    category: "Fitness",
    status: "available",
    location: "MD",
    photos: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e"],
    username: "user1"
  },
  {
    item_id: 19,
    title: "Yoga Gear Set",
    description: "Full set of yoga gear for beginners",
    category: "Fitness",
    status: "available",
    location: "VA",
    photos: ["https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg"],
    username: "user3"
  },
  {
    item_id: 20,
    title: "Succulent Collection",
    description: "Arrangement of various succulent plants",
    category: "Garden",
    status: "available",
    location: "NC",
    photos: ["https://images.pexels.com/photos/1022928/pexels-photo-1022928.jpeg"],
    username: "user2"
  },
  {
    item_id: 21,
    title: "Labeled Storage Boxes",
    description: "Set of durable, labeled storage boxes",
    category: "Books",
    status: "available",
    location: "TN",
    photos: ["https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg"],
    username: "user1"
  },
  {
    item_id: 22,
    title: "Vintage Tool Wall",
    description: "Antique tool wall display",
    category: "Tools",
    status: "available",
    location: "SC",
    photos: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f"],
    username: "user2"
  },
  {
    item_id: 23,
    title: "Power Tool Set",
    description: "Comprehensive power tool set for various projects",
    category: "Kids",
    status: "available",
    location: "AL",
    zip: "06461",
    photos: ["https://images.pexels.com/photos/221027/pexels-photo-221027.jpeg"],
    username: "user3"
  }
];

export default dummyItems;
