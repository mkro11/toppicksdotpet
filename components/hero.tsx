import Image from "next/image"

export function Hero() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find the Perfect Products for Your Pet
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Compare features, read reviews, and discover the best tools and accessories for your furry friends
          </p>
          <div className="relative w-full max-w-2xl mx-auto h-64 rounded-lg overflow-hidden">
            <Image src="/hero-pets.png" alt="Happy pets" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
