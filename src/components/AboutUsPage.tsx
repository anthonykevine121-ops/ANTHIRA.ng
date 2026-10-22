
import React from 'react';
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Layers3,
  Sparkles,
  Target,
  Eye,
  Code2,
  Palette,
  Smartphone,
  Search,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Lightbulb,
  Monitor,
  ShoppingBag,
  RefreshCw,
  MessageCircle,
  Globe,
  Zap,
} from 'lucide-react';

interface AboutUsPageProps {
  onViewServices: () => void;
  onStartProject: () => void;
}

const values = [
  {
    title: 'Purposeful Design',
    description:
      'We shape every digital experience around the people who will use it, the goals it needs to support, and the results it should help achieve.',
    icon: Compass,
  },
  {
    title: 'Built for Real Businesses',
    description:
      'We create practical, responsive websites designed to help businesses present their services, reach customers, and grow their online presence.',
    icon: HeartHandshake,
  },
  {
    title: 'Quality in Every Detail',
    description:
      'From typography and layouts to performance and usability, we pay attention to the details that make a website feel professional.',
    icon: Sparkles,
  },
  {
    title: 'Continuous Improvement',
    description:
      'We believe digital experiences should evolve. Our approach considers future updates, changing business needs, and opportunities to improve.',
    icon: RefreshCw,
  },
  {
    title: 'Clear Communication',
    description:
      'We value collaboration, transparent conversations, and keeping clients informed throughout the design and development process.',
    icon: MessageCircle,
  },
  {
    title: 'Innovation with Purpose',
    description:
      'We use modern design approaches and technologies where they add genuine value, rather than adding complexity for its own sake.',
    icon: Lightbulb,
  },
];

const services = [
  {
    title: 'Website Design & Development',
    description:
      'Professional business websites built around your brand, services, and business goals.',
    icon: Monitor,
  },
  {
    title: 'E-commerce Websites',
    description:
      'Online storefronts that help businesses present products and create convenient shopping experiences.',
    icon: ShoppingBag,
  },
  {
    title: 'UI/UX Design',
    description:
      'Thoughtful layouts, intuitive navigation, and user-focused interfaces for digital products.',
    icon: Palette,
  },
  {
    title: 'Responsive Web Design',
    description:
      'Web experiences designed to work across mobile phones, tablets, laptops, and desktop screens.',
    icon: Smartphone,
  },
  {
    title: 'Website Optimization',
    description:
      'Improvements to website structure, usability, loading performance, and search engine foundations.',
    icon: Zap,
  },
  {
    title: 'Website Templates',
    description:
      'Ready-to-customize website templates that provide a practical starting point for new projects.',
    icon: Layers3,
  },
];

const process = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn about your business, your audience, your goals, and the challenges your website needs to solve.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Plan & Design',
    description:
      'We establish the structure, visual direction, content priorities, and user experience for your project.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We turn the approved direction into a responsive website using appropriate design and development tools.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Test & Launch',
    description:
      'We check important layouts, interactions, navigation, and functionality before preparing the website for launch.',
    icon: Rocket,
  },
];

const benefits = [
  'Design tailored to your brand and business objectives',
  'Responsive layouts for different screen sizes',
  'Clear navigation and user-focused experiences',
  'Modern visual design and thoughtful interactions',
  'Attention to website usability and performance',
  'A collaborative approach throughout the project',
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onViewServices,
  onStartProject,
}) => {
  return (
    <main className="flex-1 bg-[#0c0e13] text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/5 py-20 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                About ANTHIRA
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              We make the web work harder for{' '}
              <span className="text-[#ff5722]">your business.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
              ANTHIRA is a website design and development studio helping
              individuals, entrepreneurs, and businesses establish a confident
              online presence. We bring creative thinking, purposeful design,
              and modern technology together to build useful digital
              experiences.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              Whether you need a professional business website, an online store,
              or a customizable website template, our focus is on helping you
              take the next step in your digital journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff5722] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#f4511e]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onViewServices}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/10"
              >
                Explore Our Services
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-zinc-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-400" />
                Responsive Experiences
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-400" />
                Thoughtful Design
              </span>
            </div>
          </div>

          {/* VISUAL BRAND PANEL */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-orange-500/5 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141820] p-5 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                    The ANTHIRA Approach
                  </p>
                  <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                    Ideas into experiences.
                  </h2>
                </div>

                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3">
                  <Globe className="h-7 w-7 text-orange-400" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#0c0e13] p-4">
                  <Palette className="h-6 w-6 text-orange-400" />
                  <h3 className="mt-4 text-sm font-bold">Creative Design</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">
                    Visual identities and interfaces with purpose.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0c0e13] p-4">
                  <Code2 className="h-6 w-6 text-orange-400" />
                  <h3 className="mt-4 text-sm font-bold">Modern Development</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">
                    Functional, responsive digital experiences.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0c0e13] p-4">
                  <Target className="h-6 w-6 text-orange-400" />
                  <h3 className="mt-4 text-sm font-bold">Business Focus</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">
                    Websites aligned with your goals.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0c0e13] p-4">
                  <Smartphone className="h-6 w-6 text-orange-400" />
                  <h3 className="mt-4 text-sm font-bold">Responsive Layouts</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">
                    Experiences across modern devices.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
                <div className="rounded-xl bg-orange-500/10 p-2">
                  <Sparkles className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    Design with intention. Build with purpose.
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    A considered approach to every digital project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5722]">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Digital solutions built around real needs.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
              <p>
                The digital world creates opportunities for businesses of every
                size. A well-considered website can help people understand what
                you offer, discover your services, and take meaningful action.
              </p>

              <p>
                At ANTHIRA, we approach web design as more than making pages
                look attractive. We consider how a website communicates,
                organizes information, guides visitors, and represents the
                business behind it.
              </p>

              <p>
                Our work brings together design, structure, functionality, and
                usability to create online experiences that are clear,
                accessible, and aligned with each project's objectives.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#141820] p-6 sm:p-8">
            <div className="flex items-start gap-4 border-b border-white/10 pb-6">
              <div className="rounded-xl bg-orange-500/10 p-3">
                <Lightbulb className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Our Philosophy</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Every website should have a clear purpose, serve its audience,
                  and communicate the value of the business behind it.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b border-white/10 py-6">
              <div className="rounded-xl bg-orange-500/10 p-3">
                <Layers3 className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Our Approach</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  We combine thoughtful planning, visual design, development,
                  and testing to create a more complete digital experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-6">
              <div className="rounded-xl bg-orange-500/10 p-3">
                <Rocket className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Our Commitment</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  We aim to deliver thoughtful work, communicate clearly, and
                  create solutions that reflect each client's needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="border-y border-white/5 bg-[#0f1217] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5722]">
              Our Direction
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What drives ANTHIRA
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
              Our work is guided by a commitment to purposeful design,
              practical solutions, and better digital experiences.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-[#141820] p-6 sm:p-9">
              <div className="inline-flex rounded-2xl bg-orange-500/10 p-4">
                <Target className="h-7 w-7 text-orange-400" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">Our Mission</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                To help individuals and businesses build a strong digital
                presence through thoughtful website design, reliable
                development, and practical digital solutions that support
                their goals.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-[#141820] p-6 sm:p-9">
              <div className="inline-flex rounded-2xl bg-orange-500/10 p-4">
                <Eye className="h-7 w-7 text-orange-400" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">Our Vision</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                To become a trusted creative technology partner known for
                delivering useful, well-designed digital experiences that help
                businesses communicate their value and participate confidently
                in the digital world.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5722]">
                What We Do
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Digital services for your next step.
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
                From a first website to an online store, we help you choose a
                digital solution that fits your needs.
              </p>
            </div>

            <button
              type="button"
              onClick={onViewServices}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold transition-colors hover:border-orange-500/40 hover:bg-white/5"
            >
              View All Services
              <ArrowRight className="h-4 w-4 text-orange-400" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group rounded-2xl border border-white/10 bg-[#141820] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-[#181c25]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 transition-colors group-hover:bg-orange-500/20">
                  <Icon className="h-6 w-6 text-orange-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-orange-400">
                  <span>Explore possibilities</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="border-y border-white/5 bg-[#0f1217] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5722]">
              How We Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              A clear path from idea to launch.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
              A structured process helps keep the project focused, organized,
              and aligned with your objectives.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ number, title, description, icon: Icon }) => (
              <article
                key={number}
                className="relative rounded-2xl border border-white/10 bg-[#141820] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-orange-500/30">
                    {number}
                  </span>
                  <Icon className="h-6 w-6 text-orange-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5722]">
              Why ANTHIRA
            </span>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              More than a website. A thoughtful digital foundation.
            </h2>

            <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
              Your website is an important part of how people discover and
              understand your business. We focus on creating a clear,
              professional experience that communicates your value and gives
              visitors a useful way to engage with you.
            </p>

            <div className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                  <p className="text-sm leading-6 text-zinc-300">{benefit}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onStartProject}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#ff5722] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#f4511e]"
            >
              Let's Discuss Your Project
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#141820] p-6 sm:p-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="rounded-2xl bg-orange-500/10 p-4">
                <ShieldCheck className="h-7 w-7 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Built with care and clarity
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Thoughtful decisions at every stage.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-bold">User-focused experiences</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  We consider how visitors move through your website and how
                  easily they can find the information they need.
                </p>
              </div>

              <div>
                <h4 className="font-bold">Flexible digital foundations</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  We consider your current requirements and the potential need
                  to update or extend your website in the future.
                </p>
              </div>

              <div>
                <h4 className="font-bold">A collaborative experience</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Your goals and feedback help guide the project from the early
                  planning stages through development and launch.
                </p>
              </div>

              <div>
                <h4 className="font-bold">Attention to the essentials</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  We consider responsiveness, navigation, readability, and
                  important interactions when building your website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-white/5 bg-[#0f1217] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff5722]">
              Our Values
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The principles behind our work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
              These principles guide how we approach projects, make design
              decisions, and collaborate with the people we serve.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-[#141820] p-6 transition-colors hover:border-orange-500/30"
              >
                <div className="inline-flex rounded-xl bg-orange-500/10 p-3">
                  <Icon className="h-6 w-6 text-orange-400" />
                </div>

                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-orange-500/20 bg-[#141820] px-6 py-10 text-center shadow-2xl shadow-orange-950/10 sm:px-12 sm:py-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
              <Sparkles className="h-7 w-7 text-orange-400" />
            </div>

            <span className="mt-6 block text-xs font-extrabold uppercase tracking-[0.2em] text-orange-400">
              Your Next Chapter Starts Here
            </span>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Have an idea? Let's build something meaningful.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              Whether you're starting a new business, refreshing an existing
              website, or looking for a template to bring your idea to life,
              ANTHIRA is ready to help you explore the possibilities.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff5722] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#f4511e]"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onViewServices}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/10"
              >
                Discover Our Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};