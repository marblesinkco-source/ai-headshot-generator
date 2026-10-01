import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'Data Processing Agreement | TailorPic',
  description:
    'TailorPic Data Processing Agreement (DPA): how we process personal data on behalf of customers, our security measures, sub-processors, retention, breach notification, and GDPR obligations.',
  alternates: { canonical: '/dpa' },
  openGraph: generateOGMetadata({ title: 'Data Processing Agreement | TailorPic', description: 
      'How TailorPic processes personal data on behalf of customers: scope, security measures, sub-processors, retention and deletion, breach notification, and audit rights.', path: '/dpa' }),
  twitter: generateTwitterMetadata({ title: 'Data Processing Agreement | TailorPic', description: 
      'How TailorPic processes personal data on behalf of customers: scope, security measures, sub-processors, retention and deletion, breach notification, and audit rights.' }),
};

const definitions = [
  {
    term: 'Data Controller',
    text: 'The natural or legal person that determines the purposes and means of the processing of Personal Data. Under this DPA, the Customer is the Data Controller for the photos and account information it provides.',
  },
  {
    term: 'Data Processor',
    text: 'The entity that processes Personal Data on behalf of the Data Controller. Under this DPA, TailorPic acts as the Data Processor.',
  },
  {
    term: 'Personal Data',
    text: 'Any information relating to an identified or identifiable natural person, including photographs and facial images, names, email addresses, and account details submitted to the Service.',
  },
  {
    term: 'Processing',
    text: 'Any operation performed on Personal Data, such as collection, storage, adaptation, use, transmission, erasure, or destruction.',
  },
  {
    term: 'Sub-processor',
    text: 'A third party engaged by TailorPic to process Personal Data on behalf of the Customer.',
  },
  {
    term: 'Data Protection Laws',
    text: 'All laws applicable to the Processing of Personal Data under this DPA, including Regulation (EU) 2016/679 (GDPR) and, where applicable, the UK GDPR and the California Consumer Privacy Act (CCPA).',
  },
];

const processingSteps = [
  {
    title: 'Photo upload',
    text: 'The Customer uploads photographs of themselves or of individuals for whom they hold the necessary rights and consents. Photos are received over encrypted connections and stored in secured storage.',
  },
  {
    title: 'AI model training',
    text: 'Uploaded photos are used to train a personalized AI model for the individual depicted. This model is created solely to generate that individual\'s headshots and is not used to serve other customers.',
  },
  {
    title: 'Result generation',
    text: 'The personalized model is used to generate the headshots ordered by the Customer, which are then made available for download in the Customer\'s account.',
  },
];

const securityMeasures = [
  {
    title: 'Encryption',
    text: 'Data is encrypted at rest using AES-256 and in transit using TLS 1.3.',
  },
  {
    title: 'Access control',
    text: 'Role-based access controls apply across internal systems. Only authorized personnel can access production data, and only when necessary to operate the Service or provide support.',
  },
  {
    title: 'Logging and monitoring',
    text: 'Access to customer data is logged and audited. Our hosting infrastructure is continuously monitored, with automated backups and network isolation.',
  },
  {
    title: 'Purpose limitation',
    text: 'Customer photos are used solely to provide the Service. We do not sell facial or biometric data, and photos are not shared outside the platform other than with the Sub-processors listed below.',
  },
  {
    title: 'Payment data',
    text: 'TailorPic does not store credit card numbers or sensitive payment details. Payments are handled by Stripe.',
  },
];

const subProcessors = [
  {
    name: 'Supabase',
    role: 'Infrastructure',
    text: 'Provides database, authentication, and file storage. Stores account information, uploaded photos, and generated results on behalf of TailorPic.',
  },
  {
    name: 'Stripe',
    role: 'Payment processing',
    text: 'Processes payments and handles billing details. Receives payment and billing information needed to complete a transaction; card details are not stored by TailorPic.',
  },
  {
    name: 'Replicate',
    role: 'AI processing',
    text: 'Runs the AI workloads used for model training and headshot generation. Receives the photos and prompts required to perform these tasks.',
  },
  {
    name: 'Resend',
    role: 'Email delivery',
    text: 'Sends transactional emails such as order confirmations and password resets. Receives recipient email addresses and message content.',
  },
  {
    name: 'Vercel',
    role: 'Hosting & CDN',
    text: 'Hosts the web application and serves static assets via a global edge network. Processes request metadata such as IP addresses and user-agent strings.',
  },
  {
    name: 'Google Analytics',
    role: 'Analytics',
    text: 'Collects anonymized website usage data to help improve the service. Processes pseudonymous identifiers and browsing behavior when the visitor has consented.',
  },
  {
    name: 'Google Cloud',
    role: 'OAuth provider',
    text: "Provides Google Sign-In authentication. Receives only the information needed to verify the user's identity during the sign-in flow.",
  },
];

const sections = [
  { id: 'parties', label: 'Parties' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'scope', label: 'Scope of Processing' },
  { id: 'security', label: 'Data Security Measures' },
  { id: 'sub-processors', label: 'Sub-processors' },
  { id: 'retention', label: 'Data Retention and Deletion' },
  { id: 'breach', label: 'Data Breach Notification' },
  { id: 'audit', label: 'Audit Rights' },
  { id: 'transfers', label: 'International Data Transfers' },
  { id: 'contact', label: 'Contact' },
];

function SectionHeading({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm font-semibold text-tp-bronze-ink">
        {String(number).padStart(2, '0')}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-tp-ink">{children}</h2>
    </div>
  );
}

export default function DpaPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Data Processing Agreement', url: `${siteConfig.url}/dpa` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="border-b border-tp-line bg-white pt-16">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            Data Processing Agreement
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-tp-muted">
            This Data Processing Agreement (&ldquo;DPA&rdquo;) describes how TailorPic
            processes Personal Data on behalf of its customers and forms part of the
            agreement between the parties for use of the TailorPic service. It is
            intended to meet the requirements of Article 28 of the GDPR.
          </p>
          <p className="mt-4 text-sm text-tp-muted">Last updated: September 2026</p>

          <nav aria-label="DPA sections" className="mt-10 rounded-tp-card border border-tp-line bg-tp-paper p-6">
            <p className="text-sm font-semibold text-tp-ink">Contents</p>
            <ol className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-tp-muted underline-offset-2 hover:text-tp-bronze-ink hover:underline"
                  >
                    <span className="mr-2 font-mono text-tp-bronze-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* 1. Parties */}
      <section id="parties" className="scroll-mt-20 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={1}>Parties</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>This DPA is entered into between:</p>
            <ul className="space-y-3">
              <li className="rounded-xl border border-tp-line bg-white p-5">
                <span className="font-semibold text-tp-ink">TailorPic</span> (the
                &ldquo;Data Processor&rdquo;), the provider of the AI headshot generation
                service available at {siteConfig.url}.
              </li>
              <li className="rounded-xl border border-tp-line bg-white p-5">
                <span className="font-semibold text-tp-ink">The Customer</span> (the
                &ldquo;Data Controller&rdquo;), the individual or organization that
                creates an account and uses the TailorPic service.
              </li>
            </ul>
            <p>
              This DPA applies whenever TailorPic processes Personal Data on behalf of
              the Customer in the course of providing the service, and takes effect when
              the Customer accepts the TailorPic terms of service or otherwise begins
              using the service. In the event of a conflict between this DPA and the
              terms of service concerning the Processing of Personal Data, this DPA
              prevails.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Definitions */}
      <section id="definitions" className="scroll-mt-20 border-y border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={2}>Definitions</SectionHeading>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            Terms used in this DPA have the meaning given in the GDPR. For convenience,
            the key terms are summarized below.
          </p>
          <dl className="mt-6 space-y-5">
            {definitions.map((d) => (
              <div key={d.term} className="rounded-xl border border-tp-line bg-white p-5">
                <dt className="font-semibold text-tp-ink">{d.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-tp-muted">{d.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. Scope */}
      <section id="scope" className="scroll-mt-20 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={3}>Scope of Processing</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              TailorPic processes Personal Data only on the Customer&rsquo;s documented
              instructions, which consist of this DPA, the terms of service, and the
              Customer&rsquo;s use of the service features. The Processing consists of
              the following activities:
            </p>
          </div>
          <ol className="mt-6 space-y-4">
            {processingSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-xl border border-tp-line bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tp-ink text-sm font-semibold text-tp-bronze">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-tp-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-tp-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-tp-paper p-5">
              <dt className="font-semibold text-tp-ink">Categories of data subjects</dt>
              <dd className="mt-1 leading-relaxed text-tp-muted">
                Customers and the individuals depicted in photos they upload.
              </dd>
            </div>
            <div className="rounded-xl bg-tp-paper p-5">
              <dt className="font-semibold text-tp-ink">Types of Personal Data</dt>
              <dd className="mt-1 leading-relaxed text-tp-muted">
                Photographs and facial images, name, email address, account and order
                information.
              </dd>
            </div>
            <div className="rounded-xl bg-tp-paper p-5 sm:col-span-2">
              <dt className="font-semibold text-tp-ink">Duration</dt>
              <dd className="mt-1 leading-relaxed text-tp-muted">
                For as long as the Customer uses the service, subject to the retention
                and deletion terms in Section 6.
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            The Customer is responsible for ensuring it has a lawful basis for
            processing the photos it uploads, including any consent required from the
            individuals depicted. TailorPic will not process Personal Data for its own
            purposes, will not sell Personal Data, and will inform the Customer if it
            believes an instruction infringes Data Protection Laws. TailorPic ensures
            that personnel authorized to process Personal Data are bound by
            confidentiality obligations.
          </p>
        </div>
      </section>

      {/* 4. Security */}
      <section id="security" className="scroll-mt-20 border-y border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={4}>Data Security Measures</SectionHeading>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            TailorPic implements technical and organizational measures appropriate to
            the risk of the Processing. These include:
          </p>
          <ul className="mt-6 space-y-4">
            {securityMeasures.map((m) => (
              <li key={m.title} className="rounded-xl border border-tp-line bg-white p-5">
                <p className="font-semibold text-tp-ink">{m.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-tp-muted">{m.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            For a broader overview of our practices, see our{' '}
            <Link
              href="/security"
              className="font-medium text-tp-bronze-ink underline underline-offset-2"
            >
              Security &amp; Data Protection
            </Link>{' '}
            page.
          </p>
        </div>
      </section>

      {/* 5. Sub-processors */}
      <section id="sub-processors" className="scroll-mt-20 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={5}>Sub-processors</SectionHeading>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            The Customer gives TailorPic general authorization to engage the following
            Sub-processors. TailorPic remains responsible for its Sub-processors and
            imposes data protection obligations on them that are no less protective
            than those in this DPA.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-tp-line">
            <ul className="divide-y divide-tp-line">
              {subProcessors.map((sp) => (
                <li key={sp.name} className="bg-white p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-tp-ink">{sp.name}</p>
                    <span className="rounded-full bg-tp-beige px-3 py-0.5 text-xs font-medium text-tp-bronze-ink">
                      {sp.role}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{sp.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-base leading-relaxed text-tp-muted">
            TailorPic will inform the Customer of any intended addition or replacement
            of Sub-processors, giving the Customer the opportunity to object on
            reasonable data protection grounds. If the parties cannot resolve the
            objection, the Customer may stop using the service and request deletion of
            its data. A current list of Sub-processors with their purpose and data
            location is maintained on our{' '}
            <Link
              href="/subprocessors"
              className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
            >
              Subprocessors page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 6. Retention */}
      <section id="retention" className="scroll-mt-20 border-y border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={6}>Data Retention and Deletion</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              Uploaded photos and the training data derived from them are automatically
              and permanently deleted within{' '}
              <strong className="font-semibold text-tp-ink">30 days</strong> after
              processing is complete and the results have been delivered.
            </p>
            <p>
              The Customer may request earlier deletion of its Personal Data at any time
              by contacting us. Upon termination of the service or on written request,
              TailorPic will delete or return Personal Data, and delete existing copies,
              unless retention is required by applicable law. Limited billing and order
              records may be retained by TailorPic and Stripe as needed to meet legal,
              tax, and accounting obligations.
            </p>
            <p>
              TailorPic will assist the Customer, taking into account the nature of the
              Processing, in responding to data subject requests to exercise their
              rights of access, rectification, erasure, restriction, portability, and
              objection. Requests received directly from data subjects will be
              forwarded to the Customer where appropriate.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Breach */}
      <section id="breach" className="scroll-mt-20 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={7}>Data Breach Notification</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              TailorPic will notify the Customer without undue delay and in any event
              within <strong className="font-semibold text-tp-ink">72 hours</strong> of
              becoming aware of a Personal Data breach affecting the Customer&rsquo;s
              Personal Data.
            </p>
            <p>The notification will, to the extent known at the time, include:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>A description of the nature of the breach, including the categories and approximate number of data subjects and records affected.</li>
              <li>The likely consequences of the breach.</li>
              <li>The measures taken or proposed to address the breach and mitigate its effects.</li>
              <li>A contact point from whom more information can be obtained.</li>
            </ul>
            <p>
              Where all information is not available at once, it may be provided in
              phases. TailorPic will reasonably cooperate with the Customer in meeting
              its own obligations to notify supervisory authorities and data subjects.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Audit */}
      <section id="audit" className="scroll-mt-20 border-y border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={8}>Audit Rights</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              TailorPic will make available to the Customer the information reasonably
              necessary to demonstrate compliance with this DPA and Article 28 of the
              GDPR, and will allow for and contribute to audits, including inspections,
              conducted by the Customer or an auditor mandated by the Customer.
            </p>
            <p>
              Audit requests should be sent in writing to{' '}
              <a
                href="mailto:support@tailorpic.com"
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                support@tailorpic.com
              </a>{' '}
              with reasonable advance notice. Audits will be conducted during normal
              business hours, limited to what is necessary and proportionate, subject to
              reasonable confidentiality obligations, and carried out in a manner that
              minimizes disruption to the service and does not compromise the security
              or confidentiality of other customers&rsquo; data. Each party bears its
              own costs of an audit unless the audit reveals a material breach of this
              DPA by TailorPic.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Transfers */}
      <section id="transfers" className="scroll-mt-20 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={9}>International Data Transfers</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              TailorPic and its Sub-processors may process Personal Data in countries
              outside the European Economic Area (EEA) and the United Kingdom,
              including the United States.
            </p>
            <p>
              Where Personal Data originating from the EEA or the UK is transferred to a
              country without an adequacy decision, TailorPic will ensure an appropriate
              transfer mechanism is in place as required by Data Protection Laws, such
              as the European Commission&rsquo;s Standard Contractual Clauses, together
              with supplementary measures where necessary. Upon request, the Customer
              may obtain further information on the safeguards applied by contacting us.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading number={10}>Contact</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-tp-muted">
            <p>
              For questions about this DPA, to request deletion of your data, to report
              a concern, or to exercise audit rights, contact us at:
            </p>
            <p>
              <a
                href="mailto:support@tailorpic.com"
                className="text-lg font-semibold text-tp-bronze-ink underline underline-offset-2"
              >
                support@tailorpic.com
              </a>
            </p>
            <p className="text-sm">
              To report a security vulnerability, please see our{' '}
              <Link
                href="/security"
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                Security page
              </Link>
              . Last updated: September 2026.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
