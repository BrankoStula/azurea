// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-brand-black text-cream py-12 px-8">
      <div className="max-w-[var(--container-default)] mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="label-caps text-brand-green mb-2">
            The Villa V Collection
          </p>
          <p className="text-sm text-gray-md">Bali, Indonesia</p>
        </div>
        <p className="text-xs text-gray-md self-end">
          © {new Date().getFullYear()} Villa V Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}