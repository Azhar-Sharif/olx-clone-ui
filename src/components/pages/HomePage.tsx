import { Header, ProductsListingCompound } from '@components/compounds';

export const HomePage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <ProductsListingCompound title="Explore Products" showPostButton={true} />
  </div>
);
