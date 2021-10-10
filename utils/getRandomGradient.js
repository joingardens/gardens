export default function getRandomGradient(){

  // This is repetitive because https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

  const colors = [
  'bg-seaweed bg-opacity-20 hover:bg-opacity-30',
  'bg-persiangreen bg-opacity-20 hover:bg-opacity-30',
  'bg-meadow bg-opacity-20 hover:bg-opacity-30'
  ]
  /* Old version
  'bg-gradient-to-b from-green-100 to-green-300', 
  'bg-gradient-to-b from-yellow-100 to-yellow-300', 
  'bg-gradient-to-b from-pink-100 to-pink-300', 
  'bg-gradient-to-b from-purple-100 to-purple-300', 
  'bg-gradient-to-b from-indigo-100 to-indigo-300', 
  'bg-gradient-to-b from-red-100 to-red-300', 
  'bg-gradient-to-b from-blue-100 to-blue-300'
  */
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return randomColor
  }