import SignupFormw from "../../components/forms/SignupForm"

export default function AanmeldenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl md:text-5xl font-black text-stone-900">Aanmelden</h1>
        <SignupForm />
      </div>
    </main>
  )
}
