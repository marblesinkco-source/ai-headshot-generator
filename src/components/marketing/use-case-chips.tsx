import Link from 'next/link';
import { Briefcase, Users, Heart, Camera, GraduationCap, Home, Baby, PawPrint, Sparkles } from 'lucide-react';

const USE_CASES = [
  { label: 'LinkedIn & Resume', href: '/headshots', icon: Briefcase },
  { label: 'Corporate Teams', href: '/team-headshots', icon: Users },
  { label: 'Dating Profiles', href: '/dating-photos', icon: Heart },
  { label: 'Real Estate', href: '/virtual-staging', icon: Home },
  { label: 'Graduation', href: '/graduation-photos', icon: GraduationCap },
  { label: 'Family Portraits', href: '/family-portraits', icon: Camera },
  { label: 'Baby Shower', href: '/baby-shower-invitations', icon: Baby },
  { label: 'Pet Portraits', href: '/pet-portraits', icon: PawPrint },
  { label: 'AI Avatars', href: '/avatars', icon: Sparkles },
] as const;

export function UseCaseChips() {
  return (
    <section className="bg-tp-paper py-12 sm:py-16" aria-labelledby="use-case-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p
          id="use-case-heading"
          className="text-center text-sm font-medium text-tp-muted"
        >
          Popular with professionals, teams, and families
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {USE_CASES.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-2 rounded-full border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink shadow-sm transition-all hover:border-tp-bronze hover:bg-tp-bronze/5 hover:text-tp-bronze-ink"
            >
              <Icon className="h-4 w-4 text-tp-muted transition-colors group-hover:text-tp-bronze" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCaseChips;
