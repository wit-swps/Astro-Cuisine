'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Anchor, MapPin, Ship } from "lucide-react"
import Link from "next/link"

interface Ship {
  id: string
  registration: string
  name: string
  location: string
  imageUrl: string
}

// Sample data (replace this with your actual data fetching logic)
const ships: Ship[] = [
  { 
    id: "1", 
    registration: "NCC-1701", 
    name: "USS Enterprise", 
    location: "Alpha Quadrant",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V8ZW58MHx8MHx8fDA%3D"
  },
  { 
    id: "2", 
    registration: "NCC-1764", 
    name: "USS Defiant", 
    location: "Deep Space 9",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwYWNlfGVufDB8fDB8fHww"
  },
  { 
    id: "3", 
    registration: "NCC-74656", 
    name: "USS Voyager", 
    location: "Delta Quadrant",
    imageUrl: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwYWNlfGVufDB8fDB8fHww"
  },
]

export function EnhancedFleetDisplayWithHover() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Stellar Fleet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ships.map((ship) => (
          <Card 
            key={ship.id} 
            className="overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${ship.imageUrl})` }}
            />
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{ship.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Anchor className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{ship.registration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  <span>{ship.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800">
              <Link href={`/ships/${ship.id}`} className="w-full">
                <Button className="w-full bg-primary hover:bg-primary-dark transition-colors duration-300">
                  <Ship className="w-4 h-4 mr-2" />
                  View Ship Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}