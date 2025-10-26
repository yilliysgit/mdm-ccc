"use client"

import { useMemo, useState } from "react"
import StepDots from "../ui/StepDots"


type Form = {
  lastName: string
  callName: string
  givenNames: string
  address: string
  zipCity: string
  phone: string
  email: string
  birthDate: string
  birthPlace: string
  docNumber: string
  docExpiry: string
  allergy?: string
  licensePlate: string
  carMakeModel: string
  clothingSize: "S" | "M" | "L" | "XL" | "XXL" | ""
}

type Errors = Partial<Record<keyof Form, string>>

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
const hasMin = (v: string, n = 2) => v.trim().length >= n

export default function SignupForm() {
const [step, setStep] = useState<1 | 2 | 3>(1)

const steps = [
    { key: "pers", label: "Persoonlijk" },
    { key: "reis", label: "Reisdocument" },
    { key: "auto", label: "Auto & maat" },
  ]
  
  const [form, setForm] = useState<Form>({
    lastName: "",
    callName: "",
    givenNames: "",
    address: "",
    zipCity: "",
    phone: "",
    email: "",
    birthDate: "",
    birthPlace: "",
    docNumber: "",
    docExpiry: "",
    allergy: "",
    licensePlate: "",
    carMakeModel: "",
    clothingSize: "",
  })
  const [errors, setErrors] = useState<Errors>({})

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate(currentStep: 1 | 2 | 3) {
    const e: Errors = {}
    if (currentStep === 1) {
      if (!hasMin(form.lastName)) e.lastName = "Vul je achternaam in."
      if (!hasMin(form.callName)) e.callName = "Vul je roepnaam in."
      if (!hasMin(form.givenNames)) e.givenNames = "Vul je voornamen in."
      if (!hasMin(form.address)) e.address = "Adres is verplicht."
      if (!hasMin(form.zipCity)) e.zipCity = "Postcode en woonplaats is verplicht."
      if (!hasMin(form.phone)) e.phone = "Telefoon is verplicht."
      if (!isEmail(form.email)) e.email = "Vul een geldig e-mailadres in."
    } else if (currentStep === 2) {
      if (!form.birthDate) e.birthDate = "Geboortedatum is verplicht."
      if (!hasMin(form.birthPlace)) e.birthPlace = "Geboorteplaats is verplicht."
      if (!hasMin(form.docNumber)) e.docNumber = "Nummer reisdocument is verplicht."
      if (!form.docExpiry) e.docExpiry = "Geldigheidsdatum is verplicht."
      // allergy optioneel
    } else if (currentStep === 3) {
      if (!hasMin(form.licensePlate)) e.licensePlate = "Kenteken is verplicht."
      if (!hasMin(form.carMakeModel)) e.carMakeModel = "Merk & type is verplicht."
      if (!form.clothingSize) e.clothingSize = "Kies een kledingmaat."
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (validate(step)) setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))
  }

  function prev() {
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate(3)) return
    // ✅ simulatie van versturen
    alert("✅ Aanmelding verstuurd!")
    console.log("Aanmelding:", form)
    // eventueel reset
    // window.location.href = "/contact?sent=1"
  }

  const progress = useMemo(() => (step / 3) * 100, [step])

  const inputCls = (hasErr?: boolean) =>
    `mt-1 w-full rounded-xl border px-3 py-2 outline-none transition
     ${hasErr ? "border-red-400 ring-4 ring-red-200/60" : "border-stone-300 focus:ring-4 focus:ring-emerald-600/25"}`

  return (
    <form onSubmit={submit} className="rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm">
      {/* progress */}
            <StepDots steps={steps} current={step} />

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-stone-600">
          <span>Stap {step} van 3</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div className="h-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 1 && (
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-stone-900">Persoonsgegevens</h2>

          <div>
            <label className="text-sm font-medium">Achternaam (zoals op reisdocument) + roepnaam *</label>
            <div className="mt-1 grid gap-3 md:grid-cols-2">
              <input
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Achternaam"
                className={inputCls(!!errors.lastName)}
              />
              <input
                value={form.callName}
                onChange={(e) => set("callName", e.target.value)}
                placeholder="Roepnaam"
                className={inputCls(!!errors.callName)}
              />
            </div>
            {(errors.lastName || errors.callName) && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName || errors.callName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Voornamen volgens reisdocument (eerste naam voluit) *</label>
            <input
              value={form.givenNames}
              onChange={(e) => set("givenNames", e.target.value)}
              className={inputCls(!!errors.givenNames)}
              placeholder="Bijv. Mohammed Ahmed"
            />
            {errors.givenNames && <p className="mt-1 text-sm text-red-600">{errors.givenNames}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Adres *</label>
            <input
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              className={inputCls(!!errors.address)}
              placeholder="Straat en huisnummer"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Postcode en woonplaats *</label>
            <input
              value={form.zipCity}
              onChange={(e) => set("zipCity", e.target.value)}
              className={inputCls(!!errors.zipCity)}
              placeholder="1234 AB, Amsterdam"
            />
            {errors.zipCity && <p className="mt-1 text-sm text-red-600">{errors.zipCity}</p>}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Telefoonnummer *</label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls(!!errors.phone)}
                placeholder="+31 6 …"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">E-mail adres *</label>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls(!!errors.email)}
                type="email"
                placeholder="jij@voorbeeld.nl"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-stone-900">Identiteit & gezondheid</h2>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Geboortedatum *</label>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => set("birthDate", e.target.value)}
                className={inputCls(!!errors.birthDate)}
              />
              {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Geboorteplaats *</label>
              <input
                value={form.birthPlace}
                onChange={(e) => set("birthPlace", e.target.value)}
                className={inputCls(!!errors.birthPlace)}
              />
              {errors.birthPlace && <p className="mt-1 text-sm text-red-600">{errors.birthPlace}</p>}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Nummer reisdocument *</label>
              <input
                value={form.docNumber}
                onChange={(e) => set("docNumber", e.target.value)}
                className={inputCls(!!errors.docNumber)}
              />
              {errors.docNumber && <p className="mt-1 text-sm text-red-600">{errors.docNumber}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Datum geldigheid reisdocument *</label>
              <input
                type="date"
                value={form.docExpiry}
                onChange={(e) => set("docExpiry", e.target.value)}
                className={inputCls(!!errors.docExpiry)}
              />
              {errors.docExpiry && <p className="mt-1 text-sm text-red-600">{errors.docExpiry}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Eventuele voedselallergie (optioneel)</label>
            <input
              value={form.allergy || ""}
              onChange={(e) => set("allergy", e.target.value)}
              className={inputCls(false)}
              placeholder="Bijv. notenallergie"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-stone-900">Auto & kleding</h2>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Kenteken auto *</label>
              <input
                value={form.licensePlate}
                onChange={(e) => set("licensePlate", e.target.value)}
                className={inputCls(!!errors.licensePlate)}
              />
              {errors.licensePlate && <p className="mt-1 text-sm text-red-600">{errors.licensePlate}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Merk & type auto *</label>
              <input
                value={form.carMakeModel}
                onChange={(e) => set("carMakeModel", e.target.value)}
                className={inputCls(!!errors.carMakeModel)}
                placeholder="Bijv. Mercedes 300 SL"
              />
              {errors.carMakeModel && <p className="mt-1 text-sm text-red-600">{errors.carMakeModel}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Kledingmaat *</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["S", "M", "L", "XL", "XXL"] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => set("clothingSize", sz)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    form.clothingSize === sz
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-stone-300 bg-white text-stone-800 hover:bg-stone-50"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
            {errors.clothingSize && <p className="mt-2 text-sm text-red-600">{errors.clothingSize}</p>}
          </div>

          {/* kleine review */}
          <details className="mt-2 rounded-xl border border-stone-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">Controleer je gegevens</summary>
            <pre className="mt-3 overflow-auto rounded bg-stone-100 p-3 text-xs">
{JSON.stringify(form, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* navigatie */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={step === 1}
          className="rounded-xl border border-stone-300 px-4 py-2 font-semibold text-stone-700 disabled:opacity-50"
        >
          Terug
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800"
          >
            Volgende
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800"
          >
            Aanmelding versturen
          </button>
        )}
      </div>
    </form>
  )
}
