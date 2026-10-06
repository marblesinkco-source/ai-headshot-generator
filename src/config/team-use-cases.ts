/**
 * Team use-case landing page configuration.
 * Each entry generates a page at /teams/[slug].
 * Copy is intentionally free of statistics, ratings and testimonials.
 */

export interface TeamUseCase {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  painPoints: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  howItWorks: { step: string; description: string }[];
  faqItems: { question: string; answer: string }[];
}

export const TEAM_USE_CASES: TeamUseCase[] = [
  {
    slug: 'team-directory',
    title: 'Team Directory Photos',
    metaTitle: 'Team Directory Photos: AI Headshots for Your Team Page | TailorPic',
    metaDescription:
      'Update your team or about page with consistent AI headshots. Each person uploads selfies, no photographer or studio day needed. Team pricing from $29/person.',
    heroTitle: 'Team directory photos that actually match',
    heroSubtitle:
      'Refresh your team and about pages without scheduling a photographer. Everyone uploads a few selfies from their own phone and receives polished, consistent headshots.',
    painPoints: [
      {
        title: 'Mismatched photos on the team page',
        description:
          'Cropped group shots, old studio portraits and phone snapshots sitting side by side make a team page look unfinished.',
      },
      {
        title: 'Outdated or missing photos',
        description:
          'People change roles, hairstyles and offices. Directory photos fall behind, and some profiles never get a photo at all.',
      },
      {
        title: 'Remote and distributed staff',
        description:
          'When your team is spread across cities, a single photographer visit leaves some people out.',
      },
      {
        title: 'Scheduling a shoot is a project',
        description:
          'Booking a photographer means coordinating calendars, a room and a day away from work for everyone.',
      },
    ],
    benefits: [
      {
        title: 'One look across the whole directory',
        description:
          'Choose a shared style so every portrait on your team page follows the same lighting, framing and background feel.',
      },
      {
        title: 'Everyone participates, wherever they are',
        description:
          'Each person uploads selfies from their own device, so remote and in-office staff are treated the same.',
      },
      {
        title: 'No studio day',
        description:
          'There is no appointment to book. Photos are typically ready about 2 hours after upload.',
      },
      {
        title: 'Commercial rights included',
        description:
          'Use the photos on your website, directory, email signatures and printed materials.',
      },
    ],
    howItWorks: [
      {
        step: 'Pick a shared style',
        description:
          'Decide on the look for your directory so everyone is generated in a matching style.',
      },
      {
        step: 'Each person uploads selfies',
        description:
          'Team members take 4 to 10 casual selfies with their phone and upload them. No special equipment is needed.',
      },
      {
        step: 'Download and publish',
        description:
          'Everyone receives their headshots in about 2 hours, ready for your team page, directory and profiles.',
      },
    ],
    faqItems: [
      {
        question: 'Can every team member get the same style?',
        answer:
          'Yes. Agree on a style up front and have everyone choose it, so the directory looks cohesive. Team members can still pick their favorite result from their own set.',
      },
      {
        question: 'Do we need to gather everyone in one place?',
        answer:
          'No. Each person uploads selfies from their own phone, so the team can be in one office or spread across the world.',
      },
      {
        question: 'How long does it take to get the photos?',
        answer:
          'Headshots are typically ready about 2 hours after the selfies are uploaded.',
      },
      {
        question: 'Can we use the photos on our website?',
        answer:
          'Yes. Every order includes full commercial rights, including websites, directories and print.',
      },
      {
        question: 'What does team pricing look like?',
        answer:
          'Team pricing is $39 per person for teams of 5 to 15 and $29 per person for teams of 16 to 50. See the For Teams page for full details.',
      },
    ],
  },
  {
    slug: 'employee-onboarding',
    title: 'New Hire Onboarding Headshots',
    metaTitle: 'New Hire Onboarding Headshots: AI Photos for HR Teams | TailorPic',
    metaDescription:
      'Give every new hire a professional headshot in their first week. No photographer to book. New hires upload selfies and get headshots in about 2 hours. Team pricing from $29/person.',
    heroTitle: 'Headshots for new hires, from day one',
    heroSubtitle:
      'Add a headshot step to your onboarding checklist. New employees upload a few selfies and have a professional photo ready for the directory, email and intranet.',
    painPoints: [
      {
        title: 'Photo day does not match start dates',
        description:
          'New hires join on different days. Waiting for the next scheduled shoot leaves them without a photo for weeks or months.',
      },
      {
        title: 'Placeholder avatars everywhere',
        description:
          'Blank profile icons in the directory, chat tools and email make new employees harder to recognize.',
      },
      {
        title: 'One more task for HR',
        description:
          'Chasing photos, booking photographers and collecting files adds to an already full onboarding workload.',
      },
      {
        title: 'Inconsistent self-submitted photos',
        description:
          'When people send their own photos, you get cropped vacation pictures and low-resolution snapshots.',
      },
    ],
    benefits: [
      {
        title: 'Part of the first-week checklist',
        description:
          'Because there is no appointment, a headshot can be a simple onboarding task done from a laptop or phone.',
      },
      {
        title: 'Professional and consistent',
        description:
          'New hires match the look of existing staff when you choose the same style your team already uses.',
      },
      {
        title: 'Quick turnaround',
        description:
          'Photos are typically ready about 2 hours after upload, in time for directory and email setup.',
      },
      {
        title: 'Works for remote hires',
        description:
          'Remote employees complete the same process from home, with no travel to an office or studio.',
      },
    ],
    howItWorks: [
      {
        step: 'Add it to your onboarding checklist',
        description:
          'Send new hires a link to upload selfies as one of their first-week tasks.',
      },
      {
        step: 'New hire uploads selfies',
        description:
          'They take 4 to 10 casual selfies in natural light and upload them from any device.',
      },
      {
        step: 'Use the photo right away',
        description:
          'Headshots are typically ready in about 2 hours, so they can be added to the directory, email and chat profiles.',
      },
    ],
    faqItems: [
      {
        question: 'Can we run this for each new hire as they join?',
        answer:
          'Yes. Because each person uploads their own selfies, you can add headshots to onboarding whenever someone starts, rather than waiting for a group photo day.',
      },
      {
        question: 'What do new hires need to provide?',
        answer:
          'Just 4 to 10 casual selfies taken with a phone, from different angles and in natural light. No professional equipment is needed.',
      },
      {
        question: 'Will the photo match our current team?',
        answer:
          'If you pick the same style your team already uses, new headshots will have a similar look. Exact matching depends on the style and the source selfies.',
      },
      {
        question: 'How fast do new hires get their photos?',
        answer:
          'Typically about 2 hours after uploading their selfies.',
      },
      {
        question: 'What is the cost for onboarding several people at once?',
        answer:
          'Team pricing is $39 per person for 5 to 15 people and $29 per person for 16 to 50 people. For a single new hire, individual packages start from $1.99.',
      },
    ],
  },
  {
    slug: 'corporate-events',
    title: 'Corporate Event Headshots',
    metaTitle: 'Corporate Event Headshots: Speaker & Attendee Photos | TailorPic',
    metaDescription:
      'Headshots for conferences, summits and company events without an on-site photographer. Speakers and staff upload selfies and get headshots in about 2 hours. Team pricing from $29/person.',
    heroTitle: 'Event headshots without the photo booth',
    heroSubtitle:
      'Speaker bios, badges, programs and event pages all need a good photo. Skip the on-site setup. Everyone uploads selfies in advance and receives polished headshots.',
    painPoints: [
      {
        title: 'Speakers send photos you cannot use',
        description:
          'Event teams often receive low-resolution, cropped or inconsistent images just before the program goes to print.',
      },
      {
        title: 'On-site photo booths are costly to run',
        description:
          'A photographer, lighting, a space and a queue add logistics and budget to an already complex event.',
      },
      {
        title: 'Deadlines are tight',
        description:
          'Agendas, speaker pages and promotional materials need photos well before the event day.',
      },
      {
        title: 'Not everyone attends in person',
        description:
          'Virtual speakers and remote staff cannot step into a photo booth at all.',
      },
    ],
    benefits: [
      {
        title: 'Collect photos before the event',
        description:
          'Speakers and staff can generate headshots ahead of time, in time for the website, schedule and printed program.',
      },
      {
        title: 'A consistent look for the lineup',
        description:
          'Pick one style so the speaker page and promotional graphics look like a coordinated set.',
      },
      {
        title: 'No on-site equipment',
        description:
          'There is no photographer, backdrop or booth to set up, and nothing to schedule on event day.',
      },
      {
        title: 'Includes remote participants',
        description:
          'Virtual and traveling speakers use the same process from wherever they are.',
      },
    ],
    howItWorks: [
      {
        step: 'Send participants the upload link',
        description:
          'Share instructions with speakers, hosts and staff well ahead of your content deadline.',
      },
      {
        step: 'Participants upload selfies',
        description:
          'Each person submits 4 to 10 casual selfies from their phone or computer.',
      },
      {
        step: 'Collect headshots for your materials',
        description:
          'Photos are typically ready about 2 hours later, ready for speaker pages, badges, programs and social posts.',
      },
    ],
    faqItems: [
      {
        question: 'Is this a replacement for an on-site photographer?',
        answer:
          'It is an alternative for headshots. AI headshots are generated from selfies, so they are well suited to speaker bios, badges and profiles. They do not capture candid photos of the event itself.',
      },
      {
        question: 'Can speakers generate headshots before the event?',
        answer:
          'Yes. Each speaker uploads selfies whenever it suits them and gets results in about 2 hours, so you can collect photos well before your deadline.',
      },
      {
        question: 'Can we use the photos in print and on screen?',
        answer:
          'Yes. Every order includes full commercial rights, covering event websites, programs, signage and promotional materials.',
      },
      {
        question: 'What about guests who are not on our team?',
        answer:
          'Anyone can create their own headshots. Individual packages start from $1.99 for a single photo.',
      },
      {
        question: 'How does pricing work for a group of staff or speakers?',
        answer:
          'Team pricing is $39 per person for 5 to 15 people and $29 per person for 16 to 50 people.',
      },
    ],
  },
  {
    slug: 'website-redesign',
    title: 'Website Redesign Headshots',
    metaTitle: 'Website Redesign Headshots: Consistent Team Photos | TailorPic',
    metaDescription:
      'Launching a redesigned website? Get consistent team headshots without a photo shoot delaying your launch. Each person uploads selfies. Team pricing from $29/person.',
    heroTitle: 'Do not let team photos delay your relaunch',
    heroSubtitle:
      'A new design deserves new photos. Get a matching set of team headshots in hours instead of waiting on a photographer, so your redesign launches on time.',
    painPoints: [
      {
        title: 'Old photos clash with the new design',
        description:
          'Different crops, backgrounds and eras of photography stand out when placed in a clean new layout.',
      },
      {
        title: 'Photo shoots become the bottleneck',
        description:
          'Designers and developers are ready, but the launch waits on a photographer\'s availability and post-production.',
      },
      {
        title: 'Hard to design around uneven images',
        description:
          'Varying sizes, framing and lighting make it difficult to build a tidy team grid or bio layout.',
      },
      {
        title: 'Staff are scattered',
        description:
          'Getting everyone in one place for a shoot is rarely practical, so some people are left with old pictures.',
      },
    ],
    benefits: [
      {
        title: 'A matching set for your new layout',
        description:
          'Choosing one style gives your designers a uniform set of portraits that sit cleanly in grids and bio cards.',
      },
      {
        title: 'Faster path to launch',
        description:
          'Headshots are typically ready about 2 hours after upload, so photos need not hold up the project timeline.',
      },
      {
        title: 'High-resolution files',
        description:
          'Receive downloadable photos you can crop and resize for web, mobile and print.',
      },
      {
        title: 'Reusable beyond the website',
        description:
          'With commercial rights included, the same photos work for email signatures, proposals and social profiles.',
      },
    ],
    howItWorks: [
      {
        step: 'Choose the style for your new site',
        description:
          'Pick a look that suits your brand and the layout you are building, then share it with the team.',
      },
      {
        step: 'Team members upload selfies',
        description:
          'Everyone uploads 4 to 10 casual selfies. Nobody has to travel or book a time slot.',
      },
      {
        step: 'Drop the photos into your design',
        description:
          'Download the results in about 2 hours and add them to your team page, bios and case studies.',
      },
    ],
    faqItems: [
      {
        question: 'Will all headshots have the same background and framing?',
        answer:
          'Photos generated in the same style share a similar look. Individual results can still vary slightly depending on each person\'s source selfies, so people can choose their favorite from their set.',
      },
      {
        question: 'How soon can we have photos for launch?',
        answer:
          'Headshots are typically ready about 2 hours after selfies are uploaded, so photos can be collected quickly once your design is final.',
      },
      {
        question: 'Can we use the photos beyond the website?',
        answer:
          'Yes. Full commercial rights are included, so you can use the photos in email signatures, proposals, social profiles and print.',
      },
      {
        question: 'Do we need to retake photos if the design changes?',
        answer:
          'Not usually. You can crop and resize the downloaded files for different layouts. If you want a different style later, you can place a new order.',
      },
      {
        question: 'What is the team price?',
        answer:
          'Team pricing is $39 per person for 5 to 15 people and $29 per person for 16 to 50 people.',
      },
    ],
  },
  {
    slug: 'brand-consistency',
    title: 'Brand-Consistent Team Photos',
    metaTitle: 'Brand-Consistent Team Photos: One Look for Every Employee | TailorPic',
    metaDescription:
      'Keep every employee photo visually consistent across your website, LinkedIn and materials. AI headshots in a shared style, from selfies. Team pricing from $29/person.',
    heroTitle: 'One consistent look for every employee photo',
    heroSubtitle:
      'Your brand guidelines cover logos and colors. Extend them to people. Give your whole team headshots in a shared style, wherever they work.',
    painPoints: [
      {
        title: 'Photos come from everywhere',
        description:
          'Studio portraits, phone snapshots and cropped event photos all end up in your materials, each with a different look.',
      },
      {
        title: 'Brand guidelines stop at the logo',
        description:
          'Without a shared standard for people photos, each team and office makes its own choices.',
      },
      {
        title: 'Photographers differ between offices',
        description:
          'Separate shoots in different cities rarely produce matching lighting, backgrounds or framing.',
      },
      {
        title: 'Photos age at different rates',
        description:
          'When only some employees update their pictures, older images stand out across web and social channels.',
      },
    ],
    benefits: [
      {
        title: 'A shared standard',
        description:
          'Pick one style and ask everyone to use it, creating a clear, repeatable standard for employee photos.',
      },
      {
        title: 'Same process for every location',
        description:
          'Every office and remote worker follows the same steps, rather than relying on separate photographers.',
      },
      {
        title: 'Easy to refresh',
        description:
          'Update the look whenever your brand evolves, without organizing another round of in-person shoots.',
      },
      {
        title: 'Consistent across channels',
        description:
          'Use the same portraits on your website, LinkedIn, email signatures and printed materials under full commercial rights.',
      },
    ],
    howItWorks: [
      {
        step: 'Set your photo standard',
        description:
          'Choose the style that fits your brand and tell the team which one to select.',
      },
      {
        step: 'Everyone uploads selfies',
        description:
          'Each person submits 4 to 10 casual selfies from their own device, at their own convenience.',
      },
      {
        step: 'Roll out the new photos',
        description:
          'Headshots are typically ready in about 2 hours. Update your website, directory and profiles with matching portraits.',
      },
    ],
    faqItems: [
      {
        question: 'How do we keep everyone on the same style?',
        answer:
          'Decide on the style before you start and share it with the team. Each person selects that style when they create their headshots.',
      },
      {
        question: 'Will the results be identical for everyone?',
        answer:
          'No. People look different and results depend on the selfies provided. A shared style gives a similar look in lighting, framing and tone, not pixel-identical images.',
      },
      {
        question: 'Can we update the photos later if our brand changes?',
        answer:
          'Yes. You can place a new order in a different style at any time, with no in-person shoot to organize.',
      },
      {
        question: 'Is there a subscription?',
        answer:
          'No. Headshots are a one-time payment with full commercial rights.',
      },
      {
        question: 'What are the team prices?',
        answer:
          'Team pricing is $39 per person for 5 to 15 people and $29 per person for 16 to 50 people.',
      },
    ],
  },
];

export function getAllTeamUseCaseSlugs(): string[] {
  return TEAM_USE_CASES.map((u) => u.slug);
}

export function getTeamUseCaseBySlug(slug: string): TeamUseCase | undefined {
  return TEAM_USE_CASES.find((u) => u.slug === slug);
}
