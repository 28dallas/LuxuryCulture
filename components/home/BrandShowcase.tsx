'use client'

export function BrandShowcase() {
  const brands = [
    { 
      name: 'Nike', 
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.205-1.848-.68-1.232-.68-2.464 0-3.696.68-1.232 1.749-1.848 3.205-1.848.989 0 2.212.309 3.668.925L24 7.8z"/>
        </svg>
      )
    },
    { 
      name: 'Adidas', 
      logo: (
        <div className="text-2xl font-bold">A</div>
      )
    },
    { 
      name: 'Jordan', 
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12.425 21.997c-.775 0-1.55-.3-2.137-.887L1.413 12.235c-1.175-1.175-1.175-3.1 0-4.275L10.288.887c.587-.587 1.362-.887 2.137-.887s1.55.3 2.137.887l8.875 8.875c1.175 1.175 1.175 3.1 0 4.275l-8.875 8.875c-.587.587-1.362.887-2.137.887z"/>
        </svg>
      )
    },
    { 
      name: 'Converse', 
      logo: (
        <div className="text-2xl font-bold">C</div>
      )
    },
    { 
      name: 'Vans', 
      logo: (
        <div className="text-2xl font-bold">V</div>
      )
    },
    { 
      name: 'New Balance', 
      logo: (
        <div className="text-2xl font-bold">N</div>
      )
    },
    { 
      name: 'Puma', 
      logo: (
        <div className="text-2xl font-bold">P</div>
      )
    },
    { 
      name: 'Reebok', 
      logo: (
        <div className="text-2xl font-bold">R</div>
      )
    }
  ]

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Official Retailer</h2>
          <p className="text-body">Authorized dealer for premium brands</p>
        </div>
        
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-8">
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 text-center">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-red-600">{brand.logo}</div>
                </div>
                <p className="text-sm font-medium text-gray-700">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}