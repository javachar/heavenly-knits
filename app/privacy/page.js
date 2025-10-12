export const metadata = {
  title: "Privacy Policy • Heavenly Knits",
  description: "How we collect, use and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14 text-[--graphite-900]">
      <h1 className="font-display text-3xl mb-6">Privacy Policy</h1>
      <p className="leading-8 text-[15px] mb-4">
        We respect your privacy. This policy explains what data we collect, how we use it, and your rights.
      </p>
      <h2 className="font-display text-xl mt-8 mb-3">Information we collect</h2>
      <p className="leading-8 text-[15px] mb-4">
        Contact details (name, email), order info, analytics (aggregated). We do not sell your data.
      </p>
      <h2 className="font-display text-xl mt-8 mb-3">Contact</h2>
      <p className="leading-8 text-[15px]">
        Email: {`<${"hello.heavenlyknits@gmail.com"}>`}
      </p>
    </main>
  );
}
