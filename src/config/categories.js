import {
  Heart, Shirt, Crown, Gift, Sparkles, Sun, Star,
  Tag, Music, Camera, Utensils, Car, Home, Flower2,
  Gem, PartyPopper, Cake, Wine, Plane, MapPin,
} from 'lucide-react'

const iconMap = {
  Heart, Shirt, Crown, Gift, Sparkles, Sun, Star,
  Tag, Music, Camera, Utensils, Car, Home, Flower2,
  Gem, PartyPopper, Cake, Wine, Plane, MapPin,
}

export const ICON_OPTIONS = Object.entries(iconMap).map(
  ([key, component]) => ({ key, component })
)

export function getIconComponent(key) {
  return iconMap[key] || Tag
}
