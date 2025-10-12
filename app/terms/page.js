export const metadata = {
  title: "Terms of Service • Heavenly Knits",
  description: "Terms and conditions for using our site and purchasing products.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14 text-[--graphite-900]">
      <h1 className="font-display text-3xl mb-6">Terms of Service</h1>
      <p className="leading-8 text-[15px] mb-4">
        By using this site, you agree to these terms. Please read them carefully.
      </p>
      <h2 className="font-display text-xl mt-8 mb-3">Purchases & returns</h2>
      <p className="leading-8 text-[15px] mb-4">
        Handmade items may vary slightly. Returns and exchanges are handled case by case within 14 days.
      </p>
      <h2 className="font-display text-xl mt-8 mb-3">Contact</h2>
      <p className="leading-8 text-[15px]">
        Email: {`<${"hello.heavenlyknits@gmail.com"}>`}
      </p>
    </main>
  );
}
