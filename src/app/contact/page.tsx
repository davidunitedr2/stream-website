import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Stream Remarketing Services team in Collierville, Tennessee.",
};

const departments = [
  { label: "General inquiries & auction bids", email: site.emails.general },
  { label: "Assignments & pickup notices", email: site.emails.notify },
  { label: "Arbitration", email: site.emails.arbitration },
  { label: "Invoices (AP / AR)", email: site.emails.invoices },
  { label: "Floor plans", email: site.emails.floorplans },
];

const ERRORS: Record<string, string> = {
  missing: "Please add your name and email so we can reply.",
  email: "That email address doesn't look right. Mind checking it?",
};

type ContactParams = {
  submitted?: string;
  error?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
};

const TOPICS = [
  "Selling with Stream",
  "Buying / Run List question",
  "Title Services",
  "Invoices (AP / AR)",
  "Something else",
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<ContactParams>;
}) {
  const { address, phones } = site;
  const params = await searchParams;
  const submitted = params.submitted === "true";
  const errorMessage = params.error ? (ERRORS[params.error] ?? ERRORS.missing) : null;
  // Values echoed back on a validation error, so nothing is retyped.
  const v = {
    name: params.name ?? "",
    company: params.company ?? "",
    email: params.email ?? "",
    phone: params.phone ?? "",
    topic: params.topic ?? TOPICS[0],
    message: params.message ?? "",
  };
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Stream"
        intro="Questions about selling, buying, a unit on the Run List, or titles? The team is here Monday through Friday."
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          {/* details */}
          <div>
            <Eyebrow>Stream Remarketing Services</Eyebrow>
            <address className="mt-4 space-y-1 not-italic text-lg text-stream-grey-700">
              <p className="font-semibold text-stream-ink">{address.line1}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
            </address>
            <p className="mt-4 text-stream-grey-700">{site.hours}</p>

            <div className="mt-6 space-y-2 text-stream-grey-700">
              <p>
                <span className="font-semibold text-stream-ink">Main</span>{" "}
                <a className="text-stream-blue hover:text-stream-blue-bright" href={`tel:${phones.main.replace(/\D/g, "")}`}>{phones.main}</a>
              </p>
              <p>
                <span className="font-semibold text-stream-ink">Toll Free</span>{" "}
                <a className="text-stream-blue hover:text-stream-blue-bright" href={`tel:${phones.tollFree.replace(/\D/g, "")}`}>{phones.tollFree}</a>
              </p>
              <p>
                <span className="font-semibold text-stream-ink">Fax</span> {phones.fax}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-stream-ink">
                Departments
              </h3>
              <ul className="mt-4 space-y-3">
                {departments.map((d) => (
                  <li key={d.email} className="border-l-2 border-stream-lime pl-4">
                    <p className="text-sm text-stream-grey-700">{d.label}</p>
                    <a
                      className="font-medium text-stream-blue hover:text-stream-blue-bright break-words"
                      href={`mailto:${d.email}`}
                    >
                      {d.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* form */}
          <div id="contact-form" className="scroll-mt-28 rounded-xl border border-stream-grey-300 bg-stream-paper p-7">
            {submitted ? (
              <div className="flex h-full flex-col items-start justify-center py-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-stream-lime/20 text-2xl text-[#5a7a08]">
                  ✓
                </span>
                <h2 className="heading mt-4 text-xl text-stream-ink">Message sent. Thank you.</h2>
                <p className="mt-2 text-stream-grey-700">
                  The Stream team will be in touch. Need something now? Call{" "}
                  <a className="font-semibold text-stream-blue hover:text-stream-blue-bright" href={`tel:${phones.main.replace(/\D/g, "")}`}>
                    {phones.main}
                  </a>
                  .
                </p>
                <a
                  href="/contact#contact-form"
                  className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-stream-blue hover:text-stream-blue-bright"
                >
                  Send another message →
                </a>
              </div>
            ) : (
              <>
                <h2 className="heading text-xl text-stream-ink">Send us a message</h2>
                {errorMessage && (
                  <p
                    role="alert"
                    className="mt-4 rounded-md border border-[#c0392b]/30 bg-[#c0392b]/5 px-3 py-2.5 text-sm text-[#a5281b]"
                  >
                    {errorMessage}
                  </p>
                )}
                <form action="/api/contact" method="post" className="mt-5 space-y-4">
                  <Field label="Name" name="name" required defaultValue={v.name} />
                  <Field label="Company / dealership" name="company" defaultValue={v.company} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required defaultValue={v.email} />
                    <Field label="Phone" name="phone" type="tel" defaultValue={v.phone} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stream-ink" htmlFor="topic">Topic</label>
                    <select
                      id="topic"
                      name="topic"
                      defaultValue={v.topic}
                      className="mt-1.5 w-full rounded-md border border-stream-grey-300 bg-white px-3 py-2.5 text-stream-ink focus:border-stream-blue"
                    >
                      {TOPICS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stream-ink" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      defaultValue={v.message}
                      className="mt-1.5 w-full rounded-md border border-stream-grey-300 bg-white px-3 py-2.5 text-stream-ink focus:border-stream-blue"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-stream-blue px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-stream-blue-bright"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-stream-ink" htmlFor={name}>
        {label}
        {required && <span className="text-stream-lime"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-md border border-stream-grey-300 bg-white px-3 py-2.5 text-stream-ink focus:border-stream-blue"
      />
    </div>
  );
}
