import { Link } from 'react-router-dom'
import { useHomePageController } from '../../controllers/useHomePageController'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import heroElectronics from '../../assets/hero_electronics.png'

const benefits = [
  ['Curated selection', 'Thoughtfully chosen essentials, updated every week.'],
  ['Secure checkout', 'Simple, protected payments from cart to door.'],
  ['Built around you', 'Discover more of what fits your everyday.'],
]

function CategoryRail({ sections, isLoading }) {
  const categories = sections.slice(0, 5)
  if (!isLoading && !categories.length) return null
  return <section className="home-categories" aria-label="Shop by category"><p className="home-eyebrow">Explore by department</p><div className="home-category-rail">{(isLoading ? Array(5).fill(null) : categories).map((category, index) => category ? <Link key={category.id} to={`/shop?category=${encodeURIComponent(category.title)}`} className="home-category-pill"><span className="home-category-number">0{index + 1}</span><span>{category.title}</span><span aria-hidden="true">↗</span></Link> : <div key={index} className="home-category-skeleton" />)}</div></section>
}

function FeaturedProductsSection({ products, isLoading }) {
  const displayProducts = isLoading ? Array(4).fill(null) : products.slice(0, 4)

  if (!isLoading && displayProducts.length === 0) return null

  return (
    <section className="featured-products-section">
      <div className="section-head home-section-head">
        <div><p className="home-eyebrow">Selected for you</p><h2>Worth a closer look.</h2></div>
        <Link to="/shop" className="home-text-link">Shop all <span aria-hidden="true">→</span></Link>
      </div>
      <div className="grid-container-4col">
        {displayProducts.map((product, idx) => (
          <div key={product?.id || idx} className="product-card-wrapper-refined">
            {product ? (
              <ProductCard product={product} />
            ) : (
              <div className="product-placeholder-card">
                <div className="gray-box" style={{ background: 'var(--clr-primary-light)', opacity: 0.3 }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function HomePage() {
  const { featuredProducts, showcaseSections, status, error, stats } = useHomePageController()
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const productCount = stats?.productCount || 0

  return (
    <div className="pallet-shell home-shell">
      <Navbar />
      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero-copy"><p className="home-eyebrow">Ec-Kart / Everyday, elevated</p><h1>Good choices.<br /><em>Beautifully simple.</em></h1><p className="home-hero-description">A modern marketplace for the products that make daily life feel a little more considered.</p><div className="home-hero-actions"><Link to="/shop" className="home-primary-action">Explore the collection <span aria-hidden="true">→</span></Link><Link to="/categories" className="home-secondary-action">Browse categories</Link></div><div className="home-proof"><span className="home-proof-mark">✦</span><span>{productCount ? `${productCount}+ products ready to discover` : 'Fresh products arriving weekly'}</span></div></div>
          <div className="home-hero-visual"><div className="home-orbit home-orbit-one" /><div className="home-orbit home-orbit-two" /><div className="home-hero-image-wrap"><img src={heroElectronics} alt="A curated electronics collection" /></div><div className="home-floating-note"><span>New edit</span><strong>Made for your next move.</strong></div></div>
        </section>
        {isError && <div className="error-banner">{error || 'We could not load the latest products. Please try again shortly.'}</div>}
        <CategoryRail sections={showcaseSections} isLoading={isLoading} />
        <FeaturedProductsSection products={featuredProducts} isLoading={isLoading} />
        <section className="home-benefits">{benefits.map(([title, description], index) => <article key={title} className="home-benefit"><span className="home-benefit-index">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
