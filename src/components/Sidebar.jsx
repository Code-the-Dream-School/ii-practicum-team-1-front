import React from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

const freeItemCategories = [
  "📚 Books & Magazines",
  "👕 Clothing & Accessories",
  "🧸 Baby Items & Toys",
  "🏠 Furniture & Home Decor",
  "🍳 Kitchenware & Appliances",
  "🖥️ Electronics & Gadgets",
  "🎨 Art & Craft Supplies",
  "🎮 Games & Hobbies",
  "🚲 Sports Equipment",
  "🌱 Garden Tools & Plants",
  "📦 Moving Boxes & Packing Materials",
  "🛠️ Tools & Hardware",

];

export default function Categories() {
  return (
      <Card className="h-full w-[25rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div>
          <Typography variant="h5" color="blue-gray">
          Categories
          </Typography>
        </div>

        <List>

        {freeItemCategories.map((category, index) => (
        <ListItem key={index}>
          {category}
        </ListItem>
      ))}

      <hr className="my-2 border-blue-gray-50" /> 

          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>

        </List>
      </Card>
  );
}
